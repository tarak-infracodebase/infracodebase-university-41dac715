import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  X, Users, Calendar, Clock, Layers, Shield, Lock, Zap,
  Film, Image, FileText, BarChart3, Cpu, Terminal, BookOpen,
  Cloud, Map,
} from "lucide-react";
import { NOTIFICATIONS, NotificationCategory } from "@/data/notifications";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  users: Users, calendar: Calendar, clock: Clock, layers: Layers,
  shield: Shield, lock: Lock, zap: Zap, film: Film, image: Image,
  file: FileText, "bar-chart": BarChart3, cpu: Cpu, terminal: Terminal,
  "book-open": BookOpen, cloud: Cloud, map: Map,
};

const CATEGORY_CONFIG: Record<
  NotificationCategory,
  { gradient: string; accent: string; badgeBg: string; badgeBorder: string; badgeText: string }
> = {
  workshop: { gradient: "linear-gradient(145deg, #5a1908 0%, #580f3e 100%)", accent: "#fb923c", badgeBg: "rgba(251,146,60,0.15)", badgeBorder: "rgba(251,146,60,0.3)", badgeText: "#fdba74" },
  video: { gradient: "linear-gradient(145deg, #092e48 0%, #0b4a47 100%)", accent: "#38bdf8", badgeBg: "rgba(56,189,248,0.15)", badgeBorder: "rgba(56,189,248,0.28)", badgeText: "#7dd3fc" },
  module: { gradient: "linear-gradient(145deg, #2c0550 0%, #183076 100%)", accent: "#a78bfa", badgeBg: "rgba(139,92,246,0.18)", badgeBorder: "rgba(139,92,246,0.32)", badgeText: "#c4b5fd" },
};

const CTA_ROUTES: Record<string, string> = {
  "View Workshop": "/workshops",
  "View Video Library": "/videos",
  "View Training": "/training",
};

function getIcon(name: string) {
  return ICON_MAP[name] || FileText;
}

interface NotificationModalProps {
  open: boolean;
  initialId: number | null;
  onClose: () => void;
}

