// lib/actions/blogs.actions.ts
'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { revalidatePath } from 'next/cache'
import Blog from '../db/models/blog'
import { auth } from '@/auth'
import Notification from '../db/models/notification'
import { BlogSchema, BlogUpdateSchema } from '../zod/schemasValidations'

import User from '../db/models/user.model'

export type BlogResult =
  | { success: true }
  | { errors: Record<string, string[]> }

///get blogs////
export async function getBlogs() {
  await connectToDatabase()
  return await Blog.find().sort({ createdAt: -1 }).lean()
}

// ----------------
// Create Blog Action
// ----------------
export async function CreateBlog(formData: FormData): Promise<BlogResult> {
  console.log('--- CreateBlog called ---')
  const session = await auth()
  if (!session?.user?.id) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const role = session.user.role
  if (!role) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const allowedRoles = ['developer', 'manager', 'sales', 'superadmin']
  if (!allowedRoles.includes(role || '')) {
    return {
      errors: {
        _form: [
          'Forbidden: Only superadmin, manager, or sales can create products',
        ],
      },
    }
  }

  await connectToDatabase()
  console.log('✅ DB connected')

  const user = await User.findOne({ email: session.user.email })
  if (!user) {
    return { errors: { _form: ['User not found'] } }
  }

  try {
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      imageurl: formData.get('imageurl'),
      author: session.user.name || 'Unknown',
    }

    // validate
    const parsed = BlogSchema.safeParse(data)

    console.log('Parsed result:', parsed)

    

    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    const { title, content, imageurl, author } = parsed.data

    // check for duplicate
    const existing = await Blog.findOne({ title })
    if (existing) {
      return { errors: { title: ['Blog already exists'] } }
    }

    // save
    const newBlog = new Blog({
      title,
      content,
      imageurl,
      author,
    })

    await newBlog.save()
    await Notification.create({
      type: 'blog',
      title: 'New blog created',
      triggerId: user._id,
      message: 'New blog created',
    })

    revalidatePath('/admin/dashboard/blogs')

    return { success: true }
  } catch (err) {
    console.error('Error creating blog:', err)
    return {
      errors: {
        _form: [
          err instanceof Error ? err.message : 'Unexpected error occurred',
        ],
      },
    }
  }
}

// ----------------
// Update Blog Action
// ----------------
export async function UpdateBlog(formData: FormData): Promise<BlogResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const role = session.user.role
  if (!role) {
    return { errors: { _form: ['Unauthorized'] } }
  }
  const allowedRoles = ['developer', 'manager', 'sales', 'superadmin']
  if (!allowedRoles.includes(role || '')) {
    return {
      errors: {
        _form: [
          'Forbidden: Only superadmin, manager, or sales can create products',
        ],
      },
    }
  }

  await connectToDatabase()
  
  try {
    // validate
    const parsed = BlogUpdateSchema.safeParse({
      id: formData.get('id'),
      title: formData.get('title'),
      content: formData.get('content'),
      imageurl: formData.get('imageurl'),
      author: session.user.name || 'Unknown',
    })

    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    const { id, title, content, imageurl, author } = parsed.data
    const updateData: Record<string, unknown> = {}

    if (title) updateData.title = title
    if (content) updateData.content = content
    if (imageurl) updateData.imageurl = imageurl
    if (author) updateData.author = author

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    if (!updatedBlog) {
      return { errors: { _form: ['Blog not found'] } }
    }

    revalidatePath('/admin/dashboard/blogs')
    return { success: true }
  } catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err // let Next.js handle the redirect
    }

    console.error('Error creating blog:', err)
    return {
      errors: {
        _form: [
          err instanceof Error ? err.message : 'Unexpected error occurred',
        ],
      },
    }
  }
}
////delete blog//////
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await connectToDatabase()
    await Blog.findByIdAndDelete(id)

    revalidatePath('/admin/dashboard/blogs')
  } catch (err) {
    console.error(err)
    throw new Error('Failed to delete blog')
  }
}
