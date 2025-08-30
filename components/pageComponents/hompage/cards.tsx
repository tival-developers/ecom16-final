import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const cards = () => {
  return (
    <div>
        <section className='my-10'>
        <div className='bg-gradient-to-br from-green-500 to-yellow-300 relative h-[400px] '>
          <h2 className='absolute top-15 left-115 text-2xl font-bold text-yellow-700'>
            Explore Our Desktops Collection
          </h2>
          <h3 className='absolute top-25 left-135 text-xl font-bold text-ellipsis text-gray-600 '>
            To Boost Your Productivity ...
          </h3>
          <Image
            src='/images/comp6.webp'
            alt='tr'
            width={200}
            height={300}
            className='absolute top-35 left-155 '
          />
          <Image
            src='/images/comp2.webp'
            alt='tr'
            width={200}
            height={300}
            className='absolute top-35 left-115 '
          />
          <Image
            src='/images/comp8.webp'
            alt='tr'
            width={200}
            height={300}
            className='absolute top-35 left-195 '
          />
          <Button  className='absolute bottom-10 right-15 bg-gray-800 px-10'>
            Explore Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default cards

const card = () => {
  return (
    <div>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <div>
          <div className='bg-gradient-to-br from-yellow-300 to-gray-300 relative h-[400px] '>
            <h2 className='absolute top-15 left-15 text-2xl font-bold text-yellow-700'>
              Explore Our Desktops Collection
            </h2>
            <h3 className='absolute top-25 left-35 text-xl font-bold text-ellipsis text-gray-600 '>
              To Boost Your Productivity ...
            </h3>
            <Image
              src='/images/comp6.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-55 '
            />
            <Image
              src='/images/comp2.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-15 '
            />
            <Image
              src='/images/comp8.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-95 '
            />
            <Button className='absolute bottom-10 right-15 bg-yellow-700 px-10'>
              Explore Now
            </Button>
          </div>
        </div>
        <div>
          <div className='bg-gradient-to-br from-green-500 to-yellow-300 relative h-[400px] '>
            <h2 className='absolute top-15 left-15 text-2xl font-bold text-yellow-700'>
              Explore Our Desktops Collection
            </h2>
            <h3 className='absolute top-25 left-35 text-xl font-bold text-ellipsis text-gray-600 '>
              To Boost Your Productivity ...
            </h3>
            <Image
              src='/images/comp6.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-55 '
            />
            <Image
              src='/images/comp2.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-15 '
            />
            <Image
              src='/images/comp8.webp'
              alt='tr'
              width={200}
              height={300}
              className='absolute top-35 left-95 '
            />
            <Button className='absolute bottom-10 right-15 bg-yellow-700 px-10'>
              Explore Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default card
