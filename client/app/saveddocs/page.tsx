"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, FileText } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student/app-sidebar";
import { SiteHeader } from "@/components/student/site-header";

type Document = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const initialDocs: Document[] = [
  { id: 1, title: "Project Plan", description: "Initial roadmap for Q1 project", date: "2025-08-01" },
  { id: 2, title: "Research Notes", description: "AI & Machine Learning summary", date: "2025-08-05" },
  { id: 3, title: "Meeting Minutes", description: "Weekly team sync", date: "2025-08-10" },
  { id: 4, title: "Budget Report", description: "Financial analysis for July", date: "2025-08-15" },
];

export default function SavedDocumentsPage() {
  const [docs, setDocs] = useState<Document[]>(initialDocs);
  const [search, setSearch] = useState("");

  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setDocs(docs.filter((doc) => doc.id !== id));
  };

  return (
     <SidebarProvider
              style={{
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties}
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📄 Saved Documents</h1>

      {/* Search box */}
      <Input
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="sm:w-1/2"
      />

      {/* Document list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <Card
            key={doc.id}
            className="hover:shadow-md transition-all cursor-pointer"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">{doc.title}</h2>
              </div>
              <p className="text-sm text-gray-600">{doc.description}</p>
              <p className="text-xs text-gray-400">Saved on {doc.date}</p>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <p className="text-gray-500 italic text-center">No documents found.</p>
      )}
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
}
