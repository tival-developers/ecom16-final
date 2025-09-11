import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['review', 'helpRequest', 'order', 'product', 'admin', 'banner', 'blog'],
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
})

const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', NotificationSchema)

export default Notification
