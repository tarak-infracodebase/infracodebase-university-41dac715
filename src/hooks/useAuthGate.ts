import { useAuth } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { useCallback } from "react";

/**
 * Returns a guard function that checks if the user is signed in.
 * If not, shows a toast and returns false.
 * Usage: const { requireAuth } = useAuthGate();
 *        if (!requireAuth()) return;
 */
export function useAuthGate() {
  const { isSignedIn } = useAuth();

  const requireAuth = useCallback((): boolean => {
    if (isSignedIn) return true;
    toast({
      title: "Sign in required",
      description: "Create a free account to save your progress and submit work.",
      action: undefined,
    });
    return false;
  }, [isSignedIn]);

  return { requireAuth, isSignedIn: !!isSignedIn };
}
