import { useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { NotificationItem, NotificationCategory } from "@/data/notifications";

type TabFilter = "all" | NotificationCategory;

const CATEGORY_CONFIG: Record<
  NotificationCategory,
  { gradient: string; accent: string }
> = {
  workshop: {
    gradient: "linear-gradient(145deg, #5a1908 0%, #580f3e 100%)",
    accent: "#fb923c",
  },
  video: {
    gradient: "linear-gradient(145deg, #092e48 0%, #0b4a47 100%)",
    accent: "#38bdf8",
  },
  module: {
    gradient: "linear-gradient(145deg, #2c0550 0%, #183076 100%)",
    accent: "#a78bfa",
  },
};

const TAB_ACCENTS: Record<TabFilter, string> = {
  all: "#f97316",
  workshop: "#fb923c",
  video: "#38bdf8",
  module: "#a78bfa",
};

const TABS: { key: TabFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "workshop", label: "Workshops" },
  { key: "video", label: "Videos" },
  { key: "module", label: "Resources" },
];

interface NotificationPanelProps {
  panelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  notifications: NotificationItem[];
  unreadCount: number;
  unreadByCategory: Record<TabFilter, number>;
  activeTab: TabFilter;
  setActiveTab: (t: TabFilter) => void;
  markAllRead: () => void;
  openNotification: (item: NotificationItem) => void;
}

export function NotificationBell({
  panelOpen,
  togglePanel,
  closePanel,
  notifications,
  unreadCount,
  unreadByCategory,
  activeTab,
  setActiveTab,
  markAllRead,
  openNotification,
}: NotificationPanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    // Use setTimeout so the listener is added after the current event loop,
    // preventing the opening click from immediately triggering close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handler);
    }, 0);
    document.addEventListener("keydown", keyHandler);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [panelOpen, closePanel]);

  const featured = notifications[0];
  const rest = notifications.slice(1);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Bell button */}
      <button
        onClick={togglePanel}
        className="relative flex items-center justify-center transition-colors"
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: "transparent",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" style={{ color: "rgba(255,255,255,0.55)" }} />
        {unreadCount > 0 && (
          <span
            className="absolute flex items-center justify-center"
            style={{
              top: 3,
              right: 3,
              minWidth: 16,
              height: 16,
              borderRadius: 999,
              background: "#f97316",
              border: "1.5px solid #0a0f1a",
              boxShadow: "0 0 10px rgba(249,115,22,0.55)",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
              padding: "0 4px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {panelOpen && (
        <div
          className="absolute right-0 z-50"
          style={{
            top: "calc(100% + 8px)",
            width: 400,
            maxHeight: 580,
            background: "#0f0f12",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 18,
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            animation: "notif-panel-in 180ms cubic-bezier(0.16,1,0.3,1) forwards",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Tab bar */}
          <div style={{ padding: "12px 14px 0" }}>
            <div
              className="flex"
              style={{
                background: "rgba(255,255,255,0.045)",
                borderRadius: 11,
                padding: 3,
              }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                const count = unreadByCategory[tab.key];
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 flex items-center justify-center gap-1.5 transition-all"
                    style={{
                      padding: "6px 0",
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 500,
                      background: isActive ? "#1c1c21" : "transparent",
                      color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      boxShadow: isActive
                        ? "0 1px 4px rgba(0,0,0,0.3)"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                    }}
                  >
                    {count > 0 && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          background: TAB_ACCENTS[tab.key],
                        }}
                      />
                    )}
                    {tab.label}
                    {count > 0 && (
                      <span style={{ fontSize: 10, color: TAB_ACCENTS[tab.key] }}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable content */}
          <div
            className="flex-1 overflow-y-auto custom-scrollbar"
            style={{ padding: "0 14px 0" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "14px 0 10px" }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.87)",
                }}
              >
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.28)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.28)")
                  }
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Featured card */}
            {featured && (
              <FeaturedCard
                item={featured}
                onClick={() => openNotification(featured)}
              />
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.22)",
                    padding: "14px 0 8px",
                  }}
                >
                  Also new
                </div>
                {rest.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    onClick={() => openNotification(item)}
                  />
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: "8px 14px 12px" }}>
            <button
              className="w-full text-center transition-colors"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.26)",
                padding: "8px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.26)")
              }
            >
              View all notifications →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes notif-panel-in {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ----------- Featured Card ----------- */
function FeaturedCard({
  item,
  onClick,
}: {
  item: NotificationItem;
  onClick: () => void;
}) {
  const cfg = CATEGORY_CONFIG[item.category];

  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-transform hover:scale-[1.01]"
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: "#191920",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Banner */}
      <div
        className="relative"
        style={{ height: 168, background: cfg.gradient }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), transparent 55%)",
          }}
        />
        {/* Unread dot */}
        {!item.read && (
          <span
            className="absolute"
            style={{
              top: 10,
              left: 10,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#f97316",
              boxShadow: "0 0 8px rgba(249,115,22,0.6)",
            }}
          />
        )}
        {/* Status badge */}
        {item.status === "replay" && (
          <span
            className="absolute"
            style={{
              top: 10,
              right: 10,
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Replay
          </span>
        )}
        {item.status === "upcoming" && (
          <span
            className="absolute"
            style={{
              top: 10,
              right: 10,
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(249,115,22,0.25)",
              border: "1px solid rgba(249,115,22,0.5)",
              color: "#fdba74",
            }}
          >
            Upcoming
          </span>
        )}
        {/* Category pill */}
        <div
          className="absolute flex items-center gap-1.5"
          style={{
            bottom: 10,
            left: 10,
            fontSize: 10,
            fontWeight: 500,
            padding: "3px 9px",
            borderRadius: 6,
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: cfg.accent,
            }}
          />
          {item.category === "workshop"
            ? "Workshop"
            : item.category === "video"
            ? "Video"
            : "Resource"}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: 6 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: cfg.accent,
            }}
          >
            {item.category === "workshop"
              ? "Workshop"
              : item.category === "video"
              ? "Video"
              : "Resource"}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            {item.timestamp}
          </span>
        </div>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 600,
            color: "rgba(255,255,255,0.87)",
            marginBottom: 4,
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.38)",
            marginBottom: 8,
          }}
        >
          {item.description}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 5,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

