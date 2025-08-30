type SectionOption = "Details" | "Members" | "GC";

export function SectionBar({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: SectionOption;
  setSelectedOption: (option: SectionOption) => void;
}) {
  return (
    <div className="bg-[#18181b] border-b border-[#232323] flex space-x-8 px-6 py-3">
      <div
        className={`cursor-pointer ${
          selectedOption === "Details" ? "font-semibold" : "text-[#a3a3a3]"
        }`}
        onClick={() => setSelectedOption("Details")}
      >
        Details
      </div>
      <div
        className={`cursor-pointer ${
          selectedOption === "Members" ? "font-semibold" : "text-[#a3a3a3]"
        }`}
        onClick={() => setSelectedOption("Members")}
      >
        Members
      </div>
      <div
        className={`cursor-pointer ${
          selectedOption === "GC" ? "font-semibold" : "text-[#a3a3a3]"
        }`}
        onClick={() => setSelectedOption("GC")}
      >
        Group Chat
      </div>
    </div>
  );
}
