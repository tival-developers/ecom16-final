import connectToDatabase from '@/lib/db/dbConnection'
import { NextResponse } from 'next/server'
import Promo from '@/lib/db/models/promo'



//get single PromoProduct
export async function GET(_: Request, context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  const promoProduct = await Promo.findById(id)
  return NextResponse.json(promoProduct)
}
//update PromoProduct details
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  const body = await req.json()
  const updated = await Promo.findByIdAndUpdate(id, body, {
    new: true,
  })
  return NextResponse.json(updated)
}
//delete PromoProduct
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  await Promo.findByIdAndDelete(id)
  return NextResponse.json({ message: 'promo item removed' }, { status: 200 })
}
