const GRADIENT = "linear-gradient(90deg, #7c3aed, #2563eb, #0ea5e9)";

const AzureLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M33.34 6h27.82L33.56 90H6z" fill="#0078d4" />
    <path d="M60.38 6H88l-27 84H33.56z" fill="#2892df" />
  </svg>
);

/** Small pill with gradient border for course card footers */
export function AzurePeriodicTablePill() {
  return (
    <a
      href="https://www.azureperiodictable.com"
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
        <AzureLogo size={13} />
        Azure Periodic Table ↗
      </span>
    </a>
  );
}

/** Larger card with gradient border for sidebar Helpful Resources section */
export function AzurePeriodicTableCard() {
  return (
    <a
      href="https://www.azureperiodictable.com"
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
        <AzureLogo size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>Azure Periodic Table</p>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>azureperiodictable.com</p>
        </div>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.22)" }}>↗</span>
      </span>
    </a>
  );
}
