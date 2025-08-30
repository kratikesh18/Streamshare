import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";

// Optional: prevent static caching of this route
export const dynamic = "force-dynamic";

const ALLOWED_SORT_FIELDS = [
  "createdAt",
  "pricePerSlot",
  "totalSlots",
  "platform",
  "plan",
] as const;

const ALLOWED_FIELDS = [
  "_id",
  "platform",
  "plan",
  "totalSlots",
  "pricePerSlot",
  "description",
  "groupRules",
  "featuresIncluded",
  "createdAt",
  "updatedAt",
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseIntParam(value: string | null, def: number) {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) ? n : def;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: Request) {
  await DBconnect();

  try {
    const url = new URL(req.url);

    // Pagination
    const page = clamp(
      parseIntParam(url.searchParams.get("page"), 1),
      1,
      10_000
    );
    const limit = clamp(
      parseIntParam(url.searchParams.get("limit"), 12),
      1,
      100
    );
    const skip = (page - 1) * limit;

    // Sorting
    const sortByParam = url.searchParams.get("sortBy") || "createdAt";
    const sortOrderParam = (
      url.searchParams.get("sortOrder") || "desc"
    ).toLowerCase();
    const sortBy = ALLOWED_SORT_FIELDS.includes(sortByParam as any)
      ? (sortByParam as (typeof ALLOWED_SORT_FIELDS)[number])
      : "createdAt";
    const sortOrder = sortOrderParam === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder } as const;

    // Filtering
    const platform = url.searchParams.get("platform");
    const plan = url.searchParams.get("plan");
    const search = url.searchParams.get("search");

    const filter: Record<string, any> = {};

    if (platform) {
      // exact match (case-insensitive)
      filter.platform = { $regex: `^${escapeRegex(platform)}$`, $options: "i" };
    }
    if (plan) {
      filter.plan = { $regex: `^${escapeRegex(plan)}$`, $options: "i" };
    }
    if (search) {
      const rx = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { platform: rx },
        { plan: rx },
        { description: rx },
        { featuresIncluded: { $elemMatch: rx } },
        { groupRules: { $elemMatch: rx } },
      ];
    }

    // Field selection (projection) whitelist
    const fieldsParam = url.searchParams.get("fields");
    let select = "-__v"; // always hide __v
    if (fieldsParam) {
      const requested = fieldsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const allowed = requested.filter((f) =>
        ALLOWED_FIELDS.includes(f as any)
      );
      if (allowed.length > 0) {
        select = allowed.join(" ") + " -__v";
      }
    }

    const [total, memberships] = await Promise.all([
      MembershipModel.countDocuments(filter),
      MembershipModel.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const body = {
      success: true,
      data: memberships,
      meta: {
        page,
        limit,
        total,
        pages: Math.max(1, Math.ceil(total / limit)),
        sortBy,
        sortOrder: sortOrder === 1 ? "asc" : "desc",
        filters: {
          platform: platform ?? null,
          plan: plan ?? null,
          search: search ?? null,
        },
      },
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("getAllMemberships GET error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch memberships",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
