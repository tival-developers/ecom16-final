
import { ProductType } from '../types/product'

export function serializeProduct(product: ProductType) {
  return {
    ...product,
    _id: product._id.toString(),
    category: product.category?.toString(), // convert ObjectId → string
  }
}
