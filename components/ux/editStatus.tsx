// src/components/orders/EditStatusButton.tsx
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


interface Props {
    id: string
}

export default function EditStatusButton({ id }: Props) {
  const [open, setOpen] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState('pending')
  const [fulfillmentStatus, setFulfillmentStatus] = useState('pending')
  const [paymentStatus, setPaymentStatus] = useState('pending')

  const router = useRouter()

  async function handleSave() {
    try {
      const res = await fetch(`/api/orders/${id}/update-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus, fulfillmentStatus, paymentStatus })
      });

      if (res.ok) {
        toast('Status updated successfully!');
        setOpen(false);
        //revalidatePath('/admin/dashboard/products')
        router.refresh();
      } else {
        toast('Failed to update.')
      }
    } catch (err) {
      toast.error('Server Error.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className='grid  md:grid-cols-3 p-4 gap-4'>
        {/* Delivery Section */}
        <div>
          <DialogHeader>
            <DialogTitle>Delivery Status</DialogTitle>
          </DialogHeader>

          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            className='p-2 my-4 border rounded w-full'
          >
            <option value='pending'>Pending</option>
            <option value='shipped'>Shipped</option>
            <option value='cancelled'>Cancelled</option>
            <option value='delivered'>Delivered</option>
          </select>
        </div>

        {/* Fulfillment Section */}
        <div>
          <DialogHeader>
            <DialogTitle>Fulfillment Status</DialogTitle>
          </DialogHeader>

          <select
            value={fulfillmentStatus}
            onChange={(e) => setFulfillmentStatus(e.target.value)}
            className='p-2 my-4 border rounded w-full'
          >
            <option value='pending'>Pending</option>
            <option value='fulfilled'>Fulfilled</option>
          </select>
        </div>

        {/* Payment Section */}
        <div>
          <DialogHeader>
            <DialogTitle>Payment Status</DialogTitle>
          </DialogHeader>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className='p-2 my-4 border rounded w-full'
          >
            <option value='pending'>Pending</option>
            <option value='success'>Success</option>
          </select>
        </div>

        {/* Save button for all */}
        <DialogFooter className='col-span-3'>
          <Button variant='default' onClick={handleSave} className='w-full'>
            Save All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
