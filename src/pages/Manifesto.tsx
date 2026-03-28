import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "@fontsource/caveat/700.css";
import signatureImg from "@/assets/signature.png";

type ParagraphStyle = "statement" | "narrative" | "supporting" | "emphasis";

interface ManifestoParagraph {
  text: string;
  style: ParagraphStyle;
  section?: string;
}

const sections = [
  { id: "who", label: "Who we are" },
  { id: "what", label: "What we're building" },
  { id: "how", label: "How we support you" },
  { id: "community", label: "Our community — global" },
  { id: "problem", label: "The problem we're here to solve" },
];

const manifestoParagraphs: ManifestoParagraph[] = [
  // Who we are
  { text: "You don't learn infrastructure by watching tutorials.", style: "statement", section: "who" },
  { text: "You learn it by building systems.", style: "statement" },
  { text: "You learn it by asking why an architecture exists.\nWhy a platform was designed a certain way.\nWhy a system survives failure — or doesn't.", style: "narrative" },
  // What we're building
  { text: "Infrastructure runs everything now.", style: "statement", section: "what" },
  { text: "Every product you use.\nEvery startup you admire.\nEvery AI system being built.", style: "supporting" },
  { text: "Behind all of it are architectures.\nNetworks.\nPlatforms.\nAutomation.", style: "supporting" },
  // How we support you
  { text: "But most people never learn how those systems are actually designed.", style: "narrative", section: "how" },
  { text: "They learn services.", style: "statement" },
  { text: "They memorize commands.\nThey follow steps.\nThey deploy examples.", style: "narrative" },
  { text: "But they never learn how to think like an infrastructure engineer.", style: "narrative" },
  { text: "They never learn how systems behave when they scale.\nHow architectures evolve over time.\nHow small decisions turn into technical debt.\nOr resilience.", style: "narrative" },
  { text: "That's the gap.", style: "emphasis" },
  { text: "And that's why Infracodebase University exists.", style: "statement" },
  { text: "Not to teach you tools.", style: "narrative" },
  { text: "Tools change every year.", style: "narrative" },
  { text: "To teach you how to see systems.", style: "statement" },
  { text: "To understand how infrastructure is structured.\nHow platform teams design environments.\nHow security, networking, automation, and governance connect.", style: "narrative" },
  // Our community — global
  { text: "Once you see those patterns, everything changes.", style: "statement", section: "community" },
  { text: "You stop thinking about configuration.", style: "narrative" },
  { text: "You start thinking about architecture.", style: "statement" },
  { text: "You stop asking how to deploy something.", style: "narrative" },
  { text: "You start asking how the system should work.", style: "narrative" },
  { text: "How it should scale.\nHow it should fail safely.\nHow teams should interact with it.", style: "supporting" },
  // The problem we're here to solve
  { text: "This is what real infrastructure engineering looks like.", style: "narrative", section: "problem" },
  { text: "It's not a checklist.", style: "emphasis" },
  { text: "It's systems thinking.", style: "emphasis" },
  { text: "And once you start seeing infrastructure that way, the way you build technology changes forever.", style: "narrative" },
  { text: "That's the journey you begin here.", style: "statement" },
  { text: "Welcome to Infracodebase University.", style: "statement" },
  { text: "Learn. Build. Grow.", style: "statement" },
];

const styleClasses: Record<ParagraphStyle, string> = {
  statement: "text-[17px] md:text-[19px] font-normal text-[#111] mt-10 md:mt-12",
  narrative: "text-[17px] md:text-[19px] font-normal text-[#111] mt-7 md:mt-9",
  supporting: "text-[17px] md:text-[19px] font-normal text-[#111] mt-7 md:mt-9",
  emphasis: "text-[17px] md:text-[19px] font-medium text-[#111] mt-10 md:mt-12",
};

