import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    buttonText: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    bannerType: {
      type: String,
      enum: ['hero', 'promoMini', 'promoLarge'],
      default: 'hero',
      required: true,
    },
  },
  { timestamps: true }
)

const Banner = mongoose.models?.Banner || mongoose.model('Banner', BannerSchema)
export default Banner
