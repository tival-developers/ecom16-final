// File: models/FlashSale.ts
import mongoose from 'mongoose'

// Avoid redefining model during hot reload
const FlashSaleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true, // Prevent same product from being added twice
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    imageUrls: [String], // support multiple images
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

// Check if model already exists before defining
const FlashSale = mongoose.models.FlashSale || mongoose.model('FlashSale', FlashSaleSchema)

export default FlashSale
