import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { learningPaths } from "@/data/courseData";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { 
  ArrowRight, Layers, Cpu, TrendingUp, CheckCircle2, 
  Users, FileText, Shield, Zap
} from "lucide-react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const trackDescriptions = [
  {
    subtitle: "Foundations",
    desc: "Define your infrastructure context — organization, teams, environments, repositories.",
    outcome: "Your infrastructure context is ready.",
  },
  {
    subtitle: "AI Foundation Layer",
    desc: "Activate intelligence — configure rulesets, enable AI agents, connect environments.",
    outcome: "Your infrastructure can be analyzed and governed.",
  },
  {
    subtitle: "Workspace Creation",
    desc: "Create your workspace — start from scratch or connect GitHub, generate architecture, build infrastructure.",
    outcome: "Your workspace is live.",
  },
  {
    subtitle: "Workspace Governance",
    desc: "Control your infrastructure — manage access, define workflows, configure integrations.",
    outcome: "Your infrastructure is governed and secure.",
  },
  {
    subtitle: "Working Inside Workspace",
    desc: "Operate your infrastructure — analyze architecture, review compliance, collaborate with AI agents.",
    outcome: "Your infrastructure evolves continuously.",
  },
  {
    subtitle: "Scale Across Organization",
    desc: "Scale infrastructure practices — standardize patterns, reuse modules, expand across teams.",
    outcome: "Infracodebase becomes your control plane.",
  },
];

const afterItems = [
  { icon: <Shield className="h-5 w-5" />, title: "Understand your infrastructure", desc: "Identify risks, gaps, and inefficiencies across your environments." },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Improve continuously", desc: "Apply best practices, strengthen security, and optimize architecture." },
  { icon: <Users className="h-5 w-5" />, title: "Work across teams", desc: "Collaborate, share infrastructure patterns, and align practices." },
  { icon: <FileText className="h-5 w-5" />, title: "Maintain living architecture", desc: "Your diagrams, documentation, and infrastructure stay continuously updated." },
];

const Roadmap = () => {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative px-6 lg:px-12 py-24 lg:py-32 max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Understand Infracodebase
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Design, analyze, and evolve infrastructure through a unified control plane.
          </p>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">What you can do</h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-10">
            Infracodebase is not a tool.<br />
            It is a control plane for infrastructure.
          </p>

          <div className="space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Layers className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Build infrastructure</h3>
                  <p className="text-xs text-muted-foreground">Design landing zones and generate production-ready architectures.</p>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><Cpu className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Modernize infrastructure</h3>
                  <p className="text-xs text-muted-foreground">Transform existing environments into secure, scalable architectures.</p>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary"><TrendingUp className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Improve continuously</h3>
                  <p className="text-xs text-muted-foreground">Analyze infrastructure, detect risks, and improve reliability over time.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-8 border-l-2 border-primary/30 pl-4">
            AI agents continuously analyze, secure, and improve your infrastructure.
          </p>
        </div>
      </section>

      {/* Your Journey */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Your journey</h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-12">
            You don't learn theory.<br />
            You work on real infrastructure.
          </p>

          <div className="space-y-6">
            {learningPaths.slice(0, 6).map((path, i) => {
              const td = trackDescriptions[i];
              if (!td) return null;
              return (
                <Link
                  key={path.id}
                  to={`/path/${path.id}`}
                  className="group glass-panel-hover rounded-xl p-6 block"
                >
                  <div className="flex items-start gap-4">
                    <CrystalIcon color={crystalColors[i]} size={28} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-muted-foreground font-mono mb-1">Track {i + 1}</div>
                      <h3 className="font-semibold text-sm mb-1">{td.subtitle}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{td.desc}</p>
                      <div className="flex items-center gap-2 text-[10px]">
                        <CheckCircle2 className="h-3 w-3 text-crystal-green" />
                        <span className="text-crystal-green">{td.outcome}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your first workspace */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Your first workspace</h2>
          <div className="space-y-3 mb-6">
            {["Define your infrastructure context", "Activate intelligence", "Create your workspace", "Start working"].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary">{i + 1}</div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-8">
            Most teams are up and running in under 30 minutes.
          </p>
          <Link
            to={`/path/${learningPaths[0]?.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow"
          >
            Start your workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* After completing */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">After completing the university</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {afterItems.map((item, i) => (
              <div key={i} className="glass-panel rounded-xl p-5">
                <div className="rounded-lg bg-primary/10 p-2 text-primary inline-flex mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Evolution */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">The university evolves with your infrastructure</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>Infracodebase University is not static.</p>
            <p>As infrastructure evolves, so does the way you learn.</p>
            <p>New architectures, patterns, and practices are continuously introduced.</p>
          </div>
        </div>
      </section>

      {/* Final Transformation */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-base leading-relaxed space-y-3">
            <p className="text-muted-foreground">You don't just learn infrastructure.</p>
            <p className="text-foreground font-semibold">You design, operate, and evolve architecture over time.</p>
            <p className="text-muted-foreground">Infracodebase becomes the control plane for your infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6 lg:px-12">
        <p className="text-center text-xs text-muted-foreground">© 2026 Infracodebase University.</p>
      </footer>
    </AppLayout>
  );
};

export default Roadmap;
