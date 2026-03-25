/** URL mapping: one doc page per curriculum track */
const trackDocsMap: Record<string, string> = {
  "welcome-orientation": "https://infracodebase.com/docs/getting-started/introduction",
  foundations: "https://infracodebase.com/docs/enterprises/overview",
  "real-infrastructure": "https://infracodebase.com/docs/workspaces/using-the-agent",
  "architecture-diagrams": "https://infracodebase.com/docs/workspaces/diagrams",
  "enterprise-governance": "https://infracodebase.com/docs/enterprises/rulesets",
  "advanced-architecture": "https://infracodebase.com/docs/advanced/permission-rules",
  "review-wrapup": "https://infracodebase.com/docs/getting-started/introduction",
};

const FALLBACK_URL = "https://infracodebase.com/docs/getting-started/introduction";

export function getDocsUrlForTrack(trackId: string): string {
  return trackDocsMap[trackId] || FALLBACK_URL;
}

function getDocsSubtitle(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, "");
  } catch {
    return "docs/getting-started/introduction";
  }
}

const InfracodebaseLogo = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <path
      d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M16 12v8M12 16h8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

/** Small pill for track card footers */
export function InfracodebaseDocsPill({ trackId }: { trackId: string }) {
  const url = getDocsUrlForTrack(trackId);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] transition-colors"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.38)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "rgba(255,255,255,0.38)";
      }}
    >
      <InfracodebaseLogo size={13} />
      Infracodebase Docs
      <span>↗</span>
    </a>
  );
}

/** Larger card for sidebar Helpful Resources section */
export function InfracodebaseDocsCard({ trackId }: { trackId: string }) {
  const url = getDocsUrlForTrack(trackId);
  const subtitle = getDocsSubtitle(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg p-[9px_11px] transition-colors"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      <InfracodebaseLogo size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-medium text-foreground/80">Infracodebase Docs</p>
        <p className="text-[10px] text-muted-foreground/50">{subtitle}</p>
      </div>
      <span className="text-muted-foreground/40 text-sm">↗</span>
    </a>
  );
}
