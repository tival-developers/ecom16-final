
'use client'

import { createAdmin } from '@/lib/actions/admins'
import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function CreateAdminPage() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // ✅ Controlled state
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await createAdmin(formData)
      if ('errors' in res) {
        setErrors(res.errors)
        setSuccess(false)
      } else {
        setErrors({})
        setSuccess(true)
        router.push('/admin/dashboard/admins')
      }
    })
  }

  return (
    <Card className='max-w-lg mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Create Admin</h1>
      <form action={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label>Name</Label>
          <Input
            name='name'
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name[0]}</p>}
        </div>

        <div className='space-y-2'>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email[0]}</p>}
        </div>

        <div className='space-y-2'>
          <Label>Password</Label>
          <Input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password[0]}</p>}
        </div>

        <div className='space-y-2'>
          <Label>Confirm Password</Label>
          <Input
            type='password'
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm'>{errors.confirmPassword[0]}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>Role</Label>
          <select
            name='role'
            value={form.role}
            onChange={handleChange}
            className='w-full border rounded p-2'
          >
            <option value='' disabled>Select role</option>
            <option value='manager'>Manager</option>
            <option value='developer'>Developer</option>
            <option value='sales'>Sales</option>
          </select>
          {errors.role && <p className='text-red-500 text-sm'>{errors.role[0]}</p>}
        </div>

        {errors._form && (
          <p className='text-red-500 text-sm'>{errors._form[0]}</p>
        )}
        {success && <p className='text-green-600 text-sm'>Admin created!</p>}

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Admin'}
        </Button>
      </form>
    </Card>
  )
}
