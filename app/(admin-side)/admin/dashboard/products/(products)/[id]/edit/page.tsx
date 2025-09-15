import Product from '@/lib/db/models/product.model'
import { ProductType } from '@/lib/types/product'
import UpdateProductForm from './form'

export default async function EditProductPage(context: {
  params: Promise<{ id: string }>
}) {
  const { id } = await context.params // ✅ Await params
  const fetchProduct = await Product.findById(id).lean<ProductType>()
  const product = JSON.parse(JSON.stringify(fetchProduct))

  return (
    <div className='p-6'>
      <UpdateProductForm product={product} />
    </div>
  )
}
