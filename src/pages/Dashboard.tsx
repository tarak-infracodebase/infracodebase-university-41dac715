import { AppLayout } from "@/components/AppLayout";
import { SkillBar, CrystalIcon } from "@/components/DashboardWidgets";
import { learningPaths } from "@/data/courseData";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, Play, ChevronRight,
  Zap, Target, Layers, Shield
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { BADGES } from "@/hooks/useGamification";
import {
  DailyGoalRing, StreakFreezeCard,
  StreakRiskBanner, DoubleXPBanner,
} from "@/components/GamificationWidgets";

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

const Dashboard = () => {
  const {
    state, levelIdx, levelName, xpToNext,
    activateDoubleXP, earnedBadges,
  } = useGamificationContext();

  useEffect(() => {
    if (!state.lastActiveDate || state.doubleXP) return;
    const diffDays = Math.floor(
      (Date.now() - new Date(state.lastActiveDate).getTime()) / 86_400_000
    );
    if (diffDays >= 2) activateDoubleXP();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived track progress ────────────────────────────────────────────
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

  const inProgress = learningPaths.filter(t => trackProgress[t.id]?.status === "in_progress");
  const completed  = learningPaths.filter(t => trackProgress[t.id]?.status === "completed");
  const notStarted = learningPaths.filter(
    t => !trackProgress[t.id] || trackProgress[t.id]?.status === "not_started"
  );

  const isNewUser = state.totalXP === 0 && state.completedLessons.length === 0;

  // ── Daily chart data (last 14 days) ───────────────────────────────────
  const dailyChartData = (() => {
    const days: { label: string; xp: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }).replace(",", "");
      const entry = (state.dailyHistory ?? []).find(h => h.date === dateStr);
      days.push({ label, xp: entry?.xp ?? 0 });
    }
    return days;
  })();
  const maxDaily = Math.max(...dailyChartData.map(d => d.xp), 1);

  // ── Render ────────────────────────────────────────────────────────────
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

        {/* ── Hero card ── */}
        <div
          className="glass-panel rounded-xl p-6"
          style={{ background: "linear-gradient(160deg, hsl(var(--card)) 60%, hsl(var(--primary) / 0.06))" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Your goal</span>

          {currentTrack ? (
            <>
              <div className="flex flex-col lg:flex-row gap-6 mt-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold leading-snug mb-2">
                    Learn to <span className="text-primary">code</span>, <span className="text-primary">design</span>, <span className="text-primary">ship</span>, and <span className="text-primary">operate</span> cloud infrastructure.
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">
                    Every track and hands-on exercise builds toward real skills you can apply immediately — not just theory.
                  </p>
                  {/* Curriculum progress bar */}
                  <div>
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-1">
                      <span>{tracksCompleted} of {totalTracks} tracks completed</span>
                      <span>{overallProgress}% through the curriculum</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${overallProgress}%`,
                          background: "linear-gradient(to right, hsl(var(--primary)), hsl(185, 70%, 48%))",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right — compact stats */}
                <div className="w-44 shrink-0 rounded-xl border border-border bg-muted/30 p-4 flex flex-col items-center text-center gap-2">
                  <p className="text-3xl font-mono font-bold text-foreground">{overallProgress}%</p>
                  <p className="text-[11px] text-muted-foreground">of full curriculum</p>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${overallProgress}%`, background: "hsl(var(--primary))" }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{tracksCompleted} of {totalTracks} tracks completed</p>
                  <Link
                    to={nextLesson ? `/path/${currentTrack.id}/lesson/${nextLesson.id}` : `/path/${currentTrack.id}`}
                    className="mt-1"
                  >
                    <Button size="sm" variant="outline" className="text-xs gap-1">
                      Continue learning <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Current track inner card */}
              <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-primary">Track {currentTrack.order} of {totalTracks}</span>
                  <span className="text-[10px] text-muted-foreground">· currently learning</span>
                </div>
                <h3 className="text-sm font-bold mb-1">{currentTrack.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 max-w-xl">
                  {currentTrack.description.substring(0, 160)}...
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <Progress value={progressPct} className="h-1.5 flex-1 max-w-[300px] bg-muted" />
                  <span className="text-[10px] font-mono text-muted-foreground">{completedCount} of {allCurrentLessons.length} lessons</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Up next: <span className="text-foreground font-medium">{nextLesson?.title ?? "All lessons complete"}</span>
                </p>
                <div className="flex items-center gap-3">
                  <Link to={nextLesson ? `/path/${currentTrack.id}/lesson/${nextLesson.id}` : `/path/${currentTrack.id}`}>
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
            </>
          ) : isNewUser ? (
            <div className="mt-4">
              <h2 className="text-xl font-bold leading-snug mb-2">
                Learn to <span className="text-primary">code</span>, <span className="text-primary">design</span>, <span className="text-primary">ship</span>, and <span className="text-primary">operate</span> cloud infrastructure.
              </h2>
              <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">
                Every track and hands-on exercise builds toward real skills you can apply immediately — not just theory.
              </p>
              <Link to="/curriculum">
                <Button size="sm" className="gap-1.5 text-xs">
                  <BookOpen className="h-3.5 w-3.5" /> Start learning
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-xl font-bold leading-snug mb-2">
                Learn to <span className="text-primary">code</span>, <span className="text-primary">design</span>, <span className="text-primary">ship</span>, and <span className="text-primary">operate</span> cloud infrastructure.
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-1">
                  <span>{tracksCompleted} of {totalTracks} tracks completed</span>
                  <span>{overallProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${overallProgress}%`, background: "linear-gradient(to right, hsl(var(--primary)), hsl(185, 70%, 48%))" }} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tracksCompleted} tracks completed. Pick up the next one.
              </p>
              <Link to="/curriculum">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <BookOpen className="h-3.5 w-3.5" /> Browse curriculum
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ── Row 2: Activity · Daily Goal · Streak Freeze ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Your activity */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Your activity</span>
            <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">What you've completed so far.</p>
            <div className="space-y-2">
              {[
                { icon: <BookOpen className="h-3.5 w-3.5 text-primary" />, label: "Lessons completed", value: state.completedLessons.length },
                { icon: <Play className="h-3.5 w-3.5 text-[hsl(145,60%,45%)]" />, label: "Videos watched", value: state.watchedVideos.length },
                { icon: <Zap className="h-3.5 w-3.5 text-[hsl(45,85%,55%)]" />, label: "Hands-on exercises", value: state.completedLessons.filter(id => id.startsWith("hands-on")).length },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center gap-2">
                    {row.icon}
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                  </div>
                  <span className="text-sm font-mono font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <DailyGoalRing size={80} />
          <StreakFreezeCard />
        </div>

        {/* ── Row 3: Knowledge checks · Daily chart · Milestones ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Knowledge checks */}
          <div className="rounded-xl p-5 border border-border/30" style={{ background: "linear-gradient(135deg, hsl(160,60%,8%), hsl(160,55%,16%) 55%, hsl(165,50%,22%))" }}>
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "hsl(145,60%,65%)" }}>Knowledge checks</span>
            <p className="text-[11px] mt-0.5 mb-4 leading-relaxed" style={{ color: "hsl(160,20%,60%)" }}>
              Test yourself as you learn. Getting it right on the first try shows you've understood the concept — not just read it.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(() => {
                const attempted = state.perfectChecks + Math.floor(state.completedLessons.length * 0.3);
                const firstTry = state.perfectChecks;
                const accuracy = attempted > 0 ? Math.round((firstTry / attempted) * 100) : 0;
                return [
                  { val: attempted, label: "Attempted" },
                  { val: firstTry, label: "First try" },
                  { val: attempted > 0 ? `${accuracy}%` : "—", label: "Accuracy" },
                ].map((s, i) => (
                  <div key={i} className="rounded-lg p-2.5 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-lg font-mono font-bold text-white">{s.val}</p>
                    <p className="text-[9px] uppercase tracking-wider" style={{ color: "hsl(160,20%,50%)" }}>{s.label}</p>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Learning points over time */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Learning points over time</span>
            <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">Points earned each day — last 14 days.</p>
            <div className="flex items-end gap-1 h-32">
              {dailyChartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  {d.xp > 0 && <span className="text-[8px] font-mono text-muted-foreground">{d.xp}</span>}
                  <div
                    className="w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${Math.max((d.xp / maxDaily) * 100, d.xp > 0 ? 4 : 2)}%`,
                      background: d.xp > 0
                        ? `linear-gradient(to top, ${crystalColors[i % crystalColors.length]}, ${crystalColors[(i + 1) % crystalColors.length]})`
                        : "hsl(var(--muted))",
                      opacity: d.xp > 0 ? 1 : 0.25,
                    }}
                  />
                  {i % 2 === 0 && <span className="text-[8px] text-muted-foreground whitespace-nowrap">{d.label}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="glass-panel rounded-xl p-5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Milestones</span>
            <p className="text-[11px] text-muted-foreground mt-0.5 mb-4">Earned by learning consistently.</p>
            <div className="space-y-3">
              {BADGES.map((badge, i) => {
                const earned = earnedBadges.some(b => b.id === badge.id);
                return (
                  <div key={badge.id} className="flex items-center gap-3" style={{ opacity: earned ? 1 : 0.35 }}>
                    <CrystalIcon
                      color={earned ? crystalColors[i % crystalColors.length] : "hsl(228, 20%, 20%)"}
                      size={20}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                        {badge.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                    </div>
                    {badge.xp > 0 && (
                      <span className={`text-[10px] font-mono shrink-0 ${earned ? "text-[hsl(145,60%,45%)]" : "text-muted-foreground"}`}>
                        +{badge.xp} pts
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

        {/* ── Learning state sections ── */}
        <div className="space-y-6">
          {inProgress.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">In Progress</h2>
              </div>
              <div className="grid gap-3">
                {inProgress.map(track => {
                  const tp = trackProgress[track.id];
                  const lessons = track.courses.flatMap(c => c.lessons);
                  const pct = Math.round(((tp?.completed ?? 0) / lessons.length) * 100);
                  return (
                    <Link key={track.id} to={`/path/${track.id}`} className="glass-panel rounded-xl p-4 hover:border-primary/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-primary font-mono">Track {track.order}</p>
                          <h3 className="text-sm font-semibold">{track.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={pct} className="h-1.5 flex-1 max-w-[180px] bg-muted" />
                            <span className="text-[10px] font-mono text-muted-foreground">{tp?.completed}/{lessons.length}</span>
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

          {completed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Completed</h2>
              </div>
              <div className="grid gap-3">
                {completed.map(track => {
                  const lessons = track.courses.flatMap(c => c.lessons);
                  return (
                    <Link key={track.id} to={`/path/${track.id}`} className="glass-panel rounded-xl p-4 opacity-80 hover:opacity-100 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground font-mono">Track {track.order}</p>
                          <h3 className="text-sm font-semibold text-muted-foreground">{track.title}</h3>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{lessons.length} lessons · Complete</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {notStarted.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Not Started</h2>
              </div>
              <div className="grid gap-3">
                {notStarted.map(track => {
                  const lessons = track.courses.flatMap(c => c.lessons);
                  return (
                    <Link key={track.id} to={`/path/${track.id}`} className="glass-panel rounded-xl p-4 opacity-60 hover:opacity-90 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted/30 flex items-center justify-center shrink-0 border border-dashed border-border/50">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground font-mono">Track {track.order}</p>
                          <h3 className="text-sm font-semibold text-muted-foreground">{track.title}</h3>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{lessons.length} lessons</p>
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
