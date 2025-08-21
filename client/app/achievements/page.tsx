"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Medal,
  Star,
  Sparkles,
  Crown,
  BadgeCheck,
  Award,
  TrendingUp,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AppSidebar } from "@/components/student/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/student/site-header";

// --------------------
// Mock Data
// --------------------
const progressData = [
  { week: "W1", points: 120 },
  { week: "W2", points: 190 },
  { week: "W3", points: 260 },
  { week: "W4", points: 320 },
  { week: "W5", points: 410 },
  { week: "W6", points: 520 },
  { week: "W7", points: 650 },
];

const badges = [
  { id: 1, label: "First 100pts", icon: Star },
  { id: 2, label: "Streak 7", icon: BadgeCheck },
  { id: 3, label: "Quiz Master", icon: Trophy },
  { id: 4, label: "Course Finisher", icon: Medal },
  { id: 5, label: "Security Basics", icon: ShieldCheck },
];

const certificates = [
  { id: 1, title: "Frontend Fundamentals", issued: "Aug 2025" },
  { id: 2, title: "Data Structures I", issued: "Jul 2025" },
  { id: 3, title: "UI/UX Foundations", issued: "Jun 2025" },
];

const courses = [
  { id: 1, title: "JavaScript Fundamentals", progress: 100 },
  { id: 2, title: "Data Structures I", progress: 64 },
  { id: 3, title: "UI/UX Foundations", progress: 92 },
  { id: 4, title: "React Basics", progress: 45 },
];

// --------------------
// Styling Helpers
// --------------------
const glass =
  "backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]";

const gradientText =
  "bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 bg-clip-text text-transparent";

const glowBadge =
  "relative isolate before:absolute before:inset-0 before:rounded-2xl before:blur-xl before:opacity-70 before:bg-gradient-to-br before:from-indigo-500/30 before:to-fuchsia-500/30";

const flipBase =
  "[transform-style:preserve-3d] group perspective overflow-visible";

// --------------------
// Component
// --------------------
export default function StudentAchievementPage() {
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
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
            {/* Profile & KPIs */}
            <Card className={`${glass} rounded-3xl`}>
              <CardHeader className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-4 ring-white/60 dark:ring-white/10 shadow-lg">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=odegaard" alt="Student avatar" />
                      <AvatarFallback>OK</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl font-bold tracking-tight">
                        <span className={gradientText}>Odegaard Kamirioni</span>
                      </CardTitle>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">You&apos;re on a 18-day streak!</span>
                  </motion.div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Completed Courses", value: 8, icon: BookOpen },
                    { label: "Certificates", value: 3, icon: Award },
                    { label: "Badges", value: 14, icon: Crown },
                    { label: "Total Points", value: 1195, icon: TrendingUp },
                  ].map((kpi) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      <div className={`rounded-2xl p-4 ${glass} flex items-center gap-3`}>
                        <kpi.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <div className="text-xl font-semibold">{kpi.value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{kpi.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardHeader>

              {/* Courses Section */}
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> Your Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className={`rounded-2xl p-4 ${glass}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-sm font-semibold">{course.progress}%</span>
                      </div>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <Progress value={course.progress} className="h-3 overflow-hidden rounded-full" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <Card className={`${glass} rounded-3xl`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Weekly Learning Points
                </CardTitle>
                <CardDescription>Consistent growth over the last 7 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="week" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12 }} />
                      <Area type="monotone" dataKey="points" stroke="#6366f1" fill="url(#pointsGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges & Certificates */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
            {/* Badges */}
            <Card className={`${glass} rounded-3xl`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" /> Unlocked Badges
                </CardTitle>
                <CardDescription>Shiny milestones that glow when you hover ✨</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badges.map((b, i) => (
                    <motion.li
                      key={b.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <div
                        className={`${glass} ${glowBadge} rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-2xl transition-shadow`}
                      >
                        <b.icon className="h-7 w-7 mb-2 drop-shadow" />
                        <span className="text-sm font-medium">{b.label}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Certificates (Flip Cards) */}
            <Card className={`${glass} rounded-3xl`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5" /> Certificates Earned
                </CardTitle>
                <CardDescription>Hover or tap to flip each certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {certificates.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.05 }}
                      className={`group ${flipBase}`}
                    >
                      <div className={`relative h-48 rounded-2xl ${glass} p-4 transition-transform duration-500 [transform:rotateY(0deg)] group-hover:[transform:rotateY(180deg)]`}>
                        {/* Front */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between [backface-visibility:hidden]">
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-semibold">Certificate</span>
                          </div>
                          <div>
                            <div className="text-lg font-bold leading-tight">{c.title}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Issued {c.issued}</div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600/90 to-purple-600/90 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <Trophy className="h-7 w-7 mb-2" />
                          <p className="text-sm text-center">Verified by E-Learning Platform • Share to LinkedIn</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Level Up Tips */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className={`lg:col-span-2 ${glass} rounded-3xl`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Level Up Tips
                </CardTitle>
                <CardDescription>Quick wins to boost your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Complete 1 practice test daily",
                  "Join a weekend study sprint",
                  "Claim your certificate on LinkedIn",
                  "Aim for a 7-day streak this week",
                ].map((tip) => (
                  <div key={tip} className={`rounded-xl p-3 ${glass} flex items-center gap-3`}>
                    <Star className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
                <Button className="w-full rounded-full">Start Today’s Challenge</Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className={`${glass} rounded-3xl`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> Quick Stats
                </CardTitle>
                <CardDescription>Snapshot of your journey</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className={`rounded-xl p-3 ${glass} flex items-center justify-between`}>
                  <span className="text-sm">Daily Average</span>
                  <span className="font-semibold">85 pts</span>
                </div>
                <div className={`rounded-xl p-3 ${glass} flex items-center justify-between`}>
                  <span className="text-sm">Longest Streak</span>
                  <span className="font-semibold">21 days</span>
                </div>
                <div className={`rounded-xl p-3 ${glass} flex items-center justify-between`}>
                  <span className="text-sm">Active Courses</span>
                  <span className="font-semibold">2</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="py-10" />
        </section>
      </main>
     </SidebarInset>
    </SidebarProvider>
  );
}