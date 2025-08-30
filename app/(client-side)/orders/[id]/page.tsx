import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import PreviousOrderCard from './orderDetail'


export default async function OrderPage({
  params,
}: {
  params: { id: string }
}) {
  await connectToDatabase

  const orderData = await Order.findById(params.id).lean()

  if (!orderData) {
    return (
      <div className='container mx-auto p-4'>
        <p>ordert not found.</p>
      </div>
    )
  }

  const order = JSON.parse(JSON.stringify(orderData))
  console.log("orderdata", order)

  return (
    <main className='container mx-auto p-4'>
      <PreviousOrderCard order={order} />
    </main>
  )
}


