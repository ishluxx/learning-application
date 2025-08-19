"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  FileText, 
  Filter, 
  BarChart, 
  TrendingUp, 
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  Star
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { format } from "date-fns"
import { useState, useEffect } from "react"
import AIChatIcon from "@/components/ai/page"
import { Progress } from "@radix-ui/react-progress"

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 65%, 85%)`
}

export default function ReportPage() {
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  
  const reports = [
    {
      id: "REP001",
      subject: "Mathematics",
      type: "Progress Report",
      date: "2025-08-01",
      grade: "A",
      score: 92,
      status: "Available",
      highlights: ["Excellent problem-solving skills", "Strong analytical thinking"]
    },
    {
      id: "REP002",
      subject: "Physics",
      type: "Mid-term Report",
      date: "2025-07-15",
      grade: "A-",
      score: 88,
      status: "Available",
      highlights: ["Good theoretical understanding", "Lab work needs improvement"]
    },
    {
      id: "REP003",
      subject: "Computer Science",
      type: "Final Report",
      date: "2025-06-30",
      grade: "A+",
      score: 96,
      status: "Available",
      highlights: ["Outstanding coding skills", "Excellent project delivery"]
    }
  ]

  const handleDownload = async (reportId: string) => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Downloading report ${reportId}`)
    } catch (error) {
      console.error("Error downloading report:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (reportId: string) => {
    try {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Viewing report ${reportId}`)
    } catch (error) {
      console.error("Error viewing report:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = reports.filter(report => 
    subjectFilter === "all" || 
    report.subject.toLowerCase() === subjectFilter.replace("math", "mathematics")
  )
  
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
            {/* Overview Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.92</div>
                  {/* <Progress value={progress} className="mt-2" /> */}
                  <p className="text-xs text-muted-foreground mt-2">
                    Top 5% of class
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/15</div>
                  <Progress value={80} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    3 courses remaining
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Achievement Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,945</div>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    +145 points this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Next Assessment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3 Days</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Physics Mid-term
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Academic Reports */}
              <Card className="lg:col-span-12">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Academic Reports</CardTitle>
                      <CardDescription>View and download your academic reports</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="icon"
                        disabled={loading}
                        onClick={() => setSubjectFilter("all")}
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredReports.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground">
                        No reports found for the selected subject
                      </div>
                    ) : (
                      filteredReports.map((report) => (
                        <Card key={report.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="text-sm font-medium">{report.subject}</h4>
                                <p className="text-sm text-muted-foreground">{report.type}</p>
                              </div>
                              <Badge variant="secondary" className="px-3">
                                {report.grade}
                              </Badge>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                              <div>
                                <div className="text-sm font-medium mb-2">Performance Score</div>
                                <Progress value={report.score} className="h-2" />
                                <div className="mt-1 text-xs text-muted-foreground text-right">
                                  {report.score}%
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-2">Key Highlights</div>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {report.highlights.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={loading}
                                onClick={() => handleView(report.id)}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button 
                                size="sm"
                                disabled={loading}
                                onClick={() => handleDownload(report.id)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
