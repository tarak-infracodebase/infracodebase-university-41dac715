import { AppLayout } from "@/components/AppLayout";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Search, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";

const videoTopics = [
  "All", "Getting Started", "Infrastructure Architecture", "Enterprise Governance",
];

interface VideoItem {
  id: string;
  title: string;
  src: string;
  category: string;
  description: string;
  trackLabel: string;
  trackPath: string;
  badge?: string;
  thumbnail?: string;
}

const videos: VideoItem[] = [
  {
    id: "intro",
    title: "Introduction to Infracodebase",
    src: "/assets/Introduction.mp4",
    category: "Getting Started",
    description: "Start here to understand what Infracodebase is, how the platform works, and how infrastructure teams collaborate with AI agents.",
    trackLabel: "Track 2 — Foundations: Understanding Infracodebase",
    trackPath: "/path/foundations",
  },
  {
    id: "applying",
    title: "Applying Infracodebase to Real Infrastructure",
    src: "/assets/Applying_Infracodebase2.mp4",
    category: "Infrastructure Architecture",
    description: "A practical walkthrough showing how infrastructure systems are designed, generated, and evolved using the Infracodebase model.",
    trackLabel: "Track 3 — Real Infrastructure Engineering",
    trackPath: "/path/real-infrastructure",
  },
  {
    id: "architecture-diagrams",
    title: "Architecture Diagrams & Living Documentation",
    src: "/assets/Architecture_Diagrams.mp4",
    category: "Infrastructure Architecture",
    description: "Learn how to create, maintain, and evolve architecture diagrams and living documentation that stay synchronized with your real infrastructure.",
    trackLabel: "Track 4 — Architecture Diagrams & Living Documentation",
    trackPath: "/path/architecture-diagrams",
  },
  {
    id: "enterprise-governance",
    title: "Enterprise Governance & Platform Engineering",
    src: "/assets/Scaling_infra_-_veed.mp4",
    category: "Enterprise Governance",
    description: "Learn how organizations scale infrastructure work through rulesets, workflows, subagents, workspace history, and platform engineering practices.",
    trackLabel: "Track 5 — Enterprise Governance & Platform Engineering",
    trackPath: "/path/enterprise-governance",
  },
];

function getProgress(id: string): number {
  try {
    return Number(localStorage.getItem(`vid-progress-${id}`) || 0);
  } catch { return 0; }
}
function setProgressStorage(id: string, pct: number) {
  try { localStorage.setItem(`vid-progress-${id}`, String(Math.round(pct))); } catch {}
}

function VideoCard({ video, onPlay }: { video: VideoItem; onPlay: (v: VideoItem) => void }) {
  const progress = getProgress(video.id);
  return (
    <div
      className="group glass-panel rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={() => onPlay(video)}
    >
      {/* Video area */}
      <div className="aspect-video bg-muted/30 relative overflow-hidden">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        ) : (
          <video src={video.src} preload="metadata" muted className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
            <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/20">
            {video.category}
          </span>
          {video.badge && (
            <span className="px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground text-[10px] font-medium border border-border/30">
              {video.badge}
            </span>
          )}
        </div>
        <Link
          to={video.trackPath}
          onClick={e => e.stopPropagation()}
          className="text-[10px] text-muted-foreground hover:text-primary transition-colors block pt-1"
        >
          Used in: {video.trackLabel}
        </Link>
      </div>
    </div>
  );
}

const VideoLibrary = () => {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [, forceUpdate] = useState(0);

  const handlePlay = (v: VideoItem) => {
    setActiveVideo(v);
  };
  const handleClose = () => {
    setActiveVideo(null);
    forceUpdate(n => n + 1);
  };

  const filtered = videos.filter(v => {
    const matchTopic = selectedTopic === "All" || v.category === selectedTopic;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  const continueWatching = videos.filter(v => {
    const p = getProgress(v.id);
    return p > 0 && p < 98;
  });

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Video Library</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Browse video lectures, engineering walkthroughs, and infrastructure design sessions from the Infracodebase program.
          </p>
        </div>

        {/* Video Modal */}
        <VideoPlayerModal
          open={!!activeVideo}
          onClose={handleClose}
          title={activeVideo?.title || ""}
          videoSrc={activeVideo?.src || ""}
          subtitle={activeVideo?.description}
        />


        {/* Continue Watching */}
        {continueWatching.length > 0 && !activeVideo && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Continue Watching</h2>
            <div className="space-y-3">
              {continueWatching.map(v => {
                const p = getProgress(v.id);
                return (
                  <div
                    key={v.id}
                    className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => handlePlay(v)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold">{v.title}</h3>
                      <Progress value={p} className="h-1.5 mt-2 max-w-[200px] bg-muted" />
                      <span className="text-[10px] text-muted-foreground font-mono mt-1 block">{p}% watched</span>
                    </div>
                    <Button size="sm" className="gap-1.5 text-xs shrink-0">
                      <Play className="h-3 w-3" /> Resume
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/50 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              placeholder="Search videos..."
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {videoTopics.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs transition-colors border",
                  selectedTopic === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {selectedTopic === "All" ? "All Videos" : selectedTopic}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {filtered.map(v => (
              <VideoCard key={v.id} video={v} onPlay={handlePlay} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-12">No videos match your search.</p>
          )}
        </section>

        {/* Footer note */}
        <div className="glass-panel rounded-xl p-5 text-center">
          <p className="text-xs text-muted-foreground">
            More engineering sessions and walkthroughs will be added to the library as new courses are released.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default VideoLibrary;
