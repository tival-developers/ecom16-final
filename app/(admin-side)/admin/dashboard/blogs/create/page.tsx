'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CreateBlog } from '@/lib/actions/blogs'
import { useRouter } from 'next/navigation'

export default function CreateBlogPage() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

  // Controlled inputs
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageurl, setImageurl] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('imageurl', imageurl)

    startTransition(async () => {
      const res = await CreateBlog(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)

        // reset only on success
        setTitle('')
        setContent('')
        setImageurl('')
        router.push('/admin/dashboard/blogs')
      }
    })
  }

  return (
    <div className='max-w-xl mx-auto mt-10 px-2'>
      <Card>
        <CardContent className='space-y-4 p-6'>
          <h2 className='text-lg font-semibold'>Create New Blog</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Write your blog content here...'
              />
              {errors.content && (
                <p className='text-red-500 text-sm'>{errors.content[0]}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label>Image URL</Label>
              <Input
                name='imageUrl'
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
            {success && <p className='text-green-600 text-sm'>Blog created!</p>}

            <Button className='w-full' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
