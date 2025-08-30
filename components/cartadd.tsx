'use client'

import { useCartStore } from '@/stores/cart'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

type Product = {
  _id: string
  category: string
  name: string
  originalPrice: number
  description: string
  imageUrls: string[]
  quantity: number
  createdAt?: Date
  updatedAt?: Date
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className='flex items-center justify-between'>
      
      <Button onClick={() => {
          const item = {
            productId: product._id?.toString() || product._id,
            categoryId: product.category?.toString() || product.category,
            name: product.name,
            originalPrice: product.originalPrice, // keep naming consistent
            imageUrl: product.imageUrls[0],
            quantity: 1,
          }

          console.log('Adding to cart:', item)
          addToCart(item)
        }} size='icon' variant='outline' className='rounded-xl'>
        <ShoppingCart className='h-4 w-4' />
      </Button>
    </div>
    // <Button
    //   onClick={() => {
    //     const item = {
    //       productId: product._id?.toString() || product._id,
    //       categoryId: product.category?.toString() || product.category,
    //       name: product.name,
    //       originalPrice: product.originalPrice, // keep naming consistent
    //       imageUrl: product.imageUrls[0],
    //       quantity: 1,
    //     }

    //     console.log('Adding to cart:', item)
    //     addToCart(item)
    //   }}
    //   // onClick={() =>
    //   //   addToCart({
    //   //     _id: product._id?.toString() || product._id,
    //   //     categoryId: product.category?.toString() || product.category,
    //   //     name: product.name,
    //   //     originalPrice: product.originalPrice,
    //   //     imageUrl: product.imageUrls[0],
    //   //     quantity: 1,
    //   //   })
    //   // }
    //   className='bg-yellow-500 text-white  '
    // >
    //   Add to Cart
    // </Button>
  )
}
