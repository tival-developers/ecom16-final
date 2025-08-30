
import connectToDatabase from '@/lib/db/dbConnection'
import { UpdateProductData } from '@/lib/actions/products.actions'

import { Order } from '@/lib/db/models/order'
import { typeOrder } from '@/lib/types/order'
import { Card } from '@mui/material'



//pre-populate the form fields

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params

  await connectToDatabase
  const order = await Order.findById(id).lean<typeOrder>()
  if (!order) return <div>Product not found</div>
  const updateProductWithId = UpdateProductData.bind(null, id)

  return (
    <>
      <form action={updateProductWithId}>
        <Card>

        </Card>
      </form>
    </>
  )
}
//********************************************* */
