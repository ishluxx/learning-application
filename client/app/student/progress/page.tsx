"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award,
  Star,
  BarChart2,
  Clock,
  Calendar,
  CheckCircle2,
  BrainCircuit
} from "lucide-react"
import { useState, useEffect } from "react"
import AIChatIcon from "@/components/ai/page"

export default function ProgressPage() {
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

  const subjects = [
    {
      name: "Mathematics",
      progress: 85,
      grade: "A",
      achievements: 12,
      nextMilestone: "Advanced Calculus",
      recentActivity: "Completed Complex Numbers Quiz",
      studyTime: "28h 45m",
      strengths: ["Problem Solving", "Analytical Thinking"],
      areas: ["Geometric Proofs"]
    },
    {
      name: "Physics",
      progress: 78,
      grade: "A-",
      achievements: 8,
      nextMilestone: "Quantum Mechanics",
      recentActivity: "Submitted Lab Report",
      studyTime: "24h 30m",
      strengths: ["Lab Work", "Theoretical Knowledge"],
      areas: ["Wave Mechanics"]
    },
    {
      name: "Computer Science",
      progress: 92,
      grade: "A+",
      achievements: 15,
      nextMilestone: "Advanced Algorithms",
      recentActivity: "Completed Project Phase 1",
      studyTime: "32h 15m",
      strengths: ["Programming", "Problem Solving"],
      areas: ["Database Design"]
    }
  ]

  const milestones = [
    {
      title: "Complete Advanced Math Course",
      progress: 85,
      dueDate: "2025-09-01",
      status: "In Progress"
    },
    {
      title: "Physics Lab Excellence",
      progress: 70,
      dueDate: "2025-08-15",
      status: "In Progress"
    },
    {
      title: "Programming Portfolio",
      progress: 90,
      dueDate: "2025-08-30",
      status: "Near Completion"
    }
  ]

  const recentAchievements = [
    {
      title: "Perfect Score",
      description: "Achieved 100% in Algorithm Design",
      date: "2025-08-05",
      points: 500
    },
    {
      title: "Quick Learner",
      description: "Completed Physics Module ahead of schedule",
      date: "2025-08-03",
      points: 300
    },
    {
      title: "Problem Solver",
      description: "Solved 50 complex math problems",
      date: "2025-08-01",
      points: 400
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500'
      case 'near completion':
        return 'bg-blue-500'
      case 'in progress':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const calculateOverallProgress = () => {
    return subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length
  }
  
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
        <div className="flex flex-1 flex-col">
           <AIChatIcon />
          <div className="@container/main flex flex-1 flex-col gap-4 p-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(calculateOverallProgress())}%</div>
                  <Progress value={calculateOverallProgress()} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85.5h</div>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    This month's total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,200</div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Level 8 • 300 to next level
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15 Days</div>
                  <Progress value={100} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Personal best!
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your learning progress this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {subjects.map(subject => (
                          <div key={subject.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="text-sm font-medium">{subject.name}</div>
                                <div className="text-sm text-muted-foreground">{subject.recentActivity}</div>
                              </div>
                              <Badge>{subject.grade}</Badge>
                            </div>
                            <Progress value={subject.progress} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Analytics</CardTitle>
                      <CardDescription>Your study patterns and achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Study Sessions</div>
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-sm text-muted-foreground">This week</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Time Invested</div>
                            <div className="text-2xl font-bold">12.5h</div>
                            <div className="text-sm text-muted-foreground">Average per week</div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Peak Performance Times</div>
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 7 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-8 rounded-sm ${
                                  [2, 3, 5].includes(i) ? 'bg-primary' : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Most productive on Tue, Wed, and Fri
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="subjects" className="space-y-4">
                {subjects.map(subject => (
                  <Card key={subject.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{subject.name}</CardTitle>
                          <CardDescription>Current Progress and Performance</CardDescription>
                        </div>
                        <Badge variant="secondary">{subject.grade}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Course Progress</div>
                          <div className="text-sm text-muted-foreground">{subject.progress}%</div>
                        </div>
                        <Progress value={subject.progress} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Strengths</div>
                          <div className="space-y-1">
                            {subject.strengths.map(strength => (
                              <div key={strength} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Areas for Growth</div>
                          <div className="space-y-1">
                            {subject.areas.map(area => (
                              <div key={area} className="flex items-center gap-2">
                                <BrainCircuit className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                {milestones.map((milestone, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{milestone.title}</CardTitle>
                        <Badge variant="outline">{milestone.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-muted-foreground">Progress</div>
                          <div className="text-sm font-medium">{milestone.progress}%</div>
                        </div>
                        <Progress value={milestone.progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Due: {milestone.dueDate}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{achievement.title}</div>
                            <Badge variant="secondary">+{achievement.points} pts</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Achieved on {achievement.date}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
