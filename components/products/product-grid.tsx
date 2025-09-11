// ProductCategoryGrid.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ProductType } from '@/lib/types/product'
import PriceFilterSlider from '@/app/(client-side)/categories/components/priceFilter'
import AddToCartButton from '../ux/cartadd'
import { ProductPrice } from '@/lib/utils/product-price'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import AddToFavoriteButton from '../ux/favAdd'
import Image from 'next/image'

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
              className='hover:shadow-lg transition-shadow  overflow-hidden'
            >
              <CardContent className='p-0'>
                <div className='aspect-[4/3] bg-muted/30'>
                  <Link
                    href={`/product/${product._id}`}
                    className='relative aspect-square w-full mb-2 overflow-hidden '
                  >
                    <div className='relative w-full aspect-[3/3]'>
                      <Image
                        src={product.imageUrls?.[0] || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className=' object-cover'
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
