import Product from '@/lib/db/models/product.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { ProductType } from '@/lib/types/product'
import ProductFormWrapper from './form-wrapper'






export default async function Page(context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params

  await connectToDatabase
  const product = await Product.findById(id).lean<ProductType>()
  if (!product) return <div>Product not found</div>

  return <ProductFormWrapper id={id} product={product} />
}
