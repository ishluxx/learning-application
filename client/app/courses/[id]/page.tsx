'use client'

import { useState, use } from "react"
import { ChevronDown, ChevronRight, Check, Circle, ArrowLeft, ArrowRight } from "lucide-react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { coursesData, Course, CourseSection, CourseItem } from '@/data/courses'

export default function CourseLearningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  // Unwrap the async params to get the course ID
  const params = use(paramsPromise)
  
  // Find the course data matching the current course ID
  const course: Course | undefined = coursesData.find((c: Course) => c.id === params.id)
  
  // Initialize state for course sections (expand/collapse & lesson states)
  const [sections, setSections] = useState<CourseSection[]>(course?.sections || [])

  // Find the currently active lesson (marked by isActive = true)
  const currentItem: CourseItem | null = sections
    .flatMap(section => section.items)
    .find(item => item.isActive) || null

  // If the course is not found (invalid ID), display error UI
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4"> Course not found</h1>
          {/* Button to navigate back to the courses list */}
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Handler to toggle the open/closed state of a course section
  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    )
  }

  // Handler to toggle the completion status of a lesson item
  const toggleCompletion = (itemId: string) => {
    setSections(
      sections.map(section => ({
        ...section,
        items: section.items.map(item =>
          item.id === itemId
            ? { ...item, completed: !item.completed }
            : item
        ),
      }))
    )
  }

  // Handler to set a lesson item as active (selected)
  const setActiveItem = (itemId: string) => {
    setSections(
      sections.map(section => ({
        ...section,
        items: section.items.map(item => ({
          ...item,
          isActive: item.id === itemId,
        })),
      }))
    )
  }

  return (
    <SidebarProvider
      // Custom CSS properties for layout sizing
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      {/* Sidebar navigation component */}
      <AppSidebar variant="inset" />

      {/* Main layout area with header and content */}
      <SidebarInset>
        {/* Top site header */}
        <SiteHeader />

        {/* Layout: Sidebar + Main content */}
        <div className="md:flex h-full">
          
          {/* Left Sidebar with course sections and lessons */}
          <div className="md:w-80 bg-white/70 dark:bg-background/70 backdrop-blur-sm shadow-xl overflow-y-auto border-r border-gray-200 dark:border-gray-800">
            <div className="p-5 space-y-6">

              {/* Course title and description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
              </div>

              {/* Render each course section */}
              {sections.map((section) => (
                <div key={section.id} className="w-full">

                  {/* Section header button to toggle open/close */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-3 py-2 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    onClick={() => toggleSection(section.id)}
                  >
                    <span>{section.title}</span>
                    {section.isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </Button>

                  {/* If section is open, show list of lessons */}
                  {section.isOpen && (
                    <div className="pl-3 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start px-3 py-2 text-sm rounded-md transition-all",
                            item.isActive
                              ? "bg-indigo-50 dark:bg-indigo-900/30 font-semibold text-indigo-700 dark:text-indigo-300"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          )}
                          onClick={() => setActiveItem(item.id)}
                        >
                          {/* Icon shows if lesson is completed or not */}
                          {item.completed ? (
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 mr-2 text-gray-400" />
                          )}
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Main Content Area showing lesson details */}
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900">
            {currentItem ? (
              <div className="max-w-4xl mx-auto space-y-8">

                {/* Lesson Title and completion status */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{currentItem.title}</h1>
                  {currentItem.completed ? (
                    <span className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                      <Check className="h-4 w-4 mr-1" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      <Circle className="h-4 w-4 mr-1" /> In Progress
                    </span>
                  )}
                </div>

                {/* Lesson Image */}
                <Card className="shadow-md rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={course.image || '/images/placeholder-course.png'}
                        alt={currentItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Lesson Content text */}
                <div className="prose max-w-none dark:prose-invert">
                  {currentItem.content ? (
                    <p className="text-lg leading-relaxed">{currentItem.content}</p>
                  ) : (
                    <p className="text-lg text-gray-500">No content available for this lesson yet.</p>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between">
                  {/* Previous button (not wired for action yet) */}
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft size={16} /> Previous
                  </Button>

                  {/* Next or Mark as Completed */}
                  {currentItem.completed ? (
                    <Button variant="outline" className="flex items-center gap-2">
                      Next Lesson <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => toggleCompletion(currentItem.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check size={16} /> Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              // Message shown when no lesson is selected
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a lesson to get started
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
