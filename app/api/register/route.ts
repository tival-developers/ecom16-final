import connectToDatabase from "@/lib/db/dbConnection" 
import User from "@/lib/db/models/user.model"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase

    const {  email, password } = await request.json();

    // Check if user already exists
    const userExist = await User.findOne({ email }); // Use findOne instead of find

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      // name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in registration:", err);
    return NextResponse.json(
      { error: "Internal server error" ,status: 500 }
    );
  }
}
