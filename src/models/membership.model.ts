import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface MembershipType extends Document {
  platform: string;
  plan: string;
  totalSlots: number;
  pricePerSlot: number;
  description: string;
  groupRules: string[];
  featuresIncluded: string[];
  members: Types.ObjectId[];
}

type MembershipModelType = Model<MembershipType>;

const membershipSchema = new Schema<MembershipType>(
  {
    platform: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
    },
    plan: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    totalSlots: {
      type: Number,
      required: true,
      min: [1, "At least 1 slot is required"],
    },
    pricePerSlot: {
      type: Number,
      required: true,
      min: [0, "Price per slot cannot be negative"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    groupRules: {
      type: [String],
      required: true,
      default: [],
    },
    featuresIncluded: {
      type: [String],
      required: true,
      default: [],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const MembershipModel =
  (mongoose.models.Membership as MembershipModelType) ||
  mongoose.model<MembershipType, MembershipModelType>(
    "Membership",
    membershipSchema
  );

export { MembershipModel };
export type { MembershipType };
