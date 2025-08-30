import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'
import Image from 'next/image'
import Link from 'next/link'


  
  export default async function Example() {
    await connectToDatabase

  const fetchPosts = await Blog.find().lean()
  const posts = JSON.parse(JSON.stringify(fetchPosts))

  if (posts.length=== 0) {
    return (
      <div className='container mx-auto p-4'>
        <p>Blogs will be added soon.</p>
      </div>
    )
  }

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Learn matters relating to tech with our expert advice.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.updatedAt} className="text-gray-500">
                  {new Date(post.updatedAt).toLocaleString()}
                  </time>
                  
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <Link href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>
                </div>
                
                {/* </div> */}
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  