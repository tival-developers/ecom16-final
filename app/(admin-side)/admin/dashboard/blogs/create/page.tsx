'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function CreateBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageurl, setImageurl] = useState('')
  const [status, setStatus] = useState('Pending')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const router = useRouter()

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleSubmit = async () => {
    if (!title || !content || !imageurl) {
      toast.error('Please fill all fields')
      return
    }

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageurl, status, tags }),
    })

    if (res.ok) {
      toast.success('Blog created successfully')
      router.push('/admin/dashboard/blogs')
    } else {
      toast.error('Failed to create blog')
    }
  }

  return (
    <div className='max-w-xl mx-auto mt-10'>
      <Card>
        <CardContent className='space-y-4 p-6'>
          <h2 className='text-lg font-semibold'>Create New Blog</h2>

          <div className='space-y-2'>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className='space-y-2'>
            <Label>Content</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>

          <div className='space-y-2'>
            <Label>Image URL</Label>
            <Input value={imageurl} onChange={(e) => setImageurl(e.target.value)} placeholder="https://..." />
          </div>

          <div className='space-y-2'>
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border rounded p-2 w-full'
            >
              <option value='Pending'>Pending</option>
              <option value='Published'>Published</option>
              <option value='Archived'>Archived</option>
            </select>
          </div>

          <div className='space-y-2'>
            <Label>Tags</Label>
            <div className='flex gap-2'>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder='Enter tag'
              />
              <Button type='button' onClick={handleAddTag}>Add</Button>
            </div>
            <div className='flex flex-wrap gap-1 mt-2'>
              {tags.map((tag, i) => (
                <Badge key={i} variant='secondary'>{tag}</Badge>
              ))}
            </div>
          </div>

          <Button className='w-full' onClick={handleSubmit}>
            Create Blog
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
