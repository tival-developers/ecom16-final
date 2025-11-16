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
          <Link href='/'>
            <h2 className='text-xl font-medium border-2 rounded-lg p-0.5 text-white hover:text-gray-800 bg-amber-600'>
              View Shop
            </h2>
          </Link>
        </div>
        {/* Nav */}
        <div className='flex  items-center justify-center gap-3.5'>
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
