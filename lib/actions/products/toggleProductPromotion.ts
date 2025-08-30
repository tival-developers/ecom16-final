//🔹 Step 2: Use revalidateTag in Promotion Actions

//Now, when admin updates a product (mark/unmark Trending or Featured), we’ll trigger instant homepage cache invalidation.
"use server"

import connectToDatabase from "@/lib/db/dbConnection"
import Product from "@/lib/db/models/product.model";
import { revalidateTag } from "next/cache"

export async function toggleProductPromotion(productId: string, updates: { isTrending?: boolean; isFeatured?: boolean }) {
  await connectToDatabase

  try {
    await Product.findByIdAndUpdate(productId, updates, { new: true })

    // 👇 Invalidate homepage cache instantly
    revalidateTag("homepage-products")

    return { success: true }
  } catch (error) {
    console.error("Error updating product promotion:", error)
    return { success: false, error: error.message }
  }
}