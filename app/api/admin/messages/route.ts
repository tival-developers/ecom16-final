
import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"
import HelpRequest from "@/lib/db/models/contact"

export async function GET() {
  try {
    await connectToDatabase

    // Fetch all help requests, newest first
    const helpRequests = await HelpRequest.find().sort({ date: -1 }).lean()

    return NextResponse.json(helpRequests, { status: 200 })
  } catch (error) {
    console.error("Error fetching help requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch help requests" },
      { status: 500 }
    )
  }
}
