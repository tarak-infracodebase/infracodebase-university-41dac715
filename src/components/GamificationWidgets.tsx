import { useGamificationContext } from "@/hooks/GamificationProvider";
import { ProgressRing } from "@/components/DashboardWidgets";
import { Flame, Heart, Zap, AlertTriangle } from "lucide-react";

// ── LevelCard ───────────────────────────────────────────────────────────────

export function LevelCard() {
  const { levelIdx, levelName } = useGamificationContext();
  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        Identity
      </span>
      <div className="mt-2">
        <p className="text-lg font-bold text-foreground">{levelName}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Level {levelIdx + 1}</p>
      </div>
    </div>
  );
}

// ── StreakCard ───────────────────────────────────────────────────────────────

export function StreakCard() {
  const { state } = useGamificationContext();
  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        Streak
      </span>
      <div className="mt-2 flex items-baseline gap-1.5">
        <Flame className="h-4 w-4 text-orange-500 shrink-0" />
        <p className="text-lg font-mono font-bold text-foreground">{state.currentStreak}</p>
      </div>
      <p className="text-[11px] text-muted-foreground mt-0.5">
        {state.currentStreak === 1 ? "day" : "days"} · best {state.longestStreak}
      </p>
    </div>
  );
}

// ── DailyGoalRing ───────────────────────────────────────────────────────────

export function DailyGoalRing({ size = 80 }: { size?: number }) {
  const { state } = useGamificationContext();
  const pct = state.dailyGoal > 0
    ? Math.min(100, Math.round((state.dailyXPEarned / state.dailyGoal) * 100))
    : 0;
  const isComplete = pct >= 100;

  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        Daily Goal
      </span>
      <div className="mt-2 flex items-center gap-3">
        <ProgressRing value={state.dailyXPEarned} max={state.dailyGoal} size={size} strokeWidth={5}>
          <Zap className={`h-4 w-4 ${isComplete ? "text-primary" : "text-muted-foreground"}`} />
        </ProgressRing>
        <div>
          <p className="text-sm font-mono font-bold text-foreground">{state.dailyXPEarned}</p>
          <p className="text-[10px] text-muted-foreground">/ {state.dailyGoal} XP</p>
          {isComplete && (
            <p className="text-[10px] text-primary font-medium mt-0.5">Complete!</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── HeartsDisplay ───────────────────────────────────────────────────────────

export function HeartsDisplay() {
  const { state } = useGamificationContext();
  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        Hearts
      </span>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Heart
            key={i}
            className={`h-5 w-5 transition-colors ${
              i < state.hearts
                ? "text-red-500 fill-red-500"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">
        {state.hearts === 0 ? "No hearts left — review to restore" : `${state.hearts}/5 remaining`}
      </p>
    </div>
  );
}

// ── StreakRiskBanner ─────────────────────────────────────────────────────────

export function StreakRiskBanner() {
  const { streakAtRisk, state } = useGamificationContext();
  if (!streakAtRisk) return null;

  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-foreground">
          Your {state.currentStreak}-day streak is at risk!
        </p>
        <p className="text-xs text-muted-foreground">
          Complete a lesson today to keep your streak alive.
        </p>
      </div>
    </div>
  );
}

// ── DoubleXPBanner ──────────────────────────────────────────────────────────

export function DoubleXPBanner() {
  const { state } = useGamificationContext();
  if (!state.doubleXP) return null;
  if (state.doubleXPExpiry && new Date(state.doubleXPExpiry) < new Date()) return null;

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex items-center gap-3">
      <Zap className="h-5 w-5 text-primary shrink-0" />
      <div>
        <p className="text-sm font-semibold text-foreground">Double XP Active!</p>
        <p className="text-xs text-muted-foreground">
          Welcome back — all XP earnings are doubled for the next hour.
        </p>
      </div>
    </div>
  );
}
