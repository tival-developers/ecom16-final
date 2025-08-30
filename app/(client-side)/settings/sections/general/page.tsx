// src/app/settings/sections/GeneralSettings.tsx
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function GeneralSettings() {
  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: call API to save general settings
    await new Promise((res) => setTimeout(res, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            className="w-full border rounded p-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="darkMode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <Label htmlFor="darkMode">Enable Dark Mode</Label>
      </div>
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save General Settings'}
      </Button>
    </div>
  );
}
