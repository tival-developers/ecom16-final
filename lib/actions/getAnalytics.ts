'use server'

import connectToDatabase from '@/lib/db/dbConnection'
import { format } from 'date-fns'
import { Order } from '../db/models/order'

type DateRangeInput = {
  from: Date
  to: Date
}

type OrderItem = {
  name: string
  price: number
  quantity: number
  category?: string
}

type OrderType = {
  createdAt: Date
  totalAmount: number
  items: OrderItem[]
}

export async function getAnalytics(dateRange?: DateRangeInput) {
  await connectToDatabase

  const filter: Record<string, unknown> = {}
  if (dateRange?.from && dateRange?.to) {
    filter.createdAt = { $gte: dateRange.from, $lte: dateRange.to }
  }

  const orders = await Order.find(filter).lean<OrderType[]>()


  const categoryTotals = new Map<string, number>()
  const productStats = new Map<string, { count: number; total: number; category?: string }>()
  const profitByDay = new Map<string, number>()
  const profitByMonth = new Map<string, number>()

  let totalRevenue = 0

  for (const order of orders) {
    totalRevenue += order.totalAmount

    let orderCost = 0

    for (const item of order.items) {
      const { name, price, quantity, category } = item

      // --- Category Aggregation ---
      const categoryKey = category ?? name
      categoryTotals.set(categoryKey, (categoryTotals.get(categoryKey) || 0) + price * quantity)

      // --- Best-Selling Product Aggregation ---
      const product = productStats.get(name) ?? { count: 0, total: 0, category }
      product.count += quantity
      product.total += price * quantity
      productStats.set(name, product)

      // --- Cost Estimate ---
      orderCost += price * quantity * 0.5
    }

    const profit = order.totalAmount - orderCost
    const dayKey = format(order.createdAt, 'MMM dd')
    const monthKey = format(order.createdAt, 'MMM yyyy')

    profitByDay.set(dayKey, (profitByDay.get(dayKey) || 0) + profit)
    profitByMonth.set(monthKey, (profitByMonth.get(monthKey) || 0) + profit)
  }

  const categoryData = Array.from(categoryTotals.entries()).map(([name, value]) => ({ name, value }))
  const profitDay = Array.from(profitByDay.entries()).map(([date, value]) => ({ date, value }))
  const profitMonth = Array.from(profitByMonth.entries()).map(([date, value]) => ({ date, value }))

  const bestEntry = Array.from(productStats.entries()).sort((a, b) => b[1].count - a[1].count)[0]
  const bestSelling = bestEntry
    ? {
        name: bestEntry[0],
        count: bestEntry[1].count,
        total: bestEntry[1].total,
        category: bestEntry[1].category,
      }
    : null

  return {
    categoryData,
    bestSelling,
    profitDay,
    profitMonth,
    totalRevenue,
    avgOrderValue: orders.length ? totalRevenue / orders.length : 0,
  }
}
