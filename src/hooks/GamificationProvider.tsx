import React, { createContext, useContext, useState, useCallback } from "react";
import { useGamification, GamificationHook, BADGES } from "./useGamification";
import { Zap } from "lucide-react";

const GamificationContext = createContext<GamificationHook | null>(null);

export function useGamificationContext(): GamificationHook {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamificationContext must be used inside GamificationProvider");
  return ctx;
}

// ── Toast types ────────────────────────────────────────────────────────────
interface ToastItem {
  id: number;
  type: "xp" | "badge";
  xp?: number;
  label?: string;
  badge?: typeof BADGES[number];
}

let toastId = 0;

function XPToast({ xp, label, onDone }: { xp: number; label: string; onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="flex items-center gap-2 rounded-xl border border-primary/30 bg-card/90 backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-primary/10 animate-in slide-in-from-bottom-2 fade-in"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <Zap className="h-3.5 w-3.5 text-primary" />
      </div>
      <div>
        <p className="text-xs font-mono font-bold text-primary">+{xp} XP</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function BadgeToast({ badge, onDone }: { badge: typeof BADGES[number]; onDone: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-card/90 backdrop-blur-xl px-4 py-3 shadow-lg animate-in slide-in-from-bottom-2 fade-in"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(45,85%,55%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-foreground">Badge Unlocked!</p>
        <p className="text-xs text-primary font-semibold">{badge.name}</p>
        <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
      </div>
    </div>
  );
}

// ── Provider ───────────────────────────────────────────────────────────────
export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const gam = useGamification();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts(t => t.filter(item => item.id !== id));
  }, []);

  const pushXPToast = useCallback((xp: number, label: string) => {
    if (xp <= 0) return;
    const id = ++toastId;
    setToasts(t => [...t, { id, type: "xp", xp, label }]);
  }, []);

  const pushBadgeToasts = useCallback((badges: typeof BADGES[number][]) => {
    badges.forEach((badge, i) => {
      const id = ++toastId;
      setTimeout(() => {
        setToasts(t => [...t, { id, type: "badge", badge }]);
      }, i * 700);
    });
  }, []);

  // Wrap actions to fire toasts
  const completeLesson: GamificationHook["completeLesson"] = useCallback((lessonId, pathId) => {
    const result = gam.completeLesson(lessonId, pathId);
    if (result.xpGained > 0) pushXPToast(result.xpGained, "Lesson complete");
    if (result.newBadges.length > 0) pushBadgeToasts(result.newBadges);
    return result;
  }, [gam, pushXPToast, pushBadgeToasts]);

  const watchVideo: GamificationHook["watchVideo"] = useCallback((videoId) => {
    const result = gam.watchVideo(videoId);
    if (result.xpGained > 0) pushXPToast(result.xpGained, "Video watched");
    return result;
  }, [gam, pushXPToast]);

  const passKnowledgeCheck: GamificationHook["passKnowledgeCheck"] = useCallback((moduleId, perfect) => {
    const result = gam.passKnowledgeCheck(moduleId, perfect);
    if (result.xpGained > 0) pushXPToast(result.xpGained, perfect ? "Perfect score!" : "Knowledge check passed");
    if (result.newBadges.length > 0) pushBadgeToasts(result.newBadges);
    return result;
  }, [gam, pushXPToast, pushBadgeToasts]);

  const completePath: GamificationHook["completePath"] = useCallback((pathId) => {
    const result = gam.completePath(pathId);
    if (result.xpGained > 0) pushXPToast(result.xpGained, "Track complete!");
    if (result.newBadges.length > 0) pushBadgeToasts(result.newBadges);
    return result;
  }, [gam, pushXPToast, pushBadgeToasts]);

  const contextValue: GamificationHook = {
    ...gam,
    completeLesson,
    watchVideo,
    passKnowledgeCheck,
    completePath,
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
      {/* Toast layer */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-end"
        style={{ pointerEvents: "none" }}
      >
        {toasts.map(item =>
          item.type === "xp" && item.xp !== undefined && item.label !== undefined ? (
            <XPToast key={item.id} xp={item.xp} label={item.label} onDone={() => removeToast(item.id)} />
          ) : item.type === "badge" && item.badge ? (
            <BadgeToast key={item.id} badge={item.badge} onDone={() => removeToast(item.id)} />
          ) : null
        )}
      </div>
    </GamificationContext.Provider>
  );
}