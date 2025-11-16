'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/db/essentials/utils'
// import { providerMap } from '@/auth'
// import { FcGoogle } from 'react-icons/fc'
// import { FaTiktok, FaInstagram } from 'react-icons/fa'
import { useState } from 'react'
import Link from 'next/link'
import Providers from './providers'
import { ChevronLeft } from 'lucide-react'

// const providerIcons: Record<string, React.ReactNode> = {
//   google: <FcGoogle />,
//   tiktok: <FaTiktok />,
//   instagram: <FaInstagram className=' text-pink-600' />,
// }


interface FormProps extends React.ComponentProps<'div'> {
  searchParams: { callbackUrl: string | undefined }
}

export function LoginForm({ className, searchParams, ...props }: FormProps) {
  const [error, setError] = useState('')

  const handleCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: searchParams.callbackUrl || '/',
    })
    //console.log(res)

    if (res?.error === 'OAUTH_NO_PASSWORD') {
      // Redirect to set-password flow
      window.location.href = `/set-password?email=${encodeURIComponent(email)}`
      return
    }

    if (res?.error) {
      setError('Invalid credentials.')
    } else if (res?.url) {
      window.location.href = res.url
    } else {
      window.location.href = searchParams.callbackUrl || '/'
    }
  }
  // /handle social logins
  // const handleSocialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setError('')
  //   const res = await signIn('provider', {
  //     redirect: false,
  //     callbackUrl: searchParams.callbackUrl || '/',
  //   })

  //   if (res?.error) {
  //     setError(
  //       'error occurred while logging in. Kindly use another login method.'
  //     )
  //   } else if (res?.url) {
  //     window.location.href = res.url
  //   } else {
  //     window.location.href = searchParams.callbackUrl || '/'
  //   }
  // }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <form onSubmit={handleCredentialLogin}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <div className='flex justify-start w-full'>
                    <Button variant={"link"} className='flex gap-1 items-center text-blue-600'>
                      <ChevronLeft />
                      <Link href="/"> Return to Homepage</Link>
                     
                    </Button>
                  </div>
                  <h1 className='text-2xl font-bold'>Welcome back</h1>
                  <p className='text-balance text-muted-foreground'>
                    Login to your Stream account
                  </p>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='m@example.com'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <Link
                      href='#'
                      className='ml-auto text-sm underline-offset-2 hover:underline'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    required
                  />
                  {error && <p className='text-red-500'>{error}</p>}
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
                <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                  <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                    Or continue with
                  </span>
                </div>
              </div>
            </form>
            {/* OAuth Providers */}
            <div className='flex flex-col gap-6'>
            <Providers searchParams={searchParams} />
              {/* <div className='grid grid-cols-3 gap-4'>
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
              </div> */}

              <div className='text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          <div className='relative hidden md:flex bg-yellow-600 text-white font-bold text-3xl items-center justify-center p-4'>
            <h3 className='text-center'>Can&apos;t wait to have you back</h3>
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
        By clicking continue, you agree to our{' '}
        <Link href='#'>Terms of Service</Link> and{' '}
        <Link href='#'>Privacy Policy</Link>.
      </div>
    </div>
  )
}
