import { AppLayout } from "@/components/AppLayout";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Radio, ArrowRight, Play, ExternalLink, Globe, Zap } from "lucide-react";

import legalBg from "@/assets/events/legal-background.png";
import webinarAi from "@/assets/events/webinar-ai-trust.png";
import webinarDec from "@/assets/events/webinar-dec.png";
import webinarFeb from "@/assets/events/webinar-feb.png";
import webinarLalit from "@/assets/events/webinar-lalit.png";
import webinarShannon from "@/assets/events/webinar-shannon.png";

type SeriesFilter = "all" | "infracodebase" | "buildwithher";
type TypeFilter = "all" | "conversation" | "technical" | "webinar" | "career";

interface EventItem {
  id: number;
  title: string;
  series: "infracodebase" | "buildwithher";
  type: "Technical Session" | "Live Webinar" | "Conversation" | "Career Talk";
  speakers: { name: string; role?: string }[];
  link: string;
  platform: "youtube" | "linkedin";
  thumbnail: string;
  featured?: boolean;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Building Self-Service, Secure, and Scalable Developer Platforms",
    series: "infracodebase",
    type: "Technical Session",
    speakers: [{ name: "Lalit", role: "Sr Cloud Architect" }, { name: "Tarak", role: "Co-Founder" }, { name: "Justin", role: "Founder" }],
    link: "https://www.youtube.com/watch?v=vOMo1RquRsY",
    platform: "youtube",
    thumbnail: webinarLalit,
    featured: true,
  },
  {
    id: 2,
    title: "Legal Background to Cloud Engineering: What It Really Takes",
    series: "buildwithher",
    type: "Career Talk",
    speakers: [{ name: "Tarak", role: "Co-Founder" }, { name: "Fatima", role: "Software Engineer" }],
    link: "https://www.linkedin.com/events/7437983286372626433/?viewAsMember=true",
    platform: "linkedin",
    thumbnail: legalBg,
  },
  {
    id: 3,
    title: "Building with AI You Can Trust",
    series: "infracodebase",
    type: "Technical Session",
    speakers: [{ name: "Fatima", role: "Software Engineer" }, { name: "Tarak", role: "Co-Founder" }],
    link: "https://www.youtube.com/watch?v=mlIePKsqa-4",
    platform: "youtube",
    thumbnail: webinarAi,
  },
  {
    id: 4,
    title: "Delivering Secure Cloud Infrastructure at Scale with AI",
    series: "infracodebase",
    type: "Live Webinar",
    speakers: [{ name: "Justin", role: "Founder" }, { name: "Seif Hateb", role: "Lead Security Engineer" }],
    link: "https://www.youtube.com/watch?v=SLpgv8zCzPU",
    platform: "youtube",
    thumbnail: webinarDec,
  },
  {
    id: 5,
    title: "Operating Cloud Engineering at Scale",
    series: "infracodebase",
    type: "Live Webinar",
    speakers: [{ name: "Alex", role: "Director, Cloud Engineering" }, { name: "Tarak", role: "Co-Founder" }, { name: "Justin", role: "Founder" }],
    link: "https://www.youtube.com/watch?v=H8Osx6GcLSE",
    platform: "youtube",
    thumbnail: webinarFeb,
  },
  {
    id: 6,
    title: "No Straight Lines: Breaking into Tech and Rising to Leadership",
    series: "buildwithher",
    type: "Conversation",
    speakers: [{ name: "Shannon", role: "Principal Solutions Architect" }],
    link: "https://www.youtube.com/watch?v=vOMo1RquRsY",
    platform: "youtube",
    thumbnail: webinarShannon,
  },
];

const typeColors: Record<string, string> = {
  "Technical Session": "bg-crystal-violet/10 text-crystal-violet border-crystal-violet/20",
  "Live Webinar": "bg-crystal-cyan/10 text-crystal-cyan border-crystal-cyan/20",
  "Conversation": "bg-crystal-magenta/10 text-crystal-magenta border-crystal-magenta/20",
  "Career Talk": "bg-crystal-green/10 text-crystal-green border-crystal-green/20",
};

const speakerInitialColors: Record<string, string> = {
  Lalit: "hsl(var(--crystal-violet))",
  Tarak: "hsl(var(--crystal-cyan))",
  Justin: "hsl(var(--crystal-green))",
  Shannon: "hsl(var(--crystal-magenta))",
  Alex: "hsl(var(--crystal-orange))",
  Fatima: "hsl(var(--crystal-yellow))",
  "Seif Hateb": "hsl(var(--crystal-red))",
};

function SpeakerAvatar({ name }: { name: string }) {
  const bg = speakerInitialColors[name] || "hsl(var(--muted))";
  return (
    <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ring-2 ring-background" style={{ backgroundColor: bg }}>
      {name[0]}
    </div>
  );
}

function SegmentedSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const activeIdx = options.findIndex(o => o.value === value);
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>("[data-seg-btn]");
    if (buttons[activeIdx]) {
      const btn = buttons[activeIdx];
      setHighlight({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [value, options]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider shrink-0">{label}</span>
      <div
        ref={containerRef}
        className="relative flex items-center rounded-full bg-muted/40 border border-border/50 p-1 backdrop-blur-sm shadow-[0_0_12px_-4px_hsl(var(--primary)/0.15)]"
      >
        {/* Sliding highlight */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-primary/15 border border-primary/25 shadow-[0_0_8px_-2px_hsl(var(--primary)/0.3)] transition-all duration-[250ms] ease-out"
          style={{ left: highlight.left, width: highlight.width }}
        />
        {options.map(opt => (
          <button
            key={opt.value}
            data-seg-btn
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 whitespace-nowrap",
              value === opt.value
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/70"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-xl overflow-hidden bg-card border border-border/30 transition-all duration-[250ms] ease-out hover:scale-105 hover:-translate-y-1.5 hover:z-10 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.3),0_4px_16px_-4px_hsl(0_0%_0%/0.4)] hover:border-primary/30 block"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-[250ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        <span className={cn("absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full border backdrop-blur-sm font-medium", typeColors[event.type])}>
          {event.type}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms]">
          <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {event.speakers.map(s => <SpeakerAvatar key={s.name} name={s.name} />)}
          </div>
          <span className="text-[11px] text-muted-foreground truncate">
            {event.speakers.map(s => s.name).join(", ")}
          </span>
        </div>
        <button className="w-full rounded-lg bg-primary/10 text-primary px-4 py-2 text-xs font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
          {event.platform === "youtube" ? "Watch on YouTube" : "Join on LinkedIn"}
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </a>
  );
}

const Events = () => {
  const [seriesFilter, setSeriesFilter] = useState<SeriesFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const featured = events.find(e => e.featured);

  const filtered = events.filter(e => {
    if (seriesFilter !== "all" && e.series !== seriesFilter) return false;
    if (typeFilter === "technical" && e.type !== "Technical Session") return false;
    if (typeFilter === "webinar" && e.type !== "Live Webinar") return false;
    if (typeFilter === "conversation" && e.type !== "Conversation") return false;
    if (typeFilter === "career" && e.type !== "Career Talk") return false;
    return true;
  });

  const infraEvents = filtered.filter(e => e.series === "infracodebase");
  const bwhEvents = filtered.filter(e => e.series === "buildwithher");

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8 space-y-12">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4">Events</span>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Learn. Build. Grow.</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every week we share a technical lecture, an engineering conversation, and a platform update so builders can learn from real systems and grow together.
          </p>
        </div>

        {/* Disney+ Style Filters */}
        <div className="flex flex-col items-center gap-4">
          <SegmentedSelector<SeriesFilter>
            label="Series"
            options={[
              { value: "all", label: "All" },
              { value: "infracodebase", label: "Infracodebase" },
              { value: "buildwithher", label: "Build With Her" },
            ]}
            value={seriesFilter}
            onChange={setSeriesFilter}
          />
          <SegmentedSelector<TypeFilter>
            label="Type"
            options={[
              { value: "all", label: "All Types" },
              { value: "conversation", label: "Conversation" },
              { value: "technical", label: "Technical Session" },
              { value: "webinar", label: "Live Webinar" },
              { value: "career", label: "Career Talk" },
            ]}
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </div>

        {/* Inside a Session */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Inside a Session</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Real architecture discussions", "Hands-on problem solving", "Open technical questions", "Shared learning from real experiences", "Builders helping builders"].map(chip => (
              <span key={chip} className="text-[11px] px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground">{chip}</span>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="glass-panel rounded-lg p-4 text-center">
              <Globe className="h-5 w-5 mx-auto mb-2 text-crystal-cyan" />
              <p className="text-xs text-muted-foreground">Builders from multiple countries</p>
            </div>
            <div className="glass-panel rounded-lg p-4 text-center">
              <Radio className="h-5 w-5 mx-auto mb-2 text-crystal-magenta" />
              <p className="text-xs text-muted-foreground">Weekly live sessions</p>
            </div>
            <div className="glass-panel rounded-lg p-4 text-center">
              <Zap className="h-5 w-5 mx-auto mb-2 text-crystal-violet" />
              <p className="text-xs text-muted-foreground">Cloud · AI · Infrastructure</p>
            </div>
          </div>
        </div>

        {/* Featured Session */}
        {featured && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Featured Session</h2>
            <a href={featured.link} target="_blank" rel="noopener noreferrer" className="glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-primary/20 transition-all duration-[250ms] group block">
              <div className="md:w-[400px] shrink-0 relative overflow-hidden">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover min-h-[200px] transition-transform duration-[250ms] group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
              </div>
              <div className="flex-1 flex flex-col justify-center p-6">
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full border w-fit mb-3", typeColors[featured.type])}>{featured.type}</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{featured.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-1.5">
                    {featured.speakers.map(s => <SpeakerAvatar key={s.name} name={s.name} />)}
                  </div>
                  <span className="text-xs text-muted-foreground">{featured.speakers.map(s => s.name).join(", ")}</span>
                </div>
                <button className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 w-fit">
                  Watch Session <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </a>
          </div>
        )}

        {/* Filters removed — now placed under hero */}

        {/* Series: Infracodebase */}
        {(seriesFilter === "all" || seriesFilter === "infracodebase") && infraEvents.length > 0 && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-1">Infracodebase</h2>
              <p className="text-xs text-muted-foreground">Technical deep dives into platform engineering, AI infrastructure, security practices, and real-world cloud systems.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {infraEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        )}

        {/* Series: Build With Her */}
        {(seriesFilter === "all" || seriesFilter === "buildwithher") && bwhEvents.length > 0 && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-1">Build With Her</h2>
              <p className="text-xs text-muted-foreground">Conversations with builders about career paths, leadership journeys, and breaking into infrastructure and cloud engineering.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bwhEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        )}

        {/* Watch All Sessions */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Watch All Sessions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
