// app/help/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, LifeBuoy, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HelpPage() {
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    alert("Your help request has been submitted!") // replace with API later
    setMessage("")
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 flex items-center gap-2"
        onClick={() => router.push("/student")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <LifeBuoy className="h-7 w-7 text-blue-600" />
        Help & Support
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Stuck on something? You can reach out for help here.  
            We’ll make sure your instructor or support team sees it.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="Your email (optional)" />
            <Input
              type="text"
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <a href="/faq" className="text-blue-600 hover:underline">
                Frequently Asked Questions
              </a>
            </li>
            <li>
              <a href="/guides" className="text-blue-600 hover:underline">
                Student Guides & Tutorials
              </a>
            </li>
            <li>
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact Support
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
