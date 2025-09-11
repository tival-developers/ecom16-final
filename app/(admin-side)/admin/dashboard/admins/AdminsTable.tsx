// AdminsTable.tsx (client component)
'use client'

import { useState } from "react"
import { DeleteAdmin, UpdateAdmin } from "@/components/ux/editButtons"
import FilterAdmin from "./filter"
import { AdminType } from "./page"

export default function AdminsTable({ admins }: { admins: AdminType[] }) {
  const [filtered, setFiltered] = useState<AdminType[]>(admins)

  return (
    <>
      <FilterAdmin admins={admins} onFilter={setFiltered} />

      <div className="bg-white shadow rounded-lg overflow-hidden px-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-sm tracking-wider">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Created At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{admin.name}</td>
                  <td className="p-3 text-gray-700">{admin.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex gap-2">
                    <UpdateAdmin id={admin._id} />
                    <DeleteAdmin id={admin._id} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
