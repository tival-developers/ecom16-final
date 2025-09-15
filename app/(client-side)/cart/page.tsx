'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/cart'
import { Suspense, useEffect, useRef } from 'react'
import Link from 'next/link'
import Price from '@/lib/utils/format'
import { useRouter } from 'next/navigation'

const Cartpage = () => {
  const { data: session, status } = useSession()
  const { loadCart, mergeGuestCart, items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
    useCartStore()
  const router = useRouter()
  const effectRan = useRef(false)

  // 🔒 Protect route
  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentPath = window.location.pathname
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`)
    }
  }, [status, router])

  // ✅ Load or merge cart once
  useEffect(() => {
    if (status === 'loading') return
    if (effectRan.current) return
    effectRan.current = true

    if (session?.user) {
      // Only merge once per session
      if (!localStorage.getItem('cart-merged')) {
        mergeGuestCart(session)
          .then(() => localStorage.setItem('cart-merged', '1'))
          .catch(console.error)
      }
    } else {
      loadCart(null)
      localStorage.removeItem('cart-merged') // reset merge guard if guest
    }
  }, [status, session, loadCart, mergeGuestCart])

  const total = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="p-4 bg-gradient-to-br from-yellow-50 to-white min-h-screen">
      <CardHeader className="mb-4">
        <h2 className="text-3xl font-bold text-amber-600">🛒 Shopping Cart</h2>
        <p className="text-sm text-gray-500">Review your items before checkout</p>
      </CardHeader>

      <Suspense>
        {/* Mobile View */}
        <div className="cart-mobile space-y-4 md:hidden">
          {items.length === 0 ? (
            <p className="text-center p-3 text-2xl font-medium">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <Card key={item.productId} className="p-3">
                <div className="flex gap-4 items-center">
                  <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded" />
                  <div className="flex-1">
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      <Price amount={item.originalPrice} />
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decreaseQuantity(item.productId)} className="px-2 py-1 bg-gray-200">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.productId)} className="px-2 py-1 bg-gray-200">
                        +
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500"
                    size="sm"
                    variant={'outline'}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))
          )}

          {items.length > 0 && (
            <Card className="bg-gradient-to-r from-gray-100 via-white to-gray-50 shadow-lg overflow-hidden text-amber-600 p-2 rounded-2xl">
              <CardHeader>
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <Price amount={total} />
                </div>
                <Separator className="bg-gray-600" />
                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  {totalQuantity}
                </div>
                <Separator className="bg-gray-600" />
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <Price amount={total} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-yellow-500 text-white">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {items.length > 0 && (
            <Button
              onClick={() => {
                clearCart(session)
                toast.success('Cart cleared successfully')
              }}
              className="w-full bg-red-500 text-white mt-4"
            >
              Clear Cart
            </Button>
          )}
        </div>
      </Suspense>

      {/* Desktop View */}
      <Suspense>
        <div className="cart-desktop max-w-7xl mx-auto gap-6">
          {/* Left side - Cart Items */}
          <div className="flex-1">
            {items.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-2xl font-medium text-gray-600">Your cart is empty.</p>
                <Link href="/" className="text-yellow-600 underline mt-2 inline-block">
                  Continue Shopping
                </Link>
              </Card>
            ) : (
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="grid grid-cols-4 items-center gap-5 p-4 border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <div className="bg-white items-center">
                        <Image src={item.imageUrl} alt={item.name} height={80} width={80} className="rounded object-cover" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-lg font-semibold break-words">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          <Price amount={item.originalPrice} />
                        </p>
                        <p className="text-green-600 text-xs font-medium">In Stock</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => decreaseQuantity(item.productId)} className="w-8 h-8">
                          -
                        </Button>
                        <span className="min-w-[24px] text-center">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => increaseQuantity(item.productId)} className="w-8 h-8">
                          +
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          removeFromCart(item.productId)
                          toast.success(`${item.name} removed`)
                        }}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="justify-between p-4 bg-gray-50">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearCart(session)
                      toast.success('Cart cleared successfully')
                    }}
                  >
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Right side - Order Summary */}
          <div className="w-full md:w-[400px]">
            <Card className="bg-gradient-to-r from-gray-100 via-white to-gray-50 shadow-lg overflow-hidden text-amber-600 p-2 rounded-2xl mt-5">
              <CardHeader>
                <h2 className="text-xl font-semibold mt-2">Order Summary</h2>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">Subtotal</p>
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                  </div>
                  <p className="text-lg font-semibold">
                    <Price amount={total} />
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">Total Quantity</p>
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                  </div>
                  <p className="text-lg font-semibold">{totalQuantity}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <p className="text-lg font-semibold">Order total</p>
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                  </div>
                  <p className="text-lg font-semibold">
                    <Price amount={total} />
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mb-2 w-full">
                <Button disabled={items.length === 0} variant={'outline'} className="text-gray-800">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Suspense>
    </main>
  )
}

export default Cartpage
