import connectToDatabase  from "@/lib/db/dbConnection";
import Banner from "@/lib/db/models/Banner.model";
import { NextResponse } from "next/server";

//get single Banner
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const banner = await Banner.findById(params.id);
  return NextResponse.json(banner);
}

//delete Banner
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase;
  await Banner.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
