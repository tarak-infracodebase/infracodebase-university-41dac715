import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import {
  Calendar, Clock, ExternalLink, Play, ChevronLeft, ChevronRight,
  Download, X, Edit2, Check, Bold, Italic, Heading3, Pilcrow,
  List, Minus, ChevronDown, Share2, Heart, Link, Linkedin, Instagram,
} from "lucide-react";

const SPECTRUM_GRADIENT = "linear-gradient(135deg, #c2410c, #d97706, #ca8a04, #16a34a, #0891b2)";

const INITIAL_SESSION_NOTES = `<h2>Build with Her — March 18, 2026 — 49m 36s</h2>
<h3>Facilitators</h3>
<p>Justin O'Connor, Tarak</p>
<h3>Purpose</h3>
<ul>
<li>Continue Build with Her learning series</li>
<li>Demonstrate a practical Infracodebase use case</li>
<li>Introduce early version of Infracodebase University</li>
<li>Gather community feedback</li>
</ul>
<h3>Main Themes</h3>
<ul>
<li>ClickOps to IaC modernization</li>
<li>Azure infrastructure import and Terraform generation</li>
<li>Shift-left remediation</li>
<li>Live architecture visualization</li>
<li>Compliance scoring and rule sets</li>
</ul>
<h3>Demo</h3>
<p>Justin led a live Azure demo showing: tenant, subscription, resource group, web app, app service plan, Azure Front Door, managed identity, Key Vault, virtual network, subnets, NSGs, private IP, VM for GitHub runner, WAF policy.</p>
<h3>What Infracodebase Generated</h3>
<ul>
<li>Full architecture diagram with 92% layout quality score</li>
<li>Terraform code across multiple files: security.tf, network.tf, compute.tf, database.tf, storage.tf, rbac.tf, and more</li>
<li>Compliance evaluation: 58% score · 28 pass · 21 fail · 1 overridden against Azure Policy, Azure Well-Architected Framework, Terraform Configuration Language Style Guide, and Terraform Module Development Guidelines</li>
</ul>
<h3>Key Point — Why Not Remediate Directly in Cloud</h3>
<p>Direct cloud remediation increases environment drift. Code-first remediation is more auditable and consistent. Recommended sequence: import infra → establish Terraform baseline → merge → improve.</p>
<h3>Questions</h3>
<ul>
<li><strong>Abby</strong> asked if the agent can map ClickOps infra — yes.</li>
<li><strong>Tawni</strong> asked if manual cloud setup still matters — yes, foundations still matter.</li>
<li><strong>Reilly</strong> asked how rule sets work — they can be defined at enterprise level from internal standards or security frameworks.</li>
</ul>
<h3>Closing</h3>
<p>Infracodebase University is free and community-driven. Feedback encouraged on both the product and the university.</p>`;

const SESSION_NOTES_MD = `# Build with Her — March 18, 2026 — 49m 36s

## Facilitators
Justin O'Connor, Tarak

## Purpose
- Continue Build with Her learning series
- Demonstrate a practical Infracodebase use case
- Introduce early version of Infracodebase University
- Gather community feedback

## Main Themes
- ClickOps to IaC modernization
- Azure infrastructure import and Terraform generation
- Shift-left remediation
- Live architecture visualization
- Compliance scoring and rule sets

## Demo
Justin led a live Azure demo showing: tenant, subscription, resource group, web app, app service plan, Azure Front Door, managed identity, Key Vault, virtual network, subnets, NSGs, private IP, VM for GitHub runner, WAF policy.

## What Infracodebase Generated
- Full architecture diagram with 92% layout quality score
- Terraform code across multiple files: security.tf, network.tf, compute.tf, database.tf, storage.tf, rbac.tf, and more
- Compliance evaluation: 58% score · 28 pass · 21 fail · 1 overridden against Azure Policy, Azure Well-Architected Framework, Terraform Configuration Language Style Guide, and Terraform Module Development Guidelines

## Key Point — Why Not Remediate Directly in Cloud
Direct cloud remediation increases environment drift. Code-first remediation is more auditable and consistent. Recommended sequence: import infra → establish Terraform baseline → merge → improve.

## Questions
- **Abby** asked if the agent can map ClickOps infra — yes.
- **Tawni** asked if manual cloud setup still matters — yes, foundations still matter.
- **Reilly** asked how rule sets work — they can be defined at enterprise level from internal standards or security frameworks.

## Closing
Infracodebase University is free and community-driven. Feedback encouraged on both the product and the university.
`;

