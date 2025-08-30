import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import Promo from '@/lib/db/models/promo'
import Product from '@/lib/db/models/product.model'

export async function GET() {
  await connectToDatabase
  const promos = await Promo.find().sort({ createdAt: -1 })
  return NextResponse.json(promos)
}

// export async function POST(req: NextRequest) {
//   await connectToDatabase
//   const data = await req.json()
//   console.log(data, "datadatadata;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
//   const { productId, name, newPrice, originalPrice, imageUrls,  discountPercent,discountAmount, } = data

//   try {
//     //Check if product already exists
//     const exists = await Promo.findOne({ productId })
//     if (exists) {
//       console.log("product exist bitch")
//       return NextResponse.json(
//         { message: 'Product already in promo list' },
//         { status: 409 }
//       )
//     }

// const promo = await Promo.create({
//   productId,
//   name,
//   newPrice,
//   originalPrice,
//   imageUrls,
//   discountAmount,
//   discountPercent,

// })

//     return NextResponse.json(promo)
//   } catch (error) {
//     console.error('Error creating promoProduct:', error)
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     )
//   }
// }

export async function POST(req: NextRequest) {
  await connectToDatabase
  const data = await req.json()

  const {
    productId,
    name,
    newPrice,
    originalPrice,
    imageUrls,
    discountPercent,
    discountAmount,
  } = data

  try {
    // check product exists
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // check if promo already exists
    const exists = await Promo.findOne({ productId })
    if (exists) {
      return NextResponse.json(
        { message: 'Product already in promo list' },
        { status: 409 }
      )
    }

    // update product discount + newPrice
    product.discountPercentage = discountPercent

    ////////////////////////////
    // update product discount + newPrice
    product.discount = discountAmount
    product.newPrice = product.originalPrice - discountAmount
    await product.save()

    // add to promo history/log
    const promo = await Promo.create({
      productId,
      name,
      newPrice,
      originalPrice,
      imageUrls,
      discountAmount,
      discountPercent,
    })

    return NextResponse.json(promo)
  } catch (error) {
    console.error('Error creating promo:', error)
    return NextResponse.json(
      { error: 'Failed to create promo' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  await connectToDatabase
  // Clear all
  await Promo.deleteMany({})
  return NextResponse.json(
    { message: 'All promo items removed' },
    { status: 200 }
  )
}
