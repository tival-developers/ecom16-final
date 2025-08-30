// models/Cart.ts
import mongoose from 'mongoose'
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: String,
  originalPrice: Number,
  quantity: Number,
  imageUrl: String,
})

const CartSchema = new mongoose.Schema({
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true,},
  userId: { type: String, required: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now },
})
const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema)

export default Cart
