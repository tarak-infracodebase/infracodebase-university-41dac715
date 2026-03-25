import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X, Users, Calendar, Clock, Layers, Shield, Lock, Zap,
  Film, Image, FileText, BarChart3, Cpu, Terminal, BookOpen,
  Cloud, Map,
} from "lucide-react";
import { NotificationItem, NotificationCategory } from "@/data/notifications";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  users: Users,
  calendar: Calendar,
  clock: Clock,
  layers: Layers,
  shield: Shield,
  lock: Lock,
  zap: Zap,
  film: Film,
  image: Image,
  file: FileText,
  "bar-chart": BarChart3,
  cpu: Cpu,
  terminal: Terminal,
  "book-open": BookOpen,
  cloud: Cloud,
  map: Map,
};

const CATEGORY_CONFIG: Record<
  NotificationCategory,
  {
    gradient: string;
    accent: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
  }
> = {
  workshop: {
    gradient: "linear-gradient(145deg, #5a1908 0%, #580f3e 100%)",
    accent: "#fb923c",
    badgeBg: "rgba(251,146,60,0.15)",
    badgeBorder: "rgba(251,146,60,0.3)",
    badgeText: "#fdba74",
  },
  video: {
    gradient: "linear-gradient(145deg, #092e48 0%, #0b4a47 100%)",
    accent: "#38bdf8",
    badgeBg: "rgba(56,189,248,0.15)",
    badgeBorder: "rgba(56,189,248,0.28)",
    badgeText: "#7dd3fc",
  },
  module: {
    gradient: "linear-gradient(145deg, #2c0550 0%, #183076 100%)",
    accent: "#a78bfa",
    badgeBg: "rgba(139,92,246,0.18)",
    badgeBorder: "rgba(139,92,246,0.32)",
    badgeText: "#c4b5fd",
  },
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
  item: NotificationItem | null;
  onClose: () => void;
}

export function NotificationModal({ item, onClose }: NotificationModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;

  const cfg = CATEGORY_CONFIG[item.category];
  const m = item.modal;

  const handleCta = () => {
    onClose();
    const route = CTA_ROUTES[m.cta];
    if (route) navigate(route);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex"
        style={{
          maxWidth: 740,
          width: "100%",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 48px 120px rgba(0,0,0,0.8)",
          overflow: "hidden",
          animation:
            "notif-modal-in 220ms cubic-bezier(0.16,1,0.3,1) forwards",
          maxHeight: "90vh",
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="relative hidden md:flex flex-col justify-end"
          style={{
            width: 265,
            minWidth: 265,
            background: cfg.gradient,
            padding: "20px 22px 28px",
          }}
        >
          {/* Glow overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 25% 68%, rgba(255,255,255,0.14), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 82% 18%, rgba(255,255,255,0.06), transparent 50%)",
            }}
          />
          {/* Left accent stripe */}
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: 3,
              background: cfg.accent,
              opacity: 0.7,
            }}
          />

          {/* Tag + status pills */}
          <div className="absolute top-16 left-5 right-5 flex items-start justify-between">
            <span
              className="flex items-center gap-1.5"
              style={{
                fontSize: 10,
                fontWeight: 500,
                padding: "3px 9px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.14)",
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
              {m.tagLabel}
            </span>
            {m.statusTag?.type === "replay" && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Replay
              </span>
            )}
            {m.statusTag?.type === "upcoming" && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: "rgba(249,115,22,0.22)",
                  border: "1px solid rgba(249,115,22,0.45)",
                  color: "#fdba74",
                }}
              >
                Upcoming
              </span>
            )}
          </div>

          {/* Bottom content */}
          <div className="relative z-10">
            <div
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 8,
              }}
            >
              {m.eyebrow}
            </div>
            <div
              style={{
                fontSize: 40,
                lineHeight: 1.05,
                color: "#fff",
                fontFamily: '"DM Serif Display", serif',
                whiteSpace: "pre-line",
              }}
            >
              {m.leftTitle.split("\n").map((line, i) => (
                <span key={i}>
                  {i === 1 ? <em>{line}</em> : line}
                  {i === 0 && <br />}
                </span>
              ))}
            </div>
            {m.speakers.length > 0 && (
              <div className="flex flex-wrap gap-1.5" style={{ marginTop: 14 }}>
                {m.speakers.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="flex-1 flex flex-col overflow-y-auto"
          style={{
            background: "#0f0f12",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            padding: "26px 26px 22px",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end" style={{ marginBottom: 12 }}>
            <button
              onClick={onClose}
              className="flex items-center justify-center transition-colors"
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
            >
              <X className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
            </button>
          </div>

          {/* Badge */}
          <span
            className="self-start"
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "4px 10px",
              borderRadius: 6,
              background: cfg.badgeBg,
              border: `1px solid ${cfg.badgeBorder}`,
              color: cfg.badgeText,
              marginBottom: 14,
            }}
          >
            {m.badge}
          </span>

          {/* Title */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "rgba(255,255,255,0.93)",
              letterSpacing: "-0.025em",
              marginBottom: 10,
            }}
          >
            {m.title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.43)",
              lineHeight: 1.68,
              marginBottom: 16,
            }}
          >
            {m.description}
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 20 }}>
            {m.meta.map((chip) => {
              const Icon = getIcon(chip.icon);
              return (
                <span
                  key={chip.text}
                  className="flex items-center gap-1.5"
                  style={{
                    fontSize: 11,
                    padding: "5px 10px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  <Icon className="h-3 w-3" />
                  {chip.text}
                </span>
              );
            })}
          </div>

          {/* Features */}
          <div className="space-y-4" style={{ marginBottom: 18 }}>
            {m.features.map((feat) => {
              const Icon = getIcon(feat.icon);
              return (
                <div key={feat.title} className="flex items-start gap-3">
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.055)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.87)",
                        marginBottom: 2,
                      }}
                    >
                      {feat.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.36)",
                        lineHeight: 1.5,
                      }}
                    >
                      {feat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              marginBottom: 16,
            }}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 transition-colors"
              style={{
                padding: "10px 0",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "rgba(255,255,255,0.32)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
              }
            >
              Got it
            </button>
            <button
              onClick={handleCta}
              className="flex-[2] flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{
                padding: "10px 0",
                borderRadius: 10,
                background: "#fff",
                color: "#09090c",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              {m.cta}
              <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes notif-modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
