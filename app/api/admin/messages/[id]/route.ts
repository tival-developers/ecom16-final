import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"
import HelpRequest from "@/lib/db/models/contact"




export async function PATCH(req: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params

  try {
    await connectToDatabase

    const updated = await HelpRequest.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    ).lean()

    if (!updated) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    )
  }
}
