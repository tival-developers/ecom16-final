import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import User from "@/lib/db/models/user.model"; // adjust path to your User model
import bcrypt from "bcryptjs";
import { auth } from '@/auth'

export async function PUT(req: Request) {
    const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase();
    const body = await req.json();
    const {  email, currentPassword, newPassword, } = body;

    

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update email
    if (email && email !== user.email) {
      user.email = email;
    }

    // Update password
    if (currentPassword && newPassword) {
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    

    await user.save();

    return NextResponse.json({ success: true, message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}
