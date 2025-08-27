// app/downloads/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface DownloadItem {
  id: number
  title: string
  date: string
  type: string
  size: string
  status: "Completed" | "Pending" | "Failed"
}

const sampleDownloads: DownloadItem[] = [
  {
    id: 1,
    title: "Math Assignment 1",
    date: "2025-08-25",
    type: "PDF",
    size: "1.2MB",
    status: "Completed",
  },
  {
    id: 2,
    title: "History Notes",
    date: "2025-08-20",
    type: "DOCX",
    size: "850KB",
    status: "Pending",
  },
  {
    id: 3,
    title: "Science Lab Report",
    date: "2025-08-15",
    type: "PDF",
    size: "2MB",
    status: "Failed",
  },
  {
    id: 4,
    title: "English Lecture Notes",
    date: "2025-08-10",
    type: "PDF",
    size: "1.5MB",
    status: "Completed",
  },
  {
    id: 5,
    title: "Chemistry Assignment 2",
    date: "2025-08-05",
    type: "DOCX",
    size: "900KB",
    status: "Completed",
  },
]

export default function DownloadHistoryPage() {
  const router = useRouter()

  const getStatusColor = (status: DownloadItem["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-600"
      case "Pending":
        return "text-yellow-600"
      case "Failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      {/* Back button */}
      <button
        className="mb-6 flex items-center gap-2 text-sm text-blue-600 hover:underline"
        onClick={() => router.push("/student")}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Download History</h1>

      {sampleDownloads.length === 0 ? (
        <p className="text-black dark:text-white">You haven’t downloaded anything yet.</p>
      ) : (
        <div className="space-y-4">
          {sampleDownloads.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-black dark:text-white">
                <div>
                  <span className="font-semibold">Date:</span> {item.date}
                </div>
                <div>
                  <span className="font-semibold">Type:</span> {item.type}
                </div>
                <div>
                  <span className="font-semibold">Size:</span> {item.size}
                </div>
                <div className="col-span-1 md:col-span-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={getStatusColor(item.status)}>{item.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
