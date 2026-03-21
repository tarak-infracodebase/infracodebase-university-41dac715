import { useState, useRef } from "react";
import { Download, Linkedin, Shield, ExternalLink, Loader } from "lucide-react";

const CERTS = [
  { id: 1, name: "Tarak", track: "Cloud & Infrastructure Training — Introduction", short: "Cloud Foundations", date: "March 8, 2026", credId: "ICB-2026-0081-CF", signedBy: "Infracodebase University Team", color: "#22d3ee" },
  { id: 2, name: "Tarak", track: "Cloud & Infrastructure Training — Foundations", short: "IaC Practitioner", date: "March 14, 2026", credId: "ICB-2026-0082-IP", signedBy: "Infracodebase University Team", color: "#34d399" },
  { id: 3, name: "Tarak", track: "Infracodebase — Real Infrastructure Engineering", short: "Platform Builder", date: "March 19, 2026", credId: "ICB-2026-0083-PB", signedBy: "Infracodebase University Team", color: "#a78bfa" },
];

const MASTER = { name: "Tarak", track: "Infracodebase Platform Practitioner", date: "March 21, 2026", credId: "ICB-2026-MASTER-TB", signedBy: "Infracodebase University Team" };

function CrystalGem({ size = 48 }: { size?: number }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;
  // Hexagon with colored facets
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
  const colors = ["#E03A3E", "#F5821F", "#FDB827", "#61BB46", "#009DDC", "#963D97"];
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      {points.map((p, i) => {
        const next = points[(i + 1) % 6];
        return (
          <polygon
            key={i}
            points={`${cx},${cy} ${p[0]},${p[1]} ${next[0]},${next[1]}`}
            fill={colors[i]}
            opacity={0.85}
          />
        );
      })}
      {/* Highlight facets */}
      <polygon points={`${cx},${cy} ${points[0][0]},${points[0][1]} ${points[1][0]},${points[1][1]}`} fill="white" opacity={0.15} />
      <polygon points={`${cx},${cy} ${points[5][0]},${points[5][1]} ${points[0][0]},${points[0][1]}`} fill="white" opacity={0.1} />
      {/* Shadow facets */}
      <polygon points={`${cx},${cy} ${points[3][0]},${points[3][1]} ${points[4][0]},${points[4][1]}`} fill="black" opacity={0.15} />
    </svg>
  );
}

function Seal({ size = 80 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.46;
  const dotCount = 32;
  const dotR = size * 0.025;
  const textR = size * 0.38;
  const gemSize = size * 0.36;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Scalloped dots around edge */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(angle) * outerR}
            cy={cy + Math.sin(angle) * outerR}
            r={dotR}
            fill="#666"
          />
        );
      })}
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r={size * 0.4} fill="none" stroke="#555" strokeWidth={0.8} />
      {/* Curved text */}
      <defs>
        <path id={`sealTextTop-${size}`} d={`M ${cx - textR},${cy} A ${textR},${textR} 0 1,1 ${cx + textR},${cy}`} />
        <path id={`sealTextBot-${size}`} d={`M ${cx + textR},${cy} A ${textR},${textR} 0 1,1 ${cx - textR},${cy}`} />
      </defs>
      <text fontSize={size * 0.058} fill="#888" fontWeight={600} letterSpacing={2}>
        <textPath href={`#sealTextTop-${size}`} startOffset="50%" textAnchor="middle">
          INFRACODEBASE
        </textPath>
      </text>
      <text fontSize={size * 0.05} fill="#777" fontWeight={500} letterSpacing={1.5}>
        <textPath href={`#sealTextBot-${size}`} startOffset="50%" textAnchor="middle">
          CERTIFIED · 2026
        </textPath>
      </text>
      {/* Center gem */}
      <g transform={`translate(${cx - gemSize / 2}, ${cy - gemSize / 2})`}>
        <CrystalGem size={gemSize} />
      </g>
    </svg>
  );
}

interface CertProps {
  cert: typeof MASTER & { short?: string; color?: string };
  isMaster?: boolean;
}

