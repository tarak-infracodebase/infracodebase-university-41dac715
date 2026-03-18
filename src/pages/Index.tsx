import { Link } from "react-router-dom";
import { learningPaths } from "@/data/courseData";
import { AppLayout } from "@/components/AppLayout";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import "@fontsource/caveat/700.css";

import webinarLalit from "@/assets/events/webinar-lalit.png";
import webinarAi from "@/assets/events/webinar-ai-trust.png";
import webinarDec from "@/assets/events/webinar-dec.png";
import webinarFeb from "@/assets/events/webinar-feb.png";
import webinarShannon from "@/assets/events/webinar-shannon.png";
import legalBg from "@/assets/events/legal-background.png";

/* ── Session data ── */
const sessions = [
  { title: "Building Self-Service, Secure, and Scalable Developer Platforms", speakers: ["Lalit", "Tarak", "Justin"], tag: "Technical Session", link: "https://www.youtube.com/watch?v=vOMo1RquRsY", thumbnail: webinarLalit, featured: true },
  { title: "Building with AI You Can Trust", speakers: ["Fatima", "Tarak"], tag: "Technical Session", link: "https://www.youtube.com/watch?v=mlIePKsqa-4", thumbnail: webinarAi },
  { title: "Delivering Secure Cloud Infrastructure at Scale with AI", speakers: ["Justin", "Seif Hateb"], tag: "Live Webinar", link: "https://www.youtube.com/watch?v=SLpgv8zCzPU", thumbnail: webinarDec },
  { title: "Operating Cloud Engineering at Scale", speakers: ["Alex", "Tarak", "Justin"], tag: "Live Webinar", link: "https://www.youtube.com/watch?v=H8Osx6GcLSE", thumbnail: webinarFeb },
  { title: "Legal Background to Cloud Engineering", speakers: ["Tarak", "Fatima"], tag: "Career Talk", link: "https://www.linkedin.com/events/7437983286372626433/", thumbnail: legalBg },
  { title: "No Straight Lines: Breaking into Tech and Rising to Leadership", speakers: ["Shannon"], tag: "Conversation", link: "https://www.youtube.com/watch?v=vOMo1RquRsY", thumbnail: webinarShannon },
];

