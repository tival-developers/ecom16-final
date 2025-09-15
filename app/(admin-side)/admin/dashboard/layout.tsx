// import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
// import { SiteHeader } from './components/site-header'
// import { AppSidebar } from './components/app-sidebar'

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className='[--header-height:calc(theme(spacing.14))]'>
//       <SidebarProvider className='flex flex-col '>
//         <SiteHeader />
//         <div className='flex flex-1'>
//           <AppSidebar />
//           <SidebarInset>
//             <div className='flex-1  mb-2.5'>{children}</div>
//           </SidebarInset>
//         </div>
//       </SidebarProvider>
//     </div>
//   )
// }
// app/admin/layout.tsx
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "./components/site-header"
import { AppSidebar } from "./components/app-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 🔒 Get the current session
  const session = await auth()

  // 🔒 If no session → redirect to login
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/dashboard")
  }

  // 🔒 If user has no admin role → redirect (or show 403)
  const allowedRoles = ["superadmin", "manager", "sales", "developer"]
  if (!allowedRoles.includes(session.user.role || "")) {
    redirect("/") // or redirect("/403") if you have a forbidden page
  }

  return (
    <div className='[--header-height:calc(theme(spacing.14))]'>
      <SidebarProvider className='flex flex-col '>
        <SiteHeader />
        <div className='flex flex-1'>
          <AppSidebar />
          <SidebarInset>
            <div className='flex-1 mb-2.5'>{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
