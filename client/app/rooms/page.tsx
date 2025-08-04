"use client"
import { AppSidebar } from "@/components/student/app-sidebar"
import { ChartAreaInteractive } from "@/components/student/chart-area-interactive"
import { DataTable } from "@/components/student/data-table"
import { SectionCards } from "@/components/student/section-cards"
import {Icons} from "@/components/Icons/icons"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/student/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { featuredRooms } from "@/data/rooms"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()

  const handleJoinRoom = (Id: string) => {
    router.push(`/rooms/${Id}`)
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
         

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-8 px-6">
            {/* Featured Rooms Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Classrooms</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredRooms.map((room) => {
                  const IconComponent = Icons[room.icon as keyof typeof Icons]
                  return (
                    <Card
                      key={room.id}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            {IconComponent && <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                          </div>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            {room.category}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{room.title}</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{room.description}</p>
                        <div className="mt-6 flex justify-between items-center">
                          <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Icons.users className="mr-1.5 h-4 w-4" />
                              {room.students.toLocaleString()}
                            </span>
                          </div>
                          <Button 
                            onClick={() => handleJoinRoom(room.id)}
                            size="sm"
                            className="group-hover:bg-primary group-hover:text-white transition-colors"
                          >
                            Explore Room
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </section>
          </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
