import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

type ExerciseType = "writing" | "build-external" | "build-platform";

interface HandsOnSubmissionProps {
  exerciseId: string;
  exerciseType?: ExerciseType;
  exerciseDescription?: string;
  exerciseTitle?: string;
}

const SUBMISSION_TYPE_OVERRIDES: Record<string, ExerciseType> = {
  "Auto-Generate Diagrams": "build-platform",
  "Reorganize Diagram": "build-platform",
  "Create Architecture Documentation": "build-platform",
  "Update Documentation": "build-platform",
  "Create a Ruleset": "build-platform",
  "Identify Your Starting Point": "writing",
  "Map the Program": "writing",
  "Choose Your Starting Tier": "writing",
  "Tier Content Review": "writing",
};

const WRITING_SIGNALS = /\b(write|identify|think about|review|describe|explain|answer|choose|compare|list|map|define|reflect|assess)\b/i;
const PLATFORM_SIGNALS = /\b(screenshot|auto-generate|generate diagram|create a ruleset|update documentation|inside infracodebase|in your workspace|open your workspace|in the platform)\b/i;

function inferType(description?: string, explicit?: ExerciseType, title?: string): ExerciseType {
  if (explicit) return explicit;
  // Check title override first
  if (title && SUBMISSION_TYPE_OVERRIDES[title]) return SUBMISSION_TYPE_OVERRIDES[title];
  if (!description) return "build-external";
  if (PLATFORM_SIGNALS.test(description)) return "build-platform";
  if (!WRITING_SIGNALS.test(description)) return "build-external";
  const BUILD_SIGNALS = /\b(create|build|deploy|set up|configure|generate|provision|launch|implement|connect|install|ask the agent)\b/i;
  if (BUILD_SIGNALS.test(description) && !description.toLowerCase().startsWith("write")) return "build-external";
  return "writing";
}

function getStorageKey(type: ExerciseType, exerciseId: string): string {
  switch (type) {
    case "writing": return `icbu_writing_${exerciseId}`;
    case "build-platform": return `icbu_build_platform_${exerciseId}`;
    case "build-external": return `icbu_build_external_${exerciseId}`;
  }
}

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const ACCEPTED_TYPES = "image/png,image/jpeg,image/webp,application/pdf,.docx,.doc";

function isImageFile(fileType: string): boolean {
  return IMAGE_TYPES.includes(fileType);
}


const HandsOnSubmission = ({ exerciseId, exerciseType, exerciseDescription, exerciseTitle }: HandsOnSubmissionProps) => {
  const type = inferType(exerciseDescription, exerciseType, exerciseTitle);
  const storageKey = getStorageKey(type, exerciseId);

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        setUrl(parsed.url || "");
        setDescription(parsed.description || "");
        setAnswer(parsed.answer || "");
        setFileData(parsed.fileData || parsed.screenshot || null);
        setFileName(parsed.fileName || "");
        setFileType(parsed.fileType || (parsed.screenshot ? "image/png" : ""));
        setNotes(parsed.notes || "");
      }
    } catch {}
  }, [storageKey]);

  const handleSave = () => {
    try {
      const payload =
        type === "writing" ? { answer } :
        type === "build-platform" ? { fileData, fileName, fileType, notes } :
        { url, description };
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {}
  };

  const processFile = (file: File) => {
    const validTypes = [...IMAGE_TYPES, "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".pdf", ".doc", ".docx"];
    const hasValidType = validTypes.includes(file.type);
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!hasValidType && !hasValidExt) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileData(e.target?.result as string);
      setFileName(file.name);
      setFileType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clearFile = () => {
    setFileData(null);
    setFileName("");
    setFileType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isImage = fileType && isImageFile(fileType);

  return (
    <div className="mt-5 rounded-xl border border-border/30 bg-card/30 p-5">
      {type === "writing" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Write your response below. Your answer is saved automatically and is only visible to you — use it to track your own thinking as you progress through the curriculum.
          </p>
          <Textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="min-h-[140px] bg-background/50 border-border/50 text-sm resize-y"
          />
        </div>
      )}

      {type === "build-external" && (
        <>
          <h4 className="text-sm font-semibold mb-1">Submit Your Work</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Paste a link to your repo, workspace, or screenshot — or describe what you built. This is for your own record.
          </p>
          <div className="space-y-3">
            <Input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Link to repo, workspace, or screenshot"
              className="bg-background/50 border-border/50 text-sm"
            />
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what you built (optional)"
              className="min-h-[80px] bg-background/50 border-border/50 text-sm resize-y"
            />
          </div>
        </>
      )}

      {type === "build-platform" && (
        <>
          <h4 className="text-sm font-semibold mb-1">Submit Your Work</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Upload a screenshot or exported file from your Infracodebase workspace. Supported formats: PNG, JPEG, PDF, DOCX.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleFileSelect}
            className="hidden"
          />
          {fileData ? (
            <div className="mt-3 space-y-3">
              {isImage ? (
                <div className="relative rounded-lg overflow-hidden border border-border/30">
                  <img src={fileData} alt="Screenshot" className="w-full max-h-[300px] object-contain bg-background/50" />
                  <button
                    onClick={clearFile}
                    className="absolute top-2 right-2 text-xs bg-background/80 backdrop-blur px-2 py-1 rounded border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/50 px-3 py-2.5">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate flex-1">{fileName}</span>
                  <button
                    onClick={clearFile}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`mt-3 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
                dragging
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-background/30 hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Drag and drop or click to upload your work</span>
              <span className="text-xs text-muted-foreground/60">Supported formats: PNG, JPEG, PDF, DOCX</span>
            </div>
          )}
          {fileData && (
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add any notes about what you did (optional)"
              className="mt-3 min-h-[80px] bg-background/50 border-border/50 text-sm resize-y"
            />
          )}
        </>
      )}

      <div className="flex items-center gap-3 mt-3">
        <Button onClick={handleSave} size="sm" variant="outline" className="text-xs">
          Save
        </Button>
        {saved && (
          <span className="text-xs text-[hsl(145,60%,45%)] font-medium animate-in fade-in">
            Saved ✓
          </span>
        )}
      </div>
    </div>
  );
};

export default HandsOnSubmission;
