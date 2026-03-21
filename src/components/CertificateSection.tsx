import { useState, useRef } from "react";
import { Download, Linkedin, Shield, ExternalLink, Loader } from "lucide-react";

const CERTS = [
  { id: 1, name: "Tarak", track: "Cloud & Infrastructure Training — Introduction", short: "Cloud Foundations", date: "March 8, 2026", credId: "ICB-2026-0081-CF", signedBy: "Infracodebase University Team", color: "#22d3ee" },
  { id: 2, name: "Tarak", track: "Cloud & Infrastructure Training — Foundations", short: "IaC Practitioner", date: "March 14, 2026", credId: "ICB-2026-0082-IP", signedBy: "Infracodebase University Team", color: "#34d399" },
  { id: 3, name: "Tarak", track: "Infracodebase — Real Infrastructure Engineering", short: "Platform Builder", date: "March 19, 2026", credId: "ICB-2026-0083-PB", signedBy: "Infracodebase University Team", color: "#a78bfa" },
];

const MASTER = { name: "Tarak", track: "Infracodebase Platform Practitioner", date: "March 21, 2026", credId: "ICB-2026-MASTER-TB", signedBy: "Infracodebase University Team" };

function CrystalGem({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <polygon points="24,4 38,18 24,44 10,18" fill="url(#gem-grad)" opacity={0.9} />
      <polygon points="24,4 38,18 24,22" fill="white" opacity={0.15} />
      <polygon points="24,4 10,18 24,22" fill="white" opacity={0.08} />
      <polygon points="10,18 24,44 24,22" fill="black" opacity={0.1} />
      <line x1={10} y1={18} x2={38} y2={18} stroke="white" strokeWidth={0.5} opacity={0.3} />
      <line x1={24} y1={4} x2={24} y2={44} stroke="white" strokeWidth={0.3} opacity={0.2} />
      <defs>
        <linearGradient id="gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Seal({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return <line key={i} x1={32 + Math.cos(angle) * 24} y1={32 + Math.sin(angle) * 24} x2={32 + Math.cos(angle) * 30} y2={32 + Math.sin(angle) * 30} stroke="#555" strokeWidth={1.5} />;
      })}
      <circle cx={32} cy={32} r={22} fill="none" stroke="#666" strokeWidth={1.5} />
      <circle cx={32} cy={32} r={18} fill="none" stroke="#444" strokeWidth={0.5} />
      <circle cx={32} cy={32} r={16} fill="#1a1a1a" />
      <text x={32} y={29} textAnchor="middle" fill="#888" fontSize={5} fontWeight={700} letterSpacing={1}>
        INFRACODEBASE
      </text>
      <text x={32} y={38} textAnchor="middle" fill="#555" fontSize={3.5} letterSpacing={0.5}>
        CERTIFIED · 2026
      </text>
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

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Certificate Card */}
      <div
        ref={certRef}
        style={{
          background: "#0d0d0d",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top gradient line */}
        <div style={{ height: 3, background: isMaster ? "linear-gradient(90deg, #a78bfa, #22d3ee, #34d399)" : color }} />

        {/* Corner glow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, ${color}15, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ padding: "48px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          {/* Left content */}
          <div style={{ flex: 1 }}>
            {/* Logo area */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ position: "relative" }}>
                <CrystalGem size={40} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#e0e0e0", letterSpacing: 2, margin: 0 }}>Infracodebase</p>
                <p style={{ fontSize: 11, color: "#666", letterSpacing: 1, margin: 0 }}>University</p>
              </div>
            </div>

            <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>
              {isMaster ? "Master Certificate" : "Certificate of Completion"}
            </p>

            <p style={{ fontSize: 28, fontWeight: 700, color: "#f0f0f0", marginBottom: 8 }}>{cert.name}</p>

            <p style={{ fontSize: 12, color: "#666", marginBottom: 24 }}>has successfully completed</p>

            {isMaster ? (
              <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16, marginBottom: 32 }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{cert.track}</p>
              </div>
            ) : (
              <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 16, marginBottom: 32 }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{cert.short}</p>
                <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{cert.track}</p>
              </div>
            )}
          </div>

          {/* Right: Seal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginLeft: 32 }}>
            <Seal size={80} />
            <p style={{ fontSize: 10, color: "#555", textAlign: "center", margin: 0 }}>{cert.signedBy}</p>
            <p style={{ fontSize: 10, color: "#444", textAlign: "center", margin: 0 }}>Earned on {cert.date}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 56px 16px", display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #1a1a1a" }}>
          <Shield size={12} color="#444" />
          <div>
            <p style={{ fontSize: 9, color: "#444", margin: 0 }}>Credential ID</p>
            <p style={{ fontSize: 11, color: "#666", fontFamily: "monospace", margin: 0 }}>{cert.credId}</p>
          </div>
        </div>

        {/* Background pattern */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #0a0a0a, transparent)", pointerEvents: "none" }} />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #2a2a2a", background: "none", color: "#888", fontSize: 12, cursor: downloading ? "wait" : "pointer", transition: "all 0.15s" }}
          onMouseEnter={e => { if (!downloading) { (e.currentTarget as HTMLButtonElement).style.borderColor = "#444"; (e.currentTarget as HTMLButtonElement).style.color = "#f0f0f0"; }}}
          onMouseLeave={e => { if (!downloading) { (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}}
        >
          {downloading ? <><Loader size={13} style={{ animation: "spin 1s linear infinite" }} /> Generating...</> : <><Download size={13} /> Download PDF</>}
        </button>
        <button
          onClick={handleLinkedIn}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #2a2a2a", background: "none", color: "#888", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#0a66c2"; (e.currentTarget as HTMLButtonElement).style.color = "#0a66c2"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}
        >
          <Linkedin size={13} /> Share on LinkedIn
        </button>
        <button
          onClick={handleCopy}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #2a2a2a", background: "none", color: copied ? "#34d399" : "#888", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
          onMouseEnter={e => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = "#444"; (e.currentTarget as HTMLButtonElement).style.color = "#f0f0f0"; }}}
          onMouseLeave={e => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a2a"; (e.currentTarget as HTMLButtonElement).style.color = "#888"; }}}
        >
          <ExternalLink size={13} /> {copied ? "Copied!" : "Copy verify link"}
        </button>
      </div>

      {/* Verify URL */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#444" }}>
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
          <div style={{ marginBottom: 24, padding: "12px 16px", borderRadius: 10, background: "#151515", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Progress toward master certificate</p>
              <p style={{ fontSize: 11, color: "#555", margin: 0 }}>3 / 9 tracks</p>
            </div>
            <div style={{ width: 120, height: 6, borderRadius: 3, background: "#222", overflow: "hidden" }}>
              <div style={{ width: "33%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #a78bfa, #22d3ee)" }} />
            </div>
          </div>

          <Certificate cert={{ ...MASTER, color: "#a78bfa" }} isMaster />
        </div>
      )}

      {tab === "badges" && CERTS.map(cert => <Certificate key={cert.id} cert={cert} />)}
    </div>
  );
}
