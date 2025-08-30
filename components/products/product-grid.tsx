// ProductCategoryGrid.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import AddToCartButton from '@/components/cartadd'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import Price from '@/lib/utils/format'
import { ProductType } from '@/lib/types/product'
import PriceFilterSlider from '@/app/(client-side)/categories/components/priceFilter'

type Props = {
  initialProducts: ProductType[]
}

export default function ProductCategoryGrid({ initialProducts }: Props) {
  const maxProductPrice = useMemo(
    () =>
      initialProducts.length
        ? Math.max(...initialProducts.map((p) => p.originalPrice))
        : 1000,
    [initialProducts]
  )

  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    maxProductPrice,
  ])
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(initialProducts)

  useEffect(() => {
    const [min, max] = priceRange
    setFilteredProducts(
      initialProducts.filter(
        (p) => p.originalPrice >= min && p.originalPrice <= max
      )
    )
  }, [priceRange, initialProducts])

  return (
    <div>
      {/* Price Filter Slider */}
      <PriceFilterSlider
        minPrice={0}
        maxPrice={maxProductPrice}
        onChange={setPriceRange}
        productCount={filteredProducts.length} // pass count
      />

      {/* Products grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              className='border border-gray-200 flex flex-col justify-between bg-white shadow-sm rounded-lg overflow-hidden h-full'
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
                <p className='text-xl font-semibold mb-2 line-clamp-1'>
                  {product.name}
                </p>
                <p className='text-[15px] text-gray-600 flex-grow line-clamp-3'>
                  {product.description}
                </p>
              </CardContent>

              <CardFooter className='px-4 py-3 mt-auto'>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-yellow-500 font-bold text-lg'>
                    <Price amount={product.originalPrice} />
                  </p>
                  <AddToCartButton product={product} />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className='text-sm text-muted-foreground col-span-full'>
            No products found in this price range.
          </p>
        )}
      </div>
    </div>
  )
}
