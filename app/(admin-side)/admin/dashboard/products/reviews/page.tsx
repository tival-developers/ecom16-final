import { Metadata } from 'next'
import AdminReviewsTable from './wrapper'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'view customers reviews ',
}

const page = () => {
  return (
    <div>
      <AdminReviewsTable />
    </div>
  )
}

export default page
