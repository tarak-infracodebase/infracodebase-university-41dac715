import { useParams, useNavigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { AppLayout } from "@/components/AppLayout";
import { CrystalIcon } from "@/components/DashboardWidgets";
import CertificateSection from "@/components/CertificateSection";
import { MapPin, Calendar, Flame, Trophy, Pencil, Globe, ExternalLink, Camera, X, Check } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useProfileData, isHandleTaken } from "@/hooks/useProfileData";
import { ShareProfilePopover } from "@/components/profile/ShareProfilePopover";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "Azure APIM Landing Zone", desc: "Production-grade Azure API Management landing zone with Terraform following security best practices.", tags: ["Azure", "Terraform"], color: "hsl(var(--crystal-cyan))" },
  { name: "Production Web App over SQL on AWS", desc: "Production-grade web application with SQL database on AWS using Terraform — security-hardened, Well-Architected, and compliant.", tags: ["AWS", "Terraform"], color: "hsl(var(--crystal-magenta))" },
  { name: "AWS-Security-Insights-Pipeline", desc: "Real-time AWS threat detection and auto-remediation system analysis.", tags: ["AWS", "Security"], color: "hsl(var(--crystal-green))" },
  { name: "AWS Secure Web Application", desc: "Production-ready AWS web application using ALB, WAF, and security-by-design infrastructure.", tags: ["AWS", "Security"], color: "hsl(var(--crystal-orange))" },
  { name: "Azure Active Directory Lab Environment", desc: "Terraform workspace for deploying a Windows Server Active Directory domain with domain controllers and enterprise configuration.", tags: ["Azure", "AD"], color: "hsl(var(--crystal-violet))" },
  { name: "Azure AD DS Hybrid Architecture", desc: "Hybrid Active Directory Domain Services architecture extending on-premises AD to Azure using Terraform.", tags: ["Azure", "Hybrid"], color: "hsl(var(--crystal-yellow))" },
];

const heatmapData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.random())
);

const stats = [
  { label: "Daily Average", value: "1.8 hrs" },
  { label: "Days Active", value: "47" },
  { label: "Current Streak", value: "12 days" },
  { label: "Total Edits", value: "342" },
];

const defaultBannerGradient = "linear-gradient(135deg, hsl(260 70% 30%) 0%, hsl(330 65% 25%) 40%, hsl(185 70% 20%) 70%, hsl(228 30% 10%) 100%)";

