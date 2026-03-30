import { useRef, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  videoSrc: string;
  subtitle?: string;
  videoId?: string;
}

function getVideoProgress(videoId: string): number {
  try {
    return Number(localStorage.getItem(`vid-progress-${videoId}`) || 0);
  } catch { return 0; }
}

function saveVideoProgress(videoId: string, pct: number) {
  try {
    localStorage.setItem(`vid-progress-${videoId}`, String(Math.round(pct)));
    window.dispatchEvent(new Event("icbu_xp_update"));
  } catch {}
}

export function VideoPlayerModal({ open, onClose, title, videoSrc, subtitle, videoId }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const saveIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const resolvedId = videoId || videoSrc;

  // Restore playback position when video loads
  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current || !resolvedId) return;
    const savedPct = getVideoProgress(resolvedId);
    if (savedPct > 0 && savedPct < 98) {
      videoRef.current.currentTime = (savedPct / 100) * videoRef.current.duration;
    }
  }, [resolvedId]);

  // Save progress periodically while playing
  useEffect(() => {
    if (!open || !resolvedId) return;

    saveIntervalRef.current = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.paused || !video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      saveVideoProgress(resolvedId, pct);
    }, 5000); // Save every 5 seconds

    return () => {
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
    };
  }, [open, resolvedId]);

  // Save progress on close
  const handleClose = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && resolvedId) {
      const pct = (video.currentTime / video.duration) * 100;
      saveVideoProgress(resolvedId, pct);
    }
    onClose();
  }, [onClose, resolvedId]);

  // Mark complete when video ends
  const handleEnded = useCallback(() => {
    if (resolvedId) {
      saveVideoProgress(resolvedId, 100);
    }
  }, [resolvedId]);

  return (
    <Dialog open={open} onOpenChange={v => !v && handleClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 bg-card border-border/50 overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="p-4 pb-2">
          <h3 className="text-sm font-bold leading-snug">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="px-4 pb-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full border-0"
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
