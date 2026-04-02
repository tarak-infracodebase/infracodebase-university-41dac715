import { useEffect } from "react";
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

/* Per-notification typography content for thumbnails & featured banners */
const THUMB_CONTENT: Record<number, {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  pill?: string;
}> = {
  1: { eyebrow: "Upcoming Workshop", titleLine1: "Shifting", titleLine2: "Left", pill: "Tawni — Senior Full Stack · Apr 2 · 5PM CET" },
  2: { eyebrow: "Weekly Workshop — Replay", titleLine1: "Azure", titleLine2: "Migration" },
  3: { eyebrow: "New Video", titleLine1: "Scaling", titleLine2: "Infra", pill: "Manisha — DevOps Eng." },
  4: { eyebrow: "New Training Resource", titleLine1: "Azure", titleLine2: "Reference" },
  5: { eyebrow: "New Training Resource", titleLine1: "Infra", titleLine2: "Docs" },
};

const TAB_DOT_COLORS: Record<TabFilter, string> = {
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
  useEffect(() => {
    if (!panelOpen) return;
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [panelOpen, closePanel]);

  const allRead = notifications.every((n) => n.read);
  const featured = notifications[0];
  const rest = notifications.slice(1);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={togglePanel}
        className="relative flex items-center justify-center transition-colors"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
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
        <Bell className="h-[22px] w-[22px]" style={{ color: "hsl(var(--muted-foreground))" }} />
        {unreadCount > 0 && (
          <span
            className="absolute flex items-center justify-center"
            style={{
              top: 2,
              right: 2,
              minWidth: 18,
              height: 18,
              borderRadius: 999,
              background: "#f97316",
              border: "2px solid hsl(var(--background))",
              boxShadow: "0 0 10px rgba(249,115,22,0.55)",
              fontSize: 12,
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

      {/* Invisible backdrop */}
      {panelOpen && (
        <div className="fixed inset-0 z-40" onClick={closePanel} />
      )}

      {/* Panel */}
      {panelOpen && (
        <div
          className="absolute right-0 z-50"
          style={{
            top: "calc(100% + 8px)",
            width: 400,
            background: "#111113",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            animation: "notif-panel-in 180ms cubic-bezier(0.16,1,0.3,1) forwards",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Tab bar */}
          <div
            className="flex"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const hasUnread = unreadByCategory[tab.key] > 0;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 flex items-center justify-center gap-1.5 transition-colors"
                  style={{
                    padding: "14px 8px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.35)",
                    borderBottom: isActive
                      ? "2px solid rgba(255,255,255,0.7)"
                      : "2px solid transparent",
                    marginBottom: -1,
                    background: "transparent",
                    border: "none",
                    borderBottomWidth: 2,
                    borderBottomStyle: "solid",
                    borderBottomColor: isActive ? "rgba(255,255,255,0.7)" : "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  {hasUnread && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: TAB_DOT_COLORS[tab.key],
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Header */}
          <div style={{ padding: "14px 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.87)" }}>Notifications</span>
            {allRead ? (
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                All caught up
              </span>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); markAllRead(); }}
                style={{ fontSize: 12, color: "#60A5FA", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#93bbfd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#60A5FA")}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "0 18px 18px" }}>
            {/* All caught up banner */}
            {allRead && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(29, 158, 117, 0.12)',
                border: '0.5px solid rgba(29, 158, 117, 0.25)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginTop: '14px',
                marginBottom: '14px',
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(29, 158, 117, 0.2)',
                  border: '0.5px solid rgba(29, 158, 117, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.5l2 2 4-4" stroke="#1D9E75" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, margin: 0 }}>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>You're all caught up.</strong>
                  {' '}New notifications will appear here.
                </p>
              </div>
            )}

            {/* Featured card */}
            {featured && (
              <div style={{ opacity: allRead ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                <FeaturedCard
                  item={featured}
                  onClick={() => openNotification(featured)}
                />
              </div>
            )}

            {/* List items */}
            {rest.map((item, i) => (
              <ListItem
                key={item.id}
                item={item}
                onClick={() => openNotification(item)}
                isLast={i === rest.length - 1}
              />
            ))}
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
  const thumb = THUMB_CONTENT[item.id];

  return (
    <button
      onClick={onClick}
      className="w-full text-left"
      style={{
        padding: "16px 0 0",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {/* Text section */}
      <div className="flex items-start gap-2.5">
        {/* Unread dot */}
        {item.read ? (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
              marginTop: 5,
            }}
          />
        ) : (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#f97316",
              boxShadow: "0 0 8px rgba(249,115,22,0.6)",
              flexShrink: 0,
              marginTop: 5,
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: 15,
              fontWeight: item.read ? 400 : 700,
              color: item.read ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.95)",
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontSize: 13.5,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </div>
        </div>
      </div>

      {/* Typography-driven banner */}
      <div
        style={{
          width: "100%",
          height: 190,
          borderRadius: 12,
          overflow: "hidden",
          marginTop: 10,
          marginBottom: 14,
          background: cfg.gradient,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px 22px",
          position: "relative",
        }}
      >
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08), transparent 60%)",
          }}
        />

        {thumb && (
          <>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 10, position: "relative", zIndex: 1 }}>
              {thumb.eyebrow}
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, color: "rgba(255,255,255,0.95)", lineHeight: 1.0, letterSpacing: "-0.02em", position: "relative", zIndex: 1 }}>
              {thumb.titleLine1}<br />
              <em style={{ color: "rgba(255,255,255,0.65)" }}>{thumb.titleLine2}</em>
            </p>
            {thumb.pill && (
              <div style={{ marginTop: 14, display: "inline-flex", padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)", width: "fit-content", position: "relative", zIndex: 1 }}>
                {thumb.pill}
              </div>
            )}
          </>
        )}

        {/* Status badge top right */}
        {item.status === "upcoming" && (
          <div style={{ position: "absolute", top: 10, right: 10, padding: "3px 10px", borderRadius: 20, background: "rgba(249,115,22,0.25)", border: "1px solid rgba(249,115,22,0.45)", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#fdba74", zIndex: 2 }}>
            Upcoming
          </div>
        )}
        {item.status === "replay" && (
          <div style={{ position: "absolute", top: 10, right: 10, padding: "3px 10px", borderRadius: 20, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.22)", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", zIndex: 2 }}>
            Replay
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.28)",
          marginBottom: 14,
        }}
      >
        {item.timestamp}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
    </button>
  );
}

/* ----------- List Item ----------- */
function ListItem({
  item,
  onClick,
  isLast,
}: {
  item: NotificationItem;
  onClick: () => void;
  isLast: boolean;
}) {
  const cfg = CATEGORY_CONFIG[item.category];
  const thumb = THUMB_CONTENT[item.id];

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 text-left transition-colors"
      style={{
        padding: "16px 0",
        background: "transparent",
        border: "none",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.025)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Dot */}
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: item.read ? "rgba(255,255,255,0.15)" : "#f97316",
          boxShadow: item.read ? "none" : "0 0 8px rgba(249,115,22,0.6)",
          flexShrink: 0,
          marginTop: 5,
        }}
      />

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            marginBottom: 3,
          }}
        >
          {item.title}
        </div>
        <div
          className="line-clamp-2"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.55,
          }}
        >
          {item.description}
        </div>
        {item.byline && (
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              fontStyle: "italic",
              marginTop: 3,
            }}
          >
            {item.byline}
          </div>
        )}
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.28)",
            marginTop: 6,
          }}
        >
          {item.timestamp}
        </div>
      </div>

      {/* Typography-driven thumbnail */}
      <div
        className="relative shrink-0"
        style={{
          width: 84,
          height: 84,
          borderRadius: 12,
          overflow: "hidden",
          background: cfg.gradient,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "9px 10px",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />

        {thumb && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 6.5, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 4, lineHeight: 1 }}>
              {thumb.eyebrow}
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, fontWeight: 400, color: "rgba(255,255,255,0.95)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              {thumb.titleLine1}<br />
              <em style={{ color: "rgba(255,255,255,0.7)" }}>{thumb.titleLine2}</em>
            </p>
            {thumb.pill && (
              <div style={{ marginTop: 5, display: "inline-flex", padding: "2px 7px", borderRadius: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 7, fontWeight: 500, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                {thumb.pill}
              </div>
            )}
          </div>
        )}

        {item.status === "replay" && (
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.65)",
              padding: "3px 0",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.75)",
              zIndex: 2,
            }}
          >
            REPLAY
          </div>
        )}
        {item.status === "upcoming" && (
          <span
            className="absolute"
            style={{
              top: 5,
              right: 5,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#f97316",
              zIndex: 2,
            }}
          />
        )}
      </div>
    </button>
  );
}