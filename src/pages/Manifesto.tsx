import { Link } from "react-router-dom";
import "@fontsource/caveat/700.css";
import { CrystalIcon } from "@/components/DashboardWidgets";

const manifestoParagraphs = [
  "You don't learn infrastructure by watching tutorials.",
  "You learn it by building systems.",
  "You learn it by asking why an architecture exists.\nWhy a platform was designed a certain way.\nWhy a system survives failure or doesn't.",
  "Infrastructure runs everything now.",
  "Every product you use.\nEvery startup you admire.\nEvery AI system being built.",
  "Behind all of it are architectures.\nNetworks.\nPlatforms.\nAutomation.",
  "But most people never learn how those systems are actually designed.",
  "They learn services.",
  "They memorize commands.\nThey follow steps.\nThey deploy examples.",
  "But they never learn how to think like an infrastructure engineer.",
  "They never learn how systems behave when they scale.\nHow architectures evolve over time.\nHow small decisions turn into technical debt.\nOr resilience.",
  "That's the gap.",
  "And that's why Infracodebase University exists.",
  "Not to teach you tools.",
  "Tools change every year.",
  "To teach you how to see systems.",
  "To understand how infrastructure is structured.\nHow platform teams design environments.\nHow security, networking, automation, and governance connect.",
  "Once you see those patterns, everything changes.",
  "You stop thinking about configuration.",
  "You start thinking about architecture.",
  "You stop asking how to deploy something.",
  "You start asking how the system should work.",
  "How it should scale.\nHow it should fail safely.\nHow teams should interact with it.",
  "This is what real infrastructure engineering looks like.",
  "It's not a checklist.",
  "It's systems thinking.",
  "And once you start seeing infrastructure that way, the way you build technology changes forever.",
  "That's the journey you begin here.",
  "Welcome to Infracodebase University.",
  "Learn. Build. Grow.",
];

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,100%)] text-[hsl(228,20%,12%)] selection:bg-[hsl(260,70%,58%)/0.15]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-24 md:pt-44 md:pb-36">
        <CrystalIcon size={48} color="hsl(260,70%,58%)" />

        <h1
          className="mt-16 text-5xl md:text-7xl lg:text-8xl text-center leading-[1.15] tracking-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Learn Infrastructure
          <br />
          Differently.
        </h1>

        <p className="mt-12 max-w-lg text-center text-base md:text-lg leading-relaxed text-[hsl(220,10%,40%)] font-sans">
          Modern infrastructure isn't learned through tutorials.
          <br />
          You learn it by understanding systems.
        </p>

        <Link
          to="/curriculum"
          className="mt-14 inline-flex items-center rounded-full bg-[hsl(228,20%,12%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,20%)] transition-colors"
        >
          Explore Infracodebase University
        </Link>
      </section>

      {/* Manifesto */}
      <section className="px-6 py-24 md:py-36">
        <div className="mx-auto max-w-xl space-y-10 md:space-y-14">
          {manifestoParagraphs.map((text, i) => {
            const isShort = !text.includes("\n") && text.length < 50;
            return (
              <p
                key={i}
                className={`font-sans leading-relaxed whitespace-pre-line ${
                  isShort
                    ? "text-xl md:text-2xl font-semibold text-[hsl(228,20%,12%)]"
                    : "text-base md:text-lg text-[hsl(220,10%,40%)]"
                }`}
              >
                {text}
              </p>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 pt-16 pb-32 md:pb-44">
        <p className="text-base md:text-lg text-[hsl(220,10%,40%)] text-center font-sans">
          Start learning modern infrastructure architecture.
        </p>
        <Link
          to="/curriculum"
          className="mt-10 inline-flex items-center rounded-full bg-[hsl(228,20%,12%)] px-8 py-3.5 text-sm font-medium text-[hsl(0,0%,100%)] hover:bg-[hsl(228,20%,20%)] transition-colors"
        >
          Browse Learning Paths
        </Link>
      </section>
    </div>
  );
};

export default Manifesto;
