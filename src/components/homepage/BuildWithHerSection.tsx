import { useTheme } from "@/contexts/ThemeContext";
import { Video, Globe, MessageCircle, Layout } from "lucide-react";

const fontDisplay: React.CSSProperties = { fontFamily: "'Fraunces', serif" };
const fontMono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };

const features = [
  { icon: Video, title: "Live workshops and webinars", desc: "Monthly sessions covering real topics — not just theory." },
  { icon: Layout, title: "Builder Wall", desc: "Publish your work publicly and get visibility as you build." },
  { icon: Globe, title: "Global community — 20+ countries", desc: "People at every stage of the journey, learning and building together." },
  { icon: MessageCircle, title: "Live Q&A and mentorship", desc: "Get unstuck. Ask the question you were afraid to ask." },
];

export function BuildWithHerSection() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const bg = dark ? "#131316" : "#f5f6f8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const heading = dark ? "#ffffff" : "#0f172a";
  const muted = dark ? "#6b6f78" : "#475569";
  const amber = "#e86030";

  return (
    <section style={{ background: bg, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <span className="text-[11px] tracking-[0.25em] uppercase mb-4 inline-block" style={{ ...fontMono, color: muted }}>BUILD WITH HER</span>
        <h2 style={{ ...fontDisplay, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, color: heading }}>
          Learning is easier{" "}
          <em className="font-light" style={{ color: amber }}>with others.</em>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 mt-12 items-start">
          {/* Left */}
          <div>
            <p style={{ ...fontMono, fontSize: 14, lineHeight: 1.75, color: muted }}>
              Infracodebase University is part of a wider ecosystem designed to make sure you never have to build alone. Build with Her is the community layer — workshops, live sessions, mentorship, and a global network of people working to close the gap in cloud engineering.
            </p>
            <p className="mt-4" style={{ ...fontMono, fontSize: 14, lineHeight: 1.75, color: muted }}>
              Open to everyone who believes access to this field should be equal. Whether you're just starting or already mid-journey, the community meets you where you are.
            </p>
            <a
              href="https://buildwithher.infracodebase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium mt-8 transition-all duration-300 cursor-pointer"
              style={{ background: amber, color: "#fff" }}
            >
              <span style={fontMono}>Explore Build with Her ↗</span>
            </a>
          </div>

          {/* Right — 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} style={{ background: dark ? "#0d0f11" : "#ffffff", border: `1px solid ${border}`, borderRadius: 10, padding: 20 }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${amber}18` }}>
                  <f.icon style={{ width: 20, height: 20, color: amber }} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: heading }}>{f.title}</div>
                <p className="mt-1" style={{ ...fontMono, fontSize: 12, color: muted, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}