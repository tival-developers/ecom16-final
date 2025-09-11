'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function AccountSettings() {
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchUserSettings = async () => {
      const res = await fetch('/api/user/settings')
      const data = await res.json()
      setEmail(data.email)
    }
    fetchUserSettings()
  }, [])

  const handleUpdate = async () => {
    try {
      setIsUpdating(true)
  
      const res = await fetch('/api/settings/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
        }),
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
  
      toast('Success', {
        description: data.message,
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      toast('Error', {
        description: message,
      })
    } finally {
      setIsUpdating(false)
    }
  }
 

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='you@example.com'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='currentPassword'>Current Password</Label>
          <Input
            id='currentPassword'
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder='••••••••'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='newPassword'>New Password</Label>
          <Input
            id='newPassword'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='••••••••'
          />
        </div>
      </div>

      <Button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Account Settings'}
      </Button>
    </div>
  )
}
