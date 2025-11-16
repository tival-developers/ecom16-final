import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db/dbConnection";
import User from "@/lib/db/models/user.model";
import Admin from "@/lib/db/models/admin";
import { signInSchema } from "@/lib/db/essentials/zod";
import { ZodError } from "zod";

const SUPERADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const SUPERADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          await connectToDatabase();

          // --- Superadmin flow ---
          if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASSWORD) {
            let admin = await Admin.findOne({ email });
            if (!admin) {
              const hash = await bcrypt.hash(password, 10);
              admin = await Admin.create({
                email,
                name: "Super Admin",
                role: "superadmin",
                password: hash,
              });
            }

            return {
              id: admin._id.toString(),
              name: admin.name,
              email: admin.email,
              role: admin.role,
            };
          }

          // --- Normal user flow ---
          const user = await User.findOne({ email });
          if (!user) throw new Error("User not found");

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) throw new Error("Invalid credentials");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          if (err instanceof ZodError) return null;
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: { signIn: "/login" },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.id ?? "";
        token.role = user.role ?? token.role ?? "customer";
        token.email = user.email ?? token.email ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
