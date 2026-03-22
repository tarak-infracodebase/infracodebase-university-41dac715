import { useState, useEffect, useCallback } from "react";
import jsPDF from "jspdf";

const INVITE_URL = "https://infracodebase-university.lovable.app/cards";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Space+Mono:wght@400;700&display=swap');

.gcf-overlay {
  position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 9999; margin-left: 0;
  background: rgba(0,0,0,0.88);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  animation: gcf-fade 0.2s ease;
}
@keyframes gcf-fade { from { opacity:0 } to { opacity:1 } }

.gcf-modal {
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  width: 100%; max-width: 520px;
  max-height: 90vh; overflow-y: auto;
  animation: gcf-up 0.35s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  scrollbar-width: none;
}
.gcf-modal::-webkit-scrollbar { display: none; }
@keyframes gcf-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }

.gcf-close {
  position: absolute; top: 18px; right: 18px;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,0.06); border: none; color: #888;
  font-size: 14px; cursor: pointer; display: flex; align-items: center;
  justify-content: center;
  transition: background 0.2s; z-index: 10;
}
.gcf-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

.gcf-primary-btn {
  width: 100%; padding: 16px; border-radius: 14px;
  background: #fff; color: #080808;
  font-family: 'Space Mono', monospace; font-size: 12px;
  font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  border: none; cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.gcf-primary-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(255,255,255,0.15); }
