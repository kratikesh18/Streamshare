"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { ApiResponse, MembershipItem, Meta } from "@/types/ApiResponse";
import { MembershipCardSkeleton } from "@/components/skeletons/membershipCardSkeleton";
import { MembershipDetailsCard } from "@/components/membershipDetailsCard";
import { toast } from "sonner";

export default function MyMembershipsPage() {
  const [items, setItems] = useState<MembershipItem[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // basic pagination (client-side controls)
  // const [page, setPage] = useState(1);
  // const limit = 12;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get<ApiResponse>(
          "/api/getMyMemberships"
        );
        console.log(res.data);
        if (!res.data?.success) {
          toast.error(res.data?.message || "Failed to fetch memberships");
        }

        setItems(res.data.data || []);
        setMeta(res.data.meta || null);
      } catch (e: any) {
        // Ignore cancellation errors
        console.log(e.error || e.message);
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
    // }, [page]); // fetch when page changes
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Memberships
            </h1>
            <p className="text-sm text-[#a3a3a3] mt-1">
              Manage the memberships you’ve created and shared.
            </p>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center rounded-md bg-[#a560fa] hover:bg-[#7e25eb] text-white px-4 py-2 text-sm font-semibold transition"
          >
            Create membership
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-[#3a1b3f] bg-[#1a0f1d] p-4 text-sm text-[#ffb4e6]">
            {error}
          </div>
        )}


        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MembershipCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-[#232323] bg-[#18181b] p-10 text-center">
            <h2 className="text-xl font-semibold mb-2">No memberships yet</h2>
            <p className="text-[#a3a3a3] mb-6">
              Create your first membership to start sharing with others.
            </p>
            <Link
              href="/create"
              className="inline-flex items-center rounded-md bg-[#a560fa] hover:bg-[#7e25eb] text-white px-4 py-2 text-sm font-semibold transition"
            >
              Create membership
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((m) => (
                <MembershipDetailsCard key={m._id} {...m} />
              ))}
            </div>

            {/* <div className="flex items-center justify-center gap-3 mt-10">
              <button
                className="px-3 py-1.5 rounded-md border border-[#232323] bg-[#1b1b1f] text-sm text-[#ededed] disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || loading}
              >
                Previous
              </button>
              <span className="text-sm text-[#a3a3a3]">
                Page {page}
                {meta?.pages ? ` of ${meta.pages}` : ""}
              </span>
              <button
                className="px-3 py-1.5 rounded-md border border-[#232323] bg-[#1b1b1f] text-sm text-[#ededed] disabled:opacity-50"
                onClick={() => setPage((p) => p + 1)}
                disabled={
                  loading || (meta ? page >= meta.pages : items.length < limit)
                }
              >
                Next
              </button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
