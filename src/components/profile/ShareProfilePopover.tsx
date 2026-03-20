import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Share2, Check, Link2 } from "lucide-react";

const DOMAIN = "https://university.infracodebase.com";

// Simple X and LinkedIn SVG icons to avoid extra dependencies
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface Props {
  username: string;
  children?: React.ReactNode;
}

export function ShareProfilePopover({ username, children }: Props) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${DOMAIN}/${username}`;

  const shareToX = () => {
    const text = encodeURIComponent(`Check out this profile on Infracodebase University`);
    const url = encodeURIComponent(profileUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener");
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(profileUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener");
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children || (
          <button className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-1.5">
            <Share2 className="h-3.5 w-3.5" /> Share Profile
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-52 p-1.5 bg-card border-border shadow-xl rounded-xl"
      >
        <button
          onClick={shareToX}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-foreground rounded-lg hover:bg-muted transition-colors"
        >
          <XIcon className="h-4 w-4" />
          Share on X
        </button>
        <button
          onClick={shareToLinkedIn}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-foreground rounded-lg hover:bg-muted transition-colors"
        >
          <LinkedInIcon className="h-4 w-4" />
          Share on LinkedIn
        </button>
        <div className="h-px bg-border my-1" />
        <button
          onClick={copyUrl}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-crystal-green" />
              <span className="text-crystal-green">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Copy link</span>
            </>
          )}
        </button>
      </PopoverContent>
    </Popover>
  );
}
