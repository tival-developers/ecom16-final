'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { UpdateBlog } from '@/lib/actions/blogs'
import { useRouter } from 'next/navigation'

type Props = {
  blog: {
    _id: string
    title: string
    content: string
    imageurl: string
  }
}
export default function UpdateBlogForm({ blog }: Props) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const [title, setTitle] = useState(blog.title ?? '')
  const [content, setContent] = useState(blog.content ?? '')
  const [imageurl, setImageurl] = useState(blog.imageurl ?? '')


  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await UpdateBlog(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)

        router.push('/admin/dashboard/blogs')
      }
    })
  }

  return (
    <div className='max-w-xl mx-auto mt-10 px-2'>
      <Card>
        <CardContent className='space-y-4 p-6'>
          <h2 className='text-lg font-semibold'>Update Blog</h2>

          <form action={handleSubmit} className='space-y-4'>
            {/* Hidden field for ID */}
            <input type='hidden' name='id' value={blog._id} />
            <div className='space-y-2'>
              <Label>Title</Label>
              <Input
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className='text-red-500 text-sm'>{errors.title[0]}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label>Content</Label>
              <Textarea
                name='content'
                placeholder='Write your blog content here...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <p className='text-red-500 text-sm'>{errors.content[0]}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label>Image URL</Label>
              <Input
                name='imageurl'
                type='url'
                placeholder='https://...'
                value={imageurl}
                onChange={(e) => setImageurl(e.target.value)}
              />
              {errors.imageurl && (
                <p className='text-red-500 text-sm'>{errors.imageurl[0]}</p>
              )}
            </div>

            {errors._form && (
              <p className='text-red-500 text-sm'>{errors._form[0]}</p>
            )}
            {success && <p className='text-green-600 text-sm'>Blog updated!</p>}

            <Button className='w-full' disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Blog'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
