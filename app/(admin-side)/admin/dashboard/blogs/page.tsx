import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'
import mongoose from 'mongoose'
import BlogList from '../components/lists/blog-list'

export default async function Home() {
  await connectToDatabase
  const blogModel = mongoose.models.Blog || Blog
  const blogs = await blogModel.find().lean()

  return <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />
}
