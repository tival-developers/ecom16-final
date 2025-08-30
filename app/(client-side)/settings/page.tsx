"use client";
import { useState, Suspense, useTransition } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";




// Dynamically import heavy sections
const GeneralSettings = dynamic(() => import("./sections/general/page"), {
  suspense: true,
});
const AccountSettings = dynamic(() => import("./sections/account/page"), {
  suspense: true,
});
const NotificationSettings = dynamic(() => import("./sections/notifications/page"), {
  suspense: true,
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isPending, startTransition] = useTransition();

  function handleTabChange(value: string) {
    startTransition(() => {
      setActiveTab(value);
    });
  }

  return (
    <div className="container mx-auto p-6">
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Suspense fallback={<div>Loading general settings...</div>}>
                <GeneralSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="account">
              <Suspense fallback={<div>Loading account settings...</div>}>
                <AccountSettings />
              </Suspense>
            </TabsContent>

            <TabsContent value="notifications">
              <Suspense fallback={<div>Loading notification settings...</div>}>
                <NotificationSettings />
              </Suspense>
            </TabsContent>
          </Tabs>
          {isPending && <div className="mt-2 text-sm text-gray-500">Updating...</div>}
        </CardContent>
      </Card>
    </div>
  );
}
