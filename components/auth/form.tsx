'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { signInAction, signOutAction } from '@/lib/actions/auth'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/db/essentials/utils'

//providerMap is imported and contains only non-"credentials" providers.
import { providerMap } from '@/auth'
import { FcGoogle } from 'react-icons/fc'
import { FaTiktok, FaInstagram } from 'react-icons/fa'
import { Separator } from '../ui/separator'
import { useState } from 'react'
import Link from 'next/link'
import { formSchema } from '@/lib/db/essentials/zod'
import { userCreate } from '@/lib/actions/users.action'
import Providers from '@/app/(admin-side)/admin/dashboard/customers/create/providers'

const providerIcons: Record<string, JSX.Element> = {
  google: <FcGoogle />,
  tiktok: <FaTiktok />,
  instagram: <FaInstagram className=' text-pink-600' />,
}

const handleOAuthLogin = async (provider: string, callbackUrl?: string) => {
  await signInAction(provider, callbackUrl)
}

interface FormProps extends React.ComponentProps<'div'> {
  searchParams: { callbackUrl: string | undefined }
}

export function LoginForm({ className, searchParams, ...props }: FormProps) {
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(res)

    if (res?.error === 'OAUTH_NO_PASSWORD') {
      // Redirect to set-password flow
      window.location.href = `/set-password?email=${encodeURIComponent(email)}`
      return
    }

    if (res?.error) {
      setError('Invalid credentials.')
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <div className='p-6 md:p-8'>
            <form onSubmit={handleLogin}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
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
              <div className='grid grid-cols-3 gap-4'>
                {providerMap.map((provider) => (
                  <Button
                    key={provider.id}
                    onClick={() =>
                      handleOAuthLogin(provider.id, searchParams?.callbackUrl)
                    }
                    variant='outline'
                    className='w-full items-center'
                  >
                    {providerIcons[provider.id]}
                    <span className='sr-only'>{provider.name}</span>
                  </Button>
                ))}
              </div>
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

//signup
export default function SignUpForm({ className, ...props }: FormProps) {
  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const values = {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('confirmPassword')),
    }

    const result = formSchema.safeParse(values)

    if (!result.success) {
      const newErrors: { [k: string]: string } = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0]] = err.message
      })
      setErrors(newErrors)
      return
    }

    setErrors({})
    await userCreate(formData)
  }
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card className='overflow-hidden'>
            <CardContent className='grid p-0 md:grid-cols-2'>
              <div className='p-6 md:p-8'>
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center text-center'>
                      <h1 className='text-2xl font-bold'>Hello Client</h1>
                      <p className='text-balance text-muted-foreground'>
                        Create Your account with us
                      </p>
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input type='text' id='name' name='name' required />
                      {errors.name && (
                        <p className='text-red-500 text-sm'>{errors.name}</p>
                      )}
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='m@example.com'
                        required
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email}</p>
                      )}
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='password'>Password</Label>
                      <Input
                        type='password'
                        id='password'
                        name='password'
                        required
                      />
                      {errors.password && (
                        <p className='text-red-500 text-sm'>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='confirmPassword'>Confirm Password</Label>
                      <Input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        required
                      />
                      {errors.confirmPassword && (
                        <p className='text-red-500 text-sm'>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button type='submit' className='w-full'>
                      Create Account
                    </Button>

                    <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                      <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                        Or continue with
                      </span>
                    </div>
                  </div>
                </form>

                {/* OAuth Providers */}
                <Providers searchParams={props.searchParams} />
              </div>

              <div className='relative hidden md:flex bg-yellow-600 text-white font-bold text-3xl items-center justify-center p-4'>
                <h3 className='text-center'>
                  Can&apos;t wait to have you onboard
                </h3>
              </div>
            </CardContent>
          </Card>

          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            By clicking continue, you agree to our{' '}
            <Link href='#'>Terms of Service</Link> and{' '}
            <Link href='#'>Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  )
}

//sign-out
export function SignOut() {
  return (
    <Card className='bg-slate-50'>
      <CardHeader>
        <h3 className='text-2xl font-bold text-yellow-600 p-4'>Logout</h3>
      </CardHeader>
      <Separator />
      <CardContent className='p-3'>
        <h5 className='text-2xl font-medium'>
          Are you sure you want to sign out ?
        </h5>
      </CardContent>
      <CardFooter className='p-4'>
        <form action={signOutAction}>
          <Button type='submit'>Sign out</Button>
        </form>
      </CardFooter>
    </Card>
  )
}
