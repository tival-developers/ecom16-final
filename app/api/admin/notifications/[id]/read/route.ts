// app/api/admin/notifications/[id]/read/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/db/dbConnection"
import Notification from '@/lib/db/models/notification';


  
export async function PATCH(req: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase;
  const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
  return NextResponse.json(updated);
}
