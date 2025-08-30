import { SalesAreaChart } from '@/app/(admin-side)/admin/dashboard/(dashboard)/componentsDashboard/chartOverview'
import { getSalesByCategories } from '@/lib/actions/Sales'

export default async function DashboardPage() {
  const chartData = await getSalesByCategories()
  console.log('chartData', chartData)

  return (
    <div className='p-6'>
      <SalesAreaChart chartData={chartData} />
    </div>
  )
}
