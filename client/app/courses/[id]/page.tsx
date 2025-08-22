'use client'

import { useState, use } from "react"
import { ChevronDown, ChevronRight, Check, ArrowLeft, Play, Pause, Volume2, Maximize, Settings, Eye, Clock, Users, Star, Award, Target, BookOpen, Trophy, Zap, Menu, X } from "lucide-react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { coursesData, Course, CourseItem, CourseSection } from "@/data/courses"

export default function CourseLearningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const course: Course | undefined = coursesData.find((c: Course) => c.id === params.id)
  const [sections, setSections] = useState<CourseSection[]>(course?.sections || [])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(342) // 6:42 in seconds
  const [duration] = useState(1080) // 18:00 in seconds
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const currentItem: CourseItem | null = sections
    .flatMap(section => section.items)
    .find(item => item.isActive) || null

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">Course not found</h1>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Calculate progress and statistics from actual data
  const totalLessons = sections.flatMap(section => section.items).length || 0
  const completedLessons = sections.flatMap(section => section.items).filter(item => item.completed).length || 0
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Get current lesson position
  const allItems = sections.flatMap(section => section.items)
  const currentItemIndex = allItems.findIndex(item => item.isActive)
  const currentLessonNumber = currentItemIndex >= 0 ? currentItemIndex + 1 : 1

  // Navigation helpers
  const previousItem = currentItemIndex > 0 ? allItems[currentItemIndex - 1] : null
  const nextItem = currentItemIndex < allItems.length - 1 ? allItems[currentItemIndex + 1] : null

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
    // Close mobile sidebar when selecting an item
    setShowMobileSidebar(false)
  }

  const navigateToItem = (item: CourseItem) => {
    setActiveItem(item.id)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / duration) * 100

  // Generate dynamic learning objectives based on course content
  const generateLearningObjectives = (course: Course) => {
    const baseObjectives = [
      `Master ${course.title} fundamentals`,
      `Apply ${course.level.toLowerCase()} level concepts`,
      `Build practical skills in ${course.duration}`,
      `Complete hands-on projects and exercises`
    ]
    return baseObjectives
  }

  // Generate prerequisites based on course level and title
  const generatePrerequisites = (course: Course) => {
    const levelPrereqs = {
      'Beginner': [
        'Basic computer skills',
        'Text editor familiarity',
        'Willingness to learn',
        'Internet connection'
      ],
      'Intermediate': [
        'Programming fundamentals',
        'Development environment setup',
        'Version control basics',
        'Problem-solving skills'
      ],
      'Advanced': [
        'Solid programming foundation',
        'Industry experience preferred',
        'Complex problem-solving skills',
        'Advanced tooling knowledge'
      ]
    }
    return levelPrereqs[course.level as keyof typeof levelPrereqs] || levelPrereqs['Beginner']
  }

  // Calculate study statistics
  const studyStats = {
    timeSpent: '1h 17m', // This could be tracked in real implementation
    studyStreak: Math.min(7 + Math.floor(completedLessons / 5), 30), // Dynamic streak based on progress
    nextMilestone: totalLessons > 0 ? Math.ceil((completedLessons + 1) / totalLessons * 100 / 10) * 10 : 50
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      {/* Desktop Sidebar */}
      <AppSidebar variant="inset" className="hidden lg:flex" />
      
      <SidebarInset>
        <SiteHeader />

        <div className="flex h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Enhanced Header Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 dark:text-white px-3 sm:px-6 py-3 sm:py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                  <Button variant="ghost" asChild className="text-gray-600 dark:text-white p-1 sm:p-2">
                    <Link href={`/courses/${course.id}/overview`} className="flex items-center">
                      <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Course Overview</span>
                      <span className="sm:hidden">Back</span>
                    </Link>
                  </Button>
                  <div className="h-4 sm:h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm dark:text-white min-w-0">
                    <span className="font-medium truncate max-w-[120px] sm:max-w-none">{course.title}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      <span className="sm:hidden">{currentLessonNumber}/{totalLessons}</span>
                      <span className="hidden sm:inline">Lesson {currentLessonNumber} of {totalLessons}</span>
                    </span>
                  </div>
                </div>
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden p-2"
                  onClick={() => setShowMobileSidebar(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Video Player Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left - Main Video Content */}
              <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                <div className="max-w-5xl mx-auto space-y-4 sm:space-y-8">
                  {/* Enhanced Video Header */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          <Badge className="bg-blue-100 text-blue-800 px-2 py-1 text-xs">
                            {course.level}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 px-2 py-1 text-xs">
                            HD Quality
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 px-2 py-1 text-xs">
                            {course.duration}
                          </Badge>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                          {currentItem?.title || `${course.title} - Getting Started`}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                            <span className="font-medium">{formatTime(duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                            <span className="font-medium">{Math.floor(Math.random() * 100000) + 10000} views</span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                            <span className="font-medium">4.{Math.floor(Math.random() * 3) + 7} rating</span>
                          </div>
                          {course.instructor && (
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                              <span className="font-medium truncate max-w-[100px] sm:max-w-none">{course.instructor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Video Player */}
                  <Card className="overflow-hidden shadow-2xl border-0 group">
                    <CardContent className="p-0">
                      <div className="relative aspect-video w-full flex items-center justify-center bg-gray-900">
                        <Button
                          size="lg"
                          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 hover:bg-white/25 border-2 border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white drop-shadow-lg" />
                          ) : (
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white ml-1 drop-shadow-lg" />
                          )}
                        </Button>

                        {/* Enhanced Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {/* Progress Bar */}
                          <div className="mb-3 sm:mb-4 lg:mb-6">
                            <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 cursor-pointer hover:h-2 sm:hover:h-3 transition-all duration-200">
                              <div
                                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-full rounded-full transition-all duration-300 relative"
                                style={{ width: `${progressPercentage}%` }}
                              >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Control Buttons */}
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 sm:p-3 rounded-full">
                                {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 sm:p-3 rounded-full">
                                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                              </Button>
                              <span className="text-xs sm:text-sm font-medium bg-black/30 px-2 py-1 sm:px-3 rounded-full backdrop-blur-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 sm:p-3 rounded-full">
                                <Settings className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 sm:p-3 rounded-full">
                                <Maximize className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Learning Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-gray-300 dark:from-blue-950/20 dark:to-cyan-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl flex items-center text-blue-700 dark:text-blue-300 font-bold">
                          🎯 Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {generateLearningObjectives(course).map((objective, index) => (
                          <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5 shadow-md flex-shrink-0">
                              <span className="text-white text-xs sm:text-sm font-bold">{index + 1}</span>
                            </div>
                            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed">{objective}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-gray-300 dark:from-purple-950/20 dark:to-pink-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl flex items-center text-purple-700 dark:text-purple-300 font-bold">
                          📋 Prerequisites
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        {generatePrerequisites(course).map((prereq, index) => (
                          <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center mt-0.5 shadow-md flex-shrink-0">
                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium leading-relaxed">{prereq}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Interactive Transcript */}
                  <Card className="shadow-lg border-gray-300 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-lg sm:text-xl flex items-center font-bold">
                        📝 Interactive Transcript
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                        <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
                          <span className="text-blue-600 font-mono text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 sm:px-3 sm:py-2 rounded-full font-bold flex-shrink-0">00:03</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Welcome to {course.title}! In this {course.level.toLowerCase()} level course, we&apos;ll explore fundamental concepts over {course.duration}.
                          </p>
                        </div>
                        <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-full font-bold flex-shrink-0">01:35</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {course.instructor} will guide you through practical examples and real-world applications.
                          </p>
                        </div>
                        <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-full font-bold flex-shrink-0">03:18</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {course.description} Let&apos;s dive into the practical techniques and best practices.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Lesson Content */}
                  {currentItem?.content && (
                    <Card className="shadow-lg border-gray-300 hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-lg sm:text-xl flex items-center font-bold">
                          📚 Lesson Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose dark:prose-invert max-w-none prose-sm sm:prose-base">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {currentItem.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Navigation */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto flex border-gray-300 items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 hover:bg-blue-50 hover:border-blue-200 text-sm"
                      onClick={() => previousItem && navigateToItem(previousItem)}
                      disabled={!previousItem}
                    >
                      <ArrowLeft size={14} /> Previous Lesson
                    </Button>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <Button
                        className="w-full sm:w-auto flex items-center gap-2 bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                        onClick={() => currentItem && toggleCompletion(currentItem.id)}
                      >
                        {currentItem?.completed ? 'Mark Incomplete' : 'Mark Complete'} <Check size={14} />
                      </Button>
                      <Button
                        className="w-full sm:w-auto flex items-center gap-2 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                        onClick={() => nextItem && navigateToItem(nextItem)}
                        disabled={!nextItem}
                      >
                        Next Lesson <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Right Sidebar */}
              <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 overflow-y-auto shadow-lg">
                <div className="p-6 space-y-6">
                  {/* Enhanced Learning Progress */}
                  <Card className="shadow-lg border-2 border-blue-100 dark:border-blue-900">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center font-bold">
                        <Zap className="h-5 w-5 mr-2 text-blue-600" />
                        Learning Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          {courseProgress}%
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                            style={{ width: `${courseProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-3 font-medium">
                          {completedLessons} of {totalLessons} lessons completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Playlist/Navigation */}
                  <Card className="shadow-lg border-gray-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                        Course Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                      {sections.map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-2">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-pink-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
                                {sectionIndex + 1}
                              </div>
                              <span className="font-medium text-sm text-left">{section.title}</span>
                            </div>
                            {section.isOpen ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </button>

                          {section.isOpen && (
                            <div className="ml-4 space-y-1">
                              {section.items.map((item, itemIndex) => (
                                <button
                                  key={item.id}
                                  onClick={() => setActiveItem(item.id)}
                                  className={cn(
                                    "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200",
                                    item.isActive
                                      ? "bg-blue-50 border border-blue-200 dark:bg-blue-950/20"
                                      : "hover:bg-gray-50 dark:hover:bg-gray-700",
                                    item.completed && "bg-green-50 dark:bg-green-950/20"
                                  )}
                                >
                                  <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                    item.completed
                                      ? "bg-green-500 text-white"
                                      : item.isActive
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                  )}>
                                    {item.completed ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      itemIndex + 1
                                    )}
                                  </div>
                                  <span className={cn(
                                    "text-sm",
                                    item.isActive && "font-medium text-blue-700 dark:text-blue-300",
                                    item.completed && "text-green-700 dark:text-green-300"
                                  )}>
                                    {item.title}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Enhanced Today's Stats */}
                  <Card className="shadow-lg border border-gray-300 dark:border-green-900">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Today&apos;s Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          Time spent
                        </span>
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{studyStats.timeSpent}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          🔥 Study streak
                        </span>
                        <span className="text-sm font-bold text-orange-600">{studyStats.studyStreak} days</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-purple-500" />
                          Next milestone
                        </span>
                        <span className="text-sm font-bold text-purple-600">{studyStats.nextMilestone}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dynamic Study Tips */}
                  <Card className="shadow-lg border-gray-300 dark:from-indigo-950/20 dark:to-purple-950/20 border-2 dark:border-indigo-800">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center text-indigo-700 dark:text-indigo-300">
                        💡 Study Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                          <strong>
                            {course.level === 'Beginner' && 'Take Your Time:'}
                            {course.level === 'Intermediate' && 'Practice Makes Perfect:'}
                            {course.level === 'Advanced' && 'Deep Dive:'}
                          </strong>{' '}
                          {course.level === 'Beginner' && 'Don\'t rush through the basics. Make sure you understand each concept before moving forward.'}
                          {course.level === 'Intermediate' && 'Apply what you learn immediately. Build small projects to reinforce your understanding.'}
                          {course.level === 'Advanced' && 'Challenge yourself with real-world scenarios and explore beyond the course material.'}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-indigo-600 dark:text-indigo-400">
                          <Star className="h-3 w-3" />
                          <span>Pro tip from {course.instructor || 'our expert instructors'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50" 
                onClick={() => setShowMobileSidebar(false)}
              />
              
              {/* Sidebar */}
              <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Course Content</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Mobile Learning Progress */}
                  <Card className="shadow-lg border-2 border-blue-100 dark:border-blue-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center font-bold">
                        <Zap className="h-4 w-4 mr-2 text-blue-600" />
                        Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          {courseProgress}%
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
                            style={{ width: `${courseProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2 font-medium">
                          {completedLessons} of {totalLessons} completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile Course Content */}
                  <Card className="shadow-lg border-gray-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                        Lessons
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {sections.map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-2">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 bg-pink-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
                                {sectionIndex + 1}
                              </div>
                              <span className="font-medium text-sm text-left">{section.title}</span>
                            </div>
                            {section.isOpen ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </button>

                          {section.isOpen && (
                            <div className="ml-3 space-y-1">
                              {section.items.map((item, itemIndex) => (
                                <button
                                  key={item.id}
                                  onClick={() => setActiveItem(item.id)}
                                  className={cn(
                                    "w-full flex items-center space-x-2 p-2 rounded-lg text-left transition-all duration-200",
                                    item.isActive
                                      ? "bg-blue-50 border border-blue-200 dark:bg-blue-950/20"
                                      : "hover:bg-gray-50 dark:hover:bg-gray-700",
                                    item.completed && "bg-green-50 dark:bg-green-950/20"
                                  )}
                                >
                                  <div className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                                    item.completed
                                      ? "bg-green-500 text-white"
                                      : item.isActive
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                  )}>
                                    {item.completed ? (
                                      <Check className="h-2 w-2" />
                                    ) : (
                                      itemIndex + 1
                                    )}
                                  </div>
                                  <span className={cn(
                                    "text-sm truncate",
                                    item.isActive && "font-medium text-blue-700 dark:text-blue-300",
                                    item.completed && "text-green-700 dark:text-green-300"
                                  )}>
                                    {item.title}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Mobile Stats */}
                  <Card className="shadow-lg border border-gray-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-600" />
                        Today&apos;s Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-2 text-blue-500" />
                          Time spent
                        </span>
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{studyStats.timeSpent}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          🔥 Study streak
                        </span>
                        <span className="text-sm font-bold text-orange-600">{studyStats.studyStreak} days</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Award className="h-3 w-3 mr-2 text-purple-500" />
                          Next milestone
                        </span>
                        <span className="text-sm font-bold text-purple-600">{studyStats.nextMilestone}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile Study Tip */}
                  <Card className="shadow-lg border-gray-300 border-2 dark:border-indigo-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold flex items-center text-indigo-700 dark:text-indigo-300">
                        💡 Study Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                          <strong>
                            {course.level === 'Beginner' && 'Take Your Time:'}
                            {course.level === 'Intermediate' && 'Practice Makes Perfect:'}
                            {course.level === 'Advanced' && 'Deep Dive:'}
                          </strong>{' '}
                          {course.level === 'Beginner' && 'Don\'t rush through the basics. Make sure you understand each concept before moving forward.'}
                          {course.level === 'Intermediate' && 'Apply what you learn immediately. Build small projects to reinforce your understanding.'}
                          {course.level === 'Advanced' && 'Challenge yourself with real-world scenarios and explore beyond the course material.'}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-indigo-600 dark:text-indigo-400">
                          <Star className="h-3 w-3" />
                          <span>Pro tip from {course.instructor || 'our expert instructors'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}