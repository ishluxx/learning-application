import { AppSidebar } from '@/components/student/app-sidebar'
import { SiteHeader } from '@/components/student/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

export default function AiAssistant() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        hello world
      </SidebarInset>
    </SidebarProvider>
  );
}
