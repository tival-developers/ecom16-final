"use client"

import { useState } from "react"
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
