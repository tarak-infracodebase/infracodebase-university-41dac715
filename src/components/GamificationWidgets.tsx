import { useGamificationContext } from "@/hooks/GamificationProvider";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { LEVELS, BADGES } from "@/hooks/useGamification";
import { Flame, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const crystalColors = [
  "hsl(260, 70%, 58%)", "hsl(330, 65%, 55%)", "hsl(185, 70%, 48%)",
  "hsl(145, 60%, 45%)", "hsl(45, 85%, 55%)", "hsl(25, 85%, 55%)", "hsl(0, 72%, 55%)"
];

// ── LevelCard ──────────────────────────────────────────────────────────────
export function LevelCard() {
  const { state, levelIdx, levelName, xpToNext } = useGamificationContext();
  const isMax = levelIdx >= LEVELS.length - 1;
  const currentLevel = LEVELS[levelIdx];
  const nextLevel = LEVELS[Math.min(levelIdx + 1, LEVELS.length - 1)];
  const xpIntoLevel = state.totalXP - currentLevel.minXP;
  const xpForLevel = isMax ? 1 : nextLevel.minXP - currentLevel.minXP;
  const pct = isMax ? 100 : Math.min(Math.round((xpIntoLevel / xpForLevel) * 100), 100);

  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Level</span>
      <div className="mt-2 flex items-center gap-2">
        <CrystalIcon color={crystalColors[levelIdx % crystalColors.length]} size={20} />
        <p className="text-base font-bold text-foreground">{levelName}</p>
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">Level {levelIdx + 1}</p>
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-1">
          <span>{state.totalXP.toLocaleString()} XP</span>
          {!isMax && <span>{xpToNext} to next</span>}
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(to right, ${crystalColors[levelIdx % crystalColors.length]}, ${crystalColors[(levelIdx + 1) % crystalColors.length]})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── TotalXPCard ────────────────────────────────────────────────────────────
export function TotalXPCard() {
  const { state, levelIdx, levelName, xpToNext } = useGamificationContext();
  const isMax = levelIdx >= LEVELS.length - 1;
  return (
    <div className="glass-panel rounded-xl p-5 text-center">
      <p className="text-3xl font-mono font-bold text-foreground">{state.totalXP.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground mt-1">Total XP</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <CrystalIcon color={crystalColors[levelIdx % crystalColors.length]} size={18} />
        <div className="text-left">
          <p className="text-sm font-medium leading-none">{levelName}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Level {levelIdx + 1}</p>
        </div>
      </div>
      {!isMax && (
        <p className="text-[10px] text-muted-foreground mt-2">{xpToNext} XP to Level {levelIdx + 2}</p>
      )}
    </div>
  );
}

// ── StreakCard ─────────────────────────────────────────────────────────────
export function StreakCard() {
  const { state, todayDone } = useGamificationContext();
  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Streak</span>
      <div className="mt-2 flex items-center gap-2">
        <Flame className={cn("h-5 w-5", state.streak > 0 ? "text-crystal-orange" : "text-muted-foreground")} />
        <p className="text-2xl font-mono font-bold text-foreground">{state.streak}</p>
        <span className="text-xs text-muted-foreground">days</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">
        {todayDone ? "✓ Today's goal complete" : "Keep going today!"}
      </p>
    </div>
  );
}

// ── DailyGoalRing ──────────────────────────────────────────────────────────
export function DailyGoalRing({ size = 80 }: { size?: number }) {
  const { state, todayDone } = useGamificationContext();
  const pct = Math.min((state.dailyXP / state.dailyGoal) * 100, 100);
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium self-start">Daily Goal</span>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={todayDone ? "hsl(var(--crystal-green))" : "hsl(var(--primary))"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-mono font-bold">{state.dailyXP}</span>
          <span className="text-[9px] text-muted-foreground">/{state.dailyGoal}</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground">
        {todayDone ? "Goal reached!" : `${Math.max(0, state.dailyGoal - state.dailyXP)} XP to go`}
      </p>
    </div>
  );
}

// ── HeartsDisplay ──────────────────────────────────────────────────────────
export function HeartsDisplay() {
  const { state } = useGamificationContext();
  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Lives</span>
      <div className="mt-2 flex items-center gap-1.5">
        {Array.from({ length: state.maxHearts }).map((_, i) => (
          <Heart
            key={i}
            className={cn("h-5 w-5 transition-colors", i < state.hearts ? "text-red-400" : "text-muted-foreground/30")}
            fill={i < state.hearts ? "currentColor" : "none"}
          />
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        {state.hearts === 0 ? "No lives — complete a lesson to restore" : `${state.hearts} of ${state.maxHearts} remaining`}
      </p>
    </div>
  );
}

// ── StreakRiskBanner ───────────────────────────────────────────────────────
export function StreakRiskBanner() {
  const { state, todayDone } = useGamificationContext();
  if (state.streak < 2 || todayDone) return null;
  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 flex items-center gap-3">
      <Flame className="h-4 w-4 text-orange-400 shrink-0" />
      <p className="text-xs text-foreground">
        Your <span className="font-semibold text-orange-400">{state.streak}-day streak</span> is at risk — complete any lesson today to keep it alive.
      </p>
    </div>
  );
}

// ── DoubleXPBanner ─────────────────────────────────────────────────────────
export function DoubleXPBanner() {
  const { state } = useGamificationContext();
  if (!state.doubleXP) return null;
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center gap-3">
      <Zap className="h-4 w-4 text-primary shrink-0" />
      <p className="text-xs text-foreground">
        <span className="font-semibold text-primary">Double XP active</span> — welcome back! All XP earned is doubled for 24 hours.
      </p>
    </div>
  );
}

// ── BadgesGrid ─────────────────────────────────────────────────────────────
export function BadgesGrid({ compact = false }: { compact?: boolean }) {
  const { earnedBadges } = useGamificationContext();

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {earnedBadges.slice(0, 8).map((badge, i) => (
          <span key={badge.id} title={badge.name}>
            <CrystalIcon color={crystalColors[i % crystalColors.length]} size={24} />
          </span>
        ))}
        {earnedBadges.length === 0 && (
          <p className="text-xs text-muted-foreground">Complete lessons to earn badges.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {[...BADGES].map((badge, i) => {
        const earned = earnedBadges.some(b => b.id === badge.id);
        return (
          <div
            key={badge.id}
            className={cn("glass-panel rounded-xl p-4 flex items-start gap-3 transition-all", !earned && "opacity-40 grayscale")}
          >
            <div className="shrink-0 mt-0.5">
              <CrystalIcon color={earned ? crystalColors[i % crystalColors.length] : "hsl(228,20%,30%)"} size={20} />
            </div>
            <div>
              <p className={cn("text-xs font-semibold", earned ? "text-foreground" : "text-muted-foreground")}>
                {badge.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{badge.desc}</p>
              {badge.xp > 0 && (
                <p className="text-[10px] font-mono text-crystal-yellow mt-1">+{badge.xp} XP</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── XPStatsCard ────────────────────────────────────────────────────────────
export function XPStatsCard() {
  const { state } = useGamificationContext();
  const stats = [
    {
      label: "Lessons completed",
      value: state.completedLessons.length > 0
        ? state.completedLessons.length.toString()
        : "—",
    },
    {
      label: "Videos watched",
      value: state.watchedVideos.length > 0
        ? state.watchedVideos.length.toString()
        : "—",
    },
    {
      label: "Current streak",
      value: state.streak > 0 ? `${state.streak} days` : "—",
    },
    {
      label: "Badges earned",
      value: state.earnedBadgeIds.length > 0
        ? state.earnedBadgeIds.length.toString()
        : "—",
    },
  ];
  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{s.label}</span>
          <span className="text-sm font-mono font-semibold">{s.value}</span>
        </div>
      ))}
    </div>
  );
}