import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { BuildWithHerSection } from "@/components/homepage/BuildWithHerSection";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";

const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const sectionLabel = "text-[11px] tracking-[0.25em] uppercase mb-4 inline-block";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll<HTMLElement>("[data-reveal]");
    children.forEach(c => { c.style.opacity = "0"; c.style.transform = "translateY(30px)"; c.style.transition = "opacity 0.7s ease, transform 0.7s ease"; });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const t = e.target as HTMLElement; t.style.opacity = "1"; t.style.transform = "translateY(0)"; obs.unobserve(t); } });
    }, { threshold: 0.1 });
    children.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
};

function useTokens() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    dark,
    bg: dark ? "#070809" : "#ffffff",
    surface: dark ? "#12151a" : "#f1f5f9",
    sectionBg: dark ? "#0d0f11" : "#f8f9fa",
    muted: dark ? "#6b6f78" : "#475569",
    heading: dark ? "#ffffff" : "#0f172a",
    border: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cardBorder: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
    accentEmber: "#e86030",
    accentAurora: "#30c0a0",
    accentPrism: "#c060d0",
    accentNavy: "#1e3a5f",
  };
}

const communityCards = {
  tall: {
    href: "/workshops",
    accentColor: "#e86030",
    badge: "● NEXT SESSION",
    eyebrow: "WORKSHOPS",
    title: "Shift-Left Security — Building a Secure AWS Baseline from Scratch",
    desc: "Instead of adding security after the fact, we start with it. Live demo of generating secure AWS Terraform from scratch.",
    meta: "📅 Wed, April 1 · 5:00 PM CET",
    cta: "ADD TO CALENDAR →",
  },
  grid: [
    { href: "/videos", accentColor: "#a78bfa", eyebrow: "VIDEO LIBRARY", title: "Introduction to Infracodebase", badge: "GETTING STARTED", play: true },
    { href: "/videos", accentColor: "#30c0a0", eyebrow: "VIDEO LIBRARY", title: "Applying Infracodebase to Real Infrastructure", badge: "INFRASTRUCTURE ARCHITECTURE", play: true },
    { href: "/workshops", accentColor: "#e86030", eyebrow: "PAST SESSION · 49 MIN", title: "ClickOps to IaC: Azure Infrastructure Modernization", badge: "REAL INFRASTRUCTURE", extra: "March 18, 2026" },
    { href: "/events", accentColor: "#6fa3d8", eyebrow: "EVENTS", title: "Building Self-Service, Secure & Scalable Developer Platforms", badge: "FEATURED SESSION", arrow: true },
  ],
};

const Community = () => {
  const revealRef = useReveal();
  const t = useTokens();
  const cardBase = "rounded-xl transition-all duration-300 cursor-pointer";
  const cardHover = "hover:translate-y-[-4px]";

  return (
    <AppLayout>
      <Helmet>
        <title>Community — Infracodebase University</title>
        <meta name="description" content="Join the Infracodebase community. Live workshops, engineering walkthroughs, Build with Her, and events for cloud engineers." />
      </Helmet>
      <div ref={revealRef} style={{ background: t.bg, color: t.heading }}>

        {/* ═══════════ BUILD WITH HER ═══════════ */}
        <BuildWithHerSection />

        {/* ═══════════ COMMUNITY ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>COMMUNITY</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
              Learn. Build. <em className="font-light" style={{ color: t.accentEmber }}>Grow.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-2xl" style={{ ...fontMono, fontSize: 15, color: t.muted, lineHeight: 1.7 }}>
              Every week: live workshops, engineering walkthroughs, and community events so builders can learn from real systems and grow together.
            </p>

            <div data-reveal className="grid lg:grid-cols-2 gap-3 mt-10">
              {/* Tall card — workshops */}
              <Link to={communityCards.tall.href} className={`${cardBase} ${cardHover} flex flex-col justify-between p-7 min-h-[420px] lg:row-span-2`}
                style={{ background: t.surface, border: `1px solid ${t.cardBorder}`, borderTop: `2px solid ${communityCards.tall.accentColor}` }}>
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${t.accentEmber}22`, color: t.accentEmber }}>{communityCards.tall.badge}</span>
                  <div className="mt-4" style={{ ...fontMono, fontSize: 10, letterSpacing: "0.15em", color: t.muted }}>{communityCards.tall.eyebrow}</div>
                  <div className="mt-2 text-lg font-semibold leading-snug" style={{ ...fontDisplay, color: t.heading }}>{communityCards.tall.title}</div>
                  <p className="mt-3" style={{ ...fontMono, fontSize: 13, color: t.muted, lineHeight: 1.6 }}>{communityCards.tall.desc}</p>
                </div>
                <div>
                  <p className="mb-4" style={{ ...fontMono, fontSize: 12, color: t.muted }}>{communityCards.tall.meta}</p>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg,${t.accentEmber},${t.accentPrism})` }}>J</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg,${t.accentAurora},${t.accentNavy})` }}>T</div>
                    </div>
                    <span style={{ ...fontMono, fontSize: 11, color: t.muted }}>Justin & Tarak</span>
                  </div>
                  <span style={{ ...fontMono, fontSize: 12, fontWeight: 500, color: t.accentEmber }}>{communityCards.tall.cta}</span>
                </div>
              </Link>

              {/* 2×2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {communityCards.grid.map((c, i) => (
                  <Link key={i} to={c.href} className={`${cardBase} ${cardHover} block p-5`}
                    style={{ background: t.surface, border: `1px solid ${t.cardBorder}`, borderTop: `2px solid ${c.accentColor}` }}>
                    <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.12em", color: c.accentColor }}>{c.eyebrow}</div>
                    <div className="mt-2 text-sm font-semibold leading-snug" style={{ ...fontDisplay, color: t.heading }}>{c.title}</div>
                    <span className="inline-block mt-3 text-[9px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: t.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: t.muted }}>{c.badge}</span>
                    {c.play && <div className="mt-3 text-lg opacity-50">▶</div>}
                    {c.extra && <div className="mt-2" style={{ ...fontMono, fontSize: 11, color: t.muted }}>{c.extra}</div>}
                    {c.arrow && <div className="mt-3 text-sm opacity-40">→</div>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </AppLayout>
  );
};

export default Community;