const tagColors: Record<string, string> = {
  "Technical Session": "bg-primary/10 text-primary border-primary/20",
  "Live Webinar": "bg-accent/10 text-accent border-accent/20",
  Conversation: "bg-secondary/10 text-secondary border-secondary/20",
  "Career Talk": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const speakerColors: Record<string, string> = {
  Lalit: "hsl(var(--crystal-violet))",
  Tarak: "hsl(var(--crystal-cyan))",
  Justin: "hsl(var(--crystal-green))",
  Shannon: "hsl(var(--crystal-magenta))",
  Alex: "hsl(var(--crystal-orange))",
  Fatima: "hsl(var(--crystal-yellow))",
  "Seif Hateb": "hsl(var(--crystal-red))",
};

/* ── Track data for Learning Paths grid ── */
const tracks = [
  { label: "Track 1", title: "Welcome", desc: "Introduce the program and understand the problem with fragmented infrastructure tooling, why infrastructure knowledge must be connected, how Infracodebase works, and how the program is structured.", lessons: 5, xp: 250 },
  { label: "Track 2", title: "Foundations", desc: "Learn the operating model of Infracodebase including enterprises, workspaces, rulesets, workflows, agents, subagents, documentation, architecture diagrams, GitHub integration, and infrastructure history.", lessons: 19, xp: 950 },
  { label: "Track 3", title: "Infrastructure", desc: "Build a realistic infrastructure environment step by step, covering architecture intent, VPC networking, subnets, routing, NAT, load balancers, application servers, databases, identity, storage, environments, resilience, and debugging.", lessons: 10, xp: 500 },
  { label: "Track 4", title: "Diagrams & Docs", desc: "Learn how infrastructure must remain understandable as systems grow through architecture diagrams, system visualization, traffic flows, documentation practices, and architecture decision records.", lessons: 5, xp: 250 },
  { label: "Track 5", title: "Governance", desc: "Learn how infrastructure is managed at organizational scale through governance principles, enterprise rulesets, infrastructure policies, approval workflows, audit history, and platform engineering practices.", lessons: 6, xp: 300 },
  { label: "Track 6", title: "Advanced", desc: "Move from building infrastructure to thinking like an infrastructure architect, covering scalability, failure domains, resilient architectures, security architecture, multi-region infrastructure, and system evolution.", lessons: 5, xp: 250 },
  { label: "Track 7", title: "Review", desc: "Review the entire learning journey, revisiting the Infracodebase model, infrastructure engineering, architecture documentation, governance, and advanced architecture with reflection questions and key insights.", lessons: 6, xp: 300 },
];

const whoIsFor = [
  { title: "Platform Engineers", desc: "Build internal infrastructure platforms that support multiple engineering teams." },
  { title: "DevOps Engineers", desc: "Evolve infrastructure workflows with AI-assisted design and automation." },
  { title: "Cloud Architects", desc: "Design resilient, scalable infrastructure systems across cloud providers." },
  { title: "Infrastructure Engineers", desc: "Build and operate production infrastructure with modern tooling." },
  { title: "Engineering Teams", desc: "Teams adopting AI-assisted infrastructure workflows." },
  { title: "Technical Leaders", desc: "Leaders driving infrastructure modernization across organizations." },
];

const whatYouLearn = [
  "Organize infrastructure work inside Infracodebase",
  "Collaborate with AI agents to design infrastructure",
  "Generate and review infrastructure as code",
  "Structure projects using workspaces, rulesets, and workflows",
  "Visualize systems using architecture diagrams",
  "Keep documentation synchronized with infrastructure",
  "Apply governance and engineering standards across projects",
  "Design resilient and scalable infrastructure systems",
];

/* ── Tiny components ── */

function SpeakerDot({ name }: { name: string }) {
  const bg = speakerColors[name] || "hsl(var(--muted-foreground))";
  return (
    <div className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-background shrink-0" style={{ backgroundColor: bg }}>
      {name[0]}
    </div>
  );
}

function SessionCard({ s }: { s: (typeof sessions)[0] }) {
  return (
    <a href={s.link} target="_blank" rel="noopener noreferrer" className="group rounded-xl overflow-hidden bg-card border border-border/30 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 block">
      <div className="aspect-video relative overflow-hidden">
        <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        <span className={cn("absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full border font-medium", tagColors[s.tag])}>{s.tag}</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{s.title}</h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">{s.speakers.map(n => <SpeakerDot key={n} name={n} />)}</div>
          <span className="text-[11px] text-muted-foreground truncate">{s.speakers.join(", ")}</span>
        </div>
        <span className="w-full rounded-lg bg-primary/10 text-primary px-4 py-2 text-xs font-medium flex items-center justify-center gap-1.5">
          Watch <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}

/* ── Page ── */

const Index = () => {
  const firstTrack = learningPaths[0];

  return (
    <AppLayout>
      {/* ═══════ HERO — DARK ═══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative px-6 lg:px-12 py-24 lg:py-36 max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Learn. Build. Grow.
          </h1>
          <p className="text-lg text-foreground font-medium leading-relaxed mb-3 max-w-2xl">
            Guided learning paths designed for every level.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            From first-time builders to specialists, learn how to design, build, and operate infrastructure using an agent control plane — and build the skills to work at scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/curriculum" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow">
              Start learning <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors">
              Read the manifesto
            </Link>
            <Link to="/roadmap" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors">
              View roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ MANIFESTO + UNIVERSITY INTRO — LIGHT 2-COL ═══════ */}
      <section className="bg-[hsl(0_0%_97%)] py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-16 lg:gap-20">
          {/* LEFT — Manifesto (3/5) */}
          <div className="lg:col-span-3">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-[hsl(228_20%_10%)] mb-8"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Learn Infrastructure<br />Differently.
            </h2>
            <p className="text-base md:text-lg text-[hsl(220_10%_40%)] leading-relaxed mb-2">
              Modern infrastructure isn't learned through tutorials.
            </p>
            <p className="text-base md:text-lg text-[hsl(220_10%_40%)] leading-relaxed mb-10">
              You learn it by understanding how infrastructure actually works.
            </p>
            <Link
              to="/manifesto"
              className="text-sm font-medium text-[hsl(260_70%_58%)] hover:text-[hsl(260_70%_48%)] transition-colors inline-flex items-center gap-1.5"
            >
              Read the manifesto <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* RIGHT — University intro (2/5) */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-[hsl(228_20%_12%)] mb-4">
              What is Infracodebase University?
            </h3>
            <p className="text-sm text-[hsl(220_10%_40%)] leading-relaxed mb-4">
              Infracodebase University is a structured learning program for infrastructure engineers. It teaches how to design, build, document, and govern infrastructure using Infracodebase — an agent operating system for infrastructure as code.
            </p>
            <p className="text-sm text-[hsl(220_10%_40%)] leading-relaxed">
              Instead of fragmented tutorials, you follow a progressive curriculum that mirrors how real infrastructure systems are built and evolved.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ LEARNING PATHS — DARK GRID ═══════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">Learning Paths</h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Seven structured tracks from foundations to advanced infrastructure architecture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((t, i) => (
              <Link
                key={t.label}
                to={learningPaths[i] ? `/path/${learningPaths[i].id}` : "/curriculum"}
                className="group rounded-lg border border-border/40 bg-[hsl(228_24%_10%)] p-5 transition-colors hover:border-primary/30"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2">{t.label}</p>
                <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">{t.desc}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{t.lessons} lessons</span>
                  <span className="text-primary/70">+{t.xp} XP</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHO THIS IS FOR — LIGHT ═══════ */}
      <section className="bg-[hsl(0_0%_97%)] py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(228_20%_12%)] tracking-tight mb-12">
            Who this is for
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {whoIsFor.map(w => (
              <div key={w.title}>
                <p className="text-sm font-semibold text-[hsl(228_20%_12%)] mb-1">{w.title}</p>
                <p className="text-sm text-[hsl(220_10%_40%)] leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT YOU WILL LEARN — LIGHT ═══════ */}
      <section className="bg-[hsl(0_0%_97%)] pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(228_20%_12%)] tracking-tight mb-10">
            What you will learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-4">
            {whatYouLearn.map(item => (
              <p key={item} className="text-sm text-[hsl(220_10%_40%)] leading-relaxed flex gap-3">
                <span className="text-[hsl(260_70%_58%)] mt-0.5 shrink-0">•</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ VIDEOS — DARK ═══════ */}
      <section className="border-t border-border/20 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">Learn by Watching</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Learn from real infrastructure decisions, deep dives, and engineering conversations.
            </p>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Recommended</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {sessions.filter(s => s.featured).map(s => <SessionCard key={s.title} s={s} />)}
          </div>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">All Sessions</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sessions.map(s => <SessionCard key={s.title} s={s} />)}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border/30 py-8 px-6 lg:px-12">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Infracodebase University. A technical academy for infrastructure engineering.
        </p>
      </footer>
    </AppLayout>
  );
};

export default Index;
