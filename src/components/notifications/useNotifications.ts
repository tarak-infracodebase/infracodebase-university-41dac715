import { useState, useCallback } from "react";
import { NOTIFICATIONS, NotificationItem, NotificationCategory } from "@/data/notifications";

const LS_KEY = "icbu_read_notifications";

function getSavedReadIds(): number[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function persistReadIds(ids: number[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids));
}

type TabFilter = "all" | NotificationCategory;

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const savedIds = getSavedReadIds();
    return NOTIFICATIONS.map((n) => ({
      ...n,
      read: n.read || savedIds.includes(n.id),
    }));
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialId, setModalInitialId] = useState<number | null>(null);

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
    const existing = getSavedReadIds();
    persistReadIds(Array.from(new Set([...existing, id])));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const allIds = prev.map((n) => n.id);
      persistReadIds(allIds);
      return prev.map((n) => ({ ...n, read: true }));
    });
  }, []);

  const openNotification = useCallback(
    (item: NotificationItem) => {
      markRead(item.id);
      setModalInitialId(item.id);
      setModalOpen(true);
      setPanelOpen(false);
    },
    [markRead]
  );

  const openModalIntro = useCallback(() => {
    setModalInitialId(null);
    setModalOpen(true);
    setPanelOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalInitialId(null);
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
    modalOpen,
    modalInitialId,
    markRead,
    markAllRead,
    openNotification,
    openModalIntro,
    closeModal,
    togglePanel,
    closePanel,
  };
}
