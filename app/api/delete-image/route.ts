// app/api/delete-image/route.ts
import { NextResponse } from 'next/server'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const { public_id } = await req.json()

  if (!public_id) return NextResponse.json({ error: 'Missing public_id' }, { status: 400 })

  try {
    const result = await cloudinary.v2.uploader.destroy(public_id)
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete image', details: error }, { status: 500 })
  }
}
