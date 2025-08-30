// app/api/admin/notifications/[id]/read/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/db/dbConnection"
import {Notification} from '@/lib/db/models/notification';
import { auth } from '@/auth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const updated = await Notification.findByIdAndUpdate(params.id, { isRead: true }, { new: true });
  return NextResponse.json(updated);
}
