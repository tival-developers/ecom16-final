import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import { revalidatePath } from 'next/cache'
import Product from '@/lib/db/models/product.model'
import { auth } from '@/auth'

export async function PUT(req: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  await connectToDatabase

  
  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { deliveryStatus, paymentStatus } = body
  let fulfillmentStatus = body.fulfillmentStatus

  if (!deliveryStatus && !fulfillmentStatus && !paymentStatus) {
    return NextResponse.json(
      { error: 'At least one field must be provided' },
      { status: 400 }
    )
  }

  try {
    
    const order = await Order.findById(id)
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // ✅ Reduce product stock only on transition to success
    if (paymentStatus === 'success' && order.paymentStatus !== 'success') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { quantity: -item.quantity },
        })
      }
    }

    // ✅ If both payment success & delivery delivered -> mark fulfilled
    if (
      (paymentStatus === 'success' || order.paymentStatus === 'success') &&
      (deliveryStatus === 'shipped' || order.deliveryStatus === 'shipped')
    ) {
      fulfillmentStatus = 'fulfilled'
    }

    if (
      (paymentStatus === 'pending' || order.paymentStatus === 'pending') &&
      (deliveryStatus === 'pending' || order.deliveryStatus === 'pending')
    ) {
      fulfillmentStatus = 'unfulfilled'
    }

    // ✅ Update order with new statuses
    order.paymentStatus = paymentStatus || order.paymentStatus
    order.deliveryStatus = deliveryStatus || order.deliveryStatus
    order.fulfillmentStatus = fulfillmentStatus || order.fulfillmentStatus
    await order.save()
    

    // ✅ Revalidate admin products page
    revalidatePath('/admin/dashboard/products')
     revalidatePath('/admin/dashboard/orders')


    return NextResponse.json({
      message: 'Order updated successfully!',
      order,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
