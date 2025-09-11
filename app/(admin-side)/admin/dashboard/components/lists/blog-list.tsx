'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DeleteBlog, UpdateBlogs } from '@/components/ux/editButtons'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogType } from '@/lib/types/blogs'

export default function BlogList({ blogs }: { blogs: BlogType[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const itemsPerPage = 10

  const filteredBlogs = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()
    return blogs.filter((blog) => {
      if (lowerSearch && !blog.title.toLowerCase().includes(lowerSearch))
        return false

      return true
    })
  }, [blogs, searchQuery])

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredBlogs.slice(start, start + itemsPerPage)
  }, [filteredBlogs, currentPage, itemsPerPage])

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <main className='flex flex-col flex-1'>
        {/* Sticky Filters */}
        <div className='bg-slate-50 sticky top-0 z-50 p-4 sm:p-6 border-b'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
            <h1 className='text-lg sm:text-xl font-semibold'>Blogs</h1>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
              <Input
                placeholder='Search blogs...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='w-full sm:w-64'
              />
              <Link
                href='/admin/dashboard/blogs/create'
                className='w-full sm:w-auto'
              >
                <Button className='gap-2 w-full sm:w-auto'>
                  <Plus size={16} /> Add Blog
                </Button>
              </Link>
            </div>
          </div>

          <Tabs
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val as 'all')
              setCurrentPage(1)
            }}
          >
            <TabsList className='flex flex-wrap gap-2'>
              <TabsTrigger value='all'>All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Product Grid */}
        <ScrollArea className='flex-1 p-4 sm:p-6'>
          {paginatedBlogs.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-center p-6'>
              <p className='text-gray-500 text-lg mb-4'>
                No matching blogs found
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                  setCurrentPage(1)
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <Card className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-6 gap-4 p-4'>
                {paginatedBlogs.map((blog) => (
                 
                  <Card key={blog._id} className='bg-white shadow-sm'>
                    <div className='relative w-full aspect-[3/3]'>
                      <Image
                        src={blog.imageUrl || '/placeholder.jpg'}
                        alt={blog.title}
                        fill
                        className='object-cover'
                      />
                    </div>

                    <CardContent className='px-2 py-1'>
                      <p className='text-base sm:text-lg font-semibold mb-1 line-clamp-1'>
                        {blog.title}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1'>
                        {blog.author}
                      </p>
                      <p className='text-green-600 font-bold text-sm sm:text-xs'>
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </p>

                      {/* Blog Content with Expand/Collapse */}
                      <div className='mt-2'>
                        <p
                          className={`text-gray-600 text-xs sm:text-sm transition-all ${
                            expanded ? 'line-clamp-none' : 'line-clamp-2'
                          }`}
                        >
                          {blog.content}
                        </p>
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className='text-blue-500 text-xs mt-1'
                        >
                          {expanded ? 'Show less' : 'Show more'}
                        </button>
                      </div>
                    </CardContent>

                    <div className='px-4 py-1 mb-1'>
                      <div className='flex items-center justify-between mb-2 text-xs sm:text-sm'>
                        <span>Edit:</span>
                        <div className='flex gap-2'>
                          <UpdateBlogs id={blog._id} />
                          <DeleteBlog id={blog._id} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </Card>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className='flex flex-wrap justify-center mt-6 gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Prev
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      size='sm'
                      variant={currentPage === i + 1 ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </ScrollArea>
      </main>
    </div>
  )
}
