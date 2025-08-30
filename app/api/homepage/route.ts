import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"
import { Order } from "@/lib/db/models/order"
import Product from "@/lib/db/models/product.model"

export async function GET() {
  await connectToDatabase

  try {
    const bestSelling = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $project: { _id: 0, totalSold: 1, product: 1 } },
    ])

    const recent = await Product.find().sort({ createdAt: -1 }).limit(6).lean()
    const trending = await Product.find({ isTrending: true }).sort({ createdAt: -1 }).limit(6).lean()
    const featured = await Product.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(6).lean()

    return NextResponse.json({ bestSelling, recent, trending, featured })
  } catch (err) {
    console.error("Error fetching home page products:", err)
    return NextResponse.json(
      { bestSelling: [], recent: [], trending: [], featured: [] },
      { status: 500 }
    )
  }
}

export const dynamic = "force-static"
export const revalidate = 60
export const fetchCache = "default-cache"
export const tags = ["homepage-products"]
