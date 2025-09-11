import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import User from "@/lib/db/models/user.model"; // adjust if your model file is named differently
import { auth } from '@/auth'

// PATCH /api/settings/general
export async function PATCH(req: Request) {
    const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await connectToDatabase;

    

    const { fullName } = await req.json();

    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name: fullName },
      { new: true }
    ).lean();

    return NextResponse.json({
      message: "General settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update general settings error:", error);
    return NextResponse.json(
        { error: "Internal server error" ,status: 500 }
      );
  }
}
