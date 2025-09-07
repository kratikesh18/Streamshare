import FeaturesIncluded from "./featuresIncluded";
import { CheckCircle, List, Box } from "lucide-react";

type MembershipDetails = {
  description?: string | null;
  groupRules?: string[] | null;
  featuresIncluded?: string[] | null;
};

export function MembershipDetailsSection({
  description,
  groupRules,
  featuresIncluded,
}: MembershipDetails) {
  const rules = groupRules ?? [];
  const features = featuresIncluded ?? [];

  return (
    <section className="rounded-xl border border-[#232323] bg-[#18181b] p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">About this membership</h2>
          <p className="mt-2 text-sm text-[#cfcfcf] leading-relaxed whitespace-pre-line">
            {description && description.trim().length > 0
              ? description
              : "No description provided. The host hasn't added extra details yet."}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-[#9a9a9a]">
          <span className="inline-flex items-center gap-2 rounded-md bg-[#111113] px-2 py-1">
            <List size={14} /> Rules
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-[#111113] px-2 py-1">
            <Box size={14} /> Features
          </span>
        </div>
      </header>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <CheckCircle size={16} className="text-[#7ee787]" /> Group rules
          </h3>

          {rules.length > 0 ? (
            <ol className="space-y-2 text-sm text-[#d7d7d7] list-decimal list-inside">
              {rules.map((r, i) => (
                <li key={i} className="pl-1">
                  {r}
                </li>
              ))}
            </ol>
          ) : (
            <div className="text-sm text-[#9a9a9a]">
              No rules specified — be respectful.
            </div>
          )}
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Box size={16} className="text-[#a560fa]" /> Features included
          </h3>

          {features.length > 0 ? (
            <FeaturesIncluded features={features} />
          ) : (
            <div className="text-sm text-[#9a9a9a]">No features listed.</div>
          )}
        </div>
      </div>
    </section>
  );
}
