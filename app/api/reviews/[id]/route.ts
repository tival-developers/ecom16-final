import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Review } from '@/lib/db/models/review'
import { auth } from '@/auth'


// GET a single review by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params

  await connectToDatabase
  const review = await Review.findById(id)
    .populate('customerId', 'name email')
    .populate('productId', 'name')

  if (!review) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ review })
}

// PATCH (admin only: update status)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params

  try {
    const { status } = await req.json()

    const review = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('customerId', 'name email')
      .populate('productId', 'name')

    if (!review) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(
      { review },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error updating review:', err)
    return NextResponse.json(
      { error: "Internal server error" ,status: 500 }
    );
  }
}

// PUT (update review by owner or admin)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const review = await Review.findById(id)

  if (!review) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  review.rating = body.rating ?? review.rating
  review.feedback = body.feedback ?? review.feedback
  review.status = body.status ?? review.status
  await review.save()
  await review.populate('customerId', 'name email')
  await review.populate('productId', 'name')

  return NextResponse.json({ review })
}

// DELETE review
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const review = await Review.findById(id)
  if (!review) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await review.deleteOne()
  return NextResponse.json({ message: 'Deleted successfully' })
}
