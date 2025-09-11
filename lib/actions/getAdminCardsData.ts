import { Order } from '../db/models/order'
import connectToDatabase from '@/lib/db/dbConnection'
export async function fetchCardsData() {
  await connectToDatabase

  // Total Revenue & Total Sales
  const orders = await Order.find().lean()

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  )
  const totalSales = orders.length

  
  const bestSelling = await Order.aggregate([
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.productId',
        totalSold: { $sum: '$items.quantity' },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    { $project: { _id: 0, totalSold: 1, product: 1 } },
  ])

  //const bestProduct = bestSelling[0]
  return {
    bestSelling: bestSelling.map((b) => ({
      ...b,
      product: { ...b.product, _id: b.product._id.toString() },
    })),
    // bestProduct: JSON.parse(JSON.stringify(bestProduct)),
    // totalRevenue :JSON.parse(JSON.stringify(totalRevenue)),
    // totalSales  :JSON.parse(JSON.stringify(totalSales)),

    totalRevenue,
    totalSales,
  }
}
