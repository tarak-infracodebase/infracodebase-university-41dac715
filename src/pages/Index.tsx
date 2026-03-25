import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/* ── scroll-reveal hook ── */
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

/* ── shared styles ── */
const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const sectionLabel = "text-[11px] tracking-[0.25em] uppercase mb-4 inline-block";

const RAINBOW_CSS = "linear-gradient(90deg,#61bb46,#fdb827,#f5821f,#e03a3e,#963d97,#009ddc)";

/* ── theme-aware tokens ── */
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
    cardBorderHover: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.16)",
    subtleLine: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
    strongText: dark ? "#ffffff" : "#0f172a",
    pillPrimary: dark ? { background: "#fff", color: "#000" } : { background: "#0f172a", color: "#fff" },
    pillSecondary: dark
      ? { border: "1px solid rgba(255,255,255,0.15)", color: "#6b6f78" }
      : { border: "1px solid rgba(0,0,0,0.15)", color: "#475569" },
    accentEmber: "#e86030",
    accentAurora: "#30c0a0",
    accentPrism: "#c060d0",
    accentBronze: "#9a6b3a",
    accentSage: "#3a7a5a",
    accentNavy: "#1e3a5f",
  };
}

/* ── prerequisite tracks ── */
const prereqTracks = [
  { label: "Cloud & Infra · Track 1", title: "Introduction", href: "/path/cloud-infrastructure-intro", level: "Beginner", accent: "#3a7a5a", desc: "Cloud concepts, core services, and introduction to Infrastructure as Code." },
  { label: "Cloud & Infra · Track 2", title: "Foundations", href: "/path/prereq-foundations", level: "Beginner", accent: "#1e3a5f", desc: "Deeper into networking, storage, compute, and IAM across providers." },
  { label: "Cloud & Infra · Track 3", title: "Intermediate", href: "/path/prereq-intermediate", level: "Intermediate", accent: "#e86030", desc: "Multi-cloud patterns, CI/CD pipelines, and state management." },
  { label: "Cloud & Infra · Track 4", title: "Expert", href: "/path/prereq-expert", level: "Advanced", accent: "#c060d0", desc: "Platform engineering, zero-trust networking, and disaster recovery." },
];

const curriculumModules = [
  { mod: 1, title: "Welcome & Orientation", href: "/path/welcome-orientation", level: "Beginner", accent: "#3a7a5a", span2: true },
  { mod: 2, title: "Foundations – Understanding Infracodebase", href: "/path/foundations", level: "Beginner", accent: "#1e3a5f" },
  { mod: 3, title: "Real Infrastructure Engineering", href: "/path/real-infrastructure-engineering", level: "Intermediate", accent: "#e86030" },
  { mod: 4, title: "Architecture Diagrams & Living Documentation", href: "/path/architecture-diagrams", level: "Intermediate", accent: "#9a6b3a" },
  { mod: 5, title: "Enterprise Governance & Platform Engineering", href: "/path/enterprise-governance", level: "Intermediate", accent: "#30c0a0" },
  { mod: 6, title: "Advanced Infrastructure Architecture", href: "/path/advanced-architecture", level: "Advanced", accent: "#c060d0" },
  { mod: 7, title: "Review & Wrap-Up", href: "/path/review-wrapup", level: "Advanced", accent: "rainbow" },
];

const levelColor = (l: string) => l === "Beginner" ? "#3a7a5a" : l === "Intermediate" ? "#e86030" : "#c060d0";

/* ── who it's for ── */
const personas = [
  { icon: "⬡", title: "Platform Engineers", color: "#e86030" },
  { icon: "◈", title: "DevOps Engineers", color: "#30c0a0" },
  { icon: "△", title: "Cloud Architects", color: "#c060d0" },
  { icon: "◎", title: "Cloud Engineers", color: "#9a6b3a" },
  { icon: "⬡", title: "Engineering Teams", color: "#3a7a5a" },
  { icon: "◈", title: "Technical Leaders", color: "#1e3a5f" },
];

