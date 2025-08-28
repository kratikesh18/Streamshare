import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Enter valid email" }),
  password: z.string().min(6, "Password should be 6 characters long"),
});

export { credentialsSchema };
