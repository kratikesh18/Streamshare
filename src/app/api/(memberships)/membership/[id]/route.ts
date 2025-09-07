import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return new Response("Membership ID is required", { status: 400 });
  }

  await DBconnect();

  const membership = await MembershipModel.findById(id).lean().populate({
    path: "members",
    select: "name profilePicture",
  });

  if (!membership) {
    return NextResponse.json(
      { error: "Membership not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ membership, message: "Membership retrieved successfully", success: true }, { status: 200 });
}
