import { Card } from '@/components/ui/card'
import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'view blog',
}



 export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  await connectToDatabase
  const posts = await Blog.find({}, '_id').lean()

  return posts.map((post) => ({
    id: String(post._id),
  }))
}

export default async function BlogPage(context: {
  params: Promise<{ id: string }>
}) {
  await connectToDatabase
  const { id } = await context.params 

  const Post = await Blog.findById(id).lean()

  if (!Post) {
    return (
      <div className='container mx-auto p-4'>
        <h2 className="text-3xl font-bold text-amber-600">Post not found.</h2>
      </div>
    )
  }

  const post = JSON.parse(JSON.stringify(Post))
  console.log('posts', post)

  return (
    <Card className='max-w-4xl mx-auto p-6 prose border-2 bg-amber-100 '>
      <article key={post._id} className=' p-3 prose lg:prose-xl '>
        <div className='relative flex items-center w-full justify-center m-1.5'>
          <Image
            src={post.imageurl}
            alt={post.title}
            width={400}
            height={200}
            className=' object-contain  flex items-center w-[400px] '
          />
        </div>

        <h1 className='text-4xl font-bold mb-2'>{post.title}</h1>
        <p className='text-muted-foreground text-sm mb-6'>
          By Trendz • {new Date(post.updatedAt).toLocaleDateString()}
        </p>
        <div className='prose'> {post.content} </div>
      </article>
    </Card>
  )
}
