'use client'

import { useState, use } from "react"
import { ChevronDown, ChevronRight, Check, ArrowLeft,  Play, Pause, Volume2, Maximize, Settings, Eye, Share, Download, MessageCircle, Bell, BookmarkPlus, MoreHorizontal, Clock, Users, Star, Award, Target, BookOpen, Trophy, Zap } from "lucide-react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
// import Image from "next/image"
import { cn } from "@/lib/utils"
import AIChatIcon from "@/components/ai/page"

// Course data structure - matches your existing types
export interface CourseItem {
  id: string;
  title: string;
  completed: boolean;
  isActive?: boolean;
  content?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  items: CourseItem[];
  isOpen: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor?: string;
  duration: string;
  level: string;
  image?: string;
  sections?: CourseSection[];
}

// Sample course data matching your structure
const coursesData: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    instructor: 'Jane Smith',
    duration: '4 weeks',
    level: 'Beginner',
    image: '/images/How-to-Learn-ReactJS-in-2021.png',
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        isOpen: true,
        items: [
          { 
            id: "react-intro", 
            title: "Introduction to React", 
            completed: true, 
            isActive: true, 
            content: "Welcome to the Introduction to React! In this lesson, you'll learn what React is, its history, and why it's so popular for building user interfaces. You'll also see real-world examples of React apps and get tips for setting up your first project.\n\nRelated topics: JavaScript frameworks, SPA, Virtual DOM.\nPractical tip: Use Create React App or Vite for quick setup." 
          },
          { 
            id: "react-components", 
            title: "Components & Props", 
            completed: true, 
            content: "Components are the building blocks of React applications. You'll learn how to create functional and class components, pass data using props, and organize your UI into reusable pieces.\n\nRelated topics: Component hierarchy, prop drilling, composition.\nPractical tip: Keep components small and focused for better maintainability." 
          },
          { 
            id: "react-state", 
            title: "State & Lifecycle", 
            completed: false, 
            content: "State allows React components to change their output over time in response to user actions, network responses, and anything else. You'll learn about useState, setState, and lifecycle methods like componentDidMount.\n\nRelated topics: useEffect, local vs global state, state management libraries.\nPractical tip: Use state wisely to avoid unnecessary re-renders." 
          },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Concepts",
        isOpen: true,
        items: [
          { 
            id: "react-hooks", 
            title: "Hooks in Depth", 
            completed: false, 
            content: "Hooks let you use state and other React features in functional components. You'll learn about useState, useEffect, useContext, and how to build custom hooks for reusable logic.\n\nRelated topics: Dependency arrays, custom hooks, rules of hooks.\nPractical tip: Always start custom hook names with 'use' and follow the rules of hooks." 
          },
          { 
            id: "react-context", 
            title: "Context API", 
            completed: false, 
            content: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. You'll learn how to create and use context for global state like themes and authentication.\n\nRelated topics: Provider pattern, useContext, Redux.\nPractical tip: Use context for truly global data, not for every prop." 
          },
        ],
      },
    ]
  }
];

