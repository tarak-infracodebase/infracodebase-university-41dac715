import { useState, useCallback, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { NOTIFICATIONS, NotificationItem, NotificationCategory } from "@/data/notifications";

type TabFilter = "all" | NotificationCategory;

const SESSION_KEY = "icbu_notif_modal_shown";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    () => NOTIFICATIONS.map((n) => ({ ...n }))
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const autoShowFired = useRef(false);

  const { user, isSignedIn, isLoaded } = useUser();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const unreadByCategory = {
    all: unreadCount,
    workshop: notifications.filter((n) => n.category === "workshop" && !n.read).length,
    video: notifications.filter((n) => n.category === "video" && !n.read).length,
    module: notifications.filter((n) => n.category === "module" && !n.read).length,
  };

  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.category === activeTab);

  const markRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const openNotification = useCallback(
    (item: NotificationItem) => {
      markRead(item.id);
      setSelectedNotification(item);
      setPanelOpen(false);
    },
    [markRead]
  );

  const closeModal = useCallback(() => {
    setSelectedNotification(null);
  }, []);

  const togglePanel = useCallback(() => {
    setPanelOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  // Auto-show logic based on auth state
  useEffect(() => {
    if (!isLoaded || autoShowFired.current) return;

    const firstUnread = notifications.find((n) => !n.read);
    if (!firstUnread) return;

    if (isSignedIn && user) {
      // Detect fresh sign-up: createdAt within last 60 seconds
      const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
      const isNewUser = Date.now() - createdAt < 60_000;

      if (isNewUser) {
        // Sign up → always show after 600ms
        autoShowFired.current = true;
        const timer = setTimeout(() => {
          openNotification(firstUnread);
          sessionStorage.setItem(SESSION_KEY, "1");
        }, 600);
        return () => clearTimeout(timer);
      }

      // Sign in → show once per session if unread exist
      const alreadyShown = sessionStorage.getItem(SESSION_KEY);
      if (!alreadyShown && unreadCount > 0) {
        autoShowFired.current = true;
        const timer = setTimeout(() => {
          openNotification(firstUnread);
          sessionStorage.setItem(SESSION_KEY, "1");
        }, 600);
        return () => clearTimeout(timer);
      }
    }

    if (!isSignedIn) {
      // Sign out → clear session flag so next sign-in can trigger
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [isLoaded, isSignedIn, user, notifications, unreadCount, openNotification]);

  return {
    notifications: filtered,
    unreadCount,
    unreadByCategory,
    panelOpen,
    activeTab,
    setActiveTab,
    selectedNotification,
    markRead,
    markAllRead,
    openNotification,
    closeModal,
    togglePanel,
    closePanel,
  };
}
