import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { LessonHistoryEntry } from "@/hooks/useProgressHistory";
import { learningPaths } from "@/data/courseData";

const BACKFILL_KEY = "icb_history_backfilled_v2";

/** Build a lookup: pathId → { title, totalLessons, cloudProvider } */
function buildPathMeta() {
  const map: Record<string, { title: string; totalLessons: number; cloudProvider: string }> = {};
  for (const path of learningPaths) {
    const total = path.courses.reduce((n, c) => n + c.lessons.length, 0);
    const provider = path.id.includes("azure") ? "azure"
      : path.id.includes("aws") ? "aws"
      : path.id.includes("gcp") ? "gcp"
      : path.id.includes("k8s") || path.id.includes("kubernetes") ? "k8s"
      : path.id.includes("terraform") ? "terraform"
      : "general";
    map[path.id] = { title: path.title, totalLessons: total, cloudProvider: provider };
  }
  return map;
}

type TrackProgress = Record<
  string,
  { completed?: number; completedLessons?: string[]; status?: string }
>;

function mapTrackProgress(progress: TrackProgress): LessonHistoryEntry[] {
  const meta = buildPathMeta();
  const entries: LessonHistoryEntry[] = [];

  Object.entries(progress).forEach(([pathId, data]) => {
    const completedCount = data.completed ?? 0;
    const completedLessons = data.completedLessons ?? [];
    if (completedCount === 0 && completedLessons.length === 0) return;

    const pathMeta = meta[pathId];
    entries.push({
      lessonId: `${pathId}_backfill`,
      lessonTitle: pathMeta?.title ?? pathId,
      moduleTitle: pathMeta?.title ?? pathId,
      moduleId: pathId,
      coursePath: `/path/${pathId}`,
      cloudProvider: (pathMeta?.cloudProvider ?? "general") as LessonHistoryEntry["cloudProvider"],
      totalLessons: pathMeta?.totalLessons ?? Math.max(completedCount, completedLessons.length),
      completedLessons: completedCount,
      status: data.status === "completed" ? "completed" : "in_progress",
      lastAccessedAt: new Date().toISOString(),
    });
  });

  return entries;
}

export function useBackfillHistory() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Use sessionStorage so backfill re-runs on fresh login but not on every render
    if (sessionStorage.getItem("icbu_backfill_done") === "1") return;

    const meta = (user.unsafeMetadata ?? {}) as Record<string, unknown>;

    // Skip if lessonHistory already has entries
    const existing = Array.isArray(meta.lessonHistory)
      ? (meta.lessonHistory as LessonHistoryEntry[])
      : [];
    if (existing.length > 0) {
      sessionStorage.setItem("icbu_backfill_done", "1");
      return;
    }

    // Merge from BOTH Clerk and localStorage, Clerk wins on conflicts
    const seen = new Set<string>();
    const backfilled: LessonHistoryEntry[] = [];

    const addEntries = (entries: LessonHistoryEntry[]) => {
      for (const e of entries) {
        if (!seen.has(e.lessonId)) {
          seen.add(e.lessonId);
          backfilled.push(e);
        }
      }
    };

    // Source 1: Clerk unsafeMetadata.progress.trackProgress (cloud — added first so it wins)
    try {
      const cloudProgress = (meta.progress as Record<string, unknown>)?.trackProgress as TrackProgress | undefined;
      if (cloudProgress && typeof cloudProgress === "object") {
        addEntries(mapTrackProgress(cloudProgress));
      }
    } catch { /* ignore */ }

    // Source 2: localStorage icbu_track_progress
    try {
      const raw = localStorage.getItem("icbu_track_progress");
      if (raw) {
        const localProgress = JSON.parse(raw) as TrackProgress;
        addEntries(mapTrackProgress(localProgress));

        // Also merge local trackProgress back into Clerk so it's not lost
        const cloudTP = ((meta.progress as Record<string, unknown>)?.trackProgress ?? {}) as TrackProgress;
        const merged = { ...localProgress, ...cloudTP }; // Clerk wins
        localStorage.setItem("icbu_track_progress", JSON.stringify(merged));
      }
    } catch { /* ignore */ }

    if (backfilled.length === 0) {
      sessionStorage.setItem("icbu_backfill_done", "1");
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
        sessionStorage.setItem("icbu_backfill_done", "1");
      })
      .catch(console.error);
  }, [isLoaded, user]);
}
