import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/dbConnection"
import { Order } from "@/lib/db/models/order"
import Product from "@/lib/db/models/product.model";


export async function POST(req: Request, { params }: { params: { id: string } }) {
  const orderId = params.id;

  try {
    await connectToDatabase;

    const order = await Order.findById(orderId).populate('orderItems.productId');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.fulfillmentStatus === 'fulfilled') {
      return NextResponse.json({ error: 'Order already completed' }, { status: 400 });
    }

    // Decrease stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.productId._id);

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId._id}` }, { status: 404 });
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${product.name}` }, { status: 400 });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    order.fulfillmentStatus = 'fulfilled';
    await order.save();

    return NextResponse.json({ message: 'Order marked as completed and stock updated.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
