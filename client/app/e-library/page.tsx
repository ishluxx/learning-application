"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/student/app-sidebar";
import { SiteHeader } from "@/components/student/site-header";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
};

const allBooks: Book[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  title: `Book Title ${i + 1}`,
  author: `Author ${i + 1}`,
  category: ["Fiction", "Science", "History", "Technology"][i % 4],
}));

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const booksPerPage = 20;

  // Filter + search logic
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || book.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // Pagination
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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
      <h1 className="text-2xl font-bold">📚 Library</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-1/2"
        />

        <Select onValueChange={setCategory} defaultValue="all">
          <SelectTrigger className="sm:w-1/4">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Fiction">Fiction</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-4">
              <div>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
              <span className="text-xs text-blue-500">{book.category}</span>
              </div>
              <Button className="mt-5 ml-5 bg-blue-400">Download Book</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
       </SidebarInset>
        </SidebarProvider>
  );
}
