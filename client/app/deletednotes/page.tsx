// app/deleted-notes/page.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface NoteItem {
  id: number
  title: string
  dateDeleted: string
  type: string
  size: string
  status: "Deleted" | "Restored" | "Pending"
}

const sampleDeletedNotes: NoteItem[] = [
  {
    id: 1,
    title: "Math Assignment 1",
    dateDeleted: "2025-08-25",
    type: "PDF",
    size: "1.2MB",
    status: "Deleted",
  },
  {
    id: 2,
    title: "History Notes",
    dateDeleted: "2025-08-20",
    type: "DOCX",
    size: "850KB",
    status: "Pending",
  },
  {
    id: 3,
    title: "Science Lab Report",
    dateDeleted: "2025-08-15",
    type: "PDF",
    size: "2MB",
    status: "Restored",
  },
  {
    id: 4,
    title: "English Lecture Notes",
    dateDeleted: "2025-08-10",
    type: "PDF",
    size: "1.5MB",
    status: "Deleted",
  },
]

export default function DeletedNotesPage() {
  const router = useRouter()

  const getStatusColor = (status: NoteItem["status"]) => {
    switch (status) {
      case "Deleted":
        return "text-red-600"
      case "Restored":
        return "text-green-600"
      case "Pending":
        return "text-yellow-600"
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

      <h1 className="text-3xl font-bold mb-6">Deleted Notes</h1>

      {sampleDeletedNotes.length === 0 ? (
        <p className="text-gray-600">No deleted notes found.</p>
      ) : (
        <div className="space-y-4">
          {sampleDeletedNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-black dark:text-white">
                <div>
                  <span className="font-semibold">Deleted On:</span> {note.dateDeleted}
                </div>
                <div>
                  <span className="font-semibold">Type:</span> {note.type}
                </div>
                <div>
                  <span className="font-semibold">Size:</span> {note.size}
                </div>
                <div className="col-span-1 md:col-span-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={getStatusColor(note.status)}>{note.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
