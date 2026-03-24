import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useEffect, useRef } from "react";

/* ── design tokens ── */
const BG_DARK = "#070809";
const SURFACE = "#12151a";
const SECTION_BG = "#0d0f11";
const MUTED = "#6b6f78";

const ACCENTS = {
  onyx: "#3a3d42", bronze: "#9a6b3a", sage: "#3a7a5a", navy: "#1e3a5f",
  ember: "#e86030", prism: "#c060d0", aurora: "#30c0a0",
};

const RAINBOW_CSS = "linear-gradient(90deg,#61bb46,#fdb827,#f5821f,#e03a3e,#963d97,#009ddc)";

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
const pill = "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 cursor-pointer";
const sectionLabel = "text-[11px] tracking-[0.25em] uppercase mb-4 inline-block";
const cardBase = "rounded-xl border border-white/[0.06] transition-all duration-300 cursor-pointer";
const cardHover = "hover:translate-y-[-4px] hover:border-white/[0.14]";

/* ── color dot row ── */
const cardColors = [ACCENTS.onyx, ACCENTS.bronze, ACCENTS.sage, ACCENTS.navy, ACCENTS.ember, ACCENTS.prism, ACCENTS.aurora, "url(#spectrum)"];

/* ── prerequisite tracks ── */
const prereqTracks = [
  { label: "Cloud & Infra · Track 1", title: "Introduction", href: "/path/cloud-infrastructure-intro", level: "Beginner", accent: ACCENTS.sage, desc: "Cloud concepts, core services, and introduction to Infrastructure as Code." },
  { label: "Cloud & Infra · Track 2", title: "Foundations", href: "/path/prereq-foundations", level: "Beginner", accent: ACCENTS.navy, desc: "Deeper into networking, storage, compute, and IAM across providers." },
  { label: "Cloud & Infra · Track 3", title: "Intermediate", href: "/path/prereq-intermediate", level: "Intermediate", accent: ACCENTS.ember, desc: "Multi-cloud patterns, CI/CD pipelines, and state management." },
  { label: "Cloud & Infra · Track 4", title: "Expert", href: "/path/prereq-expert", level: "Advanced", accent: ACCENTS.prism, desc: "Platform engineering, zero-trust networking, and disaster recovery." },
];

const curriculumModules = [
  { mod: 1, title: "Welcome & Orientation", href: "/path/welcome-orientation", level: "Beginner", accent: ACCENTS.sage, span2: true },
  { mod: 2, title: "Foundations – Understanding Infracodebase", href: "/path/foundations", level: "Beginner", accent: ACCENTS.navy },
  { mod: 3, title: "Real Infrastructure Engineering", href: "/path/real-infrastructure-engineering", level: "Intermediate", accent: ACCENTS.ember },
  { mod: 4, title: "Architecture Diagrams & Living Documentation", href: "/path/architecture-diagrams", level: "Intermediate", accent: ACCENTS.bronze },
  { mod: 5, title: "Enterprise Governance & Platform Engineering", href: "/path/enterprise-governance", level: "Intermediate", accent: ACCENTS.aurora },
  { mod: 6, title: "Advanced Infrastructure Architecture", href: "/path/advanced-architecture", level: "Advanced", accent: ACCENTS.prism },
  { mod: 7, title: "Review & Wrap-Up", href: "/path/review-wrapup", level: "Advanced", accent: "rainbow" },
];

const levelColor = (l: string) => l === "Beginner" ? ACCENTS.sage : l === "Intermediate" ? ACCENTS.ember : ACCENTS.prism;

/* ── who it's for ── */
const personas = [
  { icon: "⬡", title: "Platform Engineers", color: ACCENTS.ember },
  { icon: "◈", title: "DevOps Engineers", color: ACCENTS.aurora },
  { icon: "△", title: "Cloud Architects", color: ACCENTS.prism },
  { icon: "◎", title: "Cloud Engineers", color: ACCENTS.bronze },
  { icon: "⬡", title: "Engineering Teams", color: ACCENTS.sage },
  { icon: "◈", title: "Technical Leaders", color: ACCENTS.navy },
];

