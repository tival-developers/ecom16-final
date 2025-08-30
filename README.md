This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
//////////////////////////
"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
  })

  const [submittedData, setSubmittedData] = useState<any | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const helpData = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      text: formData.text,
      date: new Date().toISOString(),
      read: false,
    }

    setSubmittedData(helpData)
    console.log("HelpForm Data:", helpData)
  }

  return (
    <Card className="max-w-lg mx-auto mt-10 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Help Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <Textarea
            name="text"
            placeholder="Your Message"
            value={formData.text}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        {submittedData && (
          <div className="mt-6 p-4 border rounded-lg bg-muted">
            <h3 className="font-semibold mb-2">Submitted Data:</h3>
            <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
