import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { string } from "zod";

interface UserType extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  bio?: string;
  mobile?: string;
  rating: number;
  ratingCount: number;
  profilePicture?: string;
  status: "active" | "inactive";
  lastLogin: Date;
  isEmailVerified: string;
}

interface UserMethods {
  isPasswordValid(password: string): Promise<boolean>;
}

type UserModelType = Model<UserType, {}, UserMethods>;

const userSchema = new Schema<UserType, UserModelType, UserMethods>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    // required: true,
  },
  bio: {
    type: String,
    maxlength: 25,
  },
  mobile: {
    type: String,
    trim: true,
    unique: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  profilePicture: { type: String, default: "" },
  isEmailVerified: { type: String, default: "false" },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  lastLogin: { type: Date, default: Date.now },
});

// hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// instance method
userSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel =
  (mongoose.models.User as UserModelType) ||
  mongoose.model<UserType, UserModelType>("User", userSchema);

export { UserModel };
