import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return new Response("Membership ID is required", { status: 400 });
  }

  await DBconnect();
  

  const membership = await MembershipModel.findById(id).lean();

  if (!membership) {
    return new Response("Membership not found", { status: 404 });
  }

  return new Response(JSON.stringify(membership), { status: 200 });
}
