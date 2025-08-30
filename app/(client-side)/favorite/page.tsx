'use client'
import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Price from '@/lib/utils/format'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useFavStore } from '@/stores/favorite'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

const Page = () => {
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
    <div className="my-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Your Favorite Products</h2>
        {items.length > 0 && (
          <Button
            onClick={() => {
              clearFav(session)
              toast.success('Favorite items cleared successfully')
            }}
            className="bg-red-500 text-white"
          >
            Clear Favorites
          </Button>
        )}
      </div>

      {/* Favorites Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          p-4 sm:p-6
        "
      >
        {items.length === 0 ? (
          <p className="p-3 text-2xl font-medium col-span-full text-center">
            Your Favorites list is empty.
          </p>
        ) : (
          items.map((item) => (
            <Card
              key={item._id}
              className="border border-gray-200 flex flex-col bg-white shadow-sm rounded-lg overflow-hidden h-full"
            >
              {/* Product Image */}
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="relative w-full h-48 sm:h-56 mb-4 rounded overflow-hidden group">
                  <Link href={`/product/${item._id}`} className="h-full block">
                    <Image
                      src={item.imageUrl || '/placeholder.jpg'}
                      alt={item.name}
                      fill
                      priority
                      className="object-contain p-2 bg-white"
                    />
                  </Link>
                </div>

                {/* Product Info */}
                <p className="text-lg font-semibold mb-2 line-clamp-1">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 flex-grow line-clamp-3">
                  {item.description}
                </p>
              </CardContent>

              {/* Footer with Price & Remove Button */}
              <CardFooter className="px-4 py-3 mt-auto">
                <div className="flex justify-between items-center w-full">
                  <p className="text-yellow-500 font-bold text-lg">
                    <Price amount={item.originalPrice} />
                  </p>
                  <Button
                    onClick={() => {
                      removeFromFav(item._id)
                      toast.success(`${item.name} removed`)
                    }}
                    className="text-red-600"
                    variant="outline"
                  >
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Page
