
import { Card, CardContent } from '@mui/material'
import Image from 'next/image'
import { CardFooter } from '../ui/card'
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import Category from '@/lib/db/models/category.model'
import mongoose from 'mongoose'
import AddToCartButton from '../cartadd'
import Link from 'next/link'

import Price from '@/lib/utils/format'
import AddToFavoriteButton from '../ux/favAdd'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

interface ProductType {
  _id: string
  name: string
  originalPrice: number
  imageUrls: string[]
  description: string
}

interface CategoryDoc {
  _id: string
  name: string
}

interface Props {
  categoryName: string
}

export default async function RelatedProducts({ categoryName }: Props) {
  await connectToDatabase

  const ProductModel = mongoose.models.Product || Product
  const CategoryModel = mongoose.models.Category || Category

  const category = (await CategoryModel.findOne({
    name: categoryName,
  }).lean()) as CategoryDoc | null

  if (!category) {
    return <p className='text-red-500 px-4 py-6'>Related Products not found</p>
  }

  const productsData = await ProductModel.find({ category: category._id })
    .select('name originalPrice imageUrls description')
    .limit(4)
    .lean()

  const products: ProductType[] = JSON.parse(JSON.stringify(productsData))
  return (
    <div>
      <section className='relative px-4 py-6 bg-gray-100 mt-10 rounded-2xl border-2 '>
        <div className='mb-6 flex items-center justify-between'>
          <div className='hidden md:flex'></div>
          <h2 className='text-xl font-bold text-yellow-600 mb-1.5 '>
            Related <span className='text-gray-800'>Products</span>
          </h2>

          <Link
            href={`/categories/${categoryName}`}
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
          lg:grid-cols-4 
          gap-6
        '
        >
          {products.map((product) => (
            <Card
              key={product._id}
              className='
                border border-gray-200
                flex flex-col
                justify-between
                bg-white
                shadow-sm
                rounded-lg
                overflow-hidden
                h-full
              '
            >
              <CardContent className='p-4 flex flex-col flex-1'>
                <div className='relative w-full h-48 sm:h-56 mb-4 rounded overflow-hidden group'>
                  <Link href={`/product/${product._id}`} className='h-full'>
                    <Image
                      src={product.imageUrls?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      priority
                      className='object-contain p-2'
                    />
                  </Link>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-xl font-semibold mb-2 line-clamp-1'>
                    {product.name}
                  </p>
                  <AddToFavoriteButton variant='icon' product={product} />
                </div>

                <p className='text-[18px] text-green-600 flex-grow line-clamp-3'>
                  {product.description}
                </p>
              </CardContent>

              <CardFooter className='px-4 py-3 mt-auto'>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-green-600 font-bold text-lg'>
                    <Price amount={product.originalPrice} />
                  </p>
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
