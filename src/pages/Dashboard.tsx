import { AppLayout } from "@/components/AppLayout";
import { StatCard, ProgressRing, CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import {
  Flame, Trophy, Zap, ArrowRight, BookOpen, Calendar,
  Play, ChevronRight, Star, CheckCircle2, Video
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const weeklyXP = [
  { day: "Mon", xp: 120, active: true },
  { day: "Tue", xp: 85, active: true },
  { day: "Wed", xp: 200, active: true },
  { day: "Thu", xp: 150, active: true },
  { day: "Fri", xp: 90, active: true },
  { day: "Sat", xp: 45, active: true },
  { day: "Sun", xp: 0, active: false },
];

const recentActivity = [
  { action: "Completed lesson", detail: "Building the Network Foundation", time: "2 hours ago", xp: 50, icon: CheckCircle2 },
  { action: "Earned crystal", detail: "Networking Fundamentals", time: "2 hours ago", xp: 100, icon: Star },
  { action: "Completed lesson", detail: "Understanding the System We Are Building", time: "1 day ago", xp: 50, icon: CheckCircle2 },
  { action: "Started track", detail: "Real Infrastructure Engineering", time: "1 day ago", xp: 25, icon: Play },
];

const earnedCrystals = [
  { name: "Welcome Complete", color: crystalColors[0], desc: "Unlocked after completing Track 1 orientation" },
  { name: "Foundation Builder", color: crystalColors[1], desc: "Unlocked after completing Track 2" },
  { name: "Network Pioneer", color: crystalColors[2], desc: "Unlocked after finishing networking lessons" },
];

const lockedCrystals = [
  { name: "Diagram Master", desc: "Complete Track 4 to unlock" },
  { name: "Governance Pro", desc: "Complete Track 5 to unlock" },
  { name: "Architect Elite", desc: "Complete Track 6 to unlock" },
];

const libraryVideos = [
  { title: "Introduction to Infracodebase", src: "/assets/Introduction.mp4", category: "Getting Started" },
  { title: "Applying Infracodebase to Real Infrastructure", src: "/assets/Applying_Infracodebase2.mp4", category: "Infrastructure Architecture" },
];

const Dashboard = () => {
  const maxWeekXP = Math.max(...weeklyXP.map(d => d.xp));
  const totalWeekXP = weeklyXP.reduce((s, d) => s + d.xp, 0);
  const [hoveredCrystal, setHoveredCrystal] = useState<number | null>(null);
  const [hoveredLocked, setHoveredLocked] = useState<number | null>(null);

  // Current track info — resolved dynamically from curriculum data
  const currentTrack = learningPaths.find(p => p.id === "real-infrastructure");
  const allCurrentLessons = currentTrack?.courses.flatMap(c => c.lessons) || [];
  const currentTrackLessons = allCurrentLessons.length;
  const completedLessons = 2; // TODO: replace with real progress tracking
  const nextLesson = allCurrentLessons[completedLessons]; // first incomplete lesson
  const progressPct = currentTrackLessons > 0 ? Math.round((completedLessons / currentTrackLessons) * 100) : 0;

  // Recommended next
  const nextTrack = learningPaths.find(p => p.id === "architecture-diagrams");
  const nextTrackLessons = nextTrack?.courses.reduce((t, c) => t + c.lessons.length, 0) || 0;

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your learning command center</p>
        </div>

        {/* ═══ HERO: Resume Learning ═══ */}
        <Link
          to={nextLesson ? `/path/real-infrastructure/lesson/${nextLesson.id}` : "/path/real-infrastructure"}
          className="block group"
        >
          <div className="glass-panel rounded-2xl p-6 lg:p-8 border-primary/20 hover:border-primary/40 transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-t-2xl" />
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">Resume Learning</p>
                <p className="text-xs text-muted-foreground mb-1">Track {currentTrack?.order} — {currentTrack?.title}</p>
                <h2 className="text-lg font-bold mb-1">{nextLesson?.title ?? "Track Complete"}</h2>
                <p className="text-xs text-muted-foreground mb-3">{completedLessons} / {currentTrackLessons} lessons completed</p>
                <div className="flex items-center gap-3">
                  <Progress value={progressPct} className="h-2 flex-1 max-w-[280px] bg-muted" />
                  <span className="text-xs font-mono text-muted-foreground">{progressPct}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button size="sm" className="gap-1.5 text-xs">
                  <Play className="h-3 w-3" /> Resume Lesson
                </Button>
                <Link
                  to={`/path/${currentTrack?.id}`}
                  onClick={e => e.stopPropagation()}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Open Track →
                </Link>
              </div>
            </div>
          </div>
        </Link>

        {/* ═══ Top Stats (supporting info) ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Level" value="7" icon={<Star className="h-4 w-4" />} subtitle="Infrastructure Engineer" />
          <StatCard label="Total XP" value="2,450" icon={<Zap className="h-4 w-4" />} subtitle="Top 15%" />
          <StatCard label="Streak" value="12 days" icon={<Flame className="h-4 w-4" />} subtitle="Personal best!" />
          <StatCard label="League" value="Silver" icon={<Trophy className="h-4 w-4" />} subtitle="32 XP to Gold" />
        </div>

        {/* ═══ Two Column Layout ═══ */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Current Track Panel */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Current Track</h2>
              <div className="flex items-start gap-4">
                <CrystalIcon color={crystalColors[2]} size={32} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-primary font-mono mb-0.5">Track 3</p>
                  <h3 className="text-sm font-bold mb-2">Real Infrastructure Engineering</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress value={progressPct} className="h-1.5 flex-1 max-w-[200px] bg-muted" />
                    <span className="text-[10px] font-mono text-muted-foreground">{completedLessons} / {currentTrackLessons} lessons</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next: <span className="text-foreground">Controlling Traffic with Routing and NAT</span>
                  </p>
                </div>
                <Link to="/path/real-infrastructure">
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    Open Track <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recommended Next Track */}
            {nextTrack && (
              <div className="glass-panel rounded-xl p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Recommended Next Track</h2>
                <Link to={`/path/${nextTrack.id}`} className="group flex items-start gap-4 rounded-xl border border-border/50 bg-muted/20 p-4 hover:border-primary/30 transition-all">
                  <CrystalIcon color={crystalColors[3]} size={32} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-primary font-mono mb-0.5">Track {nextTrack.order}</p>
                    <h3 className="text-sm font-bold">{nextTrack.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{nextTrack.description.substring(0, 120)}...</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                      <span>{nextTrackLessons} lessons</span>
                      <span className="text-crystal-yellow font-mono">+{nextTrackLessons * 50} XP</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    Preview <ChevronRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Weekly Learning Goal */}
            <div className="glass-panel rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Weekly Learning Goal</h2>
                <span className="text-xs font-mono text-primary">{totalWeekXP} / 1,000 XP</span>
              </div>
              <Progress value={(totalWeekXP / 1000) * 100} className="h-2 bg-muted mb-4" />
              <div className="flex items-end gap-2 h-28">
                {weeklyXP.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md transition-all duration-500"
                      style={{
                        height: `${Math.max((d.xp / Math.max(maxWeekXP, 1)) * 100, 4)}%`,
                        background: d.xp > 0
                          ? `linear-gradient(to top, hsl(260, 70%, 58%), hsl(330, 65%, 55%))`
                          : 'hsl(var(--muted))'
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    <div className={`h-1.5 w-1.5 rounded-full ${d.active ? 'bg-primary' : 'bg-muted'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-xs font-medium">{a.action}</p>
                        <p className="text-[10px] text-muted-foreground">{a.detail} · {a.time}</p>
                      </div>
                      <span className="text-xs font-mono text-crystal-green shrink-0">+{a.xp} XP</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Video Library Preview */}
            <div className="glass-panel rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Recently Added Videos</h2>
                <Link to="/videos" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {libraryVideos.map((v, i) => (
                  <Link
                    key={i}
                    to="/videos"
                    className="group rounded-xl border border-border/50 bg-muted/20 overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-video bg-muted/30 relative overflow-hidden">
                      <video src={v.src} preload="metadata" muted className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-10 w-10 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-semibold line-clamp-1">{v.title}</h3>
                      <span className="text-[10px] text-muted-foreground">{v.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ Right column ═══ */}
          <div className="space-y-6">
            {/* Next Milestone */}
            <div className="glass-panel rounded-xl p-5 flex flex-col items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 self-start">Next Milestone</h2>
              <ProgressRing value={2450} max={3000} size={100} strokeWidth={8}>
                <div className="text-center">
                  <span className="text-lg font-mono font-bold text-foreground">82%</span>
                </div>
              </ProgressRing>
              <p className="text-xs text-muted-foreground mt-3">550 XP to Level 8</p>
              <p className="text-xs text-primary font-medium mt-1">Infrastructure Architect</p>
            </div>

            {/* Earned Crystals */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Earned Crystals</h2>
              <div className="grid grid-cols-3 gap-3">
                {earnedCrystals.map((c, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col items-center gap-1.5 p-2 rounded-lg bg-muted/30 cursor-pointer"
                    onMouseEnter={() => setHoveredCrystal(i)}
                    onMouseLeave={() => setHoveredCrystal(null)}
                  >
                    <CrystalIcon color={c.color} size={28} />
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{c.name}</span>
                    {hoveredCrystal === i && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-1.5 text-[10px] text-foreground whitespace-nowrap shadow-lg z-10">
                        {c.desc}
                      </div>
                    )}
                  </div>
                ))}
                {lockedCrystals.map((c, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col items-center gap-1.5 p-2 rounded-lg bg-muted/20 border border-dashed border-border/50 cursor-pointer"
                    onMouseEnter={() => setHoveredLocked(i)}
                    onMouseLeave={() => setHoveredLocked(null)}
                  >
                    <div className="h-7 w-5 rounded bg-muted/30" />
                    <span className="text-[10px] text-muted-foreground">Locked</span>
                    {hoveredLocked === i && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-3 py-1.5 text-[10px] text-foreground whitespace-nowrap shadow-lg z-10">
                        {c.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick Access</h2>
              <div className="space-y-1.5">
                {[
                  { label: "Curriculum", path: "/curriculum", icon: <BookOpen className="h-3.5 w-3.5" /> },
                  { label: "Events", path: "/events", icon: <Calendar className="h-3.5 w-3.5" /> },
                  { label: "Video Library", path: "/videos", icon: <Play className="h-3.5 w-3.5" /> },
                ].map(l => (
                  <Link key={l.path} to={l.path} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                    {l.icon} {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
