/**
 * Core gamification logic: XP, levels, badges, hearts, daily goals, double XP.
 * State is persisted in localStorage under "icbu_gamification".
 */

import { useCallback, useMemo, useReducer, useEffect } from "react";

// ── Level thresholds ────────────────────────────────────────────────────────

export const LEVELS = [
  { name: "Explorer",          minXP: 0 },
  { name: "Apprentice",        minXP: 500 },
  { name: "Builder",           minXP: 1200 },
  { name: "Specialist",        minXP: 2500 },
  { name: "Platform Engineer", minXP: 4500 },
  { name: "Senior Engineer",   minXP: 7000 },
  { name: "Staff Engineer",    minXP: 10000 },
  { name: "Principal",         minXP: 14000 },
  { name: "Distinguished",     minXP: 19000 },
  { name: "Architect",         minXP: 25000 },
] as const;

// ── Badges / Milestones ─────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  xp: number;
  condition: (s: GamificationState) => boolean;
}

export const BADGES: Badge[] = [
  { id: "first_lesson",   name: "First Lesson",     xp: 50,   condition: s => s.completedLessons.length >= 1 },
  { id: "track_complete", name: "Track Complete",    xp: 500,  condition: s => s.tracksCompleted >= 1 },
  { id: "streak_5",       name: "5-Day Streak",      xp: 100,  condition: s => s.longestStreak >= 5 },
  { id: "ten_lessons",    name: "10 Lessons",        xp: 200,  condition: s => s.completedLessons.length >= 10 },
  { id: "streak_14",      name: "14-Day Streak",     xp: 300,  condition: s => s.longestStreak >= 14 },
  { id: "all_tracks",     name: "All Tracks Done",   xp: 1000, condition: s => s.allTracksDone },
];

// ── State shape ─────────────────────────────────────────────────────────────

export interface GamificationState {
  totalXP: number;
  completedLessons: string[];  // "trackId:lessonId"
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;      // ISO date string
  hearts: number;              // max 5
  dailyGoal: number;           // daily XP target (default 100)
  dailyXPEarned: number;       // XP earned today
  dailyDate: string;           // date for dailyXPEarned tracking
  doubleXP: boolean;
  doubleXPExpiry: string;      // ISO timestamp
  monthlyXP: Array<{ month: string; xp: number }>;
  earnedBadgeIds: string[];
  tracksCompleted: number;
  allTracksDone: boolean;
}

const DEFAULT_STATE: GamificationState = {
  totalXP: 0,
  completedLessons: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  hearts: 5,
  dailyGoal: 100,
  dailyXPEarned: 0,
  dailyDate: "",
  doubleXP: false,
  doubleXPExpiry: "",
  monthlyXP: [],
  earnedBadgeIds: [],
  tracksCompleted: 0,
  allTracksDone: false,
};

const STORAGE_KEY = "icbu_gamification";

// ── Actions ─────────────────────────────────────────────────────────────────

type Action =
  | { type: "EARN_XP"; payload: { amount: number; lessonKey?: string } }
  | { type: "COMPLETE_LESSON"; payload: string }
  | { type: "SET_TRACKS_COMPLETED"; payload: { count: number; total: number } }
  | { type: "RECORD_ACTIVITY" }
  | { type: "ACTIVATE_DOUBLE_XP" }
  | { type: "LOSE_HEART" }
  | { type: "RESTORE_HEARTS" }
  | { type: "SET_DAILY_GOAL"; payload: number }
  | { type: "HYDRATE"; payload: GamificationState };

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function reducer(state: GamificationState, action: Action): GamificationState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "EARN_XP": {
      const today = getToday();
      const multiplier = state.doubleXP && state.doubleXPExpiry > new Date().toISOString() ? 2 : 1;
      const earned = action.payload.amount * multiplier;
      const dailyXP = state.dailyDate === today
        ? state.dailyXPEarned + earned
        : earned;

      const newState = {
        ...state,
        totalXP: state.totalXP + earned,
        dailyXPEarned: dailyXP,
        dailyDate: today,
      };

      if (action.payload.lessonKey && !state.completedLessons.includes(action.payload.lessonKey)) {
        newState.completedLessons = [...state.completedLessons, action.payload.lessonKey];
      }

      return newState;
    }

    case "COMPLETE_LESSON": {
      if (state.completedLessons.includes(action.payload)) return state;
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.payload],
      };
    }

    case "SET_TRACKS_COMPLETED":
      return {
        ...state,
        tracksCompleted: action.payload.count,
        allTracksDone: action.payload.count >= action.payload.total,
      };

    case "RECORD_ACTIVITY": {
      const today = getToday();
      if (state.lastActiveDate === today) return state;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const isConsecutive = state.lastActiveDate === yesterdayStr;
      const newCurrent = isConsecutive ? state.currentStreak + 1 : 1;

      return {
        ...state,
        currentStreak: newCurrent,
        longestStreak: Math.max(state.longestStreak, newCurrent),
        lastActiveDate: today,
      };
    }

    case "ACTIVATE_DOUBLE_XP": {
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 1);
      return { ...state, doubleXP: true, doubleXPExpiry: expiry.toISOString() };
    }

    case "LOSE_HEART":
      return { ...state, hearts: Math.max(0, state.hearts - 1) };

    case "RESTORE_HEARTS":
      return { ...state, hearts: 5 };

    case "SET_DAILY_GOAL":
      return { ...state, dailyGoal: action.payload };

    default:
      return state;
  }
}

