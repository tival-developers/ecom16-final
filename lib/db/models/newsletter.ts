import mongoose, { model, models } from 'mongoose'

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
})

const Newsletter = models?.Newsletter || model('Newsletter', newsletterSchema)

export default Newsletter
