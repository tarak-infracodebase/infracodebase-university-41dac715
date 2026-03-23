import { useAuth } from "@clerk/clerk-react";
import { useCallback, useState } from "react";

/**
 * Returns a guard function that checks if the user is signed in.
 * If not, opens a sign-in modal and returns false.
 */
export function useAuthGate() {
  const { isSignedIn } = useAuth();
  const [showGate, setShowGate] = useState(false);

  const requireAuth = useCallback((): boolean => {
    if (isSignedIn) return true;
    setShowGate(true);
    return false;
  }, [isSignedIn]);

  const dismissGate = useCallback(() => setShowGate(false), []);

  return { requireAuth, isSignedIn: !!isSignedIn, showGate, dismissGate };
}