// ── Hook ────────────────────────────────────────────────────────────────────

function loadState(): GamificationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch {}

  // Migrate from legacy keys
  const legacyXP = parseInt(localStorage.getItem("icbu_xp") || "0", 10);
  const legacyLevel = parseInt(localStorage.getItem("icbu_level") || "1", 10);
  if (legacyXP > 0) {
    return { ...DEFAULT_STATE, totalXP: legacyXP };
  }

  return DEFAULT_STATE;
}

function saveState(state: GamificationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Keep legacy keys in sync for backward compat
    localStorage.setItem("icbu_xp", String(state.totalXP));
    window.dispatchEvent(new Event("icbu_xp_update"));
  } catch {}
}

export function useGamification() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE, loadState);

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Compute level
  const levelIdx = useMemo(() => {
    let idx = 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (state.totalXP >= LEVELS[i].minXP) { idx = i; break; }
    }
    return idx;
  }, [state.totalXP]);

  const levelName = LEVELS[levelIdx].name;
  const xpToNext = levelIdx < LEVELS.length - 1
    ? LEVELS[levelIdx + 1].minXP - state.totalXP
    : 0;

  // Earned badges
  const earnedBadges = useMemo(
    () => BADGES.filter(b => b.condition(state)),
    [state]
  );

  // Check streak risk (last active yesterday and not yet today)
  const streakAtRisk = useMemo(() => {
    if (state.currentStreak === 0) return false;
    const today = getToday();
    if (state.lastActiveDate === today) return false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return state.lastActiveDate === yesterday.toISOString().split("T")[0];
  }, [state.lastActiveDate, state.currentStreak]);

  const earnXP = useCallback((amount: number, lessonKey?: string) => {
    dispatch({ type: "EARN_XP", payload: { amount, lessonKey } });
    dispatch({ type: "RECORD_ACTIVITY" });
  }, []);

  const completeLesson = useCallback((key: string) => {
    dispatch({ type: "COMPLETE_LESSON", payload: key });
  }, []);

  const setTracksCompleted = useCallback((count: number, total: number) => {
    dispatch({ type: "SET_TRACKS_COMPLETED", payload: { count, total } });
  }, []);

  const activateDoubleXP = useCallback(() => {
    dispatch({ type: "ACTIVATE_DOUBLE_XP" });
  }, []);

  const loseHeart = useCallback(() => {
    dispatch({ type: "LOSE_HEART" });
  }, []);

  const restoreHearts = useCallback(() => {
    dispatch({ type: "RESTORE_HEARTS" });
  }, []);

  const recordActivity = useCallback(() => {
    dispatch({ type: "RECORD_ACTIVITY" });
  }, []);

  return {
    state,
    levelIdx,
    levelName,
    xpToNext,
    earnedBadges,
    streakAtRisk,
    earnXP,
    completeLesson,
    setTracksCompleted,
    activateDoubleXP,
    loseHeart,
    restoreHearts,
    recordActivity,
  };
}
