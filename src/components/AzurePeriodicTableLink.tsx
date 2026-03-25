const AzureLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M33.34 6h27.82L33.56 90H6z" fill="#0078d4" />
    <path d="M60.38 6H88l-27 84H33.56z" fill="#2892df" />
  </svg>
);

/** Small pill for course card footers */
export function AzurePeriodicTablePill() {
  return (
    <a
      href="https://www.azureperiodictable.com"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] transition-colors"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
      }}
    >
      <AzureLogo size={14} />
      Azure Periodic Table
      <span>↗</span>
    </a>
  );
}

/** Larger card for sidebar Helpful Resources section */
export function AzurePeriodicTableCard() {
  return (
    <a
      href="https://www.azureperiodictable.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg p-[10px_12px] transition-colors"
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
      <AzureLogo size={22} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">Azure Periodic Table</p>
        <p className="text-[11px] text-muted-foreground">azureperiodictable.com</p>
      </div>
      <span className="text-muted-foreground text-sm">↗</span>
    </a>
  );
}
