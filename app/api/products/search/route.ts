
import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''

  if (search.length < 2) {
    return NextResponse.json([], { status: 200 }) // return empty if search too short
  }

  try {
    await connectToDatabase()

    // Search products by name (case-insensitive, partial match)
    const products = await Product.find({
      name: { $regex: search, $options: 'i' },
    })
      .select('name originalPrice imageUrls') // only return needed fields
      .limit(10)
      console.log("current",products)

    // Map _id to string
    const formatted = products.map((p) => ({
      _id: p._id.toString(),
      name: p.name,
      originalPrice: p.originalPrice,
      imageUrls: p.imageUrls?.[0] || '', // ✅ pick the first image URL
    }))

    return NextResponse.json(formatted)
    
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
