import { Schema, model, models } from 'mongoose'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // ✅ correct
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    variations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

const Category = models.Category || model('Category', categorySchema)
export default Category
