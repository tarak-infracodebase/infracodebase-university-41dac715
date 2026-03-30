// src/hooks/useGamification.ts

import { useState, useCallback, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

// ── Level definitions ──────────────────────────────────────────────────────
// Calibrated so 2450 XP = index 6 = "Platform Engineer" = "Level 7"
export const LEVELS = [
  { name: "Cloud Curious",          minXP: 0    },
  { name: "Cloud Explorer",         minXP: 150  },
  { name: "Terraform Tinkerer",     minXP: 400  },
  { name: "IaC Engineer",           minXP: 800  },
  { name: "Pipeline Pro",           minXP: 1400 },
  { name: "Security Practitioner",  minXP: 2000 },
  { name: "Platform Engineer",      minXP: 2400 },
  { name: "Infra Architect",        minXP: 3500 },
  { name: "Cloud Native",           minXP: 5000 },
  { name: "Infra Legend",           minXP: 7500 },
] as const;

export function getLevelIdx(xp: number): number {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXP) idx = i;
  }
  return idx;
}

export function xpToNextLevel(xp: number): number {
  const idx = getLevelIdx(xp);
  if (idx >= LEVELS.length - 1) return 0;
  return LEVELS[idx + 1].minXP - xp;
}

// ── Badge definitions ──────────────────────────────────────────────────────
export const BADGES = [
  { id: "first_lesson",  name: "First Step",        icon: "first_lesson",  desc: "Complete your first lesson",           xp: 50,  check: (s: GamState) => s.completedLessons.length >= 1 },
  { id: "streak_3",      name: "On a Roll",          icon: "streak_3",      desc: "Reach a 3-day streak",                 xp: 75,  check: (s: GamState) => s.streak >= 3 },
  { id: "streak_7",      name: "Week Warrior",       icon: "streak_7",      desc: "Reach a 7-day streak",                 xp: 150, check: (s: GamState) => s.streak >= 7 },
  { id: "lessons_10",    name: "Dedicated Learner",  icon: "lessons_10",    desc: "Complete 10 lessons",                  xp: 100, check: (s: GamState) => s.completedLessons.length >= 10 },
  { id: "lessons_25",    name: "Deep Diver",         icon: "lessons_25",    desc: "Complete 25 lessons",                  xp: 200, check: (s: GamState) => s.completedLessons.length >= 25 },
  { id: "xp_1000",       name: "Rising Engineer",    icon: "xp_1000",       desc: "Earn 1,000 XP",                        xp: 0,   check: (s: GamState) => s.totalXP >= 1000 },
  { id: "xp_2500",       name: "Infrastructure Pro", icon: "xp_2500",       desc: "Earn 2,500 XP",                        xp: 0,   check: (s: GamState) => s.totalXP >= 2500 },
  { id: "video_watcher", name: "Visual Learner",     icon: "video_watcher", desc: "Watch 3 full videos",                  xp: 60,  check: (s: GamState) => s.watchedVideos.length >= 3 },
  { id: "path_complete", name: "Track Graduate",     icon: "path_complete", desc: "Complete a full learning track",       xp: 500, check: (s: GamState) => s.completedPaths.length >= 1 },
  { id: "perfect_kc",    name: "First Try",          icon: "perfect_kc",    desc: "Perfect score on a knowledge check",  xp: 50,  check: (s: GamState) => s.perfectChecks >= 1 },
] as const;

export type BadgeId = typeof BADGES[number]["id"];

export function getEarnedBadges(state: GamState) {
  return BADGES.filter(b => b.check(state));
}

// ── State ──────────────────────────────────────────────────────────────────
export interface GamState {
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  hearts: number;
  maxHearts: number;
  dailyXP: number;
  dailyGoal: number;
  dailyDate: string;
  completedLessons: string[];   // "pathId:lessonId"
  completedPaths: string[];
  watchedVideos: string[];
  earnedBadgeIds: BadgeId[];
  perfectChecks: number;
  doubleXP: boolean;
  doubleXPExpiry: string;
  freezeAvailable: boolean;
  lastSharedAt: string;        // ISO date — enforces 7-day share-for-freeze cooldown
  referralCount: number;       // total referrals who completed first lesson
  monthlyXP: { month: string; xp: number }[];
  weeklyXP: number;
  weekStart: string;
  dailyHistory: { date: string; xp: number }[];
  _migrated?: boolean;
}

const today = () => new Date().toISOString().slice(0, 10);

const thisMonday = () => {
  const d = new Date();
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d.toISOString().slice(0, 10);
};

const monthKey = () =>
  new Date().toLocaleDateString("en-US", { month: "short" });

