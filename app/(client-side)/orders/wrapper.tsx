// // app/page.tsx or wherever you're displaying orders
'use client'
import { typeOrder } from '@/lib/types/order'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { OrderCard } from '@/components/cards/order'
import { Skeleton } from '@/components/ui/skeleton'
import { useCartStore } from '@/stores/cart'
import { useEffect } from 'react'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default function OrdersPage() {
  const router = useRouter()
  const { status } = useSession()
 
  // 🔒 Protect route
  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentPath = window.location.pathname
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`)
    }
  }, [status, router])
  const addToCart = useCartStore((state) => state.addToCart)

  // ✅ Always call SWR, skip fetch if not authenticated
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<typeOrder[]>(
    status === 'authenticated' ? '/api/orders' : null,
    fetcher,
    {
      onError: () => toast.error('Could not load your orders.'),
      revalidateOnFocus: false,
    }
  )

  

  if (status === 'loading' || isLoading) {
    return (
      <main className='p-6 max-w-5xl mx-auto space-y-6'>
        <h1 className='text-2xl font-bold'>My Orders</h1>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-28 w-full rounded-lg' />
        ))}
      </main>
    )
  }

  if (error) {
    return (
      <main className='p-6 max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold'>My Orders</h1>
        <p className='text-red-500 mt-4'>Failed to load orders.</p>
      </main>
    )
  }

  const handleBuyAgain = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}`)
      if (!res.ok) throw new Error('Product not found')

      const product = await res.json()

      if (product.stock <= 0) {
        toast.error('This product is out of stock.')
        return
      }
      const priceToUse = product.newPrice ?? product.originalPrice

      addToCart({
        productId: product._id?.toString() || product._id,
        categoryId: product.category?.toString() || product.category,
        name: product.name,
        originalPrice: priceToUse, // ✅ updated field name from originalPrice
        imageUrl: product.imageUrls[0],
        quantity: 1,
      })

      toast.success('Item added to cart!')
      router.push('/cart')
    } catch (err) {
      console.error(err)
      toast.error('Could not add this item to your cart.')
    }
  }

  return (
    <main className='p-6 max-w-5xl mx-auto space-y-6'>
      <h1 className='text-2xl font-bold'>My Orders</h1>
      {!orders || orders.length === 0 ? (
        <p className='text-muted-foreground'>You have no past orders.</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onViewOrder={(orderId) => router.push(`/orders/${orderId}`)}
            onBuyAgain={(itemId) => handleBuyAgain(itemId)}
          />
        ))
      )}
    </main>
  )
}
