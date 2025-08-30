import { Skeleton } from "../ui/skeleton";

export function MembershipCardSkeleton() {
  return (
    <div
      className="rounded-xl border border-[#232323] bg-[#18181b] p-5"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Header (title + price) */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-44 bg-[#232323]" />
        <Skeleton className="h-4 w-20 bg-[#232323]" />
      </div>

      {/* Description lines */}
      <Skeleton className="h-3 w-full bg-[#232323] mb-2" />
      <Skeleton className="h-3 w-2/3 bg-[#232323] mb-4" />

      {/* Feature chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-md bg-[#232323]" />
        <Skeleton className="h-6 w-20 rounded-md bg-[#232323]" />
        <Skeleton className="h-6 w-24 rounded-md bg-[#232323]" />
      </div>

      {/* Footer (slots + link) */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-24 bg-[#232323]" />
        <Skeleton className="h-8 w-24 rounded-md bg-[#232323]" />
      </div>
    </div>
  );
}
