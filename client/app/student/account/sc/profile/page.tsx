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
import AIChatIcon from "@/components/ai/page"

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

export default function Profile() {
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
      const objectUrl = URL.createObjectURL(file)
      setAvatarUrl(objectUrl)
      setIsUploadingImage(false)
    }
  }

  const handleCancel = () => {
    setEditingPhone(originalPhone)
    setEditingEmail(originalEmail)
    setEditingContact(false)
  }

  const handleSave = () => {
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
               <AIChatIcon />
              {/* Profile Overview */}
              <Card className="lg:col-span-12">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback style={{ backgroundColor: stringToColor(studentName) }}>
                          {getInitials(studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <label htmlFor="avatar-upload">
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                        >
                          <Pencil className="h-4 w-4" />
                          
                        </Button>
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">{studentName}</h3>
                      <p className="text-sm text-muted-foreground">Student ID: ST12345</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {editingContact ? (
                          <Input
                            value={editingPhone}
                            onChange={(e) => setEditingPhone(e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          <span>{originalPhone}</span>
                        )}
                      </div>
                      {!editingContact && (
                        <Button variant="ghost" size="icon" onClick={() => setEditingContact(true)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {editingContact ? (
                          <Input
                            value={editingEmail}
                            onChange={(e) => setEditingEmail(e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          <span>{originalEmail}</span>
                        )}
                      </div>
                      {!editingContact && (
                        <Button variant="ghost" size="icon" onClick={() => setEditingContact(true)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {editingContact && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Check className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive email updates about your courses</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Privacy Settings</h4>
                          <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                    </div>
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

