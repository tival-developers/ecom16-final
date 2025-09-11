import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from './components/site-header'
import { AppSidebar } from './components/app-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='[--header-height:calc(theme(spacing.14))]'>
      <SidebarProvider className='flex flex-col '>
        <SiteHeader />
        <div className='flex flex-1'>
          <AppSidebar />
          <SidebarInset>
            <div className='flex-1  mb-2.5'>{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
