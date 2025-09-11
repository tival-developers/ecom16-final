import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import Blog from '@/lib/db/models/blog'

import { NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase
  const blogs = await Blog.find()
    .select('title content imageurl status tags updatedAt, author')
    .lean()
  return NextResponse.json(blogs)
}

export async function POST(req: Request) {
  const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  try {
    await connectToDatabase
    const data = await req.json()

    // 👇 override the author with logged-in user
    const blog = await Blog.create({
      ...data,
      author: session.user?.name || session.user?.email,
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Error creating blog' },
      { status: 500 }
    )
  }
}


