"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEndIcon,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Trash,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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

import { useRouter } from "next/navigation"

const data = [
  [
    {
      label: "Customize Dashboard",
      icon: Settings2,
    },
    {
      label: "Take Quick Notes",
      icon: FileText,
    },
  ],
  [
    { label: "Copy Study Link", icon: Link },
    { label: "Invite Classmate", icon: Copy },
    { label: "Ask for Help", icon: CornerUpRight },
    { label: "Report Issue", icon: Trash2 },
  ],
  [
    {
      label: "Download History",
      icon: GalleryVerticalEndIcon,
    },
    {
      label: "View Progress",
      icon: LineChart,
    },
    {
      label: "Deleted Notes",
      icon: Trash,
    },
    {
      label: "Remainder",
      icon: Bell,
    },
  ],
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [showAlerts, setShowAlerts] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  const handleMenuClick = async (item: { label: string; icon: React.ElementType }) => {
    const currentUrl = window.location.href

    switch (item.label) {
      case "Take Quick Notes":
        router.push("/saveddocs")
        break

      case "Copy Study Link":
        if (currentUrl === "http://localhost:3000/courses/1") {
          await navigator.clipboard.writeText(currentUrl)
          alert("Course link copied!")
        } else {
          alert("Copy Study Link only works on course pages.")
        }
        break

      case "Invite Classmate":
        if (currentUrl.startsWith("http://localhost:3000/rooms/")) {
          await navigator.clipboard.writeText(currentUrl)
          alert("Room link copied!")
        } else {
          alert("Invite only works in room pages.")
        }
        break

      case "Ask for Help":
        router.push("/help")
        break

      case "Remainder":
        setShowAlerts(true)
        return // stop closing popover

      case "Customize Dashboard":
        router.push("/dashboard/customize")
        break

      case "Report Issue":
        router.push("/report")
        break

      case "Download History":
        router.push("/downloads")
        break

      case "View Progress":
        router.push("/courses")
        break

      case "Deleted Notes":
        router.push("/deletednotes")
        break


      default:
        break
    }

    setIsOpen(false)
    setShowAlerts(false)
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover
        open={isOpen}
        onOpenChange={(o) => {
          setIsOpen(o)
          if (!o) setShowAlerts(false)
        }}
      >
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
          {showAlerts ? (
            <div className="p-4 ">
              <h3 className="mb-4 text-base font-semibold">Alerts</h3>
              <ul className="space-y-2">
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">
                  New live class is starting
                </li>
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">
                  Instructor posted new material
                </li>
                <li className="bg-green-100 text-blue-800 rounded px-2 py-1 text-sm">
                  Assignment due tomorrow
                </li>
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">
                  Feedback received on submission
                </li>
              </ul>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => setShowAlerts(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {data.map((group, index) => (
                  <SidebarGroup
                    key={index}
                    className="border-b last:border-none"
                  >
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton
                              onClick={() => handleMenuClick(item)}
                            >
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
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
