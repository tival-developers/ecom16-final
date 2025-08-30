import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <main className='flex flex-col items-center justify-center px-4 py-8 space-y-12'>
      {/* Hero Section */}
      <section className='w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20 px-6 text-center'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Welcome to StreamTech
          </h1>
          <p className='text-lg md:text-xl mb-6'>
            Where technology meets affordability! We&#39;re passionate about
            bringing the latest IT products and innovation to our customers at
            the best market prices.
          </p>
          <Button
            className='mt-4 px-8 py-4 text-lg transition hover:scale-105'
            variant='default'
          >
            <Link href='/categories'>Explore Products</Link>
          </Button>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <Card className='w-full  mx-auto bg-gray-100 shadow-md items-center'>
        <section className='w-full max-w-4xl text-center py-16 px-6'>
          <h2 className='text-3xl font-bold mb-4 text-yellow-600'>
            Our Vision & Mission
          </h2>
          <p className='text-lg text-gray-700 mb-8'>
            At StreamTech, we believe technology is the future. We strive to
            deliver cutting-edge IT products while supporting local businesses
            and innovators.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-left'>
            <div>
              <h3 className='text-2xl font-semibold mb-2'>Vision</h3>
              <p className='text-gray-600'>
                Create a future where every local entrepreneur has the
                technology they need to succeed.
              </p>
            </div>
            <div>
              <h3 className='text-2xl font-semibold mb-2'>Mission</h3>
              <p className='text-gray-600'>
                Deliver innovative tech products and exceptional services to our
                customers.
              </p>
            </div>
          </div>
        </section>
      </Card>

      {/* Meet the Team Section */}
      <section className='w-full bg-slate-100 py-16 px-6'>
        <h2 className='text-3xl font-bold text-center mb-4'>Meet the Team</h2>
        <p className='text-gray-700 text-center mb-12 text-xl'>
          Get to know the passionate folks behind StreamTech!
        </p>
        <div className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Team Member 1 */}
          <Card className='p-6 bg-white rounded-lg shadow-md transform transition hover:-translate-y-2 hover:shadow-lg'>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar className='h-16 w-16 bg-amber-500'>
                <AvatarImage src='/images/alice.jpg' alt='Alice Nguyen' />
                <AvatarFallback className='text-yellow-600 font-medium'>
                  AN
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className='text-yellow-600 font-medium'>
                  Alice muso
                </CardTitle>
                <CardDescription>Founder & CEO</CardDescription>
              </div>
            </div>
            <CardContent className='pt-0'>
              <p className='text-[17px] font-medium text-blue-600'>
                Alice is a tech visionary who loves building innovative gadgets.
                When she is not coding or strategizing, she organizes local
                hackathons and perfects her latte art.
              </p>
            </CardContent>
          </Card>

          {/* Team Member 2 */}
          <Card className='p-6 bg-white rounded-lg shadow-md transform transition hover:-translate-y-2 hover:shadow-lg'>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src='/images/bob.jpg' alt='Bob Lee' />
                <AvatarFallback className='text-yellow-600 font-medium'>
                  BL
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className='text-yellow-600 font-medium'>
                  Bob Lee
                </CardTitle>
                <CardDescription>Chief Technology Officer</CardDescription>
              </div>
            </div>
            <CardContent className='pt-0'>
              <p className='text-[17px] font-medium text-blue-600'>
                Bob is our gadget guru and resident coding wizard. He makes sure
                all our products are top-notch. He loves tinkering with
                electronics and mentoring local STEM clubs.
              </p>
            </CardContent>
          </Card>

          {/* Team Member 3 */}
          <Card className='p-6 bg-white rounded-lg shadow-md transform transition hover:-translate-y-2 hover:shadow-lg'>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src='/images/cathy.jpg' alt='Cathy Zhao' />
                <AvatarFallback className='text-yellow-600 font-medium'>
                  CZ
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className='text-yellow-600 font-medium'>
                  Cathy Zhao
                </CardTitle>
                <CardDescription>Community Manager</CardDescription>
              </div>
            </div>
            <CardContent className='pt-0'>
              <p className='text-[17px] font-medium text-blue-600'>
                Cathy connects us to the neighborhood. She organizes tech
                workshops and community events, making sure everyone feels
                welcome to join our tech adventures.
              </p>
            </CardContent>
          </Card>

          {/* Team Member 4 */}
          <Card className='p-6 bg-white rounded-lg shadow-md transform transition hover:-translate-y-2 hover:shadow-lg'>
            <div className='flex items-center space-x-4 mb-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src='/images/dan.jpg' alt='Dan Garcia' />
                <AvatarFallback className='text-yellow-600 font-medium'>
                  DG
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className='text-yellow-600 font-medium'>
                  Dan Garcia
                </CardTitle>
                <CardDescription>Support Lead</CardDescription>
              </div>
            </div>
            <CardContent className='pt-0'>
              <p className='text-[17px] font-medium text-blue-600'>
                Dan is our friendly fixer. He’s always ready to troubleshoot
                issues and make customers smile. Outside of work, he hosts game
                nights and is known for his great jokes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
