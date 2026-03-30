import { useEffect, useCallback, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

/**
 * Syncs progress data between localStorage and Clerk unsafeMetadata.
 * 
 * On mount (signed in): loads from Clerk → localStorage (cloud wins).
 * On XP/progress changes: debounced save from localStorage → Clerk.
 */

const SYNC_KEYS = [
  "icbu_xp",
  "icbu_level",
  "icbu_track_progress",
  "icbu_monthly_xp",
] as const;

const VIDEO_PREFIX = "vid-progress-";

interface ClerkProgressData {
  xp: number;
  level: number;
  trackProgress: Record<string, unknown>;
  monthlyXp: Array<{ month: string; xp: number }>;
  videoProgress: Record<string, number>;
  lastSynced: string;
}

function readLocalProgress(): ClerkProgressData {
  const xp = parseInt(localStorage.getItem("icbu_xp") || "0", 10);
  const level = parseInt(localStorage.getItem("icbu_level") || "1", 10);

  let trackProgress: Record<string, unknown> = {};
  try {
    const raw = localStorage.getItem("icbu_track_progress");
    if (raw) trackProgress = JSON.parse(raw);
  } catch {}

  let monthlyXp: Array<{ month: string; xp: number }> = [];
  try {
    const raw = localStorage.getItem("icbu_monthly_xp");
    if (raw) monthlyXp = JSON.parse(raw);
  } catch {}

  // Collect video progress
  const videoProgress: Record<string, number> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(VIDEO_PREFIX)) {
      const videoId = key.slice(VIDEO_PREFIX.length);
      videoProgress[videoId] = Number(localStorage.getItem(key) || 0);
    }
  }

  return { xp, level, trackProgress, monthlyXp, videoProgress, lastSynced: new Date().toISOString() };
}

function writeLocalProgress(data: ClerkProgressData) {
  if (data.xp != null) localStorage.setItem("icbu_xp", String(data.xp));
  if (data.level != null) localStorage.setItem("icbu_level", String(data.level));
  if (data.trackProgress) localStorage.setItem("icbu_track_progress", JSON.stringify(data.trackProgress));
  if (data.monthlyXp?.length) localStorage.setItem("icbu_monthly_xp", JSON.stringify(data.monthlyXp));
  if (data.videoProgress) {
    Object.entries(data.videoProgress).forEach(([id, pct]) => {
      localStorage.setItem(`${VIDEO_PREFIX}${id}`, String(Math.round(pct)));
    });
  }
}

export function useProgressSync() {
  const { user, isSignedIn, isLoaded } = useUser();
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const initialLoadDone = useRef(false);

  // Save localStorage → Clerk (debounced)
  const syncToClerk = useCallback(() => {
    if (!user) return;

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        const data = readLocalProgress();
        const existing = (user.unsafeMetadata as Record<string, unknown>) || {};
        await user.update({
          unsafeMetadata: {
            ...existing,
            progress: data,
          },
        });
      } catch (e) {
        console.warn("[ProgressSync] Failed to save to Clerk:", e);
      }
    }, 2000); // 2s debounce to batch rapid updates
  }, [user]);

  // On mount: load from Clerk → localStorage
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || initialLoadDone.current) return;

    const meta = user.unsafeMetadata as Record<string, unknown>;
    const cloudData = meta?.progress as ClerkProgressData | undefined;

    if (cloudData) {
      // Cloud data exists — merge intelligently (cloud wins for higher values)
      const localData = readLocalProgress();

      const merged: ClerkProgressData = {
        xp: Math.max(cloudData.xp || 0, localData.xp || 0),
        level: Math.max(cloudData.level || 1, localData.level || 1),
        trackProgress: { ...localData.trackProgress, ...cloudData.trackProgress },
        monthlyXp: cloudData.monthlyXp?.length ? cloudData.monthlyXp : localData.monthlyXp,
        videoProgress: { ...localData.videoProgress, ...cloudData.videoProgress },
        lastSynced: new Date().toISOString(),
      };

      // For video progress, keep the higher value
      if (cloudData.videoProgress && localData.videoProgress) {
        const allVideoIds = new Set([
          ...Object.keys(cloudData.videoProgress),
          ...Object.keys(localData.videoProgress),
        ]);
        allVideoIds.forEach(id => {
          merged.videoProgress[id] = Math.max(
            cloudData.videoProgress?.[id] || 0,
            localData.videoProgress?.[id] || 0
          );
        });
      }

      writeLocalProgress(merged);
      window.dispatchEvent(new Event("icbu_xp_update"));
    }

    initialLoadDone.current = true;
  }, [isLoaded, isSignedIn, user]);

  // Listen for progress changes and sync to Clerk
  useEffect(() => {
    if (!isSignedIn || !user) return;

    const handleSync = () => syncToClerk();

    window.addEventListener("icbu_xp_update", handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener("icbu_xp_update", handleSync);
      window.removeEventListener("storage", handleSync);
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [isSignedIn, user, syncToClerk]);

  return { syncToClerk };
}
