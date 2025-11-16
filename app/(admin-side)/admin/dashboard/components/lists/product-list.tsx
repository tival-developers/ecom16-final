'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Price from '@/lib/utils/format'
import { DeleteProduct, UpdateProduct } from '@/components/ux/editButtons'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductType } from '@/lib/types/product'
import { PromotionToggle } from '@/components/products/togglePromotion'

export default function ProductList({ products }: { products: ProductType[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'out-of-stock'>(
    'all'
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()
    return products.filter((product) => {
      if (lowerSearch && !product.name.toLowerCase().includes(lowerSearch))
        return false
      if (statusFilter === 'out-of-stock' && product.stock !== 0) return false
      return true
    })
  }, [products, searchQuery, statusFilter])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(start, start + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <main className='flex flex-col flex-1 '>
        {/* Sticky Filters */}
        <div className='bg-slate-50 sticky top-0 z-50 p-4 sm:p-6  border-b'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4'>
            <h1 className='text-lg sm:text-xl font-semibold'>Products</h1>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
              <Input
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className='w-full sm:w-64'
              />
              <Link
                href='/admin/dashboard/products/create'
                className='w-full sm:w-auto'
              >
                <Button className='gap-2 w-full sm:w-auto'>
                  <Plus size={16} /> Add Product
                </Button>
              </Link>
            </div>
          </div>

          <Tabs
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val as 'all' | 'out-of-stock')
              setCurrentPage(1)
            }}
          >
            <TabsList className='flex flex-wrap gap-2'>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='out-of-stock'>Out of Stock</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Product Grid */}
        <ScrollArea className='flex-1 p-4 sm:p-6'>
          {paginatedProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full text-center p-6'>
              <p className='text-gray-500 text-lg mb-4'>
                No matching products found
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('all')
                  setCurrentPage(1)
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <Card className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-4 p-4'>
                {paginatedProducts.map((product) => (
                  <Card
                    key={product._id}
                    className='bg-white shadow-sm flex flex-col'
                  >
                    <div className=' bg-muted/30'>
                      <Link href={`/product/${product._id}`}>
                        <Image
                          src={product.imageUrls?.[0] || '/placeholder.jpg'}
                          alt={product.name}
                          width={1000}
                          height={800}
                          className='h-full w-full object-cover'
                        />
                      </Link>
                    </div>
                    <CardContent className='px-2 py-1 flex flex-col flex-grow'>
                      <p className='text-base sm:text-lg font-semibold mb-1 line-clamp-1'>
                        {product.name}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-500 mb-2 line-clamp-3'>
                        {product.description}
                      </p>
                      <p className='text-green-600 font-bold text-sm sm:text-lg'>
                        <Price amount={product.originalPrice} />
                      </p>

                      <PromotionToggle product={product} />
                    </CardContent>
                    <div className='px-4 py-1 mb-1'>
                      <div className='flex items-center justify-between mb-2 text-xs sm:text-sm'>
                        <span>Edit:</span>
                        <div className='flex gap-2'>
                          <UpdateProduct id={product._id} />
                          <DeleteProduct id={product._id} />
                        </div>
                      </div>
                      <div className='flex justify-between items-center'>
                        <p
                          className={
                            product.stock === 0
                              ? 'text-red-500'
                              : 'text-green-600'
                          }
                        >
                          {product.stock === 0
                            ? 'Out of stock'
                            : `${product.stock} in stock`}
                        </p>
                        {product.stock === 0 && (
                          <Button
                            size='sm'
                            variant='secondary'
                            className='bg-blue-600 text-white hover:bg-blue-400'
                          >
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </Card>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className='flex flex-wrap justify-center mt-6 gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Prev
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      size='sm'
                      variant={currentPage === i + 1 ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
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
            </>
          )}
        </ScrollArea>
      </main>
    </div>
  )
}
