import { NextResponse } from "next/server";
import axios from "axios";

const baseURL =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });

  return res.data.access_token;
}

export async function POST(req: Request) {
  try {
    const { phone, amount, accountReference, description } = await req.json();

    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone, // User's phone
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: "https://your-domain.com/api/mpesa/callback",
      AccountReference: accountReference || "NextJSApp",
      TransactionDesc: description || "Payment",
    };

    const res = await axios.post(
      `${baseURL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("M-Pesa STK Push Error:", error);
    return NextResponse.json(
      { error: "Failed to initiate M-Pesa payment" },
      { status: 500 }
    );
  }
}
// import { NextResponse } from "next/server";
// import axios from "axios";
// import connectToDatabase from "@/lib/db/dbConnection";
// import Transaction from "@/lib/db/models/transaction.model";

// const baseURL =
//   process.env.MPESA_ENV === "production"
//     ? "https://api.safaricom.co.ke"
//     : "https://sandbox.safaricom.co.ke";

// async function getAccessToken() {
//   const auth = Buffer.from(
//     `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
//   ).toString("base64");

//   const res = await axios.get(`${baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
//     headers: { Authorization: `Basic ${auth}` },
//   });

//   return res.data.access_token;
// }

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const { phone, amount, accountReference, description } = await req.json();

//     const token = await getAccessToken();

//     const timestamp = new Date()
//       .toISOString()
//       .replace(/[^0-9]/g, "")
//       .slice(0, -3);

//     const password = Buffer.from(
//       `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
//     ).toString("base64");

//     const payload = {
//       BusinessShortCode: process.env.MPESA_SHORTCODE,
//       Password: password,
//       Timestamp: timestamp,
//       TransactionType: "CustomerPayBillOnline",
//       Amount: amount,
//       PartyA: phone,
//       PartyB: process.env.MPESA_SHORTCODE,
//       PhoneNumber: phone,
//       CallBackURL: "https://your-domain.com/api/mpesa/callback",
//       AccountReference: accountReference,
//       TransactionDesc: description,
//     };

//     const res = await axios.post(`${baseURL}/mpesa/stkpush/v1/processrequest`, payload, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Save transaction as pending
//     const transaction = await Transaction.create({
//       phone,
//       amount,
//       accountReference,
//       description,
//       mpesaCheckoutRequestID: res.data.CheckoutRequestID,
//       status: "pending",
//     });

//     return NextResponse.json({ ...res.data, transactionId: transaction._id });
//   } catch (err) {
//     console.error("STK Push Error:", err);
//     return NextResponse.json({ error: "Failed to initiate M-Pesa payment" }, { status: 500 });
//   }
// }
