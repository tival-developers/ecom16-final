// app/api/favorite/route.ts
import { auth } from '@/auth'
import connectToDatabase from '@/lib/db/dbConnection'
import Favorite from '@/lib/db/models/favorite'

import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  await connectToDatabase()

  // TODO: Replace with real session user ID
  const session = await auth()

  const userId = session?.user?.id
  if (!userId) {
    return Response.json([]) // guest: don't fetch from DB
  }
  const favorite = await Favorite.findOne({ userId })

  return Response.json(favorite?.items || [])
}

export async function POST(req: NextRequest) {
  await connectToDatabase()

  const body = await req.json()

  const { items } = body

  // TODO: Replace with real session user ID
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Response.json([]) // guest: don't fetch from DB
  }

  const favorite = await Favorite.findOneAndUpdate(
    { userId },
    { $set: { items } },
    { new: true, upsert: true }
  )

  return Response.json({ success: true, items: favorite.items })
}

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectToDatabase()
  await Favorite.deleteMany({ userId: session.user.id })
  return NextResponse.json({ success: true })
}
