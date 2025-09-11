// // app/api/cart/route.ts
// import { auth } from '@/auth'
// import connectToDatabase from '@/lib/db/dbConnection'
// import Cart from '@/lib/db/models/cart'
// import { NextRequest } from 'next/server'



// export async function POST(req: NextRequest) {
//   await connectToDatabase

//   const body = await req.json()
//   const { items } = body

//   const session = await auth()
//   const userId = session?.user?.id
//   if (!userId) {
//     return Response.json([]) // guest: don't fetch from DB
//   }

  

//   const cart = await Cart.findOneAndUpdate(
//     { userId },
//     { $set: { items} },
//     { new: true, upsert: true }
//   )

//   return Response.json({ success: true, items: cart.items })
// }
// app/api/cart/route.ts
import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import Cart from '@/lib/db/models/cart'
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'

type CartItemInput = {
  productId: string
  categoryId: string
  name: string
  originalPrice: number
  imageUrl: string
  quantity: number
}

export async function POST(req: NextRequest) {
  await connectToDatabase

  const body = await req.json()
  const { items } = body

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Response.json([]) // guest: don't save to DB
  }

  const sanitizedItems = (items as CartItemInput[]).map((item) => ({
    ...item,
    productId: new mongoose.Types.ObjectId(item.productId),
    categoryId: new mongoose.Types.ObjectId(item.categoryId),
  }))

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: sanitizedItems } },
    { new: true, upsert: true }
  )

  return Response.json({ success: true, items: cart.items })
}

export async function GET() {
  await connectToDatabase

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Response.json([]) // guest: return empty cart
  }

  const cart = await Cart.findOne({ userId })
  return Response.json(cart ? cart.items : [])
}


// ✅ Add DELETE handler
export async function DELETE() {
  await connectToDatabase

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await Cart.findOneAndDelete({ userId })

  return NextResponse.json({ success: true, message: 'Cart cleared' })
}