export function NotificationModal({ open, initialId, onClose }: NotificationModalProps) {
  const navigate = useNavigate();
  // Slide 0 = intro video; slides 1..N = NOTIFICATIONS[0..N-1]
  const total = NOTIFICATIONS.length + 1;
  const [index, setIndex] = useState(0);

  // Reset to slide 0 (intro) when modal opens; jump to specific notification if requested
  useEffect(() => {
    if (!open) return;
    if (initialId !== null) {
      const i = NOTIFICATIONS.findIndex(n => n.id === initialId);
      setIndex(i >= 0 ? i + 1 : 0);
    } else {
      setIndex(0);
    }
  }, [open, initialId]);

  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  const goPrev = useCallback(() => {
    setIndex(i => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex(i => Math.min(total - 1, i + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goPrev, goNext, onClose]);

  if (!open) return null;

  // For notification slides (index >= 1)
  const notifIndex = index - 1;
  const notification = index > 0 ? NOTIFICATIONS[notifIndex] : null;
  const cfg = notification ? CATEGORY_CONFIG[notification.category] : null;
  const m = notification?.modal ?? null;

  const handleCta = () => {
    if (!m) return;
    onClose();
    const route = CTA_ROUTES[m.cta];
    if (route) navigate(route);
  };

  const arrowStyle = (disabled: boolean): React.CSSProperties => ({
    width: 40, height: 40, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.2 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "all 150ms",
  });

  // ── Intro slide (index === 0) ────────────────────────────────────────
  const renderIntroSlide = () => (
    <div
      key="intro"
      className="flex"
      style={{
        flex: 1, background: "#0f0f13",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 22, overflow: "hidden",
        maxHeight: "85vh",
        boxShadow: "0 48px 120px rgba(0,0,0,0.8)",
        animation: "notif-modal-in 220ms cubic-bezier(0.16,1,0.3,1) forwards",
      }}
    >
      {/* LEFT PANEL */}
      <div
        className="relative hidden md:flex flex-col justify-end"
        style={{
          width: 265, minWidth: 265,
          background: "linear-gradient(160deg, #1a0a2e, #3d1a6e, #7a2d8c, #b8601a)",
          padding: "20px 22px 28px", minHeight: 440, overflow: "hidden",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 25% 68%, rgba(255,255,255,0.13) 0%, transparent 58%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 18%, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
        <div className="absolute left-0 top-0 bottom-0" style={{ width: 3, background: "#fb923c", opacity: 0.7 }} />

        <div className="relative z-10">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>
            INFRACODEBASE UNIVERSITY
          </p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.025em", color: "#fff" }}>
            This is<br />
            <em style={{ fontStyle: "italic", color: "rgba(240, 236, 228, 0.7)" }}>you, soon.</em>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: "#0f0f12", borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "26px 26px 22px" }}>
        {/* Close */}
        <button onClick={onClose} className="absolute flex items-center justify-center transition-colors" style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Badge */}
        <span className="self-start" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 12px", borderRadius: 20, background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.3)", color: "#fdba74", marginBottom: 14, display: "inline-flex", width: "fit-content" }}>
          SEE WHAT YOU'LL BE ABLE TO DO
        </span>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.93)", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 8 }}>
          From learning path to live cloud infrastructure
        </h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.43)", lineHeight: 1.68, marginBottom: 16 }}>
          Real infrastructure, real deployments — this is what you'll be building on Infracodebase after going through the university.
        </p>

        {/* YouTube embed */}
        <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", marginBottom: 16, flex: "none" }}>
          <iframe
            src="https://www.youtube.com/embed/rpgCpSshV1c"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: 10 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Infracodebase University Intro"
          />
        </div>

        {/* Divider + actions */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0 16px" }} />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 transition-colors" style={{ padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.32)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            Start learning
          </button>
          <button onClick={goNext} className="flex-[2] flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ padding: "10px 0", borderRadius: 10, background: "#fff", color: "#09090c", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none" }}>
            Next: Upcoming workshops <span style={{ fontSize: 14 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ── Notification slide (index >= 1) ──────────────────────────────────
  const renderNotificationSlide = () => {
    if (!notification || !cfg || !m) return null;
    return (
      <div
        key={notifIndex}
        className="flex"
        style={{
          flex: 1, background: "#0f0f13",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 22, overflow: "hidden",
          maxHeight: "85vh",
          boxShadow: "0 48px 120px rgba(0,0,0,0.8)",
          animation: "notif-modal-in 220ms cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="relative hidden md:flex flex-col justify-end"
          style={{ width: 265, minWidth: 265, background: cfg.gradient, padding: "20px 22px 28px", minHeight: 440, overflow: "hidden" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 25% 68%, rgba(255,255,255,0.13) 0%, transparent 58%)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 18%, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
          <div className="absolute left-0 top-0 bottom-0" style={{ width: 3, background: cfg.accent, opacity: 0.7 }} />

          {/* Tags */}
          <div className="absolute top-5 left-5 right-4 flex items-start justify-between">
            <span className="flex items-center gap-1.5" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.accent, display: "inline-block" }} />
              {m.tagLabel}
            </span>
            {m.statusTag && (
              <span style={{
                padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
                ...(m.statusTag.type === "upcoming"
                  ? { background: "rgba(249,115,22,0.25)", border: "1px solid rgba(249,115,22,0.45)", color: "#fdba74" }
                  : { background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.72)" }),
              }}>
                {m.statusTag.label}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>
              {m.eyebrow}
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.025em", color: "#fff" }}>
              {m.leftTitle.split("\n").map((line, i) =>
                i === 1
                  ? <span key={i}><br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{line}</em></span>
                  : <span key={i}>{line}</span>
              )}
            </p>
            {m.speakers.length > 0 && (
              <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
                {m.speakers.map(s => (
                  <span key={s} style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: "#0f0f12", borderLeft: "1px solid rgba(255,255,255,0.08)", padding: "26px 26px 22px" }}>
          {/* Close */}
          <button onClick={onClose} className="absolute flex items-center justify-center transition-colors" style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Badge */}
          <span className="self-start" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 12px", borderRadius: 20, background: cfg.badgeBg, border: `1px solid ${cfg.badgeBorder}`, color: cfg.badgeText, marginBottom: 14, display: "inline-flex", width: "fit-content" }}>{m.badge}</span>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.93)", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 8 }}>{m.title}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.43)", lineHeight: 1.68 }}>{m.description}</p>

          {/* Meta chips */}
          {m.meta.length > 0 && (
            <div className="flex flex-wrap gap-2" style={{ marginTop: 13 }}>
              {m.meta.map(chip => {
                const Icon = getIcon(chip.icon);
                return (
                  <span key={chip.text} className="flex items-center gap-1.5" style={{ fontSize: 12, padding: "5px 10px", borderRadius: 8, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>
                    <Icon className="h-3 w-3" />{chip.text}
                  </span>
                );
              })}
            </div>
          )}

          {/* Features */}
          <div className="space-y-4" style={{ marginTop: 20, flex: 1 }}>
            {m.features.map(feat => {
              const Icon = getIcon(feat.icon);
              return (
                <div key={feat.title} className="flex items-start gap-3">
                  <div className="shrink-0 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon className="h-4 w-4" style={{ color: "rgba(255,255,255,0.45)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.87)", marginBottom: 2 }}>{feat.title}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.36)", lineHeight: 1.55 }}>{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider + actions */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "20px 0 16px" }} />
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 transition-colors" style={{ padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.32)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Got it
            </button>
            <button onClick={handleCta} className="flex-[2] flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ padding: "10px 0", borderRadius: 10, background: "#fff", color: "#09090c", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none" }}>
              {m.cta} <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 9999, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", padding: 20 }}
      onClick={onClose}
    >
      {/* Arrow row + modal */}
      <div
        className="flex items-center gap-3"
        style={{ width: "100%", maxWidth: 820 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left arrow */}
        <button
          onClick={goPrev}
          style={arrowStyle(!hasPrev)}
          aria-label="Previous notification"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Modal content */}
        {index === 0 ? renderIntroSlide() : renderNotificationSlide()}

        {/* Right arrow */}
        <button
          onClick={goNext}
          style={arrowStyle(!hasNext)}
          aria-label="Next notification"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: 10 }}>
        {index + 1} of {total}
      </p>

      <style>{`
        @keyframes notif-modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}
