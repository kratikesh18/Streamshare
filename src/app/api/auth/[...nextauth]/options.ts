import { DBconnect } from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentialsSchema } from "@/schemas/credentialsSchema";

const authOptions: AuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          type: "text",
          placeholder: "Enter your email",
          label: "Email",
        },
        password: {
          type: "password",
          placeholder: "Enter your password",
          label: "Password",
        },
      },
      async authorize(credentials): Promise<any> {
        await DBconnect();
        try {
          // Check for missing credentials
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Email and password are required.");
          }

          // Validate credentials shape
          const parsedCredentials = credentialsSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            throw new Error(
              parsedCredentials.error.issues[0]?.message ||
                "Invalid credentials format."
            );
          }

          const { email, password } = parsedCredentials.data;

          // Find user
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("No User found");
          }

          // Check password
          if (typeof user.isPasswordValid !== "function") {
            throw new Error("Password validation method not implemented.");
          }
          const isPasswordValid = await user.isPasswordValid(password);
          if (!isPasswordValid) {
            throw new Error("Incorrect password. Please try again.");
          }

          // Update last login
          user.lastLogin = new Date();
          await user.save();

          // Return user object
          return {
            id: user._id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            image: user.profilePicture,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const { email, given_name, family_name, picture } = profile as any;

          await DBconnect();

          const existingUser = await UserModel.findOne({ email });

          if (!existingUser) {
            await UserModel.create({
              email,
              firstName: given_name,
              lastName: family_name,
              profilePicture: picture,
              isEmailVerified: true,
            });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },
  },

  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
};

export { authOptions };
