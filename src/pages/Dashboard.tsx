import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import {
  ArrowRight, Play, ChevronRight, CheckCircle2, 
  Network, Shield, Layers, Zap, TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

// Mock workspace data
const workspaces = [
  { name: "AWS Web Application", progress: 45, stage: "Networking", focus: "Route tables & NAT", next: "Configure security groups" },
  { name: "Azure Identity Environment", progress: 20, stage: "Identity", focus: "AAD integration", next: "Define RBAC policies" },
];

const capabilities = [
  { name: "Networking", status: "complete" as const },
  { name: "IAM", status: "complete" as const },
  { name: "Governance", status: "next" as const },
  { name: "Monitoring", status: "locked" as const },
  { name: "Cost Optimization", status: "locked" as const },
];

const improvements = [
  "Add monitoring",
  "Improve resilience",
  "Optimize cost",
];

const Dashboard = () => {
  // Resolve current track from data
  const currentTrack = learningPaths[2]; // Track 3 — Workspace Creation
  const allLessons = currentTrack?.courses.flatMap(c => c.lessons) || [];
  const completedLessons = 3;
  const nextLesson = allLessons[completedLessons];
  const progressPct = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  // Track progress indicators
  const trackProgress = [
    { name: "Foundations", done: true },
    { name: "AI Layer", done: true },
    { name: "Workspace Creation", done: false, current: true },
    { name: "Governance", done: false },
    { name: "Operations", done: false },
    { name: "Scale", done: false },
  ];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Control Plane</h1>
          <p className="text-sm text-muted-foreground">
            You are working on: <span className="text-foreground font-medium">Production-grade architecture</span>
          </p>
        </div>

        {/* Track Progress Bar */}
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center gap-2 flex-wrap">
            {trackProgress.map((tp, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium border ${
                  tp.done 
                    ? "border-crystal-green/30 bg-crystal-green/10 text-crystal-green" 
                    : tp.current 
                      ? "border-primary/30 bg-primary/10 text-primary" 
                      : "border-border/50 text-muted-foreground"
                }`}>
                  {tp.done && <CheckCircle2 className="h-3 w-3" />}
                  {tp.name}
                </div>
                {i < trackProgress.length - 1 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Step — MANDATORY */}
        <Link
          to={nextLesson ? `/path/${currentTrack?.id}/lesson/${nextLesson.id}` : `/path/${currentTrack?.id}`}
          className="block group"
        >
          <div className="glass-panel rounded-2xl p-6 border-primary/20 hover:border-primary/40 transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-t-2xl" />
            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">Next step</p>
            <h2 className="text-lg font-bold mb-1">Secure your infrastructure</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Phase 3 — Workspace Creation · Track {currentTrack?.order}
            </p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="h-3.5 w-3.5" /> Continue
            </button>
          </div>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Workspaces */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Workspaces</h2>
              <div className="space-y-4">
                {workspaces.map((ws, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">{ws.name}</h3>
                      <span className="text-[10px] font-mono text-muted-foreground">{ws.progress}%</span>
                    </div>
                    <Progress value={ws.progress} className="h-1.5 bg-muted mb-3" />
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider mb-0.5">Stage</span>
                        <span className="text-foreground">{ws.stage}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider mb-0.5">Focus</span>
                        <span className="text-foreground">{ws.focus}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider mb-0.5">Next</span>
                        <span className="text-foreground">{ws.next}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* You Are Here */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">You are here</h2>
              <div className="flex items-start gap-4">
                <CrystalIcon color={crystalColors[2]} size={32} />
                <div className="flex-1">
                  <p className="text-[10px] text-primary font-mono mb-0.5">Phase 3</p>
                  <h3 className="text-sm font-bold mb-1">{currentTrack?.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{completedLessons} / {allLessons.length} lessons</p>
                  <Progress value={progressPct} className="h-1.5 max-w-[240px] bg-muted" />
                </div>
                <Link to={`/path/${currentTrack?.id}`} className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Open track →
                </Link>
              </div>
            </div>

            {/* Continuous Evolution */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Your infrastructure is evolving</h2>
              <div className="space-y-2 mb-4">
                {improvements.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-crystal-yellow" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/curriculum"
                className="text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore improvements <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Capabilities */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Capabilities</h2>
              <div className="space-y-2">
                {capabilities.map((cap, i) => (
                  <div key={i} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs ${
                    cap.status === "complete" 
                      ? "text-crystal-green" 
                      : cap.status === "next" 
                        ? "text-primary border border-primary/20 bg-primary/5" 
                        : "text-muted-foreground/50"
                  }`}>
                    {cap.status === "complete" && <CheckCircle2 className="h-3.5 w-3.5" />}
                    {cap.status === "next" && <ArrowRight className="h-3.5 w-3.5" />}
                    {cap.status === "locked" && <div className="h-3.5 w-3.5 rounded border border-border/50" />}
                    {cap.name}
                    {cap.status === "next" && <span className="ml-auto text-[9px] font-mono">next</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick Access</h2>
              <div className="space-y-1.5">
                {[
                  { label: "Curriculum", path: "/curriculum" },
                  { label: "Infrastructure Sessions", path: "/videos" },
                  { label: "Live Architecture Sessions", path: "/events" },
                  { label: "Roadmap", path: "/roadmap" },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    {l.label}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Session */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Recommended session</h2>
              <Link to="/videos" className="block rounded-lg border border-border/50 bg-muted/20 p-3 hover:border-primary/30 transition-colors">
                <h3 className="text-xs font-semibold mb-1">Architecture Diagrams & Living Documentation</h3>
                <p className="text-[10px] text-muted-foreground mb-2">Linked to your current track</p>
                <span className="text-[10px] text-primary">Watch session →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
