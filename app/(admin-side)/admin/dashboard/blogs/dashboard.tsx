'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BlogType {
  _id: string
  title: string
  content: string
  imageurl: string
  status: string
  tags: string[]
  updatedAt: string
}

export default function BlogsDashboard({ blogs }: { blogs: BlogType[] }) {
  const [search, setSearch] = useState('')

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <main className='flex-1 p-6'>
        <div className='flex items-center justify-between mb-6 flex-wrap gap-4'>
          <h1 className='text-xl font-semibold'>Blogs</h1>
          <div className='flex gap-2'>
            <Input
              placeholder='Search blogs...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-64'
            />
            <Link href='/admin/dashboard/blogs/create'>
              <Button variant='default' className='gap-2'>
                <Plus size={16} /> Add Blog
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue='all' className='mb-4'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='published'>Published</TabsTrigger>
            <TabsTrigger value='archived'>Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {filteredBlogs.map((blog) => (
              //   <Card key={blog._id} className='bg-white shadow-sm'>
              //     <p className=' p-2.5 my-0.5  text-gray-800 text-right'>
              //       Edited at:{' '}
              //       <Button variant='outline'>
              //         {new Date(blog.updatedAt).toLocaleString()}
              //       </Button>
              //     </p>
              //     <CardContent className='p-4 space-y-2 flex-grow'>
              //       <Image
              //         src={blog.imageurl}
              //         alt={blog.title}
              //         width={800}
              //         height={300}
              //         className='rounded-lg w-full h-56 object-cover'
              //       />
              //       <div className='flex justify-between items-start'>
              //         <div>
              //           <h3 className='text-2xl font-medium mb-2 text-yellow-700 '>
              //             {blog.title}
              //           </h3>
              //           <p className=' text-gray-500'>Id: {blog._id}</p>
              //           <p>{blog.content}</p>
              //         </div>
              //         <Badge
              //           variant='outline'
              //           className={
              //             blog.status === 'Published'
              //               ? 'text-green-600 border-green-600'
              //               : 'text-red-500 border-red-500'
              //           }
              //         >
              //           {blog.status}
              //         </Badge>
              //       </div>

              //       <div className='flex flex-wrap gap-1'>
              //         {blog.tags.map((tag, i) => (
              //           <Badge
              //             key={i}
              //             variant='secondary'
              //             className='text-[15px] text-yellow-600'
              //           >
              //             {tag}
              //           </Badge>
              //         ))}
              //       </div>

              //       {blog.status === 'Pending' && (
              //         <div className='flex justify-between items-center mt-2'>
              //           <p className='font-medium text-gray-800'>
              //             Awaiting Publishing
              //           </p>
              //           <div className='flex gap-2'>
              //             <Button
              //               size='sm'
              //               variant='outline'
              //               className='text-[15px] px-2 py-1'
              //             >
              //               Publish
              //             </Button>
              //           </div>
              //         </div>
              //       )}
              //       <div>
              //         <Button
              //           size='sm'
              //           variant='destructive'
              //           className='text-[15px] px-2 py-1 justify-items-end'
              //         >
              //           Delete
              //         </Button>
              //       </div>
              //     </CardContent>
              //   </Card>
              <Card
                key={blog._id}
                className='bg-white shadow-sm flex flex-col h-full'
              >
                <p className='p-2.5 my-0.5 text-gray-800 text-right'>
                  Edited at:{' '}
                  <Button variant='outline'>
                    {new Date(blog.updatedAt).toLocaleString()}
                  </Button>
                </p>

                <CardContent className='p-4 space-y-2 flex flex-col flex-grow'>
                  <Image
                    src={blog.imageurl}
                    alt={blog.title}
                    width={800}
                    height={300}
                    className='rounded-lg w-full h-56 object-cover'
                  />

                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-2xl font-medium mb-2 text-yellow-700'>
                        {blog.title}
                      </h3>
                      <p className='text-gray-500'>Id: {blog._id}</p>
                      <p>{blog.content}</p>
                    </div>

                    <Badge
                      variant='outline'
                      className={
                        blog.status === 'Published'
                          ? 'text-green-600 border-green-600'
                          : 'text-red-500 border-red-500'
                      }
                    >
                      {blog.status}
                    </Badge>
                  </div>

                  <div className='flex flex-wrap gap-1'>
                    {blog.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant='secondary'
                        className='text-[15px] text-yellow-600'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {blog.status === 'Pending' && (
                    <div className='flex justify-between items-center mt-2'>
                      <p className='font-medium text-gray-800'>
                        Awaiting Publishing
                      </p>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          className='text-[15px] px-2 py-1 text-yellow-600'
                        >
                          Publish
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className='mt-auto pt-2'>
                    <Button
                      size='sm'
                      variant='destructive'
                      className='text-[15px] px-2 py-1 w-full'
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
