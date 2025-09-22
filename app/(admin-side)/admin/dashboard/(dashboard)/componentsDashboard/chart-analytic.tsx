
import { SalesAreaChart } from "./chartOverview"
import { getSalesByCategories } from "@/lib/actions/Sales"

const ChartAnalytic = async () => {
  const chartData = await getSalesByCategories()
 // console.log("Chart :", chartData)

  return (
    <div>
      <SalesAreaChart chartData={chartData} />
    </div>
  )
}

export default ChartAnalytic
