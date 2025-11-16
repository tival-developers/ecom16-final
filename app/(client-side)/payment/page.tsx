// import PaymentForm from "@/components/payment/payment-form";

 
// export default function Home() {
//   return (
//     <section className="bg-gray-100 max-w-400 h-screen flex justify-center items-center">
//       <PaymentForm />
//     </section>
//   );
// }
'use client'

import { useState } from "react"

export default function PayForm() {
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null)

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount,
          accountReference: "Order#1234",
          description: "Next.js Test Payment",
        }),
      })
      const data = await res.json()
      setResponse(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        type="tel"
        placeholder="2547XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border px-3 py-2 rounded"
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Pay with M-Pesa"}
      </button>

      {response && (
        <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}
