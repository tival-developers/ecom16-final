'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <p className='text-center mt-10'>Loading...</p>
  }

  const user = session?.user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Customer',
    image: '',
  }

  return (
    <div className='flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <Card className='w-full max-w-md shadow-lg rounded-2xl p-2'>
        <CardHeader className='flex flex-col items-center text-center p-2'>
          <Avatar className='h-20 w-20 mb-4'>
            <AvatarImage src={user.image || undefined} alt='user' />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <CardTitle className='text-2xl font-semibold'>{user.name}</CardTitle>
          <p className='text-sm text-gray-500'>{user.email}</p>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <span className='px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700'>
            {user.role}
          </span>
        </CardContent>
        <div>
          
            <Button variant={'destructive'} className='text-sm w-full'>
             <Link href='/api/auth/signout?callbackUrl=/'> Logout</Link>
            </Button>
          
        </div>
      </Card>
    </div>
  )
}
