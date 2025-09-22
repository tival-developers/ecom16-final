import connectToDatabase from '@/lib/db/dbConnection'
import FlashSale from '@/lib/db/models/flashsale'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase()
  const flashsale = await FlashSale.find().sort({ createdAt: -1 })
  const formatted = flashsale.map((item) => ({
    ...item.toObject(),
    startAt: new Date(item.startAt),
    endAt: new Date(item.endAt),
  }))
  return NextResponse.json(formatted)
}

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()
  const {
    productId,
    startAt,
    name,
    price,
    originalPrice,
    imageUrls,
    discountPercent,
    endAt,
    createdBy,
  } = data

  try {
    //Check if product already exists
    const productexist = await FlashSale.findOne({ productId })

    if (productexist) {
      console.log('flashsaleProducts exist bitch')
      return NextResponse.json(
        { message: 'flashsaleProducts already exists' },
        { status: 409 }
      )
    }

    const flashsaleProducts = await FlashSale.create({
      productId,
      name,
      price,
      originalPrice,
      imageUrls,
      startAt: new Date(startAt),
      discountPercent,
      endAt: new Date(endAt),
      createdBy,
    })
    revalidatePath('/admin/dashboard/promotions/flashsale')

    return NextResponse.json({ flashsaleProducts, success: true })
  } catch (error) {
    console.error('Error creating flashsaleProducts:', error)
    return NextResponse.json(
      { error: 'Failed to create flashsaleProducts' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  await connectToDatabase()
  // Clear all
  await FlashSale.deleteMany({})
  return NextResponse.json(
    { message: 'All flashsale items removed' },
    { status: 200 }
  )
}
