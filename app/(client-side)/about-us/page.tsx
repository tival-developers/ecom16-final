// app/about/page.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'about us',
  description: 'about us',
}


export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      <section className='relative bg-amber-100 text-amber-600'>
        <div className='max-w-6xl mx-auto px-6 py-20 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>About Stream</h1>
          <p className='text-lg md:text-xl text-gray-800 font-medium max-w-2xl mx-auto'>
            We are an electronics shop, delivering quality and innovation for
            over 5 years.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className='max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center'>
        <div>
          <h2 className='text-3xl font-bold mb-4 text-amber-600'>
            Our Mission
          </h2>
          <p className='text-gray-600 leading-relaxed'>
            At <span className='font-semibold'>Stream</span>, we believe
            technology should empower people. For the past 5 years, we’ve been
            dedicated to bringing the latest and most reliable electronics to
            our customers, ensuring both affordability and quality.
          </p>
        </div>
        <div className='relative flex items-center w-full justify-center m-1.5'>
          <Image
            src='/images/Hisense.webp'
            alt='televosion'
            width={400}
            height={200}
            className=' object-contain  flex items-center w-[400px] '
          />
        </div>
       
      </section>

      {/* Stats Section */}
      <section className='bg-gray-100 py-16'>
        <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center'>
          {[
            { label: 'Years in Market', value: '5+' },
            { label: 'Happy Customers', value: '10K+' },
            { label: 'Products Delivered', value: '50K+' },
          ].map((stat, i) => (
            <Card key={i} className='shadow-md'>
              <CardContent className='p-8'>
                <h3 className='text-4xl font-bold text-gray-900'>
                  {stat.value}
                </h3>
                <p className='text-gray-600 mt-2'>{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='max-w-6xl mx-auto px-6 py-16'>
        <h2 className='text-3xl font-bold text-center mb-12 text-gray-900'>
          Why Choose Stream?
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Quality Products',
              desc: 'We source only the best electronics from trusted brands worldwide.',
            },
            {
              title: 'Fast Delivery',
              desc: 'Quick and reliable shipping, so you can enjoy your products sooner.',
            },
            {
              title: 'Customer First',
              desc: 'Dedicated support and service to ensure your satisfaction.',
            },
          ].map((item, i) => (
            <Card key={i} className='hover:shadow-lg transition bg-gradient-to-r from-gray-200 via-white to-gray-100'>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                <p className='text-gray-600'>{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className='bg-amber-100 text-amber-600 py-16 text-center'>
        <h2 className='text-3xl font-bold mb-4'>Join the Stream Family</h2>
        <p className='text-gray-800 font-medium mb-6'>
          Discover the latest electronics and enjoy a seamless shopping
          experience.
        </p>
        <Button size='lg' className='bg-white text-gray-900 hover:bg-gray-200'>
          <Link href='/categories'>Explore Products</Link>
        </Button>
      </section>
    </div>
  )
}
