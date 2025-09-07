"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { SectionBar } from "@/components/membershipDetailsComponents/sectionBar";
import { MembershipDetailsSection } from "@/components/membershipDetailsComponents/membershipDetailsSection";
import { MembersList } from "@/components/membershipDetailsComponents/membersList";
import { PriceAndDetails } from "@/components/membershipDetailsComponents/priceAndDetails";

// fallback members used only when the membership has no members data

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// type Params = { params: { id: string } };
export const formatDate = (d: string) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(d));

export default function MyMembershipDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const fallbackMembers = [
    {
      _id: "1",
      name: "Tyrion Lannister",
      isOwner: true,
      joinedDate: new Date().toISOString(),
      profilePicture:
        "https://res.cloudinary.com/dxo7rbhrl/image/upload/nywu8ufl9t3pgu4ffuiv.png",
    },
    {
      _id: "2",
      name: "Kartikesh Pachkawade",
      isOwner: false,
      joinedDate: new Date().toISOString(),
      profilePicture:
        "https://res.cloudinary.com/dxo7rbhrl/image/upload/v1754061457/ozcjexruo0nmiyanrvrn.jpg",
    },
  ];

  type MembershipDetails = {
    _id: string;
    platform: string;
    plan: string;
    totalSlots: number;
    pricePerSlot: number;
    description: string;
    groupRules: string[];
    featuresIncluded: string[];
    members: string[]; // array of user IDs
    admin: string; // user ID of admin
    createdAt: string;
    updatedAt: string;
  };

  const [membershipDetails, setMembershipDetails] =
    useState<MembershipDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<
    "Details" | "Members" | "GC"
  >("Details");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/membership/${id}`);
        setMembershipDetails(response.data.membership); // only the membership object
      } catch (error) {
        console.error("Error fetching membership details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!membershipDetails) {
    return <div>No membership details found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-10">
        {/* header */}
        <div className="flex items-start justify-between mb-8 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {membershipDetails.platform} • {membershipDetails.plan}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#141418] px-2 py-1 text-xs text-[#d7d7d7]">
                {formatINR(membershipDetails.pricePerSlot)}/slot
              </span>
              <span className="rounded-md bg-[#141418] px-2 py-1 text-xs text-[#d7d7d7]">
                {membershipDetails.totalSlots} slots
              </span>
              <span className="rounded-md bg-[#141418] px-2 py-1 text-xs text-[#d7d7d7]">
                Members: {membershipDetails?.members?.length ?? "-"}
              </span>
              <span className="rounded-md bg-[#141418] px-2 py-1 text-xs text-[#9a9a9a]">
                Created {formatDate(membershipDetails.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 flex gap-3">
            <Link
              href="/mymemberships"
              className="inline-flex items-center rounded-md border border-[#232323] bg-[#18181b] hover:bg-[#1b1b1f] px-4 py-2 text-sm font-medium"
            >
              Back
            </Link>
            <Link
              href={`/mymemberships/${id}/edit`}
              className="inline-flex items-center rounded-md bg-[#a560fa] hover:bg-[#7e25eb] text-white px-4 py-2 text-sm font-semibold"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-start">
          <main className="md:col-span-2 space-y-6">
            <SectionBar
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />

            <div className="rounded-xl border border-[#232323] bg-[#18181b] p-6">
              {selectedOption === "Details" && (
                <MembershipDetailsSection
                  description={membershipDetails.description}
                  groupRules={membershipDetails.groupRules}
                  featuresIncluded={membershipDetails.featuresIncluded}
                />
              )}

              {selectedOption === "Members" && (
                <MembersList members={fallbackMembers} />
              )}

              {selectedOption === "GC" && (
                <div className="text-sm text-[#a3a3a3]">
                  Group chat coming soon.
                </div>
              )}
            </div>
          </main>

          <aside className="md:col-span-1">
            <PriceAndDetails
              pricePerSlot={membershipDetails.pricePerSlot}
              totalSlots={membershipDetails.totalSlots}
              posted={membershipDetails.createdAt}
              owner={{ _id: membershipDetails._id, name: "Admin" }}
              membershipId={membershipDetails._id}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
