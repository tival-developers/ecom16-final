import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/dbConnection";
import Blog from "@/lib/db/models/blog";


// ✅ Get a single blog
export async function GET(_: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// ✅ Update a blog
export async function PUT(req: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase();

  try {
    const data = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// ✅ Delete a blog
export async function DELETE(_: Request, context: {params: Promise<{ id: string }>}) {
  const { id } = await context.params // ✅ Await params
  await connectToDatabase();

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
