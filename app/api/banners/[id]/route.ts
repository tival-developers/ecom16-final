import connectToDatabase from '@/lib/db/dbConnection'
import Banner from '@/lib/db/models/Banner.model'
import { NextResponse } from 'next/server'

//get single Banner
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  const banner = await Banner.findById(id)
  return NextResponse.json(banner)
}

//delete Banner
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase
  await Banner.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
