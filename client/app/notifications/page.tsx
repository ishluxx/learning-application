"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationCard from "@/components/notification/NotificationCard";
import NotificationFilter from "@/components/notification/NotificationFilter";
import NotificationSkeleton from "@/components/notification/NotificationSkeleton";
import { FiBell, FiCheck } from "react-icons/fi";
import { AppSidebar } from "@/components/student/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/student/site-header";
import AIChatIcon from "@/components/ai/page";


type Notification = {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    type: "message" | "deadline" | "achievement";
    isRead: boolean;
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filter, setFilter] = useState<"all" | "unread" | Notification["type"]>("all");
    const [isLoading, setIsLoading] = useState(true);

    // Simulate data fetch
    useEffect(() => {
        setTimeout(() => {
            setNotifications([
                {
                    id: "1",
                    title: "Assignment Graded",
                    message: "Your 'Advanced React' submission scored 95%!",
                    timestamp: "2 hours ago",
                    type: "achievement",
                    isRead: false,
                },
                {
                    id: "2",
                    title: "New Message",
                    message: "Instructor commented on your discussion post",
                    timestamp: "1 day ago",
                    type: "message",
                    isRead: true,
                },
                {
                    id: "3",
                    title: "Deadline Approaching",
                    message: "'Final Project' due in 3 days",
                    timestamp: "2 days ago",
                    type: "deadline",
                    isRead: false,
                },
                {
                    id: "4",
                    title: "Badge Earned",
                    message: "You earned the 'Consistent Learner' badge!",
                    timestamp: "3 days ago",
                    type: "achievement",
                    isRead: false,
                },
                {
                    id: "5",
                    title: "Course Completed",
                    message: "You successfully completed 'Node.js Fundamentals'",
                    timestamp: "4 days ago",
                    type: "achievement",
                    isRead: true,
                },
                {
                    id: "7",
                    title: "Peer Reply",
                    message: "A classmate replied to your forum question",
                    timestamp: "6 days ago",
                    type: "message",
                    isRead: false,
                },
                {
                    id: "8",
                    title: "Certificate Issued",
                    message: "Your certificate for 'UI/UX Basics' is ready to download",
                    timestamp: "1 week ago",
                    type: "achievement",
                    isRead: false,
                },
                {
                    id: "9",
                    title: "Reminder",
                    message: "Weekly study plan available for you",
                    timestamp: "1 week ago",
                    type: "message",
                    isRead: true,
                },
                {
                    id: "10",
                    title: "Quiz Available",
                    message: "New quiz has been unlocked in 'JavaScript Advanced'",
                    timestamp: "8 days ago",
                    type: "message",
                    isRead: false,
                },
                {
                    id: "11",
                    title: "Assignment Feedback",
                    message: "Instructor left detailed feedback on your essay",
                    timestamp: "9 days ago",
                    type: "message",
                    isRead: true,
                },
                {
                    id: "13",
                    title: "Milestone Reached",
                    message: "You completed 50% of your 'Full-Stack Development' course",
                    timestamp: "12 days ago",
                    type: "achievement",
                    isRead: false,
                },
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);


    const filteredNotifications = notifications.filter((n) => {
        if (filter === "all") return true;
        if (filter === "unread") return !n.isRead;
        return n.type === filter;
    });

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    };

    const dismissNotification = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

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
                <div className="min-h-screen p-4 md:p-8 bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100">
                 <AIChatIcon />
                    <div>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-between items-center mb-8"
                        >
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <FiBell /> Notifications
                            </h1>
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-1 text-sm "
                            >
                                <FiCheck /> Mark all as read
                            </button>
                        </motion.div>

                        {/* Filter */}
                        <NotificationFilter onFilterChange={setFilter} />

                        {/* Notifications List */}
                        <div className="space-y-3">
                            {isLoading ? (
                                <>
                                    <NotificationSkeleton />
                                    <NotificationSkeleton />
                                    <NotificationSkeleton />
                                </>
                            ) : (
                                <AnimatePresence>
                                    {filteredNotifications.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="glass-card rounded-xl p-8 text-center"
                                        >
                                            <p>No notifications found</p>
                                        </motion.div>
                                    ) : (
                                        filteredNotifications.map((notification) => (
                                            <NotificationCard
                                                key={notification.id}
                                                {...notification}
                                                onDismiss={dismissNotification}
                                            />
                                        ))
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}