// import { BellAlertIcon } from '@heroicons/react/24/outline'
// import Link from 'next/link'
// import { UserNav } from './user-nav'

// export function MailUser({ ...props }: React.ComponentProps<'form'>) {
//   return (
//     <form {...props}>
//       <div className='relative p-5 flex items-center justify-items-center gap-4'>

//         <Link href='/mail'>
//           <BellAlertIcon className=' h-6 w-6' />
//         </Link>
//         <div>
//           <UserNav />
//         </div>
//       </div>
//     </form>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { Bell, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { cn } from '@/lib/db/essentials/utils'
import { formatDistanceToNow } from 'date-fns'

type Notification = {
  _id: string
  type:
    | 'review'
    | 'helpRequest'
    | 'order'
    | 'product'
    | 'admin'
    | 'banner'
    | 'blog'
  title: string
  message: string
  read: boolean
  date: string
}
const typeLinks: Record<Notification['type'], string> = {
  review: '/admin/products/reviews',
  helpRequest: '/admin/dashboard/mails',
  product: '/admin/dashboard/products',
  admin: '/admin/dashboard/admins',
  banner: '/admin/dashboard/banners',
  blog: '/admin/dashboard/blogs',
  order: '/admin/dashboard/orders',
}
export default function MailUser() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/notifications')

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`)
        }

        const data = await res.json()
        setNotifications(data)
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setNotifications([]) // fallback
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  // const getLink = (type: Notification['type']) => {
  //   switch (type) {
  //     case 'review':
  //       return '/admin/products/reviews'
  //     case 'helpRequest':
  //       return '/admin/dashboard/mails'
  //     case 'product':
  //       return '/admin/dashboard/products'
  //     case 'admin':
  //       return '/admin/dashboard/admins'
  //     case 'banner':
  //       return '/admin/dashboard/banners'
  //     case 'blog':
  //       return '/admin/dashboard/blogs'
  //     case 'order':
  //       return '/admin/dashboard/orders'
  //     default:
  //       return '/admin'
  //   }
  // }

  const getLink = (type: Notification['type']) => typeLinks[type] ?? '/admin'
  const markAsRead = async (id: string) => {
    await fetch(`/api/admin/notifications/${id}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
  
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    )
  }
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='relative p-2 rounded-full hover:bg-muted focus:outline-none'>
          <Bell className='h-6 w-6 text-foreground' />
          {unreadCount > 0 && (
            <span className='absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-80 max-h-[70vh] overflow-y-auto shadow-lg'
      >
        <DropdownMenuLabel className='text-base font-semibold'>
          Notifications
        </DropdownMenuLabel>
        {loading ? (
          <DropdownMenuItem>
            <span className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2'></span>
            Loading...
          </DropdownMenuItem>
        ) : notifications.length === 0 ? (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n._id}
              className='flex flex-col items-start gap-1 py-2'
            >
              <div className='flex justify-between w-full items-center'>
                <span
                  className={cn('font-medium text-sm', !n.read && 'font-bold')}
                >
                  {n.title}
                </span>
                {!n.read && (
                  <Circle className='h-2 w-2 fill-blue-500 text-blue-500' />
                )}
              </div>
              <p className='text-xs text-muted-foreground truncate w-full'>
                {n.message}
              </p>
              <p className='text-[10px] text-muted-foreground'>
                {/* {new Date(n.date).toLocaleString()} */}
                {formatDistanceToNow(new Date(n.date), { addSuffix: true })}
              </p>

              <Link href={getLink(n.type)} className='w-full'>
                <Button size='sm' variant='outline'  onClick={() => markAsRead(n._id)} className='w-full mt-1'>
                  {n.type === 'review' && 'Go to Reviews'}
                  {n.type === 'helpRequest' && 'Go to Mails'}
                  {n.type === 'order' && 'Go to Orders'}
                  {n.type === 'product' && 'Go to Products'}
                  {n.type === 'admin' && 'Go to Admins'}
                  {n.type === 'banner' && 'Go to Banners'}
                  {n.type === 'blog' && 'Go to Blogs'}
                </Button>
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
