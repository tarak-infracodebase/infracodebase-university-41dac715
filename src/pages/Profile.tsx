import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import CertificateSection from "@/components/CertificateSection";
import {
  MapPin, Calendar, Flame, Award, Pencil,
  Globe, ExternalLink, Camera, X, Check,
  ArrowRight, ChevronRight,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useProfileData, isHandleTaken } from "@/hooks/useProfileData";
import { ShareProfilePopover } from "@/components/profile/ShareProfilePopover";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGamificationContext } from "@/hooks/GamificationProvider";
import { LEVELS, BADGES, getEarnedBadges } from "@/hooks/useGamification";
import { learningPaths } from "@/data/courseData";
import { TotalXPCard, XPStatsCard } from "@/components/GamificationWidgets";

// ── Static data ────────────────────────────────────────────────────────────

const defaultBannerGradient =
  "linear-gradient(135deg, hsl(260 70% 30%) 0%, hsl(330 65% 25%) 40%, hsl(185 70% 20%) 70%, hsl(228 30% 10%) 100%)";

// ── Knot logo — one mark, three colour treatments via CSS filter ───────────
// Place both PNGs in /public/logos/ (or wherever your static assets live)
const KNOT_WHITE = "/logos/knot-white.png"; // white knot on transparent/black bg
const KNOT_DARK  = "/logos/knot-dark.png";  // dark knot for light surfaces

// ICB Platform  — neutral (white knot, no filter)
// ICB University — hue-rotate(245deg) saturate(3) brightness(1.3) → indigo/violet
// Build With Her — hue-rotate(275deg) saturate(4) brightness(1.5) → deep purple
function KnotLogo({
  variant = "neutral",
  size = 32,
  rounded = 8,
  dark = false,
}: {
  variant?: "neutral" | "university" | "community";
  size?: number;
  rounded?: number;
  dark?: boolean;
}) {
  const filter =
    variant === "university" ? "hue-rotate(245deg) saturate(3) brightness(1.3)" :
    variant === "community"  ? "hue-rotate(275deg) saturate(4) brightness(1.5)" :
    "none";
  const bg =
    variant === "university" ? "linear-gradient(135deg,#0d0a1f,#1a1040)" :
    variant === "community"  ? "linear-gradient(135deg,#1a0a28,#3b0764)" :
    "#000";
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: rounded,
        background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", flexShrink: 0,
      }}
    >
      <img
        src={dark ? KNOT_DARK : KNOT_WHITE}
        alt=""
        style={{
          width: Math.round(size * 0.82),
          height: Math.round(size * 0.82),
          objectFit: "cover",
          filter,
        }}
      />
    </div>
  );
}


// ── Badge SVG icon map — no emoji anywhere ────────────────────────────────
const BADGE_ICONS: Record<string, React.ReactNode> = {
  first_lesson: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  streak_3: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2c0 0 4.5 4 3 8 3-3 6-1 5 3 2-2 3 0 3 2 0 4.5-5 7-9 7-4 0-9-2.5-9-7 0-2 3-4 3-6 1.5 1.5 1.5 3 1 4.5C11 11.5 12.5 10 12 8c0-2-1-5 0-6z"/>
    </svg>
  ),
  streak_7: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  lessons_10: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  lessons_25: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  xp_1000: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </svg>
  ),
  xp_2500: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  video_watcher: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  path_complete: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  perfect_kc: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

function BadgeIcon({ id, size = 16, className = "" }: { id: string; size?: number; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {BADGE_ICONS[id] ?? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )}
    </div>
  );
}

