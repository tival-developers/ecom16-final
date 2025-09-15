'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CategoryWithProducts } from '@/lib/types/categories'
import Price from '@/lib/utils/format'

type Props = {
  categoriesWithProducts: CategoryWithProducts[]
}

export default function ProductShowcase({ categoriesWithProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  if (!categoriesWithProducts || categoriesWithProducts.length === 0) {
    return <p className='text-center text-gray-500'>No products available.</p>
  }

  const allProducts = categoriesWithProducts.flatMap((c) => c.products)
  const categories = categoriesWithProducts.map((c) => c.category.name)

  const filtered =
    selectedCategory === 'All'
      ? allProducts
      : allProducts.filter((p) => {
          const cat = categoriesWithProducts.find(
            (c) => c.category.name === selectedCategory
          )
          return cat?.products.some((prod) => prod._id === p._id)
        })

  const limitedProducts = filtered.slice(0, 5)

  return (
    <section className='px-4 py-10 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-100 rounded-2xl shadow-sm'>
      {/* Title */}
      <div className='text-center mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
          Our <span className='text-yellow-600'>Products</span>
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className='flex flex-wrap justify-center gap-2 mb-6'>
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      {/* View More Link */}

      <div className='text-center my-8'>
        <Link
          href={`/categories/${selectedCategory.toLowerCase()}`}
          className='text-yellow-600 font-medium hover:underline'
        >
          View more {' '}
          {selectedCategory === 'All' ? 'products' : selectedCategory}
        </Link>
      </div>
      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 border-2 p-6 rounded-lg'>
        {limitedProducts.map((product) => (
          <Card
            key={product._id}
            className='rounded-2xl shadow-md hover:shadow-lg transition'
          >
            <CardContent className='p-0'>
              <Link href={`/product/${product._id}`}>
                <div className='relative aspect-square'>
                  <Image
                    src={product.imageUrls?.[0] ?? '/placeholder.png'}
                    alt={product.name}
                    fill
                    className='object-cover rounded-t-2xl'
                  />
                </div>
              </Link>
              <div className='p-4 space-y-2'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-sm font-medium line-clamp-1'>
                    {product.name}
                  </h3>
                  {product.brand && (
                    <Badge variant='secondary' className='uppercase'>
                      {product.brand}
                    </Badge>
                  )}
                </div>
                <p className='text-yellow-600 font-semibold'>
                  <Price amount={product.newPrice ?? product.originalPrice} />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
