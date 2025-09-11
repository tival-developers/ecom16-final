import mongoose from 'mongoose'

const OrderedItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    originalPrice: { type: Number, required: true },
    deliveredAt: Date,

    quantity: { type: Number, required: true, min: 1 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { _id: false }
)

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },

    orderNumber: { type: String, required: true, unique: true },
    items: [OrderedItemSchema],
    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },
    paymentMethod: String,
    totalAmount: Number,
    fulfillmentStatus: {
      type: String,
      enum: ['fulfilled', 'unfulfilled'],
      default: 'unfulfilled',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success'],
      default: 'pending',
    },

    deliveryStatus: {
      type: String,
      enum: ['pending', 'shipped', ],
      default: 'pending',
    },
    deliveredAt: Date,
  },
  { timestamps: true }
)

export const Order =
  mongoose.models.Order || mongoose.model('Order', OrderSchema)
