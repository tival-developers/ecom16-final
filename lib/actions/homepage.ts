// lib/actions/homepage.ts
import Category from '@/lib/db/models/category.model'
import Product from '@/lib/db/models/product.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { CategoryType, CategoryWithProducts } from '../types/categories'
import { ProductType } from '../types/product'

export async function getCategoriesWithProducts(): Promise<
  CategoryWithProducts[]
> {
  await connectToDatabase
  const categories = await Category.find()
    .sort({ name: 1 })
    .lean<CategoryType[]>()

  const result: CategoryWithProducts[] = []

  for (const category of categories) {
    const products = await Product.find({ category: category._id })
      .limit(4)
      .lean<ProductType[]>()

    if (products.length === 0) continue

    result.push({
      category: {
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        imageUrl: category.imageUrl,
        variations: category.variations,
      },
      products: products.map((product) => ({
        _id: product._id.toString(),
        name: product.name,
        imageUrls: product.imageUrls,
        description: product.description,
        brand: product.brand,
        category: product.category?.toString() ?? '',
        serialNumber: product.serialNumber,
        originalPrice: product.originalPrice,
        newPrice: product.newPrice,
        stock: product.stock,
      })),
    })
  }

  return result
}
