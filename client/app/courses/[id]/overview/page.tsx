'use client'

import { useState, use } from 'react'
import { ArrowLeft, CheckCircle2, Circle, Play, Clock, Users, Award, Target, BookOpen, Share, ChevronDown, ChevronRight, Download, Lock, Trophy } from 'lucide-react'


import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { coursesData, CourseSection, updateCourseProgress, updateLessonLocks, isExamUnlocked } from "@/data/courses"


export default function CourseOverviewPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const course = coursesData.find((c) => c.id === params.id)
  const [sections, setSections] = useState<CourseSection[]>(course?.sections || [])

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

  const totalLessons = sections.flatMap(section => section.items).length || 0
  const completedLessons = sections.flatMap(section => section.items).filter(item => item.completed).length || 0
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const allLessonsCompleted = totalLessons > 0 && completedLessons === totalLessons
  const examUnlocked = course ? isExamUnlocked(course.id) : false

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
    const item = sections.flatMap(s => s.items).find(i => i.id === itemId)
    if (item && course) {
      const newCompleted = !item.completed
      updateCourseProgress(course.id, itemId, newCompleted)
      updateLessonLocks(course.id)

      setSections(
        sections.map(section => ({
          ...section,
          items: section.items.map(item =>
            item.id === itemId
              ? { ...item, completed: newCompleted }
              : item
          ),
        }))
      )

      // Check if all lessons are completed and show exam access
      const updatedSections = sections.map(section => ({
        ...section,
        items: section.items.map(item =>
          item.id === itemId
            ? { ...item, completed: newCompleted }
            : item
        ),
      }))

      const updatedCompletedLessons = updatedSections.flatMap(section => section.items).filter(item => item.completed).length
      const updatedAllLessonsCompleted = totalLessons > 0 && updatedCompletedLessons === totalLessons

      // If all lessons are now completed and exam exists, show notification
      if (updatedAllLessonsCompleted && course.finalExam && !course.finalExam.completed) {
        setTimeout(() => {
          if (confirm('🎉 Congratulations! You\'ve completed all lessons. Would you like to take the final exam now?')) {
            window.location.href = `/courses/${course.id}?exam=true`
          }
        }, 1000)
      }
    }
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

        <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 select-none">

          {/* Header Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-10">
            <div className="flex items-center">
              <Button
                variant="ghost" asChild className="text-gray-600 p-2 sm:p-3"
              >
                <Link href="/courses" className="flex items-center">
                  <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Course Modules</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="hover:bg-green-50 border-gray-300 hover:border-green-200 flex-1 sm:flex-none">
                <Share className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-purple-50 border-gray-300 hover:border-purple-200 flex-1 sm:flex-none">
                <Download className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Resources</span>
              </Button>
            </div>
          </div>

          {/* Course Hero Card */}
          <Card className="mb-6 sm:mb-10 overflow-hidden border border-gray-100 shadow-xl">
            <CardContent className="p-4 sm:p-6 lg:p-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8 w-full lg:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-xl flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {course.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-sm">
                      <div className="flex items-center space-x-2 px-3 sm:px-4 py-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 sm:px-4 py-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <Badge className="bg-orange-400 text-white px-3 sm:px-4 py-2 text-sm font-medium shadow-md">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto text-center sm:text-right bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{progress}%</div>
                  <div className="text-sm text-gray-500 font-medium">{completedLessons} of {totalLessons} lessons</div>
                  <div className="text-xs text-gray-400 mt-1">completed</div>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Overall Progress</span>
                  <span className="text-sm text-gray-500 font-medium">{progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-white p-3 sm:p-6 border border-blue-100 dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Progress</p>
                    <p className="text-xl sm:text-3xl font-bold text-blue-600">{progress}%</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white p-3 sm:p-6 border border-green-100 dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Completed</p>
                    <p className="text-xl sm:text-3xl font-bold text-green-600">{completedLessons}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white p-3 sm:p-6 border border-purple-100 dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Lessons</p>
                    <p className="text-xl sm:text-3xl font-bold text-purple-600">{totalLessons}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white p-3 sm:p-6 border border-orange-100 dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Level</p>
                    <p className="text-lg sm:text-2xl font-bold text-orange-600">{course.level}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>



          {/* Course Sections */}
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, sectionIndex) => (
              <Card key={section.id} className="overflow-hidden border border-gray-200 shadow-md">
                <CardHeader
                  className="cursor-pointer p-4 sm:p-6"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border dark:border-blue-500 rounded-xl flex items-center justify-center dark:text-white font-bold text-xs sm:text-sm flex-shrink-0">
                        {sectionIndex + 1}
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                        {section.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 text-xs sm:text-sm px-2 py-1">
                        <span className="hidden sm:inline">{section.items.length} lessons</span>
                        <span className="sm:hidden">{section.items.length}</span>
                      </Badge>
                      {section.isOpen ? (
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {section.isOpen && (
                  <CardContent className="pt-0 px-4 sm:px-6">
                    <div className="space-y-3 sm:space-y-4">
                      {section.items.map((item, itemIndex) => {
                        const overallIndex = sections
                          .slice(0, sectionIndex)
                          .reduce((acc, s) => acc + s.items.length, 0) + itemIndex + 1;

                        return (
                          <Card
                            key={item.id}
                            className={cn(
                              "transition-all duration-300 hover:shadow-xl sm:hover:scale-[1.01] border cursor-pointer",
                              item.completed
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg  dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800'
                                : 'bg-white border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-750'
                            )}
                            onClick={() => setActiveItem(item.id)}
                          >
                            <CardContent className="p-4 sm:p-6">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-between">
                                <div className="flex items-start sm:items-center space-x-3 sm:space-x-6 flex-1 w-full sm:w-auto">
                                  {/* Enhanced Completion Icon */}
                                  <div className={cn(
                                    "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 flex-shrink-0",
                                    item.completed
                                      ? 'bg-green-500 text-white '
                                      : 'bg-blue-500 text-white'
                                  )}>
                                    {item.completed ? (
                                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                    ) : (
                                      <span className="font-bold text-base sm:text-lg">{overallIndex}</span>
                                    )}
                                  </div>

                                  {/* Enhanced Content */}
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2 leading-tight">
                                      {item.title}
                                    </h3>

                                    {/* Lesson Preview */}
                                    {item.content && (
                                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                        {item.content.split('\n')[0]}
                                      </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
                                      {/* <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 px-2 sm:px-3 py-1 rounded-full">
                                        <Clock className="h-3 w-3 text-blue-600" />
                                        <span className="font-medium text-blue-700 dark:text-blue-300 text-xs sm:text-sm">25 min</span>
                                      </div> */}
                                      {
                                        course.video && itemIndex === 0 && sectionIndex === 0 ? (
                                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-medium text-xs">
                                            video
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-300 font-medium text-xs">
                                            article
                                          </Badge>
                                        )
                                      }
                                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs font-medium">
                                        {course.level.toLowerCase()}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {/* Enhanced Action Section */}
                                <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4 w-full sm:w-auto">
                                  {item.completed && (
                                    <Badge className="bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                                      <span className="">✨ COMPLETED</span>
                                      <span className="sm:hidden">✓</span>
                                    </Badge>
                                  )}
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className={cn(
                                        "p-2 sm:p-3 rounded-full transition-all duration-300 sm:hover:scale-110",
                                        item.completed
                                          ? 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30'
                                          : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                                      )}
                                      asChild
                                    >
                                      <Link href={`/courses/${course.id}`}>
                                        <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                                      </Link>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-gray-600 hover:text-gray-900 p-2"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCompletion(item.id);
                                      }}
                                    >
                                      {item.completed ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />

                                      ) : (
                                        <Circle className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}

            {/* Enhanced Final Assessment Card */}
            {course?.finalExam && (
              <Card className={cn(
                "shadow-xl hover:shadow-2xl transition-all duration-300 sm:hover:scale-[1.01]",
                examUnlocked
                  ? "bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-purple-200 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-purple-950/20 dark:border-purple-800"
                  : "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-gray-300 dark:from-gray-900/20 dark:via-gray-800/20 dark:to-gray-900/20 dark:border-gray-700 opacity-75"
              )}>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full sm:w-auto">
                      <div className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0",
                        examUnlocked
                          ? "bg-purple-600 text-white"
                          : "bg-gray-400 text-gray-200"
                      )}>
                        {examUnlocked ? (
                          course.finalExam.completed ? <Trophy className="h-6 w-6" /> : totalLessons + 1
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-bold text-lg sm:text-xl mb-2 leading-tight",
                          examUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                        )}>
                          {course.finalExam.title || "Comprehensive Knowledge Assessment"}
                        </h3>

                        {!examUnlocked && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            Complete all lessons to unlock the final exam
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
                          <div className={cn(
                            "flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full",
                            examUnlocked
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : "bg-gray-100 dark:bg-gray-800/30"
                          )}>
                            <Clock className={cn(
                              "h-3 w-3",
                              examUnlocked ? "text-purple-600" : "text-gray-400"
                            )} />
                            <span className={cn(
                              "font-medium text-xs sm:text-sm",
                              examUnlocked
                                ? "text-purple-700 dark:text-purple-300"
                                : "text-gray-500 dark:text-gray-400"
                            )}>45 min</span>
                          </div>

                          {course.finalExam.questions && (
                            <Badge className={cn(
                              "font-medium text-xs sm:text-sm",
                              examUnlocked
                                ? "bg-pink-500 text-white"
                                : "bg-gray-400 text-gray-200"
                            )}>
                              {course.finalExam.questions.length} Questions
                            </Badge>
                          )}

                          <Badge variant="outline" className={cn(
                            "text-xs font-medium",
                            examUnlocked
                              ? "bg-pink-50 text-pink-700 border-pink-200"
                              : "bg-gray-50 text-gray-500 border-gray-300"
                          )}>
                            {course.finalExam.passingScore || 70}% to pass
                          </Badge>

                          {course.finalExam.completed && (
                            <Badge className="bg-green-500 text-white font-medium text-xs sm:text-sm animate-pulse">
                              ✓ Completed
                            </Badge>
                          )}

                          {examUnlocked && !course.finalExam.completed && (
                            <Badge className="bg-yellow-500 text-white font-medium text-xs sm:text-sm animate-bounce">
                              🎯 Ready to Take!
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "p-2 sm:p-3 rounded-full transition-all duration-300 sm:hover:scale-110 self-end sm:self-auto",
                        examUnlocked
                          ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                          : "text-gray-400 cursor-not-allowed"
                      )}
                      disabled={!examUnlocked}
                      asChild={examUnlocked}
                    >
                      {examUnlocked ? (
                        <Link href={`/courses/${course.id}?exam=true`}>
                          <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                      ) : (
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>

                  {/* Progress indicator for exam unlock */}
                  {!examUnlocked && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progress to unlock exam</span>
                        <span>{completedLessons}/{totalLessons} lessons</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}