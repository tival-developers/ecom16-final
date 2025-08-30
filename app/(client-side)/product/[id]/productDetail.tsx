'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import Price from '@/lib/utils/format'
import AddToCartButton from '@/components/cartadd'

import ReviewButton from '@/components/ux/addReview'
import FavAddButton from '@/components/ux/favAdd'

interface Product {
  _id: string
  name: string
  originalPrice: number
  imageUrls: string[]
  description: string
  variations: string[]
  variation: string
}
function getColor(index: number) {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6']
  return colors[index % colors.length] // cycle through colors
}

export default function ProductDetail({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className='min-h-screen bg-yellow-50 text-gray-900 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image */}
        <div>
          <Card className='flex justify-center items-center p-1.5 mb-2'>
            <CardContent>
              <Image
                src={product.imageUrls[currentImage]}
                alt={product.name}
                width={600}
                height={500}
                className='rounded-xl object-contain'
              />
            </CardContent>
          </Card>
          {/* Thumbnails */}
          <div className='flex gap-2 pb-2 w-1/3'>
            {product.imageUrls.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`border-2 p-1.5 rounded ${
                  idx === currentImage
                    ? 'border-yellow-500 ring-2 ring-yellow-300'
                    : 'border-transparent hover:border-yellow-300'
                }`}
              >
                <div className='relative w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded'>
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className='object-contain rounded'
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold text-yellow-600'>{product.name}</h1>
          <p className='text-lg font-medium text-gray-600'>
            {product.description}
          </p>

          <div className='flex flex-wrap'>
            <div className='flex flex-col gap-2'>
              {product.variations &&
                Object.entries(product.variations).map(([key, value], idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    {/* Just the colored dot */}
                    <span
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: getColor(idx) }}
                    ></span>

                    {/* Variation text */}
                    <span className='capitalize text-lg '>
                      <strong>{key}:</strong> {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <p className='text-xl text-green-700 font-medium'>
            <Price amount={product.originalPrice} />
          </p>

          {/* Add to Cart */}
          <div className='flex flex-col sm:flex-row gap-3 items-center justify-between py-4 px-6  rounded-b'>
            <AddToCartButton product={product} />

            <FavAddButton variant='outline' product={product} />
            <Button
              variant='link'
              className='w-full sm:w-auto text-yellow-700 font-medium hover:underline'
            >
              Shop Now
            </Button>
          </div>

          {/* Delivery & Shipping Info */}
          <ul className='text-sm text-gray-600 list-disc pl-5 space-y-1'>
            <li>Estimated delivery: 2-5 business days</li>
            <li>Waranty 6 months</li>
            <li>Signature packaging & personalised card</li>
          </ul>
        </div>
        <div>
          <ReviewButton productId={product._id.toString()} />
        </div>
      </div>

      {/* Footer Section */}
      <div className='mt-16 text-center bg-gray-900 text-white py-8 px-4 rounded-xl'>
        <p className='text-lg font-bold'>STREAM TECHNOLOGIES</p>
        <p className='text-sm mt-2'>WHERE EVERY PRODUCT TELLS A STORY</p>
      </div>
    </div>
  )
}
