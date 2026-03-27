import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useTheme } from "@/contexts/ThemeContext";

interface EcosystemItem {
  id: string;
  name: string;
  url: string;
  cat: string;
  accent: string;
  imgHeight: number;
  img: string;
  tagline: string;
  desc: string;
  openUrl: string;
}

const items: EcosystemItem[] = [
  {
    id: "university",
    name: "Infracodebase University",
    url: "university.infracodebase.com",
    cat: "LEARN",
    accent: "#22c55e",
    imgHeight: 260,
    img: "/ecosystem/university.png",
    tagline: "Not tutorials. Real systems.",
    desc: "You don't learn infrastructure by watching. You learn it by building systems — and understanding why they work.",
    openUrl: "https://university.infracodebase.com",
  },
  {
    id: "buildwither",
    name: "Build with Her",
    url: "buildwithher.infracodebase.com",
    cat: "COMMUNITY",
    accent: "#ec4899",
    imgHeight: 200,
    img: "/ecosystem/buildwither.png",
    tagline: "A community built on equality.",
    desc: "Women and men building cloud infrastructure together. You don't have to do this alone.",
    openUrl: "https://buildwithher.infracodebase.com",
  },
  {
    id: "periodic",
    name: "Azure Periodic Table",
    url: "azureperiodictable.com",
    cat: "REFERENCE",
    accent: "#0ea5e9",
    imgHeight: 220,
    img: "/ecosystem/periodic.png",
    tagline: "Every Azure resource, organized.",
    desc: "A comprehensive visual reference for all Azure cloud resources — color-coded by category, searchable, and downloadable.",
    openUrl: "https://www.azureperiodictable.com/",
  },
  {
    id: "templates",
    name: "Templates",
    url: "infracodebase.com/templates",
    cat: "BUILD",
    accent: "#a855f7",
    imgHeight: 240,
    img: "/ecosystem/templates.png",
    tagline: "Community infra patterns.",
    desc: "485 community-built infrastructure patterns across AWS, Azure, GCP, and Kubernetes. Fork a starting point and make it your own.",
    openUrl: "https://infracodebase.com/templates",
  },
  {
    id: "platform",
    name: "Infracodebase",
    url: "infracodebase.com",
    cat: "PLATFORM",
    accent: "#f97316",
    imgHeight: 215,
    img: "/ecosystem/platform.png",
    tagline: "The agentic platform for cloud infra.",
    desc: "Code, design, ship, and operate cloud infrastructure at enterprise scale with AI.",
    openUrl: "https://infracodebase.com",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "youtube.com/@infracodebase",
    cat: "WATCH",
    accent: "#ef4444",
    imgHeight: 200,
    img: "/ecosystem/youtube.png",
    tagline: "Engineering walkthroughs, live.",
    desc: "43 videos covering infrastructure engineering, platform demos, webinars, and community sessions.",
    openUrl: "https://youtube.com/@infracodebase",
  },
  {
    id: "docs",
    name: "Documentation",
    url: "infracodebase.com/docs",
    cat: "REFERENCE",
    accent: "#3b82f6",
    imgHeight: 250,
    img: "/ecosystem/docs.png",
    tagline: "Everything you need to build.",
    desc: "Full platform reference — getting started, provider setup, agent configuration, rulesets, workspace management, and API reference.",
    openUrl: "https://infracodebase.com/docs",
  },
];

