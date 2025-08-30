'use client'

import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getAnalytics } from '@/lib/actions/getAnalytics'

type CategoryData = {
  name: string
  value: number
}

type ProfitData = {
  day: string
  profit: number
}

type AnalyticsData = {
  totalRevenue: number
  averageOrderValue: number
  totalOrders: number
  conversionRate: number
  bestsellingProduct: {
    name: string
    category: string
  } | null
  categoryData: CategoryData[]
  profitDay: ProfitData[]
  profitMonth: ProfitData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#F9F871']

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
      </CardContent>
    </Card>
  )
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalytics()
        setData(res)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (!data) {
    return <p className="text-sm text-muted-foreground">No analytics data available.</p>
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        <StatCard title="Total Revenue" value={data.totalRevenue} />
        <StatCard title="Avg. Order Value" value={data.averageOrderValue} />
        <StatCard title="Total Orders" value={data.totalOrders} />
        <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} />
      </div>

      {/* Bestselling Product */}
      <Card>
        <CardHeader>
          <CardTitle>Bestselling Product</CardTitle>
        </CardHeader>
        <CardContent>
          {data.bestsellingProduct ? (
            <div>
              <p className="text-lg font-semibold">{data.bestsellingProduct.name}</p>
              <p className="text-sm text-muted-foreground">
                Category: {data.bestsellingProduct.category}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No bestselling product yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Pie Chart - Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Categories Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {data.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No category data available.</p>
          )}
        </CardContent>
      </Card>

      {/* Bar Chart - Profit by Day */}
      <Card>
        <CardHeader>
          <CardTitle>Profit by Day</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {data.profitDay.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.profitDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No daily profit data available.</p>
          )}
        </CardContent>
      </Card>

      {/* Bar Chart - Profit by Month */}
      <Card>
        <CardHeader>
          <CardTitle>Profit by Month</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {data.profitMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.profitMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground">No monthly profit data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
