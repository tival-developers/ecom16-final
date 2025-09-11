
import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import Category from '@/lib/db/models/category.model'
import mongoose from 'mongoose'
import Link from 'next/link'
import AddToFavoriteButton from '../ux/favAdd'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import AddToCartButton from '../ux/cartadd'
import { ProductPrice } from '@/lib/utils/product-price'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

interface ProductType {
  _id: string
  name: string
  originalPrice: number
  newPrice: number
  imageUrls: string[]
  description: string
  category: string
  stock: number
  brand: string
}

interface CategoryDoc {
  _id: string
  name: string
}

interface Props {
  categoryId: string
}

export default async function RelatedProducts({ categoryId }: Props) {
  await connectToDatabase

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
    .limit(4)
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
          lg:grid-cols-4 
          gap-6
        '
        >
          {products.map((product) => (
            <Card
              key={product._id}
              className='hover:shadow-lg transition-shadow rounded-2xl overflow-hidden'
            >
              <CardContent className='p-0'>
                <div className='aspect-[4/3] bg-muted/30'>
                  <Link
                    href={`/product/${product._id}`}
                    className='relative aspect-square w-full mb-2 overflow-hidden rounded'
                  >
                    <div className='relative w-full aspect-[3/3]'>
                      <Image
                        src={product.imageUrls?.[0]}
                        alt={product.name}
                        fill
                        className=' object-cover w-full'
                      />
                    </div>
                  </Link>
                </div>
                <div className='p-4 space-y-1.5 relative'>
                  <div>
                    <AddToFavoriteButton variant='icon' product={product} />
                  </div>

                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-medium leading-tight line-clamp-2 mr-2'>
                      {product.name}
                    </h3>
                    <Badge variant={'secondary'} className='uppercase'>
                      {product.brand}
                    </Badge>
                  </div>

                  <p className='text-muted-foreground text-sm'>
                    Stock: {product.stock}
                  </p>
                  <ProductPrice
                    originalPrice={product.originalPrice}
                    newPrice={product.newPrice}
                  />

                  <AddToCartButton product={product} />

                  <Button className='rounded-xl w-full mt-2.5'>
                    <Link href={`/product/${product._id}`}>View Product </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
