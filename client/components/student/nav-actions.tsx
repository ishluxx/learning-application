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
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
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

const data = [
  [
    {
      label: "Customize Page",
      icon: Settings2,
    },
    {
      label: "Turn into wiki",
      icon: FileText,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: Link,
    },
    {
      label: "Duplicate",
      icon: Copy,
    },
    {
      label: "Move to",
      icon: CornerUpRight,
    },
    {
      label: "Move to Trash",
      icon: Trash2,
    },
  ],
  [
    {
      label: "Undo",
      icon: CornerUpLeft,
    },
    {
      label: "View analytics",
      icon: LineChart,
    },
    {
      label: "Version History",
      icon: GalleryVerticalEnd,
    },
    {
      label: "Show delete pages",
      icon: Trash,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
  ],
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [showAlerts, setShowAlerts] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  const handleMenuClick = (item: { label: string; icon: React.ElementType }) => {
    if (item.label === "Notifications") {
      setShowAlerts(true)
    } else {
      setIsOpen(false)
      setShowAlerts(false)
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={o => { setIsOpen(o); if (!o) setShowAlerts(false) }}>
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
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">New live course has been started</li>
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">New message received</li>
                <li className="bg-green-100 text-blue-800 rounded px-2 py-1 text-sm">Assignment due tomorrow</li>
                <li className="bg-green-100 text-green-800 rounded px-2 py-1 text-sm">Profile updated successfully</li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {data.map((group, index) => (
                  <SidebarGroup key={index} className="border-b last:border-none">
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton onClick={() => handleMenuClick(item)}>
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
