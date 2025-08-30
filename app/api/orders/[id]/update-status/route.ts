
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'

export async function PUT(req: Request,{ params }: { params: { id: string }}) {
  await connectToDatabase

  const { id } = params
  console.log(id, "88888888888888888888888888888")
  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
  }
  
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  
  const { deliveryStatus, fulfillmentStatus, paymentStatus } = body

  if (!deliveryStatus && !fulfillmentStatus && !paymentStatus) {
    return NextResponse.json({ error: 'At least one field must be provided' }, { status: 400 })
  }
  
  try {
    const updated = await Order.findByIdAndUpdate(
      id,
      { deliveryStatus, fulfillmentStatus, paymentStatus },
      { new: true }
    )
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Order updated successfully!', order: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
