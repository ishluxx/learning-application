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
  const allItems = (course.sections ?? []).flatMap((section) => section.items ?? []);
  if (allItems.length === 0) {
    return "Not Started";
  }
  const completedItems = allItems.filter((item) => item.completed).length;
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
  const levels = useMemo(() => Array.from(new Set(coursesData.map((c) => c.level))), []);

  // Filter courses based on search, level, and status
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
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
            <h1 className="text-3xl font-extrabold dark:text-white">Available Courses</h1>
            <br />
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search courses by title, instructor, or description..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-800"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-800"
              >
                <option value="">All Levels</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-800"
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
            </div>
            {/* Course Cards: each card shows course info, status, and lessons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12 text-xl font-semibold bg-white dark:bg-gray-900 rounded-xl shadow">
                  No courses found.
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const status = getCourseStatus(course);
                  let statusColor = "";
                  if (status === "Completed")
                    statusColor =
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
                  else if (status === "In Progress")
                    statusColor =
                      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
                  else
                    statusColor =
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

                  let buttonText = "Start Learning";
                  if (status === "Completed") {
                    buttonText = "Review Course";
                  } else if (status === "In Progress") {
                    buttonText = "Continue Learning";
                  }

                  return (
                    <Card key={course.id} className="flex flex-col h-full bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-blue-100 dark:border-gray-800 group">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-bold text-blue-900 dark:text-white group-hover:text-blue-700 transition">
                            {course.title}
                          </CardTitle>
                          <span
                            className={cn(
                              "inline-flex flex-wrap items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold shadow-sm",
                              statusColor
                            )}
                            aria-label={status}
                          >
                            {status === "Completed" ? (
                              <svg
                                className="h-4 w-4 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : status === "In Progress" ? (
                              <svg
                                className="h-4 w-4 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                            ) : (
                              <svg
                                className="h-4 w-4 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                            )}
                            <span className="whitespace-nowrap">{status}</span>
                          </span>
                        </div>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-300 text-base">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="relative aspect-video w-full mb-4 rounded-xl overflow-hidden border border-blue-100 dark:border-gray-800 shadow">
                          <img
                            src={course.image || "/images/placeholder-course.png"}
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span className="font-semibold uppercase tracking-wide text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                            {course.level}
                          </span>
                          <span>•</span>
                          <span>{course.sections?.length || 0} Sections</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2">
                        <Button
                          asChild
                          className="w-full font-bold px-6 py-3 rounded-lg shadow bg-black dark:bg-white dark:text-black hover:bg-gray-900 text-white text-base transition"
                        >
                          <Link href={`/courses/${course.id}`}>{buttonText}</Link>
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
  );
}
