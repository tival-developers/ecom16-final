import Product from '@/lib/db/models/product.model'
import connectToDatabase from '@/lib/db/dbConnection'
import { UpdateProductData } from '@/lib/actions/products.actions'
import ProductsForm from '@/components/products/products'
import { ProductType } from '@/lib/types/product'



//pre-populate the form fields

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params

  await connectToDatabase
  const product = await Product.findById(id).lean<ProductType>()
  if (!product) return <div>Product not found</div>
  const updateProductWithId = UpdateProductData.bind(null, id)

  return (
    <>
      <form action={updateProductWithId}>
        <ProductsForm product={product} />
      </form>
    </>
  )
}
//********************************************* */
