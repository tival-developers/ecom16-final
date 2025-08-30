'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Price from '@/lib/utils/format'

import { typeOrder } from '@/lib/types/order'
import { format } from 'date-fns'
import { ShoppingBag, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface OrderCardProps {
  order: typeOrder
}

export default function PreviousOrderCard({ order }: OrderCardProps) {
  const orderDate = format(new Date(order.createdAt), 'MMM d, yyyy')
  const [loading, setLoading] = useState(true)

  // Fake loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate total
  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center w-full max-w-5xl"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-600 mb-2">
          Thank You <span className="text-gray-800">For Purchasing</span>
        </h1>

        <Card className="mt-6 w-full bg-white relative shadow-lg border border-transparent bg-clip-padding before:absolute before:inset-0 before:rounded-xl before:border-[2px] before:border-yellow-200">
          <CardContent className="relative z-10 p-4 sm:p-6">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Thank you. Your order has been received.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 text-sm text-gray-700 gap-4 mb-6">
              <div>
                <div className="font-medium text-black">Order Number:</div>
                {loading ? (
                  <Skeleton className="h-5 w-20 mt-1" />
                ) : (
                  <div>{order.orderNumber}</div>
                )}
              </div>
              <div>
                <div className="font-medium text-black">Date Placed</div>
                <div>{orderDate}</div>
              </div>
              <div>
                <div className="font-medium text-black">TOTAL:</div>
                <div>
                  <Price amount={order.totalAmount} />
                </div>
              </div>
              <div>
                <div className="font-medium text-black">PAYMENT METHOD:</div>
                <div>{order.paymentMethod}</div>
              </div>
            </div>

            {/* Responsive Table for desktop */}
            <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-yellow-100 text-yellow-800 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array(3)
                        .fill(0)
                        .map((_, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-4 py-3">
                              <Skeleton className="h-5 w-24" />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Skeleton className="h-5 w-12 mx-auto" />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Skeleton className="h-6 w-20 mx-auto" />
                            </td>
                          </tr>
                        ))
                    : order.items.map((item) => (
                        <tr key={`${order._id}-${item.productId}`} className="border-t">
                          <td className="px-4 py-3 font-medium text-black">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 font-medium text-black text-right">
                            <Price amount={item.price} /> &times; {item.quantity}
                          </td>
                          <td className="px-4 py-3 font-medium text-black text-right">
                            <Link href={`/product/${item.productId}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                              >
                                View & Rate
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  {!loading && (
                    <tr className="border-t font-bold text-gray-900">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-right" colSpan={2}>
                        <Price amount={totalAmount} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-50"
                      >
                        <div className="h-5 w-24 bg-gray-300 mb-2 rounded"></div>
                        <div className="h-5 w-12 bg-gray-300 mb-2 rounded ml-auto"></div>
                        <div className="h-8 w-full bg-gray-300 rounded"></div>
                      </div>
                    ))
                : order.items.map((item) => (
                    <div
                      key={`${order._id}-${item.productId}`}
                      className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
                    >
                      <div className="flex justify-between text-gray-700 font-medium">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>
                          <Price amount={item.price} />
                        </span>
                      </div>
                      <Link href={`/product/${item.productId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                        >
                          View & Rate Product
                        </Button>
                      </Link>
                    </div>
                  ))}
              {!loading && (
                <div className="mt-2 font-bold text-gray-900 text-right">
                  Total: <Price amount={totalAmount} />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center sm:justify-end">
              <Link href="/orders">
                <Button className="flex gap-2 items-center bg-yellow-500 hover:bg-yellow-600 text-white w-full sm:w-auto justify-center">
                  <ShoppingBag className="w-4 h-4" />
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
