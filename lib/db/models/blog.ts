import mongoose, { Schema } from 'mongoose'

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageurl: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
)

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
export default Blog
