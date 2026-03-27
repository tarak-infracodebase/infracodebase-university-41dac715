import { AppLayout } from "@/components/AppLayout";
import { useState, useEffect } from "react";

const ecosystemCards = [
  {
    id: "university",
    accent: "#22c55e",
    category: "LEARN",
    name: "Infracodebase University",
    url: "university.infracodebase.com",
    previewHeight: 180,
    image: "/ecosystem/university.png",
    description: "You don't learn infrastructure by watching. You learn it by building systems — and understanding why they work.",
    tagline: "Not tutorials. Real systems.",
    openUrl: "https://university.infracodebase.com",
  },
  {
    id: "templates",
    accent: "#a855f7",
    category: "BUILD",
    name: "Templates",
    url: "infracodebase.com/templates",
    previewHeight: 160,
    image: "/ecosystem/templates.png",
    description: "485 community-built infrastructure patterns across AWS, Azure, GCP, and Kubernetes. Fork a starting point and make it your own.",
    tagline: "Community infra patterns.",
    openUrl: "https://infracodebase.com/templates",
  },
  {
    id: "buildwithher",
    accent: "#ec4899",
    category: "COMMUNITY",
    name: "Build with Her",
    url: "buildwithher.infracodebase.com",
    previewHeight: 145,
    image: "/ecosystem/buildwither.png",
    description: "Women and men building cloud infrastructure together. You don't have to do this alone.",
    tagline: "A community built on equality.",
    openUrl: "https://buildwithher.infracodebase.com",
  },
  {
    id: "platform",
    accent: "#f97316",
    category: "PLATFORM",
    name: "Infracodebase",
    url: "infracodebase.com",
    previewHeight: 170,
    image: "/ecosystem/platform.png",
    description: "Code, design, ship, and operate cloud infrastructure at enterprise scale with AI.",
    tagline: "The agentic platform for cloud infra.",
    openUrl: "https://infracodebase.com",
  },
  {
    id: "docs",
    accent: "#3b82f6",
    category: "REFERENCE",
    name: "Documentation",
    url: "infracodebase.com/docs",
    previewHeight: 150,
    image: "/ecosystem/docs.png",
    description: "Full platform reference — getting started, provider setup, agent configuration, rulesets, workspace management, and API reference.",
    tagline: "Everything you need to build.",
    openUrl: "https://infracodebase.com/docs",
  },
  {
    id: "youtube",
    accent: "#ef4444",
    category: "WATCH",
    name: "YouTube",
    url: "youtube.com/@infracodebase",
    previewHeight: 165,
    image: "/ecosystem/youtube.png",
    description: "43 videos covering infrastructure engineering, platform demos, webinars, and community sessions.",
    tagline: "Engineering walkthroughs, live.",
    openUrl: "https://youtube.com/@infracodebase",
  },
  {
    id: "periodic",
    accent: "#0ea5e9",
    category: "REFERENCE",
    name: "Azure Periodic Table",
    url: "azureperiodictable.com",
    previewHeight: 155,
    image: "/ecosystem/periodic.png",
    description: "A comprehensive visual reference for all Azure cloud resources — color-coded by category, searchable, and downloadable.",
    tagline: "Every Azure resource, organized.",
    openUrl: "https://www.azureperiodictable.com/",
  },
];

type EcoCard = typeof ecosystemCards[number];

function EcosystemModal({ item, onClose }: { item: EcoCard; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: 22, padding: 2.5,
          background: "conic-gradient(from 0deg, #ff5500, #cc2288, #7722ee, #2255ff, #00ccaa, #ffaa00, #ff5500)",
          animation: "glowSpin 4s linear infinite",
          width: "min(820px, 92vw)",
        }}
      >
        <div style={{ background: "#0d0d11", borderRadius: 20, overflow: "hidden" }}>
          {/* Screenshot */}
          <div style={{ height: 420, overflow: "hidden", position: "relative" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", objectPosition: "center",
                background: "#0d0d11",
              }}
            />
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 10,
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px 28px", background: "#0d0d11" }}>
            <p style={{
              fontFamily: "monospace", fontSize: 9,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginBottom: 6,
            }}>
              {item.category}
            </p>
            <h2 style={{
              fontFamily: "Georgia, serif", fontSize: 22,
              fontWeight: 700, color: "#f0ece3", marginBottom: 5,
            }}>
              {item.name}
            </h2>
            <p style={{
              fontFamily: "Georgia, serif", fontSize: 14,
              fontStyle: "italic", color: item.accent, marginBottom: 10,
            }}>
              {item.tagline}
            </p>
            <p style={{
              fontFamily: "monospace", fontSize: 12,
              color: "rgba(255,255,255,0.42)", lineHeight: 1.75,
              marginBottom: 18,
            }}>
              {item.description}
            </p>
            <button
              onClick={() => window.open(item.openUrl, "_blank")}
              style={{
                fontFamily: "monospace", fontSize: 11,
                padding: "9px 18px", borderRadius: 6,
                background: item.accent, color: "#fff",
                border: "none", cursor: "pointer", fontWeight: 500,
              }}
            >
              Open site ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Resources = () => {
  const [selected, setSelected] = useState<EcoCard | null>(null);

  return (
    <AppLayout>
      <style>{`
        @keyframes glowSpin {
          to { filter: hue-rotate(360deg); }
        }
      `}</style>

      <div style={{ background: "#090907", minHeight: "100vh", padding: "40px 32px" }}>
        {/* Header */}
        <p
          className="font-mono"
          style={{
            fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: 8,
          }}
        >
          The ecosystem
        </p>
        <h1
          className="font-serif"
          style={{ fontSize: 32, fontWeight: 700, color: "#f0ece3", marginBottom: 5 }}
        >
          YOUR ecosystem.
        </h1>
        <p
          className="font-mono"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32 }}
        >
          Every part of Infracodebase — click any card to explore
        </p>

        {/* Masonry grid */}
        <div style={{ columns: 3, columnGap: 10 }} className="max-[768px]:!columns-1 min-[769px]:max-[1024px]:!columns-2">
          {ecosystemCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelected(card)}
              style={{
                breakInside: "avoid",
                marginBottom: 10,
                borderRadius: 12,
                overflow: "hidden",
                border: "0.5px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "transform 0.18s",
              }}
              className="group hover:-translate-y-1"
            >
              {/* Preview image */}
              <div style={{ height: card.previewHeight, position: "relative", overflow: "hidden" }}>
                <img
                  src={card.image}
                  alt={card.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "top",
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{
                    border: "1px solid rgba(255,255,255,0.5)",
                    padding: "8px 18px", borderRadius: 20,
                    color: "#fff", fontSize: 12, fontFamily: "monospace",
                  }}>
                    Explore →
                  </span>
                </div>
              </div>

              {/* Footer strip */}
              <div style={{
                borderTop: `2px solid ${card.accent}`,
                padding: "10px 14px",
                background: "#0d0d11",
              }}>
                <p style={{
                  fontFamily: "monospace", fontSize: 9,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)", marginBottom: 3,
                }}>
                  {card.category}
                </p>
                <p style={{
                  fontSize: 13, fontWeight: 600,
                  color: "rgba(255,255,255,0.82)", marginBottom: 2,
                }}>
                  {card.name}
                </p>
                <p style={{
                  fontFamily: "monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.25)",
                }}>
                  {card.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <EcosystemModal item={selected} onClose={() => setSelected(null)} />}
    </AppLayout>
  );
};

export default Resources;
