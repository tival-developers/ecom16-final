
import Banner from '@/lib/db/models/Banner.model'
import UpdateBannerForm from './form'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Edit Banner ',
  description: ' update banner details ',
}

export default async function EditBannerPage(context: {
  params: Promise<{ id: string }>
}) {
  const { id } = await context.params // ✅ Await params
  const getBanner = await Banner.findById(id).lean()
  const banner = JSON.parse(JSON.stringify(getBanner))

  return (
    <div className='p-6'>
      <UpdateBannerForm banner={banner} />
    </div>
  )
}
