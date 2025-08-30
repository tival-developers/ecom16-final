import connectToDatabase from '@/lib/db/dbConnection'
import { NextResponse } from 'next/server'
import Promo from '@/lib/db/models/promo'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await connectToDatabase

//   const { id } = req.query

//   if (req.method === 'DELETE') {
//     await Promo.findByIdAndDelete(id)
//     return res.status(200).json({ message: 'Promo item removed' })
//   }

//   return res.status(405).end()
// }

//get single PromoProduct
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase
  const promoProduct = await Promo.findById(params.id)
  return NextResponse.json(promoProduct)
}
//update PromoProduct details
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase
  const body = await req.json()
  const updated = await Promo.findByIdAndUpdate(params.id, body, {
    new: true,
  })
  return NextResponse.json(updated)
}
//delete PromoProduct
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase
  await Promo.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'promo item removed' }, { status: 200 })
}
