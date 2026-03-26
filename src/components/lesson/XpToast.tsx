import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";

interface XpToastProps {
  amount: number;
  id: number;
  onDismiss: (id: number) => void;
}

export function XpToast({ amount, id, onDismiss }: XpToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-crystal-yellow/30 bg-card px-4 py-3 shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
    >
      <Zap className="h-4 w-4 text-crystal-yellow shrink-0" />
      <span className="text-sm font-semibold text-crystal-yellow">+{amount} XP</span>
      <button
        onClick={() => onDismiss(id)}
        className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

let toastIdCounter = 0;
type ToastEntry = { id: number; amount: number };

export function useXpToast() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const showXp = (amount: number) => {
    const id = ++toastIdCounter;
    setToasts(prev => [{ id, amount }, ...prev]);
  };

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, showXp, dismiss };
}

export function XpToastContainer({ toasts, onDismiss }: { toasts: ToastEntry[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <XpToast key={t.id} id={t.id} amount={t.amount} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
