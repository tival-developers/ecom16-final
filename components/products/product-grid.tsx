
'use client'

import { useState, useEffect, useMemo } from 'react'
import { ProductType } from '@/lib/types/product'
import PriceFilterSlider from '@/app/(client-side)/categories/components/priceFilter'
import ProductCard from '../cards/product-card'
import { Button } from '@/components/ui/button'

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

  // pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    const [min, max] = priceRange
    setFilteredProducts(
      initialProducts.filter(
        (p) => p.originalPrice >= min && p.originalPrice <= max
      )
    )
    setCurrentPage(1) // reset page when filter changes
  }, [priceRange, initialProducts])

  // calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      {/* Price Filter Slider */}
      <PriceFilterSlider
        minPrice={0}
        maxPrice={maxProductPrice}
        onChange={setPriceRange}
        productCount={filteredProducts.length}
      />

      {/* Products grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4'>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className='text-sm text-muted-foreground col-span-full'>
            No products found in this price range.
          </p>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-6'>
          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size='sm'
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant='outline'
            size='sm'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
