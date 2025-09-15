import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Workshop Confirmed",
    message: "Your Python Programming workshop has been confirmed for Jan 15, 2024.",
    type: "success",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: "2",
    title: "New Instructor Available",
    message: "Dr. Priya Sharma is now available for Machine Learning workshops.",
    type: "info",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false
  },
  {
    id: "3",
    title: "Workshop Deadline Approaching",
    message: "Submit your React Development workshop proposal by tomorrow.",
    type: "warning",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true
  }
];

export const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNewNotification, setShowNewNotification] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Simulate new notification after 10 seconds
    const timer = setTimeout(() => {
      setShowNewNotification(true);
      setTimeout(() => setShowNewNotification(false), 3000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-workshop-confirmed" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-workshop-pending" />;
      case "info":
        return <Bell className="h-5 w-5 text-accent" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className={cn(
          "fixed top-20 right-4 z-50 glass-card border-glass-border btn-3d",
          "hover:shadow-glow transition-all duration-300",
          showNewNotification && "animate-bounce"
        )}
      >
        <div className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-workshop-pending text-white text-xs flex items-center justify-center animate-pulse-glow">
              {unreadCount}
            </Badge>
          )}
        </div>
      </Button>

      {/* Notification Panel */}
      <Card
        className={cn(
          "fixed top-4 right-4 w-80 max-h-96 z-50 transition-all duration-500",
          "glass-card border-glass-border overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-glass-border bg-gradient-card">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-workshop-pending text-white">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-glass"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-glass-border">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-200",
                    "hover:bg-glass animate-slide-in-right",
                    !notification.read && "bg-primary/5"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(notification.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-glass-border bg-gradient-card">
            <Button
              variant="ghost"
              size="sm"
              className="w-full hover:bg-glass"
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </Card>

      {/* New Notification Toast */}
      {showNewNotification && (
        <Card className="fixed top-24 right-4 w-72 z-50 glass-card border-glass-border animate-slide-in-right">
          <div className="p-4">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-workshop-confirmed flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">Workshop Update</h4>
                <p className="text-sm text-muted-foreground">
                  New message from your instructor about the upcoming session.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};