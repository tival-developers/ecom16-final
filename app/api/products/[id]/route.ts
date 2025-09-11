
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

// GET single product
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    await connectToDatabase// ✅ must call

    const product = await Product.findById(id)
      .select('_id name originalPrice imageUrls stock variations')
      .populate('category', 'name')

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Convert Mongoose Map → plain object
    if (product.variations) {
      product.variations = Object.fromEntries(
        Object.entries(product.variations)
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// UPDATE product
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    await connectToDatabase
    const body = await req.json()

    const updated = await Product.findByIdAndUpdate(id, body, { new: true })

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    await connectToDatabase
    const deleted = await Product.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
