import { useCallback } from "react";
import { useUser } from "@clerk/clerk-react";

export type LessonStatus = "in_progress" | "completed" | "not_started";

export interface LessonHistoryEntry {
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  moduleId: string;
  coursePath: string;
  cloudProvider?: "azure" | "aws" | "gcp" | "k8s" | "terraform" | "general";
  totalLessons: number;
  completedLessons: number;
  status: LessonStatus;
  lastAccessedAt: string; // ISO string
}

const MAX_HISTORY = 50;

export function useProgressHistory() {
  const { user, isLoaded } = useUser();

  const readHistory = useCallback((): LessonHistoryEntry[] => {
    if (!user) return [];
    const raw = user.unsafeMetadata?.lessonHistory;
    return Array.isArray(raw) ? (raw as LessonHistoryEntry[]) : [];
  }, [user]);

  const writeHistory = useCallback(
    async (entries: LessonHistoryEntry[]) => {
      if (!user) return;
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          lessonHistory: entries,
        },
      });
    },
    [user]
  );

  const trackLesson = useCallback(
    async (entry: Omit<LessonHistoryEntry, "lastAccessedAt">) => {
      if (!user || !isLoaded) return;
      const history = readHistory();
      const filtered = history.filter((h) => h.lessonId !== entry.lessonId);
      const updated: LessonHistoryEntry = {
        ...entry,
        lastAccessedAt: new Date().toISOString(),
      };
      const next = [updated, ...filtered].slice(0, MAX_HISTORY);
      await writeHistory(next);
    },
    [user, isLoaded, readHistory, writeHistory]
  );

  const updateLessonStatus = useCallback(
    async (
      lessonId: string,
      status: LessonStatus,
      completedLessons?: number
    ) => {
      if (!user) return;
      const history = readHistory();
      const idx = history.findIndex((h) => h.lessonId === lessonId);
      if (idx === -1) return;
      history[idx] = {
        ...history[idx],
        status,
        lastAccessedAt: new Date().toISOString(),
        ...(completedLessons !== undefined ? { completedLessons } : {}),
      };
      await writeHistory(history);
    },
    [user, readHistory, writeHistory]
  );

  const getInProgress = useCallback((): LessonHistoryEntry[] => {
    return readHistory().filter((h) => h.status === "in_progress");
  }, [readHistory]);

  const getRecentlyVisited = useCallback((): LessonHistoryEntry[] => {
    return readHistory()
      .sort(
        (a, b) =>
          new Date(b.lastAccessedAt).getTime() -
          new Date(a.lastAccessedAt).getTime()
      )
      .slice(0, 10);
  }, [readHistory]);

  const getCompleted = useCallback((): LessonHistoryEntry[] => {
    return readHistory().filter((h) => h.status === "completed");
  }, [readHistory]);

  return {
    isLoaded,
    trackLesson,
    updateLessonStatus,
    getInProgress,
    getRecentlyVisited,
    getCompleted,
  };
}
