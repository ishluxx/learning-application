import { AppSidebar } from "@/components/student/app-sidebar"
import { SectionCards } from "@/components/student/account/section-cards"
import { SiteHeader } from "@/components/student/site-header"
import { IconUserCircle, IconCreditCard, IconNotification } from "@tabler/icons-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import AIChatIcon from "@/components/ai/page"


export default function Page() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
