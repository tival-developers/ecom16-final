'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import Product from '@/lib/db/models/product.model'

export async function getHomePageProducts() {
  await connectToDatabase()

  try {
    const bestSelling = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $project: { _id: 0, totalSold: 1, product: 1 } },
    ])
    //console.log("bestttttttttt", bestsellingRaw)
    const recentRaw = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
    const trendingRaw = await Product.find({ isTrending: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
    const featuredRaw = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()

    return {
      bestSelling: bestSelling.map((b) => ({
        ...b,
        product: { ...b.product, _id: b.product._id.toString() },
      })),
    
      recent: JSON.parse(JSON.stringify(recentRaw)),
      trending: JSON.parse(JSON.stringify(trendingRaw)),
      featured: JSON.parse(JSON.stringify(featuredRaw)),
    }
  } catch (err) {
    console.error('Error fetching home page products:', err)
    return { bestSelling: [], recent: [], trending: [], featured: [] }
  }
}
