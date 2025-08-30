// /api/auth/set-password/route.ts
import connectToDatabase from "@/lib/db/dbConnection";
import User from "@/lib/db/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDatabase;
  const hashed = await bcrypt.hash(password, 10);
  await User.updateOne({ email }, { $set: { password: hashed } });
  return new Response("OK", { status: 200 });
}
