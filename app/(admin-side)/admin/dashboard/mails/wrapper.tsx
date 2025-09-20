"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Mail, MailOpen, Clock } from "lucide-react"
import { cn } from "@/lib/db/essentials/utils"

type HelpRequest = {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  read: boolean
  date: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<HelpRequest[]>([])
  const [selected, setSelected] = useState<HelpRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"recent" | "read" | "unread">("recent")

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      const res = await fetch("/api/admin/messages")
      const data = await res.json()
      setMessages(data)
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const filtered = messages
    .filter((msg) => {
      if (filter === "read") return msg.read
      if (filter === "unread") return !msg.read
      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const handleSelect = async (msg: HelpRequest) => {
      setSelected(msg)
    
      if (!msg.read) {
        await fetch(`/api/admin/messages/${msg._id}`, {
          method: "PATCH",
        })
    
        // Update local state
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
        )
        setSelected({ ...msg, read: true })
      }
    }
    

   

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar List */}
      <div className="md:w-1/3 border-r overflow-y-auto">
        <div className="flex gap-2 p-2 border-b">
          <Button
            size="sm"
            variant={filter === "recent" ? "default" : "outline"}
            onClick={() => setFilter("recent")}
          >
            <Clock className="h-4 w-4 mr-1" /> Recent
          </Button>
          <Button
            size="sm"
            variant={filter === "read" ? "default" : "outline"}
            onClick={() => setFilter("read")}
          >
            <MailOpen className="h-4 w-4 mr-1" /> Read
          </Button>
          <Button
            size="sm"
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
          >
            <Mail className="h-4 w-4 mr-1" /> Unread
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
          </div>
        ) : (
          filtered.map((msg) => (
            <Card
              key={msg._id}
              className={cn(
                "rounded-none border-b cursor-pointer transition hover:bg-muted/30",
                selected?._id === msg._id && "bg-muted"
              )}
              onClick={() => handleSelect(msg)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{msg.name}</h4>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                </div>
                <p className="text-sm font-medium truncate">{msg.subject}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {msg.message}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Read Panel */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selected ? (
          <Card className="h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{selected.subject}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                From: {selected.name} ({selected.email}, {selected.phone})
              </p>
              <p className="whitespace-pre-line">{selected.message}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  )
}
