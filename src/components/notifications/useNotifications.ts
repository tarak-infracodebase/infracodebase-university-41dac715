import { useState, useCallback } from "react";
import { NOTIFICATIONS, NotificationItem, NotificationCategory } from "@/data/notifications";

type TabFilter = "all" | NotificationCategory;

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    () => NOTIFICATIONS.map((n) => ({ ...n }))
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

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

  return {
    notifications: filtered,
    allNotifications: notifications,
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
