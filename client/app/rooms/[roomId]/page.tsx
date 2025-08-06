'use client'

import { act, useState } from "react"
import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {Icons} from "@/components/Icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Icon } from "@radix-ui/react-select"
import { Icon12Hours, IconBell, IconHandThreeFingers, IconMenu2, IconPhoneCall, IconPhoneCalling, IconUpload, IconVideo } from "@tabler/icons-react"
import { BellElectric, LogOut, MoreHorizontal } from "lucide-react"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  Settings2,
  Star,
  Trash,
  Trash2,
} from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = [
  [
    {
      label: "View Members",
      icon: Icons.users,
    },
    {
      label: "Turn off Notification",
      icon: Bell,
    },
  ],
  [
    {
      label: "Settings",
      icon: Settings2,
    },
      {
      label: "View analytics",
      icon: LineChart,
    },
  ],
  [
    {
      label: "Share room",
      icon: Link,
    },
      {
      label: "Leave room",
      icon: LogOut,
    },
  ],
]

const Page = () => {
  const params = useParams()
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const roomId = (params?.roomId as string) ?? 'default-room'
   const [activeTab, setActiveTab] = useState<'chats' | 'events' | 'resources' | 'questions'>('chats');

  const formatRoomTitle = (id: string) => {
    return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const roomDetails = {
    title: `${formatRoomTitle(roomId)} Discussion`,
    description: "Interactive learning space for collaborative discussions and knowledge sharing",
    members: 1243,
    activeNow: 42,
    instructor: {
      name: "Dr. Sarah Johnson",
      avatar: "/avatars/instructor.jpg",
      bio: "Professor of Computer Science with 10+ years teaching experience"
    }
  }

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: {
        name: "Alex Chen",
        avatar: "/avatars/user1.jpg",
        role: "Student"
      },
      content: "Has anyone solved problem #3 from the last assignment? I'm stuck on the recursive function part.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 101,
          user: {
            name: "Maria Garcia",
            avatar: "/avatars/user2.jpg",
            role: "TA"
          },
          content: "I can help with that! The key is to think about the base case first. What's your approach so far?",
          timestamp: "1 hour ago"
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Jamie Smith",
        avatar: "/avatars/user3.jpg",
        role: "Student"
      },
      content: "Just shared my notes on this week's lecture. Let me know if you find them helpful!",
      timestamp: "5 hours ago",
      replies: []
    }
  ])

  const [newPost, setNewPost] = useState("")
    const [isOpen, setIsOpen] = React.useState(true)
  
    React.useEffect(() => {
      setIsOpen(false)
    }, [])

  const handlePost = () => {
    if (!newPost.trim()) return

    const newDiscussion = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "/avatars/current-user.jpg",
        role: "Student"
      },
      content: newPost,
      timestamp: "Just now",
      replies: []
    }

    setDiscussions([newDiscussion, ...discussions])
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#141414]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          { isAudioEnabled &&
            <div className="p-6 w-full h-[100vh] fixed bottom-0 left-0 z-50 flex justify-center flex-col items-center bg-white dark:bg-[#141414]" style={{backdropFilter: 'blur(10px)' }}>
              <h1 className="text-[#141414] dark:text-gray-50 text-2xl mb-2">Wait for other to join</h1>
              <span className="bg-red-500 p-1 w-[50px] h-[50px] rounded-[50%] flex justify-center items-center">
              <IconPhoneCalling onClick={()=>{
                setIsAudioEnabled(false)
              }}/>
              </span>
            </div>
          }
          { isVideoEnabled &&
            <div className="p-6 w-full h-[100vh] fixed bottom-0 left-0 z-50 flex justify-center flex-col items-center bg-white dark:bg-[#141414]" style={{ backdropFilter: 'blur(10px)' }}>
               <h1 className="text-[#141414] dark:text-gray-50 text-2xl mb-2">Wait for other to join</h1>
              <span className="bg-red-500 p-1 w-[50px] h-[50px] rounded-[50%] flex justify-center items-center">
              <IconPhoneCalling onClick={()=>{
                setIsVideoEnabled(false)
              }}/>
              </span>
            </div>
          }

          <div className="bg-gray-100 dark:bg-[#141414] p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{roomDetails.title}</h1>
                  <p className="mt-2">{roomDetails.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icons.users className="h-5 w-5" />
                    <span>{roomDetails.members.toLocaleString()} members</span>
                  </div>
                <div className="flex gap-2">
                  <IconVideo onClick={()=>{
                    setIsVideoEnabled(true)
                  }}/>
                  <IconPhoneCall onClick={()=>{
                    setIsAudioEnabled(true)
                  }}/>
                   <div className="flex items-center gap-2 text-sm">
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* <div className="bg-white dark:bg-[#141414] rounded-lg shadow p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={roomDetails.instructor.avatar} />
                    <AvatarFallback>{roomDetails.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{roomDetails.instructor.name}</h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        Instructor
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{roomDetails.instructor.bio}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Icons.messageSquare className="mr-2 h-4 w-4" />
                      Send message
                    </Button>
                  </div>
                </div>
              </div> */}
          </div> 

          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">

              {/* Instructor  */}
              

              <div className="bg-gray-50 dark:bg-[#141414] rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div>
            <nav className="flex lg:ml-[250px]">
              <button
                className={`px-6 py-4 text-md font-bold ${activeTab === 'chats' ? 'border-b-2 border-[#141414] dark:border-gray-50 text-gray-500' : 'text-[#141414] dark:text-gray-50 hover:text-gray-700'}`}
                onClick={() => setActiveTab('chats')}
              >
                Chats
              </button>
              <button
                className={`px-6 py-4 text-md font-bold ${activeTab === 'events' ? 'border-b-2 border-[#141414] dark:border-gray-50 text-gray-500' : 'text-[#141414] dark:text-gray-50 hover:text-gray-700'}`}
                onClick={() => setActiveTab('events')}
              >
               Events
              </button>
              <button
                className={`px-6 py-4 text-md font-bold ${activeTab === 'resources' ? 'border-b-2 border-[#141414] dark:border-gray-50 text-gray-500' : 'text-[#141414] dark:text-gray-50 hover:text-gray-700'}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </nav>
          </div>
          </div>

              {/* Discussion Feed */}
              {activeTab==='chats' && <div className="bg-gray-50 dark:bg-[#141414] rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">Discussion Feed</h2>
                </div>

                {/* New Post Input */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/avatars/current-user.jpg" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Start a discussion..."
                        className="bg-gray-50 dark:bg-gray-700 border-none"
                      />
                      <div className="flex justify-between mt-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Icons.image className="h-4 w-4 mr-1" />
                            Media
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icons.link className="h-4 w-4 mr-1" />
                            Link
                          </Button>
                        </div>
                        <Button size="sm" onClick={handlePost}>Message</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion Threads */}
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.user.avatar} />
                        <AvatarFallback>{discussion.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{discussion.user.name}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{discussion.user.role}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">• {discussion.timestamp}</span>
                        </div>
                        <p className="mt-1">{discussion.content}</p>
                        <div className="flex gap-4 mt-3">
                          <Button variant="ghost" size="sm">
                            <Icons.thumbsUp className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icons.messageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>

                        {/* Replies */}
                        {discussion.replies.length > 0 && (
                          <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={reply.user.avatar} />
                                  <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium">{reply.user.name}</h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{reply.user.role}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">• {reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm mt-1">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div> }
              {activeTab==='resources' && <div className="rounded-lg shadow">
                  <div className="bg-gray-50 dark:bg-[#141414] rounded-lg p-4 mb-4">
                  <h1 className="dark:text-gray-50 text-[#141414] mb-5 font-bold flex gap-1"><span><IconUpload/> </span>Upload Resources</h1>
                      <Input
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Upload Content"
                        className="bg-gray-50 dark:bg-gray-700 border-none"
                      />
                      <div className="flex justify-between mt-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Icons.image className="h-4 w-4 mr-1" />
                            Media
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icons.link className="h-4 w-4 mr-1" />
                            Link
                          </Button>
                        </div>
                        <Button size="sm" onClick={handlePost}>Upload</Button>
                      </div>
                </div>
                 <div className="rounded-lg shadow p-6 bg-gray-50 dark:bg-[#141414]">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.folder className="h-5 w-5" />
                  All Resources
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Lecture_5_Slides.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Assignment_3_Prompt.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Helpful Tutorial Video</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>General Trigonometry.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Fundamental algebra.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span> Super mathematics trick</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Perfom calculation</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Assignment on tuesday.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Course most asked questions</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Basic math concept.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Learning methodology revealed</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Best coders and math pro</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span> Super mathematics trick</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Perfom calculation</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Assignment on tuesday.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Course most asked questions</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Basic math concept.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Learning methodology revealed</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Best coders and math pro</span>
                  </div>
                </div>
              </div>
                </div>
                }{
                  activeTab==='events' && <div className="bg-gray-50 dark:bg-[#141414] rounded-lg shadow p-6">
                    <div className="bg-white dark:bg-[#141414] rounded-lg shadow p-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.calendar className="h-5 w-5" />
                  Upcoming Events
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Live Q&A Session</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3:00 PM - 4:30 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">JUNE</span>
                      <span className="text-lg font-bold">30</span>
                    </div>
                    <div>
                      <h4 className="font-medium">No classroom available</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">11:59 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">28</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Assignment 3 Due</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">11:59 PM</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold flex items-center gap-2 mt-10">
                  <Icons.calendar className="h-5 w-5" />
                  Latest Events
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Live Q&A Session</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3:00 PM - 4:30 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">JUNE</span>
                      <span className="text-lg font-bold">30</span>
                    </div>
                    <div>
                      <h4 className="font-medium">No classroom available</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">11:59 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">28</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Assignment 3 Due</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">11:59 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
                }
            </div>


            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white dark:bg-[#141414] rounded-lg shadow p-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.calendar className="h-5 w-5" />
                  Upcoming Events
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Live Q&A Session</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3:00 PM - 4:30 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg p-2 flex flex-col items-center justify-center w-12">
                      <span className="text-sm font-medium">MAY</span>
                      <span className="text-lg font-bold">28</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Assignment 3 Due</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">11:59 PM</p>
                    </div>
                  </div>
                </div>
                <Button  onClick={() => setActiveTab('events')} variant="outline" className="w-full mt-4">
                  View all events
                </Button>
              </div>

              {/* Resources */}
              <div className="bg-white dark:bg-[#141414] rounded-lg shadow p-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.folder className="h-5 w-5" />
                  Resources
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Lecture_5_Slides.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.fileText className="h-5 w-5 text-gray-500" />
                    <span>Assignment_3_Prompt.pdf</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Icons.link className="h-5 w-5 text-gray-500" />
                    <span>Helpful Tutorial Video</span>
                  </div>
                </div>
                <Button  onClick={() => setActiveTab('resources')} variant="outline" className="w-full mt-4">
                  Upload resource
                </Button>
              </div>

              {/* Members */}
              <div className="bg-white dark:bg-card rounded-lg shadow p-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icons.users className="h-5 w-5" />
                  42 Active Members
                </h3>
                <div className="mt-4 space-y-4">
                  {[
                    { name: "Alex Chen", status: "online" },
                    { name: "Maria Garcia", status: "online" },
                    { name: "Maria Garcia", status: "online" },
                    { name: "Eric Garcia", status: "online" },
                    { name: "John peter", status: "online" },
                    { name: "Maria Garcia", status: "online" },
                    { name: "Jamie Smith", status: "offline" },
                    { name: "Jamie Smith", status: "offline" },
                    { name: "Taylor Wong", status: "online" }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div className={`h-2 w-2 rounded-full ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View all members
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default Page
