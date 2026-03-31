import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { BadgeCard } from './BadgeCard';
import { MILESTONES } from '@/data/milestones';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, X } from 'lucide-react';

interface MilestoneBadgeModalProps {
  day: number | null;
  onClose: () => void;
}

export function MilestoneBadgeModal({ day, onClose }: MilestoneBadgeModalProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!day) return null;
  const milestone = MILESTONES[day];
  if (!milestone) return null;

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(badgeRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false,
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `infracodebase-day-${day}-badge.png`;
      a.click();
    } catch (err) {
      console.error('Badge download failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleLinkedIn = () => {
    const text = encodeURIComponent(
      `I just earned the "${milestone.name}" badge — Day ${day} of the 30-Day Infracodebase Challenge!\n\nTraining daily on infracodebase.com — learning to ship enterprise-grade cloud infrastructure with AI.\n\n#Infracodebase #CloudEngineering #IaC #DevOps #InfracodebaseUniversity`
    );
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://university.infracodebase.com')}&summary=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 50,
        paddingTop: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Confetti dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          {['#7F77DD','#D85A30','#1D9E75','#EF9F27','#534AB7','#AFA9EC'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
          ))}
        </div>

        {/* Day label */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: milestone.color.milestoneLbl }}>
          Day {day} — Badge unlocked
        </p>

        {/* Badge card — captured by html2canvas */}
        <div className="flex justify-center my-5">
          <BadgeCard ref={badgeRef} milestone={milestone} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {milestone.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            className="w-full gap-2"
            style={{ background: '#0A66C2' }}
            onClick={handleLinkedIn}
          >
            <Linkedin className="w-4 h-4" />
            Share on LinkedIn
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generating PNG…' : 'Download badge as PNG'}
          </Button>
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground underline underline-offset-2 mt-1 hover:text-foreground"
          >
            Continue training
          </button>
        </div>

      </div>
    </div>
  );
}
