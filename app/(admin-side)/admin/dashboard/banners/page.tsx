import connectToDatabase from '@/lib/db/dbConnection'
import Banner from '@/lib/db/models/Banner.model'
import mongoose from 'mongoose'
import BannerList from '../components/lists/banners-list'

export default async function Home() {
  await connectToDatabase
  const BannerModel = mongoose.models.Banner || Banner
  const Banners = await BannerModel.find().lean()

  return <BannerList banners={JSON.parse(JSON.stringify(Banners))} />
}
