import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/AppLayout";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";


const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

function useTokens() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    dark,
    bg: dark ? "#070809" : "#ffffff",
    surface: dark ? "#12151a" : "#f1f5f9",
    muted: dark ? "#6b6f78" : "#475569",
    heading: dark ? "#ffffff" : "#0f172a",
    border: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    cardBg: dark ? "#0d0f11" : "#ffffff",
    cardBorder: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    amber: "#e86030",
    amberBg: dark ? "rgba(232,96,48,0.06)" : "rgba(232,96,48,0.05)",
    amberBorder: dark ? "rgba(232,96,48,0.2)" : "rgba(232,96,48,0.15)",
    quoteBg: dark ? "rgba(232,96,48,0.05)" : "rgba(232,96,48,0.04)",
  };
}

const tocItems = [
  { id: "why-we-exist", label: "Why we exist" },
  { id: "what-it-is", label: "What University is" },
  { id: "the-path", label: "The path" },
  { id: "how-we-teach", label: "How we teach" },
  { id: "the-community", label: "The community" },
  { id: "build-with-her", label: "Build with Her" },
];

const pathSteps = [
  { num: "01", highlight: true, title: "Prerequisites — Introduction & Foundations", desc: "Cloud concepts, core services, networking, storage, compute, and IAM. Zero prior knowledge required. This is the starting point for everyone." },
  { num: "02", highlight: false, title: "Core curriculum — Modules 1 to 5", desc: "Real infrastructure engineering, architecture diagrams, living documentation, enterprise governance, and platform engineering patterns." },
  { num: "03", highlight: false, title: "Advanced track — Module 6", desc: "Multi-cloud, enterprise-scale design, and the decisions senior engineers make under pressure." },
  { num: "04", highlight: true, title: "Hands-on labs", desc: "Real deployments with the tools production teams actually use. Not sandboxes — actual systems you build and own." },
  { num: "05", highlight: false, title: "Review & wrap-up", desc: "Consolidate what you have built. Prepare your badge submission. Take stock of how far you have come." },
  { num: "06", highlight: true, title: "Badge & credentials", desc: "A verifiable badge that proves what you built, not just what you watched. Share it on LinkedIn and across your professional network." },
];

const communityStats = [
  { value: "464", label: "active learners", highlight: false },
  { value: "20+", label: "countries represented", highlight: true },
  { value: "50+", label: "lessons in the curriculum", highlight: false },
];

function SectionEyebrow({ num, label, t }: { num: string; label: string; t: ReturnType<typeof useTokens> }) {
  return (
    <span className="inline-block mb-4" style={{ ...fontMono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: t.muted }}>
      {num} — {label}
    </span>
  );
}

function SectionH2({ children, t }: { children: React.ReactNode; t: ReturnType<typeof useTokens> }) {
  return (
    <h2 className="mb-6" style={{ ...fontDisplay, fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.2, color: t.heading }}>
      {children}
    </h2>
  );
}

function BodyText({ children, t, className }: { children: React.ReactNode; t: ReturnType<typeof useTokens>; className?: string }) {
  return (
    <p className={className} style={{ fontSize: 15, lineHeight: 1.8, color: t.muted, fontWeight: 300, maxWidth: 620 }}>
      {children}
    </p>
  );
}

function PullQuote({ children, t }: { children: React.ReactNode; t: ReturnType<typeof useTokens> }) {
  return (
    <blockquote
      className="my-8 pl-5 py-4 pr-4 rounded-r-lg"
      style={{
        borderLeft: `2px solid ${t.amber}`,
        background: t.quoteBg,
        ...fontDisplay,
        fontSize: 19,
        fontStyle: "italic",
        lineHeight: 1.7,
        color: t.heading,
      }}
    >
      {children}
    </blockquote>
  );
}