function Certificate({ cert, isMaster = false }: CertProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);
  const verifyUrl = `university.infracodebase.com/verify/${cert.credId}`;
  const fullVerifyUrl = `https://university.infracodebase.com/verify/${cert.credId}`;
  const filename = `Infracodebase-${(cert.short || "Master-Certificate").replace(/\s+/g, "-")}-${cert.name}.pdf`;

  const handleDownload = async () => {
    if (downloading || !certRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#0d0d0d",
      });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const w = pdf.internal.pageSize.getWidth();
      const h = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleLinkedIn = () => {
    const title = encodeURIComponent(`I earned the ${cert.short || cert.track} certificate from Infracodebase University`);
    const url = encodeURIComponent(fullVerifyUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, "_blank", "width=600,height=500");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullVerifyUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const color = cert.color || "#f0f0f0";

  const masterBg = isMaster
    ? "radial-gradient(ellipse at 40% 80%, rgba(245,130,31,0.18) 0%, transparent 50%), radial-gradient(ellipse at 60% 70%, rgba(253,184,39,0.12) 0%, transparent 45%), radial-gradient(ellipse at 55% 85%, rgba(0,157,220,0.10) 0%, transparent 50%), #0d0d0d"
    : `radial-gradient(ellipse at 50% 80%, ${color}18 0%, transparent 50%), #0d0d0d`;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Certificate Card */}
      <div
        ref={certRef}
        style={{
          background: masterBg,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          border: "1px solid #1a1a1a",
        }}
      >
        {/* Top gradient border */}
        <div
          style={{
            height: 3,
            background: isMaster
              ? "linear-gradient(90deg, #E03A3E, #F5821F, #FDB827, #61BB46, #009DDC, #963D97)"
              : `linear-gradient(90deg, ${color}, ${color}00)`,
          }}
        />

        <div style={{ padding: "40px 48px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          {/* Left content */}
          <div style={{ flex: 1 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <CrystalGem size={36} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", letterSpacing: 1, margin: 0 }}>Infracodebase</p>
                <p style={{ fontSize: 10, color: "#666", letterSpacing: 2, margin: 0, textTransform: "uppercase" }}>University</p>
              </div>
            </div>

            <p style={{ fontSize: 10, color: "#22d3ee", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontWeight: 600 }}>
              {isMaster ? "Master Certificate" : "Certificate of Completion"}
            </p>

            <p style={{ fontSize: 32, fontWeight: 700, color: "#f0f0f0", marginBottom: 8 }}>{cert.name}</p>
            <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>has successfully completed</p>

            {isMaster ? (
              <div style={{ display: "inline-block", borderRadius: 8, padding: "12px 20px", marginBottom: 32, background: `linear-gradient(135deg, ${color}22, ${color}0a)`, border: `1px solid ${color}30` }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{cert.track}</p>
              </div>
            ) : (
              <div style={{ display: "inline-block", borderRadius: 8, padding: "12px 20px", marginBottom: 32, background: `linear-gradient(135deg, ${color}22, ${color}0a)`, border: `1px solid ${color}30` }}>
                <p style={{ fontSize: 15, fontWeight: 600, color, margin: 0 }}>{cert.short}</p>
                <p style={{ fontSize: 11, color: "#999", marginTop: 4, margin: "4px 0 0" }}>{cert.track}</p>
              </div>
            )}
          </div>

          {/* Right: Seal */}
          <div style={{ marginLeft: 24, flexShrink: 0 }}>
            <Seal size={100} />
          </div>
        </div>

        {/* Spacer for glow area */}
        <div style={{ height: 100, position: "relative" }}>
          {/* Radial glow orb */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            height: 120,
            borderRadius: "50%",
            background: isMaster
              ? "radial-gradient(ellipse, rgba(245,130,31,0.15), rgba(253,184,39,0.08), transparent)"
              : `radial-gradient(ellipse, ${color}20, ${color}08, transparent)`,
            filter: "blur(20px)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 48px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #1a1a1a" }}>
          <div>
            <div style={{ width: 24, height: 2, background: "#444", marginBottom: 8 }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{cert.signedBy}</p>
            <p style={{ fontSize: 11, color: "#666", margin: "2px 0 0" }}>Earned on {cert.date}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>Credential ID</p>
            <p style={{ fontSize: 12, color: "#888", fontFamily: "monospace", margin: "2px 0 0" }}>{cert.credId}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {[
          { label: downloading ? "Generating..." : "Download PDF", icon: downloading ? <Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={14} />, onClick: handleDownload, disabled: downloading, hoverColor: "#f0f0f0" },
          { label: "Share on LinkedIn", icon: <Linkedin size={14} />, onClick: handleLinkedIn, hoverColor: "#0a66c2" },
          { label: copied ? "Copied!" : "Copy verify link", icon: <ExternalLink size={14} />, onClick: handleCopy, hoverColor: copied ? "#34d399" : "#f0f0f0" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            disabled={btn.disabled}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid #2a2a2a",
              background: "#111",
              color: btn.label === "Copied!" ? "#34d399" : "#888",
              fontSize: 13,
              cursor: btn.disabled ? "wait" : "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!btn.disabled) { (e.currentTarget).style.borderColor = "#444"; (e.currentTarget).style.color = btn.hoverColor || "#f0f0f0"; } }}
            onMouseLeave={e => { if (!btn.disabled) { (e.currentTarget).style.borderColor = "#2a2a2a"; (e.currentTarget).style.color = btn.label === "Copied!" ? "#34d399" : "#888"; } }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Verify URL */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#444", fontFamily: "monospace" }}>
        <Shield size={10} />
        {verifyUrl}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CertificateSection() {
  const [tab, setTab] = useState("master");

  return (
    <div style={{ marginTop: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#888", marginBottom: 4 }}>Credentials</h2>
        <p style={{ fontSize: 12, color: "#555" }}>Earned by completing hands-on labs. Each credential has a public verification link.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#151515", borderRadius: 10, padding: 4 }}>
        {[{ id: "master", label: "Master Certificate" }, { id: "badges", label: `Track Certificates (${CERTS.length})` }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? "#1e1e1e" : "none", border: "none", borderRadius: 7, padding: "8px 0", cursor: "pointer", color: tab === t.id ? "#f0f0f0" : "#555", fontSize: 13, fontWeight: tab === t.id ? 600 : 400, transition: "all 0.15s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "master" && (
        <div>
          {/* Progress */}
          <div style={{ marginBottom: 24, padding: "14px 20px", borderRadius: 12, background: "#111", border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 13, color: "#999", margin: 0 }}>Progress toward master certificate</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 160, height: 6, borderRadius: 3, background: "#222", overflow: "hidden" }}>
                <div style={{ width: "33%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #E03A3E, #F5821F, #FDB827, #61BB46, #009DDC)" }} />
              </div>
              <p style={{ fontSize: 13, color: "#22d3ee", fontFamily: "monospace", fontWeight: 600, margin: 0, whiteSpace: "nowrap" }}>3 / 9 tracks</p>
            </div>
          </div>

          <Certificate cert={{ ...MASTER, color: "#a78bfa" }} isMaster />
        </div>
      )}

      {tab === "badges" && CERTS.map(cert => <Certificate key={cert.id} cert={cert} />)}
    </div>
  );
}
