
'use client'

import { useEffect, useState } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaTiktok, FaInstagram } from 'react-icons/fa'

interface ProvidersProps {
  searchParams: { callbackUrl?: string }
}

const providerIcons: Record<string, React.ReactNode> = {
  google: <FcGoogle className='text-xl' />,
  tiktok: <FaTiktok className='text-xl text-black' />,
  instagram: <FaInstagram className='text-xl text-pink-600' />,
}

export default function Providers({ searchParams }: ProvidersProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [providers, setProviders] = useState<any[]>([])

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      if (res) {
        const mapped = Object.values(res)
          .map((p) => ({ id: p.id, name: p.name }))
          .filter((p) => p.id !== 'credentials')
        setProviders(mapped)
      }
    }

    fetchProviders()
  }, [])

  if (providers.length === 0) return null

  return (
    <div className='grid grid-cols-3 gap-4'>
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant='outline'
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: searchParams.callbackUrl || '/',
            })
          }
          className='flex justify-center items-center gap-2'
        >
          {providerIcons[provider.id] ?? provider.name[0]}
          <span className='sr-only'>{provider.name}</span>
        </Button>
      ))}
    </div>
  )
}
