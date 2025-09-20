import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AccountAdmin = () => {
  return (
    <div className='bg-gray-800 hover:bg-white rounded-full p-1'>
      <Link href='/admin/dashboard/account'><User className='h-6 w-6 hover:text-black' /></Link>
    </div>
  )
}

export default AccountAdmin
