'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SalesAreaChart({ chartData }: { chartData: any[] }) {
  const [timeRange, setTimeRange] = React.useState('90d')

  // Filter by date range
  const filteredData = React.useMemo(() => {
    if (!chartData?.length) return []
    const referenceDate = new Date(chartData[chartData.length - 1]?.date)
    const days = timeRange === '30d' ? 30 : timeRange === '7d' ? 7 : 90
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - days)
    return chartData.filter((d) => new Date(d.date) >= startDate)
  }, [timeRange, chartData])

  // Find categories dynamically
  const categories = React.useMemo(() => {
    if (!chartData?.length) return []
    return Object.keys(chartData[0]).filter((k) => k !== 'date')
  }, [chartData])

  // Build dynamic chart config
  const chartConfig = React.useMemo(() => {
    const palette = [
      'var(--chart-1)',
      'var(--chart-2)',
      'var(--chart-3)',
      'var(--chart-4)',
      'var(--chart-5)',
    ]
    return categories.reduce((acc, key, idx) => {
      acc[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color: palette[idx % palette.length],
      }
      return acc
    }, {} as Record<string, { label: string; color: string }>)
  }, [categories])

  return (
    <Card>
      <CardHeader className='flex items-center gap-2 border-b py-5 sm:flex-row'>
        <div className='flex-1'>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='90d'>Last 3 months</SelectItem>
            <SelectItem value='30d'>Last 30 days</SelectItem>
            <SelectItem value='7d'>Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[250px] w-full'>
          <AreaChart data={filteredData}>
            <defs>
              {categories.map((key) => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='5%'
                    stopColor={chartConfig[key].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset='95%'
                    stopColor={chartConfig[key].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  indicator='dot'
                />
              }
            />
            {categories.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type='natural'
                fill={`url(#fill-${key})`}
                stroke={chartConfig[key].color}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
