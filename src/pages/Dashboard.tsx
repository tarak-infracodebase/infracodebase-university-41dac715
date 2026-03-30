import { AppLayout } from "@/components/AppLayout";
import { ProgressRing, SkillBar, CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Play, ChevronRight,
  Zap, Target, Layers, Shield, Flame, Heart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { BADGES } from "@/hooks/useGamification";
import {
  LevelCard, StreakCard, DailyGoalRing, HeartsDisplay,
  StreakRiskBanner, DoubleXPBanner, StreakFreezeCard
} from "@/components/GamificationWidgets";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ── constants ──────────────────────────────────────────────────────────────

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

// Skill bars represent the platform's tracked skill categories.
// Values are seeded from the learner's activity profile and updated over time.
const skills = [
  { label: "Infrastructure Architecture", value: 72, color: crystalColors[0] },
  { label: "Networking & Routing",         value: 65, color: crystalColors[1] },
  { label: "Identity & Access Management", value: 45, color: crystalColors[2] },
  { label: "Configuration Automation",     value: 58, color: crystalColors[3] },
  { label: "Infrastructure Debugging",     value: 40, color: crystalColors[4] },
  { label: "Environment Management",       value: 35, color: crystalColors[5] },
  { label: "Governance & Rulesets",        value: 25, color: crystalColors[6] },
  { label: "Architecture Documentation",   value: 30, color: crystalColors[0] },
  { label: "Platform Engineering",         value: 20, color: crystalColors[1] },
  { label: "Resilience & Scaling",         value: 15, color: crystalColors[2] },
  { label: "Infrastructure Operations",    value: 50, color: crystalColors[3] },
];

const FALLBACK_MONTHLY = [
  { month: "Oct", xp: 0 }, { month: "Nov", xp: 0 }, { month: "Dec", xp: 0 },
  { month: "Jan", xp: 0 }, { month: "Feb", xp: 0 }, { month: "Mar", xp: 0 },
];

// ── Dashboard ──────────────────────────────────────────────────────────────

const Dashboard = () => {
  const {
    state, levelIdx, levelName, xpToNext,
    activateDoubleXP, earnedBadges,
  } = useGamificationContext();

  // Activate double XP when user returns after 2+ days away
  useEffect(() => {
    if (!state.lastActiveDate || state.doubleXP) return;
    const diffDays = Math.floor(
      (Date.now() - new Date(state.lastActiveDate).getTime()) / 86_400_000
    );
    if (diffDays >= 2) activateDoubleXP();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived track progress ────────────────────────────────────────────────
  const trackProgress: Record<string, {
    completed: number;
    status: "in_progress" | "completed" | "not_started";
  }> = {};

  learningPaths.forEach(path => {
    const lessons = path.courses.flatMap(c => c.lessons);
    const completed = lessons.filter(l =>
      state.completedLessons.includes(`${path.id}:${l.id}`)
    ).length;
    trackProgress[path.id] = {
      completed,
      status: completed === 0 ? "not_started"
        : completed === lessons.length ? "completed"
        : "in_progress",
    };
  });

  const totalTracks = learningPaths.length;
  const tracksCompleted = Object.values(trackProgress).filter(t => t.status === "completed").length;
  const overallProgress = totalTracks > 0
    ? Math.round((tracksCompleted / totalTracks) * 100)
    : 0;

  const monthlyData = state.monthlyXP.length > 0 ? state.monthlyXP : FALLBACK_MONTHLY;
  const maxMonthly = Math.max(...monthlyData.map(d => d.xp), 1);

  // Build weekly XP data (last 7 days)
  const weeklyXPData = useMemo(() => {
    const days: Array<{ day: string; xp: number; isToday: boolean }> = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayLabel = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
      const entry = state.dailyXPLog?.find(e => e.date === dateStr);
      days.push({ day: dayLabel, xp: entry?.xp ?? 0, isToday: i === 0 });
    }
    return days;
  }, [state.dailyXPLog]);

  const currentTrack = learningPaths.find(p => trackProgress[p.id]?.status === "in_progress");
  const allCurrentLessons = currentTrack?.courses.flatMap(c => c.lessons) ?? [];
  const completedCount = trackProgress[currentTrack?.id ?? ""]?.completed ?? 0;
  const progressPct = allCurrentLessons.length > 0
    ? Math.round((completedCount / allCurrentLessons.length) * 100)
    : 0;
  const nextLesson = allCurrentLessons[completedCount];

  const inProgress = learningPaths.filter(t => trackProgress[t.id]?.status === "in_progress");
  const completed  = learningPaths.filter(t => trackProgress[t.id]?.status === "completed");
  const notStarted = learningPaths.filter(
    t => !trackProgress[t.id] || trackProgress[t.id]?.status === "not_started"
  );

  const isNewUser = state.totalXP === 0 && state.completedLessons.length === 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">

        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track your progress, manage your learning, and evolve your infrastructure thinking.
          </p>
        </div>

        {/* Contextual banners */}
        <DoubleXPBanner />
        <StreakRiskBanner />

        {/* ── Welcome card for brand-new users ── */}
        {isNewUser && (
          <div className="glass-panel rounded-xl p-6 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-1">Welcome to Infracodebase University</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl">
                  Start your first lesson to earn XP, build your streak, and track your progress
                  as an infrastructure engineer.
                </p>
                <Link to="/curriculum">
                  <Button size="sm" className="gap-1.5 text-xs">
                    <BookOpen className="h-3.5 w-3.5" /> Browse curriculum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── Row 1: Level · XP · Tracks · Overall ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Level card — from GamificationWidgets */}
          <LevelCard />

          {/* Total XP */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Total XP
            </span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <Zap className="h-4 w-4 text-primary shrink-0" />
              <p className="text-lg font-mono font-bold text-foreground">
                {state.totalXP.toLocaleString()}
              </p>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {xpToNext > 0 ? `${xpToNext} XP to Level ${levelIdx + 2}` : "Max level reached"}
            </p>
          </div>

          {/* Tracks */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Tracks
            </span>
            <div className="mt-2">
              <p className="text-lg font-mono font-bold text-foreground">
                {tracksCompleted} / {totalTracks}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">completed</p>
            </div>
          </div>

          {/* Overall progress ring */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Overall
            </span>
            <div className="mt-2 flex items-center gap-3">
              <ProgressRing value={overallProgress} max={100} size={48} strokeWidth={5}>
                <span className="text-xs font-mono font-bold">{overallProgress}%</span>
              </ProgressRing>
              <p className="text-[11px] text-muted-foreground">curriculum<br />progress</p>
            </div>
          </div>
        </div>

        {/* ── Row 2: Streak · Daily goal · Hearts · Streak Freeze ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StreakCard />
          <DailyGoalRing size={80} />
          <HeartsDisplay />
          <StreakFreezeCard />
        </div>

        {/* ── Current workspace ── */}
        {currentTrack ? (
          <div className="glass-panel rounded-xl p-6 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Current Workspace
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-primary font-mono mb-1">Track {currentTrack.order}</p>
                <h3 className="text-lg font-bold mb-1">{currentTrack.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 max-w-xl">
                  {currentTrack.description.substring(0, 140)}...
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <Progress value={progressPct} className="h-2 flex-1 max-w-[300px] bg-muted" />
                  <span className="text-xs font-mono text-muted-foreground">{progressPct}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Next:{" "}
                  <span className="text-foreground font-medium">
                    {nextLesson?.title ?? "All lessons complete"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to={
                    nextLesson
                      ? `/path/${currentTrack.id}/lesson/${nextLesson.id}`
                      : `/path/${currentTrack.id}`
                  }
                >
                  <Button size="sm" className="gap-1.5 text-xs">
                    <Play className="h-3 w-3" /> Resume
                  </Button>
                </Link>
                <Link to={`/path/${currentTrack.id}`}>
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    View Track <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : !isNewUser && (
          /* Show a nudge when user has some XP but no track in progress */
          <div className="glass-panel rounded-xl p-6 text-center">
            <p className="text-sm font-semibold mb-1">Ready for your next track?</p>
            <p className="text-xs text-muted-foreground mb-4">
              You have {state.totalXP.toLocaleString()} XP — pick up where you left off or start
              something new.
            </p>
            <Link to="/curriculum">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <BookOpen className="h-3.5 w-3.5" /> Browse curriculum
              </Button>
            </Link>
          </div>
        )}

        {/* ── Weekly XP Chart ── */}
        <div className="glass-panel rounded-xl p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            This Week's XP
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyXPData} barCategoryGap="20%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  width={35}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value} XP`, "Earned"]}
                />
                <Bar dataKey="xp" radius={[6, 6, 0, 0]}>
                  {weeklyXPData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.isToday ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.4)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Monthly XP chart + Milestones ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* XP Progression chart (monthly) */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              XP Progression
            </h2>
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-mono text-muted-foreground">{d.xp}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${Math.max((d.xp / maxMonthly) * 100, d.xp > 0 ? 4 : 2)}%`,
                      background: d.xp > 0
                        ? `linear-gradient(to top, ${crystalColors[i % crystalColors.length]}, ${crystalColors[(i + 1) % crystalColors.length]})`
                        : "hsl(var(--muted))",
                      opacity: d.xp > 0 ? 1 : 0.3,
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones — live from BADGES */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Milestones
            </h2>
            <div className="space-y-3">
              {BADGES.map((badge, i) => {
                const earned = earnedBadges.some(b => b.id === badge.id);
                return (
                  <div key={badge.id} className="flex items-center gap-3">
                    <CrystalIcon
                      color={earned ? crystalColors[i % crystalColors.length] : "hsl(228, 20%, 20%)"}
                      size={20}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {badge.name}
                      </p>
                      {badge.xp > 0 && (
                        <p className="text-[10px] text-muted-foreground">+{badge.xp} XP</p>
                      )}
                    </div>
                    {earned && <span className="text-[10px] text-[hsl(145,60%,45%)] shrink-0">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Skill Development ── */}
        <div className="glass-panel rounded-xl p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Skill Development
          </h2>
          <div className="grid lg:grid-cols-2 gap-x-8 gap-y-3">
            {skills.map((s, i) => (
              <SkillBar key={i} label={s.label} value={s.value} color={s.color} />
            ))}
          </div>
        </div>

        {/* ── Learning state sections ── */}
        <div className="space-y-6">

          {/* In Progress */}
          {inProgress.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  In Progress
                </h2>
              </div>
              <div className="grid gap-3">
                {inProgress.map(track => {
                  const tp = trackProgress[track.id];
                  const lessons = track.courses.flatMap(c => c.lessons);
                  const pct = Math.round(((tp?.completed ?? 0) / lessons.length) * 100);
                  return (
                    <Link
                      key={track.id}
                      to={`/path/${track.id}`}
                      className="glass-panel rounded-xl p-4 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-primary font-mono">Track {track.order}</p>
                          <h3 className="text-sm font-semibold">{track.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={pct} className="h-1.5 flex-1 max-w-[180px] bg-muted" />
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {tp?.completed}/{lessons.length}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Completed
                </h2>
              </div>
              <div className="grid gap-3">
                {completed.map(track => {
                  const lessons = track.courses.flatMap(c => c.lessons);
                  return (
                    <Link
                      key={track.id}
                      to={`/path/${track.id}`}
                      className="glass-panel rounded-xl p-4 opacity-80 hover:opacity-100 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground font-mono">
                            Track {track.order}
                          </p>
                          <h3 className="text-sm font-semibold text-muted-foreground">
                            {track.title}
                          </h3>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {lessons.length} lessons · Complete
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Not Started */}
          {notStarted.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Not Started
                </h2>
              </div>
              <div className="grid gap-3">
                {notStarted.map(track => {
                  const lessons = track.courses.flatMap(c => c.lessons);
                  return (
                    <Link
                      key={track.id}
                      to={`/path/${track.id}`}
                      className="glass-panel rounded-xl p-4 opacity-60 hover:opacity-90 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0 border border-dashed border-border/50">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground font-mono">
                            Track {track.order}
                          </p>
                          <h3 className="text-sm font-semibold text-muted-foreground">
                            {track.title}
                          </h3>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {lessons.length} lessons
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
