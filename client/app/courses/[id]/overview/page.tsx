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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold mb-6 text-red-600">Course not found</h1>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-300/30 transition">
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

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
        <SiteHeader />

        <main className="container mx-auto p-6 select-none">
          
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/courses" className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Courses
            </Link>
          </Button>

          {/* Responsive grid: main + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Main Content */}
            <section className="lg:col-span-2 space-y-8">
              
              {/* Course Header */}
              <div className="space-y-3">
                <h1 className="text-5xl font-extrabold  dark:text-white ">
                  {course.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  {course.description}
                </p>

                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Badge variant="secondary" className="bg-blue-600 text-white text-sm px-3 py-1 shadow-md">
                    {course.level}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-medium">{course.duration}</span>
                  {course.instructor && (
                    <span className="text-sm text-muted-foreground font-medium">
                      Instructor: <span className="text-indigo-600 dark:text-indigo-400">{course.instructor}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar Card */}
              {totalLessons > 0 && (
                <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</CardTitle>
                      <span className="text-sm text-muted-foreground font-medium">
                        {completedLessons} of {totalLessons} lessons completed
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="w-full bg-gray-300 dark:bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground text-right font-semibold">
                      {progress}% Complete
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Course Content List */}
              <Card className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {course.sections?.map((section) => (
                      <div key={section.id} className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                        
                        {/* Section Header */}
                        <div className="bg-gray-100 dark:bg-indigo-900 px-5 py-3 text-indigo-800 dark:text-indigo-200 font-semibold text-lg shadow-inner select-text">
                          {section.title}
                        </div>

                        {/* Lesson List */}
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                          {section.items.map((item) => (
                            <li 
                              key={item.id} 
                              className="px-6 py-4 flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-indigo-900 transition cursor-pointer select-text"
                            >
                              {/* Lesson title with subtle style for completed */}
                              <span className={item.completed ? ' text-gray-500 dark:text-gray-400' : 'font-medium text-gray-900 dark:text-gray-200'}>
                                {item.title}
                              </span>
                              
                              {/* Completion Badge */}
                              {item.completed ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-white px-3 py-1 shadow">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-white px-3 py-1 shadow">
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
            </section>

            {/* Sidebar Content */}
            <aside className="space-y-8">
              
              {/* Course Image + Start/Continue Button */}
              <Card className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={getCourseImage(course.title)}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <Button asChild className="w-full text-lg font-semibold" size="lg" variant="default">
                      <Link href={`/courses/${course.id}`}>
                        {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* "What you'll learn" Section */}
              <Card className="shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">What you&apos;ll learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-3">
                    {course.sections?.flatMap(section => section.items).slice(0, 5).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckIcon className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </aside>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Returns a course image path based on keywords in the title
function getCourseImage(title: string): string {
  if (title.toLowerCase().includes('typescript')) {
    return '/images/learn.typescript.png';
  } else if (title.toLowerCase().includes('react')) {
    return '/images/How-to-Learn-ReactJS-in-2021.png';
  }
  return '/images/placeholder-course.png';
}

// Inline Check Icon (SVG)
const CheckIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
