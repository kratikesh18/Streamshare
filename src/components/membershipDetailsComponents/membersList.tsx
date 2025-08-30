import { formatDate } from "@/app/(memberships)/mymemberships/[id]/page";

type membersListProps = {
  name: string;
  //   email: string;
  isOwner: boolean;
  joinedDate: string;
  profilePicture: string;
};
const defaultMember: membersListProps[] = [
  {
    name: "Kartikesh Pachkawade",
    isOwner: true,
    joinedDate: new Date().toISOString(),
    profilePicture: "/default-profile.png",
  },
  {
    name: "John Doe",
    isOwner: false,
    joinedDate: new Date().toISOString(),
    profilePicture: "/default-profile.png",
  },
];
export function MembersList({ members }: { members: membersListProps[] }) {
  const displayedMembers = members.length > 0 ? members : defaultMember;
  return (
    <div>
      <h1>Group Members ({displayedMembers.length})</h1>
      <ul className="space-y-2">
        {displayedMembers.map((member, index) => (
          <li key={index} className="border-b border-[#232323] pb-2">
            <div className="flex items-center">
              <img
                src={member.profilePicture}
                alt={member.name}
                className="h-8 w-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-[#a3a3a3]">
                  Joined on {formatDate(member.joinedDate)}
                </div>
              </div>
              {member.isOwner && (
                <span className="inline-flex items-center rounded-md border border-[#2a2a2a] bg-[#1b1b1f] px-2 py-1 text-xs text-[#d7d7d7]">
                  Owner
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