/* ----------- List Item ----------- */
function ListItem({
  item,
  onClick,
}: {
  item: NotificationItem;
  onClick: () => void;
}) {
  const cfg = CATEGORY_CONFIG[item.category];

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 text-left transition-colors"
      style={{
        padding: "10px 4px",
        borderRadius: 10,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Thumbnail */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 11,
          background: cfg.gradient,
        }}
      >
        {item.status === "replay" && (
          <span
            className="absolute bottom-1 left-1/2 -translate-x-1/2"
            style={{
              fontSize: 7,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            REPLAY
          </span>
        )}
        {item.status === "upcoming" && (
          <span
            className="absolute"
            style={{
              top: 4,
              right: 4,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#f97316",
            }}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5" style={{ marginBottom: 2 }}>
          <span
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: cfg.accent,
            }}
          >
            {item.category === "workshop"
              ? "Workshop"
              : item.category === "video"
              ? "Video"
              : "Resource"}
          </span>
        </div>
        <div
          className="truncate"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {item.title}
        </div>
        <div
          className="truncate"
          style={{
            fontSize: 11,
            fontStyle: item.byline ? "italic" : "normal",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          {item.byline || item.description}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            marginTop: 2,
          }}
        >
          {item.timestamp}
        </div>
      </div>

      {/* Unread dot */}
      {!item.read && (
        <span
          className="shrink-0"
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#f97316",
            boxShadow: "0 0 8px rgba(249,115,22,0.5)",
          }}
        />
      )}
    </button>
  );
}
