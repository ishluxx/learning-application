"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Pencil, Phone, Mail, X, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

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

export default function ProfilePage() {
  const [studentName] = useState("Student Name")
  const [editingContact, setEditingContact] = useState(false)
  const [editingPhone, setEditingPhone] = useState("")
  const [editingEmail, setEditingEmail] = useState("")
  const [originalPhone, setOriginalPhone] = useState("+1 234 567 890")
  const [originalEmail, setOriginalEmail] = useState("student@example.com")
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatars/shadcn.jpg")
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingImage(true)
      // Create a URL for the uploaded file
      const objectUrl = URL.createObjectURL(file)
      setAvatarUrl(objectUrl)
      setIsUploadingImage(false)
      
      // Here you would typically upload the file to your server
      // const formData = new FormData()
      // formData.append('avatar', file)
      // await fetch('/api/upload-avatar', { method: 'POST', body: formData })
    }
  }

  const handleCancel = () => {
    setEditingPhone(originalPhone)
    setEditingEmail(originalEmail)
    setEditingContact(false)
  }

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setOriginalPhone(editingPhone)
    setOriginalEmail(editingEmail)
    setEditingContact(false)
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
          <div className="@container/main flex flex-1 flex-col gap-4 p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Profile Overview Card */}
              <Card className="lg:col-span-4">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback 
                          style={{ backgroundColor: stringToColor(studentName) }}
                          className="text-lg font-semibold"
                        >
                          {getInitials(studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <label 
                          htmlFor="avatar-upload" 
                          className="cursor-pointer text-white text-sm font-medium hover:underline"
                        >
                          Change Photo
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{studentName}</CardTitle>
                      <p className="text-sm text-muted-foreground">Student ID: ST12345</p>
                    </div>
                    <Badge variant="secondary">Computer Science</Badge>
                    {isUploadingImage ? (
                      <Button variant="outline" size="sm" className="gap-2" disabled>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </Button>
                    ) : (
                      <label htmlFor="avatar-upload">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <div>
                            <Pencil className="h-4 w-4" />
                            Edit Profile Picture
                          </div>
                        </Button>
                      </label>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Contact Information</h4>
                        <div className="flex gap-1">
                          {editingContact ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSave}
                                className="text-green-500 hover:text-green-600 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingEmail(originalEmail)
                                setEditingPhone(originalPhone)
                                setEditingContact(true)
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        {editingContact ? (
                          <>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={editingEmail}
                                onChange={(e) => setEditingEmail(e.target.value)}
                                className="h-8"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={editingPhone}
                                onChange={(e) => setEditingPhone(e.target.value)}
                                className="h-8"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{originalEmail}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{originalPhone}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Academic Status</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-40 cursor-not-allowed"
                          title="Only administrators can edit academic status"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator className="my-2" />
                      <div className="space-y-2">
                        <p className="text-sm">Year: 2nd Year</p>
                        <p className="text-sm">GPA: 3.8/4.0</p>
                        <p className="text-sm">Credits: 60/120</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Progress & Reports */}
              <div className="lg:col-span-8">
                <Tabs defaultValue="progress" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="progress" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Academic Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Current Semester Progress */}
                          <div>
                            <h4 className="text-sm font-medium">Current Semester</h4>
                            <Separator className="my-2" />
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="p-4">
                                <p className="text-sm font-medium">Courses Enrolled</p>
                                <p className="text-2xl font-bold">5</p>
                              </Card>
                              <Card className="p-4">
                                <p className="text-sm font-medium">Completion Rate</p>
                                <p className="text-2xl font-bold">85%</p>
                              </Card>
                            </div>
                          </div>

                          {/* Course List */}
                          <div>
                            <h4 className="text-sm font-medium">Current Courses</h4>
                            <Separator className="my-2" />
                            <div className="space-y-2">
                              {[
                                { name: "Data Structures", progress: "90%", grade: "A" },
                                { name: "Web Development", progress: "85%", grade: "B+" },
                                { name: "Algorithm Analysis", progress: "75%", grade: "B" },
                                { name: "Database Systems", progress: "95%", grade: "A+" },
                                { name: "Software Engineering", progress: "80%", grade: "A-" },
                              ].map((course) => (
                                <Card key={course.name} className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{course.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Progress: {course.progress}
                                      </p>
                                    </div>
                                    <Badge>{course.grade}</Badge>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reports" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Academic Reports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Semester Reports */}
                          {[
                            { semester: "Fall 2024", gpa: "3.8", credits: "15" },
                            { semester: "Spring 2024", gpa: "3.9", credits: "15" },
                            { semester: "Fall 2023", gpa: "3.7", credits: "15" },
                            { semester: "Spring 2023", gpa: "3.8", credits: "15" },
                          ].map((report) => (
                            <Card key={report.semester} className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{report.semester}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Credits: {report.credits}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">GPA</p>
                                  <p className="text-2xl font-bold">{report.gpa}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="achievements" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Academic Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Achievement List */}
                          {[
                            { title: "Dean's List", date: "Fall 2024", description: "Outstanding academic performance" },
                            { title: "Programming Competition", date: "Spring 2024", description: "First place in university hackathon" },
                            { title: "Research Award", date: "Fall 2023", description: "Best undergraduate research project" },
                          ].map((achievement) => (
                            <Card key={achievement.title} className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{achievement.title}</p>
                                  <Badge variant="outline">{achievement.date}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.description}
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
