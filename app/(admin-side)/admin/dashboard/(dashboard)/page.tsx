import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDateRangePicker } from './componentsDashboard/date-range-picker'
import { Overview } from './componentsDashboard/overview'
import { RecentSales } from './componentsDashboard/recent-sales'
import AdminMobilePage from './componentsDashboard/mobile-admin'

// Static metadata
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dynamic dashboard example',
}

//const cardsData = await fetchCardsData()

// Example dashboard data (can come from API)
const dashboardData = {
  tabs: [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'notifications', label: 'Notifications' },
  ],
  // cards: [
  //   {
  //     title: 'Total Revenue',
  //     value: '$45,231.89',
  //     change: '+20.1% from last month',
  //     icon: (
  //       <svg
  //         xmlns='http://www.w3.org/2000/svg'
  //         viewBox='0 0 24 24'
  //         fill='none'
  //         stroke='currentColor'
  //         strokeLinecap='round'
  //         strokeLinejoin='round'
  //         strokeWidth='2'
  //         className='h-4 w-4 text-muted-foreground'
  //       >
  //         <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
  //       </svg>
  //     ),
  //   },
  //   {
  //     title: 'Sales',
  //     value: '+12,234',
  //     change: '+19% from last month',
  //     icon: (
  //       <svg
  //         xmlns='http://www.w3.org/2000/svg'
  //         viewBox='0 0 24 24'
  //         fill='none'
  //         stroke='currentColor'
  //         strokeLinecap='round'
  //         strokeLinejoin='round'
  //         strokeWidth='2'
  //         className='h-4 w-4 text-muted-foreground'
  //       >
  //         <rect width='20' height='14' x='2' y='5' rx='2' />
  //         <path d='M2 10h20' />
  //       </svg>
  //     ),
  //   },
  //   {
  //     title: 'Pending Orders',
  //     value: '+2350',
  //     change: '+180.1% from last month',
  //     icon: (
  //       <svg
  //         xmlns='http://www.w3.org/2000/svg'
  //         viewBox='0 0 24 24'
  //         fill='none'
  //         stroke='currentColor'
  //         strokeLinecap='round'
  //         strokeLinejoin='round'
  //         strokeWidth='2'
  //         className='h-4 w-4 text-muted-foreground'
  //       >
  //         <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
  //         <circle cx='9' cy='7' r='4' />
  //         <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
  //       </svg>
  //     ),
  //   },

  //   {
  //     title: 'Notifications',
  //     value: '+573',
  //     change: '+201 since last hour',
  //     icon: (
  //       <svg
  //         xmlns='http://www.w3.org/2000/svg'
  //         viewBox='0 0 24 24'
  //         fill='none'
  //         stroke='currentColor'
  //         strokeLinecap='round'
  //         strokeLinejoin='round'
  //         strokeWidth='2'
  //         className='h-4 w-4 text-muted-foreground'
  //       >
  //         <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
  //       </svg>
  //     ),
  //   },
  // ],
}

export default function DashboardPage() {
  return (
    <>
      {/* Mobile layout */}
      <div className='md:hidden'>
        <AdminMobilePage />
      </div>

      {/* Desktop layout */}
      <div className='hidden flex-col md:flex'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
            <div className='flex items-center space-x-2'>
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>

          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              {dashboardData.tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value='overview' className='space-y-4'>
              {/* Stats Cards */}
              {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {cardsData.map((cardData, i) => (
                  <Card key={i} className='p-4 bg-gray-800 text-white'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                      <CardTitle className='text-sm font-medium'>
                        {cardData.title}
                      </CardTitle>
                      {cardData.icon}
                    </CardHeader>
                    <CardContent>
                      <div className='text-2xl font-bold'>{cardData.value}</div>
                      <p className='text-xs text-muted-foreground'>
                        {cardData.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div> */}

              {/* Overview & Recent Sales */}
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='col-span-4'>
                  <CardHeader>
                    <CardTitle className='p-2'>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                {/*recent sales */}
                <RecentSales />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
