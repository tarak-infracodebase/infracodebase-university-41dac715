import { forwardRef } from 'react';
import type { Milestone } from '@/data/milestones';

interface BadgeCardProps {
  milestone: Milestone;
}

export const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  ({ milestone }, ref) => {
    const c = milestone.color;

    return (
      <div
        ref={ref}
        style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          borderRadius: '16px',
          padding: '22px 24px',
          position: 'relative',
          overflow: 'hidden',
          height: '198px',
          width: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Ghost number background */}
        <div
          style={{
            position: 'absolute',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: '158px',
            lineHeight: 0.85,
            right: '-10px',
            top: '2px',
            letterSpacing: '-0.04em',
            color: c.ghost,
            opacity: c.ghostOpacity,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {milestone.day}
        </div>

        {/* Top row — milestone label */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: c.milestoneLbl,
            }}
          >
            {milestone.milestoneLabel}
          </span>
        </div>

        {/* Mid — day number + name */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '6px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '5px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: c.dayLabel,
              }}
            >
              Day
            </span>
            <span
              style={{
                fontSize: '52px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: c.dayNumber,
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
              }}
            >
              {milestone.day}
            </span>
          </div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: c.achName,
            }}
          >
            {milestone.name}
          </div>
        </div>

        {/* Bottom — university + serial */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            marginTop: '10px',
            borderTop: `1px solid ${c.bottomBorder}`,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.05em', textTransform: 'lowercase', color: c.uni }}>
            infracodebase university
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums', color: c.serialText }}>
            {milestone.serial}
          </span>
        </div>
      </div>
    );
  }
);

BadgeCard.displayName = 'BadgeCard';
