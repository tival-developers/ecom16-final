import { NextResponse } from "next/server"
import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import Favorite from '@/lib/db/models/favorite'

export async function DELETE(
    _: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    
try {
    const { id } = await context.params
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    
    await connectToDatabase()
    const deleted = await Favorite.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
