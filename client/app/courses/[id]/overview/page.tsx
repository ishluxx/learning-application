'use client'

import { use } from 'react'
import { ArrowLeft, CheckCircle2, Circle, Clock, Users, Star, Play } from 'lucide-react'
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
          
          {/* Header Navigation */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                asChild 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full font-medium shadow-lg"
              >
                <Link href="/courses" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Course Modules
                </Link>
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="text-gray-600 hover:text-gray-900 border-gray-300 px-6 py-2 rounded-full font-medium"
            >
              📊 Analytics & Progress
            </Button>
          </div>

          {/* Course Hero Card */}
          <Card className="mb-10 overflow-hidden border border-gray-100 shadow-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-indigo-950/20">
            <CardContent className="p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-start space-x-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-blue-500/30">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {course.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed max-w-3xl">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 text-sm font-medium shadow-md">
                        {course.level}
                      </Badge>
                      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">88% popularity</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{progress}%</div>
                  <div className="text-sm text-gray-500 font-medium">{completedLessons} of {totalLessons} lessons</div>
                  <div className="text-xs text-gray-400 mt-1">completed</div>
                </div>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-200">Overall Progress</span>
                  <span className="text-sm text-gray-500 font-medium">{progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Sections */}
          <div className="space-y-5">
            {course.sections?.map((section, sectionIndex) => (
              <div key={section.id}>
                {section.items.map((item, itemIndex) => {
                  const overallIndex = course.sections!
                    .slice(0, sectionIndex)
                    .reduce((acc, s) => acc + s.items.length, 0) + itemIndex + 1;
                  
                  return (
                    <Card 
                      key={item.id} 
                      className={`transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border ${
                        item.completed
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-100/50 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800'
                          : 'bg-white border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-750'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            {/* Enhanced Completion Icon */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                              item.completed
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30'
                                : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                            }`}>
                              {item.completed ? (
                                <CheckCircle2 className="h-6 w-6" />
                              ) : (
                                <span className="font-bold text-lg">{overallIndex}</span>
                              )}
                            </div>
                            
                            {/* Enhanced Content */}
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2 leading-tight">
                                {item.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                  <Clock className="h-3 w-3 text-blue-600" />
                                  <span className="font-medium text-blue-700 dark:text-blue-300">25 min</span>
                                </div>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-medium">
                                  video
                                </Badge>
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs font-medium">
                                  {course.level.toLowerCase()}
                                </Badge>
                                <div className="flex items-center space-x-3 text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <span>⭐</span>
                                    <span className="font-medium">5.5k</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <span>👍</span>
                                    <span className="font-medium">993</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <span>📊</span>
                                    <span className="font-medium">4.8</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced Action Section */}
                          <div className="flex items-center space-x-4">
                            {item.completed && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-bold shadow-lg animate-pulse">
                                ✨ COMPLETED
                              </Badge>
                            )}
                            <Button 
                              variant="ghost" 
                              size="lg"
                              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                item.completed 
                                  ? 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30' 
                                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                              }`}
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ))}
            
            {/* Enhanced Final Assessment Card */}
            <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] dark:from-purple-950/20 dark:via-pink-950/20 dark:to-purple-950/20 dark:border-purple-800">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                      {totalLessons + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2 leading-tight">
                        Comprehensive Knowledge Assessment
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                          <Clock className="h-3 w-3 text-purple-600" />
                          <span className="font-medium text-purple-700 dark:text-purple-300">45 min</span>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">
                          Final Quiz
                        </Badge>
                        <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 text-xs font-medium">
                          assessment
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function getCourseImage(title: string): string {
  if (title.toLowerCase().includes('typescript')) {
    return '/images/learn.typescript.png';
  } else if (title.toLowerCase().includes('react')) {
    return '/images/How-to-Learn-ReactJS-in-2021.png';
  }
  return '/images/placeholder-course.png';
}