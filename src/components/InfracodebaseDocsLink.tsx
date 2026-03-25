const GRADIENT = "linear-gradient(90deg, #7c3aed, #2563eb, #0ea5e9)";

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

/** Small pill with gradient border for track card footers */
export function InfracodebaseDocsPill({ trackId }: { trackId: string }) {
  const url = getDocsUrlForTrack(trackId);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center ml-auto rounded-[7px] p-[1px]"
      style={{ background: GRADIENT }}
    >
      <span
        className="flex items-center gap-[5px] rounded-[6px] px-[9px] py-1 text-[11px] whitespace-nowrap transition-colors"
        style={{ background: "#12131f", color: "rgba(255,255,255,0.7)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1d2e"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#12131f"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
      >
        <InfracodebaseLogo size={13} />
        Infracodebase Docs ↗
      </span>
    </a>
  );
}

/** Larger card with gradient border for sidebar Helpful Resources section */
export function InfracodebaseDocsCard({ trackId }: { trackId: string }) {
  const url = getDocsUrlForTrack(trackId);
  const subtitle = getDocsSubtitle(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex rounded-[9px] p-[1px]"
      style={{ background: GRADIENT }}
    >
      <span
        className="flex items-center gap-3 w-full rounded-[8px] p-[9px_11px] transition-colors"
        style={{ background: "#12131f" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1d2e"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#12131f"; }}
      >
        <InfracodebaseLogo size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>Infracodebase Docs</p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{subtitle}</p>
        </div>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>↗</span>
      </span>
    </a>
  );
}
