
import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";
import membershipSchema from "@/schemas/membershipSchema";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DBconnect();
  try {
    const raw = await req.json();
    const session = await getServerSession(authOptions);

    // Helper: normalize array/string fields
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

    // Prepare payload
    const payload = {
      platform: String(raw.platform ?? "").trim(),
      plan: String(raw.plan ?? "").trim(),
      totalSlots: Number(raw.totalSlots),
      pricePerSlot: Number(raw.pricePerSlot),
      description: String(raw.description ?? "").trim(),
      groupRules: toStringArray(raw.groupRules),
      featuresIncluded: toStringArray(raw.featuresIncluded),
    };

    // Validate
    const parsed = membershipSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        },
        { status: 422 }
      );
    }

    // Save
    const created = await MembershipModel.create({
      admin: session?.user.id,
      ...parsed.data,
    });

    return NextResponse.json({ success: true, data: created }, { status: 200 });
  } catch (err: any) {
    if (err?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Database validation failed",
          errors: err?.errors ?? null,
        },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
