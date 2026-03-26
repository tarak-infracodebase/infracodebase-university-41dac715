import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignedOut } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";

const quickAccess = [
  { title: "Training", path: "/training" },
  { title: "Curriculum", path: "/curriculum" },
  { title: "Hands-On Labs", path: "/hands-on" },
];

const explore = [
  { title: "Workshops", path: "/workshops" },
  { title: "Manifesto", path: "/manifesto" },
  { title: "Video Library", path: "/videos" },
  { title: "Events & Lectures", path: "/events" },
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
  onNavigate: (path: string) => void;
}

function NavRow({ title, path, onNavigate }: NavRowProps) {
  return (
    <button
      onClick={() => onNavigate(path)}
      className="w-full flex items-center justify-between active:bg-white/[0.03] transition-colors"
      style={{
        padding: "10px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="text-left">
        <div style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: "var(--text-primary, #f8fafc)" }}>
          {title}
        </div>
        <div style={{ ...fontMono, fontSize: 10, color: "#c87040", marginTop: 1 }}>
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
          {/* QUICK ACCESS */}
          <div style={{
            ...fontMono,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            padding: "14px 18px 6px",
          }}>
            QUICK ACCESS
          </div>
          {quickAccess.map(item => (
            <NavRow key={item.path} title={item.title} path={item.path} onNavigate={handleNavigate} />
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 18px" }} />

          {/* EXPLORE */}
          <div style={{
            ...fontMono,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            padding: "14px 18px 6px",
          }}>
            EXPLORE
          </div>
          {explore.map(item => (
            <NavRow key={item.path} title={item.title} path={item.path} onNavigate={handleNavigate} />
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 18px" }} />

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