.gcf-primary-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.gcf-secondary-btn {
  width: 100%; padding: 14px; border-radius: 14px;
  background: transparent; color: #aaa;
  font-family: 'Space Mono', monospace; font-size: 11px;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.gcf-secondary-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

.gcf-swatch {
  width: 38px; height: 38px; border-radius: 50%; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 3px solid transparent; flex-shrink: 0;
}
.gcf-swatch:hover { transform: scale(1.15); }
.gcf-swatch.gcf-swatch-selected { transform: scale(1.2); }

.gcf-input {
  width: 100%; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 14px 16px; color: #fff;
  font-family: 'Space Mono', monospace; font-size: 12px;
  outline: none; transition: border-color 0.2s;
}
.gcf-input:focus { border-color: rgba(255,255,255,0.3); }
.gcf-input::placeholder { color: #333; }

@keyframes gcf-card-spin {
  0%   { transform: perspective(600px) rotateY(-38deg) rotateX(12deg) scale(0.78); opacity:0; }
  42%  { transform: perspective(600px) rotateY(14deg) rotateX(-5deg) scale(1.06); opacity:1; }
  68%  { transform: perspective(600px) rotateY(-6deg) rotateX(2deg) scale(1.02); }
  85%  { transform: perspective(600px) rotateY(3deg) rotateX(-1deg) scale(1.01); }
  100% { transform: perspective(600px) rotateY(0deg) rotateX(0deg) scale(1); opacity:1; }
}
.gcf-card-3d { animation: gcf-card-spin 1.1s cubic-bezier(0.4,0,0.2,1) both; }

.gcf-share-btn {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 12px 16px; border-radius: 12px; cursor: pointer;
  font-family: 'Space Mono', monospace; font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color: #ccc;
  transition: all 0.2s; flex: 1;
}
.gcf-share-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.22); color: #fff; }

@keyframes gcf-spin { to { transform: rotate(360deg); } }

`;

const variants = [
  { name:"Onyx", front:"linear-gradient(145deg,#141414,#2e2e2e)", shimmer:"radial-gradient(ellipse at 35% 25%,rgba(255,255,255,0.06) 0%,transparent 60%)", accent:"#D4D4D4", swatch:"#2e2e2e", swatchBorder:"#666", shadow:"0 20px 50px rgba(0,0,0,0.85)" },
  { name:"Bronze", front:"linear-gradient(145deg,#3D2208,#C17B3A)", shimmer:"radial-gradient(ellipse at 40% 20%,rgba(255,220,150,0.18) 0%,transparent 55%)", accent:"#F5D5A0", swatch:"#8B5A2B", swatchBorder:"#C17B3A", shadow:"0 20px 50px rgba(120,70,20,0.5)" },
  { name:"Sage", front:"linear-gradient(145deg,#1A3A2A,#4A8060)", shimmer:"radial-gradient(ellipse at 65% 25%,rgba(180,255,210,0.1) 0%,transparent 55%)", accent:"#AEDFC0", swatch:"#2D5A40", swatchBorder:"#4A8060", shadow:"0 20px 50px rgba(30,90,55,0.5)" },
  { name:"Navy", front:"linear-gradient(145deg,#0D1B35,#2E5490)", shimmer:"radial-gradient(ellipse at 70% 20%,rgba(150,200,255,0.1) 0%,transparent 55%)", accent:"#A8C8F0", swatch:"#1A2F5A", swatchBorder:"#2E5490", shadow:"0 20px 50px rgba(20,45,100,0.6)" },
  { name:"Ember", front:"linear-gradient(135deg,#C1410B,#FB923C)", shimmer:"radial-gradient(ellipse at 30% 30%,rgba(255,220,150,0.2) 0%,transparent 55%)", accent:"#FED7AA", swatch:"#EA580C", swatchBorder:"#FB923C", shadow:"0 20px 50px rgba(234,88,12,0.5)" },
  { name:"Prism", front:"linear-gradient(135deg,#7C3AED,#F43F5E)", shimmer:"radial-gradient(ellipse at 60% 20%,rgba(255,200,255,0.18) 0%,transparent 55%)", accent:"#F5D0FE", swatch:"#A855F7", swatchBorder:"#EC4899", shadow:"0 20px 50px rgba(168,85,247,0.5)" },
  { name:"Aurora", front:"linear-gradient(135deg,#0891B2,#FACC15)", shimmer:"radial-gradient(ellipse at 40% 25%,rgba(200,255,240,0.18) 0%,transparent 55%)", accent:"#CCFBF1", swatch:"#22C55E", swatchBorder:"#0EA5E9", shadow:"0 20px 50px rgba(6,182,212,0.45)" },
  { name:"Spectrum", front:"linear-gradient(135deg,#E63946,#F4831F,#F9C02A,#2DC653,#1BB8CC,#4F46E5,#9333EA)", shimmer:"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,0.12) 0%,transparent 50%)", accent:"#fff", swatch:"conic-gradient(#E63946,#F9C02A,#2DC653,#1BB8CC,#9333EA,#E63946)", swatchBorder:"#fff", shadow:"0 20px 50px rgba(100,50,200,0.4)" },
];

const memberNumbers = ["0847 2291","0012 8834","0001 0042","0000 0001","0391 4482","0055 6731","0128 0099","0000 0007"];

function CubeLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#111"/>
      <polygon points="50,14 82,32 50,50 18,32" fill="#A8D400"/>
      <polygon points="18,32 50,50 50,86 18,68" fill="#E85D04"/>
      <polygon points="50,50 82,32 82,68 50,86" fill="#0891B2"/>
      <polygon points="50,14 82,32 50,50 18,32" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
      <line x1="18" y1="32" x2="18" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
      <line x1="82" y1="32" x2="82" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
      <line x1="50" y1="50" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
      <line x1="18" y1="68" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
      <line x1="82" y1="68" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
    </svg>
  );
}

type Variant = typeof variants[0];

function MemberCard({ v, name, number, className = "" }: { v: Variant; name: string; number: string; className?: string }) {
  return (
    <div className={className} style={{ position:"relative", width:"100%", paddingBottom:"62%", borderRadius:18, overflow:"hidden", boxShadow:v.shadow }}>
      <div style={{ position:"absolute", inset:0, background:v.front }} />
      <div style={{ position:"absolute", inset:0, background:v.shimmer }} />
      <div style={{ position:"absolute", inset:0, padding:"20px 22px 18px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <CubeLogo size={36} />
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:"rgba(255,255,255,0.35)", letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:3 }}>Card</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.75)", letterSpacing:"0.06em" }}>{v.name}</div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, letterSpacing:"0.2em", color:"rgba(255,255,255,0.85)", marginBottom:8 }}>{number}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:2 }}>Member since</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.65)" }}>03 / 26</div>
            </div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>{name || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// — CONFETTI CANVAS
function launchConfetti() {
  stopConfetti();
  let canvas = document.getElementById('gcf-confetti-canvas') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'gcf-confetti-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;';
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d')!;
  const colors = ['#E63946','#F9C02A','#2DC653','#1BB8CC','#A855F7','#F97316','#3B82F6','#EC4899','#10B981','#FACC15','#06B6D4','#EF4444'];
  const shapes = ['square','circle','diamond'];
  const pieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 8 + Math.random() * 22,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rotation: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 4,
    vy: 1.5 + Math.random() * 3.5,
    vr: (Math.random() - 0.5) * 0.1,
    alpha: 0.95,
    wobble: Math.random() * Math.PI * 2,
    ws: 0.03 + Math.random() * 0.04,
  }));
  let raf: number;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of pieces) {
      if (p.y > canvas.height + 40) continue;
      alive = true;
      p.y += p.vy; p.x += p.vx + Math.sin(p.wobble) * 0.7;
      p.wobble += p.ws; p.rotation += p.vr; p.vy += 0.06;
      p.alpha = Math.max(0, p.alpha - 0.003);
      ctx.save(); ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
      else if (p.shape === 'square') { ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); }
      else { ctx.beginPath(); ctx.moveTo(0, -p.size / 1.6); ctx.lineTo(p.size / 1.6, 0); ctx.lineTo(0, p.size / 1.6); ctx.lineTo(-p.size / 1.6, 0); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
    if (alive) { raf = requestAnimationFrame(draw); }
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  raf = requestAnimationFrame(draw);
  setTimeout(() => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 6000);
}
function stopConfetti() {
  const c = document.getElementById('gcf-confetti-canvas') as HTMLCanvasElement;
  if (c) { const ctx = c.getContext('2d'); ctx?.clearRect(0, 0, c.width, c.height); }
}

// — STEP 1: Choose color
function StepColor({ selected, onSelect, onNext }: { selected: number | null; onSelect: (i: number) => void; onNext: () => void }) {
  const v = selected !== null ? variants[selected] : null;
  return (
    <div style={{ padding:"32px 28px 26px" }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#555", marginBottom:10 }}>Step 1 of 2</div>
      <div style={{ fontFamily:"'Pacifico',cursive", fontSize:28, color:"#fff", lineHeight:1.1, marginBottom:7 }}>Choose your color.</div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#555", lineHeight:1.8, marginBottom:22 }}>Every card opens the same doors. Pick the one that feels like you.</div>
      {v && <div style={{ marginBottom:20 }}><MemberCard v={v} name="" number={memberNumbers[selected!]} /></div>}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:24 }}>
        {variants.map((vv, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
            <div
              className={`gcf-swatch${selected === i ? " gcf-swatch-selected" : ""}`}
              onClick={() => onSelect(i)}
              style={{ background:vv.swatch, borderColor:selected===i ? vv.swatchBorder : "transparent", boxShadow:selected===i ? `0 0 14px ${vv.swatchBorder}66` : "none" }}
            />
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:6, color:selected===i ? "#ccc" : "#333", letterSpacing:"0.08em", textTransform:"uppercase" }}>{vv.name}</div>
          </div>
        ))}
      </div>
      <button className="gcf-primary-btn" onClick={onNext} disabled={selected === null}>
        {selected !== null ? `Continue with ${variants[selected].name} →` : "Select a card to continue"}
      </button>
    </div>
  );
}

// — STEP 2: Your name
function StepName({ cardIndex, name, setName, onBack, onNext }: { cardIndex: number; name: string; setName: (v: string) => void; onBack: () => void; onNext: () => void }) {
  const v = variants[cardIndex];
  return (
    <div style={{ padding:"32px 28px 26px" }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#555", marginBottom:10 }}>Step 2 of 2</div>
      <div style={{ fontFamily:"'Pacifico',cursive", fontSize:28, color:"#fff", lineHeight:1.1, marginBottom:7 }}>Make it yours.</div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#555", lineHeight:1.8, marginBottom:20 }}>Your name will appear on your card.</div>
      <div style={{ marginBottom:20 }}><MemberCard v={v} name={name} number={memberNumbers[cardIndex]} /></div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#444", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:8 }}>Your name</div>
        <input className="gcf-input" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Chen" autoFocus />
      </div>
      <button className="gcf-primary-btn" onClick={onNext} disabled={!name.trim()} style={{ marginBottom:10 }}>
        Claim my {v.name} card →
      </button>
      <button className="gcf-secondary-btn" onClick={onBack}>← Back</button>
    </div>
  );
}

// — STEP 3: Celebration
function StepCelebration({ cardIndex, name }: { cardIndex: number; name: string }) {
  const v = variants[cardIndex];
  const number = memberNumbers[cardIndex];
  const firstName = name.split(" ")[0];
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => launchConfetti(), 80);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    setDownloading(true);

    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1200; canvas.height = 900;
        const ctx = canvas.getContext('2d')!;
        const W = 1200, H = 900;

        // Background
        ctx.fillStyle = '#080808';
        ctx.fillRect(0, 0, W, H);

        // Ambient glow
        const glowMatch = v.front.match(/#[0-9a-fA-F]{6}/g);
        const glowHex = glowMatch ? glowMatch[0] : '#444444';
        const gr = parseInt(glowHex.slice(1,3),16);
        const gg = parseInt(glowHex.slice(3,5),16);
        const gb = parseInt(glowHex.slice(5,7),16);
        const glow = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 500);
        glow.addColorStop(0, `rgba(${gr},${gg},${gb},0.25)`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // 3D card — perspective transform points
        const tl = { x: 210, y: 140 };
        const tr = { x: 870, y: 200 };
        const br = { x: 870, y: 680 };
        const bl = { x: 210, y: 740 };

        // Edge thickness vectors
        const ex = 12, ey = 22;

        // Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 80;
        ctx.shadowOffsetX = 20;
        ctx.shadowOffsetY = 40;
        ctx.beginPath();
        ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
        ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y);
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.restore();

        // Bottom edge
        const specColors = v.front.match(/#[0-9a-fA-F]{6}/g) || ['#111'];
        const edgeHex = specColors[specColors.length - 1];
        const er = Math.max(0, parseInt(edgeHex.slice(1,3),16) - 50);
        const eg = Math.max(0, parseInt(edgeHex.slice(3,5),16) - 50);
        const eb2 = Math.max(0, parseInt(edgeHex.slice(5,7),16) - 50);
        ctx.beginPath();
        ctx.moveTo(bl.x, bl.y); ctx.lineTo(br.x, br.y);
        ctx.lineTo(br.x + ex, br.y + ey); ctx.lineTo(bl.x + ex, bl.y + ey);
        ctx.closePath();
        ctx.fillStyle = `rgb(${er},${eg},${eb2})`;
        ctx.fill();

        // Right edge
        ctx.beginPath();
        ctx.moveTo(tr.x, tr.y); ctx.lineTo(br.x, br.y);
        ctx.lineTo(br.x + ex, br.y + ey); ctx.lineTo(tr.x + ex, tr.y + ey);
        ctx.closePath();
        ctx.fillStyle = `rgba(${er},${eg},${eb2},0.7)`;
        ctx.fill();

        // Card face — gradient fill using perspective clip
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
        ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y);
        ctx.closePath();
        ctx.clip();

        if (v.name === 'Spectrum') {
          const specG = ctx.createLinearGradient(tl.x, (tl.y+bl.y)/2, tr.x, (tr.y+br.y)/2);
          const sc = ['#E63946','#F4831F','#F9C02A','#2DC653','#1BB8CC','#4F46E5','#9333EA'];
          sc.forEach((c, i) => specG.addColorStop(i/(sc.length-1), c));
          ctx.fillStyle = specG;
        } else {
          const colors = v.front.match(/#[0-9a-fA-F]{6}/g) || ['#141414','#2e2e2e'];
          const cardG = ctx.createLinearGradient(tl.x, tl.y, br.x, br.y);
          cardG.addColorStop(0, colors[0]);
          cardG.addColorStop(1, colors[colors.length-1]);
          ctx.fillStyle = cardG;
        }
        ctx.fillRect(tl.x - 10, tl.y - 10, tr.x - tl.x + 20, bl.y - tl.y + 20);

        // Specular light streak
        const streak = ctx.createRadialGradient(
          tl.x + (tr.x-tl.x)*0.35, tl.y + (bl.y-tl.y)*0.28, 0,
          tl.x + (tr.x-tl.x)*0.35, tl.y + (bl.y-tl.y)*0.28, 320
        );
        streak.addColorStop(0, 'rgba(255,255,255,0.22)');
        streak.addColorStop(0.4, 'rgba(255,255,255,0.06)');
        streak.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = streak;
        ctx.fillRect(tl.x - 10, tl.y - 10, tr.x - tl.x + 20, bl.y - tl.y + 20);

        ctx.restore();

        // Card border
        ctx.beginPath();
        ctx.moveTo(tl.x, tl.y); ctx.lineTo(tr.x, tr.y);
        ctx.lineTo(br.x, br.y); ctx.lineTo(bl.x, bl.y);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Text positioning helpers
        const cardLeft = (yFrac: number) => tl.x + (bl.x - tl.x) * yFrac + 48;
        const cardRight = (yFrac: number) => tr.x + (br.x - tr.x) * yFrac - 40;
        const cardY = (yFrac: number) => tl.y + (bl.y - tl.y) * yFrac;

        // CARD label
        ctx.save();
        ctx.font = '500 15px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.textAlign = 'right';
        ctx.fillText('CARD', cardRight(0.08), cardY(0.08));
        ctx.restore();

        // Card name
        ctx.save();
        ctx.font = 'bold 28px "Space Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';
        ctx.fillText(v.name.toUpperCase(), cardRight(0.17), cardY(0.17));
        ctx.restore();

        // Member number
        ctx.save();
        ctx.font = 'bold 32px "Courier New", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.textAlign = 'left';
        ctx.fillText(number, cardLeft(0.68), cardY(0.68));
        ctx.restore();

        // Member since
        ctx.save();
        ctx.font = '500 12px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.textAlign = 'left';
        ctx.fillText('MEMBER SINCE', cardLeft(0.76), cardY(0.76));
        ctx.font = 'bold 18px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('03 / 26', cardLeft(0.84), cardY(0.84));
        ctx.restore();

        // Name
        ctx.save();
        ctx.font = 'bold 26px "Space Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';
        ctx.fillText(name, cardRight(0.88), cardY(0.88));
        ctx.restore();

        // infracodebase university
        ctx.save();
        ctx.font = '400 13px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.textAlign = 'right';
        ctx.fillText('infracodebase university', cardRight(0.95), cardY(0.95));
        ctx.restore();

        // Bottom caption
        ctx.save();
        ctx.font = '400 13px "Space Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.textAlign = 'center';
        ctx.fillText('Your Infracodebase University Membership Card', W/2, H - 28);
        ctx.restore();

        // Convert canvas to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.97);
        const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: [W, H] });
        doc.addImage(imgData, 'JPEG', 0, 0, W, H);
        doc.save(`infracodebase-${v.name.toLowerCase()}-card.pdf`);

        setDownloading(false);
        setDownloaded(true);
      } catch(e) { setDownloading(false); }
    }, 1200);
  };

  const handleLinkedIn = () => {
    const text = `Just claimed my ${v.name} membership card from Infracodebase University.\n\nA community built around we, not just me.\n\nLearn Infrastructure Differently → ${INVITE_URL}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(INVITE_URL)}&title=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const handleCopy = () => {
    if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(INVITE_URL).catch(() => {}); }
    else {
      const ta = document.createElement("textarea"); ta.value = INVITE_URL;
      ta.style.cssText = "position:fixed;opacity:0;";
      document.body.appendChild(ta);
      ta.focus(); ta.select(); try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  return (
    <div style={{ padding:"28px 24px 28px" }}>
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:"0.22em", textTransform:"uppercase", color:"#555", marginBottom:10 }}>Welcome to the community</div>
        <div style={{ fontFamily:"'Pacifico',cursive", fontSize:30, color:"#fff", lineHeight:1.1, marginBottom:7 }}>You're in, {firstName}.</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#555", lineHeight:1.8 }}>Your {v.name} card is ready.</div>
      </div>

      <div className="gcf-card-3d" style={{ marginBottom:8 }}>
        <MemberCard v={v} name={name} number={number} />
      </div>
      <div style={{ textAlign:"center", marginBottom:20, fontFamily:"'Space Mono',monospace", fontSize:7, color:"#2a2a2a", letterSpacing:"0.1em", textTransform:"uppercase" }}>
        #{number.replace(/ /g,"")} · {v.name}
      </div>

      <button
        className="gcf-primary-btn"
        onClick={handleDownload}
        disabled={downloading}
        style={{ marginBottom:12, background:downloaded?"#22C55E":"#fff", color:downloaded?"#fff":"#080808" }}
      >
        {downloading ? (
          <><span style={{ display:"inline-block", width:12, height:12, border:"2px solid #080808", borderTopColor:"transparent", borderRadius:"50%", animation:"gcf-spin 0.6s linear infinite" }} />Generating PDF...</>
        ) : downloaded ? "✓ Card saved as PDF" : "↓ Download my card as PDF"}
      </button>

      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#333", letterSpacing:"0.14em", textTransform:"uppercase", textAlign:"center", marginBottom:10 }}>Share your card</div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        <button className="gcf-share-btn" onClick={handleLinkedIn}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          Share on LinkedIn
        </button>
        <button
          className="gcf-share-btn"
          onClick={handleCopy}
          style={{ borderColor:copied?"rgba(247,37,133,0.45)":"", color:copied?"#F72585":"", background:copied?"rgba(247,37,133,0.08)":"" }}
        >
          {copied ? (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F72585" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Copied!</>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Copy invite link</>
          )}
        </button>
      </div>

      <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:12, padding:"13px 15px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#fff", lineHeight:1.8 }}>
          A community built around <span style={{ color:"#22C55E" }}>we</span>, not just me.<br/>
          <span style={{ color:"#fff" }}>Spread the word — grow this community together.</span>
        </div>
      </div>
    </div>
  );
}

