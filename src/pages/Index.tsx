import { Link } from "react-router-dom";
import { learningPaths, getTotalLessons, getTotalCourses } from "@/data/courseData";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import {
  ArrowRight, ChevronRight, Play, Shield, Layers,
  FileText, Cpu, Network } from
"lucide-react";
import { Progress } from "@/components/ui/progress";

const exploreRows = [
{ label: "Start building infrastructure", path: `/path/${learningPaths[0]?.id}` },
{ label: "Production architectures", path: `/path/${learningPaths[2]?.id || learningPaths[0]?.id}` },
{ label: "Security & governance", path: `/path/${learningPaths[4]?.id || learningPaths[0]?.id}` },
{ label: "Architecture patterns", path: `/path/${learningPaths[5]?.id || learningPaths[0]?.id}` },
{ label: "Documentation & diagrams", path: `/path/${learningPaths[3]?.id || learningPaths[0]?.id}` }];


const Index = () => {
  const firstTrack = learningPaths[0];

  return (
    <AppLayout>
      {/* Hero */}
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
            From first-time builders to specialists, learn how to design, build, and operate infrastructure using an agent control plane and build the skills to work at scale.
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

      {/* Start Here */}
      <section className="py-16 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Build your first workspace.</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Step into a real infrastructure and start working.
          </p>
          <Link
            to={`/path/${firstTrack?.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            
            Start <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Continue Learning (mock stateful) */}
      <section className="py-16 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-3">Continue learning</p>
          <h2 className="text-xl font-bold mb-1">Continue your workspace</h2>
          <p className="text-sm text-muted-foreground mb-2">Production-grade Web Application</p>
          <div className="flex items-center gap-3 mb-4">
            <Progress value={35} className="h-2 flex-1 max-w-[280px] bg-muted" />
            <span className="text-xs font-mono text-muted-foreground">35%</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Next: <span className="text-foreground">Secure your infrastructure</span>
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
            
            <Play className="h-3.5 w-3.5" /> Resume
          </Link>
        </div>
      </section>

      {/* Roadmap Bridge */}
      <section className="py-16 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">See how it works</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Understand how infrastructure is designed and evolved in Infracodebase.
          </p>
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors">
            
            View roadmap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Explore */}
      <section className="py-16 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Explore</h2>
          <div className="space-y-1">
            {exploreRows.map((row, i) =>
            <Link
              key={i}
              to={row.path}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors group">
              
                <span>{row.label}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Manifesto Preview */}
      <section className="py-20 px-6 lg:px-12 border-t border-border/30">
        <div className="max-w-xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-1">
            Infrastructure is broken.
          </p>
          <p className="text-lg text-foreground font-semibold leading-relaxed mb-6">
            We are rebuilding how it is learned.
          </p>
          <Link
            to="/manifesto"
            className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
            
            Read the manifesto <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6 lg:px-12">
        <p className="text-center text-xs text-muted-foreground">© 2026 Infracodebase University. A technical academy for infrastructure engineering.</p>
      </footer>
    </AppLayout>);

};

export default Index;