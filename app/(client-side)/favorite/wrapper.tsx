'use client'
import React, { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useFavStore } from '@/stores/favorite'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductPrice } from '@/lib/utils/product-price'

const FavoritePage = () => {
  const { data: session, status } = useSession()
  const loadFavorite = useFavStore((s) => s.loadFav)
  const mergeGuestFav = useFavStore((s) => s.mergeGuestFav)

  useEffect(() => {
    if (status === 'loading') return
    if (session?.user) {
      mergeGuestFav(session)
    } else {
      loadFavorite(null)
    }
  }, [session, status, loadFavorite, mergeGuestFav])

  const { items, removeFromFav, clearFav } = useFavStore()

  return (
    <div className='my-5'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
        <h2 className='text-2xl font-bold text-amber-600'>Your Favorite Products</h2>
        {items.length > 0 && (
          <Button
            onClick={() => {
              clearFav(session)
              toast.success('Favorite items cleared successfully')
            }}
            className='bg-red-500 text-white'
          >
            Clear Favorites
          </Button>
        )}
      </div>

      {/* Favorites Grid */}
      <Card
        className='
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
          p-4 sm:p-6 
          bg-gray-50
        '
      >
        {items.length === 0 ? (
          <p className='p-3 text-2xl font-medium col-span-full text-center'>
            Your Favorites list is empty.
          </p>
        ) : (
          items.map((item) => (
            <Card
              key={item._id}
              className='hover:shadow-lg transition-shadow rounded-2xl overflow-hidden'
            >
              {/* Product Image */}
              <CardContent className='p-0'>
                <div className=' bg-muted/30'>
                  <Link href={`/product/${item._id}`}>
                    <Image
                      src={item.imageUrl || '/placeholder.jpg'}
                      alt={item.name}
                      width={1000}
                      height={800}
                      className='h-full w-full object-cover'
                    />
                  </Link>
                </div>
                <div className='p-4 space-y-1.5 relative'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-medium leading-tight line-clamp-2 mr-2'>
                      {item.name}
                    </h3>
                    <Badge variant={'secondary'} className='uppercase'>
                      {item.brand}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Stock: {item.stock}
                  </p>
                  <ProductPrice
                    originalPrice={item.originalPrice}
                    newPrice={item.newPrice}
                  />
                </div>

                <div className=' p-1.5'>
                  <Button
                    onClick={() => {
                      removeFromFav(item._id)
                      toast.success(`${item.name} removed`)
                    }}
                    className='text-white bg-red-600 w-full '
                    variant='outline'
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </Card>
    </div>
  )
}

export default FavoritePage
