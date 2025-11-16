import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import session from "@/lib/db/models/session";

export async function POST() {
  await connectToDatabase();

  const cookieStore = await cookies(); // ✅ await here
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (sessionToken) {
    await session.deleteOne({ sessionToken });
    cookieStore.delete("sessionToken");
  }

  return NextResponse.json({ message: "Logged out" });
}
