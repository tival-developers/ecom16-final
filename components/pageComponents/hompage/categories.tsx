'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react'

/*TOP Categories section */
const categories = [
  { name: 'Laptops', src: '/images/lap1.jpg' },
  { name: 'Cameras', src: '/images/lap2.jpg' },
  { name: 'Computers', src: '/images/lap3.jpg' },
  { name: 'Printers', src: '/images/printer.jpg' },
  { name: 'Tablets & Ipad', src: '/images/router.jpg' },
  { name: 'Smart Phone', src: '/images/phones.jpg' },
  { name: 'Gamepad', src: '/images/ps.webp' },
  { name: 'Accessories', src: '/images/audio.jpg' },
  { name: 'Video Games', src: '/images/Hisense.webp' },
  { name: 'Audio', src: '/images/audio.jpg' },
]
const Categories = () => {
  return (
    <section className='px-4 py-10'>
      <CardHeader>
        <h2 className='text-xl font-bold text-yellow-600 mb-6 text-center sm:text-left'>
          Top Categories Of The Month
        </h2>
      </CardHeader>
      <Card className='bg-slate-50 p-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 '>
          {categories.map((category, idx) => (
            <Card key={idx}>
              <div className='w-full h-44 relative '>
                <Image
                  src={category.src}
                  alt={category.name}
                  fill
                />
              </div>
              <div className='absolute p-3 -top-2'>
                <Button>explore</Button>
                
              </div>
              
            </Card>
          ))}
        </div>
      </Card>
    </section>
  )
}

export default Categories

/*Computer & Desktop Products */

export function Laptops() {
  return (
    <section className='px-4 py-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>
          <span className='font-bold text-yellow-600'>Computer & Desktop</span>{' '}
          Products
        </h2>
        <div className='space-x-4 text-sm text-gray-600'>
          <Button variant='link'>Best Seller</Button>
          <Button variant='link'>New Arrivals</Button>
          <Button variant='link'>Desktop PC</Button>
          <Button variant='link'>Laptop</Button>
          <Button variant='link'>PC Component</Button>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <Card className='col-span-12 md:col-span-3  text-black p-4 bg-slate-100'>
          <h3 className='text-sm font-semibold'>Gaming 4K*</h3>
          <p className='text-lg font-bold mb-2'>Desktop & Case</p>
          <p className='text-xs'>Free Shipping Order $30</p>
          <div className='mt-4 relative w-full h-70'>
            <Image src='/images/audio.jpg' alt='Desktop Case' fill />
          </div>
          <Button className='mt-4 w-full'>Buy Now</Button>
        </Card>
        <div className='col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(6)].map((_, idx) => (
            <Card key={idx} className='p-3 '>
              <div className='relative w-full h-65 mb-0.5'>
                <Image src='/images/lap3.jpg' alt='Product' fill />
              </div>
              <p className='text-xs text-gray-500'>Audio Speakers</p>
              <p className='text-sm font-medium'>Product Title {idx + 1}</p>

              <div className='text-sm'>
                <span className='text-yellow-500 font-bold'>$260.00</span>
                {idx % 2 === 0 && (
                  <span className='line-through text-gray-400 ml-2'>
                    $342.00
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/*Promotions */

export function PromotionalBanners() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6'>
      {[
        {
          title: 'Smartphone Bestseller Products 2019',
          price: '$199.99',
          color: 'bg-purple-500',
        },
        {
          title: 'Big Sale 30% Trending Camera 2019',
          price: '$99.97',
          color: 'bg-blue-600',
        },
        {
          title: 'Top Sale Fresh Orange Juice',
          price: '$29.99',
          color: 'bg-yellow-500',
        },
      ].map((item, idx) => (
        <Card key={idx} className={`${item.color} text-white`}>
          <CardContent className='p-6'>
            <div className='text-sm mb-1'>{item.title}</div>
            <div className='text-lg font-semibold mb-2'>
              Price: {item.price}
            </div>
            <Button
              variant='secondary'
              size='sm'
              className='text-black bg-white'
            >
              Pre - Order Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

/*Phones */

{
  /* Top Flash Deals */
}

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const endTime =
      new Date().getTime() +
      65 * 3600 * 1000 +
      6 * 60 * 1000 +
      25 * 1000 +
      28000

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='px-4 py-8'>
      <h2 className='text-xl font-bold mb-6 text-yellow-600'>
        Top Flash Deals
      </h2>

      <div className='grid grid-cols-12 gap-4'>
        {/* Main Flash Deal - spans more columns on larger screens */}
        <Card className='col-span-12 md:col-span-6 lg:col-span-4 p-4  flex flex-col justify-between bg-slate-100'>
          <div>
            <div className='text-red-500 font-semibold text-sm mb-2'>-33%</div>
            <h3 className='font-semibold text-gray-800 mb-1'>
              Apple 12.9&Prime; iPad Pro (Mid 2017, 512GB, Wi-Fi + 4G LTE, Gold)
            </h3>
            <p className='text-sm text-gray-600 mb-2'>$260.00</p>
            <p className='text-xs text-gray-500 mb-2'>
              Hurry Up! Offer Ends In:
            </p>

            <div className='relative h-64 w-full bg-black/40 p-4 rounded text-white'>
              <Image src='/images/audio.jpg' alt='Product' fill />
            </div>

            <Button className='mt-4 w-full'>Buy Now</Button>
          </div>

          <div className='flex justify-center gap-2 mt-4 text-xs font-medium text-white'>
            <span className='bg-red-600 px-2 py-1 rounded'>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className='bg-red-600 px-2 py-1 rounded'>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className='bg-red-600 px-2 py-1 rounded'>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </Card>

        {/* Repeating Product Cards */}
        {[1, 2, 3, 4].map((_, idx) => (
          <Card
            key={idx}
            className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 p-4  bg-slate-100 flex flex-col justify-between'
          >
            <div className='text-white font-semibold text-sm mb-2 bg-red-600 rounded-2xl p-1 text-center'>
              -33%
            </div>
            <div className='relative h-40 w-full bg-black/40 rounded'>
              <Image src='/images/audio.jpg' alt='Product' fill />
            </div>
            <p className='text-sm font-medium text-center text-gray-800 mt-2'>
              Bluetooth Portable Speaker
            </p>
            <p className='text-xs text-center text-gray-500 line-through'>
              $390.00
            </p>
            <p className='text-sm text-center font-bold text-yellow-500'>
              $260.00
            </p>
            <Button className='mt-2 w-full'>Add to Cart</Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
