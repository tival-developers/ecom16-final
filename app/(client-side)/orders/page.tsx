// // app/page.tsx or wherever you're displaying orders
'use client'
import { typeOrder } from '@/lib/types/order'


// app/orders/page.tsx


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
  const { status } = useSession()
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart)

  // ✅ Always call SWR, skip fetch if not authenticated
  const { data: orders, error, isLoading } = useSWR<typeOrder[]>(
    status === 'authenticated' ? '/api/orders' : null,
    fetcher,
    {
      onError: () => toast.error('Could not load your orders.'),
      revalidateOnFocus: false,
    }
  )

  // ✅ Handle redirect in useEffect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router])

  if (status === 'loading' || isLoading) {
    return (
      <main className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-lg" />
        ))}
      </main>
    )
  }

  if (error) {
    return (
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-red-500 mt-4">Failed to load orders.</p>
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

      addToCart({
        _id: product._id,
        name: product.name,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
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
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {!orders || orders.length === 0 ? (
        <p className="text-muted-foreground">You have no past orders.</p>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onViewOrder={(orderId) => router.push(`/orders/${orderId}`)}
            onViewInvoice={(orderId) => router.push(`/invoices/${orderId}`)}
            onBuyAgain={(itemId) => handleBuyAgain(itemId)}
          />
        ))
      )}
    </main>
  )
}


// export default function OrdersPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [orders, setOrders] = useState<typeOrder[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (status === 'loading') return
//     if (status === 'unauthenticated') {
//       router.push('/login')
//       return
//     }

//     async function fetchOrders() {
//       try {
//         const res = await fetch('/api/orders') // your endpoint to get user orders
//         if (!res.ok) throw new Error('Failed to fetch orders')
//         const data: typeOrder[] = await res.json()
//         setOrders(data)
//       } catch (err) {
//         console.error(err)
//         toast.error('Could not load your orders.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [status, router])

//   if (status === 'loading' || loading) {
//     return <div className="p-6">Loading orders…</div>
//   }

//   return (
//     <main className="p-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="text-muted-foreground">You have no past orders.</p>
//       ) : (
//         orders.map((order) => (
//           <OrderCard
//             key={order._id}
//             order={order}
//             onViewOrder={(orderId) => {
//               router.push(`/orders/${orderId}`)
//             }}
//             onViewInvoice={(orderId) => {
//               router.push(`/invoices/${orderId}`)
//             }}
//             onBuyAgain={(itemId) => {
//               // e.g. re-add to cart and redirect
//               console.log('Re-buy item', itemId)
//               // add to cart logic here…
//             }}
//           />
//         ))
//       )}
//     </main>
//   )
// }