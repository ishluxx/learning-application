"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Award, Trophy, Medal, Target, Crown, Book, Zap, Users, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import AIChatIcon from "@/components/ai/page"

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ElementType
  category: 'academic' | 'project' | 'community' | 'skill'
  level: 'bronze' | 'silver' | 'gold'
  progress: number
  isNew?: boolean
}

export default function AchievementPage() {
  const [selectedCategory, setSelectedCategory] = useState<Achievement['category']>('academic')

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Academic Excellence",
      description: "Maintain an average grade of A across all subjects",
      icon: Star,
      category: 'academic',
      level: 'gold',
      progress: 85,
      isNew: true
    },
    {
      id: 2,
      title: "Project Master",
      description: "Complete 10 projects with distinction",
      icon: Trophy,
      category: 'project',
      level: 'silver',
      progress: 60
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Complete daily learning goals for 30 days",
      icon: Zap,
      category: 'skill',
      level: 'gold',
      progress: 100
    },
    {
      id: 4,
      title: "Team Leader",
      description: "Lead 5 successful group projects",
      icon: Users,
      category: 'community',
      level: 'bronze',
      progress: 40
    },
    {
      id: 5,
      title: "Knowledge Explorer",
      description: "Complete all modules in a learning path",
      icon: Book,
      category: 'academic',
      level: 'silver',
      progress: 75
    },
    {
      id: 6,
      title: "Innovation Champion",
      description: "Create an outstanding original project",
      icon: Crown,
      category: 'project',
      level: 'gold',
      progress: 90
    }
  ]

  const getLevelColor = (level: Achievement['level']) => {
    switch (level) {
      case 'bronze':
        return 'text-orange-400'
      case 'silver':
        return 'text-slate-400'
      case 'gold':
        return 'text-yellow-400'
      default:
        return 'text-slate-400'
    }
  }

  const categories = [
    { id: 'academic', label: 'Academic', icon: Book },
    { id: 'project', label: 'Projects', icon: Target },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'skill', label: 'Skills', icon: Award }
  ]
  
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
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Achievements</h1>
                <p className="text-muted-foreground">Track your progress and unlock achievements</p>
              </div>
              <div className="flex items-center gap-4">
                <Card className="p-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Level 12</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="academic" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  {categories.map(category => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      onClick={() => setSelectedCategory(category.id as Achievement['category'])}
                      className="flex items-center gap-2"
                    >
                      <category.icon className="h-4 w-4" />
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements
                      .filter(achievement => achievement.category === category.id)
                      .map((achievement) => (
                        <Card key={achievement.id} className="relative overflow-hidden">
                          {achievement.isNew && (
                            <Badge className="absolute right-4 top-4 bg-primary">New!</Badge>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <achievement.icon className={cn("h-8 w-8", getLevelColor(achievement.level))} />
                              <Badge variant="outline" className={getLevelColor(achievement.level)}>
                                {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                              </Badge>
                            </div>
                            <CardTitle className="mt-4">{achievement.title}</CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                         
                              {achievement.progress === 100 && (
                                <div className="flex items-center justify-center gap-2 mt-4 text-green-500">
                                  <Check className="h-4 w-4" />
                                  <span className="text-sm font-medium">Completed!</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
