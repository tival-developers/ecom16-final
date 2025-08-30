import connectToDatabase from '@/lib/db/dbConnection'
import BlogsDashboard from './dashboard'
import Blog from '@/lib/db/models/blog'


export default async function BlogsPage() {
  await connectToDatabase

  const blogsData = await Blog.find()
    .select('title content imageurl status tags updatedAt')
    .limit(10)
    .lean()

  const blogs = JSON.parse(JSON.stringify(blogsData))

  return <BlogsDashboard blogs={blogs} />
}
