'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/db/essentials/utils'
import Link from 'next/link'
import { userCreate } from '@/lib/actions/users.action'
import Providers from './providers'
import { toast } from 'sonner'
import { useTransition } from 'react'
interface FormProps extends React.ComponentProps<'div'> {
  searchParams: { callbackUrl: string | undefined }
}

export default function SignUpForm({
  className,
  searchParams,
  ...props
}: FormProps) {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const confirmPassword = String(formData.get('confirmPassword'))

    // ✅ Fix: Proper password check
    if (password !== confirmPassword) {
      toast("Passwords don't match")
      return
    }

    startTransition(async () => {
      try {
        const result = await userCreate(formData)

        if (!result) {
          throw new Error('User creation failed')
        }

        // ✅ Use entered credentials instead of relying on backend response
        await signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: searchParams.callbackUrl || '/',
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message)
          toast(error.message)
        } else {
          console.error(error)
          toast('Signup failed')
        }
      }
    })
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
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input type='email' id='email' name='email' required />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='password'>Password</Label>
                      <Input
                        type='password'
                        id='password'
                        name='password'
                        required
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='confirmPassword'>Confirm Password</Label>
                      <Input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        required
                      />
                    </div>

                    <Button
                      type='submit'
                      className='w-full'
                      disabled={isPending}
                    >
                      {isPending ? 'Creating...' : 'Create Account'}
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
                  <div className='text-center text-sm'>
                    Have an account?{' '}
                    <Link
                      href='/login'
                      className='underline underline-offset-4'
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
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
