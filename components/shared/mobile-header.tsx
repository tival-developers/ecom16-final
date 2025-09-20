'use client'
import * as React from 'react'
import Link from 'next/link'
//import { motion } from 'framer-motion'
import { Menu, ChevronRight, User } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import SearchComponent from './searcher'
import { CartIcon } from '@/app/(client-side)/cart/cartIcon'
import CompanyLogo from './Brand-logo'

// Optional: pass cartCount and onSearch to make it reusable
export default function MobileHeader({
  links = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Categories', href: '/categories' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'Orders', href: '/orders' },
  ],
}: {
  cartCount?: number
  links?: { label: string; href: string }[]
}) {
  return (
    <header className='sticky top-0 z-50 bg-amber-600 backdrop-blur supports-[backdrop-filter]:bg-amber-600 border-b md:hidden'>
      <div className='mx-auto max-w-screen-xl px-3 sm:px-4'>
        <div className='h-14 flex items-center justify-between'>
          {/* Left: Hamburger + Drawer */}
          <Sheet >
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-2xl'>
                <Menu className='h-6 w-6 ' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 w-[90vw] max-w-sm bg-gradient-to-tr from-amber-600 via-amber-300 to-pink-300 rounded-r-2xl'>
              <div className='p-4'>
                <SheetHeader className='items-start'>
                  <SheetTitle className='text-left text-xl font-semibold'>
                   <CompanyLogo />
                  </SheetTitle>
                </SheetHeader>

                <nav className='mt-3'>
                  <ul className='flex flex-col'>
                    {links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className='group flex items-center justify-between px-2 py-3 text-base rounded-xl hover:bg-muted transition-colors'
                        >
                          <span className='font-medium'>{l.label}</span>
                          <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Separator className='my-3' />

                <div className='grid grid-cols-2 gap-2 p-1'>
                  <Button asChild variant='secondary' className='rounded-xl'>
                    <Link href='/settings' className='flex gap-2 items-center'>
                      <User className='h-4 w-4' /> Account
                    </Link>
                  </Button>
                  <Button asChild className='rounded-xl'>
                    <Link href='/'>Today’s Deals</Link>
                  </Button>
                </div>

                <div className='mt-4 p-3 rounded-2xl bg-muted/60'>
                  <p className='text-sm text-muted-foreground'>
                    Stream Online Store
                    
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <CompanyLogo />
          {/* <Link href='/' className='flex items-center gap-2'>
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className='h-8 w-8 rounded-2xl bg-black text-white grid place-items-center font-bold'
            >
              S
            </motion.span>
            <span className='text-lg font-semibold text-white'>Stream</span>
          </Link> */}

          {/* Right: Actions */}
          <div className='flex items-center gap-1.5 pl-1.5'>
            <SearchComponent />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  )
}