export default function CourseLearningPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const course: Course | undefined = coursesData.find((c: Course) => c.id === params.id)
  const [sections, setSections] = useState<CourseSection[]>(course?.sections || [])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(342) // 6:42 in seconds
  const [duration] = useState(1080) // 18:00 in seconds

  const currentItem: CourseItem | null = sections
    .flatMap(section => section.items)
    .find(item => item.isActive) || null

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Course not found</h1>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalLessons = sections.flatMap(section => section.items).length || 0
  const completedLessons = sections.flatMap(section => section.items).filter(item => item.completed).length || 0
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / duration) * 100

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

        <div className="flex h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          {/* Main Content Area */}
           <AIChatIcon />
          <div className="flex-1 flex flex-col">
            {/* Enhanced Header Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 hover:bg-blue-50">
                    <Link href={`/courses/${course.id}/overview `} className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Course Overview
                    </Link>
                  </Button>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-medium">{course.title}</span>
                    <span>•</span>
                    <span>Lesson {sections.flatMap(s => s.items).findIndex(item => item.isActive) + 1} of {totalLessons}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 border-gray-300 hover:border-blue-200">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-green-50 border-gray-300 hover:border-green-200">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-purple-50 border-gray-300 hover:border-purple-200">
                    <Download className="h-4 w-4 mr-2" />
                    Resources
                  </Button>


                  {/* <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button> */}


                </div>
              </div>
            </div>

            {/* Video Player Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left - Main Video Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-5xl mx-auto space-y-8">
                  {/* Enhanced Video Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">

                          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                            {course.level}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 px-3 py-1">
                            HD Quality
                          </Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                          {currentItem?.title || "Modern Web Architecture & Performance"}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">18 min</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-green-500" />
                            <span className="font-medium">56,420 views</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">4.9 rating</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">{course.instructor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Video Player */}
                  <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative group">
                    <CardContent className="p-0">
                      <div className="relative aspect-video w-full flex items-center justify-center">
                        {/* Dynamic Video Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-900/60 to-purple-900/60">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                        </div>

                        {/* Enhanced Play Button */}
                        <Button
                          size="lg"
                          className="relative z-10 w-24 h-24 rounded-full bg-white/15 hover:bg-white/25 border-2 border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-10 w-10 text-white drop-shadow-lg" />
                          ) : (
                            <Play className="h-10 w-10 text-white ml-1 drop-shadow-lg" />
                          )}
                        </Button>

                        {/* Enhanced Badges */}
                        <Badge className="absolute top-6 left-6 bg-black/60 text-white px-4 py-2 backdrop-blur-sm">
                          4K Ultra HD
                        </Badge>

                        <Badge className="absolute top-6 right-6 bg-red-500/90 text-white px-4 py-2 animate-pulse backdrop-blur-sm">
                          🔴 LIVE
                        </Badge>

                        {/* Enhanced Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {/* Progress Bar */}
                          <div className="mb-6">
                            <div className="w-full bg-white/20 rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200">
                              <div
                                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-full rounded-full transition-all duration-300 relative"
                                style={{ width: `${progressPercentage}%` }}
                              >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"></div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Control Buttons */}
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center space-x-6">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-3 rounded-full">
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-3 rounded-full">
                                <Volume2 className="h-5 w-5" />
                              </Button>
                              <span className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-3 rounded-full">
                                <Settings className="h-5 w-5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-3 rounded-full">
                                <Maximize className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Learning Content Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-gray-300 dark:from-blue-950/20 dark:to-cyan-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl flex items-center text-blue-700 dark:text-blue-300 font-bold">
                          🎯 Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          "Advanced performance optimization techniques",
                          "Modern development workflow setup",
                          "Industry-standard best practices",
                          "Real-world problem-solving approaches"
                        ].map((objective, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-0.5 shadow-md">
                              <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed">{objective}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-gray-300 dark:from-purple-950/20 dark:to-pink-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl flex items-center text-purple-700 dark:text-purple-300 font-bold">
                          📋 Prerequisites
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          "Basic HTML & CSS knowledge",
                          "JavaScript fundamentals",
                          "Code editor setup",
                          "Git version control basics"
                        ].map((prereq, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mt-0.5 shadow-md">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium leading-relaxed">{prereq}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Interactive Transcript */}
                  <Card className="shadow-lg border-gray-300 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center font-bold">
                        📝 Interactive Transcript
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4 text-sm">
                        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
                          <span className="text-blue-600 font-mono text-xs bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-full font-bold">00:03</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Welcome to this comprehensive lesson on modern web development. Today we&apos;ll explore cutting-edge techniques...</p>
                        </div>
                        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full font-bold">01:35</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">First, let&apos;s explore the fundamental concepts that will guide us through this learning journey...</p>
                        </div>
                        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full font-bold">03:18</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Performance optimization is crucial in today&apos;s web landscape. Let&apos;s dive into practical techniques...</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Lesson Content */}
                  {currentItem?.content && (
                    <Card className="shadow-lg border-gray-300 hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center font-bold">
                          📚 Lesson Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {currentItem.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Enhanced Navigation */}
                  <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" className="flex border-gray-300 items-center gap-2 px-6 py-3 hover:bg-blue-50 hover:border-blue-200">
                      <ArrowLeft size={16} /> Previous Lesson
                    </Button>
                    <Button variant="outline" className="flex border-gray-300 items-center gap-2 px-6 py-3 hover:bg-purple-50 hover:border-purple-200">
                      <MessageCircle size={16} /> Ask Question
                    </Button>
                    <Button
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => currentItem && toggleCompletion(currentItem.id)}
                    >
                      Mark Complete <Check size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced Right Sidebar */}
              <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 overflow-y-auto shadow-lg">
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
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center text-white text-xs font-bold">
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
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">1h 17m</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          🔥 Study streak
                        </span>
                        <span className="text-sm font-bold text-orange-600">7 days</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-purple-500" />
                          Next milestone
                        </span>
                        <span className="text-sm font-bold text-purple-600">50%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Achievements */}
                  <Card className="shadow-lg border-gray-300 dark:border-yellow-900">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-lg">🥇</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">First Steps</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">Complete your first lesson</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200 dark:border-blue-800 opacity-60">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white text-lg">🚀</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-blue-800 dark:text-blue-200">Speed Learner</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">Complete 5 lessons in one day</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Quick Actions */}
                  <Card className="shadow-lg border-gray-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-indigo-600" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:border-blue-200 transition-all duration-200" size="sm">
                        <Download className="h-4 w-4 mr-2 text-blue-600" />
                        Download Resources
                      </Button>
                      <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-200 transition-all duration-200" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                        Join Discussion
                      </Button>
                      <Button variant="outline" className="w-full justify-start hover:bg-orange-50 hover:border-orange-200 transition-all duration-200" size="sm">
                        <Bell className="h-4 w-4 mr-2 text-orange-600" />
                        Set Reminder
                      </Button>
                      <Button variant="outline" className="w-full justify-start hover:bg-purple-50 hover:border-purple-200 transition-all duration-200" size="sm">
                        <Share className="h-4 w-4 mr-2 text-purple-600" />
                        Share Progress
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Study Tips */}
                  <Card className="shadow-lg border-gray-300 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-2 dark:border-indigo-800">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold flex items-center text-indigo-700 dark:text-indigo-300">
                        💡 Study Tip
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                          <strong>Active Learning:</strong> Pause the video frequently to practice the concepts you&apos;ve learned.
                          Build small projects to reinforce your understanding.
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-indigo-600 dark:text-indigo-400">
                          <Star className="h-3 w-3" />
                          <span>Pro tip from {course.instructor}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}