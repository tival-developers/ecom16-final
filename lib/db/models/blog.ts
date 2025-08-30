import mongoose, { Schema } from 'mongoose'

const BlogSchema = new Schema(
  {
    title: String,
    content: String,
    imageurl: String,
    status: String,
    tags: [String],
    category: {
      name: String,
      imageUrl: String,
    },
    author: {
      name: String,
      profilePic: String,
      // role: '',
    },
  },
  { timestamps: true }
)

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
export default Blog
