import { useState, useCallback } from "react";

export interface ProfileData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  bannerUrl: string | null;
  customAvatarUrl: string | null;
}

const defaults: ProfileData = {
  displayName: "",
  bio: "",
  location: "",
  website: "",
  bannerUrl: null,
  customAvatarUrl: null,
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
