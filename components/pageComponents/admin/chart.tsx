'use client'
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export function ComponentChart() {
  return (
    <>
      <div className='flex-col ml-10'>
        <div className='items-center justify-items-center bg-amber-500 h-16 rounded-[10px] mb-24 mt-10 '>
          <h2 className='items-center justify-items-center font-[3px] text-3xl text-amber-50 '>
            Store Performance
          </h2>
        </div>
        <div>
          <ChartContainer
            config={chartConfig}
            className='min-h-[200px] min-w-[400px]'
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
              <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </>
  )
}
