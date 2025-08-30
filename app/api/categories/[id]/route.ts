// (GET one, PUT update, DELETE)
import connectToDatabase from '@/lib/db/dbConnection'
import Category from '@/lib/db/models/category.model'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase
  const category = await Category.findById(params.id)
  return NextResponse.json(category)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase

  const { name, imageUrl } = await req.json()
  const updated = await Category.findByIdAndUpdate(
    params.id,
    { name, imageUrl },
    { new: true }
  )

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase
  await Category.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
// alt2
//   const body = await req.json();
//  const updated = await Category.findByIdAndUpdate(params.id, body, {
//     new: true,
//   })
