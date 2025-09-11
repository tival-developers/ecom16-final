
'use client'
import { useState, useMemo, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { AdminType } from './page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function FilterAdmin({
  admins,
  onFilter,
}: {
  admins: AdminType[]
  onFilter: (data: AdminType[]) => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'developer' | 'manager' | 'sales'
  >('all')

  const filteredAdmins = useMemo(() => {
    const lowerSearch = searchQuery.toLowerCase()
    return admins.filter((admin) => {
      if (lowerSearch && !admin.name.toLowerCase().includes(lowerSearch)) {
        return false
      }
      if (statusFilter !== 'all' && admin.role !== statusFilter) {
        return false
      }
      return true
    })
  }, [admins, searchQuery, statusFilter])

  // send filtered data up to parent
  useEffect(() => {
    onFilter(filteredAdmins)
  }, [filteredAdmins, onFilter])

  return (
    <div className="bg-slate-100 sticky top-0 z-50 p-4 sm:p-6 border-b">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-lg sm:text-xl font-semibold">Admins</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Link href="/admin/dashboard/admins/create" className="w-full sm:w-auto">
            <Button className="gap-2 w-full sm:w-auto">
              <Plus size={16} /> Add Admin
            </Button>
          </Link>
        </div>
      </div>

      <Tabs
        value={statusFilter}
        onValueChange={(val) =>
          setStatusFilter(val as 'all' | 'developer' | 'manager' | 'sales')
        }
      >
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
          <TabsTrigger value="manager">Manager</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
