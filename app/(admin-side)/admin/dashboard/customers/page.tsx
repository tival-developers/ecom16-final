import User from '@/lib/db/models/user.model'
import connectToDatabase from '@/lib/db/dbConnection'
import mongoose from 'mongoose'
import { UpdateCustomer } from '@/components/ux/editButtons'
import { Separator } from '@/components/ui/separator'
import { UserType } from '@/lib/types/user'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Customers ',
  description: ' View your customers ',
}


export default async function CustomersTable() {
  await connectToDatabase
  const UserModel = mongoose.models.User || User
  const getUsers = await UserModel.find()
  const users = JSON.parse(JSON.stringify(getUsers))

  return (
    <div>
      <h1 className='text-3xl font-bold mb-2 text-amber-800  text-center'>
        Our Customers
      </h1>
      <div className='mb-7'>
        <Separator />
      </div>

      <div className='mx-2.5 overflow-x-auto'>
        <table className='min-w-full border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-4 py-2 text-left'>Name</th>
              <th className='border px-4 py-2 text-left'>Email</th>
              <th className='border px-4 py-2 text-left hidden sm:table-cell'>
                User id
              </th>
              <th className='border px-4 py-2 text-left hidden sm:table-cell'>
                No of Orders
              </th>
              <th className='border px-4 py-2 text-left'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserType) => (
              <tr key={user._id} className='hover:bg-gray-50'>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='border px-4 py-2'>{user.email}</td>
                <td className='border px-4 py-2 hidden sm:table-cell'>
                  {user._id}
                </td>
                <td className='border px-4 py-2 hidden sm:table-cell'>0</td>
                <td className='border px-4 py-2'>
                  <div className='flex justify-end gap-2 whitespace-nowrap'>
                    <UpdateCustomer id={user._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
