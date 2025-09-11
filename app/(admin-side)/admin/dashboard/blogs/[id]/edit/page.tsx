
import Blog from '@/lib/db/models/blog'
import UpdateBlogForm from './form'

export default async function EditBlogPage(context: {
  params: Promise<{ id: string }>
}) {
  const { id } = await context.params // ✅ Await params
  const getBlog = await Blog.findById(id).lean()
  const blog = JSON.parse(JSON.stringify(getBlog))

  return (
    <div className='p-6'>
      <UpdateBlogForm blog={blog} />
    </div>
  )
}
