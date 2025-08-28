import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z
    .string()
    .trim()
    .min(1, "First name must contain at least 1 character"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name must contain at least 1 character"),
});

export { signUpSchema };
