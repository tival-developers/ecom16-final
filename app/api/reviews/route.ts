// app/api/reviews/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Review } from '@/lib/db/models/review'
import { auth } from '@/auth'
import User from '@/lib/db/models/user.model'
import { canUserReviewProduct } from '@/lib/helper/reviews'
import Product from '@/lib/db/models/product.model'
import Notification from '@/lib/db/models/notification'


export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId, rating, feedback } = await req.json()

  // Validate input
  if (!productId || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  if (typeof feedback !== 'string' || feedback.trim().length < 3) {
    return NextResponse.json({ error: 'Feedback too short' }, { status: 400 })
  }

  await connectToDatabase()

  try {
    // 1) Get the user
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 2) Check if review already exists
    const existingReview = await Review.findOne({
      customerId: user._id,
      productId,
    })

    // 3) If no existing review, ensure user is eligible
    if (!existingReview) {
      const eligible = await canUserReviewProduct(user._id.toString(), productId)
      if (!eligible) {
        return NextResponse.json(
          { error: 'You cannot review this product' },
          { status: 403 }
        )
      }
    }

    // 4) Upsert review (new or update existing)
    const review = await Review.findOneAndUpdate(
      { customerId: user._id, productId },
      {
        customerId: user._id,
        productId,
        rating,
        feedback: feedback.trim(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    // 5) Create notification only for NEW review
    
    if (!existingReview) {
      const product = await Product.findById(productId).select('name')
      await Notification.create({
        type: 'review',
        title: 'New Review',
        customerId: user._id,
        message: `New review by ${user.name || user.email} on ${product?.name || 'a product'}`,
      })
    }
    

    return NextResponse.json({
      success: true,
      message: existingReview
        ? 'Review updated successfully'
        : 'Review submitted successfully',
      review: {
        rating: review.rating,
        feedback: review.feedback,
        productId: review.productId,
        updatedAt: review.updatedAt,
      },
    })
  } catch (err) {
    console.error('Review error:', err)
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  await connectToDatabase()

  try {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")
    const customerId = searchParams.get("customerId")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {}
    if (productId) filter.productId = productId
    if (customerId) filter.customerId = customerId

    const reviews = await Review.find(filter)
      .populate("customerId", "name email")
      .populate("productId", "name")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      reviews: reviews.map(r => ({
        _id: r._id.toString(),
        product: r.productId?.name || "Unknown",
        user: r.customerId?.name || r.customerId?.email || "Unknown",
        rating: r.rating,
        feedback: r.feedback,
        status: r.status,
        createdAt: r.createdAt,
      }))
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

