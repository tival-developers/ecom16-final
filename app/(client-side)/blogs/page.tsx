import { Card, CardContent } from '@/components/ui/card'
import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

type postType = {
  _id: string
  title: string
  content: string
  updatedAt: Date
  imageurl: string
  author: string
}

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'view blogs',
}

export default async function Blogs() {
  await connectToDatabase

  const fetchPosts = await Blog.find().lean()
  const posts = JSON.parse(JSON.stringify(fetchPosts))
  console.log('uuuuuuuuuuuuuuuuuuuuu', posts)

  if (posts.length === 0) {
    return (
      <div className='container mx-auto p-4'>
        <p>Blogs will be added soon.</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-6'>
      <h2 className="text-3xl font-bold text-amber-600">Latest Posts</h2>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post: postType) => (
          <Card
            key={post._id}
            className='rounded-2xl shadow-md hover:shadow-lg transition-all'
          >
            <div className='relative flex items-center w-full justify-center m-1.5'>
              <Image
                src={post.imageurl}
                alt={post.title}
                width={400}
                height={400}
                className=' object-contain  flex items-center w-[280px] '
              />
            </div>

            <CardContent className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
              <p className='text-sm text-muted-foreground mb-2'>
                By {post.author} •
                {new Date(post.updatedAt).toLocaleDateString()}
              </p>
              <p className='text-muted-foreground mb-4 line-clamp-2'>
                {post.content}
              </p>
              <Link
                href={`/blogs/${post._id}`}
                className='text-blue-600 font-medium  hover:text-amber-600'
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
