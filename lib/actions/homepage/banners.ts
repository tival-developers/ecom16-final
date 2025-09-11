'use server'

import { BannerType } from '@/components/homepage/banner'
import connectToDatabase from '@/lib/db/dbConnection'
import Banner from '@/lib/db/models/Banner.model'

//get all categories
export const getAllCategories = async () => {
  try {
    await connectToDatabase
    const banners = await Banner.find()
      .sort({ title: 1 })
      //.limit(1)
      .lean<BannerType[]>()

    return banners.map((ban) => ({
      id: ban._id.toString(),
      productId: ban.productId,
      title: ban.title,
      subtitle: ban.subtitle,
      imageUrl: ban.imageUrl,
      price: ban.price,
      buttonText: ban.buttonText,
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}
