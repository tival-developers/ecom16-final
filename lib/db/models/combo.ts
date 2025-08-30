// models/Cart.ts
import mongoose from 'mongoose'
const comboSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    originalPrice: Number,
    save: Number,
    quantity: Number,
    imageUrl: String,
  },
  { timestamps: true }
)

const Favorite =
  mongoose.models.Favorite || mongoose.model('Favorite', comboSchema)

export default Favorite
