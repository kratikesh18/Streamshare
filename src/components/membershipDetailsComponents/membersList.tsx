"use client";

import { formatDate } from "@/app/(memberships)/mymemberships/[id]/page";
import { LucideInbox } from "lucide-react";
import Link from "next/link";

type Member = {
  _id: string;
  name: string;
  isOwner: boolean;
  joinedDate?: string | null;
  profilePicture?: string;
};

interface MembersListProps {
  members: Member[];
}

export function MembersList({ members }: MembersListProps) {
  if (!Array.isArray(members) || members.length === 0) {
    return <div className="m-4">No members found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="font-semibold text-lg">
        Group Members ({members.length})
      </h1>
      <ul className="space-y-2">
        {members.map((member) => (
          <li
            key={member._id}
            className="border-b flex justify-between border-[#232323] pb-2"
          >
            <div className="flex items-center">
              <img
                src={member.profilePicture || "/default-profile.png"}
                alt={member.name}
                className="h-8 w-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-[#a3a3a3]">
                  Joined on{" "}
                  {member.joinedDate ? formatDate(member.joinedDate) : "N/A"}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              {member.isOwner && (
                <span className="inline-flex items-center rounded-md border border-[#2a2a2a] bg-[#1b1b1f] px-2 py-1 text-xs text-[#d7d7d7]">
                  Owner
                </span>
              )}

              <Link
                href={`/mymemberships/${member._id}/message`}
                className="text-sm text-[#a3a3a3] hover:underline flex items-center justify-center gap-2"
              >
                <LucideInbox size={16} />
                Message
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
