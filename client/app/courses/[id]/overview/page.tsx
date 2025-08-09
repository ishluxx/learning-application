'use client'

import { useState, use } from 'react'
import { ArrowLeft, CheckCircle2, Circle, Clock, Users, Star, Play, BookOpen, Award, Target, ChevronDown, ChevronRight, Check, Eye, Heart, Share, Download, MessageCircle, Bell, BookmarkPlus, MoreHorizontal } from 'lucide-react'
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    duration: '6 weeks',
    level: 'Advanced',
    image: '/images/learn_typescipt.jpeg',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        items: [
          { 
            id: "advanced-types", 
            title: "Advanced Types", 
            completed: false, 
            isActive: true, 
            content: "Explore advanced TypeScript types like union, intersection, mapped, and conditional types. Learn how to use them to write safer and more expressive code.\n\nRelated topics: Generics, keyof, typeof, infer.\nPractical tip: Use mapped types for DRY code and conditional types for flexible APIs." 
          },
          { 
            id: "type-guards", 
            title: "Type Guards & Type Predicates", 
            completed: false, 
            content: "Type guards and predicates help you narrow down types within conditional blocks, ensuring type safety and improving code clarity.\n\nRelated topics: typeof, instanceof, custom type guards.\nPractical tip: Use type predicates for complex type checks in large codebases." 
          },
        ],
      },
    ]
  },
];

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
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 hover:text-gray-900 border-gray-300 px-4 py-2 rounded-full font-medium"
              >
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 hover:text-gray-900 border-gray-300 px-4 py-2 rounded-full font-medium"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 hover:text-gray-900 border-gray-300 px-4 py-2 rounded-full font-medium"
              >
                📊 Analytics & Progress
              </Button>
            </div>
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

          {/* Course Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Progress</p>
                    <p className="text-3xl font-bold text-blue-600">{progress}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{completedLessons}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Lessons</p>
                    <p className="text-3xl font-bold text-purple-600">{totalLessons}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Level</p>
                    <p className="text-2xl font-bold text-orange-600">{course.level}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Sections */}
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <Card key={section.id} className="overflow-hidden border border-gray-200 shadow-md">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {sectionIndex + 1}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-gray-50 text-gray-600">
                        {section.items.length} lessons
                      </Badge>
                      {section.isOpen ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {section.isOpen && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => {
                        const overallIndex = sections
                          .slice(0, sectionIndex)
                          .reduce((acc, s) => acc + s.items.length, 0) + itemIndex + 1;
                        
                        return (
                          <Card 
                            key={item.id} 
                            className={cn(
                              "transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border cursor-pointer",
                              item.completed
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-100/50 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800'
                                : 'bg-white border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-750'
                            )}
                            onClick={() => setActiveItem(item.id)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6 flex-1">
                                  {/* Enhanced Completion Icon */}
                                  <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
                                    item.completed
                                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30'
                                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                                  )}>
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
                                    
                                    {/* Lesson Preview */}
                                    {item.content && (
                                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 max-w-2xl">
                                        {item.content.split('\n')[0]}
                                      </p>
                                    )}
                                    
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
                                    className={cn(
                                      "p-3 rounded-full transition-all duration-300 hover:scale-110",
                                      item.completed 
                                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30' 
                                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                                    )}
                                    asChild
                                  >
                                    <Link href={`/courses/${course.id}/learn`}>
                                      <Play className="h-5 w-5" />
                                    </Link>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-gray-600 hover:text-gray-900"
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