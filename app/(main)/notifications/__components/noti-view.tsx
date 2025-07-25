"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Briefcase, CheckCircle, MessageCircle, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

// Mock data for notifications
const initialNotifications = [
	{
		id: "1",
		type: "job_match",
		title: "New job opportunity",
		message: 'A "React Developer" job matching your interests has been posted.',
		timestamp: "2025-07-23T14:30:00Z",
		read: false,
	},
	{
		id: "2",
		type: "application_accepted",
		title: "Your application was accepted!",
		message: 'Carlos Ruiz accepted your application for "UX/UI Designer for Mobile App".',
		timestamp: "2025-07-23T12:15:00Z",
		read: false,
	},
	{
		id: "3",
		type: "new_application",
		title: "New application received",
		message: 'Ana García applied to your job "Frontend React Developer".',
		timestamp: "2025-07-23T11:45:00Z",
		read: true,
	},
	{
		id: "4",
		type: "message",
		title: "New message",
		message: "María González sent you a message about the project.",
		timestamp: "2025-07-23T10:20:00Z",
		read: true,
	},
	{
		id: "5",
		type: "job_match",
		title: "Recommended job",
		message: 'New "Content Writer" job available in your area of interest.',
		timestamp: "2025-07-22T16:30:00Z",
		read: true,
	},
]

const getNotificationIcon = (type: string) => {
	switch (type) {
		case "job_match":
			return <Briefcase className="h-5 w-5 text-blue-600"  />
		case "application_accepted":
			return <CheckCircle className="h-5 w-5 text-green-500"  />
		case "new_application":
			return <Users className="h-5 w-5 text-amber-600"  />
		case "message":
			return <MessageCircle className="h-5 w-5 text-purple-600"  />
		default:
			return <Bell className="h-5 w-5 text-gray-600"  />
	}
}

const getNotificationBg = (type: string) => {
	switch (type) {
		case "job_match":
			return "bg-[var(--primary-foreground)] dark:bg-[var(--primary)]/10"
		case "application_accepted":
			return "bg-[var(--accent-foreground)] dark:bg-[var(--accent)]/10"
		case "new_application":
			return "bg-[var(--secondary-foreground)] dark:bg-[var(--secondary)]/10"
		case "message":
			return "bg-[var(--muted)] dark:bg-[var(--muted)]/10"
		default:
			return "bg-[var(--card)] dark:bg-[var(--card)]/10"
	}
}

export function NotificationsView() {
	const [notifications, setNotifications] = useState(initialNotifications)
	const router = useRouter()

	const unreadCount = notifications.filter((n) => !n.read).length

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((n) => ({ ...n, read: true }))
		)
	}

	const handleViewDetails = (id: string, actionUrl: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n))
		)
		router.push("petitions/" + actionUrl)
	}

	return (
    <div className="max-w-2xl mx-auto">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "All notifications read"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4 p-4 border-none">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-none rounded-none hover:bg-[var(--accent)]/20 transition-colors ${
              !notification.read
                ? "bg-[var(--accent)]/40"
                : "bg-[var(--accent)]/10"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${getNotificationBg(
                    notification.type
                  )}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[var(--accent-foreground)]/50 rounded-full mt-1 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() =>
                        handleViewDetails(notification.id, notification.id)
                      }
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No notifications</h3>
          <p className="text-muted-foreground">
            We will notify you when there are new opportunities or updates.
          </p>
        </div>
      )}
    </div>
  );
}
