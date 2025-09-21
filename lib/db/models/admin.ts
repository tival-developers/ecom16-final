import mongoose from 'mongoose'
import { models, model } from 'mongoose'


const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["manager", "developer", "sales", "superadmin"], required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

 const Admin = models?.Admin || model("Admin", AdminSchema)
export default Admin