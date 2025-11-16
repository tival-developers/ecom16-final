import clsx from 'clsx'
import { User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AccountAdmin = () => {
  const pathname = usePathname()
  return (
    <div className={clsx(
      'bg-gray-800 hover:bg-white rounded-full p-1',
       {
         ' bg-white text-black': pathname === '/admin/dashboard/account',
       }
     )}>
      <Link href='/admin/dashboard/account'><User className='h-6 w-6 hover:text-black' /></Link>
    </div>
  )
}

export default AccountAdmin
