import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'

import { NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase
  const blogs = await Blog.find()
    .select('title content imageurl status tags updatedAt')
    .lean()
  return NextResponse.json(blogs)
}

export async function POST(req: Request) {
  try {
    await connectToDatabase
    const { title, content, imageurl, status, tags } = await req.json()

    const newBlog = new Blog({ title, content, imageurl, status, tags })
    await newBlog.save()

    return NextResponse.json({ message: 'Blog created' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Error creating blog' },
      { status: 500 }
    )
  }
}