const DEFAULT_STATE: GamState = {
  totalXP: 0,
  streak: 0,
  lastActiveDate: "",
  hearts: 5,
  maxHearts: 5,
  dailyXP: 0,
  dailyGoal: 10,
  dailyDate: today(),
  completedLessons: [],
  completedPaths: [],
  watchedVideos: [],
  earnedBadgeIds: [],
  perfectChecks: 0,
  doubleXP: false,
  doubleXPExpiry: "",
  freezeAvailable: false,
  lastSharedAt: "",
  referralCount: 0,
  monthlyXP: [],
  weeklyXP: 0,
  weekStart: thisMonday(),
  dailyHistory: [],
};

const LS_KEY = "icbu_gamification";

function loadFromLS(): GamState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      // One-time migration: seed XP from existing localStorage activity
      let seeded = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("icbu_checklist_")) seeded += 50;
        if (key?.startsWith("vid-progress-")) {
          const pct = Number(localStorage.getItem(key) || 0);
          if (pct >= 95) seeded += 20;
        }
      }
      if (seeded > 0) {
        return { ...DEFAULT_STATE, totalXP: seeded, _migrated: true };
      }
      return { ...DEFAULT_STATE };
    }
    const parsed = JSON.parse(raw);
    // Ensure arrays are never null/undefined from stale schemas
    const safe: GamState = { ...DEFAULT_STATE, ...parsed };
    if (!Array.isArray(safe.completedLessons)) safe.completedLessons = [];
    if (!Array.isArray(safe.completedPaths)) safe.completedPaths = [];
    if (!Array.isArray(safe.watchedVideos)) safe.watchedVideos = [];
    if (!Array.isArray(safe.earnedBadgeIds)) safe.earnedBadgeIds = [];
    if (!Array.isArray(safe.monthlyXP)) safe.monthlyXP = [];
    if (!Array.isArray(safe.dailyHistory)) safe.dailyHistory = [];
    if (typeof safe.totalXP !== "number") safe.totalXP = 0;
    if (typeof safe.streak !== "number") safe.streak = 0;
    if (typeof safe.hearts !== "number") safe.hearts = 5;
    if (typeof safe.dailyXP !== "number") safe.dailyXP = 0;
    if (typeof safe.weeklyXP !== "number") safe.weeklyXP = 0;
    if (typeof safe.perfectChecks !== "number") safe.perfectChecks = 0;
    if (typeof safe.referralCount !== "number") safe.referralCount = 0;
    return safe;
  } catch {
    // Corrupted data — nuke and start fresh
    try { localStorage.removeItem(LS_KEY); } catch {}
    return { ...DEFAULT_STATE };
  }
}

function saveToLS(state: GamState) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
}

function updateMonthlyBucket(
  buckets: GamState["monthlyXP"],
  amount: number
): GamState["monthlyXP"] {
  const key = monthKey();
  const copy = [...buckets];
  const idx = copy.findIndex(b => b.month === key);
  if (idx >= 0) {
    copy[idx] = { month: key, xp: copy[idx].xp + amount };
  } else {
    copy.push({ month: key, xp: amount });
  }
  return copy.slice(-6);
}

function updateDailyHistory(
  history: GamState["dailyHistory"],
  amount: number,
  date: string = today()
): GamState["dailyHistory"] {
  const copy = [...(history ?? [])];
  const idx = copy.findIndex(h => h.date === date);
  if (idx >= 0) {
    copy[idx] = { date, xp: copy[idx].xp + amount };
  } else {
    copy.push({ date, xp: amount });
  }
  copy.sort((a, b) => a.date.localeCompare(b.date));
  return copy.slice(-14);
}

// ── Hook exports ──────────────────────────────────────────────────────────
export interface GamificationHook {
  state: GamState;
  levelIdx: number;
  levelName: string;
  xpToNext: number;
  earnedBadges: typeof BADGES[number][];
  todayDone: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, pathId: string) => { xpGained: number; newBadges: typeof BADGES[number][] };
  watchVideo: (videoId: string) => { xpGained: number };
  passKnowledgeCheck: (moduleId: string, perfect: boolean) => { xpGained: number; newBadges: typeof BADGES[number][] };
  wrongAnswer: () => void;
  restoreHeart: () => void;
  completePath: (pathId: string) => { xpGained: number; newBadges: typeof BADGES[number][] };
  setDailyGoal: (goal: 5 | 10 | 20) => void;
  activateDoubleXP: () => void;
  useFreeze: () => boolean;
  earnFreezeBySharing: () => boolean;
  canShareForFreeze: boolean;
  isLessonCompleted: (lessonId: string, pathId: string) => boolean;
  isVideoWatched: (videoId: string) => boolean;
  isPathCompleted: (pathId: string) => boolean;
}

