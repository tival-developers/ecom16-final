import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"
import Notification from "@/lib/db/models/notification"



export async function GET() {
  await connectToDatabase
  const notifications = await Notification.find().sort({ date: -1 }).lean()
  return NextResponse.json(notifications)
}
