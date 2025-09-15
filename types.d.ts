// types.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    /** Custom role stored in DB */
    role?: "customer" | "manager" | "developer" | "sales" | "superadmin"
  }

  interface Session {
    user: {
      id: string
      role?: "customer" | "manager" | "developer" | "sales" | "superadmin"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
    role?: "customer" | "manager" | "developer" | "sales" | "superadmin"
  }
}
