// app/api/orders/route.ts

import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import { auth } from '@/auth'
import User from '@/lib/db/models/user.model'

export async function GET() {
  await connectToDatabase

  // 1) Authenticate the user
  const session = await auth()
  console.log(session, 'rrrrrrrrrrrrrrrrrrrrrrrrr')
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2) Connect to your MongoDB (Mongoose)
  await connectToDatabase

  try {
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // 3) Find the user's orders
    const orders = await Order.find({ customerId: user._id })
      .sort({ createdAt: -1 })
      .lean()

    // 4) Return them as JSON
    return NextResponse.json(orders, { status: 200 })
  } catch (err) {
    console.error('FETCH_ORDERS_ERROR', err)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
