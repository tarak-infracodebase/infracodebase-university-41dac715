import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";

export interface UserProgress {
  completedDays: number[];
}

const DEFAULT_PROGRESS: UserProgress = { completedDays: [] };

export function useChallenge() {
  const { user } = useUser();
  const storageKey = user?.id
    ? `icb-30day-progress-${user.id}`
    : "icb-30day-progress-anonymous";

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : { ...DEFAULT_PROGRESS };
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  });

  // Re-read when user ID becomes available
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setProgress(JSON.parse(stored));
      else setProgress({ ...DEFAULT_PROGRESS });
    } catch {}
  }, [storageKey]);

  const saveProgress = useCallback(
    (next: UserProgress) => {
      setProgress(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
    },
    [storageKey]
  );

  const completeDay = useCallback(
    (day: number) => {
      setProgress((prev) => {
        if (prev.completedDays.includes(day)) return prev;
        const next = { completedDays: [...prev.completedDays, day].sort((a, b) => a - b) };
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [storageKey]
  );

  return { progress, saveProgress, completeDay };
}

export function getActiveDay(completedDays: number[]): number {
  if (completedDays.length === 0) return 1;
  const max = Math.max(...completedDays);
  return max >= 30 ? 31 : max + 1;
}

export function getDayStatus(
  day: number,
  completedDays: number[]
): "done" | "active" | "locked" {
  if (completedDays.includes(day)) return "done";
  if (day === getActiveDay(completedDays)) return "active";
  return "locked";
}
