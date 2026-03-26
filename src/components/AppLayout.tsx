import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, LayoutDashboard, Calendar,
  MessageSquare, Play, ChevronLeft, ChevronRight,
  X, FolderOpen, Hammer, User, Radio, Compass,
  Sun, Moon, Zap, FileText,
} from "lucide-react";
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

const navGroups = [
  {
    label: "Discover",
    items: [
      { path: "/", label: "Home", icon: Home },
      { path: "/manifesto", label: "Manifesto", icon: FileText },
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
    label: "Me",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/feedback", label: "Feedback", icon: MessageSquare },
      { path: "/profile", label: "Profile", icon: User },
      { path: "/resources", label: "Resources", icon: FolderOpen },
    ],
  },
];

// Flat list for mobile nav
const allNavItems = navGroups.flatMap(g => g.items);

function SidebarGroupLabel({ label, first }: { label: string; first?: boolean }) {
  return (
    <div
      style={{
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: "hsl(var(--muted-foreground))",
        padding: "0 8px",
        marginBottom: "6px",
        marginTop: first ? "0px" : "16px",
      }}
    >
      {label}
    </div>
  );
}

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

  return (
    <aside className={cn(
      "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-border/50">
        <Link to="/" className="flex items-center overflow-hidden">
        {collapsed ? (
            <span
              className="text-lg font-semibold"
              style={{
                background: "linear-gradient(90deg, #61BB46, #FDB827, #F5821F, #E03A3E, #963D97, #009DDC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0.88,
              }}
            >
              I
            </span>
          ) : (
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
              <span className="font-bold">Infracodebase</span>{" "}
              <span className="font-bold">University</span>
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors shrink-0"
          style={{ width: 28, height: 28 }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto custom-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={group.label}>
            {!collapsed && <SidebarGroupLabel label={group.label} first={gi === 0} />}
            {collapsed && gi > 0 && <div className="my-2 mx-2 border-t border-border/30" />}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname === item.path || location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
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
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
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
        <div className="flex items-center gap-2">
          <SignedIn><ReferralModal /></SignedIn>
          <XpPill />
          <ThemeToggleButton />
          {notif && <NotificationBell {...notif} />}
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
          <SignedOut>
            <Link to="/sign-in" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign in</span>
            </Link>
          </SignedOut>
          <button onClick={() => setOpen(true)} className="p-2 text-muted-foreground hover:text-foreground">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-card border-l border-border/50 p-4">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground"><X className="h-5 w-5" /></button>
            <nav className="mt-12 space-y-1">
              {allNavItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    location.pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
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
      <div className="hidden lg:block">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <MobileNav notifications={notif} />
      {/* Desktop User Button / Sign In */}
      <div className="hidden lg:flex items-center gap-2 fixed top-4 right-6 z-50">
        <SignedIn><ReferralModal /></SignedIn>
        <XpPill />
        <ThemeToggleButton />
        <NotificationBell {...notif} />
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
      <main className={cn(
        "transition-all duration-300 min-h-screen",
        "pt-14 lg:pt-0",
        collapsed ? "lg:pl-16" : "lg:pl-56"
      )}>
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
