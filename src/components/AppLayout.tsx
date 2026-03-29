import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, LayoutDashboard, Calendar,
  MessageSquare, Play, ChevronLeft, ChevronRight,
  FolderOpen, Hammer, User, Radio, Compass,
  Sun, Moon, Zap, FileText,
} from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { CrystalIcon } from "./DashboardWidgets";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { ReferralModal } from "./ReferralModal";
import { LogIn } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { NotificationBell } from "./notifications/NotificationPanel";
import { NotificationModal } from "./notifications/NotificationModal";
import { useNotifications } from "./notifications/useNotifications";

import { ExternalLink } from "lucide-react";

const navGroups = [
  {
    label: "Discover",
    items: [
      { path: "/", label: "Home", icon: Home },
      { path: "/our-story", label: "Our Story", icon: FileText },
    ],
  },
  {
    label: "Learn",
    items: [
      { path: "/training", label: "Training", icon: Compass },
      { path: "/hands-on", label: "Hands-On Training", icon: Hammer },
      { path: "/videos", label: "Video Library", icon: Play },
    ],
  },
  {
    label: "Live",
    items: [
      { path: "/workshops", label: "Workshops", icon: Radio },
      { path: "/events", label: "Events", icon: Calendar },
    ],
  },
  {
    label: "Community",
    items: [],
    externalItems: [
      { href: "https://buildwithher.infracodebase.com", label: "Build with Her", icon: ExternalLink, amber: true },
    ],
  },
  {
    label: "Me",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/feedback", label: "Feedback", icon: MessageSquare },
      { path: "/profile", label: "Profile", icon: User },
      { path: "/resources", label: "Resources", icon: FolderOpen },
    ],
  },
];

// allNavItems removed — mobile drawer uses its own link list


function useCurrentXp() {
  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem("icbu_xp") || "0", 10); } catch { return 0; }
  });

  useEffect(() => {
    const sync = () => {
      try { setXp(parseInt(localStorage.getItem("icbu_xp") || "0", 10)); } catch {}
    };
    window.addEventListener("storage", sync);
    window.addEventListener("icbu_xp_update", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("icbu_xp_update", sync);
    };
  }, []);

  return xp;
}

