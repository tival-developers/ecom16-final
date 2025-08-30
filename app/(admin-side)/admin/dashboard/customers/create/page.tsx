'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/db/essentials/utils'
import Link from 'next/link'
import { userCreate } from '@/lib/actions/users.action'
import Providers from './providers'

import { useState } from 'react'
import { z } from 'zod'

const formSchema = z
  .object({
    name: z.string().min(3, 'Must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password too short'),
    confirmPassword: z.string().min(8, 'Confirm Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

  interface FormProps extends React.ComponentProps<'div'> {
    searchParams: { callbackUrl: string | undefined }
  }

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
// 'use client'

// import { useState } from 'react'
// import { z } from 'zod'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Card, CardContent } from '@/components/ui/card'
// import { userCreate } from '@/lib/actions/users.action'

// const formSchema = z.object({
//   name: z.string().min(3, 'Must be at least 3 characters'),
//   email: z.string().email('Invalid email'),
//   password: z.string().min(8, 'Password too short'),
//   confirmPassword: z.string().min(8, 'Confirm Password too short'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords do not match',
//   path: ['confirmPassword'],
// })

// export default function SignUpForm() {
//   const [errors, setErrors] = useState<{ [k: string]: string }>({})

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)

//     const values = {
//       name: String(formData.get('name')),
//       email: String(formData.get('email')),
//       password: String(formData.get('password')),
//       confirmPassword: String(formData.get('confirmPassword')),
//     }

//     const result = formSchema.safeParse(values)

//     if (!result.success) {
//       const newErrors: { [k: string]: string } = {}
//       result.error.errors.forEach((err) => {
//         if (err.path[0]) newErrors[err.path[0]] = err.message
//       })
//       setErrors(newErrors)
//       return
//     }

//     setErrors({})
//     await userCreate(formData)
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <Card>
//         <CardContent className="p-6">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <div>
//               <Label>Name</Label>
//               <Input name="name" type="text" required />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input name="email" type="email" required />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>

//             <div>
//               <Label>Password</Label>
//               <Input name="password" type="password" required />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             <div>
//               <Label>Confirm Password</Label>
//               <Input name="confirmPassword" type="password" required />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//               )}
//             </div>

//             <Button type="submit">Create Account</Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
