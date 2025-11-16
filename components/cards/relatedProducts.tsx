
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import Category from '@/lib/db/models/category.model'
import mongoose from 'mongoose'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import ProductCard from './product-card'
import { ProductType } from '@/lib/types/product'



interface CategoryDoc {
  _id: string
  name: string
}

interface Props {
  categoryId: string
}

export default async function RelatedProducts({ categoryId }: Props) {
  await connectToDatabase()

  const ProductModel = mongoose.models.Product || Product
  const CategoryModel = mongoose.models.Category || Category

  const category = (await CategoryModel.findOne({
    _id: categoryId,
  }).lean()) as CategoryDoc | null

  if (!category) {
    return <p className='text-red-500 px-4 py-6'>Related Products not found</p>
  }

  const productsData = await ProductModel.find({ category: category._id })
    .select('name originalPrice imageUrls description brand stock')
    .limit(5)
    .lean()

  const products: ProductType[] = JSON.parse(JSON.stringify(productsData))
  return (
    <div>
      <section className='relative px-4 py-6 bg-gradient-to-r from-gray-100 via-white to-gray-50 shadow-lg overflow-hidden mt-10 rounded-2xl border-2 '>
        <div className='mb-6 flex items-center justify-between'>
          <div className='hidden md:flex'></div>
          <h2 className='text-xl font-bold text-yellow-600 mb-1.5 '>
            Related <span className='text-gray-800'>Products</span>
          </h2>

          <Link
            href={`/categories/${category.name}`}
            className=' flex items-center gap-1.5 text-gray-800 hover:text-yellow-600'
          >
            <Button
              variant={'link'}
              className='text-gray-800 hover:text-yellow-600'
            >
              View more <ArrowRight />
            </Button>
          </Link>
        </div>

        <div
          className='
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-5 
          gap-6
        '
        >
          {products.map((product) => (
            < ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
