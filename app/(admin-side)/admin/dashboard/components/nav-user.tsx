'use client'

import { LogOut } from 'lucide-react'

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className='flex items-center gap-2 p-1 rounded-lg bg-gray-800 text-white'>
          <LogOut />
          <Link href='/api/auth/signout?callbackUrl=/'> Log out</Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
