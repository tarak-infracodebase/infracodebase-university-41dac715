import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignedOut } from "@clerk/clerk-react";
import { LogIn, Home, FileText, Compass, Hammer, Play, Radio, Calendar, LayoutDashboard, MessageSquare, User, FolderOpen } from "lucide-react";

const sections = [
  {
    label: "DISCOVER",
    items: [
      { title: "Home", path: "/", icon: Home },
      { title: "Our Story", path: "/our-story", icon: FileText },
    ],
  },
  {
    label: "LEARN",
    items: [
      { title: "Training", path: "/training", icon: Compass },
      { title: "Hands-On Training", path: "/hands-on", icon: Hammer },
      { title: "Video Library", path: "/videos", icon: Play },
    ],
  },
  {
    label: "LIVE",
    items: [
      { title: "Workshops", path: "/workshops", icon: Radio },
      { title: "Events", path: "/events", icon: Calendar },
    ],
    externalItems: [
      { title: "Build with Her", href: "https://buildwithher.infracodebase.com", icon: Home, amber: true },
    ],
  },
  {
    label: "ME",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { title: "Feedback", path: "/feedback", icon: MessageSquare },
      { title: "Profile", path: "/profile", icon: User },
      { title: "Resources", path: "/resources", icon: FolderOpen },
    ],
  },
];

const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const lineBase: React.CSSProperties = {
    display: "block",
    width: 20,
    height: 1.5,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 1,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
      style={{ padding: "2px 0", gap: 4, width: 32, height: 32 }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <span style={{
        ...lineBase,
        transform: open ? "translateY(5.5px) rotate(45deg)" : "none",
      }} />
      <span style={{
        ...lineBase,
        opacity: open ? 0 : 1,
      }} />
      <span style={{
        ...lineBase,
        transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none",
      }} />
    </button>
  );
}

interface NavRowProps {
  title: string;
  path: string;
  icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
  onNavigate: (path: string) => void;
}

function NavRow({ title, path, icon: Icon, onNavigate }: NavRowProps) {
  return (
    <button
      onClick={() => onNavigate(path)}
      className="w-full flex items-center gap-3 active:bg-white/[0.03] transition-colors"
      style={{
        padding: "10px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Icon style={{ width: 16, height: 16, color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
      <div className="text-left flex-1">
        <div style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: "var(--text-primary, #f8fafc)" }}>
          {title}
        </div>
        <div style={{ ...fontMono, fontSize: 12, color: "#c87040", marginTop: 1 }}>
          {path}
        </div>
      </div>
      <span style={{ ...fontMono, fontSize: 14, color: "rgba(255,255,255,0.2)" }}>→</span>
    </button>
  );
}

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <HamburgerButton open={open} onClick={() => setOpen(!open)} />
      <div
        className="lg:hidden fixed left-0 right-0 overflow-hidden"
        style={{
          top: 56, // h-14
          maxHeight: open ? 600 : 0,
          transition: "max-height 0.25s ease",
          zIndex: 49,
        }}
      >
        <div
          style={{
            background: "#0d0d0b",
            borderBottom: open ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}
        >
          {sections.map((section, idx) => (
            <div key={section.label}>
              <div style={{
                ...fontMono,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
                padding: "14px 18px 6px",
              }}>
                {section.label}
              </div>
              {section.items.map(item => (
                <NavRow key={item.path} title={item.title} path={item.path} icon={item.icon} onNavigate={handleNavigate} />
              ))}
              {"externalItems" in section && section.externalItems?.map((ext: { title: string; href: string; icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>; amber?: boolean }) => (
                <a
                  key={ext.href}
                  href={ext.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 active:bg-white/[0.03] transition-colors"
                  style={{
                    padding: "10px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <ext.icon style={{ width: 16, height: 16, color: "#d97706", flexShrink: 0 }} />
                  <div className="text-left flex-1">
                    <div style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: "#d97706" }}>
                      {ext.title} ↗
                    </div>
                  </div>
                  <span style={{ ...fontMono, fontSize: 14, color: "rgba(255,255,255,0.2)" }}>→</span>
                </a>
              ))}
              {idx < sections.length - 1 && (
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 18px" }} />
              )}
            </div>
          ))}

          {/* Sign in button (signed out only) */}
          <SignedOut>
            <div style={{ padding: "10px 18px" }}>
              <Link
                to="/sign-in"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full transition-colors"
                style={{
                  ...fontMono,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 6,
                  padding: 10,
                }}
              >
                <LogIn style={{ width: 14, height: 14 }} />
                Sign in
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
