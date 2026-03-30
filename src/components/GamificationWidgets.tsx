import React from "react";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { CrystalIcon } from "@/components/DashboardWidgets";
import { LEVELS, BADGES } from "@/hooks/useGamification";
import { Flame, Heart, Zap, Check, X, ArrowRight } from "lucide-react";
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

// ── TotalXPCard — replaces Profile's hardcoded "2,450 XP · Level 7" ───────
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

// ── ShareModal ─────────────────────────────────────────────────────────────
// Full-screen modal: explains streak freeze concept + referral share mechanic.
// Opened from StreakRiskBanner and StreakFreezeCard.
export function ShareModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, earnFreezeBySharing, canShareForFreeze } = useGamificationContext();
  const [step, setStep] = React.useState<"share" | "done">("share");
  const [copied, setCopied] = React.useState(false);
  const [selectedChannel, setSelectedChannel] = React.useState<string | null>(null);

  // Referral link uses the user's handle stored in Clerk via profileData
  // Falls back to a generic URL — the real handle is injected at runtime
  const referralLink = `university.infracodebase.com?ref=${
    (window as any).__ICBU_HANDLE__ || "you"
  }`;

  React.useEffect(() => {
    if (open) setStep("share");
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`https://${referralLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    earnFreezeBySharing();
    setStep("done");
  };

  if (!open) return null;

  const CHANNELS = [
    {
      id: "linkedin", label: "LinkedIn",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0077b5" strokeWidth="1.8" strokeLinecap="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      bg: "bg-[rgba(0,119,181,0.12)]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=https://${referralLink}`,
    },
    {
      id: "twitter", label: "X / Twitter",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" strokeWidth="1.8" strokeLinecap="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
      bg: "bg-[rgba(29,161,242,0.1)]",
      href: `https://twitter.com/intent/tweet?text=Learning%20cloud%20%26%20DevOps%20on%20Infracodebase%20University%20%E2%80%94%20join%20me%3A%20https://${referralLink}`,
    },
    {
      id: "whatsapp", label: "WhatsApp",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="1.8" strokeLinecap="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      ),
      bg: "bg-[rgba(37,211,102,0.1)]",
      href: `https://wa.me/?text=Learning%20cloud%20%26%20DevOps%20on%20Infracodebase%20University%20%E2%80%94%20join%20me%3A%20https://${referralLink}`,
    },
    {
      id: "email", label: "Email",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      bg: "bg-muted/20",
      href: `mailto:?subject=Join%20me%20on%20Infracodebase%20University&body=I%27m%20learning%20cloud%20infrastructure%20and%20DevOps%20on%20Infracodebase%20University%20%E2%80%94%20join%20me%3A%20https://${referralLink}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="relative w-full max-w-md rounded-[20px] p-[2px]"
        style={{ background: "linear-gradient(135deg,hsl(260,70%,55%),hsl(185,70%,45%),hsl(330,65%,50%))" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 h-7 w-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>

        <div className="bg-[#0c0f13] rounded-[18px] overflow-hidden max-h-[90vh] overflow-y-auto">
          {step === "share" ? (
            <div className="p-6">
              {/* Eyebrow + headline */}
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 mb-3">
                Infracodebase University · {new Date().getFullYear()}
              </p>
              <h2 className="text-2xl font-medium text-white/90 leading-snug mb-2">
                Earn a{" "}
                <span className="text-[hsl(260,70%,70%)]">streak freeze</span>
                <br />for every{" "}
                <span className="text-[hsl(185,65%,55%)]">referral.</span>
              </h2>
              <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                Share your link — when a colleague joins and completes their first lesson,
                you earn a streak freeze that automatically protects your progress if you miss a day.
              </p>

              <div className="h-px bg-white/8 mb-5" />

              {/* What is a streak freeze */}
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">
                What is a streak freeze?
              </p>
              <div className="rounded-xl border border-[rgba(124,92,230,0.2)] bg-[rgba(124,92,230,0.08)] p-4 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[34px] w-[34px] rounded-[9px] border border-[rgba(124,92,230,0.25)] bg-[rgba(124,92,230,0.15)] flex items-center justify-center shrink-0">
                    <Flame className="h-4 w-4 text-[hsl(260,70%,68%)]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/90">Streak freeze</p>
                    <p className="text-[11px] text-white/40 mt-0.5">A shield for your learning streak</p>
                  </div>
                </div>

                {/* 7-day visual */}
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => {
                    const isDone    = i < 3 || i === 4;
                    const isFrozen  = i === 3;
                    const isToday   = i === 5;
                    const isFuture  = i === 6;
                    return (
                      <div key={day} className="flex flex-col items-center gap-1">
                        <div className={cn(
                          "h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-medium",
                          isDone    && !isFrozen && "bg-[hsl(260,70%,55%)] text-white",
                          isFrozen  && "border border-dashed border-[hsl(260,70%,55%)] bg-[rgba(124,92,230,0.15)] text-[hsl(260,70%,70%)]",
                          isToday   && "border border-orange-400 bg-orange-400/15 text-orange-400",
                          isFuture  && "bg-white/5 border border-white/10 text-white/20",
                        )}>
                          {isDone && !isFrozen && <Check className="h-2.5 w-2.5" />}
                          {isFrozen  && <Flame className="h-2.5 w-2.5" />}
                          {isToday   && <Flame className="h-2.5 w-2.5" />}
                          {isFuture  && "?"}
                        </div>
                        <span className={cn(
                          "text-[9px]",
                          isFrozen ? "text-[hsl(260,70%,65%)]" : isToday ? "text-orange-400" : "text-white/30"
                        )}>{day}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 flex-wrap mb-4">
                  {[
                    { color: "bg-[hsl(260,70%,55%)]", label: "Lesson done" },
                    { color: "bg-[rgba(124,92,230,0.3)] border border-dashed border-[hsl(260,70%,55%)]", label: "Freeze used" },
                    { color: "bg-orange-400", label: "Streak active" },
                  ].map(l => (
                    <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-white/35">
                      <span className={cn("h-2 w-2 rounded-full", l.color)} />
                      {l.label}
                    </span>
                  ))}
                </div>
                <div className="h-px bg-white/7 mb-3" />
                <div className="space-y-2">
                  {[
                    <>If you miss a day, the freeze <strong className="text-white/80 font-medium">activates automatically</strong> — no action needed.</>,
                    <>It <strong className="text-white/80 font-medium">won't work two days in a row</strong> — covers one missed day per week.</>,
                    <>Earned by sharing — <strong className="text-white/80 font-medium">no XP cost, no purchase required.</strong></>,
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-[5px] h-1.5 w-1.5 rounded-full bg-[hsl(260,70%,65%)] shrink-0" />
                      <p className="text-[12px] text-white/55 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/8 mb-5" />

              {/* How it works */}
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">
                How it works
              </p>
              <div className="space-y-2.5 mb-5">
                {[
                  { bg: "bg-[rgba(230,90,50,0.12)]", stroke: "hsl(20,80%,60%)", icon: <ArrowRight className="h-3.5 w-3.5" />, text: <>Share your invite link with anyone</> },
                  { bg: "bg-[rgba(30,160,120,0.1)]", stroke: "hsl(160,55%,50%)", icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(160,55%,50%)" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  ), text: <>They sign up and <strong className="text-white/85 font-medium">complete their first lesson</strong></> },
                  { bg: "bg-[rgba(124,92,230,0.12)]", stroke: "hsl(260,70%,68%)", icon: <Flame className="h-3.5 w-3.5" />, text: <>You instantly earn <strong className="text-white/85 font-medium">1 streak freeze</strong></> },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn("h-[30px] w-[30px] rounded-lg flex items-center justify-center shrink-0", s.bg)} style={{ color: s.stroke }}>
                      {s.icon}
                    </div>
                    <p className="text-[13px] text-white/70">{s.text}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { val: state.referralCount ?? 0, label: "Signed up" },
                  { val: state.referralCount ?? 0, label: "Completed" },
                  { val: state.referralCount ?? 0, label: "Freezes earned", color: "text-[hsl(185,65%,55%)]" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/[0.04] p-3 text-center">
                    <p className={cn("font-mono text-xl font-medium mb-0.5 text-[hsl(260,70%,70%)]", s.color)}>{s.val}</p>
                    <p className="text-[9px] uppercase tracking-[0.1em] text-white/30">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Link */}
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-2">
                Your referral link
              </p>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 mb-3">
                <span className="flex-1 font-mono text-[12px] text-white/50 overflow-hidden text-ellipsis whitespace-nowrap">
                  {referralLink}
                </span>
                <button
                  onClick={handleCopy}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg border px-3 py-1 text-[11px] transition-all",
                    copied
                      ? "border-green-500/40 bg-green-500/10 text-green-400"
                      : "border-white/15 bg-white/6 text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Check className={cn("h-2.5 w-2.5", !copied && "hidden")} />
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>

              {/* Channels */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {CHANNELS.map(ch => (
                  <a
                    key={ch.id}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedChannel(ch.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-xl border py-2.5 px-2 transition-all",
                      selectedChannel === ch.id
                        ? "border-[hsl(260,70%,55%)] bg-[rgba(124,92,230,0.12)]"
                        : "border-white/8 bg-transparent hover:border-white/18 hover:bg-white/4"
                    )}
                  >
                    <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", ch.bg)}>
                      {ch.icon}
                    </div>
                    <span className={cn(
                      "text-[10px]",
                      selectedChannel === ch.id ? "text-[hsl(260,70%,70%)]" : "text-white/40"
                    )}>
                      {ch.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* CTA */}
              {canShareForFreeze ? (
                <button
                  onClick={handleShare}
                  className="w-full rounded-xl py-3 text-[13px] font-medium text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[.98]"
                  style={{ background: "linear-gradient(135deg,hsl(260,70%,55%),hsl(220,65%,55%))" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share and protect my streak
                </button>
              ) : (
                <div className="w-full rounded-xl py-3 text-center text-[13px] text-white/30 border border-white/8">
                  Shared this week — available again in{" "}
                  {7 - Math.floor((Date.now() - new Date(state.lastSharedAt).getTime()) / 86_400_000)} days
                </div>
              )}
              <p className="text-[11px] text-white/20 text-center mt-2 leading-relaxed">
                Link never expires · 1 freeze per referral who completes their first lesson
              </p>
            </div>
          ) : (
            /* Done state */
            <div className="p-8 text-center">
              <div className="h-14 w-14 rounded-full border border-green-500/25 bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-[18px] font-medium text-white/90 mb-2">Streak freeze earned</h3>
              <p className="text-[13px] text-white/50 leading-relaxed max-w-[280px] mx-auto mb-6">
                Your {state.streak}-day streak is protected. If you miss a day this week,
                the freeze activates automatically — no action needed.
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] p-3 text-left mb-5">
                <Flame className="h-4 w-4 text-orange-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-white/90">{state.streak}-day streak</p>
                  <p className="text-[11px] text-white/40">Protected until next Sunday</p>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-[rgba(124,92,230,0.3)] bg-[rgba(124,92,230,0.15)] px-2 py-1">
                  <Flame className="h-2.5 w-2.5 text-[hsl(260,70%,70%)]" />
                  <span className="text-[10px] text-[hsl(260,70%,70%)]">Frozen</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-xl py-3 text-[13px] font-medium text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,hsl(260,70%,55%),hsl(220,65%,55%))" }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── StreakFreezeCard ────────────────────────────────────────────────────────
// Sidebar card showing freeze status. Replaces the old "buy for 200 XP" mechanic.
export function StreakFreezeCard() {
  const { state, canShareForFreeze } = useGamificationContext();
  const [showModal, setShowModal] = React.useState(false);

  const daysUntilNext = state.lastSharedAt
    ? Math.max(0, 7 - Math.floor((Date.now() - new Date(state.lastSharedAt).getTime()) / 86_400_000))
    : 0;

  return (
    <>
      <div
        className="glass-panel rounded-xl p-5"
        style={state.freezeAvailable ? {
          background: "rgba(124,92,230,0.06)",
          borderColor: "rgba(124,92,230,0.25)",
        } : undefined}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Flame className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">Streak freeze</p>
              <p className="text-[11px] text-muted-foreground">Protects your streak for 1 missed day</p>
            </div>
          </div>
          {state.freezeAvailable && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">
              <Check className="h-2.5 w-2.5" /> 1 available
            </span>
          )}
        </div>

        {state.freezeAvailable ? (
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Auto-activates if you miss a day. Won't work two days in a row.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            You don't have a freeze. Share the university to earn one — free, no XP cost.
          </p>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="w-full rounded-lg border border-border/50 bg-transparent px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          {state.freezeAvailable
            ? "Earn another — share the university"
            : canShareForFreeze
            ? "Share to earn a freeze"
            : `Available again in ${daysUntilNext} day${daysUntilNext !== 1 ? "s" : ""}`
          }
        </button>
      </div>
      <ShareModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

// ── StreakRiskBanner ─────────────────────────────────────────────────────────
export function StreakRiskBanner() {
  const { state, todayDone } = useGamificationContext();
  const [showModal, setShowModal] = React.useState(false);
  if (state.streak < 2 || todayDone) return null;
  return (
    <>
      <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 flex items-center gap-3">
        <Flame className="h-4 w-4 text-orange-400 shrink-0" />
        <p className="text-xs text-foreground flex-1">
          Your <span className="font-semibold text-orange-400">{state.streak}-day streak</span> is at
          risk — complete any lesson today to keep it alive.
        </p>
        {!state.freezeAvailable && (
          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors whitespace-nowrap"
          >
            Protect streak
          </button>
        )}
      </div>
      <ShareModal open={showModal} onClose={() => setShowModal(false)} />
    </>
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
                <p className="text-[10px] font-mono text-yellow-400 mt-1">+{badge.xp} XP</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── XPStatsCard — replaces Profile sidebar stats ───────────────────────────
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
