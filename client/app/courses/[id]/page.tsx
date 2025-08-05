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

import { coursesData, Course, CourseSection, CourseItem } from '@/data/courses';

export default function CourseLearningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) { 
  const params = use(paramsPromise); // Unwrap the params Promise
  const course: Course | undefined = coursesData.find((c: Course) => c.id === params.id);
  
  const [sections, setSections] = useState<CourseSection[]>(
    course?.sections || []
  )
  const currentItem: CourseItem | null = sections
    .flatMap(section => section.items)
    .find(item => item.isActive) || null;

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    )
  }

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
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        
         <SiteHeader />

        <div className="md:flex h-full ">
          {/* Sidebar */}
          <div className="md:w-80 bg-white dark:bg-background shadow-3xl overflow-y-auto border-r">
            <div className="p-4">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
              {/* Mapping lesson structure with items  */}
              {sections.map((section) => (
                <div key={section.id} className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-3"
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                    {section.isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {section.isOpen && (
                    <div className="pl-4">
                      <ul className="space-y-1 py-2">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start px-3 text-sm",
                                item.isActive && "dark:bg-black font-semibold"
                              )}
                              onClick={() => setActiveItem(item.id)}
                            >
                              {item.completed ? (
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 mr-2 text-gray-400" />
                              )}
                              {item.title}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content with entire details of lesson */}
          <div className="flex-1 overflow-y-auto p-8">
            {currentItem ? (
              <div className="max-w-4xl mx-auto">
                {/* Current Lesson Title */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">{currentItem.title}</h1>
                  <div className="flex items-center gap-2">
                    {currentItem.completed ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-5 w-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-600">
                        <Circle className="h-5 w-5" />
                        <span className="font-medium">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>

                <Card className="mb-8">
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src="/images/How-to-Learn-ReactJS-in-2021.png"
                        alt={currentItem.title || 'Course lesson image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6 mb-8">
                  {currentItem.completed ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h2 className="text-xl font-semibold text-green-800 mb-3">🎉 Lesson Completed!</h2>
                      <p className="text-green-700 leading-relaxed">
                        Great job! You&apos;ve successfully completed &quot;{currentItem.title}&quot;. Keep up the good work!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h2 className="text-xl font-semibold text-blue-800 mb-3">What you&apos;ll learn in this lesson:</h2>
                      <ul className="text-blue-700 space-y-2">
                        <li>• Key concepts and techniques</li>
                        <li>• Practical examples and exercises</li>
                        <li>• Best practices and tips</li>
                      </ul>
                    </div>
                  )}

                  <div className="prose max-w-none">
                    {currentItem.content ? (
                      <p className="dark:text-amber-50 text-lg text-gray-700 leading-relaxed">
                        {currentItem.content}
                      </p>
                    ) : (
                      <p className="text-lg text-gray-500 leading-relaxed">
                        This lesson does not have any content yet. Select another lesson or check back later!
                      </p>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {currentItem.completed ? (
                    <Button variant="outline" className="flex items-center gap-2">
                      Next Lesson
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => toggleCompletion(currentItem.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a lesson to get started</p>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
