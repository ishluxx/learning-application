"use client"

import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { featuredRooms } from "@/data/rooms"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Icons } from "@/components/Icons/icons"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AIChatIcon from "@/components/ai/page"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function RoomPage() {
  const router = useRouter()
  const myRooms = featuredRooms.filter((room) => room.status === 'joined') || [];
  const discovered = featuredRooms.filter((room) => room.status === 'discovered') || [];
  const invited = featuredRooms.filter((room) => room.status === 'invited') || [];
  const pending = featuredRooms.filter((room) => room.status === 'pending') || [];

  const [activeTab, setActiveTab] = useState<'My Room' | 'Discovered' | 'Invited' | 'Pending'>('My Room');
  const [previewRoom, setPreviewRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const filterRooms = (rooms: any) => {
    if (!searchQuery) return rooms;
    return rooms.filter((room: any) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderRooms = (rooms: any) => {
    if (!rooms.length) {
      return (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold">😕 No rooms found</p>
          <p className="text-sm mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      );
    }

    const totalPages = Math.ceil(rooms.length / roomsPerPage);
    const paginatedRooms = rooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedRooms.map((room: any) => {
            const IconComponent = Icons[room.icon as keyof typeof Icons] || Icons.folder;

            return (
              <Card key={room.id} className="hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${
                      room.status === 'joined' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      room.status === 'discovered' ? 'bg-purple-100 dark:bg-blue-900/30' :
                      room.status === 'invited' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      {IconComponent && <IconComponent className={`w-6 h-6 ${
                        room.status === 'joined' ? 'text-blue-600 dark:text-blue-400' :
                        room.status === 'discovered' ? 'text-blue-600 dark:text-blue-400' :
                        room.status === 'invited' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      }`} />}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      room.status === 'joined' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' :
                      room.status === 'discovered' ? 'bg-purple-100 text-blue-800 dark:bg-blue-700 dark:text-purple-200' :
                      room.status === 'invited' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'
                    }`}>
                      {room.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{room.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">{room.description}</p>

                  {room.status === 'joined' && (
                    <>
                      <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          "Engage in meaningful conversations, share resources, and build lasting knowledge connections."
                        </p>
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <Icons.users className="h-4 w-4" />
                          <span>{room.students.toLocaleString()}</span>
                        </div>
                        <Button onClick={() => setPreviewRoom(room)} size="sm" className="transition-transform hover:scale-105">
                          Preview Room
                        </Button>
                      </div>
                    </>
                  )}

                  {room.status === 'discovered' && (
                    <div className="mt-6 flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewRoom(room)}
                        className="transition-transform hover:scale-105"
                      >
                        Preview Room
                      </Button>
                    </div>
                  )}

                  {room.status === 'invited' && (
                    <div className="mt-6 flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => alert(`Accepted invitation to ${room.title}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white transition-transform hover:scale-105"
                      >
                        Accept Invitation
                      </Button>
                    </div>
                  )}

                  {room.status === 'pending' && (
                    <div className="mt-6 p-3 bg-green-50 dark:bg-green-900 rounded text-green-700 dark:text-green-300 text-sm italic">
                      Your request to join this room is pending approval.
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </>
    );
  };

  const getTabRooms = () => {
    switch (activeTab) {
      case 'My Room': return myRooms;
      case 'Discovered': return discovered;
      case 'Invited': return invited;
      case 'Pending': return pending;
      default: return [];
    }
  };

  return (
    <SidebarProvider style={{
      "--sidebar-width": "calc(var(--spacing) * 72)",
      "--header-height": "calc(var(--spacing) * 12)"
    } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="top-0 z-50 bg-white dark:bg-[#141414] px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <div className="flex gap-4 items-center">
            <Button variant="outline">+ Create Room</Button>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms..."
              className="rounded px-3 py-1 text-sm border bg-gray-100 dark:bg-gray-800" 
            />
          </div>
        </div>

        <AIChatIcon />

        <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-6 px-8 my-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-white">Welcome to the Future of Learning 🚀</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Connect with like-minded learners, explore exciting topics, and collaborate to grow together.
          </p>
        </div>

        <nav className="flex justify-center mt-4 border-b dark:border-gray-700">
          {['My Room', 'Discovered', 'Invited', 'Pending'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 text-md font-bold transition-colors ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className="max-w-7xl mx-auto py-8 px-6">
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{activeTab === 'My Room' ? 'Your Rooms' : `${activeTab} Classrooms`}</h2>
            {renderRooms(filterRooms(getTabRooms()))}
          </section>

          <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Why Join a Room?</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Each classroom is a hub of creativity, insight, and collaboration. Join your peers, share what you know, and learn what you don’t.
              Engage in discussions, attend live sessions, and get feedback from mentors and peers alike.
            </p>
          </section>
        </main>

        <Dialog open={!!previewRoom} onOpenChange={() => setPreviewRoom(null)}>
          <DialogContent>
            {previewRoom && (
              <div>
                <h2 className="text-2xl font-bold mb-2">{previewRoom.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{previewRoom.description}</p>
                <Button onClick={() => router.push(`/rooms/${previewRoom.id}`)} className="w-full">Join Room</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