export default function Resources() {
  const [active, setActive] = useState<EcosystemItem | null>(null);
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <AppLayout>
      <div style={{ background: dark ? "#090907" : "#ffffff", padding: "36px 32px", minHeight: "100vh" }}>

        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.35)", marginBottom: 6
        }}>
          The ecosystem
        </p>
        <h1 style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 28, fontWeight: 700, color: dark ? "#f0ece3" : "#0f172a", marginBottom: 4
        }}>
          YOUR ecosystem.
        </h1>
        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: 12,
          color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.45)", marginBottom: 24
        }}>
          Every part of Infracodebase — click any card to explore
        </p>

        <div style={{ columns: 3, columnGap: 8 }} className="max-[768px]:!columns-1 min-[769px]:max-[1024px]:!columns-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActive(item)}
              className="ecosystem-card"
              style={{
                breakInside: "avoid",
                marginBottom: 8,
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                background: dark ? "#0d0f11" : "#f8f9fa",
                border: `0.5px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                transition: "transform 0.15s",
              }}
            >
              <div style={{ height: 2, background: item.accent }} />

              <div style={{ position: "relative", overflow: "hidden", height: item.imgHeight }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "100%", height: item.imgHeight,
                    objectFit: "cover", objectPosition: "top",
                    display: "block", transition: "filter 0.15s"
                  }}
                />
                <div className="ecosystem-card-overlay" style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace", fontSize: 11,
                    color: "#fff", border: "1px solid rgba(255,255,255,0.7)",
                    padding: "7px 18px", borderRadius: 20,
                    background: "rgba(0,0,0,0.3)"
                  }}>
                    Explore →
                  </span>
                </div>
              </div>

              <div style={{
                padding: "9px 12px 11px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 8
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: dark ? "#f0ece3" : "#0f172a", lineHeight: 1.2 }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: 10, fontFamily: "'Courier New', monospace",
                    color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.4)", marginTop: 1
                  }}>
                    {item.url}
                  </div>
                </div>
                <div style={{
                  fontSize: 9, fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "2px 7px", borderRadius: 3, flexShrink: 0,
                  fontWeight: 500,
                  background: `${item.accent}18`,
                  color: item.accent
                }}>
                  {item.cat}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .ecosystem-card:hover { transform: scale(1.015); }
          .ecosystem-card:hover img { filter: brightness(0.7); }
          .ecosystem-card-overlay { opacity: 0; transition: opacity 0.15s; }
          .ecosystem-card:hover .ecosystem-card-overlay { opacity: 1; }
        `}</style>
      </div>

      {active && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
          style={{
            position: "fixed", inset: 0,
            background: dark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, padding: 32
          }}
        >
          <style>{`@keyframes glowSpin { to { filter: hue-rotate(360deg); } }`}</style>
          <div style={{
            borderRadius: 20, padding: "2.5px",
            background: "conic-gradient(from 0deg, #ff5500, #cc2288, #7722ee, #2255ff, #00ccaa, #ffaa00, #ff5500)",
            animation: "glowSpin 4s linear infinite",
            width: "min(640px, 90vw)"
          }}>
            <div style={{ background: dark ? "#0d0d11" : "#ffffff", borderRadius: 18, overflow: "hidden" }}>

              <div style={{ position: "relative", height: 340, overflow: "hidden", background: dark ? "#0d0d11" : "#ffffff" }}>
                <img
                  src={active.img}
                  alt={active.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "top"
                  }}
                />
                <button
                  onClick={() => setActive(null)}
                  style={{
                    position: "absolute", top: 12, right: 12, zIndex: 10,
                    width: 26, height: 26, borderRadius: "50%",
                    background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.9)",
                    color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                    border: `0.5px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: "20px 22px 22px" }}>
                <p style={{
                  fontFamily: "'Courier New', monospace", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)", marginBottom: 5
                }}>
                  {active.cat}
                </p>
                <h2 style={{
                  fontFamily: "Georgia, serif", fontSize: 20,
                  fontWeight: 700, color: dark ? "#f0ece3" : "#0f172a", marginBottom: 4
                }}>
                  {active.name}
                </h2>
                <p style={{
                  fontFamily: "Georgia, serif", fontSize: 13,
                  fontStyle: "italic", color: active.accent, marginBottom: 8
                }}>
                  {active.tagline}
                </p>
                <p style={{
                  fontFamily: "'Courier New', monospace", fontSize: 12,
                  color: dark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.55)", lineHeight: 1.75, marginBottom: 16
                }}>
                  {active.desc}
                </p>
                <button
                  onClick={() => window.open(active.openUrl, "_blank")}
                  style={{
                    fontFamily: "'Courier New', monospace", fontSize: 11,
                    padding: "9px 18px", borderRadius: 6,
                    background: active.accent, color: "#fff",
                    border: "none", cursor: "pointer", fontWeight: 500
                  }}
                >
                  Open site ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
