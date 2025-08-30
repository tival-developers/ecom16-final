// types.d.ts

import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

// 1) Augment the NextAuth `Session` object so that `session.user.id` exists:
declare module "next-auth" {
  interface Session {
    user: {
      /** This will be injected in callbacks.session */
      id: string
    } & DefaultSession["user"]
  }

  // (Optional) If you ever use `User` or `Account` from NextAuth and want to augment them,
  // you can do so here. For now, leave them empty or remove if unused:
  //interface User {}
  //interface Account {}
}


// 2) Augment the NextAuth `JWT` payload so that `token.id` exists:
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    /** This is set in callbacks.jwt */
    id?: string
  }
}
