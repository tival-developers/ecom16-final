'use server'
import connectToDatabase from '@/lib/db/dbConnection'
import { Order } from '@/lib/db/models/order'
import Product from '@/lib/db/models/product.model'

export async function getHomePageProducts() {
  await connectToDatabase

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

    const recentRaw = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
    const trendingRaw = await Product.find({ isTrending: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean()
    const featuredRaw = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    // 🔹 Normalize _id into string
    // const normalizeId = (arr: any[]) =>
    //   arr.map((doc) => ({ ...doc, _id: doc._id.toString() }))

    return {
      bestSelling: bestSelling.map((b) => ({
        ...b,
        product: { ...b.product, _id: b.product._id.toString() },
      })),
      // recent: normalizeId(recentRaw),

      recent: JSON.parse(JSON.stringify(recentRaw)),
      trending: JSON.parse(JSON.stringify(trendingRaw)),
      featured: JSON.parse(JSON.stringify(featuredRaw)),
      //trending: normalizeId(trendingRaw),
      // featured: normalizeId(featuredRaw),
    }
  } catch (err) {
    console.error('Error fetching home page products:', err)
    return { bestSelling: [], recent: [], trending: [], featured: [] }
  }
}
