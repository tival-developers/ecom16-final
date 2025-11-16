'use client'
import { cn } from '@/lib/db/essentials/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href='/admin/dashboard'
        className={clsx(
          'text-lg font-medium transition-colors  hover:underline rounded-xl p-1.5',
          {
            ' text-blue-600  hover:text-white': pathname === '/admin/dashboard',
          }
        )}
      >
        Dashboard
      </Link>
      <Link
        href='/admin/dashboard/customers'
        className={clsx(
          'text-lg font-medium transition-colors  hover:underline rounded-xl p-1.5',
          {
            ' text-blue-600  hover:text-blue-600':
              pathname === '/admin/dashboard/customers',
          }
        )}
      >
        Customers
      </Link>
      <Link
        href='/admin/dashboard/products'
        className={clsx(
          'text-lg font-medium transition-colors  hover:underline rounded-xl p-1.5',
          {
            ' text-blue-600  hover:text-blue-600':
              pathname === '/admin/dashboard/products',
          }
        )}
      >
        Products
      </Link>
      <Link
        href='/admin/dashboard/orders'
        className={clsx(
          'text-lg font-medium transition-colors  hover:underline rounded-xl p-1.5',
          {
            ' text-blue-600  hover:text-blue-600':
              pathname === '/admin/dashboard/orders',
          }
        )}
      >
        Orders
      </Link>
    </nav>
  )
}
