import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("✅ M-Pesa Callback Response:", body);

  // You can store transaction results in your DB here
  // Example: success -> body.Body.stkCallback.ResultCode === 0

  return NextResponse.json({ message: "Callback received" });
}
// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/db/dbConnection";
// import Transaction from "@/lib/db/models/transaction.model";

// export async function POST(req: Request) {
//   await connectToDatabase();
//   const body = await req.json();
//   console.log("✅ M-Pesa Callback:", body);

//   const callback = body.Body.stkCallback;
//   const checkoutID = callback.CheckoutRequestID;

//   const transaction = await Transaction.findOne({ mpesaCheckoutRequestID: checkoutID });
//   if (!transaction) {
//     console.error("Transaction not found for callback:", checkoutID);
//     return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
//   }

//   transaction.resultCode = callback.ResultCode;
//   transaction.resultDesc = callback.ResultDesc;
//   transaction.status = callback.ResultCode === 0 ? "success" : "failed";

//   await transaction.save();

//   return NextResponse.json({ message: "Callback received" });
// }
