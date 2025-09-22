// lib/actions/getOverviewData.ts
'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '../db/models/order'
export type ChartData = {
  name: string
  total: number
}


export async function getOverviewData(): Promise<ChartData[]> {
  await connectToDatabase() // ✅ call it

  const salesData = await Order.aggregate<{
    _id: { day: number; month: number; year: number }
    total: number
  }>([
    {
      $match: {
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
      }
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: '$createdAt' },
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
        total: { $sum: '$totalAmount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
  ])

  console.log("Sales data raw aggregation:", JSON.stringify(salesData, null, 2))

  const chartData: ChartData[] = salesData.map((sale) => ({
    name: `${sale._id.day}/${sale._id.month}`,
    total: sale.total,
  }))

  return chartData
}
