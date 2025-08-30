import mongoose from 'mongoose'

const PromoSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true, // Prevent same product from being added twice
    },
    name: String,
    newPrice: Number,
    originalPrice: Number,
    discountAmount: Number,
    discountPercent: Number,
    imageUrls: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Promo || mongoose.model('Promo', PromoSchema)
