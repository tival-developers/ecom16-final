import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"


export async function GET() {
  try {
    // Try connecting
    const conn = await connectToDatabase()

    // Grab some connection details
    const status = conn.connection.readyState // 1 = connected
    const dbName = conn.connection.name
    const host = conn.connection.host

    return NextResponse.json({
      success: true,
      message: "✅ MongoDB connection established!",
      status,
      dbName,
      host,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        success: false,
        message: "❌ MongoDB connection failed",
       
      },
      { status: 500 }
    )
  }
}
