import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending", // new reviews start as pending
    },

    feedback: { type: String },
  },
  { timestamps: true }
)

export const Review =
  mongoose.models.Review || mongoose.model('Review', ReviewSchema)
 