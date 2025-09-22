import mongoose from 'mongoose'
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    serialNumber: { type: String },
    brand: { type: String, required: true },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: { type: Number, default: 0 }, // percentage
    discount: { type: Number, default: 0 },
    newPrice: { type: Number }, // optional, derived when discount set
    variations: {
      type: Map,
      of: String,
      default: {},
    },

    imageUrls: [{ type: String, required: true }], // 👈 now an array

    stock: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    // 🔹 Tags
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false }, // 👈 new tag
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models?.Product || mongoose.model('Product', productSchema)
export default Product