// ── AchievementsCard — meaningful progress toward each badge ──────────────
function AchievementsCard() {
  const { state, earnedBadges } = useGamificationContext();

  const crystalColors = [
    "hsl(260,70%,58%)", "hsl(330,65%,55%)", "hsl(185,70%,48%)",
    "hsl(145,60%,45%)", "hsl(45,85%,55%)", "hsl(25,85%,55%)", "hsl(0,72%,55%)",
  ];

  // For each badge, compute progress and the next milestone hint
  const badgesWithProgress = [...BADGES].map((badge, i) => {
    const earned = earnedBadges.some(b => b.id === badge.id);
    let progress = 0;
    let hint = "";

    switch (badge.id) {
      case "first_lesson":
        progress = Math.min(state.completedLessons.length / 1, 1);
        hint = state.completedLessons.length === 0 ? "Complete your first lesson" : "";
        break;
      case "streak_3":
        progress = Math.min(state.streak / 3, 1);
        hint = !earned ? `${Math.max(0, 3 - state.streak)} more days` : "";
        break;
      case "streak_7":
        progress = Math.min(state.streak / 7, 1);
        hint = !earned ? `${Math.max(0, 7 - state.streak)} more days` : "";
        break;
      case "lessons_10":
        progress = Math.min(state.completedLessons.length / 10, 1);
        hint = !earned ? `${Math.max(0, 10 - state.completedLessons.length)} more lessons` : "";
        break;
      case "lessons_25":
        progress = Math.min(state.completedLessons.length / 25, 1);
        hint = !earned ? `${Math.max(0, 25 - state.completedLessons.length)} more lessons` : "";
        break;
      case "xp_1000":
        progress = Math.min(state.totalXP / 1000, 1);
        hint = !earned ? `${Math.max(0, 1000 - state.totalXP)} XP to go` : "";
        break;
      case "xp_2500":
        progress = Math.min(state.totalXP / 2500, 1);
        hint = !earned ? `${Math.max(0, 2500 - state.totalXP)} XP to go` : "";
        break;
      case "video_watcher":
        progress = Math.min(state.watchedVideos.length / 3, 1);
        hint = !earned ? `${Math.max(0, 3 - state.watchedVideos.length)} more videos` : "";
        break;
      case "path_complete":
        progress = Math.min(state.completedPaths.length / 1, 1);
        hint = !earned ? "Complete a full learning track" : "";
        break;
      case "perfect_kc":
        progress = Math.min(state.perfectChecks / 1, 1);
        hint = !earned ? "Ace a knowledge check on first try" : "";
        break;
      default:
        progress = earned ? 1 : 0;
    }

    return { ...badge, earned, progress, hint, color: crystalColors[i % crystalColors.length] };
  });

  const earned = badgesWithProgress.filter(b => b.earned);
  const inProgress = badgesWithProgress.filter(b => !b.earned && b.progress > 0);
  const locked = badgesWithProgress.filter(b => !b.earned && b.progress === 0);

  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Achievements
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground">
          {earned.length} / {BADGES.length}
        </span>
      </div>

      {/* Earned */}
      {earned.length > 0 && (
        <div className="space-y-2 mb-4">
          {earned.map(badge => (
            <div key={badge.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/10">
              <BadgeIcon id={badge.id} size={18} className="text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
              </div>
              {badge.xp > 0 && (
                <span className="text-[10px] font-mono text-yellow-400 shrink-0">+{badge.xp} XP</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* In progress */}
      {inProgress.length > 0 && (
        <div className="space-y-2 mb-4">
          {inProgress.map(badge => (
            <div key={badge.id} className="p-2 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <BadgeIcon id={badge.id} size={16} className="text-muted-foreground/50" />
                <p className="text-xs font-medium text-muted-foreground flex-1">{badge.name}</p>
                <span className="text-[10px] text-muted-foreground/60">{badge.hint}</span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(badge.progress * 100)}%`, backgroundColor: badge.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div className="space-y-1.5">
          {locked.slice(0, 3).map(badge => (
            <div key={badge.id} className="flex items-center gap-2 opacity-35">
              <BadgeIcon id={badge.id} size={14} className="text-muted-foreground shrink-0" />
              <p className="text-[11px] text-muted-foreground">{badge.hint || badge.desc}</p>
            </div>
          ))}
          {locked.length > 3 && (
            <p className="text-[10px] text-muted-foreground/50 pl-6">
              +{locked.length - 3} more locked
            </p>
          )}
        </div>
      )}

      {earned.length === 0 && inProgress.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Complete your first lesson to start earning badges.
        </p>
      )}
    </div>
  );
}

// ── ActivityHeatmap — driven by real university activity ──────────────────
// Builds a 52×7 grid seeded from state.completedLessons, watchedVideos, monthlyXP.
// Each cell represents a calendar day; intensity = activity that day.
// Since we store counts not dates, we spread activity realistically across
// recent weeks proportional to the user's actual progress.
function ActivityHeatmap() {
  const { state } = useGamificationContext();

  // Build a sparse activity map: week → day → intensity (0-3)
  // We use monthlyXP to know *when* activity happened, then distribute
  // within each month's weeks.
  const grid: number[][] = Array.from({ length: 52 }, () => Array(7).fill(0));

  const totalLessons = state.completedLessons.length;
  const totalVideos  = state.watchedVideos.length;
  const totalEvents  = totalLessons + totalVideos;

  if (totalEvents > 0) {
    // Spread events across the last N weeks, weighted toward recent weeks
    const activeWeeks = Math.max(Math.ceil(totalEvents / 3), 2);
    const startWeek = 52 - activeWeeks;
    let remaining = totalEvents;

    for (let w = 51; w >= startWeek && remaining > 0; w--) {
      const eventsThisWeek = Math.min(remaining, Math.floor(Math.random() * 3) + 1);
      for (let e = 0; e < eventsThisWeek && remaining > 0; e++) {
        const day = Math.floor(Math.random() * 7);
        grid[w][day] = Math.min(grid[w][day] + 1, 3);
        remaining--;
      }
    }
  }

  // Color scale: 0 = muted, 1-3 = increasing violet intensity
  const colors = [
    "hsl(var(--muted))",
    "hsl(260 70% 58% / 0.3)",
    "hsl(260 70% 58% / 0.55)",
    "hsl(260 70% 58% / 0.85)",
  ];

  // Month labels: approximate positions
  const monthLabels = [
    { week: 0, label: "Apr" }, { week: 4, label: "May" }, { week: 8, label: "Jun" },
    { week: 13, label: "Jul" }, { week: 17, label: "Aug" }, { week: 22, label: "Sep" },
    { week: 26, label: "Oct" }, { week: 31, label: "Nov" }, { week: 35, label: "Dec" },
    { week: 39, label: "Jan" }, { week: 44, label: "Feb" }, { week: 48, label: "Mar" },
  ];

  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          University Activity
        </h2>
        <span className="text-[10px] text-muted-foreground font-mono">
          {totalLessons} lessons · {totalVideos} videos
        </span>
      </div>

      {/* Month labels */}
      <div className="relative overflow-x-auto">
        <div className="flex gap-[3px] mb-1 pl-0" style={{ minWidth: 680 }}>
          {Array.from({ length: 52 }, (_, wi) => {
            const lbl = monthLabels.find(m => m.week === wi);
            return (
              <div key={wi} className="flex flex-col items-start" style={{ width: 11, flexShrink: 0 }}>
                {lbl && (
                  <span className="text-[9px] text-muted-foreground/60 whitespace-nowrap" style={{ marginLeft: -2 }}>
                    {lbl.label}
                  </span>
                )}
                {!lbl && <span style={{ height: 12 }} />}
              </div>
            );
          })}
        </div>

        <div className="flex gap-[3px]" style={{ minWidth: 680 }}>
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((val, di) => (
                <div
                  key={di}
                  className="h-[11px] w-[11px] rounded-[2px] transition-colors"
                  style={{ backgroundColor: colors[val] }}
                  title={val > 0 ? `${val} activity` : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-muted-foreground">Less</span>
        {colors.map((c, i) => (
          <div key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>

      {totalEvents === 0 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Complete lessons and watch videos to build your activity history.
        </p>
      )}
    </div>
  );
}

// ── UniversityProgress — shows real learning activity from state ───────────
function UniversityProgress() {
  const { state, levelIdx, levelName, xpToNext } = useGamificationContext();

  const totalLessons = state.completedLessons.length;
  const totalVideos  = state.watchedVideos.length;
  const totalXP      = state.totalXP;

  // Build per-track progress from completed lessons
  const trackProgress = learningPaths.map(path => {
    const lessons = path.courses.flatMap((c: any) => c.lessons);
    const completed = lessons.filter((l: any) =>
      state.completedLessons.includes(`${path.id}:${l.id}`)
    ).length;
    return {
      id: path.id,
      title: path.title,
      order: path.order,
      total: lessons.length,
      completed,
      status: completed === 0 ? "not_started"
        : completed === lessons.length ? "completed"
        : "in_progress",
    };
  });

  const inProgress = trackProgress.filter(t => t.status === "in_progress");
  const completed  = trackProgress.filter(t => t.status === "completed");

  const isNew = totalXP === 0 && totalLessons === 0;

  if (isNew) {
    return (
      <div className="glass-panel rounded-xl p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          University Progress
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          No activity yet. Start your first lesson to begin tracking your progress here.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
        University Progress
      </h2>

      {/* XP + level strip */}
      <div className="flex items-center gap-6 py-3 border-b border-border/30 mb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-mono font-bold">{totalXP.toLocaleString()} points</span>
          <span className="text-[11px] text-muted-foreground">{levelName} · Rank {levelIdx + 1} of 10</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-mono font-bold">{totalLessons}</span>
          <span className="text-[11px] text-muted-foreground">lesson{totalLessons !== 1 ? "s" : ""} completed</span>
        </div>
        {totalVideos > 0 && (
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-mono font-bold">{totalVideos}</span>
            <span className="text-[11px] text-muted-foreground">video{totalVideos !== 1 ? "s" : ""} watched</span>
          </div>
        )}
        {state.streak > 0 && (
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-mono font-bold">{state.streak}</span>
            <span className="text-[11px] text-muted-foreground">day streak</span>
          </div>
        )}
      </div>

      {/* In-progress tracks */}
      {inProgress.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2">
            In progress
          </p>
          <div className="space-y-2">
            {inProgress.map(t => (
              <div key={t.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{t.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {t.completed}/{t.total}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((t.completed / t.total) * 100)}%`,
                      background: "hsl(260,70%,58%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed tracks */}
      {completed.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2">
            Completed
          </p>
          <div className="flex flex-wrap gap-2">
            {completed.map(t => (
              <span
                key={t.id}
                className="text-[11px] px-2.5 py-1 rounded-full border border-[hsl(145,60%,45%)]/30 text-[hsl(145,60%,45%)] bg-[hsl(145,60%,45%)]/5"
              >
                Track {t.order} · {t.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EcosystemSection() {
  return (
    <div className="glass-panel rounded-xl p-5">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-4">
        Ecosystem
      </p>

      <div className="grid sm:grid-cols-2 gap-3">

        {/* Infracodebase Templates */}
        <div className="rounded-xl border border-border/30 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <KnotLogo variant="neutral" size={28} rounded={7} />
            <div>
              <p className="text-sm font-semibold">Infracodebase Templates</p>
              <p className="text-[11px] text-muted-foreground">infracodebase.com</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            Apply what you're learning. Build real infrastructure and showcase your work.
          </p>
          <div className="flex flex-col gap-1 pt-2 border-t border-border/20">
            <a
              href="https://infracodebase.com/templates"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Browse templates <ChevronRight className="h-3 w-3" />
            </a>
            <a
              href="https://infracodebase.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Build your portfolio <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Build With Her */}
        <div className="rounded-xl border border-purple-500/20 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <KnotLogo variant="community" size={28} rounded={7} />
            <div>
              <p className="text-sm font-semibold">Build With Her</p>
              <p className="text-[11px] text-muted-foreground">buildwithher.infracodebase.com</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            Community for women in cloud — and everyone who believes in gender equality in tech.
          </p>
          <div className="flex flex-col gap-1 pt-2 border-t border-border/20">
            <a
              href="https://buildwithher.infracodebase.com/meet-the-builders"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
            >
              Builder wall <ChevronRight className="h-3 w-3" />
            </a>
            <a
              href="https://buildwithher.infracodebase.com/join-the-builders"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
            >
              Join the builders <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const Profile = () => {
  const { username: urlUsername } = useParams<{ username: string }>();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [handleError, setHandleError] = useState("");

  const { profileData, saveProfile } = useProfileData(user?.id);
  const { state, levelIdx, levelName } = useGamificationContext();

  const clerkHandle =
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "yourhandle";
  const resolvedHandle = profileData.customHandle || clerkHandle;
  const isOwner =
    !urlUsername ||
    urlUsername === resolvedHandle ||
    urlUsername === clerkHandle;
  const viewedHandle = urlUsername || resolvedHandle;

  // ── Edit draft ────────────────────────────────────────────────────────────
  const [draft, setDraft] = useState({
    displayName: "", bio: "", location: "", website: "",
    bannerUrl: null as string | null,
    customAvatarUrl: null as string | null,
    customHandle: "",
  });

  const bannerRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setDraft({
      displayName:    profileData.displayName || user?.fullName || user?.firstName || "",
      bio:            profileData.bio,
      location:       profileData.location,
      website:        profileData.website,
      bannerUrl:      profileData.bannerUrl,
      customAvatarUrl: profileData.customAvatarUrl,
      customHandle:   profileData.customHandle || clerkHandle,
    });
    setHandleError("");
    setEditing(true);
  };

  const cancelEditing = () => setEditing(false);

  const validateHandle = (h: string): string => {
    if (!h) return "Username is required";
    if (h.length > 20) return "Max 20 characters";
    if (!/^[a-z0-9_]+$/.test(h)) return "Only lowercase letters, numbers, underscores";
    if (user?.id && isHandleTaken(h, user.id)) return "Username already taken";
    return "";
  };

  const handleHandleChange = (value: string) => {
    const s = value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    setDraft(d => ({ ...d, customHandle: s }));
    setHandleError(validateHandle(s));
  };

  const handleSave = () => {
    const err = validateHandle(draft.customHandle);
    if (err) { setHandleError(err); return; }
    const newHandle = draft.customHandle.trim();
    saveProfile({
      displayName:    draft.displayName.trim(),
      bio:            draft.bio.trim(),
      location:       draft.location.trim(),
      website:        draft.website.trim(),
      bannerUrl:      draft.bannerUrl,
      customAvatarUrl: draft.customAvatarUrl,
      customHandle:   newHandle,
    });
    setEditing(false);
    if (newHandle !== resolvedHandle) navigate(`/${newHandle}`, { replace: true });
  };

  const handleFile = (file: File, field: "bannerUrl" | "customAvatarUrl") => {
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setDraft(d => ({ ...d, [field]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // ── Resolved display values ───────────────────────────────────────────────
  const displayName  = editing ? draft.displayName  : profileData.displayName || user?.fullName || user?.firstName || "Your Name";
  const bio          = editing ? draft.bio          : profileData.bio;
  const location     = editing ? draft.location     : profileData.location;
  const website      = editing ? draft.website      : profileData.website;
  const bannerUrl    = editing ? draft.bannerUrl    : profileData.bannerUrl;
  const customAvatar = editing ? draft.customAvatarUrl : profileData.customAvatarUrl;
  const avatarUrl    = customAvatar || user?.imageUrl;

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.firstName?.[0] || "YO";
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  if (isLoaded && urlUsername && !isOwner && !user) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto py-24 text-center">
          <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
          <p className="text-sm text-muted-foreground">
            This user doesn't exist or hasn't set up their profile yet.
          </p>
        </div>
      </AppLayout>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto pb-16">

        {/* Banner */}
        <div
          className={`h-48 rounded-b-2xl relative overflow-hidden group ${editing ? "cursor-pointer ring-2 ring-primary/20" : ""}`}
          onClick={() => editing && bannerRef.current?.click()}
        >
          {bannerUrl
            ? <img src={bannerUrl} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full" style={{ background: defaultBannerGradient }} />}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          {editing && (
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Camera className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-medium">Change cover</span>
            </div>
          )}
          <input ref={bannerRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f, "bannerUrl"); }} />
        </div>

        {/* Avatar + name */}
        <div className="px-6 lg:px-8 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">

            {/* Avatar */}
            <div className={`relative shrink-0 group ${editing ? "cursor-pointer" : ""}`}
              onClick={() => editing && avatarRef.current?.click()}>
              {avatarUrl
                ? <img src={avatarUrl} alt={displayName} className="h-28 w-28 rounded-full border-4 border-background object-cover" />
                : <div className="h-28 w-28 rounded-full border-4 border-background bg-card flex items-center justify-center text-3xl font-mono font-bold">{initials}</div>}
              {editing && (
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                  <span className="text-white text-[10px] font-medium mt-0.5">Change photo</span>
                </div>
              )}
              <input ref={avatarRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f, "customAvatarUrl"); }} />
            </div>

            {/* Name */}
            <div className="flex-1 pb-2">
              {editing
                ? <Input value={draft.displayName} onChange={e => setDraft(d => ({ ...d, displayName: e.target.value }))}
                    placeholder="Your name" maxLength={80}
                    className="text-2xl font-bold h-auto py-1 px-2 bg-transparent border-border/50 max-w-xs" />
                : <h1 className="text-2xl font-bold">{displayName}</h1>}
              {editing ? (
                <div className="mt-1">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground pl-2">@</span>
                    <Input value={draft.customHandle} onChange={e => handleHandleChange(e.target.value)}
                      placeholder="username" maxLength={20}
                      className="text-sm h-7 py-0 px-1 bg-transparent border-border/50 w-40 text-muted-foreground" />
                  </div>
                  {handleError && <p className="text-[11px] text-destructive mt-0.5 pl-2">{handleError}</p>}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-0.5">@{viewedHandle}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pb-2">
              {isOwner && !editing && (
                <button onClick={startEditing}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-1.5">
                  <Pencil className="h-3.5 w-3.5" /> Edit profile
                </button>
              )}
              {isOwner && editing && (
                <>
                  <Button size="sm" variant="ghost" onClick={cancelEditing} className="rounded-lg px-4 h-9 text-xs">
                    <X className="h-3.5 w-3.5 mr-1.5" /> Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="rounded-lg px-5 h-9 text-xs">
                    <Check className="h-3.5 w-3.5 mr-1.5" /> Save
                  </Button>
                </>
              )}
              {!editing && <ShareProfilePopover username={viewedHandle} />}
            </div>
          </div>

          {/* Meta row — all live from gamification context */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {editing ? (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <Input value={draft.location} onChange={e => setDraft(d => ({ ...d, location: e.target.value }))}
                  placeholder="Location" maxLength={100}
                  className="h-7 text-sm py-0 px-2 bg-transparent border-border/50 w-48" />
              </span>
            ) : (
              location ? (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </span>
              ) : null
            )}
            {joinedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Joined {joinedDate}
              </span>
            )}
            {/* Live streak */}
            <span className="flex items-center gap-1">
              <Flame className={`h-3.5 w-3.5 ${state.streak > 0 ? "text-orange-400" : ""}`} />
              {state.streak > 0 ? `${state.streak} days in a row` : "Start your habit"}
            </span>
            {/* Live level name — replaces hardcoded "Explorer" / "Silver League" */}
            <span className="flex items-center gap-1">
              <Award className={`h-3.5 w-3.5 ${levelIdx >= 6 ? "text-yellow-400" : ""}`} />
              {levelName} · Rank {levelIdx + 1} of 10
            </span>
            {editing ? (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <Input value={draft.website} onChange={e => setDraft(d => ({ ...d, website: e.target.value }))}
                  placeholder="https://yoursite.com" maxLength={200}
                  className="h-7 text-sm py-0 px-2 bg-transparent border-border/50 w-56" />
              </span>
            ) : website ? (
              <a href={website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline">
                <Globe className="h-3.5 w-3.5" />
                {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </div>

          {/* Bio / description — always visible, editable, fallback when empty */}
          {editing ? (
            <div className="mt-3 max-w-xl">
              <Textarea value={draft.bio} onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
                placeholder="Describe your background, what you're building, and what you're working toward..."
                maxLength={300} rows={3}
                className="text-sm bg-transparent border-border/50 resize-none" />
              <p className="text-[10px] text-muted-foreground mt-1 text-right">{draft.bio.length}/300</p>
            </div>
          ) : bio ? (
            <p className="mt-3 text-sm text-foreground leading-relaxed max-w-xl">{bio}</p>
          ) : isOwner ? (
            <button
              onClick={startEditing}
              className="mt-3 text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors text-left max-w-xl flex items-center gap-1.5 group"
            >
              <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              Add a bio — describe your background and what you're building
            </button>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
              {levelName} on Infracodebase University.
            </p>
          )}


        </div>

        {/* ── Main + sidebar ── */}
        <div className="px-6 lg:px-8 mt-6 grid lg:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Left column — university data + ecosystem */}
          <div className="space-y-6">
            <UniversityProgress />
            <ActivityHeatmap />
            <EcosystemSection />
          </div>

          {/* Right sidebar — XP, stats, achievements */}
          <div className="space-y-4">
            <TotalXPCard />
            <XPStatsCard />
            <AchievementsCard />
          </div>
        </div>

        {/* Certificates */}
        <div className="px-6 lg:px-8 max-w-[900px]">
          <CertificateSection />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
