import connectToDatabase  from "@/lib/db/dbConnection";
import Product from "@/lib/db/models/product.model";
import { NextResponse } from "next/server";

//get single user
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase;
  const product = await Product.findById(params.id).populate("category");
  return NextResponse.json(product);
}
//update product details
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  
  await connectToDatabase;
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
  
}
//delete product
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase;
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
