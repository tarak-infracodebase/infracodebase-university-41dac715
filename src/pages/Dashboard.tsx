import { AppLayout } from "@/components/AppLayout";
import { StatCard, ProgressRing, SkillBar, CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import { 
  Flame, Target, Trophy, Zap, ArrowRight, BookOpen, Calendar, 
  FileText, Play, ChevronRight, Star
} from "lucide-react";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

const weeklyXP = [
  { day: "Mon", xp: 120 }, { day: "Tue", xp: 85 }, { day: "Wed", xp: 200 },
  { day: "Thu", xp: 150 }, { day: "Fri", xp: 90 }, { day: "Sat", xp: 45 }, { day: "Sun", xp: 0 },
];

const recentActivity = [
  { action: "Completed lesson", detail: "Building the Network Foundation", time: "2 hours ago", xp: 50 },
  { action: "Earned crystal", detail: "Networking Fundamentals", time: "2 hours ago", xp: 100 },
  { action: "Completed lesson", detail: "Understanding the System We Are Building", time: "1 day ago", xp: 50 },
  { action: "Started track", detail: "Real Infrastructure Engineering", time: "1 day ago", xp: 25 },
];

const earnedCrystals = [
  { name: "Welcome Complete", color: crystalColors[0] },
  { name: "Foundation Builder", color: crystalColors[1] },
  { name: "Network Pioneer", color: crystalColors[2] },
];

const Dashboard = () => {
  const maxWeekXP = Math.max(...weeklyXP.map(d => d.xp));
  const totalWeekXP = weeklyXP.reduce((s, d) => s + d.xp, 0);

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your learning command center</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Level" value="7" icon={<Star className="h-4 w-4" />} subtitle="Infrastructure Engineer" />
          <StatCard label="Total XP" value="2,450" icon={<Zap className="h-4 w-4" />} subtitle="Top 15%" />
          <StatCard label="Streak" value="12 days" icon={<Flame className="h-4 w-4" />} subtitle="Personal best!" />
          <StatCard label="League" value="Silver" icon={<Trophy className="h-4 w-4" />} subtitle="32 XP to Gold" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className="glass-panel rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Continue Learning</h2>
                <Link to="/curriculum" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">View all <ChevronRight className="h-3 w-3" /></Link>
              </div>
              <Link to="/path/real-infrastructure/lesson/understanding-system" className="group flex items-center gap-4 rounded-xl border border-border/50 bg-muted/20 p-4 hover:border-primary/30 transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Track 3 · Real Infrastructure Engineering</p>
                  <p className="text-sm font-medium mt-0.5">Controlling Traffic with Routing and NAT</p>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary w-[45%]" />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            </div>

            {/* Weekly XP Chart */}
            <div className="glass-panel rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Weekly Learning Goal</h2>
                <span className="text-xs font-mono text-primary">{totalWeekXP} / 1000 XP</span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {weeklyXP.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-md transition-all duration-500" 
                      style={{ 
                        height: `${Math.max((d.xp / Math.max(maxWeekXP, 1)) * 100, 4)}%`,
                        background: d.xp > 0 ? `linear-gradient(to top, hsl(260, 70%, 58%), hsl(330, 65%, 55%))` : 'hsl(var(--muted))'
                      }} />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs">{a.action}: <span className="text-muted-foreground">{a.detail}</span></p>
                      <p className="text-[10px] text-muted-foreground">{a.time}</p>
                    </div>
                    <span className="text-xs font-mono text-crystal-green">+{a.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* XP Progress */}
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
                  <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-muted/30">
                    <CrystalIcon color={c.color} size={28} />
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{c.name}</span>
                  </div>
                ))}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-muted/20 border border-dashed border-border/50">
                    <div className="h-7 w-5 rounded bg-muted/30" />
                    <span className="text-[10px] text-muted-foreground">Locked</span>
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

            {/* Recommended */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Recommended</h2>
              <Link to="/path/architecture-diagrams" className="group block rounded-lg border border-border/50 bg-muted/20 p-3 hover:border-primary/30 transition-all">
                <p className="text-xs text-primary mb-0.5">Track 4</p>
                <p className="text-sm font-medium">Architecture Diagrams</p>
                <p className="text-[10px] text-muted-foreground mt-1">Learn to visualize infrastructure</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
