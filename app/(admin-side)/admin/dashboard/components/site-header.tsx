'use client'

import { SidebarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { MainNav } from './main-nav'
import MailUser from './mail-user'
import AccountAdmin from './account'
import Link from 'next/link'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-gray-800 text-white backdrop-blur-md shadow-sm'>
      <div className='flex h-14 sm:h-[--header-height] items-center justify-between px-4'>
        {/* Left side: Sidebar + Nav */}
        <div className='flex items-center gap-3'>
          {/* Sidebar toggle */}
          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9 rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors'
            onClick={toggleSidebar}
          >
            <SidebarIcon className='h-5 w-5' />
          </Button>
        </div>
        {/* Nav */}
        <div className='flex  items-center justify-center gap-3.5'>
          <Link href='/'>
            <h2 className='text-2xl font-bold border-2 rounded-xl p-1.5 text-white hover:text-black bg-amber-600'>
              Shop
            </h2>
          </Link>
          <div className='hidden sm:flex'>
            <MainNav />
          </div>
        </div>

        {/* Right side: User actions */}
        <div className='flex items-center gap-3 '>
          <AccountAdmin />
          <MailUser />
        </div>
      </div>
    </header>
  )
}