const Profile = () => {
  const { username: urlUsername } = useParams<{ username: string }>();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [handleError, setHandleError] = useState("");

  const { profileData, saveProfile } = useProfileData(user?.id);

  const clerkHandle = user?.username || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "yourhandle";
  const resolvedHandle = profileData.customHandle || clerkHandle;
  const isOwner = !urlUsername || urlUsername === resolvedHandle || urlUsername === clerkHandle;
  const viewedHandle = urlUsername || resolvedHandle;


  // Draft state for inline editing
  const [draft, setDraft] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    bannerUrl: null as string | null,
    customAvatarUrl: null as string | null,
    customHandle: "",
  });

  const bannerRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setDraft({
      displayName: profileData.displayName || user?.fullName || user?.firstName || "",
      bio: profileData.bio,
      location: profileData.location,
      website: profileData.website,
      bannerUrl: profileData.bannerUrl,
      customAvatarUrl: profileData.customAvatarUrl,
      customHandle: profileData.customHandle || clerkHandle,
    });
    setHandleError("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const validateHandle = (h: string): string => {
    if (!h) return "Username is required";
    if (h.length > 20) return "Max 20 characters";
    if (!/^[a-z0-9_]+$/.test(h)) return "Only lowercase letters, numbers, underscores";
    if (user?.id && isHandleTaken(h, user.id)) return "Username already taken";
    return "";
  };

  const handleHandleChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    setDraft(d => ({ ...d, customHandle: sanitized }));
    setHandleError(validateHandle(sanitized));
  };

  const handleSave = () => {
    const err = validateHandle(draft.customHandle);
    if (err) { setHandleError(err); return; }
    const newHandle = draft.customHandle.trim();
    saveProfile({
      displayName: draft.displayName.trim(),
      bio: draft.bio.trim(),
      location: draft.location.trim(),
      website: draft.website.trim(),
      bannerUrl: draft.bannerUrl,
      customAvatarUrl: draft.customAvatarUrl,
      customHandle: newHandle,
    });
    setEditing(false);
    // Navigate to new handle URL if changed
    if (newHandle !== resolvedHandle) {
      navigate(`/${newHandle}`, { replace: true });
    }
  };

  const handleFile = (file: File, field: "bannerUrl" | "customAvatarUrl") => {
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setDraft(d => ({ ...d, [field]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // Resolved display values — use draft when editing, profileData when not
  const displayName = editing
    ? draft.displayName
    : profileData.displayName || user?.fullName || user?.firstName || "Your Name";
  const bio = editing ? draft.bio : profileData.bio;
  const location = editing ? draft.location : profileData.location;
  const website = editing ? draft.website : profileData.website;
  const bannerUrl = editing ? draft.bannerUrl : profileData.bannerUrl;
  const customAvatarUrl = editing ? draft.customAvatarUrl : profileData.customAvatarUrl;
  const avatarUrl = customAvatarUrl || user?.imageUrl;

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.firstName?.[0] || "YO";
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Feb 2026";

  if (isLoaded && urlUsername && !isOwner && !user) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto py-24 text-center">
          <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
          <p className="text-sm text-muted-foreground">This user doesn't exist or hasn't set up their profile yet.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto pb-12">
        {/* Banner */}
        <div
          className={`h-48 rounded-b-2xl relative overflow-hidden group ${editing ? "cursor-pointer ring-2 ring-primary/20" : ""}`}
          onClick={() => editing && bannerRef.current?.click()}
        >
          {bannerUrl ? (
            <img src={bannerUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: defaultBannerGradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          {editing && (
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Camera className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-medium">Change cover</span>
            </div>
          )}
          <input
            ref={bannerRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleFile(f, "bannerUrl");
            }}
          />
        </div>

        {/* Avatar + Info */}
        <div className="px-6 lg:px-8 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div
              className={`relative shrink-0 group ${editing ? "cursor-pointer" : ""}`}
              onClick={() => editing && avatarRef.current?.click()}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="h-28 w-28 rounded-full border-4 border-background object-cover" />
              ) : (
                <div className="h-28 w-28 rounded-full border-4 border-background bg-card flex items-center justify-center text-3xl font-mono font-bold text-foreground">
                  {initials}
                </div>
              )}
              {editing && (
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                  <span className="text-white text-[10px] font-medium mt-0.5">Change photo</span>
                </div>
              )}
              <input
                ref={avatarRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f, "customAvatarUrl");
                }}
              />
            </div>

            {/* Name + handle */}
            <div className="flex-1 pb-2">
              {editing ? (
                <Input
                  value={draft.displayName}
                  onChange={e => setDraft(d => ({ ...d, displayName: e.target.value }))}
                  placeholder="Your name"
                  maxLength={80}
                  className="text-2xl font-bold h-auto py-1 px-2 bg-transparent border-border/50 focus:border-primary/40 max-w-xs"
                />
              ) : (
                <h1 className="text-2xl font-bold">{displayName}</h1>
              )}
              {editing ? (
                <div className="mt-1">
                  <div className="flex items-center gap-0">
                    <span className="text-sm text-muted-foreground pl-2">@</span>
                    <Input
                      value={draft.customHandle}
                      onChange={e => handleHandleChange(e.target.value)}
                      placeholder="username"
                      maxLength={20}
                      className="text-sm h-7 py-0 px-1 bg-transparent border-border/50 focus:border-primary/40 w-40 text-muted-foreground"
                    />
                  </div>
                  {handleError && (
                    <p className="text-[11px] text-destructive mt-0.5 pl-2">{handleError}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-0.5">@{viewedHandle}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pb-2">
              {isOwner && !editing && (
                <button
                  onClick={startEditing}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex items-center gap-1.5 active:scale-[0.97]"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit profile
                </button>
              )}
              {isOwner && editing && (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={cancelEditing}
                    className="rounded-lg px-4 h-9 text-xs font-medium"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="rounded-lg px-5 h-9 text-xs font-medium"
                  >
                    <Check className="h-3.5 w-3.5 mr-1.5" /> Save
                  </Button>
                </>
              )}
              {!editing && isOwner && <ShareProfilePopover username={viewedHandle} />}
              {!isOwner && <ShareProfilePopover username={viewedHandle} />}
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {editing ? (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <Input
                  value={draft.location}
                  onChange={e => setDraft(d => ({ ...d, location: e.target.value }))}
                  placeholder="Location, e.g. San Francisco"
                  maxLength={100}
                  className="h-7 text-sm py-0 px-2 bg-transparent border-border/50 focus:border-primary/40 w-48"
                />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {location || "Infrastructure Engineer"}
              </span>
            )}
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {joinedDate}</span>
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-crystal-orange" /> 12 day streak</span>
            <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-crystal-yellow" /> Silver League</span>
            {editing ? (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <Input
                  value={draft.website}
                  onChange={e => setDraft(d => ({ ...d, website: e.target.value }))}
                  placeholder="https://yoursite.com"
                  maxLength={200}
                  className="h-7 text-sm py-0 px-2 bg-transparent border-border/50 focus:border-primary/40 w-56"
                />
              </span>
            ) : (
              website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )
            )}
          </div>

          {/* Bio */}
          {editing ? (
            <div className="mt-3 max-w-xl">
              <Textarea
                value={draft.bio}
                onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
                placeholder="Write a short bio about yourself..."
                maxLength={300}
                rows={3}
                className="text-sm bg-transparent border-border/50 focus:border-primary/40 resize-none"
              />
              <p className="text-[10px] text-muted-foreground mt-1 text-right">{draft.bio.length}/300</p>
            </div>
          ) : (
            bio && <p className="mt-3 text-sm text-foreground leading-relaxed max-w-xl">{bio}</p>
          )}

          {/* Follower stats */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span><strong className="text-foreground">24</strong> <span className="text-muted-foreground">following</span></span>
            <span><strong className="text-foreground">18</strong> <span className="text-muted-foreground">followers</span></span>
          </div>
        </div>

        <div className="px-6 lg:px-8 mt-8 grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Main column */}
          <div className="space-y-8">
            {/* Engineer Profile */}
            {!bio && !editing && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Engineer Profile</h2>
                <div className="space-y-3 max-w-xl">
                  <p className="text-sm text-foreground leading-relaxed">
                    Infrastructure Engineer focused on building secure and scalable systems.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Designs and operates production infrastructure, automated deployment pipelines, and high-performance cloud applications.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Works across cloud infrastructure, platform engineering, and frontend systems when needed.
                  </p>
                </div>
              </div>
            )}

            {/* Infrastructure Stack */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-5">Infrastructure Stack</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Primary Cloud: <span className="text-foreground font-medium">AWS</span></p>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Cloud Infrastructure</h3>
                  <div className="space-y-3">
                    {[
                      { name: "AWS", pct: 52, color: "hsl(var(--crystal-orange))" },
                      { name: "Azure", pct: 37, color: "hsl(var(--crystal-cyan))" },
                      { name: "GCP", pct: 7, color: "hsl(var(--crystal-green))" },
                    ].map(c => (
                      <div key={c.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">{c.name}</span>
                          <span className="text-xs font-mono text-foreground">{c.pct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.7 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Primary IaC: <span className="text-foreground font-medium">Terraform</span></p>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Infrastructure as Code</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Terraform", pct: 99, color: "hsl(var(--crystal-violet))" },
                      { name: "Bicep", pct: 1, color: "hsl(var(--crystal-cyan))" },
                    ].map(c => (
                      <div key={c.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">{c.name}</span>
                          <span className="text-xs font-mono text-foreground">{c.pct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, backgroundColor: c.color, opacity: 0.7 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Infrastructure Projects</h2>
              {projects.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {projects.map((p, i) => (
                    <div key={i} className="glass-panel rounded-xl p-4 hover:border-primary/20 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{p.desc}</p>
                      <div className="flex gap-1.5">
                        {p.tags.map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-xl p-8 text-center">
                  <p className="text-sm text-muted-foreground">No projects yet</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Projects will appear here as they're added.</p>
                </div>
              )}
            </div>

            {/* Activity Heatmap */}
            <div className="glass-panel rounded-xl p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Activity</h2>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-[680px]">
                  {heatmapData.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((val, di) => (
                        <div
                          key={di}
                          className="h-[11px] w-[11px] rounded-[2px]"
                          style={{
                            backgroundColor: val < 0.15
                              ? "hsl(var(--muted))"
                              : val < 0.4
                              ? "hsl(260 70% 58% / 0.3)"
                              : val < 0.7
                              ? "hsl(260 70% 58% / 0.55)"
                              : "hsl(260 70% 58% / 0.85)"
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side stats */}
          <div className="space-y-4">
            <div className="glass-panel rounded-xl p-5 text-center">
              <p className="text-3xl font-mono font-bold text-foreground">2,450</p>
              <p className="text-xs text-muted-foreground mt-1">Total XP</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <CrystalIcon color="hsl(var(--crystal-violet))" size={18} />
                <span className="text-sm font-medium">Level 7</span>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-5 space-y-4">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-mono font-semibold">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {["hsl(var(--crystal-violet))", "hsl(var(--crystal-magenta))", "hsl(var(--crystal-cyan))", "hsl(var(--crystal-green))", "hsl(var(--crystal-yellow))"].map((c, i) => (
                  <CrystalIcon key={i} color={c} size={24} />
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="px-6 lg:px-8 max-w-[900px]">
          <CertificateSection />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
