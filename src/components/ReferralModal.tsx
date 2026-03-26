import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser } from "@clerk/clerk-react";
import { ChevronUp, X, ArrowRight, Briefcase, Star, Copy, Check } from "lucide-react";

const REFERRAL_DOMAIN = "https://university.infracodebase.com";

function StepIcon({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: `${color}1F`,
      }}
    >
      <Icon className="h-[15px] w-[15px]" style={{ color }} />
    </div>
  );
}

function ReferralExpandedContent({
  referralUrl,
  stats,
  onClose,
  copyLink,
  copied,
}: {
  referralUrl: string;
  stats: { signedUp: number; converted: number; credits: number };
  onClose: () => void;
  copyLink: () => void;
  copied: boolean;
}) {
  return (
    <div
      className="relative"
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "#0f0d24",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 24,
        maxWidth: 420,
        width: "calc(100vw - 32px)",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute flex items-center justify-center transition-colors hover:bg-white/10"
        style={{
          top: 18,
          right: 18,
          width: 26,
          height: 26,
          borderRadius: 7,
          background: "rgba(255,255,255,0.07)",
          border: "0.5px solid rgba(255,255,255,0.13)",
        }}
      >
        <X className="h-3.5 w-3.5 text-white/50" />
      </button>

      {/* Top label */}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginBottom: 13,
        }}
      >
        INFRACODEBASE UNIVERSITY · 2026
      </p>

      {/* Title */}
      <h3 className="font-bold leading-[1.3] mb-1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 24 }}>
        <span className="text-white">Earn </span>
        <span style={{ color: "#e8610a" }}>250 </span>
        <span style={{ color: "#c89a00" }}>credits</span>
        <br />
        <span style={{ color: "#2ea84f" }}>for every </span>
        <span style={{ color: "#0891b2" }}>referral.</span>
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.65,
          marginBottom: 18,
        }}
      >
        Share your link — when a colleague joins and creates their enterprise account, you both benefit.
      </p>

      {/* Divider */}
      <div style={{ height: 0.5, background: "rgba(255,255,255,0.08)", marginBottom: 16 }} />

      {/* How it works */}
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.32)", marginBottom: 12 }}>
        How it works:
      </p>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-3">
          <StepIcon icon={ArrowRight} color="#e8610a" />
          <p className="text-[13px]" style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
            Share your invite link with anyone
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StepIcon icon={Briefcase} color="#2ea84f" />
          <p className="text-[13px]" style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
            They sign up and <strong className="text-white font-semibold">create an enterprise account</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StepIcon icon={Star} color="#0891b2" />
          <p className="text-[13px]" style={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>
            You instantly earn <strong className="text-white font-semibold">250 credits</strong>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-[18px]">
        {[
          { n: stats.signedUp, label: "SIGNED UP", color: "#e8610a" },
          { n: stats.converted, label: "CONVERTED", color: "#0891b2" },
          { n: stats.credits, label: "CREDITS EARNED", color: "#ffffff" },
        ].map(s => (
          <div
            key={s.label}
            className="text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "13px 8px 10px",
            }}
          >
            <p className="font-bold" style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, color: s.color }}>{s.n}</p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8.5,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.26)",
                marginTop: 2,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Referral Link */}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginBottom: 8,
        }}
      >
        YOUR REFERRAL LINK
      </p>

      <div className="flex gap-2 mb-4">
        <div
          className="flex-1 min-w-0 truncate flex items-center"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10.5,
            color: "rgba(255,255,255,0.48)",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "9px 12px",
          }}
        >
          {referralUrl}
        </div>
        <button
          onClick={copyLink}
          className="shrink-0 flex items-center gap-1.5 font-bold text-[12px] transition-colors"
          style={{
            fontFamily: "'Sora', sans-serif",
            borderRadius: 8,
            padding: "9px 14px",
            background: copied ? "#2ea84f" : "#fff",
            color: copied ? "#fff" : "#111",
          }}
        >
          {copied ? (
            <><Check className="h-3.5 w-3.5" /> Copied!</>
          ) : (
            <><Copy className="h-3.5 w-3.5" /> Copy link</>
          )}
        </button>
      </div>

      {/* Footer */}
      <div
        className="flex items-end justify-between gap-4"
        style={{ paddingTop: 14, borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
      >
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.24)", lineHeight: 1.55 }}>
          <p>Link never expires · unlimited shares</p>
          <p>
            <a href="#" className="underline transition-colors hover:text-white/50" style={{ color: "rgba(255,255,255,0.36)" }}>
              Terms and Conditions apply.
            </a>
          </p>
        </div>
        <a
          href="https://infracodebase.com/settings/referrals"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-bold text-[12px] transition-colors hover:bg-white/[0.12] hover:text-white"
          style={{
            fontFamily: "'Sora', sans-serif",
            background: "rgba(255,255,255,0.07)",
            border: "0.5px solid rgba(255,255,255,0.14)",
            borderRadius: 8,
            padding: "8px 14px",
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Track earnings →
        </a>
      </div>
    </div>
  );
}

export function ReferralModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { user } = useUser();

  const username = user?.username || user?.firstName?.toLowerCase() || user?.id?.slice(0, 8) || "user";
  const referralUrl = `${REFERRAL_DOMAIN}?utm_source=${encodeURIComponent(username)}&utm_medium=referral&utm_campaign=university-referral`;

  const stats = { signedUp: 0, converted: 0, credits: 0 };

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    setOpen(true);
    setAnimating(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimating(false));
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <>
      {/* Collapsed Bar — pinned above user row in sidebar */}
      <button
        onClick={() => (open ? handleClose() : handleOpen())}
        className="w-full flex items-center justify-between transition-colors"
        style={{
          fontFamily: "'Sora', sans-serif",
          padding: "14px 16px",
          borderRadius: 14,
          background: "#16132e",
          border: "0.5px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="text-left min-w-0">
          <p className="font-bold text-white leading-tight truncate" style={{ fontSize: 14 }}>
            Grow the University with us
          </p>
          <p className="mt-0.5 truncate" style={{ fontSize: 12, color: "rgba(255,255,255,0.42)" }}>
            250 credits per referral
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(232,97,10,0.14)",
              border: "0.5px solid rgba(232,97,10,0.28)",
            }}
          >
            <Star className="h-[15px] w-[15px]" style={{ color: "#e8610a" }} />
          </div>
          <ChevronUp
            className="h-4 w-4 transition-transform"
            style={{
              color: "rgba(255,255,255,0.35)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transitionDuration: "0.22s",
            }}
          />
        </div>
      </button>

      {/* Centered overlay modal — portal to body */}
      {open &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0"
              style={{
                zIndex: 9998,
                background: "rgba(0,0,0,0.6)",
                opacity: animating ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
              onClick={handleClose}
            />

            {isMobile ? (
              /* Mobile: bottom sheet */
              <div
                className="fixed left-0 right-0 bottom-0 overflow-y-auto"
                style={{
                  zIndex: 9999,
                  maxHeight: "85vh",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  background: "#0f0d24",
                  animation: "slideUp 0.3s ease",
                }}
              >
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-1" />
                <div className="p-4">
                  <ReferralExpandedContent
                    referralUrl={referralUrl}
                    stats={stats}
                    onClose={handleClose}
                    copyLink={copyLink}
                    copied={copied}
                  />
                </div>
              </div>
            ) : (
              /* Desktop: centered overlay */
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    pointerEvents: "auto",
                    opacity: animating ? 0 : 1,
                    transform: animating ? "translateY(8px)" : "translateY(0)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}
                >
                  <ReferralExpandedContent
                    referralUrl={referralUrl}
                    stats={stats}
                    onClose={handleClose}
                    copyLink={copyLink}
                    copied={copied}
                  />
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </>
  );
}
