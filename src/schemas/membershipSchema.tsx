import { z } from "zod";

const membershipSchema = z.object({
  platform: z.enum([
    "Netflix",
    "Disney+",
    "HBO Max",
    "Amazon Prime",
    "Hulu",
    "Spotify",
    "Apple TV+",
    "YouTube Premium",
  ]),
  plan: z.enum(["Basic", "Standard", "Premium"]),
  totalSlots: z.number().min(2, { message: "Total slots must be at least 2" }),

  pricePerSlot: z
    .number()
    .min(0, { message: "Price per slot must be a positive number" }),
  description: z.string().min(10).max(500),
  groupRules: z.array(z.string().min(5).max(100)),
  featuresIncluded: z.array(z.string().min(2).max(100)),
});

export default membershipSchema;
