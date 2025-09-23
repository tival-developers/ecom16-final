// "use client"
// //providerMap is imported and contains only non-"credentials" providers.
// import { signInAction} from '@/lib/actions/auth'
// import { providerMap } from '@/auth'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { FaTiktok, FaInstagram } from 'react-icons/fa'
// import { FcGoogle } from 'react-icons/fc'

// const providerIcons: Record<string, React.ReactNode> = {
//   google: <FcGoogle />,
//   tiktok: <FaTiktok />,
//   instagram: <FaInstagram className=' text-pink-600' />,
// }
// const handleOAuthLogin = async (provider: string, callbackUrl?: string) => {
//   await signInAction(provider, callbackUrl)
// }

// interface FormProps extends React.ComponentProps<'div'> {
//     searchParams: { callbackUrl: string | undefined }
//   }
// const Providers = ({searchParams}: FormProps) => {
//   return (
//     <div>
//       <div className='flex flex-col gap-6'>
//         <div className='grid grid-cols-3 gap-4'>
//           {providerMap.map((provider) => (
//             <Button
//               key={provider.id}
//               onClick={() =>
//                 handleOAuthLogin(provider.id, searchParams?.callbackUrl)
//               }
//               variant='outline'
//               className='w-full items-center'
//             >
//               {providerIcons[provider.id]}
//               <span className='sr-only'>{provider.name}</span>
//             </Button>
//           ))}
//         </div>
//         <div className='text-center text-sm'>
//           Have an account?{' '}
//           <Link href='/login' className='underline underline-offset-4'>
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Providers

'use client'
//providerMap is imported and contains only non-"credentials" providers.
import { providerMap } from '@/auth'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FaTiktok, FaInstagram } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
const providerIcons: Record<string, React.ReactNode> = {
  google: <FcGoogle />,
  tiktok: <FaTiktok />,
  instagram: <FaInstagram className=' text-pink-600' />,
}

interface FormProps extends React.ComponentProps<'div'> {
  searchParams: { callbackUrl: string | undefined }
}
const Providers = ({ searchParams }: FormProps) => {
  const [error, setError] = useState('')
  const handleSocialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const res = await signIn('provider', {
      redirect: false,
      callbackUrl: searchParams.callbackUrl || '/',
    })

    if (res?.error) {
      setError(
        'error occurred while logging in. Kindly use another login method.'
      )
    } else if (res?.url) {
      window.location.href = res.url
    } else {
      window.location.href = searchParams.callbackUrl || '/'
    }
  }
  return (
    <div className='grid grid-cols-3 gap-4'>
      {providerMap.map((provider) => (
        <Button
          key={provider.id}
          onClick={() => handleSocialLogin}
          variant='outline'
          className='w-full items-center'
        >
          {providerIcons[provider.id]}
          <span className='sr-only'>{provider.name}</span>
        </Button>
      ))}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Providers
