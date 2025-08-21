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
import { Eye, Search, BookOpen, Clock, Users, Star, Filter, X, ChevronDown } from "lucide-react"
import AIChatIcon from "@/components/ai/page";

// Helper function to determine course status
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

// Calculate progress percentage
function getProgressPercentage(course: Course): number {
  if (!course.sections || course.sections.length === 0) return 0;
  const allItems = (course.sections ?? []).flatMap((section) => section.items ?? []);
  if (allItems.length === 0) return 0;
  const completedItems = allItems.filter((item) => item.completed).length;
  return Math.round((completedItems / allItems.length) * 100);
}

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const levels = useMemo(() => Array.from(new Set(coursesData.map((c) => c.level))), []);

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

  const clearFilters = () => {
    setSearch("");
    setLevel("");
    setStatusFilter("");
  };

  const hasActiveFilters = search || level || statusFilter;

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
           <AIChatIcon />
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 border-b border-gray-200 dark:border-gray-800">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative p-8">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Discover Your Learning Journey
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Explore our comprehensive collection of courses designed to help you master new skills and advance your career.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">{coursesData.length}</span>
                    <span>Total Courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">{levels.length}</span>
                    <span>Skill Levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">4.8</span>
                    <span>Average Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Enhanced Search and Filter Controls */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search courses, instructors, topics..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 pl-12 text-lg placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-900 dark:text-white transition-all duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "h-12 px-6 rounded-xl border-2 transition-all duration-200",
                    showFilters ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300" : ""
                  )}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showFilters ? "rotate-180" : "")} />
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      !
                    </Badge>
                  )}
                </Button>

                {/* Results Count */}
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        className="w-full h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 text-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">All Levels</option>
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Progress Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="w-full h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 text-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Not Started">Not Started</option>
                      </select>
                    </div>

                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="h-12 px-6 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full">
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn&apos;t find any courses matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                    {hasActiveFilters && (
                      <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                        <X className="mr-2 h-4 w-4" />
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const status = getCourseStatus(course);
                  const progress = getProgressPercentage(course);

                  let statusConfig = {
                    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                    icon: "circle"
                  };

                  if (status === "Completed") {
                    statusConfig = {
                      color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
                      icon: "check"
                    };
                  } else if (status === "In Progress") {
                    statusConfig = {
                      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
                      icon: "clock"
                    };
                  }

                  let buttonConfig: { text: string; variant: "default" | "secondary" } = {
                    text: "Start Learning",
                    variant: "default"
                  };

                  if (status === "Completed") {
                    buttonConfig = { text: "Review Course", variant: "secondary" as const };
                  } else if (status === "In Progress") {
                    buttonConfig = { text: "Continue Learning", variant: "default" as const };
                  }

                  return (
                    <Card key={course.id} className="group relative overflow-hidden bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl">
                      
                      {/* Progress Bar (for in-progress courses) */}
                      {status === "In Progress" && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}

                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-3">
                          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                            {course.title}
                          </CardTitle>
                          <Badge className={cn("ml-2 flex-shrink-0 px-3 py-1 rounded-full font-medium", statusConfig.color)}>
                            {status === "Completed" ? (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : status === "In Progress" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <BookOpen className="w-3 h-3 mr-1" />
                            )}
                            {status}
                          </Badge>
                        </div>

                        <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </CardHeader>


                      {/* Course content */}
                      <CardContent className="space-y-4">
                        {/* Course Image */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                          <img
                            src={course.image || "/images/placeholder-course.png"}
                            alt={course.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Course Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <Badge variant="outline" className="px-2 py-1 text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                              {course.level}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.sections?.length || 0} sections</span>
                            </div>
                          </div>

                          {/* Course Status and Progress  */}
                          {status === "In Progress" && (
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {progress}% complete
                            </div>
                          )}
                        </div>
                      </CardContent>

                      {/* Butttons for card  */}
                      <CardFooter className="pt-2 space-y-3 flex-col">
                        <Button
                          asChild
                          variant={buttonConfig.variant}
                          className="w-full h-12 rounded-xl font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <Link href={`/courses/${course.id}`}>{buttonConfig.text}</Link>
                        </Button>
                        <Button className="w-full h-10 rounded-x bg-white text-black border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
                          <Link href={`/courses/${course.id}/overview`} className="flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            Course Overview
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