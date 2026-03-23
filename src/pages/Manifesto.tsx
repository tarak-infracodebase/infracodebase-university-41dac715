import { Link } from "react-router-dom";
import "@fontsource/caveat/700.css";
import signatureImg from "@/assets/signature.png";

type ParagraphStyle = "statement" | "narrative" | "supporting" | "emphasis";

interface ManifestoParagraph {
  text: string;
  style: ParagraphStyle;
}

const manifestoParagraphs: ManifestoParagraph[] = [
  { text: "You don't learn infrastructure by watching tutorials.", style: "statement" },
  { text: "You learn it by building systems.", style: "statement" },
  { text: "You learn it by asking why an architecture exists.\nWhy a platform was designed a certain way.\nWhy a system survives failure — or doesn't.", style: "narrative" },
  { text: "Infrastructure runs everything now.", style: "statement" },
  { text: "Every product you use.\nEvery startup you admire.\nEvery AI system being built.", style: "supporting" },
  { text: "Behind all of it are architectures.\nNetworks.\nPlatforms.\nAutomation.", style: "supporting" },
  { text: "But most people never learn how those systems are actually designed.", style: "narrative" },
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
  { text: "Once you see those patterns, everything changes.", style: "statement" },
  { text: "You stop thinking about configuration.", style: "narrative" },
  { text: "You start thinking about architecture.", style: "statement" },
  { text: "You stop asking how to deploy something.", style: "narrative" },
  { text: "You start asking how the system should work.", style: "narrative" },
  { text: "How it should scale.\nHow it should fail safely.\nHow teams should interact with it.", style: "supporting" },
  { text: "This is what real infrastructure engineering looks like.", style: "narrative" },
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
  return (
    <div className="min-h-screen bg-[hsl(0,0%,100%)] text-[hsl(228,20%,12%)] selection:bg-[hsl(260,70%,58%)/0.15]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-6 md:pt-28 md:pb-8">
        {/* Rainbow wordmark */}
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
          Learn Infrastructure
          <br />
          Differently.
        </h1>

        <p className="mt-6 max-w-lg text-center text-base md:text-lg leading-relaxed text-[hsl(220,10%,40%)] font-sans">
          Modern infrastructure isn't learned through tutorials.
          <br />
          You learn it by understanding systems.
        </p>

        <Link
          to="/curriculum"
          className="mt-8 inline-flex items-center rounded-full bg-[hsl(228,20%,10%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,18%)] transition-colors"
        >
          Begin training →
        </Link>
      </section>

      {/* Manifesto */}
      <section className="px-6 pt-4 md:pt-6 pb-12 md:pb-20">
        <div className="mx-auto max-w-[620px]">
          {manifestoParagraphs.map((p, i) => (
            <p
              key={i}
              className={`font-sans leading-[1.75] whitespace-pre-line ${styleClasses[p.style]} ${i === 0 ? "!mt-0" : ""}`}
            >
              {p.text}
            </p>
          ))}

          {/* Signature */}
          <div className="pt-12 md:pt-16">
            <img
              src={signatureImg}
              alt="Founder's signature"
              className="w-[220px] md:w-[260px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 pt-6 pb-20 md:pb-28">
        <p className="text-base md:text-lg text-[hsl(220,10%,40%)] text-center font-sans">
          Ready to start building real systems?
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center rounded-full bg-[hsl(228,20%,10%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,18%)] transition-colors"
        >
          Enter Infracodebase University
        </Link>
      </section>
    </div>
  );
};

export default Manifesto;
