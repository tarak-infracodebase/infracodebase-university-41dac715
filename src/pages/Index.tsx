import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { TestimonialsSection } from "@/components/homepage/TestimonialsSection";

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


/* ── who it's for ── */
const whoItsForRows = [
  { title: "New to cloud — not sure where to start", sub: "Begin with the prerequisites. Zero prior knowledge required.", href: "/path/cloud-infrastructure-intro", external: false },
  { title: "Ready to learn — want structure and a clear path", sub: "The curriculum takes you from concept to hands-on deployment.", href: "/training", external: false },
  { title: "Actively learning — need support and momentum", sub: "Build with Her runs community sessions alongside your studies.", href: "https://buildwithher.infracodebase.com", external: true },
  { title: "Building — need visibility and feedback", sub: "Publish your work on the Build with Her Builder Wall.", href: "https://buildwithher.infracodebase.com/builder-wall", external: true },
  { title: "Job-ready — get hands-on and build real systems", sub: "Learn to code, design, ship, and operate cloud infrastructure on Infracodebase.", href: "/hands-on", external: false },
];



/* ── path map data ── */
const pathMapCards = [
  { num: "01", tag: "Start here", tagAccent: false, title: "Read Our Story", path: "/our-story", desc: "Understand why this exists and what separates infrastructure engineers who build from those who click.", arrow: "Read it", href: "/our-story" },
  { num: "02", tag: "Orient", tagAccent: false, title: "Explore the Curriculum", path: "/curriculum", desc: "Map out the full journey. See every module, its prerequisites, and where it leads before committing.", arrow: "Explore", href: "/curriculum" },
  { num: "03", tag: "Choose", tagAccent: false, title: "Pick a Training Path", path: "/training", desc: "Beginner, intermediate, or advanced — select a structured path matched to where you are right now.", arrow: "See paths", href: "/training" },
  { num: "04", tag: "Most visited", tagAccent: true, title: "Go Hands-On", path: "/hands-on", desc: "Build real infrastructure. Not sandboxes — actual systems, with the tools teams use in production.", arrow: "Start building", href: "/hands-on" },
  { num: "05", tag: "Go deeper", tagAccent: false, title: "Attend Workshops", path: "/workshops", desc: "Live sessions with engineers solving real problems. Ask questions, review architectures, learn alongside peers.", arrow: "View schedule", href: "/workshops" },
  { num: "06", tag: "Completion", tagAccent: true, title: "Earn Your Badge", path: "/cards", desc: "Certify your skills with a verifiable credential you can share on LinkedIn and across your professional network.", arrow: "See credentials", href: "/cards" },
];

const resourceCards = [
  { title: "Video Library", path: "/videos", desc: "Browse video lectures, engineering walkthroughs, and infrastructure design sessions from the Infracodebase program.", arrow: "Browse videos", href: "/videos" },
  { title: "Events & Lectures", path: "/events", desc: "Every week we share technical lectures, engineering conversations, and podcast episodes so builders can learn from real systems and grow together.", arrow: "See events", href: "/events" },
];

