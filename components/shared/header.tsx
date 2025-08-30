import { MenuIcon, ShoppingCart, User } from 'lucide-react'
import Marquee from 'react-fast-marquee'

import Link from 'next/link'
import { auth } from '@/auth'
import { CartIcon } from '@/app/(client-side)/cart/cartIcon'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchComponent from '@/components/shared/searcher'
import { Button } from '../ui/button'
import { FavIcon } from '../ux/favIcon'
import DepartmentSection from '../pageComponents/hompage/departmentSection'

const links = [
  { name: 'Home', href: '/home' },
  { name: 'All Products', href: '/categories' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About us', href: '/about-us' },
  { name: 'contacts', href: '/contacts' },
]

export default async function NavMenu() {
  const session = await auth()
  return (
    <div className='sticky top-0 z-50'>
      {/* Desktop Header */}
      {/* Top bar */}
      <nav className='hidden md:flex items-center justify-between px-4 py-1.5  w-full bg-gray-100'>
        <Link href='/admin/dashboard'>
          <Button
            variant={'outline'}
            className='hover:text-red-600 text-yellow-800 rounded py-2 px-7'
          >
            Admin Panel
          </Button>
        </Link>

        <div>
          <Marquee>
            <p className='text-lg font-semibold'>
              Your one stop destination for all your tech needs
            </p>
          </Marquee>
        </div>
        <div className='flex items-center gap-4 text-sm'>
          <Link className='hover:underline' href='/contacts'>
            Help
          </Link>
          <Link className='hover:underline' href='/orders'>
            Orders
          </Link>
          <span className='cursor-pointer hover:underline'>
            {session ? (
              <Link href='/api/auth/signout?callbackUrl=/'>
                <Button variant={'link'} className='text-sm'>
                  Logout
                </Button>
              </Link>
            ) : (
              <Link href='/api/auth/signin'>
                <Button variant={'link'} className='text-sm'>
                  Login / Register
                </Button>
              </Link>
            )}
          </span>
        </div>
      </nav>
      {/* Header */}
      <header className='sticky top-0 z-30 bg-gray-100 backdrop-blur border-b'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center gap-4'>
          <h2 className='text-2xl font-bold text-amber-600'>
            ST<span className='text-black'>REAM</span>
          </h2>
          <SearchComponent />
          <div className='p-3'>
            <FavIcon />
          </div>
          <Button variant='outline' className='rounded-xl gap-2'>
            <ShoppingCart className='h-4 w-4' /> Cart (0)
          </Button>
        </div>

        {/* Nav */}
        <div className='border bg-amber-600 '>
          <div className='flex items-center gap-35'>
            <DepartmentSection />
            <div className=''>
              <Tabs defaultValue='home'>
                <TabsList className='w-full bg-amber-600'>
                  {links.map((link) => (
                    <TabsTrigger
                      key={link.name}
                      value={link.name}
                      className='rounded-xl '
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className='flex md:hidden items-center justify-between px-4 py-3 bg-amber-600 w-full'>
        <div>
          <h2 className='text-xl font-bold text-yellow-500'>
            <Link href='/'>
              ST<span className='text-black'>REAM</span>
            </Link>
          </h2>
        </div>

        <div className='px-1.5'>
          <SearchComponent />
        </div>

        <div className='flex items-center gap-3'>
          <CartIcon />
          <MenuIcon className='w-5 h-5 text-white' aria-label='Menu' />
        </div>
      </header>
    </div>
  )
}
