'use client'

import { useRouter } from 'next/navigation'
import { useCheckoutStore } from '@/stores/checkout'

type OrderItem = {
  productId: string
  categoryId: string
  name: string
  originalPrice: number
  quantity: number
  imageUrl: string
}

export default function AddToCheckout({ orderItem }: { orderItem: OrderItem }) {
  const addCheckout = useCheckoutStore((state) => state.addToCheckout)
  const router = useRouter()

  const handleCheckout = () => {
    addCheckout({
      productId: orderItem.productId,
      categoryId: orderItem.categoryId,
      name: orderItem.name,
      originalPrice: orderItem.originalPrice,
      imageUrl: orderItem.imageUrl,
      quantity: orderItem.quantity, // keep actual quantity
    })
    router.push('/checkout')
  }

  return (
    <button
      onClick={handleCheckout}
      className="w-full text-center"
    >
      Checkout
    </button>
  )
}
