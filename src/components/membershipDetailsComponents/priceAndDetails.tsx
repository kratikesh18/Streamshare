import { formatINR } from "@/app/(memberships)/mymemberships/[id]/page";

export function PriceAndDetails() {
  return (
    <div>
      <h1>Price and Details</h1>

      <span className="text-sm font-semibold text-[#a560fa]">
        {/* {formatINR(membershipDetails.pricePerSlot)}/slot */}
      </span>
    </div>
  );
}
