import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import Banner from '@/lib/db/models/Banner.model'

export const dynamic = 'force-static'

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()
  const {
    title,
    subtitle,
    imageUrl,
    productId,
    buttonText,
    price,
    bannerType,
  } = data

  try {
    // Check if Banner already exists
    const bannerExist = await Banner.findOne({ title })
    if (bannerExist) {
     //console.log('banner exist ')
      return NextResponse.json(
        { message: 'banner already exists' },
        { status: 409 }
      )
    }

    // If not, create it
    const banner = await Banner.create({
      title,
      buttonText,
      productId,
      imageUrl,
      subtitle,
      price,
      bannerType,
    })

    return NextResponse.json({ banner, success: true })
  } catch (error) {
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
///get
export async function GET() {
  await connectToDatabase()
  const banners = await Banner.find().sort({ createdAt: -1 })
  return NextResponse.json(banners)
}

//delete
export async function DELETE(req: NextRequest) {
  await connectToDatabase()
  const { id } = await req.json()

  try {
    await Banner.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Banner deleted' })
  } catch (error) {
    console.error('Error  deleting banner', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