const Manifesto = () => {
  let currentSection = 0;

  return (
    <>
      <Helmet>
        <title>Our Story — Infracodebase University</title>
        <meta name="description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here. The story behind Infracodebase University." />
        <link rel="canonical" href="https://university.infracodebase.com/our-story" />
        <meta property="og:title" content="Our Story — Infracodebase University" />
        <meta property="og:description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here." />
        <meta property="og:url" content="https://university.infracodebase.com/our-story" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://university.infracodebase.com/og/manifesto.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Infracodebase University" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Story — Infracodebase University" />
        <meta name="twitter:description" content="Whether you are new to infrastructure entirely, or transitioning from another role — you belong here." />
        <meta name="twitter:image" content="https://university.infracodebase.com/og/manifesto.png" />
      </Helmet>
      <div className="min-h-screen bg-[hsl(0,0%,100%)] text-[hsl(228,20%,12%)] selection:bg-[hsl(260,70%,58%)/0.15]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-6 md:pt-28 md:pb-8">
        <h2
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #61BB46, #FDB827, #F5821F, #E03A3E, #963D97, #009DDC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Infracodebase University
        </h2>

        <h1
          className="mt-8 md:mt-10 text-5xl md:text-7xl lg:text-8xl text-center leading-[1.15] tracking-tight text-[hsl(228,20%,10%)]"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Our Story
        </h1>

        <p className="mt-6 max-w-lg text-center text-base md:text-lg leading-relaxed text-[hsl(220,10%,40%)] font-sans">
          Whether you are new to infrastructure entirely, or transitioning from another role — you belong here.
        </p>

        <Link
          to="/training"
          className="mt-8 inline-flex items-center rounded-full bg-[hsl(228,20%,10%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,18%)] transition-colors"
        >
          Begin training →
        </Link>
      </section>

      {/* Content */}
      <section className="px-6 pt-4 md:pt-6 pb-12 md:pb-20">
        <div className="mx-auto max-w-[620px]">
          {manifestoParagraphs.map((p, i) => {
            let sectionHeader = null;
            if (p.section) {
              const sec = sections[currentSection];
              sectionHeader = (
                <div key={`section-${currentSection}`} className={currentSection === 0 ? "" : "mt-16 md:mt-20"}>
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[hsl(220,10%,60%)]" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {String(currentSection + 1).padStart(2, "0")} — {sec.label}
                  </span>
                </div>
              );
              currentSection++;
            }
            return (
              <div key={i}>
                {sectionHeader}
                <p className={`font-sans leading-[1.75] whitespace-pre-line ${styleClasses[p.style]} ${i === 0 ? "!mt-4" : ""}`}>
                  {p.text}
                </p>
              </div>
            );
          })}

          {/* Signature */}
          <div className="pt-12 md:pt-16">
            <img
              src={signatureImg}
              alt="Founder's signature"
              className="w-[220px] md:w-[260px] h-auto"
            />
          </div>

          {/* Closing card */}
          <div className="mt-16 rounded-xl p-8" style={{ background: "#131316", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-base leading-relaxed text-[#f0ece3]" style={{ fontFamily: "'Fraunces', serif" }}>
              "This journey is easier with others. That is why Infracodebase University is part of a wider ecosystem designed to make sure you never have to build alone."
            </p>
            <a
              href="https://buildwithher.infracodebase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium mt-6 transition-all duration-300 cursor-pointer"
              style={{ background: "#e86030", color: "#fff", fontFamily: "'DM Mono', monospace" }}
            >
              Explore Build with Her ↗
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 pt-6 pb-20 md:pb-28">
        <p className="text-base md:text-lg text-[hsl(220,10%,40%)] text-center font-sans">
          Ready to start building real systems?
        </p>
        <Link
          to="/training"
          className="mt-6 inline-flex items-center rounded-full bg-[hsl(228,20%,10%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,18%)] transition-colors"
        >
          Begin training →
        </Link>
      </section>
    </div>
    </>
  );
};

export default Manifesto;