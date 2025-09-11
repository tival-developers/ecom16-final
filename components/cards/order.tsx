// components/OrderCard.tsx
'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import Price from '@/lib/utils/format'
import { typeOrder } from '@/lib/types/order'
import Link from 'next/link'


interface OrderCardProps {
  order: typeOrder
  onViewOrder?: (orderId: string) => void
  onViewInvoice?: (orderId: string) => void
  onBuyAgain?: (itemId: string) => void
}

export function OrderCard({
  order,
  onViewOrder,
  onViewInvoice,
  onBuyAgain,
}: OrderCardProps) {
  // Format the order date (e.g. "Jul 6, 2021")
  const orderDate = format(new Date(order.createdAt), 'MMM d, yyyy')
  

  return (
    <div className='border rounded-xl p-6 space-y-4 shadow-sm'>
      {/* ── Top section: Order info + buttons ── */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-muted-foreground'>
          <div>
            <div className='font-medium text-black'>Order number</div>
            <div>{order.orderNumber}</div>
          </div>
          <div>
            <div className='font-medium text-black'>Date placed</div>
            <div>{orderDate}</div>
          </div>
          <div>
            <div className='font-medium text-black'>Total amount</div>
            <div>
              <Price amount={order.totalAmount} />
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => onViewOrder?.(order._id)}>
            View Order
          </Button>
          <Button variant='outline' onClick={() => onViewInvoice?.(order._id)}>
            View Invoice
          </Button>
        </div>
      </div>

      <hr />

      {/* ── For each ordered item, render a sub‐card ── */}
      {order.items.map((item) => {
        // Format delivery date if available
        const deliveredOn =
          item.deliveredAt && format(new Date(item.deliveredAt), 'MMM d, yyyy')

        return (
          <div
            key={item.productId}
            className='flex flex-col sm:flex-row gap-4 pb-4 border-b last:border-b-0'
          >
            {/* Image */}
            <div className='w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden'>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={96}
                height={96}
                className='object-contain w-full h-full'
              />
            </div>

            {/* Details */}
            <div className='flex-1 space-y-1 text-sm'>
              <div className='flex justify-between'>
                <p className='font-medium text-black'>{item.name}</p>
                <p className='font-medium text-black'>
                  <Price amount={item.originalPrice} /> &times; {item.quantity}
                </p>
              </div>
              <p className='text-muted-foreground'>{item.description}</p>

              {/* Delivery status */}
              {order.deliveryStatus === 'delivered' && deliveredOn ? (
                <div className='flex items-center gap-2 text-green-600 mt-2 border-4'>
                  <CheckCircle size={16} />
                  <span className='text-sm'>Delivered on {deliveredOn}</span>
                </div>
              ) : order.deliveryStatus === 'shipped' ? (
                <div className='flex items-center gap-2 text-blue-600 mt-2'>
                  <span className='font-medium'>Shipped</span>
                </div>
              ) : order.deliveryStatus === 'pending' ? (
                <div className='flex items-center gap-2 text-yellow-600 mt-2'>
                  <span className='font-medium'>Pending</span>
                </div>
              ) : order.deliveryStatus === 'cancelled' ? (
                <div className='flex items-center gap-2 text-red-600 mt-2'>
                  <span className='font-medium'>Cancelled</span>
                </div>
              ) : null}

              {/* Actions */}
              <div className='flex gap-4 text-sm font-medium mt-2'>
               
                  <Link href={`/product/${item.productId}`}
                  className='text-purple-600 hover:underline'
                >
                  View product
                </Link>
                <button
                  onClick={() => onBuyAgain?.(item.productId)}
                  className='text-purple-600 hover:underline'
                >
                   Buy Again
                  
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
