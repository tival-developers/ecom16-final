// AdminsPage.tsx (server component)
import { getAdmins } from "@/lib/actions/admins"
import AdminsTable from "./AdminsTable"


export type AdminType = {
  _id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export default async function AdminsPage() {
  const fetchAdmins = await getAdmins()
  const admins = JSON.parse(JSON.stringify(fetchAdmins)) as AdminType[]

  return (
    <div className="max-w-7xl mx-0.5 pt-0">
      <AdminsTable admins={admins} />
    </div>
  )
}