/* ── use cases ── */
const useCaseGroups = [
  {
    label: "Build new", accent: "#3a7a5a",
    items: [
      { title: "Landing zones & new environments", desc: "Design and deploy greenfield cloud environments with IaC from day one." },
      { title: "Reusable modules for shift-left", desc: "Create standardized, composable Terraform modules your teams can adopt." },
      { title: "Multi-cloud expansion", desc: "Extend your footprint to new providers with consistent tooling." },
      { title: "New platforms with limited expertise", desc: "Bootstrap infrastructure platforms even without deep domain knowledge." },
    ],
  },
  {
    label: "Modernize & migrate", accent: "#e86030",
    items: [
      { title: "Click-ops to IaC", desc: "Migrate manually managed infrastructure to code-driven workflows." },
      { title: "Cloud to cloud migration", desc: "Orchestrate cross-cloud migrations with confidence and documentation." },
      { title: "On-prem to cloud", desc: "Plan and execute datacenter-to-cloud migrations at scale.", span2: true },
    ],
  },
  {
    label: "Extend & improve", accent: "#c060d0",
    items: [
      { title: "Extend existing infrastructure", desc: "Add new capabilities to existing stacks without starting over." },
      { title: "Security audits & improvements", desc: "Audit, remediate, and harden your infrastructure posture." },
      { title: "Cost analysis & optimization", desc: "Identify waste and right-size your cloud spend." },
      { title: "Architecture diagrams", desc: "Generate and maintain living documentation of your systems." },
    ],
  },
];

/* ── community cards ── */
const communityCards = {
  tall: {
    href: "/workshops",
    accentColor: "#e86030",
    badge: "● NEXT SESSION",
    eyebrow: "WORKSHOPS",
    title: "Shift-Left Security — Building a Secure AWS Baseline from Scratch",
     desc: "Instead of adding security after the fact, we start with it. Live demo of generating secure AWS Terraform from scratch.",
     meta: "📅 Wed, April 2 · 5:00 PM CET",
    cta: "ADD TO CALENDAR →",
  },
  grid: [
    { href: "/videos", accentColor: "#a78bfa", eyebrow: "VIDEO LIBRARY", title: "Introduction to Infracodebase", badge: "GETTING STARTED", play: true },
    { href: "/videos", accentColor: "#30c0a0", eyebrow: "VIDEO LIBRARY", title: "Applying Infracodebase to Real Infrastructure", badge: "INFRASTRUCTURE ARCHITECTURE", play: true },
    { href: "/workshops", accentColor: "#e86030", eyebrow: "PAST SESSION · 49 MIN", title: "ClickOps to IaC: Azure Infrastructure Modernization", badge: "REAL INFRASTRUCTURE", extra: "March 18, 2026" },
    { href: "/events", accentColor: "#6fa3d8", eyebrow: "EVENTS", title: "Building Self-Service, Secure & Scalable Developer Platforms", badge: "FEATURED SESSION", arrow: true },
  ],
};

/* ══════════════════════════════════ COMPONENT ══════════════════════════════════ */

