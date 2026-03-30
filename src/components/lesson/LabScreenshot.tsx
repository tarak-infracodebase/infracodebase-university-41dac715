import { useState, useRef, useCallback } from "react";
import { X } from "lucide-react";

interface LabScreenshotProps {
  stepId: string;
  label?: string;
}

export function LabScreenshot({ stepId, label = "Attach your screenshot" }: LabScreenshotProps) {
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith("image/"));
    if (item) handleFile(item.getAsFile()!);
  }, []);

  return (
    <div className="mt-4" onPaste={handlePaste}>
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/50 mb-2">
        {label}
      </p>

      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Screenshot"
            className="w-full rounded-lg border border-border/30 block"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur border border-border/50 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
            aria-label="Remove screenshot"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-border/30 rounded-lg py-6 px-4 text-center cursor-pointer transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <p className="font-mono text-xs text-muted-foreground/60 mb-1">
            Drop, paste, or click to upload a screenshot
          </p>
          <p className="font-mono text-xs text-muted-foreground/35">
            PNG, JPG, or GIF
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
