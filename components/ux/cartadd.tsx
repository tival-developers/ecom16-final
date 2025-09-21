
'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

type Product = {
  _id: string
  category: { _id: string; name: string } | string
  name: string
  originalPrice: number
  newPrice?: number
  description: string
  imageUrls: string[]
}

// ✅ helper to normalize categoryId
function getCategoryId(category: Product['category']): string {
  if (typeof category === 'string') return category
  return category._id
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const cartItems = useCartStore((state) => state.items)

  const existingItem = cartItems.find((item) => item.productId === product._id)
  const quantity = existingItem?.quantity || 0

  const priceToUse = product.newPrice ?? product.originalPrice

  return (
    <div className="flex items-center justify-between">
      <Button
        size="sm"
        variant="outline"
        className="rounded-xl"
        onClick={() => {
          const item = {
            productId: product._id.toString(),
            categoryId: getCategoryId(product.category),
            name: product.name,
            originalPrice: priceToUse,
            imageUrl: product.imageUrls[0],
            quantity: 1,
          }

          console.log('Adding to cart:', item)
          addToCart(item)
        }}
      >
        Add to cart
      </Button>

      <div className="flex items-center gap-1.5">
        <ShoppingCart className="h-4 w-4 text-amber-600" />
        {quantity > 0 && <span>{quantity}</span>}
      </div>
    </div>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const removeCart = useCartStore((state) => state.removeFromCart)
  const isCart = useCartStore((state) =>
    state.items.some((item) => item.productId === product._id)
  )

  const priceToUse = product.newPrice ?? product.originalPrice

  const handleClick = () => {
    if (isCart) {
      removeCart(product._id)
      toast('Removed from Cart')
    } else {
      addToCart({
        productId: product._id.toString(),
        categoryId: getCategoryId(product.category),
        name: product.name,
        originalPrice: priceToUse,
        imageUrl: product.imageUrls[0],
        quantity: 1,
      })
      toast('Added to Cart')
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={`sm:w-auto border-yellow-400 text-yellow-600 hover:bg-yellow-100 ${
        isCart ? 'bg-yellow-500 text-white' : 'bg-white'
      }`}
    >
      {isCart ? '★ In Cart' : '☆ Add to Cart'}
    </Button>
  )
}
