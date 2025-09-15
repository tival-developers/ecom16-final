
import Admin  from '@/lib/db/models/admin'
import UpdateAdminForm from './form'

export default async function UpdateAdminPage(context: {
  params: Promise<{ id: string }>
}) {
  const { id } = await context.params // ✅ Await params
  const getAdmin = await Admin.findById(id).lean()
  const admin = JSON.parse(JSON.stringify(getAdmin))

  return (
    <div className='p-6'>
      <UpdateAdminForm admin={admin} />
    </div>
  )
}
