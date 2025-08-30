type MembershipItem = {
  _id: string;
  platform: string;
  plan: string;
  totalSlots: number;
  pricePerSlot: number;
  description: string;
  groupRules: string[];
  featuresIncluded: string[];
  createdAt?: string | Date;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  filters: Record<string, string | null>;
};
type ApiResponse = {
  success: boolean;
  data: MembershipItem[];
  meta: Meta;
  message?: string;
};

export type { ApiResponse, MembershipItem, Meta };