const Manifesto = () => {
  const t = useTokens();
  const [activeSection, setActiveSection] = useState(tocItems[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Our Story — Infracodebase University</title>
        <meta name="description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here. The story behind Infracodebase University." />
        <link rel="canonical" href="https://university.infracodebase.com/our-story" />
        <meta property="og:title" content="Our Story — Infracodebase University" />
        <meta property="og:description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here." />
        <meta property="og:url" content="https://university.infracodebase.com/our-story" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://university.infracodebase.com/og/manifesto.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Infracodebase University" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Story — Infracodebase University" />
        <meta name="twitter:description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here." />
        <meta name="twitter:image" content="https://university.infracodebase.com/og/manifesto.png" />
      </Helmet>

      <div style={{ background: t.bg }} className="min-h-screen">
        {/* ── HEADER ── */}
        <header className="relative overflow-hidden px-6 lg:px-12 pt-12 pb-16 md:pt-20 md:pb-24">
          {/* Ambient amber glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${t.dark ? "rgba(232,96,48,0.08)" : "rgba(232,96,48,0.06)"} 0%, transparent 70%)`,
          }} />
          {/* Faint grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(${t.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px), linear-gradient(90deg, ${t.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />

          <div className="relative max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm transition-colors mb-8" style={{ ...fontMono, color: t.muted }}>
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>

            <div className="mb-3" style={{ ...fontMono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: t.muted }}>
              INFRACODEBASE UNIVERSITY
            </div>

            <h1 style={{ ...fontDisplay, fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, lineHeight: 1.1, color: t.heading }}>
              Our
            </h1>
            <h1 style={{ ...fontDisplay, fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, color: t.amber }}>
              Story.
            </h1>

            <div className="mt-8 pl-5 border-l-2" style={{ borderColor: t.amber }}>
              <p style={{ ...fontDisplay, fontSize: 17, fontStyle: "italic", lineHeight: 1.7, color: t.muted, maxWidth: 520 }}>
                "Whether you are new to infrastructure entirely, or transitioning from another role — you belong here."
              </p>
            </div>
          </div>
        </header>

        {/* ── BODY: TOC + Content ── */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-24">
          <div className="flex gap-12">
            {/* Sticky TOC — left column */}
            <aside className="hidden lg:block shrink-0" style={{ width: 200 }}>
              <div className="sticky top-24">
                <div className="mb-4" style={{ ...fontMono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: t.muted }}>
                  ON THIS PAGE
                </div>
                <nav className="space-y-1">
                  {tocItems.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById(item.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className="block py-1.5 text-[13px] transition-colors duration-200"
                      style={{
                        ...fontMono,
                        color: activeSection === item.id ? t.amber : t.muted,
                        fontWeight: activeSection === item.id ? 600 : 400,
                        borderLeft: activeSection === item.id ? `2px solid ${t.amber}` : "2px solid transparent",
                        paddingLeft: 12,
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content — right column */}
            <article className="flex-1 min-w-0 space-y-20">

              {/* Section 01 — Why we exist */}
              <section id="why-we-exist" ref={setRef("why-we-exist")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="01" label="WHY WE EXIST" t={t} />
                <SectionH2 t={t}>
                  Cloud engineering has a gap. Not a talent gap —{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>an access gap.</em>
                </SectionH2>
                <BodyText t={t}>
                  There is no shortage of people capable of doing this work. There is a shortage of people who were ever shown the door — given access to mentorship, to structured paths, to communities that signal clearly: <strong style={{ fontWeight: 600, color: t.heading }}>this is for you too.</strong>
                </BodyText>
                <BodyText t={t} className="mt-4">
                  That gap is not a talent gap. It is an access gap. And it is the reason Infracodebase University exists.
                </BodyText>
                <PullQuote t={t}>
                  "Talent is everywhere. Access is not." — this is not a marketing line. It is the reason University exists.
                </PullQuote>
                <BodyText t={t}>
                  We are not a bootcamp. We are not a corporate training programme. We are a structured learning path built by practitioners who have worked in cloud infrastructure, watched talented people fail to break into the field, and decided to do something about it. Your ability to become a cloud engineer should be determined by your willingness to learn — not by who you already know, where you started, or what the first page you landed on assumed about you.
                </BodyText>
              </section>

              {/* Section 02 — What University is */}
              <section id="what-it-is" ref={setRef("what-it-is")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="02" label="WHAT UNIVERSITY IS" t={t} />
                <SectionH2 t={t}>
                  Infrastructure as code,{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>not clicks.</em>
                </SectionH2>
                <BodyText t={t}>
                  Infracodebase University is a structured learning program for cloud engineers. Instead of fragmented tutorials, you follow a progressive curriculum — designing and governing systems the way they are actually built, using AI-powered Terraform workflows.
                </BodyText>

                {/* Comparison cards */}
                <div className="grid md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-[10px] p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderTop: `2px solid ${t.amber}` }}>
                    <div className="mb-3" style={{ ...fontMono, fontSize: 11, color: t.amber, letterSpacing: "0.1em" }}>WHAT UNIVERSITY IS</div>
                    <ul className="space-y-2">
                      {["A structured, coherent curriculum", "Systems thinking from day one", "Real infrastructure, real tools", "Hands-on deployments you actually own", "A verifiable credential at the end"].map(item => (
                        <li key={item} className="flex items-start gap-2" style={{ fontSize: 14, color: t.heading }}>
                          <span style={{ color: t.amber, flexShrink: 0 }}>→</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[10px] p-5" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderTop: `2px solid ${t.muted}` }}>
                    <div className="mb-3" style={{ ...fontMono, fontSize: 11, color: t.muted, letterSpacing: "0.1em" }}>WHAT IT IS NOT</div>
                    <ul className="space-y-2">
                      {["A YouTube playlist", "A certification cram session", "Disconnected tutorials", "Something you click through for a badge", "Only for people who already have the title"].map(item => (
                        <li key={item} className="flex items-start gap-2" style={{ fontSize: 14, color: t.heading }}>
                          <span style={{ color: t.muted, flexShrink: 0 }}>×</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <BodyText t={t}>
                  Each stage of the curriculum earns the next. There are no shortcuts — and that is precisely what makes the credential meaningful when you earn it.
                </BodyText>
              </section>

              {/* Section 03 — The path */}
              <section id="the-path" ref={setRef("the-path")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="03" label="THE PATH" t={t} />
                <SectionH2 t={t}>
                  From first concept to{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>certified.</em>
                </SectionH2>
                <BodyText t={t}>
                  Six steps. One clear path. Zero prior knowledge required at the start.
                </BodyText>

                {/* Vertical path */}
                <div className="mt-10 space-y-0">
                  {pathSteps.map((step, i) => (
                    <div key={step.num} className="flex gap-4">
                      {/* Vertical line + dot */}
                      <div className="flex flex-col items-center shrink-0" style={{ width: 32 }}>
                        <div
                          className="flex items-center justify-center rounded-full text-[12px] font-bold shrink-0"
                          style={{
                            width: 32, height: 32,
                            border: `2px solid ${step.highlight ? t.amber : t.cardBorder}`,
                            color: step.highlight ? t.amber : t.muted,
                            background: step.highlight ? t.amberBg : "transparent",
                          }}
                        >
                          {step.num}
                        </div>
                        {i < pathSteps.length - 1 && (
                          <div className="flex-1 w-px" style={{ background: t.cardBorder, minHeight: 24 }} />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-8">
                        <div style={{ fontSize: 15, fontWeight: 700, color: step.highlight ? t.amber : t.heading }}>
                          {step.title}
                        </div>
                        <p className="mt-1" style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.7, color: t.muted }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 04 — How we teach */}
              <section id="how-we-teach" ref={setRef("how-we-teach")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="04" label="HOW WE TEACH" t={t} />
                <SectionH2 t={t}>
                  Systems thinking, not{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>tool memorisation.</em>
                </SectionH2>
                <BodyText t={t}>
                  Most cloud learning teaches you to follow steps. This curriculum teaches you to understand systems. The difference is permanent.
                </BodyText>
                <BodyText t={t} className="mt-4">
                  You will not be asked to absorb Terraform syntax in isolation. You will be asked to design a system, provision it, watch it behave, and understand why. You stop thinking about individual resources and start thinking in architectures. When that shift happens, the tools become obvious — because you understand what they are for.
                </BodyText>
                <PullQuote t={t}>
                  "The real learning starts when you build, break, and fix things in real scenarios." — Partha Patnaik, Principal Solutions Architect
                </PullQuote>
                <BodyText t={t}>
                  Tutorials give you steps. University gives you the understanding behind them. The curriculum is the vehicle. Genuine engineering judgment is the destination.
                </BodyText>
              </section>

              {/* Section 05 — The community */}
              <section id="the-community" ref={setRef("the-community")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="05" label="THE COMMUNITY" t={t} />
                <SectionH2 t={t}>
                  464 learners. 20+ countries.{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>One shared goal.</em>
                </SectionH2>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-4 my-8">
                  {communityStats.map(stat => (
                    <div key={stat.label} className="rounded-[10px] p-5 text-center" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
                      <div style={{ ...fontDisplay, fontSize: 32, fontWeight: 700, color: stat.highlight ? t.amber : t.heading }}>
                        {stat.value}
                      </div>
                      <div className="mt-1" style={{ ...fontMono, fontSize: 12, color: t.muted }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <BodyText t={t}>
                  From San Francisco to Sydney. The learners who come to University are at every stage: some are completely new to tech, others are mid-career professionals transitioning from adjacent roles, others are junior engineers with some experience but no structured path forward.
                </BodyText>
                <BodyText t={t} className="mt-4">
                  What they share is the willingness to do the work. And now, a community of people doing it alongside them.
                </BodyText>
                <BodyText t={t} className="mt-4">
                  The <strong style={{ fontWeight: 600, color: t.heading }}>Builder Wall</strong> on Build with Her gives learners a place to publish their work publicly — to build visibility as they go, not just at the end. You do not have to wait until you are finished to show what you are building.
                </BodyText>
              </section>

              {/* Section 06 — Build with Her */}
              <section id="build-with-her" ref={setRef("build-with-her")} style={{ scrollMarginTop: 80 }}>
                <SectionEyebrow num="06" label="BUILD WITH HER" t={t} />
                <SectionH2 t={t}>
                  The community layer that makes learning{" "}
                  <em className="font-light" style={{ color: t.amber, fontStyle: "italic" }}>stick.</em>
                </SectionH2>
                <BodyText t={t}>
                  University closes the skills gap. Build with Her closes the human barriers. Both exist because they are needed.
                </BodyText>
                <BodyText t={t} className="mt-4">
                  Build with Her is the community ecosystem alongside University — live workshops, Q&A sessions, mentorship, and a global network of people working to close the gap in cloud engineering. It was created because learning alone is harder, slower, and far lonelier than it needs to be.
                </BodyText>
                <BodyText t={t} className="mt-4">
                  Open to everyone who believes access to this field should be equal — women who are navigating a field that has not always signalled it is for them, and anyone else who wants to be part of closing that gap.
                </BodyText>

                {/* Closing card */}
                <div className="mt-10 rounded-xl p-9" style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ ...fontDisplay, fontSize: 17, fontStyle: "italic", lineHeight: 1.7, color: "#f0ece3" }}>
                    "This journey is easier with others. Infracodebase University and Build with Her exist together — one gives you the skills, the other makes sure you never have to acquire them alone."
                  </p>
                  <a
                    href="https://buildwithher.infracodebase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium mt-6 transition-all duration-300 cursor-pointer"
                    style={{ ...fontMono, background: t.amber, color: "#fff" }}
                  >
                    Explore Build with Her ↗
                  </a>
                </div>

              </section>
            </article>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Manifesto;
