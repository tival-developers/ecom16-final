import { Review } from '../db/models/review'
import { Order } from '../db/models/order'
import connectToDatabase from '@/lib/db/dbConnection'
import mongoose from 'mongoose'
import User from '../db/models/user.model'

export async function canUserReviewProduct(
  userId: string,
  productId: string
): Promise<boolean> {
  // 1) Connect DB
  await connectToDatabase

  // 2) Find user
  const user = await User.findById(userId)
  if (!user) return false

  // 3) Check if already reviewed
  const existingReview = await Review.findOne({
    customerId: user._id,
    productId,
  })
  if (existingReview) return false

  // 4) Check if product was purchased in a fulfilled order
  const hasPurchased = await Order.exists({
    customerId: user._id,
    fulfillmentStatus: 'fulfilled',
    'items.productId': new mongoose.Types.ObjectId(productId),
  })

  return !!hasPurchased
}