/* ── use cases ── */
const useCaseGroups = [
  {
    label: "Build new", accent: ACCENTS.sage,
    items: [
      { title: "Landing zones & new environments", desc: "Design and deploy greenfield cloud environments with IaC from day one." },
      { title: "Reusable modules for shift-left", desc: "Create standardized, composable Terraform modules your teams can adopt." },
      { title: "Multi-cloud expansion", desc: "Extend your footprint to new providers with consistent tooling." },
      { title: "New platforms with limited expertise", desc: "Bootstrap infrastructure platforms even without deep domain knowledge." },
    ],
  },
  {
    label: "Modernize & migrate", accent: ACCENTS.ember,
    items: [
      { title: "Click-ops to IaC", desc: "Migrate manually managed infrastructure to code-driven workflows." },
      { title: "Cloud to cloud migration", desc: "Orchestrate cross-cloud migrations with confidence and documentation." },
      { title: "On-prem to cloud", desc: "Plan and execute datacenter-to-cloud migrations at scale.", span2: true },
    ],
  },
  {
    label: "Extend & improve", accent: ACCENTS.prism,
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
    href: "/office-hours",
    bg: "linear-gradient(180deg,#0c0f14,#150c08)",
    accentColor: ACCENTS.ember,
    badge: "● NEXT SESSION",
    eyebrow: "WORKSHOPS",
    title: "Live Demo — Migrating Azure Infrastructure to AWS and GCP",
    desc: "Live walkthrough migrating an existing Azure environment to both AWS and GCP using Infracodebase.",
    meta: "📅 Wed, March 25 · 5:00 PM CET",
    cta: "ADD TO CALENDAR →",
  },
  grid: [
    { href: "/videos", bg: "linear-gradient(180deg,#120d28,#1c1440)", accentColor: "#a78bfa", eyebrow: "VIDEO LIBRARY", title: "Introduction to Infracodebase", badge: "GETTING STARTED", play: true },
    { href: "/videos", bg: "linear-gradient(180deg,#091810,#122418)", accentColor: ACCENTS.aurora, eyebrow: "VIDEO LIBRARY", title: "Applying Infracodebase to Real Infrastructure", badge: "INFRASTRUCTURE ARCHITECTURE", play: true },
    { href: "/office-hours", bg: "linear-gradient(180deg,#160c08,#221208)", accentColor: ACCENTS.ember, eyebrow: "PAST SESSION · 49 MIN", title: "ClickOps to IaC: Azure Infrastructure Modernization", badge: "REAL INFRASTRUCTURE", extra: "March 18, 2026" },
    { href: "/events", bg: "linear-gradient(180deg,#080c18,#0c1228)", accentColor: "#6fa3d8", eyebrow: "EVENTS", title: "Building Self-Service, Secure & Scalable Developer Platforms", badge: "FEATURED SESSION", arrow: true },
  ],
};

/* ══════════════════════════════════ COMPONENT ══════════════════════════════════ */

