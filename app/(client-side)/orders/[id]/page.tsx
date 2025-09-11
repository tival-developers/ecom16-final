import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import PreviousOrderCard from './orderDetail'
export async function generateStaticParams() {
  await connectToDatabase
  const orders = await Order.find({}, '_id').lean()

  return orders.map((order) => ({
    id: String(order._id),
  }))
  
}



export default async function OrderPage(context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase

  const orderData = await Order.findById(id).lean()

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


