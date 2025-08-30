type MembershipDetails = {
  description: string;
  groupRules: string[];
  featuresIncluded: string[];
};

export function MembershipDetailsSection({
  description,
  groupRules,
  featuresIncluded,
}: MembershipDetails) {
  // console.log(groupRules, featuresIncluded);
  return (
    <div className="rounded-xl border border-[#232323] bg-[#18181b] p-6">
      <h2 className="font-semibold mb-2">About this Membership</h2>
      <p className="text-[#cfcfcf] leading-relaxed whitespace-pre-line">
        {description}
      </p>

      <div className="grid grid-cols-2">
        <div>
          <h3 className="font-semibold mb-2">Group Rules</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[#d7d7d7]">
            {groupRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Features Included</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-[#d7d7d7]">
            {featuresIncluded.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
