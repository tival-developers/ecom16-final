// app/api/cart/route.ts
import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import Cart from '@/lib/db/models/cart'
import { NextRequest } from 'next/server'

// export async function GET(req: NextRequest) {
//   await connectToDatabase

//   // TODO: Replace with real session user ID
//   const session = await auth()

//   const userId = session?.user?.id
//   if (!userId) {
//     return Response.json([]) // guest: don't fetch from DB
//   }
//   const cart = await Cart.findOne({ userId })

//   return Response.json(cart?.items || [])
// }

// export async function POST(req: NextRequest) {
//   await connectToDatabase

//   const body = await req.json()

//   const { items } = body

//   // TODO: Replace with real session user ID
//   const session = await auth()
//   const userId = session?.user?.id
//   if (!userId) {
//     return Response.json([]) // guest: don't fetch from DB
//   }

//   const cart = await Cart.findOneAndUpdate(
//     { userId },
//     { $set: { items } },
//     { new: true, upsert: true }
//   )
//   console.log('Saved cart:', cart)

//   return Response.json({ success: true, items: cart.items })
// }

// export async function DELETE(req: NextRequest) {
//   await connectToDatabase
//   const session = await auth()
//   console.log('Session:', session)
//   const userId = session?.user?.id

//   await Cart.findOneAndDelete({ userId })

//   return Response.json({ success: true })
// }
export async function POST(req: NextRequest) {
  await connectToDatabase

  const body = await req.json()
  const { items } = body

  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Response.json([]) // guest: don't fetch from DB
  }

  // ✅ enforce correct schema
  const normalizedItems = items.map((i: any) => ({
    productId: i.productId,
    categoryId: i.categoryId,
    name: i.name,
    originalPrice: i.originalPrice ?? i.price ?? 0, // fallback if old field
    quantity: i.quantity,
    imageUrl: i.imageUrl,
  }))

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: normalizedItems } },
    { new: true, upsert: true }
  )

  return Response.json({ success: true, items: cart.items })
}
