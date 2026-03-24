import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, LayoutDashboard, BookOpen, Trophy, Calendar,
  MessageSquare, Play, ChevronLeft, ChevronRight,
  X, FolderOpen, Hammer, User, Radio, FileText, CreditCard, Compass,
  Sun, Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CrystalIcon } from "./DashboardWidgets";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/manifesto", label: "Manifesto", icon: FileText },
  { path: "/cards", label: "Your membership card", icon: CreditCard },
  { path: "/curriculum", label: "Training", icon: Compass },
  { path: "/hands-on", label: "Hands-On", icon: Hammer },
  { path: "/videos", label: "Video Library", icon: Play },
  { path: "/office-hours", label: "Workshops", icon: Radio },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/resources", label: "Resources", icon: FolderOpen },
];

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Logo */}
      <div className="flex items-center h-14 px-3 border-b border-border/50">
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
              <span className="font-medium">Infracodebase</span>{" "}
              <span className="font-normal">University</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
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
      </nav>

      {/* Bottom actions */}
      <div className="px-2 py-3 border-t border-border/50 space-y-0.5">
        <Link
          to="/feedback"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Feedback</span>}
        </Link>
        <button
          onClick={onToggle}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
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
          <ThemeToggleButton />
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
              {navItems.map(item => (
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

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <MobileNav />
      {/* Desktop User Button / Sign In */}
      <div className="hidden lg:flex items-center gap-2 fixed top-4 right-6 z-50">
        <ThemeToggleButton />
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
      style={{ width: 36, height: 36 }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
