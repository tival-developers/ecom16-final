// File: pages/api/flashsale/[id].ts
import connectToDatabase from '@/lib/db/dbConnection'
import FlashSale from '@/lib/db/models/flashsale'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase
  const flashsaleProduct = await FlashSale.findById(params.id)
  return NextResponse.json(flashsaleProduct)
}
//update PromoProduct details
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase
  const body = await req.json()
  const updated = await FlashSale.findByIdAndUpdate(params.id, body, {
    new: true,
  })
  return NextResponse.json(updated)
}
//delete PromoProduct
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase
  await FlashSale.findByIdAndDelete(params.id)
  return NextResponse.json(
    { message: 'flashsale item removed' },
    { status: 200 }
  )
}
