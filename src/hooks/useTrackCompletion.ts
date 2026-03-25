import { useMemo } from "react";
import { learningPaths, type LearningPath } from "@/data/courseData";
import { handsOnTracks } from "@/data/handsOnData";

/**
 * Checks whether a given learning path (track) is fully completed.
 * Completion requires ALL of:
 * 1. All validation checklists checked
 * 2. All knowledge checks passed (perfect score)
 * 3. All hands-on exercises submitted (non-empty)
 */

function isChecklistComplete(lessonId: string, itemCount: number): boolean {
  try {
    const raw = localStorage.getItem(`icbu_checklist_${lessonId}`);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length === itemCount && parsed.every(Boolean);
  } catch {
    return false;
  }
}

function isKnowledgeCheckPassed(moduleId: string, questionCount: number): boolean {
  try {
    const raw = localStorage.getItem(`icbu_kc_${moduleId}`);
    if (!raw) return false;
    return Number(raw) === questionCount;
  } catch {
    return false;
  }
}

function hasExerciseSubmission(exerciseId: string): boolean {
  const prefixes = ["icbu_writing_", "icbu_build_platform_", "icbu_build_external_"];
  for (const prefix of prefixes) {
    try {
      const raw = localStorage.getItem(`${prefix}${exerciseId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Check if any meaningful content exists
        if (parsed.answer && parsed.answer.trim()) return true;
        if (parsed.fileData) return true;
        if (parsed.entries && parsed.entries.length > 0) return true;
        if (parsed.notes && parsed.notes.trim()) return true;
      }
    } catch {}
  }
  return false;
}

interface CompletionDetails {
  isComplete: boolean;
  checklistComplete: boolean;
  knowledgeChecksComplete: boolean;
  handsOnComplete: boolean;
  totalChecklists: number;
  completedChecklists: number;
  totalKnowledgeChecks: number;
  completedKnowledgeChecks: number;
  totalExercises: number;
  completedExercises: number;
}

export function getTrackCompletionDetails(trackId: string): CompletionDetails {
  const path = learningPaths.find(lp => lp.id === trackId);
  if (!path) {
    return {
      isComplete: false,
      checklistComplete: false,
      knowledgeChecksComplete: false,
      handsOnComplete: false,
      totalChecklists: 0, completedChecklists: 0,
      totalKnowledgeChecks: 0, completedKnowledgeChecks: 0,
      totalExercises: 0, completedExercises: 0,
    };
  }

  // 1. Check all curriculum lesson checklists
  let totalChecklists = 0;
  let completedChecklists = 0;
  let totalKC = 0;
  let completedKC = 0;
  let totalExercises = 0;
  let completedExercises = 0;

  for (const course of path.courses) {
    for (const lesson of course.lessons) {
      // Checklist
      if (lesson.validationChecklist && lesson.validationChecklist.length > 0) {
        totalChecklists++;
        if (isChecklistComplete(lesson.id, lesson.validationChecklist.length)) {
          completedChecklists++;
        }
      }

      // Knowledge check (curriculum lessons)
      if (lesson.knowledgeCheck) {
        totalKC++;
        if (isKnowledgeCheckPassed(lesson.id, 1)) {
          completedKC++;
        }
      }

      // Exercise submission (curriculum lessons)
      totalExercises++;
      const exerciseId = `${trackId}_${lesson.id}`;
      if (hasExerciseSubmission(exerciseId)) {
        completedExercises++;
      }
    }
  }

  // 2. Check corresponding hands-on track
  const handsOnTrack = handsOnTracks.find(t => t.curriculumTrackId === trackId);
  if (handsOnTrack) {
    for (const mod of handsOnTrack.modules) {
      const hoId = `handsOn_${handsOnTrack.id}_${mod.id}`;

      // Hands-on checklist
      if (mod.sections.validationChecklist && mod.sections.validationChecklist.length > 0) {
        totalChecklists++;
        if (isChecklistComplete(hoId, mod.sections.validationChecklist.length)) {
          completedChecklists++;
        }
      }

      // Hands-on knowledge check
      totalKC++;
      if (isKnowledgeCheckPassed(hoId, 1)) {
        completedKC++;
      }

      // Hands-on exercise submission
      totalExercises++;
      if (hasExerciseSubmission(hoId)) {
        completedExercises++;
      }
    }
  }

  const checklistComplete = totalChecklists === 0 || completedChecklists === totalChecklists;
  const knowledgeChecksComplete = totalKC === 0 || completedKC === totalKC;
  const handsOnComplete = totalExercises === 0 || completedExercises === totalExercises;

  return {
    isComplete: checklistComplete && knowledgeChecksComplete && handsOnComplete,
    checklistComplete,
    knowledgeChecksComplete,
    handsOnComplete,
    totalChecklists,
    completedChecklists,
    totalKnowledgeChecks: totalKC,
    completedKnowledgeChecks: completedKC,
    totalExercises,
    completedExercises,
  };
}

export function useTrackCompletion(trackId: string): CompletionDetails {
  return useMemo(() => getTrackCompletionDetails(trackId), [trackId]);
}

/** Check if ALL tracks are complete (for master certificate) */
export function useAllTracksCompletion(): { allComplete: boolean; completedCount: number; totalCount: number } {
  return useMemo(() => {
    const trackIds = learningPaths.map(lp => lp.id);
    let completedCount = 0;
    for (const id of trackIds) {
      if (getTrackCompletionDetails(id).isComplete) {
        completedCount++;
      }
    }
    return {
      allComplete: completedCount === trackIds.length,
      completedCount,
      totalCount: trackIds.length,
    };
  }, []);
}
