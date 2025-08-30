// src/app/settings/sections/NotificationSettings.tsx
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    // TODO: call API to save notification preferences
    await new Promise((res) => setTimeout(res, 1000));
    setIsApplying(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="emailNotif"
          checked={emailNotif}
          onCheckedChange={setEmailNotif}
        />
        <Label htmlFor="emailNotif">Email Notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="smsNotif" checked={smsNotif} onCheckedChange={setSmsNotif} />
        <Label htmlFor="smsNotif">SMS Notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="pushNotif" checked={pushNotif} onCheckedChange={setPushNotif} />
        <Label htmlFor="pushNotif">Push Notifications</Label>
      </div>
      <Button onClick={handleApply} disabled={isApplying}>
        {isApplying ? 'Applying...' : 'Save Notification Settings'}
      </Button>
    </div>
  );
}