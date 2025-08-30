// models/Notification.ts
import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['REVIEW', 'HELP_REQUEST', 'ORDER_COMPLETED'],
      required: true,
    },
    message: String,
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema)
