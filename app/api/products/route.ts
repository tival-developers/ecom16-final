
import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import { FormSchemaProduct } from '@/lib/zod/schemasValidations'


export async function POST(req: NextRequest) {
  await connectToDatabase()
  
  const body = await req.json()
  const parse = FormSchemaProduct.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 })
  }

  const data = parse.data
  

  // Mongoose pre-save will compute basePrice as the minimum achievable price
  const prod = await Product.create({
    ...data,
  })

  return NextResponse.json({ product: prod }, { status: 201 })
}
