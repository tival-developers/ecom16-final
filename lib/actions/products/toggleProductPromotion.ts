// //🔹 Step 2: Use revalidateTag in Promotion Actions

// //Now, when admin updates a product (mark/unmark Trending or Featured), we’ll trigger instant homepage cache invalidation.
// "use server"

// import connectToDatabase from "@/lib/db/dbConnection"
// import Product from "@/lib/db/models/product.model";
// import { revalidateTag } from "next/cache"

// export async function toggleProductPromotion(productId: string, updates: { isTrending?: boolean; isFeatured?: boolean }) {
//   await connectToDatabase

//   try {
//     await Product.findByIdAndUpdate(productId, updates, { new: true })

//     // 👇 Invalidate homepage cache instantly
//     revalidateTag("homepage-products")

//     return { success: true }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return { success: false, error: error.message }
//     } 
//   }
// }

"use server"

import connectToDatabase from "@/lib/db/dbConnection"
import Product from "@/lib/db/models/product.model"
import { revalidateTag } from "next/cache"

type TogglePromotionResponse = {
  success: boolean
  error?: string
}

export async function toggleProductPromotion(
  productId: string,
  updates: { isTrending?: boolean; isFeatured?: boolean }
): Promise<TogglePromotionResponse> {
  await connectToDatabase

  try {
    await Product.findByIdAndUpdate(productId, updates, { new: true })

    // 👇 Invalidate homepage cache instantly
    revalidateTag("homepage-products")

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    // Fallback for non-Error exceptions (e.g. strings, numbers, etc.)
    return { success: false, error: "An unknown error occurred" }
  }
}
