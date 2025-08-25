"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  BadgeCheck,
  Calendar,
  ChartBar,
  Award,
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts"

// Mock Data
const performanceData = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 92 },
  { month: "Apr", score: 88 },
  { month: "May", score: 95 },
  { month: "Jun", score: 90 },
];

const attendanceData = [
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 92 },
  { month: "Mar", rate: 98 },
  { month: "Apr", rate: 94 },
  { month: "May", rate: 96 },
  { month: "Jun", rate: 97 },
];

const subjects = [
  { name: "Mathematics", grade: "A", score: 92, status: "Excellent" },
  { name: "Physics", grade: "A-", score: 88, status: "Good" },
  { name: "Computer Science", grade: "A+", score: 96, status: "Outstanding" },
  { name: "English", grade: "B+", score: 85, status: "Good" },
];

const glass = "backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]";

export default function Report() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="min-h-dvh w-full bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { label: "Overall GPA", value: "3.92", icon: GraduationCap },
                { label: "Courses Completed", value: "12/15", icon: BookOpen },
                { label: "Attendance Rate", value: "95%", icon: Clock },
                { label: "Total Credits", value: "45", icon: Award },
              ].map((stat) => (
                <Card key={stat.label} className={glass}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                        <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Academic Performance */}
              <Card className={glass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="h-5 w-5" />
                    Academic Performance
                  </CardTitle>
                  <CardDescription>Monthly academic progress tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.34} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#6366f1"
                          fill="url(#scoreGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Chart */}
              <Card className={glass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Attendance Overview
                  </CardTitle>
                  <CardDescription>Monthly attendance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject Performance */}
            <Card className={`${glass} mb-6`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subject Performance
                </CardTitle>
                <CardDescription>Detailed breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {subjects.map((subject) => (
                    <div key={subject.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{subject.status}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-semibold">{subject.grade}</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{subject.score}%</p>
                        </div>
                      </div>
                      <Progress value={subject.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Study Time */}
              <Card className={glass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Study Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Average</span>
                      <span className="font-semibold">4.5 hours</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Total</span>
                      <span className="font-semibold">31.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className={glass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Perfect Attendance</span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Top Performer</span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className={glass}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Semester Progress</span>
                        <span className="font-semibold">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Course Completion</span>
                        <span className="font-semibold">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
