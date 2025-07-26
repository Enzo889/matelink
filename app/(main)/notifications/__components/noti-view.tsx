"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Briefcase,
  CheckCircle,
  MessageCircle,
  Users,
  FileText,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// Interface for notifications from Supabase
interface SupabaseNotification {
  id: number;
  user_id: number | null;
  message: string;
  is_read: boolean | null;
  created_at: string | null;
  noti_uuid: string | null;
  type: string | null;
  title: string | null;
  petition_id: number | null;
}

// Unified notification interface
interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  petition_id?: number | null;
  source: "supabase" | "mock";
}

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
    message:
      'Carlos Ruiz accepted your application for "UX/UI Designer for Mobile App".',
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
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "job_match":
      return <Briefcase className="h-5 w-5 text-blue-600" />;
    case "application_accepted":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "new_application":
      return <Users className="h-5 w-5 text-amber-600" />;
    case "message":
      return <MessageCircle className="h-5 w-5 text-purple-600" />;
    case "petition_created":
      return <FileText className="h-5 w-5 text-orange-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
};

const getNotificationBg = (type: string) => {
  switch (type) {
    case "job_match":
      return "bg-[var(--primary-foreground)] dark:bg-[var(--primary)]/10";
    case "application_accepted":
      return "bg-[var(--accent-foreground)] dark:bg-[var(--accent)]/10";
    case "new_application":
      return "bg-[var(--secondary-foreground)] dark:bg-[var(--secondary)]/10";
    case "message":
      return "bg-[var(--muted)] dark:bg-[var(--muted)]/10";
    case "petition_created":
      return "bg-orange-50 dark:bg-orange-900/10";
    default:
      return "bg-[var(--card)] dark:bg-[var(--card)]/10";
  }
};

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications from Supabase
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          console.log("No user found, showing only mock notifications");
          setNotifications(
            initialNotifications.map((n) => ({ ...n, source: "mock" as const }))
          );
          setLoading(false);
          return;
        }

        // Get user's numeric ID from users table
        const { data: userData, error: userDataError } = await supabase
          .from("users")
          .select("id")
          .eq("uuid", user.id)
          .single();

        if (userDataError || !userData) {
          console.log("User data not found, showing only mock notifications");
          setNotifications(
            initialNotifications.map((n) => ({ ...n, source: "mock" as const }))
          );
          setLoading(false);
          return;
        }

        // Fetch real notifications from Supabase
        const { data: supabaseNotifications, error: notificationsError } =
          await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", userData.id)
            .order("created_at", { ascending: false });

        if (notificationsError) {
          console.error("Error fetching notifications:", notificationsError);
          setNotifications(
            initialNotifications.map((n) => ({ ...n, source: "mock" as const }))
          );
          setLoading(false);
          return;
        }

        // Transform Supabase notifications to unified format
        const transformedSupabaseNotifications: Notification[] = (
          supabaseNotifications || []
        ).map((notification: SupabaseNotification) => ({
          id: notification.id.toString(),
          type: notification.type || "default",
          title: notification.title || "Notification",
          message: notification.message,
          timestamp: notification.created_at || new Date().toISOString(),
          read: notification.is_read || false,
          petition_id: notification.petition_id,
          source: "supabase" as const,
        }));

        // Combine real notifications with mock data
        const mockNotificationsWithSource = initialNotifications.map((n) => ({
          ...n,
          source: "mock" as const,
        }));
        const allNotifications = [
          ...transformedSupabaseNotifications,
          ...mockNotificationsWithSource,
        ];

        // Sort by timestamp (newest first)
        allNotifications.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setNotifications(allNotifications);
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error fetching notifications:", error);
        setNotifications(
          initialNotifications.map((n) => ({ ...n, source: "mock" as const }))
        );
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [supabase]);

  const markAllAsRead = async () => {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      // Get user's numeric ID from users table
      const { data: userData, error: userDataError } = await supabase
        .from("users")
        .select("id")
        .eq("uuid", user.id)
        .single();

      if (userDataError || !userData) return;

      // Update all unread Supabase notifications to read
      const unreadSupabaseNotifications = notifications.filter(
        (n) => n.source === "supabase" && !n.read
      );
      if (unreadSupabaseNotifications.length > 0) {
        const notificationIds = unreadSupabaseNotifications.map((n) =>
          parseInt(n.id)
        );

        const { error: updateError } = await supabase
          .from("notifications")
          .update({ is_read: true })
          .in("id", notificationIds)
          .eq("user_id", userData.id);

        if (updateError) {
          console.error("Error marking notifications as read:", updateError);
          return;
        }
      }

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
    }
  };

  const handleViewDetails = async (notification: Notification) => {
    try {
      // Mark as read if it's from Supabase and unread
      if (notification.source === "supabase" && !notification.read) {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (!userError && user) {
          const { data: userData, error: userDataError } = await supabase
            .from("users")
            .select("id")
            .eq("uuid", user.id)
            .single();

          if (!userDataError && userData) {
            const { error: updateError } = await supabase
              .from("notifications")
              .update({ is_read: true })
              .eq("id", parseInt(notification.id))
              .eq("user_id", userData.id);

            if (!updateError) {
              // Update local state
              setNotifications((prev) =>
                prev.map((n) =>
                  n.id === notification.id ? { ...n, read: true } : n
                )
              );
            }
          }
        }
      } else {
        // For mock notifications, just update local state
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
        );
      }

      // Navigate based on notification type
      if (
        notification.type === "petition_created" &&
        notification.petition_id
      ) {
        router.push(`/petitions/${notification.petition_id}`);
      } else {
        // For other types, navigate to a general page or stay on notifications
        router.push(`/petitions`);
      }
    } catch (error) {
      console.error("Error in handleViewDetails:", error);
    }
  };

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
        {loading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none rounded-none">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          notifications.map((notification, index) => (
            <Card
              key={index}
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
                        onClick={() => handleViewDetails(notification)}
                      >
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
