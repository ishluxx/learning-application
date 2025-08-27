// app/report-abuse/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ReportAbusePage() {
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) {
      alert("Please provide a description of the abuse.")
      return
    }

    // Replace this with real API call later
    alert("Your abuse report has been submitted!")
    setEmail("")
    setDescription("")
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
        <AlertCircle className="h-7 w-7 text-red-600" />
        Report Abuse
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use this form to report inappropriate content or behavior. Your report will be
            reviewed by the support team.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
