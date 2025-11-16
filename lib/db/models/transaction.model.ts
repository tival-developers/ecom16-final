import mongoose, { model, models } from "mongoose";

export interface ITransaction {
  phone: string;
  amount: number;
  accountReference: string;
  description: string;
  mpesaCheckoutRequestID?: string;
  resultCode?: number;
  resultDesc?: string;
  status: "pending" | "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    accountReference: { type: String, required: true },
    description: { type: String },
    mpesaCheckoutRequestID: { type: String },
    resultCode: { type: Number },
    resultDesc: { type: String },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  },
  { timestamps: true }
);

const Transaction = models.Transaction || model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
