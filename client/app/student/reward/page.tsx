"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Gift, Crown, Medal, Target, Award } from "lucide-react"
import { useState } from "react"
import { Progress } from "@radix-ui/react-progress"
import AIChatIcon from "@/components/ai/page"

interface Reward {
  id: number
  title: string
  description: string
  points: number
  icon: React.ElementType
  status: 'locked' | 'unlocked' | 'claimed'
  progress: number
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("available")
  
  const rewards: Reward[] = [
    {
      id: 1,
      title: "Perfect Attendance",
      description: "Attend all classes for a month",
      points: 500,
      icon: Star,
      status: 'unlocked',
      progress: 80
    },
    {
      id: 2,
      title: "Top Performer",
      description: "Score above 90% in assignments",
      points: 1000,
      icon: Crown,
      status: 'locked',
      progress: 65
    },
    {
      id: 3,
      title: "Achievement Hunter",
      description: "Complete all module challenges",
      points: 750,
      icon: Trophy,
      status: 'claimed',
      progress: 100
    },
    {
      id: 4,
      title: "Team Player",
      description: "Participate in 5 group projects",
      points: 600,
      icon: Medal,
      status: 'unlocked',
      progress: 40
    }
  ]

  const getStatusColor = (status: Reward['status']) => {
    switch (status) {
      case 'locked':
        return 'text-muted-foreground'
      case 'unlocked':
        return 'text-primary'
      case 'claimed':
        return 'text-green-500'
      default:
        return 'text-muted-foreground'
    }
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
            {/* Header with stats */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Rewards</h1>
                <p className="text-muted-foreground">Track your achievements and claim rewards</p>
              </div>
              <div className="flex items-center gap-4">
                <Card className="p-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-semibold">2,450 Points</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Tabs for filtering rewards */}
            <Tabs defaultValue="available" className="space-y-4">
              <TabsList>
                <TabsTrigger value="available" onClick={() => setActiveTab("available")}>
                  Available
                </TabsTrigger>
                <TabsTrigger value="claimed" onClick={() => setActiveTab("claimed")}>
                  Claimed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {rewards.filter(reward => reward.status !== 'claimed').map((reward) => (
                    <Card key={reward.id} className="relative overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <reward.icon className={`h-8 w-8 ${getStatusColor(reward.status)}`} />
                          <Badge variant={reward.status === 'locked' ? 'secondary' : 'default'}>
                            {reward.points} Points
                          </Badge>
                        </div>
                        <CardTitle className="mt-4">{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{reward.progress}%</span>
                          </div>
                          <Progress value={reward.progress} className="h-2" />
                          <Button 
                            className="w-full mt-4" 
                            variant={reward.status === 'unlocked' ? 'default' : 'secondary'}
                            disabled={reward.status === 'locked'}
                          >
                            {reward.status === 'locked' ? 'Locked' : 'Claim Reward'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="claimed" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {rewards.filter(reward => reward.status === 'claimed').map((reward) => (
                    <Card key={reward.id} className="relative overflow-hidden">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <reward.icon className="h-8 w-8 text-green-500" />
                          <Badge variant="outline" className="text-green-500">
                            Claimed
                          </Badge>
                        </div>
                        <CardTitle className="mt-4">{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Earned Points</span>
                            <span>{reward.points}</span>
                          </div>
                          <Progress value={100} className="h-2 bg-green-100">
                            <div className="h-full bg-green-500" style={{ width: '100%' }} />
                          </Progress>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
