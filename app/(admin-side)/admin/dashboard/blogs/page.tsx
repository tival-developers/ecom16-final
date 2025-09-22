import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'
import mongoose from 'mongoose'
import BlogList from '../components/lists/blog-list'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Blogs ',
  description: ' View and add blogs ',
}

export default async function Home() {
  await connectToDatabase()
  const blogModel = mongoose.models.Blog || Blog
  const blogs = await blogModel.find().lean()

  return <BlogList blogs={JSON.parse(JSON.stringify(blogs))} />
}
