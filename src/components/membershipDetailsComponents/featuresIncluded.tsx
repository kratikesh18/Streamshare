export default function FeaturesIncluded({ features }: { features: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {features.map((f: string, i: number) => (
        <span
          key={`feat-${i}`}
          className="inline-flex items-center rounded-md border border-[#2a2a2a] bg-[#1b1b1f] px-2 py-1 text-xs text-[#d7d7d7]"
        >
          {f}
        </span>
      ))}
    </div>
  );
}
