// models/Cart.ts
import mongoose from 'mongoose'
const FavItemSchema=  new mongoose.Schema({
 
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  originalPrice: Number,
  quantity: Number,
  imageUrl: String
}, 

);

const FavSchema = new mongoose.Schema({
  
  userId: { type: String, required: true },
  items: [FavItemSchema],
  updatedAt: { type: Date, default: Date.now },
})
 const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', FavSchema)

export default Favorite