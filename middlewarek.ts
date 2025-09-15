// // middleware.ts
// import { auth } from "@/auth"
// import { NextResponse } from "next/server"



// export default auth((req) => {
//   if (!req.auth) {
//     const redirectUrl = new URL("/login", req.nextUrl.origin)
//     redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   const role = req.auth?.user?.role
//   // ✅ Hardcoded superadmin check
//   if (role === "superadmin") {
//     return NextResponse.next()
//   }

//   // ✅ Role check for /admin/*
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     const role = req.auth?.user?.role
//     if (role !== "developer" && role !== "manager" && role !== "sales") {
//       return NextResponse.redirect(new URL("/", req.nextUrl.origin))
//     }
//   }
// })

// // Protect these routes
// export const config = {
//   matcher: [
//     "/cart/:path*",
//     "/checkout/:path*",
//     "/orders/:path*",
//     "/favorite/:path*",
//     "/admin/:path*"
//   ],
// }
// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const authData = req.auth

  // Redirect unauthenticated users to login
  if (!authData) {
    const redirectUrl = new URL("/login", req.nextUrl.origin)
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  const role = authData.user?.role

  // Superadmin bypass
  if (role === "superadmin") return NextResponse.next()

  // Protect /admin routes for specific roles
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const allowedRoles = ["developer", "manager", "sales"]
    if (!allowedRoles.includes(role || "")) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin))
    }
  }

  // All other authenticated routes are allowed
  return NextResponse.next()
})

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/favorite/:path*",
    "/admin/:path*",
  ],
}