export function useGamification(): GamificationHook {
  const { user } = useUser();
  const [state, setState] = useState<GamState>(loadFromLS);

  // Sync from Clerk on mount — take whichever has higher XP
  useEffect(() => {
    if (!user?.unsafeMetadata?.gamification) return;
    try {
      const remote = user.unsafeMetadata.gamification as GamState;
      const ls = loadFromLS();
      if (remote.totalXP > ls.totalXP) {
        const merged = { ...DEFAULT_STATE, ...remote };
        setState(merged);
        saveToLS(merged);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncToClerk = useCallback((s: GamState) => {
    if (!user) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      try { await user.update({ unsafeMetadata: { gamification: s } }); } catch {}
    }, 1500);
  }, [user]);

  // Core updater — also handles day/week resets and doubleXP expiry
  const update = useCallback((updater: (prev: GamState) => GamState) => {
    setState(prev => {
      const t = today();
      const withDay = prev.dailyDate !== t ? { ...prev, dailyXP: 0, dailyDate: t } : prev;
      const mon = thisMonday();
      const withWeek = withDay.weekStart !== mon ? { ...withDay, weeklyXP: 0, weekStart: mon } : withDay;
      const withExpiry =
        withWeek.doubleXP &&
        withWeek.doubleXPExpiry &&
        new Date(withWeek.doubleXPExpiry) < new Date()
          ? { ...withWeek, doubleXP: false }
          : withWeek;
      const next = updater(withExpiry);
      saveToLS(next);
      syncToClerk(next);
      return next;
    });
  }, [syncToClerk]);

  const applyStreak = (s: GamState): GamState => {
    const t = today();
    if (s.lastActiveDate === t) return s;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);
    return {
      ...s,
      streak: s.lastActiveDate === yStr ? s.streak + 1 : 1,
      lastActiveDate: t,
    };
  };

  const applyBadgeCheck = (
    s: GamState
  ): { state: GamState; newBadges: typeof BADGES[number][] } => {
    const newBadges: typeof BADGES[number][] = [];
    let bonus = 0;
    for (const badge of BADGES) {
      if (!s.earnedBadgeIds.includes(badge.id) && badge.check(s)) {
        newBadges.push(badge);
        bonus += badge.xp;
      }
    }
    if (newBadges.length === 0) return { state: s, newBadges: [] };
    const next: GamState = {
      ...s,
      totalXP: s.totalXP + bonus,
      earnedBadgeIds: [...s.earnedBadgeIds, ...newBadges.map(b => b.id as BadgeId)],
      monthlyXP: bonus > 0 ? updateMonthlyBucket(s.monthlyXP, bonus) : s.monthlyXP,
    };
    return { state: next, newBadges };
  };

  // ── Actions ──────────────────────────────────────────────────────────────

  const addXP = useCallback((amount: number) => {
    update(prev => {
      const xp = amount * (prev.doubleXP ? 2 : 1);
      return {
        ...prev,
        totalXP: prev.totalXP + xp,
        dailyXP: prev.dailyXP + xp,
        weeklyXP: prev.weeklyXP + xp,
        monthlyXP: updateMonthlyBucket(prev.monthlyXP, xp),
        dailyHistory: updateDailyHistory(prev.dailyHistory, xp),
      };
    });
  }, [update]);

  const completeLesson = useCallback((lessonId: string, pathId: string) => {
    const key = `${pathId}:${lessonId}`;
    let xpGained = 0;
    let newBadges: typeof BADGES[number][] = [];

    update(prev => {
      if (prev.completedLessons.includes(key)) return prev;
      const xp = 50 * (prev.doubleXP ? 2 : 1);
      xpGained = xp;
      let next: GamState = {
        ...prev,
        totalXP: prev.totalXP + xp,
        dailyXP: prev.dailyXP + xp,
        weeklyXP: prev.weeklyXP + xp,
        monthlyXP: updateMonthlyBucket(prev.monthlyXP, xp),
        dailyHistory: updateDailyHistory(prev.dailyHistory, xp),
        completedLessons: [...prev.completedLessons, key],
      };
      next = applyStreak(next);
      const { state: withBadges, newBadges: earned } = applyBadgeCheck(next);
      newBadges = earned;
      return withBadges;
    });

    return { xpGained, newBadges };
  }, [update]);

  const watchVideo = useCallback((videoId: string) => {
    let xpGained = 0;
    update(prev => {
      if (prev.watchedVideos.includes(videoId)) return prev;
      const xp = 20 * (prev.doubleXP ? 2 : 1);
      xpGained = xp;
      let next: GamState = {
        ...prev,
        totalXP: prev.totalXP + xp,
        dailyXP: prev.dailyXP + xp,
        weeklyXP: prev.weeklyXP + xp,
        monthlyXP: updateMonthlyBucket(prev.monthlyXP, xp),
        dailyHistory: updateDailyHistory(prev.dailyHistory, xp),
        watchedVideos: [...prev.watchedVideos, videoId],
      };
      next = applyStreak(next);
      const { state: withBadges } = applyBadgeCheck(next);
      return withBadges;
    });
    return { xpGained };
  }, [update]);

  const passKnowledgeCheck = useCallback((moduleId: string, perfect: boolean) => {
    let xpGained = 0;
    let newBadges: typeof BADGES[number][] = [];
    update(prev => {
      const xp = (perfect ? 30 : 15) * (prev.doubleXP ? 2 : 1);
      xpGained = xp;
      let next: GamState = {
        ...prev,
        totalXP: prev.totalXP + xp,
        dailyXP: prev.dailyXP + xp,
        weeklyXP: prev.weeklyXP + xp,
        monthlyXP: updateMonthlyBucket(prev.monthlyXP, xp),
        dailyHistory: updateDailyHistory(prev.dailyHistory, xp),
        perfectChecks: perfect ? prev.perfectChecks + 1 : prev.perfectChecks,
      };
      next = applyStreak(next);
      const { state: withBadges, newBadges: earned } = applyBadgeCheck(next);
      newBadges = earned;
      return withBadges;
    });
    return { xpGained, newBadges };
  }, [update]);

  const wrongAnswer = useCallback(() => {
    update(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
  }, [update]);

  const restoreHeart = useCallback(() => {
    update(prev => ({ ...prev, hearts: Math.min(prev.maxHearts, prev.hearts + 1) }));
  }, [update]);

  const completePath = useCallback((pathId: string) => {
    let xpGained = 0;
    let newBadges: typeof BADGES[number][] = [];
    update(prev => {
      if (prev.completedPaths.includes(pathId)) return prev;
      const xp = 500 * (prev.doubleXP ? 2 : 1);
      xpGained = xp;
      let next: GamState = {
        ...prev,
        totalXP: prev.totalXP + xp,
        dailyXP: prev.dailyXP + xp,
        weeklyXP: prev.weeklyXP + xp,
        monthlyXP: updateMonthlyBucket(prev.monthlyXP, xp),
        dailyHistory: updateDailyHistory(prev.dailyHistory, xp),
        completedPaths: [...prev.completedPaths, pathId],
      };
      next = applyStreak(next);
      const { state: withBadges, newBadges: earned } = applyBadgeCheck(next);
      newBadges = earned;
      return withBadges;
    });
    return { xpGained, newBadges };
  }, [update]);

  const setDailyGoal = useCallback((goal: 5 | 10 | 20) => {
    update(prev => ({ ...prev, dailyGoal: goal }));
  }, [update]);

  const activateDoubleXP = useCallback(() => {
    update(prev => {
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      return { ...prev, doubleXP: true, doubleXPExpiry: expiry.toISOString() };
    });
  }, [update]);

  const useFreeze = useCallback((): boolean => {
    let used = false;
    update(prev => {
      if (!prev.freezeAvailable) return prev;
      used = true;
      return { ...prev, freezeAvailable: false };
    });
    return used;
  }, [update]);

  // Called when the user shares and a referral completes their first lesson.
  // In practice the referral webhook fires earnFreezeBySharing on the referrer's account.
  // For now, the share action itself awards the freeze (optimistic — one per 7 days).
  const earnFreezeBySharing = useCallback((): boolean => {
    let earned = false;
    update(prev => {
      const last = prev.lastSharedAt;
      const daysSince = last
        ? Math.floor((Date.now() - new Date(last).getTime()) / 86_400_000)
        : 999;
      if (daysSince < 7) return prev; // cooldown not expired
      earned = true;
      return {
        ...prev,
        freezeAvailable: true,
        lastSharedAt: today(),
        referralCount: prev.referralCount + 1,
      };
    });
    return earned;
  }, [update]);

  // Derived ─────────────────────────────────────────────────────────────────
  const levelIdx = getLevelIdx(state.totalXP);
  const levelName = LEVELS[levelIdx].name;
  const xpToNext = xpToNextLevel(state.totalXP);
  const earnedBadges = getEarnedBadges(state);
  const todayDone = state.dailyXP >= state.dailyGoal;
  const canShareForFreeze = !state.lastSharedAt ||
    Math.floor((Date.now() - new Date(state.lastSharedAt).getTime()) / 86_400_000) >= 7;

  return {
    state,
    levelIdx,
    levelName,
    xpToNext,
    earnedBadges,
    todayDone,
    canShareForFreeze,
    addXP,
    completeLesson,
    watchVideo,
    passKnowledgeCheck,
    wrongAnswer,
    restoreHeart,
    completePath,
    setDailyGoal,
    activateDoubleXP,
    useFreeze,
    earnFreezeBySharing,
    isLessonCompleted: (lessonId, pathId) =>
      state.completedLessons.includes(`${pathId}:${lessonId}`),
    isVideoWatched: (videoId) => state.watchedVideos.includes(videoId),
    isPathCompleted: (pathId) => state.completedPaths.includes(pathId),
  };
}
