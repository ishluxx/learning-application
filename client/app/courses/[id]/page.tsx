'use client'

import { useState, use } from "react"
import { ChevronDown, ChevronRight, Check, Circle, ArrowLeft, ArrowRight, Play, Pause, Volume2, Maximize, Settings, Eye, Heart, Share, Download, MessageCircle, Bell, BookmarkPlus, MoreHorizontal } from "lucide-react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { coursesData, Course, CourseSection, CourseItem } from '@/data/courses'

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
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
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

        <div className="flex h-full bg-gray-50 dark:bg-gray-900">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Header Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
                  <Link href={`/courses/${course.id}`} className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Course Overview
                  </Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Player Area */}
            <div className="flex-1 flex">
              {/* Left - Main Video Content */}
              <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Video Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="bg-red-500 text-white mb-2">
                          🔴 LIVE
                        </Badge>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {currentItem?.title || "Modern Web Architecture & Performance"}
                        </h1>
                        <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            ⏱️ 18 min
                          </span>
                          <span className="flex items-center">
                            👁️ 56,420 views
                          </span>
                          <span className="flex items-center">
                            👍 892 likes
                          </span>
                          <span className="flex items-center">
                            ⭐ 4.9
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Player */}
                  <Card className="overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative">
                    <CardContent className="p-0">
                      <div className="relative aspect-video w-full flex items-center justify-center">
                        {/* Video Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-purple-900/50"></div>
                        
                        {/* Play Button */}
                        <Button
                          size="lg"
                          className="relative z-10 w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/50 backdrop-blur-sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-8 w-8 text-white" />
                          ) : (
                            <Play className="h-8 w-8 text-white ml-1" />
                          )}
                        </Button>

                        {/* Video Quality Badge */}
                        <Badge className="absolute top-4 left-4 bg-black/50 text-white">
                          4K Ultra HD
                        </Badge>

                        {/* Live Badge */}
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse">
                          🔴 LIVE
                        </Badge>

                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="w-full bg-white/20 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Control Buttons */}
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center space-x-4">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                <Volume2 className="h-4 w-4" />
                              </Button>
                              <span className="text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                <Maximize className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Objectives */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-300">
                          🎯 What you'll master:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span className="text-sm text-blue-700 dark:text-blue-300">Advanced performance optimization techniques</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <span className="text-sm text-blue-700 dark:text-blue-300">Modern development workflow setup</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <span className="text-sm text-blue-700 dark:text-blue-300">Industry-standard best practices</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                          <span className="text-sm text-blue-700 dark:text-blue-300">Real-world problem-solving approaches</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200 dark:bg-purple-950/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center text-purple-700 dark:text-purple-300">
                          📋 Prerequisites:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-purple-700 dark:text-purple-300">Basic HTML & CSS knowledge</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-purple-700 dark:text-purple-300">JavaScript fundamentals</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-purple-700 dark:text-purple-300">Code editor setup</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-purple-700 dark:text-purple-300">Git version control basics</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Interactive Transcript */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        📝 Interactive Transcript
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500">
                          <span className="text-blue-600 font-mono text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">00:03</span>
                          <p className="text-gray-700 dark:text-gray-300">Welcome to this comprehensive lesson on modern web development...</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">01:35</span>
                          <p className="text-gray-700 dark:text-gray-300">First, let's explore the fundamental concepts that will guide us...</p>
                        </div>
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">03:18</span>
                          <p className="text-gray-700 dark:text-gray-300">Performance optimization is crucial in today's web landscape...</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft size={16} /> Previous Lesson
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageCircle size={16} /> Ask Question
                    </Button>
                    <Button 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => currentItem && toggleCompletion(currentItem.id)}
                    >
                      Review Complete <Check size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Learning Progress */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center">
                        ⚡ Learning Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">20%</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">3 of 15 completed</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Today's Stats */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">📊 Today's Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Time spent</span>
                        <span className="text-sm font-medium">1h 17m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Study streak</span>
                        <span className="text-sm font-medium text-orange-600">🔥 7 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Next milestone</span>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">🏆 Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🥇</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">First Steps</p>
                            <p className="text-xs text-gray-600">Complete your first lesson</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">⚡ Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resources
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Discussion
                      </Button>
                      <Button variant="outline" className="w-full justify-start" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Set Reminder
                      </Button>
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