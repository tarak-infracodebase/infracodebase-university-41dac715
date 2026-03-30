import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import type { ProfileData } from "@/hooks/useProfileData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProfileData;
  clerkAvatarUrl?: string;
  clerkName?: string;
  onSave: (updates: Partial<ProfileData>) => void;
}

export function ProfileEditModal({ open, onOpenChange, data, clerkAvatarUrl, clerkName, onSave }: Props) {
  const [form, setForm] = useState({
    displayName: data.displayName || clerkName || "",
    bio: data.bio,
    location: data.location,
    website: data.website,
  });
  const [bannerPreview, setBannerPreview] = useState<string | null>(data.bannerUrl);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(data.customAvatarUrl);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const bannerRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, setter: (v: string) => void) => {
    if (file.size > 2 * 1024 * 1024) return; // 2MB limit
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.displayName.trim()) e.displayName = "Name is required";
    if (form.bio.length > 300) e.bio = "Bio must be under 300 characters";
    if (form.website && !/^https?:\/\/.+\..+/.test(form.website)) e.website = "Enter a valid URL (https://...)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);
    onSave({
      displayName: form.displayName.trim(),
      bio: form.bio.trim(),
      location: form.location.trim(),
      website: form.website.trim(),
      bannerUrl: bannerPreview,
      customAvatarUrl: avatarPreview,
    });
    setTimeout(() => {
      setSaving(false);
      onOpenChange(false);
    }, 300);
  };

  const displayedAvatar = avatarPreview || clerkAvatarUrl;
  const displayedBanner = bannerPreview;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 bg-card border-border overflow-hidden [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold">Edit profile</span>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full px-5 h-8 text-xs font-semibold"
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {/* Banner */}
          <div className="relative h-36 bg-muted group cursor-pointer" onClick={() => bannerRef.current?.click()}>
            {displayedBanner ? (
              <img src={displayedBanner} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" style={{
                background: "linear-gradient(135deg, hsl(260 70% 30%) 0%, hsl(330 65% 25%) 40%, hsl(185 70% 20%) 70%, hsl(228 30% 10%) 100%)"
              }} />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleFile(f, setBannerPreview);
            }} />
          </div>

          {/* Avatar */}
          <div className="px-4 -mt-10 relative z-10">
            <div
              className="h-20 w-20 rounded-full border-4 border-card overflow-hidden bg-muted group cursor-pointer relative"
              onClick={() => avatarRef.current?.click()}
            >
              {displayedAvatar ? (
                <img src={displayedAvatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-lg font-mono font-bold text-muted-foreground">
                  ?
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleFile(f, setAvatarPreview);
            }} />
          </div>

          {/* Fields */}
          <div className="px-4 pt-5 pb-6 space-y-5">
            <Field label="Name" error={errors.displayName}>
              <Input
                value={form.displayName}
                onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                maxLength={80}
                className="bg-background border-border"
              />
            </Field>
            <Field label="Bio" error={errors.bio} hint={`${form.bio.length}/300`}>
              <Textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                maxLength={300}
                rows={3}
                className="bg-background border-border resize-none"
              />
            </Field>
            <Field label="Location" error={errors.location}>
              <Input
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                maxLength={100}
                placeholder="e.g. San Francisco, CA"
                className="bg-background border-border"
              />
            </Field>
            <Field label="Website" error={errors.website}>
              <Input
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                maxLength={200}
                placeholder="https://yoursite.com"
                className="bg-background border-border"
              />
            </Field>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
