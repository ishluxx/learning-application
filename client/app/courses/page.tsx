import { AppSidebar } from "@/components/student/app-sidebar"
import { SiteHeader } from "@/components/student/site-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Link from "next/link"
import { coursesData, Course } from "@/data/courses"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"

// Helper function to determine course status
const getCourseStatus = (course: Course): "Completed" | "In Progress" | "Not Started" => {
  if (!course.sections || course.sections.length === 0) {
    return "Not Started";
  }

  const allItems = course.sections.flatMap(section => section.items);
  if (allItems.length === 0) {
    return "Not Started";
  }

  const completedItems = allItems.filter(item => item.completed).length;

  if (completedItems === allItems.length) {
    return "Completed";
  }
  if (completedItems > 0) {
    return "In Progress";
  }
  return "Not Started";
};


export default function CoursesPage() {
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

        <div className="flex flex-1 flex-col">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.map((course) => {
                const status = getCourseStatus(course);
                let buttonText = "Start Learning";
                if (status === "Completed") {
                  buttonText = "Review Course";
                } else if (status === "In Progress") {
                  buttonText = "Continue Learning";
                }

                return (
                <Card key={course.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge 
                        variant={status === "Completed" ? "default" : status === "In Progress" ? "secondary" : "outline"}
                        className={cn(
                          status === "Completed" && "bg-green-500 text-white",
                          status === "In Progress" && "bg-blue-500 text-white",
                          status === "Not Started" && "text-gray-600"
                        )}
                      >
                        {status}
                      </Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Duration: {course.duration}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Level: {course.level}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.id}`}>
                        {buttonText}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/courses/${course.id}/overview`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        Overview
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
