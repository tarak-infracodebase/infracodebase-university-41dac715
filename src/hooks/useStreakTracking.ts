import { useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";

/**
 * Tracks consecutive days of learning activity.
 * Stores streak data in Clerk unsafeMetadata and localStorage.
 * 
 * Call `recordActivity()` whenever the user completes a meaningful action
 * (lesson completion, knowledge check, exercise submission).
 */

const STREAK_KEY = "icbu_streak";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // YYYY-MM-DD
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastActivityDate: "" };
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("icbu_xp_update")); // triggers Clerk sync
  } catch {}
}

export function useStreakTracking() {
  const { user, isSignedIn, isLoaded } = useUser();

  // Load streak from Clerk on mount
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const meta = user.unsafeMetadata as Record<string, unknown>;
    const cloudStreak = meta?.streak as StreakData | undefined;
    
    if (cloudStreak) {
      const localStreak = loadStreak();
      // Merge: keep higher values
      const merged: StreakData = {
        currentStreak: Math.max(cloudStreak.currentStreak || 0, localStreak.currentStreak || 0),
        longestStreak: Math.max(cloudStreak.longestStreak || 0, localStreak.longestStreak || 0),
        lastActivityDate: cloudStreak.lastActivityDate > localStreak.lastActivityDate
          ? cloudStreak.lastActivityDate
          : localStreak.lastActivityDate,
      };
      saveStreak(merged);
    }
  }, [isLoaded, isSignedIn, user]);

  const recordActivity = useCallback(async () => {
    const today = getToday();
    const streak = loadStreak();

    // Already recorded today
    if (streak.lastActivityDate === today) return streak;

    const daysSinceLast = streak.lastActivityDate
      ? getDaysBetween(streak.lastActivityDate, today)
      : -1;

    let newStreak: StreakData;

    if (daysSinceLast === 1) {
      // Consecutive day
      newStreak = {
        currentStreak: streak.currentStreak + 1,
        longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
        lastActivityDate: today,
      };
    } else if (daysSinceLast <= 0 || daysSinceLast > 1) {
      // First activity or streak broken
      newStreak = {
        currentStreak: 1,
        longestStreak: Math.max(streak.longestStreak, 1),
        lastActivityDate: today,
      };
    } else {
      newStreak = { ...streak, lastActivityDate: today };
    }

    saveStreak(newStreak);

    // Save to Clerk
    if (user) {
      try {
        const existing = (user.unsafeMetadata as Record<string, unknown>) || {};
        await user.update({
          unsafeMetadata: { ...existing, streak: newStreak },
        });
      } catch (e) {
        console.warn("[Streak] Failed to save to Clerk:", e);
      }
    }

    return newStreak;
  }, [user]);

  const getStreak = useCallback((): StreakData => {
    const streak = loadStreak();
    const today = getToday();

    // If last activity was more than 1 day ago, streak is broken
    if (streak.lastActivityDate && getDaysBetween(streak.lastActivityDate, today) > 1) {
      return { ...streak, currentStreak: 0 };
    }

    return streak;
  }, []);

  return { recordActivity, getStreak };
}
