import { useState } from "react";
import GetYourCardButton from "@/components/GetYourCardFlow";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .flip-scene { perspective: 1200px; width: 100%; cursor: pointer; }
  .flip-inner {
    position: relative; width: 100%; padding-bottom: 62%;
    transform-style: preserve-3d;
    transition: transform 0.75s cubic-bezier(0.4,0,0.2,1);
  }
  .flip-inner.flipped { transform: rotateY(180deg); }
  .flip-face {
    position: absolute; inset: 0;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 20px; overflow: hidden;
  }
  .flip-back { transform: rotateY(180deg); }

  .nav-link {
    font-family: 'Space Mono', monospace;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    color: #666; text-decoration: none; cursor: pointer;
    transition: color 0.2s;
  }
  .nav-link:hover { color: #fff; }

  .benefit-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 32px 28px;
    transition: border-color 0.3s, background 0.3s;
  }
  .benefit-card:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(255,255,255,0.14);
  }

  .step-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
    margin: 0 auto;
  }

  .cta-btn {
    font-family: 'Space Mono', monospace;
    font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
    background: #fff; color: #080808;
    border: none; border-radius: 50px;
    padding: 18px 44px; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-block;
  }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,255,255,0.2); }

  .cta-btn-outline {
    font-family: 'Space Mono', monospace;
    font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
    background: transparent; color: #aaa;
    border: 1px solid #333; border-radius: 50px;
    padding: 16px 36px; cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .cta-btn-outline:hover { border-color: #666; color: #fff; }

  .quote-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px; padding: 28px 24px;
  }

  .divider {
    width: 100%; height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes marqueeReverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  .marquee-track { display: flex; width: max-content; }
  .marquee-track-fwd { animation: marquee 28s linear infinite; }
  .marquee-track-rev { animation: marqueeReverse 32s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.8s ease both; }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }
`;

function CubeLogo({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="22" fill="#111111"/>
      <polygon points="50,14 82,32 50,50 18,32" fill="#A8D400"/>
      <polygon points="50,14 82,32 66,41 50,32 34,41 18,32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>
      <polygon points="18,32 50,50 50,86 18,68" fill="#E85D04"/>
      <polygon points="18,32 34,41 34,77 18,68" fill="#F97316" opacity="0.6"/>
      <polygon points="50,50 82,32 82,68 50,86" fill="#0891B2"/>
      <polygon points="66,41 82,32 82,68 66,77" fill="#22D3EE" opacity="0.5"/>
      <polygon points="50,14 82,32 50,50 18,32" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
      <line x1="18" y1="32" x2="18" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
      <line x1="82" y1="32" x2="82" y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
      <line x1="50" y1="50" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
      <line x1="18" y1="68" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
      <line x1="82" y1="68" x2="50" y2="86" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
    </svg>
  );
}

const variants = [
  { name:"Onyx", front:"linear-gradient(145deg,#141414 0%,#2e2e2e 50%,#1a1a1a 100%)", shimmer:"radial-gradient(ellipse at 35% 25%,rgba(255,255,255,0.06) 0%,transparent 60%)", accent:"#D4D4D4", back:"linear-gradient(145deg,#0c0c0c 0%,#1e1e1e 100%)", swatch:"#2e2e2e", swatchBorder:"#666", shadow:"0 20px 50px rgba(0,0,0,0.85)" },
  { name:"Bronze", front:"linear-gradient(145deg,#3D2208 0%,#7A4A1E 35%,#A0622A 60%,#C17B3A 100%)", shimmer:"radial-gradient(ellipse at 40% 20%,rgba(255,220,150,0.18) 0%,transparent 55%)", accent:"#F5D5A0", back:"linear-gradient(145deg,#2A1500 0%,#5A3010 50%,#7A4A1E 100%)", swatch:"#8B5A2B", swatchBorder:"#C17B3A", shadow:"0 20px 50px rgba(120,70,20,0.5)" },
  { name:"Sage", front:"linear-gradient(145deg,#1A3A2A 0%,#2D5A40 40%,#3D7055 70%,#4A8060 100%)", shimmer:"radial-gradient(ellipse at 65% 25%,rgba(180,255,210,0.1) 0%,transparent 55%)", accent:"#AEDFC0", back:"linear-gradient(145deg,#0D2018 0%,#1A3A28 50%,#2D5A40 100%)", swatch:"#2D5A40", swatchBorder:"#4A8060", shadow:"0 20px 50px rgba(30,90,55,0.5)" },
  { name:"Navy", front:"linear-gradient(145deg,#0D1B35 0%,#1A2F5A 40%,#24437A 70%,#2E5490 100%)", shimmer:"radial-gradient(ellipse at 70% 20%,rgba(150,200,255,0.1) 0%,transparent 55%)", accent:"#A8C8F0", back:"linear-gradient(145deg,#070E1E 0%,#0D1B35 50%,#1A2F5A 100%)", swatch:"#1A2F5A", swatchBorder:"#2E5490", shadow:"0 20px 50px rgba(20,45,100,0.6)" },
  { name:"Ember", front:"linear-gradient(135deg,#C1410B 0%,#EA580C 35%,#F97316 65%,#FB923C 100%)", shimmer:"radial-gradient(ellipse at 30% 30%,rgba(255,220,150,0.2) 0%,transparent 55%)", accent:"#FED7AA", back:"linear-gradient(145deg,#6B1E04 0%,#B13A0A 50%,#C1410B 100%)", swatch:"#EA580C", swatchBorder:"#FB923C", shadow:"0 20px 50px rgba(234,88,12,0.5)" },
  { name:"Prism", front:"linear-gradient(135deg,#7C3AED 0%,#A855F7 35%,#EC4899 70%,#F43F5E 100%)", shimmer:"radial-gradient(ellipse at 60% 20%,rgba(255,200,255,0.18) 0%,transparent 55%)", accent:"#F5D0FE", back:"linear-gradient(145deg,#1E0050 0%,#4A008A 50%,#7C3AED 100%)", swatch:"#A855F7", swatchBorder:"#EC4899", shadow:"0 20px 50px rgba(168,85,247,0.5)" },
  { name:"Aurora", front:"linear-gradient(135deg,#0891B2 0%,#0EA5E9 25%,#22C55E 55%,#84CC16 80%,#FACC15 100%)", shimmer:"radial-gradient(ellipse at 40% 25%,rgba(200,255,240,0.18) 0%,transparent 55%)", accent:"#CCFBF1", back:"linear-gradient(145deg,#042830 0%,#065A48 50%,#0891B2 100%)", swatch:"#22C55E", swatchBorder:"#0EA5E9", shadow:"0 20px 50px rgba(6,182,212,0.45)" },
  { name:"Spectrum", front:"linear-gradient(135deg,#E63946 0%,#F4831F 18%,#F9C02A 36%,#2DC653 54%,#1BB8CC 70%,#4F46E5 85%,#9333EA 100%)", shimmer:"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,0.12) 0%,transparent 50%)", accent:"#FFFFFF", back:"linear-gradient(145deg,#0a0a14 0%,#141428 50%,#1a1a40 100%)", swatch:"linear-gradient(135deg,#E63946,#F9C02A,#2DC653,#1BB8CC,#9333EA)", swatchBorder:"#fff", shadow:"0 20px 50px rgba(100,50,200,0.4)" },
];

const memberNumbers = ["0847 2291","0012 8834","0001 0042","0000 0001","0391 4482","0055 6731","0128 0099","0000 0007"];

function CardFrontContent({ v, number }: { v: typeof variants[0], number: string }) {
  return (
    <div style={{ position:"absolute", inset:0, background:v.front, padding:"20px 22px 18px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      <div style={{ position:"absolute", inset:0, background:v.shimmer, pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
        <CubeLogo size={40} />
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, letterSpacing:"0.18em", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", marginBottom:3 }}>Card</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.75)", letterSpacing:"0.06em" }}>{v.name}</div>
        </div>
      </div>
      <div style={{ position:"relative" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, letterSpacing:"0.2em", color:"rgba(255,255,255,0.85)", marginBottom:8 }}>{number}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:"rgba(255,255,255,0.3)", letterSpacing:"0.12em", marginBottom:2, textTransform:"uppercase" }}>Member since</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.6)" }}>03 / 26</div>
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:v.accent, opacity:0.5, letterSpacing:"0.04em" }}>infracodebase university</div>
        </div>
      </div>
    </div>
  );
}

function CardBackContent({ v }: { v: typeof variants[0] }) {
  return (
    <div style={{ position:"absolute", inset:0, background:v.back, display:"flex", flexDirection:"column" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 120%,rgba(255,255,255,0.05) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ height:36, background:"rgba(0,0,0,0.65)", marginTop:20, flexShrink:0 }} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"6px 14px 14px" }}>
        <div style={{ textAlign:"center", lineHeight:1.1, marginBottom:14 }}>
          <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(15px,4.8vw,24px)", color:"#fff", textShadow:"2px 3px 0 rgba(0,0,0,0.4)", display:"block" }}>Learn Infrastructure</div>
          <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(15px,4.8vw,24px)", color:v.accent, textShadow:"2px 3px 0 rgba(0,0,0,0.4)", display:"block" }}>Differently.</div>
        </div>
        <div style={{ width:30, height:1, background:"rgba(255,255,255,0.12)", marginBottom:10 }} />
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, color:"rgba(255,255,255,0.22)", letterSpacing:"0.18em", textTransform:"uppercase" }}>infracodebase university</div>
      </div>
    </div>
  );
}

function FlipCard({ v, number, onClose }: { v: typeof variants[0], number: string, onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ width:"100%", maxWidth:380, margin:"0 auto" }}>
      <div className="flip-scene" onClick={() => setFlipped(f => !f)}>
        <div className={`flip-inner ${flipped ? "flipped" : ""}`} style={{ boxShadow:v.shadow, borderRadius:20 }}>
          <div className="flip-face"><div style={{ paddingBottom:"62%", position:"relative", borderRadius:20, overflow:"hidden" }}><CardFrontContent v={v} number={number} /></div></div>
          <div className="flip-face flip-back"><div style={{ paddingBottom:"62%", position:"relative", borderRadius:20, overflow:"hidden" }}><CardBackContent v={v} /></div></div>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:14, padding:"0 4px" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#ccc", letterSpacing:"0.15em", textTransform:"uppercase" }}>{flipped ? "← tap to flip back" : "✦ tap card to flip"}</div>
        <button onClick={onClose} style={{ fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:"0.1em", textTransform:"uppercase", color:"#ccc", background:"transparent", border:"1px solid #555", borderRadius:20, padding:"5px 12px", cursor:"pointer" }}>← all cards</button>
      </div>
    </div>
  );
}

function CardDeck({ onSelect }: { onSelect: (i: number) => void }) {
  const count = variants.length;
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ position:"relative", width:"100%", paddingBottom:"74%", userSelect:"none" }}>
      {variants.map((v, i) => {
        const mid = (count - 1) / 2;
        const rot = (i - mid) * 3.8, tx = (i - mid) * 13, ty = Math.abs(i - mid) * 2.5;
        const isHov = hovered === i;
        return (
          <div key={i} style={{ position:"absolute", width:"60%", left:"20%", top:"8%", zIndex:isHov ? 100 : i, transform:isHov ? `translateX(${tx}px) translateY(${ty-14}px) rotate(${rot}deg) scale(1.04)` : `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`, transition:"transform 0.3s cubic-bezier(0.4,0,0.2,1)", cursor:"pointer", boxShadow:isHov ? v.shadow : "0 8px 30px rgba(0,0,0,0.6)", borderRadius:20 }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={() => onSelect(i)}>
            <div style={{ paddingBottom:"62%", position:"relative", borderRadius:20, overflow:"hidden" }}><CardFrontContent v={v} number={memberNumbers[i]} /></div>
          </div>
        );
      })}
    </div>
  );
}

function Nav() {
  return (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(8,8,8,0.85)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"0 32px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <CubeLogo size={28} />
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#fff", letterSpacing:"0.06em" }}>Infracodebase University</span>
      </div>
      <div style={{ display:"flex", gap:28 }}>
        {["Benefits","How it works","Community"].map(l => (
          <span key={l} className="nav-link">{l}</span>
        ))}
      </div>
      <GetYourCardButton label="Get your card" />
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"55vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 24px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"20%", left:"30%", width:500, height:400, background:"radial-gradient(ellipse,rgba(168,85,247,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"40%", right:"20%", width:400, height:300, background:"radial-gradient(ellipse,rgba(6,182,212,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div className="fade-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:20 }}>
        Community Membership
      </div>
      <h1 className="fade-up delay-1" style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(42px,7vw,80px)", color:"#fff", lineHeight:1.05, marginBottom:24, maxWidth:700 }}>
        Learn Infrastructure<br />
        <span style={{ background:"linear-gradient(135deg,#E63946,#F9C02A,#2DC653,#1BB8CC,#9333EA)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Differently.</span>
      </h1>
      <p className="fade-up delay-2" style={{ fontFamily:"'Space Mono',monospace", fontSize:14, color:"#888", lineHeight:1.9, maxWidth:480, marginBottom:40 }}>
        A card that's more than access — it's identity.<br />Join a community of infrastructure builders.
      </p>
      <div className="fade-up delay-3" style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
        <button className="cta-btn" onClick={() => document.getElementById('picker')?.scrollIntoView({ behavior: 'smooth' })}>Get your card</button>
        <button className="cta-btn-outline" onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior:"smooth" })}>Explore benefits</button>
      </div>
    </section>
  );
}

function CardPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="picker" style={{ padding:"100px 24px", background:"#050505" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:14 }}>Choose your card</div>
          <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(28px,5vw,48px)", color:"#fff", lineHeight:1.1, marginBottom:16 }}>
            {selected !== null ? variants[selected].name : "Your card, your color."}
          </div>
          {selected === null && (
            <>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#777", lineHeight:1.9, marginBottom:24 }}>
                Every card opens the same doors.<br />Pick the one that feels like you.
              </div>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                {[["01","Click a card to select it"],["02","Flip it to discover what's behind"]].map(([n,t]) => (
                  <div key={n} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:28, padding:"11px 22px" }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#444" }}>{n}</span>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#ccc", letterSpacing:"0.04em" }}>{t}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ width:"100%", maxWidth:420, margin:"0 auto" }}>
          {selected !== null ? (
            <FlipCard v={variants[selected]} number={memberNumbers[selected]} onClose={() => setSelected(null)} />
          ) : (
            <>
              <CardDeck onSelect={setSelected} />
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginTop:28 }}>
                {variants.map((v, i) => (
                  <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                    <div onClick={() => setSelected(i)} style={{ width:26, height:26, borderRadius:"50%", cursor:"pointer", background:v.swatch, border:`2px solid ${v.swatchBorder}`, boxShadow:`0 0 10px ${v.swatchBorder}44`, transition:"transform 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform="scale(1.22)"} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform="scale(1)"} />
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:6, letterSpacing:"0.1em", textTransform:"uppercase", color:"#444" }}>{v.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'center', marginTop:'32px' }}><GetYourCardButton /></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon:"◈", title:"Full course library", desc:"Unlimited access to every infrastructure course, lab, and learning path — past, present, and future." },
  { icon:"✦", title:"Live sessions", desc:"Monthly live workshops, AMAs with senior engineers, and hands-on infrastructure challenges." },
  { icon:"▲", title:"Early access", desc:"New courses, tools, and features land in your hands before anyone else. Shape what we build next." },
  { icon:"●", title:"Verified badge", desc:"An infracodebase-verified badge on your profile, visible to employers and the wider community." },
];

function Benefits() {
  return (
    <section id="benefits" style={{ padding:"100px 24px", maxWidth:1000, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:14 }}>What's included</div>
        <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(28px,5vw,48px)", color:"#fff", lineHeight:1.1 }}>Built for builders.</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:16 }}>
        {benefits.map((b, i) => (
          <div key={i} className="benefit-card">
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:22, color:"#fff", opacity:0.5, marginBottom:20 }}>{b.icon}</div>
            <div style={{ fontFamily:"'Pacifico',cursive", fontSize:20, color:"#fff", marginBottom:10 }}>{b.title}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#666", lineHeight:1.9, letterSpacing:"0.02em" }}>{b.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"48px 44px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center" }}>
        <div>
          <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(22px,3.5vw,36px)", color:"#fff", lineHeight:1.15, marginBottom:20 }}>A community built around we, not just me.</div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#777", lineHeight:2, letterSpacing:"0.02em" }}>You may be studying infrastructure at night. Trying to stand out in a market full of identical job titles. Belonging changes everything. This card means you're not just learning. You're part of something.</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          {[
            { label:"Self-actualization", color:"rgba(168,85,247,0.3)", width:"40%", active:false },
            { label:"Esteem", color:"rgba(8,145,178,0.35)", width:"58%", active:false },
            { label:"Love & Belonging", color:"#22C55E", width:"76%", active:true },
            { label:"Safety & Security", color:"rgba(249,115,22,0.3)", width:"94%", active:false },
          ].map((tier, i) => (
            <div key={i} style={{ height:tier.active ? 44 : 36, width:tier.width, borderRadius:8, background:tier.color, border:tier.active ? "1px solid rgba(34,197,94,0.6)" : "1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:tier.active ? 10 : 9, color:"#fff", letterSpacing:"0.06em", fontWeight:tier.active ? 700 : 400 }}>{tier.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n:"01", title:"Choose your card", desc:"Pick the color that speaks to you. Every card unlocks the same full membership." },
  { n:"02", title:"Enroll online", desc:"Complete your enrollment in under two minutes. No complicated forms." },
  { n:"03", title:"Join the community", desc:"Find your cohort and start learning alongside 2,400+ infrastructure professionals." },
];

function HowItWorks() {
  return (
    <section id="how" style={{ padding:"100px 24px", background:"#050505" }}>
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:14 }}>How to get your card</div>
        <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(28px,5vw,48px)", color:"#fff", lineHeight:1.1, marginBottom:64 }}>Three steps in.</div>
        <div style={{ display:"flex", flexDirection:"column" }}>
          {steps.map((s, i) => (
            <div key={i}>
              <div style={{ display:"flex", gap:28, alignItems:"flex-start", textAlign:"left" }}>
                <div style={{ flexShrink:0, width:44, height:44, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#555" }}>{s.n}</span>
                </div>
                <div style={{ paddingTop:8 }}>
                  <div style={{ fontFamily:"'Pacifico',cursive", fontSize:22, color:"#fff", marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#555", lineHeight:1.9 }}>{s.desc}</div>
                </div>
              </div>
              {i < steps.length - 1 && <div className="step-line" style={{ marginLeft:22 }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop:56 }}>
          <GetYourCardButton />
        </div>
      </div>
    </section>
  );
}

function MiniCard({ v }: { v: typeof variants[0] }) {
  return (
    <div style={{ width:200, height:126, borderRadius:14, flexShrink:0, background:v.front, position:"relative", overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.5)" }}>
      <div style={{ position:"absolute", inset:0, background:v.shimmer }} />
      <div style={{ position:"absolute", top:14, left:14 }}><CubeLogo size={26} /></div>
      <div style={{ position:"absolute", bottom:14, left:14, right:14 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:7, letterSpacing:"0.18em", color:"rgba(255,255,255,0.85)", marginBottom:4 }}>•••• •••• ••••</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:6, color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{v.name}</div>
      </div>
    </div>
  );
}

function CardMarquee() {
  const row1 = [...variants, ...variants];
  const row2 = [...[...variants].reverse(), ...[...variants].reverse()];
  return (
    <section style={{ padding:"80px 0", overflow:"hidden", background:"#080808" }}>
      <div style={{ textAlign:"center", marginBottom:48, padding:"0 24px" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:14 }}>8 designs</div>
        <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(28px,5vw,48px)", color:"#fff", lineHeight:1.1 }}>Our collection.</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ overflow:"hidden", maskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)", WebkitMaskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)" }}>
          <div className="marquee-track marquee-track-fwd" style={{ gap:16 }}>
            {row1.map((v, i) => <MiniCard key={i} v={v} />)}
          </div>
        </div>
        <div style={{ overflow:"hidden", maskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)", WebkitMaskImage:"linear-gradient(to right,transparent,black 8%,black 92%,transparent)" }}>
          <div className="marquee-track marquee-track-rev" style={{ gap:16 }}>
            {row2.map((v, i) => <MiniCard key={i} v={v} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section style={{ padding:"120px 24px", background:"#050505", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:400, background:"radial-gradient(ellipse,rgba(168,85,247,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"relative" }}>
        <div style={{ marginBottom:32, display:"flex", justifyContent:"center" }}><CubeLogo size={56} /></div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:"0.22em", textTransform:"uppercase", color:"#999", marginBottom:16 }}>Ready to join?</div>
        <div style={{ fontFamily:"'Pacifico',cursive", fontSize:"clamp(32px,5vw,60px)", color:"#fff", lineHeight:1.1, marginBottom:16 }}>Your card is waiting.</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#555", lineHeight:1.9, maxWidth:380, margin:"0 auto 44px" }}>
          Pick your color. Enroll today.<br />Learn forever.
        </div>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <GetYourCardButton />
          <button className="cta-btn-outline" onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior:"smooth" })}>View all benefits</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding:"40px 32px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <CubeLogo size={22} />
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#333", letterSpacing:"0.08em" }}>Infracodebase University</span>
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#2a2a2a", letterSpacing:"0.06em" }}>
        © 2026 — Community Membership
      </div>
    </footer>
  );
}

export default function CommunityCards() {
  return (
    <>
      <style>{css}</style>
      <div style={{ background:"#080808", minHeight:"100vh" }}>
        <Hero />
        <div className="divider" />
        <CardPicker />
        <div className="divider" />
        <Benefits />
        <div className="divider" />
        <HowItWorks />
        <CardMarquee />
        <div style={{ display:'flex', justifyContent:'center', padding:'32px 0' }}><GetYourCardButton /></div>
        <div className="divider" />
        <FinalCTA />
      </div>
    </>
  );
}
