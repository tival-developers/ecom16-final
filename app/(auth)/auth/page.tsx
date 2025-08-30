
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import { SignUpForm, LoginForm } from "@/components/auth/form"

// export default function TabsDemo() {
//   return (
//     <Tabs defaultValue="login" className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
//       <TabsList className="w-full max-w-sm md:max-w-3xl">
//         <TabsTrigger value="login">Login</TabsTrigger>
//         <TabsTrigger value="sign-up">Sign up</TabsTrigger>
//       </TabsList>
//       <TabsContent value="login" className="w-full max-w-sm md:max-w-3xl">
//         <LoginForm  />
//       </TabsContent>
//       <TabsContent value="sign-up" className="w-full max-w-sm md:max-w-3xl">
//         <SignUpForm />
//       </TabsContent>
//     </Tabs>
//   )
// }
'use client'

import { SignUpForm, LoginForm } from "@/components/auth/form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function AuthTabs() {
  const [tab, setTab] = useState("login")

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10"
    >
      <TabsList className="w-full max-w-sm md:max-w-3xl">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
      </TabsList>

      <div className="relative w-full max-w-sm md:max-w-3xl min-h-[500px]">
        <AnimatePresence mode="wait">
          {tab === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <TabsContent value="login" forceMount>
                <LoginForm />
              </TabsContent>
            </motion.div>
          )}

          {tab === "sign-up" && (
            <motion.div
              key="sign-up"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <TabsContent value="sign-up" forceMount>
                <SignUpForm />
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Tabs>
  )
}
