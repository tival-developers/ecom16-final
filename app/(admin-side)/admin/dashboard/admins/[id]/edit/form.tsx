
'use client'

import { useState, useTransition } from 'react'
import { updateAdmin } from '@/lib/actions/admins'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

type Props = {
  admin: {
    _id: string
    name: string
    email: string
    role: string
  }
}

export default function UpdateAdminForm({ admin }: Props) {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateAdmin(formData)
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
    <Card className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Update Admin</h2>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" defaultValue={admin._id} />

        <div className="space-y-2">
          <Label>Name</Label>
          <Input name="name" defaultValue={admin.name} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" name="email" defaultValue={admin.email} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input type="password" name="password" placeholder="Leave blank to keep current" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" placeholder="Leave blank to keep current" />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select name="role" defaultValue={admin.role}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role[0]}</p>}
        </div>

        {errors._form && <p className="text-red-500 text-sm">{errors._form[0]}</p>}
        {success && <p className="text-green-600 text-sm">Admin updated!</p>}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Admin'}
        </Button>
      </form>
    </Card>
  )
}
