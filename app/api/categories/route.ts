// (GET all, POST create)
import connectToDatabase  from "@/lib/db/dbConnection";
import Category from "@/lib/db/models/category.model";
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  await connectToDatabase
  const data = await req.json()
  const { name } = data

  try {
    // Check if Category already exists
    const categoryExist = await Category.findOne({ name })
    if (categoryExist) {
      console.log('category exist ')
      return NextResponse.json(
        { message: 'category already exists' },
        { status: 409 }
      );
    }

    // If not, create it
    const category = await Category.create({
      name,
      //imageUrl,
      //slug,
    })

    return NextResponse.json({ category, success: true })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function GET() {
  await connectToDatabase
  const category = await Category.find()
  return NextResponse.json(category)
}

