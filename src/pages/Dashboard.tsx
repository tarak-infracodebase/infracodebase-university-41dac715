import { AppLayout } from "@/components/AppLayout";
import { SkillBar, CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight, BookOpen, Play, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { BADGES } from "@/hooks/useGamification";
import {
  DailyGoalRing,
  StreakRiskBanner, DoubleXPBanner, StreakFreezeCard
} from "@/components/GamificationWidgets";

// ── constants ──────────────────────────────────────────────────────────────

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

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

// ── Dashboard ──────────────────────────────────────────────────────────────

const Dashboard = () => {
  const {
    state, activateDoubleXP, earnedBadges,
  } = useGamificationContext();

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

  const currentTrack = learningPaths.find(p => trackProgress[p.id]?.status === "in_progress");
  const allCurrentLessons = currentTrack?.courses.flatMap(c => c.lessons) ?? [];
  const completedCount = trackProgress[currentTrack?.id ?? ""]?.completed ?? 0;
  const progressPct = allCurrentLessons.length > 0
    ? Math.round((completedCount / allCurrentLessons.length) * 100)
    : 0;
  const nextLesson = allCurrentLessons[completedCount];

  const isNewUser = state.totalXP === 0 && state.completedLessons.length === 0;

  // ── Daily chart — last 14 days ────────────────────────────────────────────
  const dailyChartData = (() => {
    const days: { label: string; xp: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayNum = String(d.getDate());
      const entry = (state.dailyHistory ?? []).find(
        (h: { date: string; xp: number }) => h.date === dateStr
      );
      days.push({ label: dayNum, xp: entry?.xp ?? 0 });
    }
    return days;
  })();
  const maxDaily = Math.max(...dailyChartData.map(d => d.xp), 1);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">

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

        {/* ── Hero: goal + current track ── */}
        {currentTrack ? (
          <div
            className="glass-panel rounded-xl p-6 border-primary/10"
            style={{ background: "linear-gradient(160deg, hsl(var(--card)) 60%, hsl(var(--primary) / 0.06))" }}
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
              Your goal
            </p>

            {/* Top row: copy + % box */}
            <div className="flex items-start gap-6 mb-5 flex-wrap">
              <div className="flex-1 min-w-[240px]">
                <h2 className="text-xl font-semibold mb-2 leading-snug">
                  Learn to{" "}
                  <span className="text-primary">code</span>,{" "}
                  <span className="text-primary">design</span>,{" "}
                  <span className="text-primary">ship</span>, and{" "}
                  <span className="text-primary">operate</span>{" "}
                  cloud infrastructure.
                </h2>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">
                  Every track and hands-on exercise builds toward real skills you can apply
                  immediately — not just theory.
                </p>
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>{tracksCompleted} of {totalTracks} tracks completed</span>
                    <span className="font-mono">{overallProgress}% through the curriculum</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${overallProgress}%`,
                        background: "linear-gradient(to right, hsl(var(--primary)), hsl(185,70%,48%))"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* % box */}
              <div className="shrink-0 w-44 glass-panel rounded-xl p-4 text-center border-primary/20">
                <p className="text-3xl font-mono font-bold text-foreground">{overallProgress}%</p>
                <p className="text-xs text-muted-foreground mt-1">of full curriculum</p>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden my-3">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mb-3">
                  {tracksCompleted} of {totalTracks} tracks completed
                </p>
                <Link
                  to={nextLesson
                    ? `/path/${currentTrack.id}/lesson/${nextLesson.id}`
                    : `/path/${currentTrack.id}`}
                >
                  <Button size="sm" className="w-full text-xs gap-1">
                    Continue learning <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Current track card */}
            <div className="rounded-xl border border-border/40 bg-muted/20 p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-primary">
                    Track {currentTrack.order} of {totalTracks}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    · currently learning
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1">{currentTrack.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 max-w-xl leading-relaxed">
                  {currentTrack.description.substring(0, 160)}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1.5 flex-1 max-w-xs rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-primary"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {completedCount} of {allCurrentLessons.length} lessons
                  </span>
                </div>
                {nextLesson && (
                  <p className="text-xs text-muted-foreground">
                    Up next:{" "}
                    <span className="text-foreground font-medium">{nextLesson.title}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to={nextLesson
                    ? `/path/${currentTrack.id}/lesson/${nextLesson.id}`
                    : `/path/${currentTrack.id}`}
                >
                  <Button size="sm" className="gap-1.5 text-xs">
                    <Play className="h-3 w-3" /> Resume lesson
                  </Button>
                </Link>
                <Link to={`/path/${currentTrack.id}`}>
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    View track <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        ) : isNewUser ? (
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2 leading-snug">
              Learn to{" "}
              <span className="text-primary">code</span>,{" "}
              <span className="text-primary">design</span>,{" "}
              <span className="text-primary">ship</span>, and{" "}
              <span className="text-primary">operate</span>{" "}
              cloud infrastructure.
            </h2>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              Every track and hands-on exercise builds toward real infrastructure skills you can
              apply immediately. Start with the first track — no prior experience required.
            </p>
            <Link to="/curriculum">
              <Button size="sm" className="gap-1.5 text-xs">
                <BookOpen className="h-3.5 w-3.5" /> Start learning
              </Button>
            </Link>
          </div>

        ) : (
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2 leading-snug">
              Learn to{" "}
              <span className="text-primary">code</span>,{" "}
              <span className="text-primary">design</span>,{" "}
              <span className="text-primary">ship</span>, and{" "}
              <span className="text-primary">operate</span>{" "}
              cloud infrastructure.
            </h2>
            <div className="mb-4">
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>{tracksCompleted} of {totalTracks} tracks completed</span>
                <span className="font-mono">{overallProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${overallProgress}%`,
                    background: "linear-gradient(to right, hsl(var(--primary)), hsl(185,70%,48%))"
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {tracksCompleted > 0
                ? `You've completed ${tracksCompleted} track${tracksCompleted > 1 ? "s" : ""}. Pick up the next one to keep building.`
                : "Pick up where you left off or start something new."
              }
            </p>
            <Link to="/curriculum">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <BookOpen className="h-3.5 w-3.5" /> Browse curriculum
              </Button>
            </Link>
          </div>
        )}

        {/* ── Row 2: Your Activity · Daily Target · Day Off Pass ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Your Activity */}
          <div className="glass-panel rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Your activity
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">
              What you've completed so far.
            </p>
            <div className="space-y-2">
              {[
                {
                  icon: <BookOpen className="h-3.5 w-3.5 text-primary" />,
                  label: "Lessons completed",
                  value: state.completedLessons.length,
                },
                {
                  icon: <Play className="h-3.5 w-3.5 text-[hsl(145,60%,45%)]" />,
                  label: "Videos watched",
                  value: state.watchedVideos.length,
                },
                {
                  icon: <Zap className="h-3.5 w-3.5 text-[hsl(45,85%,55%)]" />,
                  label: "Hands-on exercises",
                  value: state.completedLessons.filter(
                    (id: string) => id.startsWith("hands-on")
                  ).length,
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="flex items-center gap-2">
                    {row.icon}
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Target */}
          <DailyGoalRing size={80} />

          {/* Day Off Pass */}
          <StreakFreezeCard />

        </div>

        {/* ── Row 3: Knowledge Checks · Daily Chart · Milestones ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Knowledge Checks */}
          <div
            className="rounded-xl p-5"
            style={{
              background: "linear-gradient(135deg, hsl(160,60%,8%), hsl(160,55%,16%) 55%, hsl(165,50%,22%))"
            }}
          >
            <p
              className="text-[10px] uppercase tracking-widest font-medium mb-1"
              style={{ color: "hsl(160,60%,65%)" }}
            >
              Knowledge checks
            </p>
            <p
              className="text-[11px] mb-5 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Test yourself as you learn. Getting it right on the first try shows you've
              understood the concept — not just read it.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  val: state.completedLessons.length > 0
                    ? state.perfectChecks +
                      Math.max(0, state.completedLessons.length - state.perfectChecks)
                    : 0,
                  label: "Attempted",
                  color: "#fff",
                },
                { val: state.perfectChecks, label: "First try", color: "hsl(160,60%,65%)" },
                {
                  val: state.completedLessons.length > 0
                    ? `${Math.round((state.perfectChecks / state.completedLessons.length) * 100)}%`
                    : "—",
                  label: "Accuracy",
                  color: "#fff",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="text-center rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-xl font-semibold font-mono" style={{ color: s.color }}>
                    {s.val}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning points over time — daily */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Learning points over time
            </h2>
            <p className="text-[11px] text-muted-foreground mb-4">
              Points earned each day — last 14 days.
            </p>
            <div className="flex items-end gap-1.5 h-32">
              {dailyChartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span
                    className="text-[9px] font-mono text-muted-foreground"
                    style={{ minHeight: "12px" }}
                  >
                    {d.xp > 0 ? d.xp : ""}
                  </span>
                  <div
                    className="w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${Math.max((d.xp / maxDaily) * 100, d.xp > 0 ? 5 : 2)}%`,
                      background: d.xp > 0
                        ? `linear-gradient(to top, ${crystalColors[i % crystalColors.length]}, ${crystalColors[(i + 1) % crystalColors.length]})`
                        : "hsl(var(--muted))",
                      opacity: d.xp > 0 ? 1 : 0.25,
                      minHeight: "3px",
                    }}
                  />
                  {i % 3 === 0 && (
                    <span className="text-[9px] text-muted-foreground">{d.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Milestones
            </h2>
            <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">
              Earned by learning consistently.
            </p>
            <div className="space-y-3">
              {BADGES.map((badge, i) => {
                const earned = earnedBadges.some(b => b.id === badge.id);
                return (
                  <div
                    key={badge.id}
                    className={cn("flex items-center gap-3", !earned && "opacity-35")}
                  >
                    <CrystalIcon
                      color={earned
                        ? crystalColors[i % crystalColors.length]
                        : "hsl(228, 20%, 20%)"}
                      size={18}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{badge.name}</p>
                      <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                    </div>
                    {badge.xp > 0 && (
                      <span className={cn(
                        "text-[11px] font-mono shrink-0",
                        earned ? "text-[hsl(145,60%,45%)]" : "text-muted-foreground"
                      )}>
                        +{badge.xp}
                      </span>
                    )}
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

      </div>
    </AppLayout>
  );
};

export default Dashboard;
