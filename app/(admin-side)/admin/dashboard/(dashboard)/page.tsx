// import { Metadata } from 'next'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { RecentSales } from './componentsDashboard/recent-sales'
// import { fetchCardsData } from '@/lib/actions/getAdminCardsData'
// import ChartAnalytic from './componentsDashboard/chart-analytic'
// import Price from '@/lib/utils/format'


// // Static metadata
// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Admin dashboard',
// }

// const dashboardData = {
//   tabs: [{ value: 'overview', label: 'Overview' }],
// }
// const { bestSelling, totalSales, totalRevenue } = await fetchCardsData()

// export default function DashboardPage() {
//   return (
//     <>
     
//       <div className='hidden flex-col md:flex mx-2'>
//         <div className='flex-1 space-y-4 p-8 pt-6'>
//           <div className='flex items-center justify-between space-y-2'>
//             <h2 className='text-2xl font-medium '>Dashboard</h2>
            
//             </div>
//           </div>

//           <Tabs defaultValue='overview' className='space-y-4'>
//             <TabsList>
//               {dashboardData.tabs.map((tab) => (
//                 <TabsTrigger key={tab.value} value={tab.value}>
//                   {tab.label}
//                 </TabsTrigger>
//               ))}
//             </TabsList>

//             <TabsContent value='overview' className='space-y-4'>
//               {/* Stats Cards */}
//               <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
//                 <Card className='p-4 bg-gray-800 text-white'>
//                   <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                     <CardTitle className='text-sm font-medium'>
//                       Total Revenue
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='text-2xl font-bold'><Price amount={totalRevenue} /></div>
//                   </CardContent>
//                 </Card>
//                 {/* Stats bestselling Cards */}

//                 {bestSelling.map((item) => (
//                   <Card
//                     key={item.product._id}
//                     className='p-4 bg-gray-800 text-white'
//                   >
//                     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                       <CardTitle className='text-sm font-medium'>
//                         BestSelling Product
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className='text-2xl font-bold'>
//                         {item.product.name}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 <Card className='p-4 bg-gray-800 text-white'>
//                   <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                     <CardTitle className='text-sm font-medium'>
//                       Total Sales
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className='text-2xl font-bold'>{totalSales}</div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Overview & Recent Sales */}
//               <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
//                 <div className='col-span-4'>
//                   {/*chart data*/}
//                   <ChartAnalytic />
//                 </div>
//                 {/*recent sales */}
//                 <RecentSales />
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
      
//     </>
//   )
// }
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RecentSales } from './componentsDashboard/recent-sales'
import { fetchCardsData } from '@/lib/actions/getAdminCardsData'
import ChartAnalytic from './componentsDashboard/chart-analytic'
import Price from '@/lib/utils/format'

// Static metadata
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard',
}

const dashboardData = {
  tabs: [{ value: 'overview', label: 'Overview' }],
}

const { bestSelling, totalSales, totalRevenue } = await fetchCardsData()

export default function DashboardPage() {
  return (
    <div className="flex flex-col mx-2 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
        <h2 className="text-xl md:text-2xl font-medium">Dashboard</h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex flex-wrap">
          {dashboardData.tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 bg-gray-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Price amount={totalRevenue} />
                </div>
              </CardContent>
            </Card>

            {bestSelling.map((item) => (
              <Card key={item.product._id} className="p-4 bg-gray-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Best Selling Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.product.name}</div>
                </CardContent>
              </Card>
            ))}

            <Card className="p-4 bg-gray-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSales}</div>
              </CardContent>
            </Card>
          </div>

          {/* Overview & Recent Sales */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <ChartAnalytic />
            </div>
            <div className="lg:col-span-3">
              <RecentSales />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
