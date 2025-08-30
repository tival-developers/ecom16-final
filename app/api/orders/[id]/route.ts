// app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'





export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase;
  const order = await Order.findByIdAndDelete(params.id)
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Order deleted' })
}
