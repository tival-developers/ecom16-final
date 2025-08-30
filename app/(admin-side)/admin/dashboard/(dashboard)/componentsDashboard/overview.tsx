'use client'

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { useEffect, useState } from 'react'
import { getOverviewData } from '@/lib/actions/overview'
import OverviewSkeleton from './overviewSkeleton'


type ChartData = {
  name: string
  total: number
}

export function Overview() {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    async function fetchData() {
      const res = await getOverviewData()
      setData(res)
    }

    fetchData()
  }, [])

  if (data.length === 0) {
    return <OverviewSkeleton />
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="bg-gray-800"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
