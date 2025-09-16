// 'use client'

// import { SidebarIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Separator } from '@/components/ui/separator'
// import { useSidebar } from '@/components/ui/sidebar'
// import { MainNav } from './main-nav'
// import MailUser from './mail-user'

// import AccountAdmin from './account'

// export function SiteHeader() {
//   const { toggleSidebar } = useSidebar()

//   return (
//     <header className='flex sticky top-0 z-50 w-full items-center border-b bg-background'>
//       <div className='flex h-auto sm:h-[--header-height] items-center justify-between px-4 py-2'>
//         <div className='flex gap-1.5'>
//           {/* Sidebar toggle button */}
//           <Button
//             className='h-8 w-8 flex-shrink-0'
//             variant='ghost'
//             size='icon'
//             onClick={toggleSidebar}
//           >
//             <SidebarIcon />
//           </Button>

//           {/* Show separator only on desktop */}
//           <Separator
//             orientation='vertical'
//             className='hidden sm:block mr-2 h-'
//           />
//         </div>

//         {/* Nav links - hidden on small screens */}
//         <div className='hidden sm:flex sm:mx-6'>
//           <MainNav />
//         </div>

//         <div className='flex flex-1 items-center justify-end gap-2'>
//           <AccountAdmin />
//           <MailUser />
//         </div>
//         <Separator orientation='vertical' />
//       </div>
//     </header>
//   )
// }
'use client'

import { SidebarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'
import { MainNav } from './main-nav'
import MailUser from './mail-user'
import AccountAdmin from './account'
import Link from 'next/link'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm'>
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

          {/* Separator */}
          <Separator orientation='vertical' className='hidden sm:block h-6' />
        </div>
        {/* Nav */}
        <div className='flex  items-center justify-center gap-3.5'>
          <Link href='/'>
            <h2 className='text-2xl font-bold border-2 rounded-3xl py-2 px-3 bg-amber-600 text-white'>STREAM </h2>{' '}
          </Link>
          <div className='hidden sm:flex'>
            <MainNav />
          </div>
        </div>

        {/* Right side: User actions */}
        <div className='flex items-center gap-3'>
          <MailUser />
          <Separator orientation='vertical' className='h-6' />
          <AccountAdmin />
        </div>
      </div>
    </header>
  )
}
