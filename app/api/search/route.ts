// app/api/search/route.ts
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import User from '@/lib/db/models/user.model'
import { Order } from '@/lib/db/models/order'
import Category from '@/lib/db/models/category.model'
import Admin from '@/lib/db/models/admin'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('q') || '' // use `q` for consistency
  if (search.length < 2) {
    return NextResponse.json(
      { users: [], admins: [], products: [], orders: [], categories: [] },
      { status: 200 }
    )
  }

  try {
    await connectToDatabase()

    const regex = new RegExp(search, 'i')

    const [users, admins, products, orders, categories] = await Promise.all([
      User.find({ name: regex }).select('name email').limit(5),
      Admin.find({ name: regex }).select('name email').limit(5),
      Product.find({ name: regex }).select('name price').limit(5),
      Order.find({ orderId: regex }).select('orderId customer').limit(5),
      Category.find({ name: regex }).select('name').limit(5),
    ])

    return NextResponse.json({
      users,
      admins,
      products,
      orders,
      categories,
    })
  } catch (error) {
    console.error('SEARCH_FETCH_ERROR', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
