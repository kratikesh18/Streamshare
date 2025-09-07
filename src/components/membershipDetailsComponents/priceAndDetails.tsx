import { formatINR } from "@/app/(memberships)/mymemberships/[id]/page";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideInbox, User } from "lucide-react";

type Owner = {
  _id?: string;
  name: string;
  profilePicture?: string;
  reviews?: number;
};

type PriceDetailsProps = {
  pricePerSlot?: number | null;
  totalSlots?: number | null;
  vacancy?: number | null;
  membersCount?: number | null;
  posted?: string | null;
  owner?: Owner | null;
  membershipId?: string | null;
};

export function PriceAndDetails({
  pricePerSlot,
  totalSlots,
  vacancy,
  membersCount,
  posted,
  owner,
  membershipId,
}: PriceDetailsProps) {
  return (
    <div>
      {/* <CardTitle className="text-base">Price & details</CardTitle> */}
      {/* <CardDescription className="text-sm text-[#9a9a9a]">  </CardDescription> */}

      <div className="flex items-baseline gap-3">
        <div className="text-4xl font-extrabold text-[#a560fa]">
          {typeof pricePerSlot === "number" ? formatINR(pricePerSlot) : "--"}
        </div>
        <div className="text-lg text-[#9a9a9a]">/slot</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#d7d7d7]">
        <div className="rounded-md bg-[#0f0f10] p-3">
          <div className="text-xs text-[#9a9a9a]">Total slots</div>
          <div className="font-medium">{totalSlots ?? "-"}</div>
        </div>
        <div className="rounded-md bg-[#0f0f10] p-3">
          <div className="text-xs text-[#9a9a9a]">Vacancy</div>
          <div className="font-medium">{vacancy ?? "-"}</div>
        </div>
        <div className="rounded-md bg-[#0f0f10] p-3">
          <div className="text-xs text-[#9a9a9a]">Members</div>
          <div className="font-medium">{membersCount ?? "-"}</div>
        </div>
        <div className="rounded-md bg-[#0f0f10] p-3">
          <div className="text-xs text-[#9a9a9a]">Posted</div>
          <div className="font-medium">
            {posted ? new Date(posted).toDateString() : "-"}
          </div>
        </div>
      </div>

      {owner && (
        <div className="mt-4 flex items-center gap-3">
          <img
            src={owner.profilePicture || "/default-profile.png"}
            alt={owner.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium">{owner.name}</div>
            <div className="text-xs text-[#9a9a9a]">
              {(owner.reviews ?? 0).toFixed(1)} ★
            </div>
          </div>

          <div className="ml-auto">
            <Button variant="outline" size="sm" asChild>
              <Link
                href={
                  membershipId && owner._id
                    ? `/mymemberships/${membershipId}/message?to=${owner._id}`
                    : `/mymemberships/message`
                }
                className="flex items-center gap-2"
              >
                <LucideInbox size={14} /> Message owner
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="text-xs text-[#8f8f8f]">
        Be sure to read rules before messaging.
      </div>
    </div>
  );
}
