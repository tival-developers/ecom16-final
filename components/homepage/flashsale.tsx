import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import connectToDatabase from '@/lib/db/dbConnection'
import FlashSale from '@/lib/db/models/flashsale'
import CountdownTimer from '@/components/countdown'
import Price from '@/lib/utils/format'
import Image from 'next/image'
import Link from 'next/link'

type FlashsaleType = {
  _id: string
  name: string
  imageUrls: string
  price: number
  originalPrice: number
  startAt: Date
  endAt: Date
}

function FlashsalePrice({
  price,
  originalPrice,
}: {
  price: number
  originalPrice?: number
}) {
  return (
    <div className='flex items-baseline gap-2'>
      <span className='text-lg font-semibold'>
        <Price amount={price} />
      </span>
      {originalPrice && (
        <span className='text-sm text-muted-foreground line-through'>
          <Price amount={originalPrice} />
        </span>
      )}
    </div>
  )
}

const FlashsaleHomepage = async () => {
  await connectToDatabase
  const fetchFlashsale = await FlashSale.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()

  const flashsales: FlashsaleType[] = JSON.parse(JSON.stringify(fetchFlashsale))

  if (flashsales.length === 0) return null // Hide section if empty

  return (
    <section className='max-w-7xl mx-auto px-4 pb-12'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl md:text-2xl font-bold'>Deals Of The Day</h2>
        <Button variant='ghost' className='rounded-xl'>
          View all products
        </Button>
      </div>
      <div className='grid md:grid-cols-3 gap-5'>
        {flashsales.map((d: FlashsaleType) => (
          <Card key={d._id} className='rounded-2xl overflow-hidden'>
            <div className='grid grid-cols-3 gap-0'>
              <div className='col-span-1 bg-muted/30 p-3 flex items-center justify-center'>
                <Link href={`/product/${d._id}`}>
                  <div className='relative w-32 h-28 aspect-square'>
                    <Image
                      src={d.imageUrls || '/placeholder.jpg'}
                      alt={d.name}
                      fill
                      className='object-cover rounded-t-2xl'
                    />
                  </div>
                </Link>
              </div>
              <div className='col-span-2 p-4 space-y-2'>
                <h4 className='font-semibold leading-tight line-clamp-2'>
                  {d.name}
                </h4>
                <FlashsalePrice
                  price={d.price}
                  originalPrice={d.originalPrice}
                />
                <div>
                  <span className='text-xs text-muted-foreground'>
                    Ends in:
                  </span>
                  <CountdownTimer startAt={d.startAt} endAt={d.endAt} />
                </div>
                <Button size='sm' className='rounded-xl w-max'>
                  Shop Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
export default FlashsaleHomepage