// — MODAL
function GetYourCardModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [name, setName] = useState("");

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  const progressColor = cardIndex !== null ? variants[cardIndex].swatchBorder : "#444";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="gcf-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="gcf-modal">
        <button className="gcf-close" onClick={onClose}>✕</button>
        <div style={{ height:3, background:"#1a1a1a", borderRadius:"24px 24px 0 0", overflow:"hidden" }}>
          <div style={{ height:"100%", width:progressWidth, background:progressColor, transition:"width 0.4s ease, background 0.3s" }} />
        </div>
        {step === 1 && <StepColor selected={cardIndex} onSelect={setCardIndex} onNext={() => setStep(2)} />}
        {step === 2 && <StepName cardIndex={cardIndex!} name={name} setName={setName} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <StepCelebration cardIndex={cardIndex!} name={name} />}
      </div>
    </div>
  );
}

// — EXPORTED BUTTON
export default function GetYourCardButton({ label = "Get your card" }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{css}</style>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily:"'Space Mono',monospace",
          fontSize:13, letterSpacing:"0.1em",
          textTransform:"uppercase",
          background:"#fff", color:"#080808",
          border:"none", borderRadius:50,
          padding:"18px 44px", cursor:"pointer",
          transition:"transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow="0 12px 40px rgba(255,255,255,0.2)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="none";
        (e.currentTarget as HTMLButtonElement).style.boxShadow="none"; }}
      >
        {label}
      </button>
      {open && <GetYourCardModal onClose={() => { setOpen(false); stopConfetti(); }} />}
    </>
  );
}
