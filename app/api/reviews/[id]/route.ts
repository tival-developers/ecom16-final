import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import { Review } from "@/lib/db/models/review";
import { auth } from "@/auth";

// helper to normalize shape
export function normalizeReview(r: any) {
  return {
    _id: r._id.toString(),
    product: r.productId?.name || "Unknown",
    user: r.customerId?.name || r.customerId?.email || "Unknown",
    rating: r.rating,
    feedback: r.feedback,
    status: r.status,
    createdAt: r.createdAt,
  };
}

// GET a single review by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const review = await Review.findById(params.id)
    .populate("customerId", "name email")
    .populate("productId", "name");

  if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ review: normalizeReview(review) });
}

// PATCH (admin only: update status)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase;

  try {
    const { status } = await req.json();

    const review = await Review.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("customerId", "name email")
      .populate("productId", "name");

    if (!review) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ review: normalizeReview(review) }, { status: 200 });
  } catch (err: any) {
    console.error("Error updating review:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT (update review by owner or admin)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const review = await Review.findById(params.id);

  if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });

  review.rating = body.rating ?? review.rating;
  review.feedback = body.feedback ?? review.feedback;
  review.status = body.status ?? review.status;
  await review.save();
  await review.populate("customerId", "name email");
  await review.populate("productId", "name");

  return NextResponse.json({ review: normalizeReview(review) });
}

// DELETE review
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const review = await Review.findById(params.id);
  if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await review.deleteOne();
  return NextResponse.json({ message: "Deleted successfully" });
}
