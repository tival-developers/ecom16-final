// import connectToDatabase from '@/lib/db/dbConnection'
// import User from '@/lib/db/models/user.model'
// import bcrypt from 'bcryptjs'

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json()

//     await connectToDatabase()

//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       provider: 'credentials',
//     })

//     return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 })
//   } catch (error) {
//     console.error(error)
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
//   }
// }
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { randomBytes } from "crypto"
import connectToDatabase from "@/lib/db/dbConnection"
import User from "@/lib/db/models/user.model"
import session from "@/lib/db/models/session"


export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create user
    const user = await User.create({ email, password })

    // Create session automatically
    const sessionToken = randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day

    await session.create({
      userId: user._id,
      sessionToken,
      expiresAt,
    })

    // Set secure, HttpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({ message: "Signup successful and logged in" })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
