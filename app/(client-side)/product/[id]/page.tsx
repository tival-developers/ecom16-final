

import connectToDatabase from '@/lib/db/dbConnection'
import Product from '@/lib/db/models/product.model'
import ProductDetail from './productDetail'
import RelatedProducts from '@/components/cards/relatedProducts'
import { ReviewSummary } from '@/components/cards/reviewCard'

export default async function ProductPage(
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params // ✅ Await params

  await connectToDatabase

  const productData = await Product.findById(id)
    .populate('category')
    .lean()

  if (!productData) {
    return (
      <div className='container mx-auto p-4'>
        <p>Product not found.</p>
      </div>
    )
  }

  // ✅ Convert to plain JS object safely
  const product = JSON.parse(JSON.stringify(productData))

  return (
    <>
      <main className='container mx-auto p-4'>
        <div className='w-fit mb-5 '>
          <h2 className=' text-2xl md:text-3xl font-bold text-yellow-600'>
            View <span className='text-gray-700'>Product</span>
          </h2>
        </div>
        <ProductDetail product={product} />
      </main>
      <section className='max-w-5xl mx-auto py-10 px-4'>
        <ReviewSummary product={product} /> 
      </section>
      <section className='mt-10'>
        {/* If product.category is populated, you may need product.category.name here */}
        <RelatedProducts  categoryName={product.category?.name || product.category} />
        
      </section>
    </>
  )
}
