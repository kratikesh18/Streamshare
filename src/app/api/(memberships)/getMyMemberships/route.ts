// app/api/memberships/route.ts

import { DBconnect } from "@/lib/DBconnect";
import { MembershipModel } from "@/models/membership.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  await DBconnect();

  const session = await getServerSession(authOptions);
  console.log("Session in getMyMemberships:", session);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const memberships = await MembershipModel.find({ admin: session.user.id });

    return NextResponse.json(
      { message: "Memberships fetched successfully", data: memberships },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch memberships", error: error.message },
      { status: 500 }
    );
  }
}
