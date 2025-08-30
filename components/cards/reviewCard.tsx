'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  originalPrice: number
  imageUrls: string[]
  description: string
  variations: string[]
  variation: string
}

interface Review {
  _id: string
  rating: number
  feedback: string
  user: string
  createdAt: string
}

export function ReviewSummary({ product }: { product: Product }) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/products/${product._id}/reviews`)
      console.log(res, 'res')
      const data = await res.json()
      setReviews(data.reviews)
    }
    fetchReviews()
  }, [product._id])

  // average rating
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <div className='grid md:grid-cols-3 gap-8'>
      {/* Left: Summary */}
      <div className='space-y-4'>
        <h2 className='text-lg font-semibold'>Customer Reviews</h2>
        <div className='flex items-center gap-2'>
          <div className='flex text-yellow-500'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(average) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className='text-sm text-muted-foreground'>
            {reviews.length} reviews
          </span>
        </div>

        <div>
          <h4 className='text-sm font-semibold'>Share your thoughts</h4>
          <p className='text-sm text-muted-foreground'>
            You also bought this product, share your thoughts with other
            customers
          </p>
        </div>
      </div>

      {/* Right: Reviews */}
      <div className='md:col-span-2 space-y-6'>
        {reviews.map((r) => (
          <div key={r._id} className='flex gap-4'>
            <Image
              src='/images/user1.jpg'
              alt={r.user}
              width={48}
              height={48}
              className='rounded-full object-cover'
            />
            <div>
              <p className='font-semibold'>{r.user}</p>
              <div className='flex text-yellow-500 mb-1'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < r.rating ? 'currentColor' : 'none'}
                    />
                  ))}
              </div>
              <p className='text-sm text-muted-foreground'>{r.feedback}</p>
              <p className='text-xs text-gray-400'>
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className='text-sm text-muted-foreground'>No reviews yet.</p>
        )}
      </div>
    </div>
  )
}
