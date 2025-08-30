"use client"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import CompanyLogo from "@/components/shared/Brand-logo"

const data = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 800 },
  { name: "Wed", sales: 1600 },
  { name: "Thu", sales: 900 },
  { name: "Fri", sales: 2000 },
  { name: "Sat", sales: 1400 },
  { name: "Sun", sales: 1800 },
]

export default function AdminMobilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Top Nav */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="absolute -top-[16px] right-[5px] p-1.5">
        <h2 className="">Admin Dashboard</h2>
      </div>
        <div className="flex items-center gap-2">
          <CompanyLogo />
          
        </div>
        <div className="flex-1 px-2">
          <Input type="text" placeholder="Search..." className="h-8 text-sm" />
        </div>
        <User className="w-6 h-6 text-gray-700" />
      </header>
      

      {/* Stats Boxes */}
      <main className="p-4 space-y-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="rounded-2xl shadow-sm p-3.5">
            <CardHeader>
              <CardTitle className="text-sm">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">$12,500</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm p-3.5">
            <CardHeader>
              <CardTitle className="text-sm ">Bestselling Product</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Wireless Headphones</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm p-3.5">
            <CardHeader>
              <CardTitle className="text-sm">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">32</p>
            </CardContent>
          </Card>
        </div>

        {/* Business Performance Chart */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">Business Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}