const initialScreenshots = [
  { src: "/office-hours-thumbnail.png", caption: "Session thumbnail" },
  { src: "/session-photo-1.png", caption: "Session participants" },
  { src: "/session-photo-2.png", caption: "Session participants" },
  { src: "/design.png", caption: "Azure architecture diagram — 92% layout quality" },
  { src: "/code.png", caption: "Generated Terraform code — security.tf" },
  { src: "/compliance.png", caption: "Compliance score — 58% · 28 pass · 21 fail · 1 overridden" },
];


/* ── Inline editable text ── */
function InlineField({
  value, onChange, editing, multiline, className,
}: {
  value: string; onChange: (v: string) => void; editing: boolean; multiline?: boolean; className?: string;
}) {
  const [draft, setDraft] = useState(value);
  const [active, setActive] = useState(false);

  useEffect(() => { setDraft(value); }, [value]);

  if (!editing) return <span className={className}>{value}</span>;
  if (!active) {
    return (
      <span
        className={`${className} cursor-pointer rounded px-1 -mx-1 transition-colors hover:bg-cyan-500/10`}
        onClick={() => setActive(true)}
      >{value}</span>
    );
  }

  const confirm = () => { onChange(draft); setActive(false); };
  const cancel = () => { setDraft(value); setActive(false); };

  if (multiline) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          className="w-full rounded border border-border/50 bg-white/[0.03] px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500/50 resize-y min-h-[60px]"
          autoFocus
        />
        <span className="flex gap-1">
          <button onClick={confirm} className="p-1 rounded hover:bg-cyan-500/20 text-cyan-400"><Check className="h-3.5 w-3.5" /></button>
          <button onClick={cancel} className="p-1 rounded hover:bg-red-500/20 text-red-400"><X className="h-3.5 w-3.5" /></button>
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <input
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") confirm(); if (e.key === "Escape") cancel(); }}
        className="rounded border border-border/50 bg-white/[0.03] px-2 py-0.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
        autoFocus
      />
      <button onClick={confirm} className="p-1 rounded hover:bg-cyan-500/20 text-cyan-400"><Check className="h-3.5 w-3.5" /></button>
      <button onClick={cancel} className="p-1 rounded hover:bg-red-500/20 text-red-400"><X className="h-3.5 w-3.5" /></button>
    </span>
  );
}

