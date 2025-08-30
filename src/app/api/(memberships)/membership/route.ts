import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";
import membershipSchema from "@/schemas/membershipSchema";
import { ZodError } from "zod";

export async function POST(req: Request) {
  await DBconnect();

  try {
    const raw = await req.json();

    // Normalize incoming data (handles strings and arrays)
    const toStringArray = (v: unknown): string[] => {
      if (Array.isArray(v))
        return v.map((s) => String(s).trim()).filter(Boolean);
      if (typeof v === "string")
        return v
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean);
      return [];
    };

    const payload = {
      platform: String(raw.platform ?? "").trim(),
      plan: String(raw.plan ?? "").trim(),
      totalSlots: Number(raw.totalSlots),
      pricePerSlot: Number(raw.pricePerSlot),
      description: String(raw.description ?? "").trim(),
      groupRules: toStringArray(raw.groupRules),
      featuresIncluded: toStringArray(raw.featuresIncluded),
    };

    // Validate with Zod
    const parsed = membershipSchema.safeParse(payload);
    if (!parsed.success) {
      const error = parsed.error as ZodError;
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation failed",
          errors: error.flatten(),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // Persist
    const created = await MembershipModel.create(parsed.data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Membership created",
        data: created,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err: any) {
    // Handle known Mongoose validation errors
    if (err?.name === "ValidationError") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Database validation failed",
          errors: err?.errors ?? null,
        }),
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // Fallback
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
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
