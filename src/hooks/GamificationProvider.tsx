import { createContext, useContext, type ReactNode } from "react";
import { useGamification } from "./useGamification";

type GamificationContextType = ReturnType<typeof useGamification>;

const GamificationContext = createContext<GamificationContextType | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const value = useGamification();
  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamificationContext(): GamificationContextType {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error("useGamificationContext must be used within GamificationProvider");
  }
  return ctx;
}
