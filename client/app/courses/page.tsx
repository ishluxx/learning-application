"use client";
import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { coursesData, Course } from "@/data/courses"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Eye, Search } from "lucide-react"

// Helper function to determine course status
// Returns 'Completed', 'In Progress', or 'Not Started' based on lesson completion
function getCourseStatus(course: Course): "Completed" | "In Progress" | "Not Started" {
  if (!course.sections || course.sections.length === 0) {
    return "Not Started";
  }
  const allItems = (course.sections ?? []).flatMap(section => section.items ?? []);
  if (allItems.length === 0) {
    return "Not Started";
  }
  const completedItems = allItems.filter(item => item.completed).length;
  if (completedItems === allItems.length) {
    return "Completed";
  }
  if (completedItems > 0) {
    return "In Progress";
  }
  return "Not Started";
}

// Main CoursesPage component: displays all courses, search/filter controls, and course cards
export default function CoursesPage() {
  // State for search/filter controls
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Get all unique levels for filter dropdown
  const levels = useMemo(() => Array.from(new Set(coursesData.map(c => c.level))), []);

  // Filter courses based on search, level, and status
  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        (course.instructor && course.instructor.toLowerCase().includes(search.toLowerCase())) ||
        course.description.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = level ? course.level === level : true;
      const courseStatus = getCourseStatus(course);
      const matchesStatus = statusFilter ? courseStatus === statusFilter : true;
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [search, level, statusFilter]);
  // Render sidebar, header, search/filter controls, and course cards
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
        <div className="flex flex-1 flex-col">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
            {/* Search and Filter Controls: user can search/filter courses */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search courses by title, instructor, or description..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>
            {/* Course Cards: each card shows course info, status, and lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No courses found.
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const status = getCourseStatus(course);
                  let buttonText = "Start Learning";
                  if (status === "Completed") {
                    buttonText = "Review Course";
                  } else if (status === "In Progress") {
                    buttonText = "Continue Learning";
                  }

                  return (
                    <Card key={course.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{course.title}</CardTitle>
                          <Badge 
                            variant={status === "Completed" ? "default" : status === "In Progress" ? "secondary" : "outline"}
                            className={cn(
                              status === "Completed" && "bg-green-500 text-white",
                              status === "In Progress" && "bg-blue-500 text-white",
                              status === "Not Started" && "text-gray-600"
                            )}
                          >
                            {status}
                          </Badge>
                        </div>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Duration: {course.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Level: {course.level}
                        </p>
                        {course.instructor && (
                          <p className="text-sm text-muted-foreground">
                            Instructor: {course.instructor}
                          </p>
                        )}
                        {/* Dynamic section and lesson summary */}
                        {course.sections && course.sections.length > 0 && (
                          <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Sections & Lessons:</p>
                            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                              {course.sections.map(section => (
                                <li key={section.id}>
                                  <span className="font-medium text-gray-700">{section.title}</span>
                                  {section.items && section.items.length > 0 && (
                                    <span className="ml-2 text-gray-500">({section.items.length} lessons)</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button asChild className="w-full">
                          <Link href={`/courses/${course.id}`}>
                            {buttonText}
                          </Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/courses/${course.id}/overview`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            Overview
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
};