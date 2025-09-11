import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import connectToDatabase from '@/lib/db/dbConnection'
import Banner from '@/lib/db/models/Banner.model'
import Link from 'next/link'
import Price from '@/lib/utils/format'
import { Card } from '../ui/card'
import Image from 'next/image'
export type BannerType = {
  _id: string
  title: string
  subtitle: string
  imageUrl: string
  buttonText: string
  price: number
  productId: string
  bannerType: string
}
const HeroSection = async () => {
  await connectToDatabase
  const fetchBanner = await Banner.find()
    .select('bannerType title subtitle buttonText price')
    .sort({ createdAt: -1 })
    .where({ bannerType: 'hero' })
    .limit(1)
    .lean()

  const heroBanner = JSON.parse(JSON.stringify(fetchBanner))
  return (
    <div>
      {/* Hero */}
      <section className='bg-gray-100'>
        {heroBanner.map((banner: BannerType) => (
          <div
            key={banner._id}
            className='max-w-7xl px-7 py-2.5  mb-10 grid md:grid-cols-2 gap-8 items-center'
          >
            <div className='space-y-5'>
              <Badge className='rounded-full p-2'>Flat 15% Discount</Badge>
              <h1 className='text-3xl md:text-5xl font-extrabold leading-tight'>
                {banner.title} <br />
              </h1>
              <h2 className=''>{banner.subtitle}</h2>

              <p className='text-lg'>
                From
                <span className='text-primary font-semibold px-2'>
                  <Price amount={banner.price} />
                </span>
              </p>
              <div className='flex '>
                <Button className='rounded-xl'>
                  <Link href={`/product/${banner.productId}`}>
                    {banner.buttonText}
                  </Link>
                </Button>
              </div>
            </div>
            <div className='relative w-full h-auto'>
              <Image
                src='/images/Hisense.webp'
                alt={banner.title}
                width={400}
                height={400}
                className=' object-contain  w-[300px] '
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default HeroSection

export async function PromoBannerMini() {
  await connectToDatabase
  const fetchBanner = await Banner.find()
    .select('bannerType title subtitle buttonText price')
    .sort({ createdAt: -1 })
    .where({ bannerType: 'promoMini' })
    .limit(2)
    .lean()
  const promoBanner = JSON.parse(JSON.stringify(fetchBanner))

  return (
    <div>
      <section className='max-w-7xl mx-auto  pb-10 grid md:grid-cols-2 gap-5'>
        {promoBanner.map((promo: BannerType) => (
          <Card key={promo._id} className='overflow-hidden rounded-3xl '>
            <div className='grid grid-cols-2 h-auto'>
              <div className='p-6 flex flex-col justify-center gap-2 '>
                <Badge>Limited Offer</Badge>
                <h2 className='text-2xl font-bold'>{promo.title}</h2>
                <h3 className=''>{promo.subtitle}</h3>
                <p>
                  From
                  <span className='text-primary font-semibold p-2.5'>
                    <Price amount={promo.price} />
                  </span>
                </p>
                <Button className='w-max rounded-xl'>
                  <Link href={`/product/${promo.productId}`}>
                    {promo.buttonText}
                  </Link>
                </Button>
              </div>
              <div className='relative w-full'>
                <Image
                  src='/images/Hisense.webp'
                  alt={promo.title}
                  width={400}
                  height={400}
                  className=' object-contain  w-[300px] '
                />
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  )
}

export async function PromoBannerLarge() {
  await connectToDatabase

  const fetchBanner = await Banner.find()
    .select('bannerType title subtitle buttonText price')
    .sort({ createdAt: -1 })
    .where({ bannerType: 'promoLarge' })
    .limit(1)
    .lean()
  const promoBannerLarge = JSON.parse(JSON.stringify(fetchBanner))
  
  return (
    <div>
      {/* Hero */}
      <section className='bg-gray-100'>
        {promoBannerLarge.map((banner: BannerType) => (
          <div
            key={banner._id}
            className='max-w-7xl px-7 py-2.5  mb-10 grid md:grid-cols-2 gap-8 items-center'
          >
            <div className='space-y-5'>
              <Badge className='rounded-full p-2'>Flat 15% Discount</Badge>
              <h1 className='text-3xl md:text-5xl font-extrabold leading-tight'>
                {banner.title} <br />
              </h1>
              <h2 className=''>{banner.subtitle}</h2>

              <p className='text-lg'>
                From
                <span className='text-primary font-semibold px-2'>
                  <Price amount={banner.price} />
                </span>
              </p>
              <div className='flex '>
                <Button className='rounded-xl'>
                  <Link href={`/product/${banner.productId}`}>
                    {banner.buttonText}
                  </Link>
                </Button>
              </div>
            </div>
            <div className='relative w-full h-auto'>
              <Image
                src='/images/Hisense.webp'
                alt={banner.title}
                width={400}
                height={400}
                className=' object-contain  w-[300px] '
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
