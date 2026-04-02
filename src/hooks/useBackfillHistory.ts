import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { LessonHistoryEntry } from "@/hooks/useProgressHistory";

const BACKFILL_KEY = "icb_history_backfilled_v1";

export function useBackfillHistory() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const alreadyRan = localStorage.getItem(`${BACKFILL_KEY}_${user.id}`);
    if (alreadyRan) return;

    const meta = user.unsafeMetadata ?? {};

    // Skip if lessonHistory already has entries
    const existing = Array.isArray(meta.lessonHistory)
      ? (meta.lessonHistory as LessonHistoryEntry[])
      : [];
    if (existing.length > 0) {
      localStorage.setItem(`${BACKFILL_KEY}_${user.id}`, "1");
      return;
    }

    // Read track progress from localStorage (icbu_track_progress)
    const backfilled: LessonHistoryEntry[] = [];

    try {
      const raw = localStorage.getItem("icbu_track_progress");
      if (raw) {
        const progress = JSON.parse(raw) as Record<
          string,
          { completed?: number; completedLessons?: string[]; status?: string }
        >;
        Object.entries(progress).forEach(([pathId, data]) => {
          const completedCount = data.completed ?? 0;
          const completedLessons = data.completedLessons ?? [];
          if (completedCount === 0 && completedLessons.length === 0) return;

          backfilled.push({
            lessonId: `${pathId}_backfill`,
            lessonTitle: "In progress",
            moduleTitle: pathId,
            moduleId: pathId,
            coursePath: `/path/${pathId}`,
            cloudProvider: "general",
            totalLessons: Math.max(completedCount, completedLessons.length),
            completedLessons: completedCount,
            status: data.status === "completed" ? "completed" : "in_progress",
            lastAccessedAt: new Date().toISOString(),
          });
        });
      }
    } catch {
      // ignore parse errors
    }

    if (backfilled.length === 0) {
      localStorage.setItem(`${BACKFILL_KEY}_${user.id}`, "1");
      return;
    }

    user
      .update({
        unsafeMetadata: {
          ...meta,
          lessonHistory: backfilled,
        },
      })
      .then(() => {
        localStorage.setItem(`${BACKFILL_KEY}_${user.id}`, "1");
      })
      .catch(console.error);
  }, [isLoaded, user]);
}
