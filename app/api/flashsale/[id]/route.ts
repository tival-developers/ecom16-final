// File: pages/api/flashsale/[id].ts
import connectToDatabase from '@/lib/db/dbConnection'
import FlashSale from '@/lib/db/models/flashsale'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase()
  const flashsaleProduct = await FlashSale.findById(id)
  return NextResponse.json(flashsaleProduct)
}
//update PromoProduct details
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase()
  const body = await req.json()
  const updated = await FlashSale.findByIdAndUpdate(id, body, {
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
  await FlashSale.findByIdAndDelete(id)
  return NextResponse.json(
    { message: 'flashsale item removed' },
    { status: 200 }
  )
}
