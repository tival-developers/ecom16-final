import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import { Review } from "@/lib/db/models/review";


//get all reviews for a product
export async function GET(
  req: NextRequest,
    context: { params: Promise<{ id: string }> }
  ) {
    const { id } = await context.params // ✅ Await params
  await connectToDatabase;

  try {
    const reviews = await Review.find({ productId: id })
      .populate("customerId", "name email")
      .populate("productId", "name")
      .sort({ createdAt: -1 });
      return NextResponse.json({
        reviews
      });
    
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json(
      { error: "Internal server error" ,status: 500 }
    );
  }
}
