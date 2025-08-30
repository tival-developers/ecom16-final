// models/Mail.ts
import mongoose from "mongoose";

const MailSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  text: String,
  date: Date,
  read: Boolean,
  labels: [String],
});

export const Mail = mongoose.models.Mail || mongoose.model("Mail", MailSchema);
