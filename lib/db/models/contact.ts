import mongoose from 'mongoose'
import { models, model } from 'mongoose'

const HelpRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  date: Date,
})

const HelpRequest =
  models?.HelpRequest || model('HelpRequest', HelpRequestSchema)

export default HelpRequest

