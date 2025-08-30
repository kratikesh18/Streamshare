"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { SectionBar } from "@/components/membershipDetailsComponents/sectionBar";
import { MembershipDetailsSection } from "@/components/membershipDetailsComponents/membershipDetailsSection";
import { MembersList } from "@/components/membershipDetailsComponents/membersList";

const defaultMember = [
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

  type MembershipDetails = {
    _id: string;
    platform: string;
    plan: string;
    pricePerSlot: number;
    totalSlots: number;
    description: string;
    groupRules: string[];
    featuresIncluded: string[];
    createdAt: string;
    userId?: string;
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
        console.log(response.data);
        setMembershipDetails(response.data);
      } catch (error) {
        console.error("Error fetching membership details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!membershipDetails) {
    return <div>No membership details found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {membershipDetails.platform} • {membershipDetails.plan}
            </h1>
            <p className="text-sm text-[#a3a3a3] mt-1">
              Created on {formatDate(membershipDetails.createdAt)}
            </p>
          </div>
          <div className="flex gap-3">
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

        <div className="">
          <div>
            <SectionBar
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>

          {selectedOption == "Details" && (
            <div>
              <MembershipDetailsSection
                description={membershipDetails.description}
                groupRules={membershipDetails.groupRules}
                featuresIncluded={membershipDetails.featuresIncluded}
              />
            </div>
          )}

          {selectedOption == "Members" && (
            <div>
              <MembersList members={defaultMember} />
            </div>
          )}

          {selectedOption == "GC" && (
            <div>
              <h1>showing GC</h1>
            </div>
          )}
          {/* <div className="lg:col-span-2 rounded-xl border border-[#232323] bg-[#18181b] p-6"> */}
          <div className="space-y-6">
            {membershipDetails.description && (
              <section>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-[#cfcfcf] leading-relaxed whitespace-pre-line">
                  {membershipDetails.description}
                </p>
              </section>
            )}

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-[#232323] bg-[#141418] p-4">
                <div className="text-xs text-[#a3a3a3]">Total slots</div>
                <div className="text-lg font-semibold">
                  {membershipDetails.totalSlots}
                </div>
              </div>
              <div className="rounded-lg border border-[#232323] bg-[#141418] p-4">
                <div className="text-xs text-[#a3a3a3]">Price per slot</div>
                <div className="text-lg font-semibold">
                  {formatINR(membershipDetails.pricePerSlot)}
                </div>
              </div>
              <div className="rounded-lg border border-[#232323] bg-[#141418] p-4">
                <div className="text-xs text-[#a3a3a3]">Created</div>
                <div className="text-lg font-semibold">
                  {formatDate(membershipDetails.createdAt)}
                </div>
              </div>
            </section>
          </div>
        </div>

        <aside className="rounded-xl border border-[#232323] bg-[#18181b] p-6 space-y-6">
          {Array.isArray(membershipDetails.featuresIncluded) &&
            membershipDetails.featuresIncluded.length > 0 && (
              <section>
                <h3 className="font-semibold mb-3">Features included</h3>
                <div className="flex flex-wrap gap-2">
                  {membershipDetails.featuresIncluded.map(
                    (f: string, i: number) => (
                      <span
                        key={`feat-${i}`}
                        className="inline-flex items-center rounded-md border border-[#2a2a2a] bg-[#1b1b1f] px-2 py-1 text-xs text-[#d7d7d7]"
                      >
                        {f}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}

          {Array.isArray(membershipDetails.groupRules) &&
            membershipDetails.groupRules.length > 0 && (
              <section>
                <h3 className="font-semibold mb-3">Group rules</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-[#d7d7d7]">
                  {membershipDetails.groupRules.map((r: string, i: number) => (
                    <li key={`rule-${i}`}>{r}</li>
                  ))}
                </ol>
              </section>
            )}
        </aside>
      </div>
    </div>
    // </div>
  );
}
