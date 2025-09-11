// src/app/settings/sections/GeneralSettings.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function GeneralSettings() {
  const [fullName, setFullName] = useState('')
  const [language, setLanguage] = useState('en')
  const [darkMode, setDarkMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/settings/general', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update')

      toast('Settings saved', {
        description: 'Your general settings have been updated successfully.',
      })
    } catch (err: unknown) {
      console.log(err)
      toast( "Settings not saved",{
        description: "Your general settings failed to update.",
      });
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className='shadow-sm p-5'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          General Settings
        </CardTitle>
        <p className='text-sm text-muted-foreground'>
          Manage your profile details, language, and display preferences.
        </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Full Name */}
          <div>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Your full name'
              className='mt-2'
            />
          </div>

          {/* Language */}
          <div>
            <Label htmlFor='language'>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className='w-full mt-2'>
                <SelectValue placeholder='Select language' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='en'>English</SelectItem>
                <SelectItem value='es'>Español</SelectItem>
                <SelectItem value='fr'>Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dark Mode */}
        <div className='flex items-center space-x-3'>
          <Switch
            id='darkMode'
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Label htmlFor='darkMode'>Enable Dark Mode</Label>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={isSaving} className='w-fit'>
          {isSaving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isSaving ? 'Saving...' : 'Save General Settings'}
        </Button>
      </CardContent>
    </Card>
  )
}