/* ── Section: Path Map + Resources ── */
const SectionPathMap = ({ t }: { t: ReturnType<typeof useTokens> }) => {
  const navigate = useNavigate();
  const cardHoverBg = t.dark ? "#15181d" : "#f5f6f8";

  return (
    <>
      {/* Part A — Path map */}
      <section style={{ background: t.bg, padding: 0 }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          {/* Header */}
          <div data-reveal>
            <span className={sectionLabel} style={{ ...fontMono, color: t.muted }}>YOUR COMPLETE JOURNEY</span>
            <h2 style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, lineHeight: 1.15, color: t.heading }}>
              From first concept<br />to <em className="font-light" style={{ color: t.accentEmber }}>certified.</em>
            </h2>
            <p className="mt-4 max-w-[480px]" style={{ ...fontMono, fontSize: 13, lineHeight: 1.65, color: t.muted }}>
              Six pages. One path. Here is how everything on this site connects — and why each step matters before the next.
            </p>
          </div>

          {/* 3×2 grid */}
          <div data-reveal className="mt-12" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: t.cardBorder, border: `1px solid ${t.cardBorder}` }}>
            {pathMapCards.map((card) => (
              <div
                key={card.num}
                onClick={() => navigate(card.href)}
                className="cursor-pointer group"
                style={{ background: t.bg, padding: 24, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = cardHoverBg)}
                onMouseLeave={e => (e.currentTarget.style.background = t.bg)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span style={{ ...fontMono, fontSize: 10, color: t.muted }}>{card.num}</span>
                  <span style={{
                    ...fontMono,
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 3,
                    border: `1px solid ${card.tagAccent ? t.accentEmber : t.cardBorder}`,
                    color: card.tagAccent ? t.accentEmber : t.muted,
                    background: card.tagAccent ? `${t.accentEmber}0d` : "transparent",
                  }}>{card.tag}</span>
                </div>
                <div style={{ ...fontDisplay, fontSize: 17, fontWeight: 700, color: t.heading }}>{card.title}</div>
                <div className="mt-1" style={{ ...fontMono, fontSize: 10, color: t.accentEmber }}>{card.path}</div>
                <p className="mt-2" style={{ ...fontMono, fontSize: 14, lineHeight: 1.65, color: t.muted }}>{card.desc}</p>
                <span className="inline-block mt-3 transition-colors duration-200 group-hover:!color-inherit" style={{ ...fontMono, fontSize: 13, color: t.muted }}>
                  <span className="group-hover:hidden">{card.arrow} →</span>
                  <span className="hidden group-hover:inline" style={{ color: t.accentEmber }}>{card.arrow} →</span>
                </span>
              </div>
            ))}
          </div>

          {/* Part B — Resources strip */}
          <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 0 }}>
            <div className="pt-6">
              <span className={sectionLabel} style={{ ...fontMono, color: t.muted }}>WHILE YOU LEARN</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: t.cardBorder, border: `1px solid ${t.cardBorder}`, marginTop: 8 }}>
              {resourceCards.map((card) => (
                <div
                  key={card.title}
                  onClick={() => navigate(card.href)}
                  className="cursor-pointer group"
                  style={{ background: t.bg, padding: 24, transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = cardHoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = t.bg)}
                >
                  <div className="flex gap-3">
                    <span style={{ ...fontMono, fontSize: 9, color: t.muted, flexShrink: 0, width: 16 }}>—</span>
                    <div>
                      <div style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: t.heading }}>{card.title}</div>
                      <div className="mt-1" style={{ ...fontMono, fontSize: 10, color: t.accentEmber }}>{card.path}</div>
                      <p className="mt-2" style={{ ...fontMono, fontSize: 14, lineHeight: 1.65, color: t.muted }}>{card.desc}</p>
                      <span className="inline-block mt-3" style={{ ...fontMono, fontSize: 11, color: t.muted }}>
                        <span className="group-hover:hidden">{card.arrow} →</span>
                        <span className="hidden group-hover:inline" style={{ color: t.accentEmber }}>{card.arrow} →</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part C — CTA row */}
          <div data-reveal className="flex flex-wrap items-center gap-6 mt-12">
            <Link to="/training" className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 cursor-pointer" style={t.pillPrimary}>
              <span style={fontMono}>Begin learning →</span>
            </Link>
            <Link to="/curriculum" style={{ ...fontMono, fontSize: 13, color: t.muted, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Or explore the full curriculum
            </Link>
          </div>
        </div>
      </section>
    </>
  );
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
      <Helmet>
        <title>Infracodebase University</title>
        <meta name="description" content="A structured learning program for cloud engineers. Design, build, and govern infrastructure as code using Infracodebase — through a progressive curriculum built for real systems." />
        <link rel="canonical" href="https://university.infracodebase.com/" />
        <meta property="og:title" content="Infracodebase University" />
        <meta property="og:description" content="A structured learning program for cloud engineers. Design, build, and govern infrastructure as code using Infracodebase — through a progressive curriculum built for real systems." />
        <meta property="og:url" content="https://university.infracodebase.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://university.infracodebase.com/og/home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Infracodebase University" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infracodebase University" />
        <meta name="twitter:description" content="A structured learning program for cloud engineers. Design, build, and govern infrastructure as code." />
        <meta name="twitter:image" content="https://university.infracodebase.com/og/home.png" />
      </Helmet>
      <div ref={revealRef} style={{ background: t.bg, color: t.heading }}>

        {/* ── GRAIN OVERLAY ── */}
        <div style={{
          position: "fixed", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 9999,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* ═══════════ 1 · HERO ═══════════ */}
        <section className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ padding: "72px 48px 64px" }}>
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
              Structured. Practical. Built for real systems — and built for anyone ready to learn them.
            </p>

            {/* CTAs */}
            <div data-reveal className="flex flex-wrap gap-4 justify-center mt-10" style={{ animationDelay: "0.3s" }}>
              <Link to="/training" className={pill} style={t.pillPrimary}>
                <span style={fontMono}>Begin training →</span>
              </Link>
              <Link to="/our-story" className={pill} style={t.pillSecondary}>
                <span style={fontMono}>Read our Story →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE BAND ── */}
        <section style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, background: t.bg }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 flex flex-col lg:flex-row justify-between items-start gap-10">
            <div>
              <p style={{ ...fontDisplay, fontSize: "clamp(22px, 3vw, 28px)", fontStyle: "italic", lineHeight: 1.4, color: t.heading }}>
                "Talent is everywhere.<br />Access is not."
              </p>
            </div>
            <div style={{ maxWidth: 360 }}>
              <p style={{ ...fontMono, fontSize: 15, lineHeight: 1.75, color: t.muted }}>
                Cloud engineering has a gap — not a talent gap, but an access gap. To mentorship, to structured paths, to communities that signal <em>this is for you too</em>.
              </p>
              <p className="mt-3" style={{ ...fontMono, fontSize: 15, lineHeight: 1.75, color: t.muted }}>
                University closes the skills gap. <a href="https://buildwithher.infracodebase.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accentEmber, fontWeight: 700 }}>Build with Her</a> closes the human barriers. Both exist because they're needed.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════ 1b · SOCIAL PROOF STRIP ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
            <div data-reveal className="flex flex-col lg:flex-row" style={{ gap: 0 }}>
              {/* Left column */}
              <div className="lg:pr-10 pb-8 lg:pb-0" style={{ width: "auto", maxWidth: 260, flexShrink: 0 }}>
                <h2 style={{ ...fontDisplay, fontSize: 20, fontWeight: 700, lineHeight: 1.35, color: t.heading }}>
                  464 learners.<br />
                  <em className="font-light" style={{ color: t.accentEmber }}>20+ countries.</em><br />
                  One structured path.
                </h2>
                <p className="mt-3" style={{ ...fontMono, fontSize: 15, lineHeight: 1.7, color: t.muted }}>
                  From San Francisco to Sydney, people are building real infrastructure skills — through a curriculum designed to take anyone from zero to senior-level thinking.
                </p>
              </div>

              {/* Vertical divider */}
              <div className="hidden lg:block self-stretch" style={{ width: 1, background: t.border, flexShrink: 0 }} />

              {/* Right column */}
              <div className="flex-1 lg:pl-10">
                {/* Stat row */}
                <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 0 }}>
                  {[
                    { value: "464", label: "active learners this week" },
                    { value: "20+", label: "countries represented", accent: true },
                    { value: "50+", label: "lessons in the curriculum" },
                    { value: "7", label: "core weeks to completion" },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col" style={{
                      borderLeft: i > 0 ? `1px solid ${t.border}` : "none",
                      paddingLeft: i > 0 ? 20 : 0,
                      paddingRight: 20,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}>
                      <div style={{
                        ...fontDisplay,
                        fontSize: 28,
                        fontWeight: 400,
                        color: stat.accent ? t.accentEmber : t.heading,
                        fontStyle: stat.accent ? "italic" : "normal",
                      }}>{stat.value}</div>
                      <div style={{ ...fontMono, fontSize: 11, color: t.muted, marginTop: 2 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Horizontal divider */}
                <div className="my-5" style={{ height: 1, background: t.border }} />

                {/* Top communities */}
                <div>
                  <span style={{ ...fontMono, fontSize: 10, color: t.heading, fontWeight: 700, letterSpacing: "0.05em" }}>Top communities</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["United States", "Australia", "France", "India", "Kenya", "United Kingdom", "Brazil", "Canada", "Japan"].map(c => (
                      <span key={c} className="inline-block" style={{
                        ...fontMono,
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: 3,
                        border: `1px solid ${t.cardBorder}`,
                        color: t.heading,
                        background: t.bg,
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <TestimonialsSection />

        {/* ═══════════ YOUR COMPLETE JOURNEY ═══════════ */}
        <SectionPathMap t={t} />

        {/* ═══════════ 4 · WHO IT'S FOR ═══════════ */}
        <section style={{ background: t.sectionBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
            <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>WHO IT'S FOR</span>
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
              Start where you{" "}
              <em className="font-light" style={{ color: t.accentEmber }}>actually are.</em>
            </h2>
            <p data-reveal className="mt-3 max-w-xl" style={{ ...fontMono, fontSize: 15, color: t.muted, lineHeight: 1.7 }}>
              You don't need a title to start. You just need to be ready to learn.
            </p>
            <div data-reveal className="mt-10 max-w-[560px]">
              {whoItsForRows.map((row, i) => {
                const isExternal = row.external;
                const Tag = isExternal ? "a" : Link;
                const linkProps = isExternal
                  ? { href: row.href, target: "_blank", rel: "noopener noreferrer" } as React.AnchorHTMLAttributes<HTMLAnchorElement>
                  : { to: row.href } as { to: string };
                return (
                  <Tag
                    key={i}
                    {...(linkProps as any)}
                    className="group block py-4 transition-colors duration-200"
                    style={{ borderBottom: `1px solid ${t.cardBorder}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-semibold transition-colors duration-200 group-hover:text-[#e86030]" style={{ ...fontDisplay, color: t.heading }}>{row.title}</span>
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: t.accentEmber }}>→</span>
                    </div>
                    <p className="mt-1" style={{ ...fontMono, fontSize: 13, color: t.muted, lineHeight: 1.6 }}>{row.sub}</p>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
          <span data-reveal className={sectionLabel} style={{ ...fontMono, color: t.muted }}>FAQ</span>
          <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: t.heading }}>
            Common <em className="font-light" style={{ color: t.accentEmber }}>questions.</em>
          </h2>
          <div data-reveal className="mt-10 max-w-2xl space-y-8">
            {[
              { q: "How long does it take to complete?", a: "It depends on your starting point and how much time you can commit. The prerequisites take most learners around 4 hours. The full curriculum — prerequisites through to badge — is designed for part-time study over several months. You go at your own pace. There is no deadline." },
              { q: "Is this only for women?", a: "Infracodebase University is open to everyone. The curriculum, training, and badge are available regardless of gender. Build with Her was created because women in cloud face particular barriers the industry hasn't fully addressed — but the community is open to anyone who believes access to this field should be equal, including men who want to be part of closing that gap. University is the skills path. Build with Her is the community. Both exist because they're needed." },
            ].map((faq, i) => (
              <div key={i}>
                <h3 style={{ ...fontDisplay, fontSize: 15, fontWeight: 700, color: t.heading }}>{faq.q}</h3>
                <p className="mt-2" style={{ ...fontMono, fontSize: 15, lineHeight: 1.75, color: t.muted }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="relative text-center overflow-hidden" style={{ padding: "100px 24px 80px" }}>
          {t.dark && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute" style={{ top: "30%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle,${t.accentEmber}0f 0%,transparent 70%)` }} />
              <div className="absolute" style={{ top: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle,${t.accentAurora}0d 0%,transparent 70%)` }} />
              <div className="absolute" style={{ bottom: "20%", left: "50%", width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle,${t.accentPrism}0d 0%,transparent 70%)` }} />
            </div>
          )}

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 data-reveal style={{ ...fontDisplay, fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, color: t.heading }}>
              Ready to learn{" "}
              <em className="font-light" style={{ color: t.accentEmber }}>infrastructure?</em>
            </h2>

            <p data-reveal className="mt-6 mx-auto max-w-lg" style={{ ...fontMono, fontSize: 15, color: t.muted, lineHeight: 1.7 }}>
              From zero to cloud engineer. Structured, practical, and open to anyone ready to learn.
            </p>

            <div data-reveal className="flex flex-wrap gap-4 justify-center mt-10">
              <Link to="/training" className={pill} style={t.pillPrimary}>
                <span style={fontMono}>Begin training →</span>
              </Link>
              <Link to="/our-story" className={pill} style={t.pillSecondary}>
                <span style={fontMono}>Read our story</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </AppLayout>
  );
};

export default Index;