/* ── Photo Lightbox (Airbnb-style fullscreen) ── */
function Lightbox({
  images, index, onClose, onNav,
}: {
  images: { src: string; caption: string }[]; index: number; onClose: () => void; onNav: (i: number) => void;
}) {
  const total = images.length;
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({ 0: 12, 1: 8, 2: 5, 3: 7, 4: 4, 5: 3 });
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instaCopied, setInstaCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav((index - 1 + total) % total);
      if (e.key === "ArrowRight") onNav((index + 1) % total);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [index, total, onClose, onNav]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleLike = () => {
    const wasLiked = likedPhotos[index];
    setLikedPhotos(p => ({ ...p, [index]: !wasLiked }));
    setLikeCounts(c => ({ ...c, [index]: (c[index] || 0) + (wasLiked ? -1 : 1) }));
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = images[index].src;
    a.download = `infracodebase-${index + 1}.jpg`;
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://university.infracodebase.com/office-hours?photo=${index}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://university.infracodebase.com/office-hours`, '_blank');
    setShareOpen(false);
  };

  const handleShareInsta = () => {
    navigator.clipboard.writeText(`https://university.infracodebase.com/office-hours`);
    setInstaCopied(true);
    setTimeout(() => setInstaCopied(false), 3000);
    setShareOpen(false);
  };

  const actionBtnStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)',
    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
    cursor: 'pointer', transition: 'all 0.15s', padding: '6px 10px', borderRadius: '6px',
  };

  const shareOptionStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
    color: '#cbd5e1', fontSize: '13px', borderRadius: '7px', width: '100%',
    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '14px', cursor: 'pointer' }}>
          <X className="h-5 w-5" /> Fermer
        </button>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>{index + 1} / {total}</span>
        <Share2 className="h-5 w-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
      </div>

      {/* Image area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '70px 80px 120px' }}>
        <img key={index} src={images[index].src} alt={images[index].caption} style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', transition: 'opacity 0.2s' }} />
      </div>

      {/* Left arrow */}
      <button
        onClick={() => onNav((index - 1 + total) % total)}
        style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => onNav((index + 1) % total)}
        style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Actions bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '4px' }}>
        <button onClick={handleDownload} style={actionBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Download className="h-4 w-4" /> Download
        </button>
        <button onClick={toggleLike} style={{ ...actionBtnStyle, color: likedPhotos[index] ? '#fb7185' : 'rgba(255,255,255,0.8)' }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Heart className="h-4 w-4" fill={likedPhotos[index] ? '#fb7185' : 'none'} /> {likeCounts[index] || 0}
        </button>
        <div ref={shareRef} style={{ position: 'relative' }}>
          <button onClick={() => setShareOpen(o => !o)} style={actionBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
          {shareOpen && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: '#0b1220', border: '1px solid #25405f', borderRadius: '10px', padding: '6px', minWidth: '200px', zIndex: 1100 }}>
              <button onClick={handleCopyLink} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Link className="h-4 w-4" /> {copied ? 'Copied!' : 'Copy link'}
              </button>
              <button onClick={handleShareLinkedIn} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Linkedin className="h-4 w-4" /> Share on LinkedIn
              </button>
              <button onClick={handleShareInsta} style={shareOptionStyle}
                onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <Instagram className="h-4 w-4" /> {instaCopied ? 'Link copied — paste in your story' : 'Share on Instagram'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{images[index].caption}</p>

      {/* Thumbnail strip */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onNav(i)}
            style={{
              width: '56px', height: '36px', borderRadius: '4px', overflow: 'hidden',
              border: i === index ? '2px solid #22d3ee' : '2px solid transparent',
              opacity: i === index ? 1 : 0.5, cursor: 'pointer', padding: 0, background: 'none',
              transition: 'opacity 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { if (i !== index) e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { if (i !== index) e.currentTarget.style.opacity = '0.5'; }}
          >
            <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Calendar Dropdown ── */
function CalendarDropdown() {
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setCalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Infracodebase+University+%E2%80%94+Office+Hours&dates=20260325T160000Z/20260325T170000Z&details=Weekly+live+Q%26A+with+Justin+and+Tarak&recur=RRULE:FREQ%3DWEEKLY;BYDAY%3DWE";
  const outlookUrl = "https://outlook.live.com/calendar/0/deeplink/compose?subject=Infracodebase+University+%E2%80%94+Office+Hours&startdt=2026-03-25T16:00:00Z&enddt=2026-03-25T17:00:00Z&body=Weekly+live+Q%26A+with+Justin+and+Tarak&allday=false";

  const handleICS = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Infracodebase University//EN',
      'BEGIN:VEVENT',
      'DTSTART:20260325T160000Z',
      'DTEND:20260325T170000Z',
      'SUMMARY:Infracodebase University — Office Hours',
      'DESCRIPTION:Weekly live Q&A with Justin and Tarak.',
      'LOCATION:Online',
      'RRULE:FREQ=WEEKLY;BYDAY=WE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'infracodebase-office-hours.ics';
    a.click();
    setCalOpen(false);
  };

  const optionStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#cbd5e1',
    fontSize: '13px',
    borderRadius: '7px',
    textAlign: 'left' as const,
  };

  return (
    <div ref={calRef} style={{ position: 'relative', zIndex: 50 }}>
      <button
        onClick={() => setCalOpen(o => !o)}
        style={{
          background: SPECTRUM_GRADIENT,
          color: 'white',
          fontWeight: 700,
          fontSize: '14px',
          border: 'none',
          borderRadius: '9px',
          padding: '11px 22px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Calendar className="h-4 w-4" /> Add to calendar <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {calOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            background: '#101929',
            border: '1px solid #25405f',
            borderRadius: '10px',
            minWidth: '240px',
            padding: '6px',
            zIndex: 50,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => { window.open(googleUrl, '_blank'); setCalOpen(false); }}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ExternalLink size={14} /> Google Calendar
          </button>
          <button
            onClick={() => { window.open(outlookUrl, '_blank'); setCalOpen(false); }}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ExternalLink size={14} /> Microsoft Outlook
          </button>
          <button
            onClick={handleICS}
            style={optionStyle}
            onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <Download size={14} /> Apple / Other (.ics)
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Rich Text Editor ── */
function NotesEditor({
  initialHTML, onDownload,
}: {
  initialHTML: string; onDownload: (text: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [savedHTML, setSavedHTML] = useState(initialHTML);

  const exec = (cmd: string, val: string | null = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? undefined);
  };

  const handleSave = () => {
    if (editorRef.current) {
      setSavedHTML(editorRef.current.innerHTML);
      setIsDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleDiscard = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = savedHTML;
      setIsDirty(false);
    }
  };

  const handleDownloadNotes = () => {
    const text = editorRef.current?.innerText || "";
    onDownload(text);
  };

  const btnCls = "p-1.5 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <div>
      <style>{`
        [contenteditable] h2 { color:#f1f5f9; font-size:16px; font-weight:800; border-bottom:1px solid #1c2e47; padding-bottom:6px; margin:20px 0 8px; }
        [contenteditable] h3 { color:#f1f5f9; font-size:14px; font-weight:700; margin:16px 0 6px; }
        [contenteditable] p { color:#cbd5e1; margin:4px 0; line-height:1.8; }
        [contenteditable] ul { margin:4px 0 4px 16px; }
        [contenteditable] li { color:#cbd5e1; margin:2px 0; }
        [contenteditable] hr { border:none; border-top:1px solid #1c2e47; margin:12px 0; }
        [contenteditable] strong { color:#f1f5f9; font-weight:700; }
        [contenteditable]:focus { outline:none; border-color:#22d3ee40; caret-color:#22d3ee; }
      `}</style>

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border border-border/50 rounded-t-lg px-2 py-1.5 bg-white/[0.02]">
        <button onClick={() => exec("bold")} className={btnCls} title="Bold"><Bold className="h-4 w-4" /></button>
        <button onClick={() => exec("italic")} className={btnCls} title="Italic"><Italic className="h-4 w-4" /></button>
        <button onClick={() => exec("formatBlock", "h3")} className={btnCls} title="Heading"><Heading3 className="h-4 w-4" /></button>
        <button onClick={() => exec("formatBlock", "p")} className={btnCls} title="Paragraph"><Pilcrow className="h-4 w-4" /></button>
        <button onClick={() => exec("insertUnorderedList")} className={btnCls} title="Bullet List"><List className="h-4 w-4" /></button>
        <button onClick={() => exec("insertHorizontalRule")} className={btnCls} title="Divider"><Minus className="h-4 w-4" /></button>
        <div className="flex-1" />
        {isDirty && (
          <button onClick={handleDiscard} className="px-3 py-1 text-xs rounded border border-border/50 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
            Discard
          </button>
        )}
        <button onClick={handleSave} className="px-3 py-1 text-xs rounded font-medium text-white transition-opacity hover:opacity-90 ml-1" style={{ background: SPECTRUM_GRADIENT }}>
          Save
        </button>
        {saved && <span className="text-xs text-emerald-400 ml-2">Saved!</span>}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => setIsDirty(true)}
        className="border border-t-0 border-border/50 rounded-b-lg p-4 min-h-[300px] text-sm focus:outline-none"
        style={{ background: "#0a0e14" }}
        dangerouslySetInnerHTML={{ __html: savedHTML }}
      />

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-muted-foreground">Use the toolbar to format notes. Changes are saved locally.</p>
        <button
          onClick={handleDownloadNotes}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
        >
          <Download className="h-4 w-4" /> Download notes (.md)
        </button>
      </div>
    </div>
  );
}

/* ── Session Modal ── */
function SessionModal({
  open, onClose, screenshots: shots,
}: {
  open: boolean; onClose: () => void; screenshots: { src: string; caption: string }[];
}) {
  const [tab, setTab] = useState<"recording" | "screenshots" | "notes">("recording");
  const [screenshotIdx, setScreenshotIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [captions, setCaptions] = useState(shots.map(s => s.caption));
  const [captionEditing, setCaptionEditing] = useState(false);

  // Comments
  const initialComments = [
    { name: "Comfort Benton", date: "March 18, 2026", text: "This session completely changed how I think about cloud infrastructure. The ClickOps to IaC demo was eye-opening." },
    { name: "Tawni", date: "March 18, 2026", text: "I appreciated that manual cloud knowledge still matters. Helps me know where to focus as a beginner." },
    { name: "Reilly", date: "March 18, 2026", text: "The rule sets explanation was exactly what I needed. Finally understand how compliance scoring works." },
    { name: "Abby", date: "March 18, 2026", text: "Seeing the agent map existing ClickOps infra live was incredible. Can't wait to try it myself." },
  ];
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  // Uploadable avatars from localStorage (same keys as hero)
  const [justinPhoto, setJustinPhotoState] = useState<string | null>(() => localStorage.getItem('office-hours-photo-justin'));
  const [tarakPhoto, setTarakPhotoState] = useState<string | null>(() => localStorage.getItem('office-hours-photo-tarak'));
  const justinRef = useRef<HTMLInputElement>(null);
  const tarakRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string, setter: (v: string | null) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const val = ev.target?.result as string;
      setter(val);
      localStorage.setItem(key, val);
    };
    reader.readAsDataURL(file);
  };

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };
  const imagesWithCaptions = shots.map((s, i) => ({ src: s.src, caption: captions[i] }));

  if (!open) return null;

  const avatarData = [
    { name: "Justin", initial: "J", photo: justinPhoto, setter: setJustinPhotoState, ref: justinRef, key: 'office-hours-photo-justin' },
    { name: "Tarak", initial: "T", photo: tarakPhoto, setter: setTarakPhotoState, ref: tarakRef, key: 'office-hours-photo-tarak' },
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 1000 }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} style={{ zIndex: 1000 }} />
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-border/50 bg-card" style={{ zIndex: 1001 }}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            {/* Header with uploadable instructor photos */}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex -space-x-2">
                {avatarData.map(av => (
                  <div key={av.name} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => av.ref.current?.click()}>
                    {av.photo ? (
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #1c2e47', flexShrink: 0 }}>
                        <img src={av.photo} alt={av.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ) : (
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: SPECTRUM_GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#fff', flexShrink: 0, border: '2px solid #1c2e47' }}>
                        {av.initial}
                      </div>
                    )}
                    <div
                      style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                    >
                      <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>EDIT</span>
                    </div>
                    <input ref={av.ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleAvatarUpload(e, av.key, av.setter)} />
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Build with Her — ClickOps to IaC: Azure Infrastructure Modernization</h2>
                <p className="text-sm text-muted-foreground">March 18, 2026 · 49 min · Justin & Tarak</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border/50 mb-6 mt-4">
              {(["recording", "screenshots", "notes"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "recording" ? "Recording" : t === "screenshots" ? `Our Moments (${shots.length})` : "Notes"}
                </button>
              ))}
            </div>

            {/* Recording */}
            {tab === "recording" && (
              <div>
                <div className="aspect-video rounded-lg bg-black/50 border border-border/30 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                    <Play className="h-8 w-8 text-foreground ml-1" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors">
                    <ExternalLink className="h-4 w-4" /> Open recording
                  </a>
                  <button onClick={() => setTab("notes")} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-border/50 text-foreground hover:bg-muted/50 transition-colors">
                    View notes
                  </button>
                </div>
              </div>
            )}

            {/* Screenshots */}
            {tab === "screenshots" && (
              <div>
                <div className="relative mb-4">
                  <img
                    src={shots[screenshotIdx].src}
                    alt={captions[screenshotIdx]}
                    className="w-full rounded-lg border border-border/30 object-contain max-h-[50vh] cursor-pointer"
                    onClick={() => openLightbox(screenshotIdx)}
                  />
                  {screenshotIdx > 0 && (
                    <button
                      onClick={() => setScreenshotIdx(i => i - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                  )}
                  {screenshotIdx < shots.length - 1 && (
                    <button
                      onClick={() => setScreenshotIdx(i => i + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Editable caption */}
                <div className="text-sm text-muted-foreground text-center mb-4 flex items-center justify-center gap-2">
                  {captionEditing ? (
                    <InlineField
                      value={captions[screenshotIdx]}
                      onChange={v => setCaptions(c => c.map((cap, i) => i === screenshotIdx ? v : cap))}
                      editing
                      className="text-sm text-muted-foreground"
                    />
                  ) : (
                    <>
                      <span>{captions[screenshotIdx]}</span>
                      <button onClick={() => setCaptionEditing(true)} className="p-1 rounded hover:bg-white/10 text-muted-foreground"><Edit2 className="h-3 w-3" /></button>
                    </>
                  )}
                  {captionEditing && (
                    <button onClick={() => setCaptionEditing(false)} className="p-1 rounded hover:bg-white/10 text-cyan-400"><Check className="h-3 w-3" /></button>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 justify-center">
                  {shots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setScreenshotIdx(i); openLightbox(i); }}
                      className={`w-16 h-10 rounded border-2 overflow-hidden transition-all ${
                        i === screenshotIdx ? "border-primary" : "border-border/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={s.src} alt={captions[i]} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* ── Comments Section ── */}
                <div style={{ marginTop: '40px', borderTop: '1px solid #1c2e47', paddingTop: '28px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>What our community said</h3>

                  {/* Comment input */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #c2410c, #d97706, #16a34a, #0891b2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 800, color: '#fff',
                    }}>Y</div>
                    <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && commentInput.trim()) {
                            setComments(c => [{ name: 'You', date: 'Just now', text: commentInput.trim() }, ...c]);
                            setCommentInput('');
                          }
                        }}
                        placeholder="Share your experience from this session..."
                        style={{
                          flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid #1c2e47',
                          borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#f1f5f9',
                          outline: 'none',
                        }}
                      />
                      <button
                        onClick={() => {
                          if (!commentInput.trim()) return;
                          setComments(c => [{ name: 'You', date: 'Just now', text: commentInput.trim() }, ...c]);
                          setCommentInput('');
                        }}
                        disabled={!commentInput.trim()}
                        style={{
                          background: SPECTRUM_GRADIENT, color: '#fff', border: 'none',
                          borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600,
                          cursor: commentInput.trim() ? 'pointer' : 'default', opacity: commentInput.trim() ? 1 : 0.4,
                        }}
                      >Post</button>
                    </div>
                  </div>

                  {/* Comments grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                    {(showAllComments ? comments : comments.slice(0, 4)).map((c, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, #c2410c, #d97706, #16a34a, #0891b2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '14px', fontWeight: 800, color: '#fff',
                        }}>{c.name.charAt(0)}</div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '14px' }}>{c.name}</span>
                            <span style={{ color: '#64748b', fontSize: '12px' }}>{c.date}</span>
                          </div>
                          <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {comments.length > 4 && !showAllComments && (
                    <button
                      onClick={() => setShowAllComments(true)}
                      style={{
                        marginTop: '20px', background: 'none', border: '1px solid #1c2e47',
                        borderRadius: '8px', padding: '10px 20px', color: '#f1f5f9',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: '100%',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#162035')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      Show all {comments.length} comments
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {tab === "notes" && (
              <NotesEditor
                initialHTML={INITIAL_SESSION_NOTES}
                onDownload={() => {
                  const blob = new Blob([SESSION_NOTES_MD], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "build-with-her-march-18-2026.md";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={imagesWithCaptions}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}

/* ── Horizontal Session Card ── */
function HorizontalSessionCard({
  editing, onClick, sessionTitle, setSessionTitle, sessionDesc, setSessionDesc, sessionDate, setSessionDate,
}: {
  editing: boolean; onClick: () => void;
  sessionTitle: string; setSessionTitle: (v: string) => void;
  sessionDesc: string; setSessionDesc: (v: string) => void;
  sessionDate: string; setSessionDate: (v: string) => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={() => !editing && onClick()}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        background: hov && !editing ? '#162035' : '#101929',
        border: `1px solid ${hov && !editing ? '#25405f' : '#1c2e47'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: editing ? 'default' : 'pointer',
        transition: 'all 0.2s',
        transform: hov && !editing ? 'translateY(-2px)' : 'none',
        boxShadow: hov && !editing ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
        minHeight: '160px',
      }}
    >
      {/* LEFT — Thumbnail */}
      <div style={{
        width: '360px',
        minWidth: '360px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src="/office-hours-thumbnail.png"
          alt={sessionTitle}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
        {!editing && hov && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.2s',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Play className="h-5 w-5 text-white" style={{ marginLeft: '2px' }} />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — Content */}
      <div style={{
        flex: 1,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              borderRadius: '9999px', padding: '2px 10px',
              fontSize: '11px', fontWeight: 600,
              background: 'rgba(167,139,250,0.15)', color: '#a78bfa',
            }}>
              Real Infrastructure
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>49 min</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px' }}>
            <InlineField value={sessionTitle} onChange={setSessionTitle} editing={editing} className="text-base font-semibold text-foreground" />
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
            <InlineField value={sessionDesc} onChange={setSessionDesc} editing={editing} multiline className="text-sm text-muted-foreground leading-relaxed" />
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            <InlineField value={sessionDate} onChange={setSessionDate} editing={editing} className="text-xs text-muted-foreground" />
          </span>
          {!editing && (
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#22d3ee' }}>View session →</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function OfficeHours() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Hero editing
  const [heroEditing, setHeroEditing] = useState(false);
  const [heroTitle, setHeroTitle] = useState("Live Demo — Migrating Azure Infrastructure to AWS and GCP");
  const [heroDesc, setHeroDesc] = useState("Live walkthrough of migrating an existing Azure environment to both AWS and GCP using Infracodebase. We'll scan the resources, generate multi-cloud Terraform, and show how the agent handles the translation automatically — no manual rewriting.");
  const [heroDate, setHeroDate] = useState("Wednesday, March 25, 2026");
  const [heroTime, setHeroTime] = useState("5:00 PM CET");

  // Session card editing
  const [sessionEditing, setSessionEditing] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("Build with Her — ClickOps to IaC: Azure Infrastructure Modernization");
  const [sessionDesc, setSessionDesc] = useState("Live demo: inspect manually provisioned Azure infrastructure, generate Terraform code with Infracodebase, establish a clean IaC baseline, and shift remediation left.");

  // Instructor photo uploads
  const [justinPhoto, setJustinPhotoState] = useState<string | null>(() => {
    return localStorage.getItem('office-hours-photo-justin') || null;
  });
  const [tarakPhoto, setTarakPhotoState] = useState<string | null>(() => {
    return localStorage.getItem('office-hours-photo-tarak') || null;
  });

  const setJustinPhoto = (val: string | null) => {
    setJustinPhotoState(val);
    if (val) localStorage.setItem('office-hours-photo-justin', val);
    else localStorage.removeItem('office-hours-photo-justin');
  };
  const setTarakPhoto = (val: string | null) => {
    setTarakPhotoState(val);
    if (val) localStorage.setItem('office-hours-photo-tarak', val);
    else localStorage.removeItem('office-hours-photo-tarak');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  const [sessionDate, setSessionDate] = useState("March 18, 2026");

  const handleSubmitQuestion = () => {
    if (!question.trim()) return;
    setSubmitted(true);
    setQuestion("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10 space-y-10">

        {/* ── SECTION 1 — HERO ── */}
        <section style={{ position: 'relative', borderRadius: '14px', border: '1px solid #25405f', background: '#0d0d0d' }}>
          <div style={{ height: '4px', background: SPECTRUM_GRADIENT, borderRadius: '14px 14px 0 0' }} />

          {/* Edit button */}
          <button
            onClick={() => setHeroEditing(e => !e)}
            className={`absolute top-4 right-4 z-10 p-2 rounded-lg border transition-colors ${
              heroEditing ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400" : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Edit2 className="h-4 w-4" />
          </button>

          <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                NEXT SESSION
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                <InlineField value={heroTitle} onChange={setHeroTitle} editing={heroEditing} className="text-2xl lg:text-3xl font-bold text-foreground leading-tight" />
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <InlineField value={heroDesc} onChange={setHeroDesc} editing={heroEditing} multiline className="text-sm text-muted-foreground leading-relaxed" />
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <InlineField value={heroDate} onChange={setHeroDate} editing={heroEditing} />
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <InlineField value={heroTime} onChange={setHeroTime} editing={heroEditing} />
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <CalendarDropdown />
              </div>
            </div>

            {/* Hosted by */}
            <div className="shrink-0 rounded-lg border border-border/30 bg-white/[0.03] p-5 space-y-4" style={{ minWidth: '300px' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hosted by</p>
              <div className="space-y-4">
                {([
                  { name: "Justin", initial: "J", defaultPhoto: "/Justin.jpeg", title: "Founder, Infracodebase", photo: justinPhoto, setter: setJustinPhoto, uploadId: "upload-justin" },
                  { name: "Tarak", initial: "T", defaultPhoto: "/Tarak.jpeg", title: "Co-Founder, Infracodebase", photo: tarakPhoto, setter: setTarakPhoto, uploadId: "upload-tarak" },
                ] as const).map(host => (
                  <div key={host.name} className="flex items-center gap-3">
                    <div
                      style={{ position: 'relative', cursor: 'pointer' }}
                      onClick={() => document.getElementById(host.uploadId)?.click()}
                    >
                      {(host.photo || host.defaultPhoto) ? (
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #1c2e47', flexShrink: 0 }}>
                          <img src={host.photo || host.defaultPhoto} alt={host.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      ) : (
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: SPECTRUM_GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: '#fff', flexShrink: 0, border: '2px dashed rgba(255,255,255,0.3)' }}>
                          {host.initial}
                        </div>
                      )}
                      <div
                        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                      >
                        <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>EDIT</span>
                      </div>
                      <input id={host.uploadId} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handlePhotoUpload(e, host.setter)} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{host.name}</p>
                      <p className="text-xs text-muted-foreground">{host.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — QUESTION SUBMISSION ── */}
        <section className="rounded-xl border border-border/50 p-6" style={{ background: "#0d0d0d" }}>
          <h2 className="text-lg font-semibold text-foreground mb-1">Submit a question</h2>
          <p className="text-sm text-muted-foreground mb-4">Ask anything — we'll cover it during the next live session.</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmitQuestion()}
              placeholder="Type your question..."
              className="flex-1 rounded-lg border border-border/50 bg-white/[0.03] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button
              onClick={handleSubmitQuestion}
              disabled={!question.trim()}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: SPECTRUM_GRADIENT }}
            >
              Submit
            </button>
          </div>
          {submitted && (
            <p className="mt-3 text-sm text-emerald-400">Question submitted — we'll cover it on Wednesday.</p>
          )}
        </section>

        {/* ── SECTION 3 — PAST SESSIONS ── */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-1">Past Sessions</h2>
          <p className="text-sm text-muted-foreground mb-6">Click any session to watch the recording, relive our moments, and read the notes.</p>

          <div className="relative">
            {/* Edit button */}
            <button
              onClick={e => { e.stopPropagation(); setSessionEditing(ed => !ed); }}
              className={`absolute top-4 right-4 z-10 p-2 rounded-lg border transition-colors ${
                sessionEditing ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400" : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Edit2 className="h-4 w-4" />
            </button>

            <HorizontalSessionCard
              editing={sessionEditing}
              onClick={() => setModalOpen(true)}
              sessionTitle={sessionTitle}
              setSessionTitle={setSessionTitle}
              sessionDesc={sessionDesc}
              setSessionDesc={setSessionDesc}
              sessionDate={sessionDate}
              setSessionDate={setSessionDate}
            />
          </div>
        </section>
      </div>

      <SessionModal open={modalOpen} onClose={() => setModalOpen(false)} screenshots={initialScreenshots} />
    </AppLayout>
  );
}
