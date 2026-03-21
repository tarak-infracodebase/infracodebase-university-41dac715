import { useState, useCallback } from "react";

export interface ProfileData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  bannerUrl: string | null;
  customAvatarUrl: string | null;
  customHandle: string;
}

const defaults: ProfileData = {
  displayName: "",
  bio: "",
  location: "",
  website: "",
  bannerUrl: null,
  customAvatarUrl: null,
  customHandle: "",
};

function getStorageKey(userId: string) {
  return `icu_profile_${userId}`;
}

export function useProfileData(userId: string | undefined) {
  const [data, setData] = useState<ProfileData>(() => {
    if (!userId) return defaults;
    try {
      const raw = localStorage.getItem(getStorageKey(userId));
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    } catch {
      return defaults;
    }
  });

  const save = useCallback(
    (updates: Partial<ProfileData>) => {
      if (!userId) return;
      const next = { ...data, ...updates };
      setData(next);
      localStorage.setItem(getStorageKey(userId), JSON.stringify(next));
    },
    [userId, data]
  );

  return { profileData: data, saveProfile: save };
}

/** Read-only lookup for any user id (used on public profiles) */
export function getProfileDataForUser(userId: string): ProfileData {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

/** Check if a custom handle is already taken by another user */
export function isHandleTaken(handle: string, currentUserId: string): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("icu_profile_")) continue;
      const uid = key.replace("icu_profile_", "");
      if (uid === currentUserId) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw) as Partial<ProfileData>;
      if (data.customHandle && data.customHandle.toLowerCase() === handle.toLowerCase()) return true;
    }
  } catch {}
  return false;
}
