import { useGamificationContext } from "@/hooks/GamificationProvider";
import { ProgressRing } from "@/components/DashboardWidgets";
import { Flame, Heart, Zap, AlertTriangle, Shield } from "lucide-react";
import { STREAK_FREEZE_COST } from "@/hooks/useGamification";
import { Button } from "@/components/ui/button";

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

// ── StreakRiskBanner (with freeze option) ────────────────────────────────────

export function StreakRiskBanner() {
  const { streakAtRisk, state, buyStreakFreeze } = useGamificationContext();

  if (state.streakFreezeActive) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex items-center gap-3">
        <Shield className="h-5 w-5 text-primary shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Streak Freeze Active</p>
          <p className="text-xs text-muted-foreground">
            Your streak was protected today. Complete a lesson to keep it going!
          </p>
        </div>
      </div>
    );
  }

  if (!streakAtRisk) return null;

  const canAfford = state.totalXP >= STREAK_FREEZE_COST;

  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">
          Your {state.currentStreak}-day streak is at risk!
        </p>
        <p className="text-xs text-muted-foreground">
          Complete a lesson today to keep your streak alive, or use a streak freeze.
        </p>
      </div>
      {state.streakFreezeCount > 0 ? (
        <div className="text-center shrink-0">
          <p className="text-[10px] text-muted-foreground mb-1">{state.streakFreezeCount} freeze{state.streakFreezeCount !== 1 ? "s" : ""}</p>
          <Shield className="h-5 w-5 text-primary mx-auto" />
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="shrink-0 text-xs gap-1.5"
          disabled={!canAfford}
          onClick={buyStreakFreeze}
          title={canAfford ? `Buy for ${STREAK_FREEZE_COST} XP` : `Need ${STREAK_FREEZE_COST} XP`}
        >
          <Shield className="h-3.5 w-3.5" />
          {STREAK_FREEZE_COST} XP
        </Button>
      )}
    </div>
  );
}

// ── StreakFreezeCard ─────────────────────────────────────────────────────────

export function StreakFreezeCard() {
  const { state, buyStreakFreeze } = useGamificationContext();
  const canAfford = state.totalXP >= STREAK_FREEZE_COST;

  return (
    <div className="glass-panel rounded-xl p-5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
        Streak Freeze
      </span>
      <div className="mt-2 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary shrink-0" />
        <p className="text-lg font-mono font-bold text-foreground">{state.streakFreezeCount}</p>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1 mb-2">
        Protects your streak for 1 missed day
      </p>
      <Button
        size="sm"
        variant="outline"
        className="w-full text-xs gap-1"
        disabled={!canAfford}
        onClick={buyStreakFreeze}
      >
        <Zap className="h-3 w-3" /> Buy for {STREAK_FREEZE_COST} XP
      </Button>
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
