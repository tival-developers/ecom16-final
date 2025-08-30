import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import { Review } from "@/lib/db/models/review";
import { normalizeReview } from "../../../reviews/[id]/route";

//get all reviews for a product
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase;

  try {
    const reviews = await Review.find({ productId: params.id })
      .populate("customerId", "name email")
      .populate("productId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      reviews: reviews.map(normalizeReview),
    });
  } catch (err: any) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ reviews: [] }, { status: 500 });
  }
}