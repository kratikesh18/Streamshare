import { MembershipItem } from "@/types/ApiResponse";
import Link from "next/link";

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export function MembershipDetailsCard(m: MembershipItem) {
  return (
    <div
      key={m._id}
      className="rounded-xl border border-[#232323] bg-[#18181b] shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-5 border-b border-[#232323]">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{m.platform}</span>
            <span className="text-xs text-[#a3a3a3]">• {m.plan}</span>
          </div>
          <span className="text-sm font-semibold text-[#a560fa]">
            {formatINR(m.pricePerSlot)}/slot
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-[#cfcfcf] line-clamp-3">{m.description}</p>

        {m.featuresIncluded?.length > 0 && (
          <div>
            <div className="text-xs uppercase tracking-wide text-[#a3a3a3] mb-2">
              Features
            </div>
            <div className="flex flex-wrap gap-2">
              {m.featuresIncluded.slice(0, 5).map((f, i) => (
                <span
                  key={`${m._id}-feat-${i}`}
                  className="inline-flex items-center rounded-md border border-[#2a2a2a] bg-[#1b1b1f] px-2 py-1 text-xs text-[#d7d7d7]"
                >
                  {f}
                </span>
              ))}
              {m.featuresIncluded.length > 5 && (
                <span className="text-xs text-[#a3a3a3]">
                  +{m.featuresIncluded.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-[#a3a3a3]">
            Slots: <span className="text-[#ededed]">{m.totalSlots}</span>
          </div>
          <Link
            href={`/mymemberships/${m._id}`}
            className="text-sm font-medium text-[#60a5fa] hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
