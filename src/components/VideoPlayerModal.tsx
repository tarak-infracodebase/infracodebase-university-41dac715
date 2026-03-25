import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  videoSrc: string;
  subtitle?: string;
}

export function VideoPlayerModal({ open, onClose, title, videoSrc, subtitle }: VideoPlayerModalProps) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 bg-card border-border/50 overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="p-4 pb-2">
          <h3 className="text-sm font-bold leading-snug">{title}</h3>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="px-4 pb-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full border-0"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
