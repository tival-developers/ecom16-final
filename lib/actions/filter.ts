'use server'

import connectToDatabase from "@/lib/db/dbConnection"
import Product from "../db/models/product.model"
import { ProductType } from "../types/product"



export async function getFilteredProducts({
  category,
  min,
  max,
}: {
  category?: string
  min?: number
  max?: number
}): Promise<ProductType[]> {
  await connectToDatabase // ✅ FIXED: add parentheses to call the function

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {}

  if (category && category !== 'All') {
    // filter.categorySlug = category
    filter.category = category
  }

  if (min !== undefined || max !== undefined) {
    filter.originalPrice = {}
    if (min !== undefined) filter.originalPrice.$gte = min
    if (max !== undefined) filter.originalPrice.$lte = max
  }

  const products = await Product.find(filter).lean()
  const cleaned: ProductType[] = JSON.parse(JSON.stringify(products))

  

  return cleaned
}
