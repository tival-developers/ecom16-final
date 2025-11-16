'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReviewButton from '@/components/ux/addReview'
import FavAddButton from '@/components/ux/favAdd'
import { ProductPrice } from '@/lib/utils/product-price'
import { AddToCart } from '@/components/ux/cartadd'

interface Product {
  _id: string
  name: string
  originalPrice: number
  newPrice: number
  imageUrls: string[]
  description: string
  variations: Record<string, string>
  variation: string
  category: string
  quantity: number
  brand: string
  stock: number
}

function getColor(index: number) {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6']
  return colors[index % colors.length]
}

export default function ProductDetail({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className='min-h-screen bg-yellow-50 text-gray-900 p-4 sm:p-6 md:p-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Product Image Section */}
        <div className='flex flex-col md:flex-row gap-3'>
          {/* Thumbnails (Desktop) */}
          <div className='hidden md:flex flex-col gap-2 w-1/4'>
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
                <div className='relative w-16 h-16'>
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx}`}
                    width={1000}
                    height={800}
                    className='h-full w-full object-cover rounded-lg'
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className='w-full max-w-md md:max-w-lg lg:max-w-xl'>
            <Image
              src={product.imageUrls[currentImage]}
              alt={product.name}
              width={1000}
              height={800}
              className='w-full h-auto object-cover rounded-xl'
            />
          </div>

          {/* Thumbnails (Mobile) */}
          <div className='flex md:hidden gap-2 mt-3 overflow-x-auto pb-2'>
            {product.imageUrls.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`flex-shrink-0 border-2 p-1.5 rounded ${
                  idx === currentImage
                    ? 'border-yellow-500 ring-2 ring-yellow-300'
                    : 'border-transparent hover:border-yellow-300'
                }`}
              >
                <div className='relative w-14 h-14'>
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx}`}
                    width={1000}
                    height={800}
                    className='h-full w-full object-cover rounded-lg'
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className='space-y-4'>
          <h1 className='text-2xl md:text-3xl font-bold text-yellow-600'>
            {product.name}
          </h1>
          <p className='text-base md:text-lg font-medium text-gray-600'>
            {product.description}
          </p>

          {/* Variations */}
          <div className='flex flex-col gap-2'>
            {Object.entries(product.variations || {}).map(
              ([key, value], idx) => (
                <div key={idx} className='flex items-center gap-2'>
                  <span
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: getColor(idx) }}
                  ></span>
                  <span className='capitalize text-base md:text-lg font-medium text-amber-600'>
                    <strong className='text-gray-600'>{key}: </strong>
                    {value}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Price */}
          <div className='text-base md:text-lg font-medium text-gray-600 flex gap-3'>
            Price:
            <ProductPrice
              originalPrice={product.originalPrice}
              newPrice={product.newPrice}
            />
          </div>

          {/* Add to Cart + Favorite */}
          <div className='flex flex-col sm:flex-row gap-3 items-center sm:justify-start py-4 px-6 rounded-b'>
            <AddToCart product={product} />
            <FavAddButton variant='outline' product={product} />
          </div>

          {/* Delivery Info */}
          <ul className='text-sm md:text-base text-gray-600 list-disc pl-5 space-y-1'>
            <li>Estimated delivery: 2-5 business days</li>
            <li>Warranty: 6 months</li>
            <li>Signature packaging & personalised card</li>
          </ul>

          {/* Reviews */}
          <ReviewButton productId={product._id.toString()} />
        </div>
      </div>

      {/* Footer */}
      <div className='mt-16 text-center bg-gray-900 text-white py-8 px-4 rounded-xl'>
        <p className='text-lg md:text-xl font-bold'>STREAM TECHNOLOGIES</p>
        <p className='text-xs md:text-sm mt-2'>
          WHERE EVERY PRODUCT TELLS A STORY
        </p>
      </div>
    </div>
  )
}