const Index = () => {
  const revealRef = useReveal();
  const t = useTokens();

  const pill = `inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 cursor-pointer`;
  const cardBase = `rounded-xl transition-all duration-300 cursor-pointer`;
  const cardHover = "hover:translate-y-[-4px]";

  return (
    <AppLayout>
      <div ref={revealRef} style={{ background: t.bg, color: t.heading }}>

        {/* ── GRAIN OVERLAY ── */}
        <div style={{
          position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 9999,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* ═══════════ 1 · HERO ═══════════ */}
        <section className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ minHeight: "100vh", padding: "60px 24px 80px" }}>
          {/* ambient blobs — only in dark mode */}
          {t.dark && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute" style={{ top: "20%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${t.accentEmber}10 0%,transparent 70%)` }} />
              <div className="absolute" style={{ top: "40%", right: "10%", width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,${t.accentAurora}0d 0%,transparent 70%)` }} />
              <div className="absolute" style={{ bottom: "15%", left: "40%", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle,${t.accentPrism}0d 0%,transparent 70%)` }} />
            </div>
          )}

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* eyebrow */}
            <div data-reveal className="flex items-center gap-4 justify-center mb-10" style={{ ...fontMono, animationDelay: "0s" }}>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: t.subtleLine }} />
              <span style={{ color: t.muted, fontSize: 11, letterSpacing: "0.25em" }}>INFRACODEBASE UNIVERSITY · 2026</span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: t.subtleLine }} />
            </div>

            {/* H1 */}
            <h1 data-reveal style={{ ...fontDisplay, animationDelay: "0.1s" }}>
              <span className="block font-black" style={{ fontSize: "clamp(48px, 8vw, 116px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: t.heading }}>
                Learn infrastructure.
              </span>
              <span className="block font-light italic" style={{
                fontSize: "clamp(48px, 8vw, 116px)", lineHeight: 1.05, letterSpacing: "-0.03em",
                background: RAINBOW_CSS, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Differently.
              </span>
            </h1>

            {/* subtitle */}
            <p data-reveal className="mx-auto mt-8 max-w-2xl" style={{ ...fontMono, fontSize: 14, lineHeight: 1.7, color: t.muted, animationDelay: "0.2s" }}>
              A structured learning program for cloud engineers. Design, build, document, and govern infrastructure as code — through a progressive curriculum built for real systems.
            </p>

            {/* CTAs */}
            <div data-reveal className="flex flex-wrap gap-4 justify-center mt-10" style={{ animationDelay: "0.3s" }}>
              <Link to="/training" className={pill} style={t.pillPrimary}>
                <span style={fontMono}>Begin training →</span>
              </Link>
              <Link to="/manifesto" className={pill} style={t.pillSecondary}>
                <span style={fontMono}>Read our Manifesto</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ 2 · WHAT IS IT ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>WHAT IS IT</span>
                <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, color: t.heading }}>
                  Infrastructure as code,{" "}
                  <em className="font-light" style={{ color: t.accentAurora }}>not clicks.</em>
                </h2>
                <p data-reveal className="mt-5" style={{ ...fontMono, fontSize: 14, lineHeight: 1.75, color: t.muted }}>
                  Infracodebase University is a <strong style={{ color: t.strongText, fontWeight: 500 }}>structured learning program</strong> for cloud engineers. Instead of fragmented tutorials, you follow a <strong style={{ color: t.strongText, fontWeight: 500 }}>progressive curriculum</strong> — designing and governing systems the way they're actually built with <strong style={{ color: t.strongText, fontWeight: 500 }}>AI-powered Terraform workflows</strong>.
                </p>
              </div>
              <div data-reveal className="grid grid-cols-2 gap-3">
                {[
                  { num: "7", label: "Core weeks", color: t.accentEmber },
                  { num: "4", label: "Prereq tracks", color: t.accentAurora },
                  { num: "50+", label: "Lessons", color: t.accentPrism },
                  { num: "∞", label: "Community", color: t.accentBronze },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-6 transition-colors duration-300 hover:brightness-110" style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}>
                    <div style={{ ...fontDisplay, fontSize: 40, fontWeight: 900, color: s.color }}>{s.num}</div>
                    <div style={{ ...fontMono, fontSize: 12, color: t.muted, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ 3 · LEARNING PATHS ═══════════ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>TRAINING</span>
          <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>Learning paths.</h2>
          <p data-reveal className="mt-3 max-w-xl" style={{ ...fontMono, fontSize: 14, color: t.muted, lineHeight: 1.7 }}>
            Start with cloud & infrastructure prerequisites, then move through the Infracodebase curriculum. Each module builds on the last.
          </p>

          {/* Part A — prerequisites */}
          <h3 data-reveal className="mt-14 mb-5" style={{ ...fontMono, fontSize: 12, letterSpacing: "0.15em", color: t.muted }}>CLOUD & INFRASTRUCTURE PREREQUISITES</h3>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {prereqTracks.map((tr, i) => (
              <Link key={i} to={tr.href} className={`${cardBase} ${cardHover} block p-5 group`} style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}>
                <div className="h-1 w-full rounded-full mb-4" style={{ background: tr.accent }} />
                <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.1em", color: t.muted }}>{tr.label}</div>
                <div className="mt-1.5 font-semibold text-sm" style={{ ...fontDisplay, color: t.heading }}>{tr.title}</div>
                <p className="mt-2" style={{ ...fontMono, fontSize: 12, color: t.muted, lineHeight: 1.6 }}>{tr.desc}</p>
                <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${levelColor(tr.level)}22`, color: levelColor(tr.level) }}>{tr.level}</span>
              </Link>
            ))}
          </div>

          {/* Part B — curriculum */}
          <h3 data-reveal className="mt-14 mb-5" style={{ ...fontMono, fontSize: 12, letterSpacing: "0.15em", color: t.muted }}>INFRACODEBASE CURRICULUM</h3>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {curriculumModules.map((m, i) => (
              <Link key={i} to={m.href} className={`${cardBase} ${cardHover} block p-5 group ${m.span2 ? "sm:col-span-2" : ""}`} style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}>
                <div className="h-1 w-full rounded-full mb-4" style={{ background: m.accent === "rainbow" ? RAINBOW_CSS : m.accent }} />
                <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.1em", color: t.muted }}>Module {m.mod}</div>
                <div className="mt-1.5 font-semibold text-sm" style={{ ...fontDisplay, color: t.heading }}>{m.title}</div>
                <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${levelColor(m.level)}22`, color: levelColor(m.level) }}>{m.level}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════ 4 · WHO IT'S FOR ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>WHO IT'S FOR</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
              Built for <em className="font-light" style={{ color: t.accentAurora }}>builders.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-xl" style={{ ...fontMono, fontSize: 14, color: t.muted, lineHeight: 1.7 }}>
              Whether you're just starting or running large-scale systems — there's a path for you.
            </p>
            <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
              {personas.map((p, i) => (
                <div key={i} className={`${cardBase} p-5 transition-colors duration-300 hover:brightness-110`} style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3" style={{ background: `${p.color}22`, color: p.color }}>{p.icon}</div>
                  <div className="font-semibold text-sm" style={{ ...fontDisplay, color: t.heading }}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5 · USE CASES ═══════════ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>USE CASES</span>
          <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
            Start fresh or work <em className="font-light" style={{ color: t.accentPrism }}>with what you have.</em>
          </h2>

          {useCaseGroups.map((g, gi) => (
            <div key={gi} className="mt-12">
              <div data-reveal className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.accent }} />
                <span style={{ ...fontMono, fontSize: 12, letterSpacing: "0.1em", color: t.muted }}>{g.label.toUpperCase()}</span>
              </div>
              <div data-reveal className="grid sm:grid-cols-2 gap-3">
                {g.items.map((item, ii) => (
                  <div key={ii} className={`${cardBase} p-5 ${cardHover} ${"span2" in item && item.span2 ? "sm:col-span-2" : ""}`} style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}>
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: g.accent }} />
                      <div>
                        <div className="font-semibold text-sm" style={{ ...fontDisplay, color: t.heading }}>{item.title}</div>
                        <p className="mt-1" style={{ ...fontMono, fontSize: 12, color: t.muted, lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ═══════════ 6 · COMMUNITY ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>COMMUNITY</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
              Learn. Build. <em className="font-light" style={{ color: t.accentEmber }}>Grow.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-2xl" style={{ ...fontMono, fontSize: 14, color: t.muted, lineHeight: 1.7 }}>
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
                  <p className="mt-3" style={{ ...fontMono, fontSize: 12, color: t.muted, lineHeight: 1.6 }}>{communityCards.tall.desc}</p>
                </div>
                <div>
                  <p className="mb-4" style={{ ...fontMono, fontSize: 12, color: t.muted }}>{communityCards.tall.meta}</p>
                  {/* host avatars */}
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

        {/* ═══════════ 7 · CTA ═══════════ */}
        <section className="relative text-center overflow-hidden" style={{ padding: "100px 24px 80px" }}>
          {/* ambient glows — dark only */}
          {t.dark && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute" style={{ top: "30%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${t.accentEmber}0f 0%,transparent 70%)` }} />
              <div className="absolute" style={{ top: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle,${t.accentAurora}0d 0%,transparent 70%)` }} />
              <div className="absolute" style={{ bottom: "20%", left: "50%", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle,${t.accentPrism}0d 0%,transparent 70%)` }} />
            </div>
          )}

          <div className="relative z-10 max-w-3xl mx-auto">
            <div data-reveal className="flex items-center gap-4 justify-center mb-8">
              <span className="h-px flex-1 max-w-[60px]" style={{ background: t.subtleLine }} />
              <span style={{ ...fontMono, fontSize: 11, letterSpacing: "0.25em", color: t.muted }}>INFRACODEBASE UNIVERSITY · 2026</span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: t.subtleLine }} />
            </div>

            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, color: t.heading }}>
              Ready to start building{" "}
              <em className="font-light" style={{
                background: RAINBOW_CSS, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>real systems?</em>
            </h2>

            <p data-reveal className="mt-6 mx-auto max-w-lg" style={{ ...fontMono, fontSize: 14, color: t.muted, lineHeight: 1.7 }}>
              Join a community of cloud engineers learning infrastructure the way it's actually built — through structured, hands-on training.
            </p>

            <div data-reveal className="flex flex-wrap gap-4 justify-center mt-10">
              <Link to="/training" className={pill} style={t.pillPrimary}>
                <span style={fontMono}>Begin training →</span>
              </Link>
              <Link to="/manifesto" className={pill} style={t.pillSecondary}>
                <span style={fontMono}>Read the manifesto</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </AppLayout>
  );
};

export default Index;
