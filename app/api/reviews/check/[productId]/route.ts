import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import { auth } from "@/auth";
import { canUserReviewProduct } from "@/lib/helper/reviews";
import { Review } from "@/lib/db/models/review";
import User from "@/lib/db/models/user.model";

export async function GET(
  req: Request,
  context: { params: Promise<{ productId: string }> } // 👈 note Promise here
) {
  const { productId } = await context.params; // 👈 must await

  await connectToDatabase();
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ canReview: false });
  }

  // Find user
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ canReview: false });
  }

  // Check eligibility
  const canReview = await canUserReviewProduct(user._id.toString(), productId);

  // Also return existing review if present
  const existingReview = await Review.findOne({
    customerId: user._id,
    productId,
  }).select("rating feedback customer");

  return NextResponse.json({
    canReview,
    existingReview: existingReview
      ? {
          rating: existingReview.rating,
          feedback: existingReview.feedback,
          customerName: existingReview.customer?.name || null,
        }
      : null,
  });
}