function SidebarUserRow({ collapsed, xp }: { collapsed: boolean; xp: number }) {
  const { user } = useUser();
  if (!user) return null;

  const initials = (user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || "U").toUpperCase();
  const displayName = user.firstName || user.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User";

  return (
    <div
      className="mx-2 mb-2 flex items-center gap-2.5"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: "8px",
        padding: collapsed ? "8px 6px" : "8px 10px",
      }}
    >
      <div className="h-7 w-7 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[11px] font-bold">
        {initials}
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
          <div className="flex items-center gap-1.5">
            <Zap className="h-2.5 w-2.5 text-crystal-yellow" />
            <span className="text-[10px] text-muted-foreground">{xp} XP</span>
            <span className="text-[10px] text-muted-foreground/50 mx-0.5">·</span>
            <span className="text-[10px] text-muted-foreground">Learner</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();
  const xp = useCurrentXp();
  const sidebarWidth = collapsed ? 56 : 220;

  return (
    <aside
      className="hidden lg:flex flex-col overflow-y-auto border-r border-border/50 custom-scrollbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        zIndex: 50,
        background: "#131316",
        transition: "width 0.2s ease",
      }}
    >
      {/* Toggle row */}
      <div className="flex items-center h-10 px-2" style={{ justifyContent: collapsed ? "center" : "flex-end" }}>
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-md transition-colors"
          style={{ width: 28, height: 28, color: "#6b6b78" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#e8e6e0"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#6b6b78"; }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-1 px-2 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={group.label}>
            {!collapsed && (
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#6b6b78",
                  padding: "0 10px",
                  marginBottom: "6px",
                  marginTop: gi === 0 ? "0px" : "16px",
                }}
              >
                {group.label}
              </div>
            )}
            {collapsed && gi > 0 && <div style={{ margin: "8px 6px", borderTop: "1px solid rgba(255,255,255,0.06)" }} />}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname === item.path || location.pathname.startsWith(item.path);
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className="flex items-center transition-colors"
                      style={{
                        fontSize: 14,
                        borderRadius: 6,
                        gap: collapsed ? 0 : 9,
                        padding: collapsed ? "7px 0" : "7px 10px",
                        justifyContent: collapsed ? "center" : "flex-start",
                        color: isActive ? "#e8e6e0" : "#9898a8",
                        background: isActive ? "#1a1a1f" : "transparent",
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "#1a1a1f";
                          (e.currentTarget as HTMLElement).style.color = "#e8e6e0";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = "#9898a8";
                        }
                      }}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                    {collapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                        style={{ background: "#1a1a1f", color: "#e8e6e0", zIndex: 999 }}>
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
              {"externalItems" in group && group.externalItems?.map((ext: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; amber?: boolean }) => (
                <div key={ext.href} className="relative group">
                  <a
                    href={ext.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center transition-colors"
                    style={{
                      fontSize: 14,
                      borderRadius: 6,
                      gap: collapsed ? 0 : 9,
                      padding: collapsed ? "7px 0" : "7px 10px",
                      justifyContent: collapsed ? "center" : "flex-start",
                      color: "#e8854a",
                      border: collapsed ? "none" : "1px solid rgba(232,133,74,0.2)",
                    }}
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" style={{ color: "#e8854a" }} />
                    {!collapsed && <span className="truncate">{ext.label} ↗</span>}
                  </a>
                  {collapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                      style={{ background: "#1a1a1f", color: "#e8854a", zIndex: 999 }}>
                      {ext.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User row */}
      <div style={{ borderTop: "1px solid #1c2e47" }} className="pt-2 pb-2 px-2">
        <SignedIn>
          <SidebarUserRow collapsed={collapsed} xp={xp} />
        </SignedIn>
      </div>
    </aside>
  );
}

export function MobileNav({ notifications: notif }: { notifications?: ReturnType<typeof useNotifications> }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:hidden">
      <Link to="/" className="flex items-center gap-2">
        <CrystalIcon color="hsl(var(--crystal-violet))" size={24} />
        <span
          className="text-[13px] leading-tight whitespace-nowrap tracking-wide"
          style={{
            background: "linear-gradient(90deg, #61BB46, #FDB827, #F5821F, #E03A3E, #963D97, #009DDC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.88,
            filter: "saturate(0.85)",
          }}
        >
          <span className="font-medium">Infracodebase</span>{" "}
          <span className="font-normal">University</span>
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <SignedIn><ReferralModal /></SignedIn>
        <XpPill />
        <ThemeToggleButton />
        {notif && <div className="relative z-10"><NotificationBell {...notif} /></div>}
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action label="Profile" labelIcon={<User className="h-4 w-4" />} onClick={() => navigate("/profile")} />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <MobileDrawer />
      </div>
    </header>
  );
}


function XpPill() {
  const xp = useCurrentXp();
  return (
    <SignedIn>
      <div
        className="flex items-center gap-1.5"
        style={{
          background: "rgba(34,211,238,0.08)",
          border: "1px solid rgba(34,211,238,0.2)",
          padding: "4px 10px",
          borderRadius: "9999px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#22d3ee",
        }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
        </span>
        {xp} XP
      </div>
    </SignedIn>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const notif = useNotifications();
  const { user, isSignedIn, isLoaded } = useUser();
  const autoShowFired = useRef(false);

  // Clear session flag on sign out
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      sessionStorage.removeItem("icbu_notif_modal_shown");
    }
  }, [isLoaded, isSignedIn]);

  // Auto-show notification modal after sign-up or sign-in
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || autoShowFired.current) return;

    const firstUnread = notif.allNotifications.find((n) => !n.read);
    if (!firstUnread) return;

    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
    const isNewUser = Date.now() - createdAt < 60_000;

    if (isNewUser) {
      // Sign up → always show
      autoShowFired.current = true;
      const timer = setTimeout(() => {
        notif.openNotification(firstUnread);
        sessionStorage.setItem("icbu_notif_modal_shown", "1");
      }, 600);
      return () => clearTimeout(timer);
    }

    // Sign in → show once per session if unread exist
    const alreadyShown = sessionStorage.getItem("icbu_notif_modal_shown");
    if (!alreadyShown && notif.unreadCount > 0) {
      autoShowFired.current = true;
      const timer = setTimeout(() => {
        notif.openNotification(firstUnread);
        sessionStorage.setItem("icbu_notif_modal_shown", "1");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, user, notif.allNotifications, notif.unreadCount, notif.openNotification]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <MobileNav notifications={notif} />
      {/* Desktop User Button / Sign In */}
      <div className="hidden lg:flex items-center gap-3 fixed top-4 right-6 z-50">
        <SignedIn><ReferralModal /></SignedIn>
        <XpPill />
        <ThemeToggleButton />
        <div className="relative z-10"><NotificationBell {...notif} /></div>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 border-2 border-border/50 shadow-lg",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action label="Profile" labelIcon={<User className="h-4 w-4" />} onClick={() => navigate("/profile")} />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors">
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
        </SignedOut>
      </div>
      <NotificationModal open={notif.modalOpen} initialId={notif.modalInitialId} onClose={notif.closeModal} />
      <style>{`@media (min-width: 1024px) { .app-main-content { margin-left: ${collapsed ? 56 : 220}px; transition: margin-left 0.2s ease; } }`}</style>
      <main className="app-main-content min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center rounded-full border border-border/50 bg-card text-foreground hover:bg-muted/50 transition-colors"
      style={{ width: 40, height: 40 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-[22px] w-[22px]" /> : <Moon className="h-[22px] w-[22px]" />}
    </button>
  );
}
