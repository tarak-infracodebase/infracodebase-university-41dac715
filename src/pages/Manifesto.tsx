import { Link } from "react-router-dom";
import "@fontsource/caveat/700.css";
import signatureImg from "@/assets/signature.png";
import { AppLayout } from "@/components/AppLayout";

type ParagraphStyle = "statement" | "narrative" | "supporting";

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
  { text: "That's the gap.", style: "statement" },
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
  { text: "It's not a checklist.", style: "statement" },
  { text: "It's systems thinking.", style: "statement" },
  { text: "And once you start seeing infrastructure that way, the way you build technology changes forever.", style: "narrative" },
  { text: "That's the journey you begin here.", style: "statement" },
  { text: "Welcome to Infracodebase University.", style: "statement" },
  { text: "Learn. Build. Grow.", style: "statement" },
];

const styleClasses: Record<ParagraphStyle, string> = {
  statement: "text-[22px] md:text-[26px] font-semibold text-foreground mt-14 md:mt-16",
  narrative: "text-[16px] md:text-[18px] text-muted-foreground mt-8 md:mt-10",
  supporting: "text-[15px] md:text-[16px] text-muted-foreground/70 mt-8 md:mt-10",
};

const Manifesto = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/15">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-6 pt-16 pb-10 md:pt-24 md:pb-12">
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
            className="mt-10 md:mt-14 text-5xl md:text-7xl lg:text-8xl text-center leading-[1.15] tracking-tight text-foreground"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Learn Infrastructure
            <br />
            Differently.
          </h1>

          <p className="mt-10 max-w-lg text-center text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
            Modern infrastructure isn't learned through tutorials.
            <br />
            You learn it by understanding systems.
          </p>

          <Link
            to="/curriculum"
            className="mt-12 inline-flex items-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            Explore Infracodebase University
          </Link>
        </section>

        {/* Manifesto */}
        <section className="px-6 pt-6 md:pt-8 pb-24 md:pb-36">
          <div className="mx-auto max-w-[680px]">
            {manifestoParagraphs.map((p, i) => (
              <p
                key={i}
                className={`font-sans leading-[1.65] whitespace-pre-line ${styleClasses[p.style]} ${i === 0 ? "!mt-0" : ""}`}
              >
                {p.text}
              </p>
            ))}

            {/* Signature */}
            <div className="pt-16 md:pt-20">
              <img
                src={signatureImg}
                alt="Founder's signature"
                className="w-[220px] md:w-[260px] h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center px-6 pt-12 pb-32 md:pb-44">
          <p className="text-base md:text-lg text-muted-foreground text-center font-sans">
            Ready to start building real systems?
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-flex items-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            Enter Infracodebase University
          </Link>
        </section>
      </div>
    </AppLayout>
  );
};

export default Manifesto;
