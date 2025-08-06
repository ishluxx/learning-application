'use client'

import { use } from 'react'
import { ArrowLeft } from 'lucide-react'
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { coursesData } from '@/data/courses'

export default function CourseOverviewPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const course = coursesData.find((c) => c.id === params.id)

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

  // Calculate course progress
  const totalLessons = course.sections?.flatMap(section => section.items).length || 0
  const completedLessons = course.sections?.flatMap(section => section.items).filter(item => item.completed).length || 0
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* Main navbar */}
             <SiteHeader />

        <div className="container mx-auto p-6">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/courses" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
                
                <div className="flex items-center gap-4 pt-2">
                  <Badge variant="secondary" className="text-sm text-white bg-blue-600">
                    {course.level}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {course.duration}
                  </span>
                  {course.instructor && (
                    <span className="text-sm text-muted-foreground">
                      Instructor: {course.instructor}
                    </span>
                  )}
                </div>
              </div>

              {/* Course Progress */}
              {totalLessons > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Your Progress</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {completedLessons} of {totalLessons} lessons completed
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground text-right">
                      {progress}% Complete
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Course Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 ">
                    {course.sections?.map((section) => (
                      <div key={section.id} className="rounded-lg overflow-hidden">
                        <div className="bg-gray-50 dark:bg-blue-600 px-4 py-3 font-medium border-none">
                          {section.title}
                        </div>
                        <ul className="divide-y">
                          {section.items.map((item) => (
                            <li key={item.id} className="px-4 py-3 flex items-center justify-between">
                              <span className={item.completed ? 'text-gray-500 dark:text-gray-400' : ''}>
                                {item.title}
                              </span>
                              {item.completed ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-white">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge>
                                  Not Started
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={getCourseImage(course.title)}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Button asChild className="w-full" size="lg">
                      <Link href={`/courses/${course.id}`}>
                        {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What you&apos;ll learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="space-y-2">
                    {course.sections?.flatMap(section => section.items).slice(0, 5).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Helper function to get course image based on title
function getCourseImage(title: string): string {
  if (title.toLowerCase().includes('typescript')) {
    return '/images/learn.typescript.png';
  } else if (title.toLowerCase().includes('react')) {
    return '/images/How-to-Learn-ReactJS-in-2021.png';
  }
  return '/images/placeholder-course.png';
}

// Add Check icon component
const Check = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
