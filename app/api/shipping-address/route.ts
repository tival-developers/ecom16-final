import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import { ShippingAddress } from '@/lib/db/models/shipping'


export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectToDatabase()

  const shippingAddress = await ShippingAddress.findOne({ customerId: session.user.id }).lean()

  if (!shippingAddress) {
    return NextResponse.json({ error: 'No shipping address found' }, { status: 404 })
  }

  return NextResponse.json(shippingAddress)
}