const Index = () => {
  const revealRef = useReveal();

  return (
    <AppLayout>
      <div ref={revealRef} style={{ background: BG_DARK, color: "#fff" }}>

        {/* ── GRAIN OVERLAY ── */}
        <div style={{
          position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 9999,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* ═══════════ 1 · HERO ═══════════ */}
        <section className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ minHeight: "100vh", padding: "60px 24px 80px" }}>
          {/* ambient blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute" style={{ top: "20%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.ember}10 0%,transparent 70%)` }} />
            <div className="absolute" style={{ top: "40%", right: "10%", width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.aurora}0d 0%,transparent 70%)` }} />
            <div className="absolute" style={{ bottom: "15%", left: "40%", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.prism}0d 0%,transparent 70%)` }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* eyebrow */}
            <div data-reveal className="flex items-center gap-4 justify-center mb-10" style={{ ...fontMono, animationDelay: "0s" }}>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.15)" }} />
              <span style={{ color: MUTED, fontSize: 11, letterSpacing: "0.25em" }}>INFRACODEBASE UNIVERSITY · 2026</span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* H1 */}
            <h1 data-reveal style={{ ...fontDisplay, animationDelay: "0.1s" }}>
              <span className="block font-black" style={{ fontSize: "clamp(48px, 8vw, 116px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
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
            <p data-reveal className="mx-auto mt-8 max-w-2xl" style={{ ...fontMono, fontSize: 14, lineHeight: 1.7, color: MUTED, animationDelay: "0.2s" }}>
              A structured learning program for cloud engineers. Design, build, document, and govern infrastructure as code — through a progressive curriculum built for real systems.
            </p>

            {/* CTAs */}
            <div data-reveal className="flex flex-wrap gap-4 justify-center mt-10" style={{ animationDelay: "0.3s" }}>
              <Link to="/training" className={pill} style={{ background: "#fff", color: "#000" }}>
                <span style={fontMono}>Begin training →</span>
              </Link>
              <Link to="/manifesto" className={pill} style={{ border: "1px solid rgba(255,255,255,0.15)", color: MUTED }}>
                <span style={fontMono}>Read our Manifesto</span>
              </Link>
            </div>

            {/* color dots */}
            <div data-reveal className="flex gap-2.5 justify-center mt-12" style={{ animationDelay: "0.4s" }}>
              {[ACCENTS.onyx, ACCENTS.bronze, ACCENTS.sage, ACCENTS.navy, ACCENTS.ember, ACCENTS.prism, ACCENTS.aurora].map((c, i) => (
                <span key={i} className="rounded-full transition-transform duration-300 hover:scale-150" style={{ width: 8, height: 8, background: c }} />
              ))}
              <span className="rounded-full transition-transform duration-300 hover:scale-150" style={{ width: 8, height: 8, background: RAINBOW_CSS }} />
            </div>
          </div>
        </section>

        {/* ═══════════ 2 · WHAT IS IT ═══════════ */}
        <section style={{ background: SECTION_BG, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span data-reveal className={sectionLabel} style={{ ...fontMono, color: MUTED }}>WHAT IS IT</span>
                <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15 }}>
                  Infrastructure as code,{" "}
                  <em className="font-light" style={{ color: ACCENTS.aurora }}>not clicks.</em>
                </h2>
                <p data-reveal className="mt-5" style={{ ...fontMono, fontSize: 14, lineHeight: 1.75, color: MUTED }}>
                  Infracodebase University is a <strong className="text-white font-medium">structured learning program</strong> for cloud engineers. Instead of fragmented tutorials, you follow a <strong className="text-white font-medium">progressive curriculum</strong> — designing and governing systems the way they're actually built with <strong className="text-white font-medium">AI-powered Terraform workflows</strong>.
                </p>
              </div>
              <div data-reveal className="grid grid-cols-2 gap-3">
                {[
                  { num: "7", label: "Core weeks", color: ACCENTS.ember },
                  { num: "4", label: "Prereq tracks", color: ACCENTS.aurora },
                  { num: "8", label: "Card designs", color: ACCENTS.prism },
                  { num: "∞", label: "Community", color: ACCENTS.bronze },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-6 transition-colors duration-300 hover:brightness-125" style={{ background: SURFACE, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ ...fontDisplay, fontSize: 40, fontWeight: 900, color: s.color }}>{s.num}</div>
                    <div style={{ ...fontMono, fontSize: 12, color: MUTED, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ 3 · LEARNING PATHS ═══════════ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          <span data-reveal className={sectionLabel} style={{ ...fontMono, color: MUTED }}>CURRICULUM</span>
          <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>Learning paths.</h2>
          <p data-reveal className="mt-3 max-w-xl" style={{ ...fontMono, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
            Start with cloud & infrastructure prerequisites, then move through the Infracodebase curriculum. Each module builds on the last.
          </p>

          {/* Part A — prerequisites */}
          <h3 data-reveal className="mt-14 mb-5" style={{ ...fontMono, fontSize: 12, letterSpacing: "0.15em", color: MUTED }}>CLOUD & INFRASTRUCTURE PREREQUISITES</h3>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {prereqTracks.map((t, i) => (
              <Link key={i} to={t.href} className={`${cardBase} ${cardHover} block p-5 group`} style={{ background: SURFACE }}>
                <div className="h-1 w-full rounded-full mb-4" style={{ background: t.accent }} />
                <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.1em", color: MUTED }}>{t.label}</div>
                <div className="mt-1.5 font-semibold text-sm" style={fontDisplay}>{t.title}</div>
                <p className="mt-2" style={{ ...fontMono, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{t.desc}</p>
                <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${levelColor(t.level)}22`, color: levelColor(t.level) }}>{t.level}</span>
              </Link>
            ))}
          </div>

          {/* Part B — curriculum */}
          <h3 data-reveal className="mt-14 mb-5" style={{ ...fontMono, fontSize: 12, letterSpacing: "0.15em", color: MUTED }}>INFRACODEBASE CURRICULUM</h3>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {curriculumModules.map((m, i) => (
              <Link key={i} to={m.href} className={`${cardBase} ${cardHover} block p-5 group ${m.span2 ? "sm:col-span-2" : ""}`} style={{ background: SURFACE }}>
                <div className="h-1 w-full rounded-full mb-4" style={{ background: m.accent === "rainbow" ? RAINBOW_CSS : m.accent }} />
                <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.1em", color: MUTED }}>Module {m.mod}</div>
                <div className="mt-1.5 font-semibold text-sm" style={fontDisplay}>{m.title}</div>
                <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${levelColor(m.level)}22`, color: levelColor(m.level) }}>{m.level}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════ 4 · WHO IT'S FOR ═══════════ */}
        <section style={{ background: SECTION_BG, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: MUTED }}>WHO IT'S FOR</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>
              Built for <em className="font-light" style={{ color: ACCENTS.aurora }}>builders.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-xl" style={{ ...fontMono, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
              Whether you're just starting or running large-scale systems — there's a path for you.
            </p>
            <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
              {personas.map((p, i) => (
                <div key={i} className={`${cardBase} p-5 transition-colors duration-300 hover:brightness-125`} style={{ background: SURFACE }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-3" style={{ background: `${p.color}22`, color: p.color }}>{p.icon}</div>
                  <div className="font-semibold text-sm" style={fontDisplay}>{p.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5 · USE CASES ═══════════ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          <span data-reveal className={sectionLabel} style={{ ...fontMono, color: MUTED }}>USE CASES</span>
          <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>
            Start fresh or work <em className="font-light" style={{ color: ACCENTS.prism }}>with what you have.</em>
          </h2>

          {useCaseGroups.map((g, gi) => (
            <div key={gi} className="mt-12">
              <div data-reveal className="flex items-center gap-2.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.accent }} />
                <span style={{ ...fontMono, fontSize: 12, letterSpacing: "0.1em", color: MUTED }}>{g.label.toUpperCase()}</span>
              </div>
              <div data-reveal className="grid sm:grid-cols-2 gap-3">
                {g.items.map((item, ii) => (
                  <div key={ii} className={`${cardBase} p-5 ${cardHover} ${"span2" in item && item.span2 ? "sm:col-span-2" : ""}`} style={{ background: SURFACE }}>
                    <div className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: g.accent }} />
                      <div>
                        <div className="font-semibold text-sm" style={fontDisplay}>{item.title}</div>
                        <p className="mt-1" style={{ ...fontMono, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ═══════════ 6 · COMMUNITY ═══════════ */}
        <section style={{ background: SECTION_BG, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: MUTED }}>COMMUNITY</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>
              Learn. Build. <em className="font-light" style={{ color: ACCENTS.ember }}>Grow.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-2xl" style={{ ...fontMono, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
              Every week: live workshops, engineering walkthroughs, and community events so builders can learn from real systems and grow together.
            </p>

            <div data-reveal className="grid lg:grid-cols-2 gap-3 mt-10">
              {/* Tall card — workshops */}
              <Link to={communityCards.tall.href} className={`${cardBase} ${cardHover} flex flex-col justify-between p-7 min-h-[420px] lg:row-span-2`}
                style={{ background: communityCards.tall.bg, borderTop: `2px solid ${communityCards.tall.accentColor}` }}>
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: `${ACCENTS.ember}22`, color: ACCENTS.ember }}>{communityCards.tall.badge}</span>
                  <div className="mt-4" style={{ ...fontMono, fontSize: 10, letterSpacing: "0.15em", color: MUTED }}>{communityCards.tall.eyebrow}</div>
                  <div className="mt-2 text-lg font-semibold leading-snug" style={fontDisplay}>{communityCards.tall.title}</div>
                  <p className="mt-3" style={{ ...fontMono, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{communityCards.tall.desc}</p>
                </div>
                <div>
                  <p className="mb-4" style={{ ...fontMono, fontSize: 12, color: MUTED }}>{communityCards.tall.meta}</p>
                  {/* host avatars */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg,${ACCENTS.ember},${ACCENTS.prism})` }}>J</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg,${ACCENTS.aurora},${ACCENTS.navy})` }}>T</div>
                    </div>
                    <span style={{ ...fontMono, fontSize: 11, color: MUTED }}>Justin & Tarak</span>
                  </div>
                  <span style={{ ...fontMono, fontSize: 12, fontWeight: 500, color: ACCENTS.ember }}>{communityCards.tall.cta}</span>
                </div>
              </Link>

              {/* 2×2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {communityCards.grid.map((c, i) => (
                  <Link key={i} to={c.href} className={`${cardBase} ${cardHover} block p-5`}
                    style={{ background: c.bg, borderTop: `2px solid ${c.accentColor}` }}>
                    <div style={{ ...fontMono, fontSize: 10, letterSpacing: "0.12em", color: c.accentColor }}>{c.eyebrow}</div>
                    <div className="mt-2 text-sm font-semibold leading-snug" style={fontDisplay}>{c.title}</div>
                    <span className="inline-block mt-3 text-[9px] px-2 py-0.5 rounded-full" style={{ ...fontMono, background: "rgba(255,255,255,0.06)", color: MUTED }}>{c.badge}</span>
                    {c.play && <div className="mt-3 text-lg opacity-50">▶</div>}
                    {c.extra && <div className="mt-2" style={{ ...fontMono, fontSize: 11, color: MUTED }}>{c.extra}</div>}
                    {c.arrow && <div className="mt-3 text-sm opacity-40">→</div>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ 7 · CTA ═══════════ */}
        <section className="relative text-center overflow-hidden" style={{ padding: "100px 24px 80px" }}>
          {/* ambient glows */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute" style={{ top: "30%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.ember}0f 0%,transparent 70%)` }} />
            <div className="absolute" style={{ top: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.aurora}0d 0%,transparent 70%)` }} />
            <div className="absolute" style={{ bottom: "20%", left: "50%", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle,${ACCENTS.prism}0d 0%,transparent 70%)` }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div data-reveal className="flex items-center gap-4 justify-center mb-8">
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.15)" }} />
              <span style={{ ...fontMono, fontSize: 11, letterSpacing: "0.25em", color: MUTED }}>INFRACODEBASE UNIVERSITY · 2026</span>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1 }}>
              You're not just learning.{" "}
              <em className="font-light" style={{
                background: RAINBOW_CSS, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>You belong.</em>
            </h2>

            <p data-reveal className="mt-6 mx-auto max-w-lg" style={{ ...fontMono, fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
              A community built around we, not just me. The card is ready. The community awaits.
            </p>

            {/* Card stack */}
            <div data-reveal className="relative mx-auto mt-12 mb-12" style={{ width: 280, height: 180 }}>
              {[...Array(8)].map((_, i) => {
                const colors = [ACCENTS.onyx, ACCENTS.bronze, ACCENTS.sage, ACCENTS.navy, ACCENTS.ember, ACCENTS.prism, ACCENTS.aurora, "rainbow"];
                const c = colors[i];
                const offset = (7 - i) * 3;
                const bg = c === "rainbow" ? RAINBOW_CSS : `linear-gradient(145deg,${c},${c}cc)`;
                return (
                  <div key={i} className="absolute rounded-xl" style={{
                    width: 260, height: 160,
                    left: "50%", top: "50%",
                    transform: `translate(-50%,-50%) translateY(${-offset}px) rotate(${(i - 3.5) * 1.2}deg)`,
                    background: bg,
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    zIndex: i,
                  }} />
                );
              })}
            </div>

            <div data-reveal className="flex flex-wrap gap-4 justify-center">
              <Link to="/cards" className={pill} style={{ background: "#fff", color: "#000" }}>
                <span style={fontMono}>Get your card →</span>
              </Link>
              <Link to="/manifesto" className={pill} style={{ border: "1px solid rgba(255,255,255,0.15)", color: MUTED }}>
                <span style={fontMono}>Read the manifesto</span>
              </Link>
            </div>

            <p data-reveal className="mt-8" style={{ ...fontMono, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              Onyx · Bronze · Sage · Navy · Ember · Prism · Aurora · Spectrum
            </p>
          </div>
        </section>

      </div>
    </AppLayout>
  );
};

export default Index;
