'use client'

import { SidebarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'
import { MainNav } from './main-nav'
import { Search } from './search'
import MailUser from './mail-user'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className='flex sticky top-0 z-50 w-full items-center border-b bg-background'>
      <div className='flex h-auto sm:h-[--header-height] w-full items-center gap-2 px-4 py-2'>
        <div className='flex gap-1.5'>
          {/* Sidebar toggle button */}
          <Button
            className='h-8 w-8 flex-shrink-0'
            variant='ghost'
            size='icon'
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>

          {/* Show separator only on desktop */}
          <Separator
            orientation='vertical'
            className='hidden sm:block mr-2 h-'
          />
        </div>

        {/* Nav links - hidden on small screens */}
        <div className='hidden sm:flex sm:mx-6'>
          <MainNav />
        </div>

        {/* Search takes available space */}
        <div className='flex flex-1 items-center justify-end gap-2'>
          <Search />
          <MailUser />
        </div>
        <Separator orientation='vertical' />
      </div>
    </header>
  )
}
