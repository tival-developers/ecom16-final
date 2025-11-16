import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import { auth } from '@/auth'
import { CartIcon } from '@/app/(client-side)/cart/cartIcon'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SearchComponent from '@/components/shared/searcher'
import { Button } from '../ui/button'
import { FavIcon } from '../ux/favIcon'
import DepartmentSection from './departmentSection'
import MobileHeader from './mobile-header'
import { Settings } from 'lucide-react'
import CompanyLogo from './Brand-logo'
import { Separator } from '../ui/separator'

const links = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/categories' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contacts' },
]

export default async function NavMenu() {
  const session = await auth()
  const allowedRoles = ['manager', 'developer', 'sales', 'superadmin']
  const isAdmin = allowedRoles.includes(session?.user?.role || '')

  return (
    <div className='sticky top-0 z-50'>
      {/* Desktop Header */}
      {/* Top bar */}
      <nav className='hidden md:flex items-center justify-between px-4 py-1.5  w-full bg-white '>
        {isAdmin && (
          <Link href='/admin/dashboard'>
            <Button
              className='hover:text-red-600 text-white rounded py-2 px-7'
            >
              Admin Panel
            </Button>
          </Link>
        )}
        <div>
          <Marquee>
            <p className='text-lg font-semibold'>
              Your one stop destination for all your tech needs
            </p>
          </Marquee>
        </div>
        <div className='flex items-center gap-0.5 text-sm'>
          <Link href='/contacts'>
            <Button variant={'link'} size={"sm"} className='text-sm'>
              Help
            </Button>
          </Link>
          <Link href='/orders'>
            <Button variant={'link'} size={"sm"} className='text-sm'>
              Orders
            </Button>
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
      <Separator className='text-black ' />
      {/* Header */}
      <header className='hidden md:block sticky top-0 z-3000  bg-white border-b'>
        <div className='flex max-w-7xl mx-auto px-4 py-4 items-center gap-4'>
          <CompanyLogo />
          <SearchComponent />
          <div className='p-3'>
            <FavIcon />
          </div>
          <CartIcon />
          <Button variant={'outline'} className='items-center'>
            <Link href='/settings'>
              <Settings />
            </Link>
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
                      className='rounded-xl  '
                    >
                      <Link
                        className='hover:text-black text-white'
                        href={link.href}
                      >
                        {link.name}{' '}
                      </Link>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader />
    </div>
  )
}
