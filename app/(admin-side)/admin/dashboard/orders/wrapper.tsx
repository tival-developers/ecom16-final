'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { typeOrder } from '@/lib/types/order'
import { DeleteOrderDialog } from '@/components/delete-confirmation-dialog'
import EditStatusButton from '@/components/ux/editStatus'
import Price from '@/lib/utils/format'
import { OrdersSkeleton } from './skeleton'

export default function OrdersPage() {
  const [orders, setOrders] = useState<typeOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders')
        const data = await res.json()

        if (Array.isArray(data)) {
          setOrders(data)
        } else {
         //console.error('Unexpected response:', data)
          setOrders([]) // fallback to empty array
        }
      } catch (error) {
        console.error('Failed to fetch orders', error)
        setOrders([]) // prevent crashes
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const deleteOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId))
      }
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  return (
    <div className='flex flex-col gap-6 p-4 sm:p-6 max-w-7xl mx-auto'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-2xl font-bold'>Orders</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='p-0.5'>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col p-2'>
            <span className='text-2xl font-bold'>{orders.length}</span>
            <span className='text-xs text-muted-foreground'>
              +25.2% last week
            </span>
          </CardContent>
        </Card>
        <Card className='p-0.5'>
          <CardHeader>
            <CardTitle>Fulfilled Orders</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col p-2'>
            <span className='text-2xl font-bold'>
              {
                orders.filter((order) => order.fulfillmentStatus === 'fulfilled')
                  .length
              }
            </span>
            <span className='text-xs text-muted-foreground'>
              +12.2% last week
            </span>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <Input
          placeholder='Search or type command...'
          className='w-full md:w-1/3'
        />
      </div>

      <Separator />

      <div className='w-full overflow-x-auto'>
        {loading ? (
          <OrdersSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.customer?.name || order.customer?.email || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      className={`text-sm ${
                        order.paymentStatus === 'success'
                          ? 'text-green-600 border-green-400'
                          : 'text-yellow-600 border-yellow-400'
                      }`}
                      onClick={() => order.paymentStatus !== 'success'}
                    >
                      {order.paymentStatus}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Price amount={order.totalAmount} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      className={`text-sm ${
                        order.deliveryStatus === 'shipped'
                          ? 'text-green-600 border-green-400'
                          : 'text-yellow-600 border-yellow-400'
                      }`}
                      onClick={() => order.deliveryStatus !== 'shipped'}
                    >
                      {order.deliveryStatus}
                    </Button>
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      className={`text-sm ${
                        order.fulfillmentStatus === 'fulfilled'
                          ? 'text-green-600 border-green-400'
                          : 'text-yellow-600 border-yellow-400'
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <EditStatusButton id={order._id} />
                      <DeleteOrderDialog
                        onDelete={() => deleteOrder(order._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
