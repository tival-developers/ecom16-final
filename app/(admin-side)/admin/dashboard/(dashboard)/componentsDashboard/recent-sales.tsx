'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
import { getAllSales, getRecentSales } from '@/lib/actions/Sales'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import RecentSalesSkeleton from './recentSkeleton'
import Price from '@/lib/utils/format'

type Sale = {
  name: string
  email: string
  total: number
}

export function RecentSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [totalSales, setTotalSales] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [recent, total] = await Promise.all([
        getRecentSales(),
        getAllSales(),
      ])
      setSales(recent)
      setTotalSales(total)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <RecentSalesSkeleton />
  }

  if (sales.length === 0) {
    return <p className='text-sm text-muted-foreground px-4'>No sales.</p>
  }

  return (
  
    <div>
      <div>
        <h2 className='p-3'>Recent Sales</h2>
        <p className='text-sm text-muted-foreground px-4'>
          You have a total of {totalSales} sales.
        </p>
      </div>
      <div>
        <div className='space-y-8 px-4'>
          {sales.map((sale, i) => (
            <div key={i} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage
                  src={`/avatars/0${(i % 5) + 1}.png`}
                  alt={sale.name}
                />
                <AvatarFallback>
                  {sale.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>{sale.name}</p>
                <p className='text-sm text-muted-foreground'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium'>
                <Price amount={sale.total} />
              </div>
            </div>
          ))}
        </div>
        <div className='px-4 mt-4'>
          <Button variant={'outline'}>
            <Link href='/admin/dashboard/orders'>View All Sales</Link>
          </Button>
        </div>
      </div>
    </div>
      
    
  )
}
