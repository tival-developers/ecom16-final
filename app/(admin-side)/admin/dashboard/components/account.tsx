import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AccountAdmin = () => {
  return (
    <div>
      <Link href='/admin/dashboard/account'><User className='h-6 w-6' /></Link>
    </div>
  )
}

export default AccountAdmin
