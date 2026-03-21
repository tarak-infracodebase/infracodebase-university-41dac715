import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const tiers = [
  {
    label: "TIER 1",
    title: "Foundations",
    description: "Start here if you are new to cloud infrastructure or want to make sure your fundamentals are solid.",
    color: "#1E3A5F",
    href: "/path/prereq-foundations/lesson/p1-lesson-1",
    buttonText: "Start Tier 1",
  },
  {
    label: "TIER 2",
    title: "Intermediate",
    description: "Start here if you can already deploy compute and networks and want to go deeper on IaC, security, and scalability.",
    color: "#2563A6",
    href: "/path/prereq-intermediate/lesson/p2-lesson-15",
    buttonText: "Start Tier 2",
  },
  {
    label: "TIER 3",
    title: "Expert",
    description: "Start here if you build production systems regularly and need a rigorous framework for resilience, governance, and architecture.",
    color: "#065F46",
    href: "/path/prereq-expert/lesson/p3-lesson-27",
    buttonText: "Start Tier 3",
  },
];

interface TierSelectionCardsProps {
  recommendedTier?: number | null;
}

const TierSelectionCards = ({ recommendedTier }: TierSelectionCardsProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-base font-bold mb-4">Choose Your Starting Tier</h2>
      <div className="space-y-3">
        {tiers.map((tier, i) => {
          const isRecommended = recommendedTier === i + 1;
          return (
            <div
              key={tier.label}
              className="relative rounded-xl border bg-card/60 backdrop-blur-xl p-5 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: isRecommended
                  ? tier.color
                  : "hsl(var(--border) / 0.5)",
                boxShadow: isRecommended
                  ? `0 0 20px -6px ${tier.color}40`
                  : undefined,
              }}
            >
              {isRecommended && (
                <span
                  className="absolute -top-2.5 right-4 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: tier.color }}
                >
                  RECOMMENDED
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-mono font-bold tracking-wider"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </span>
                  <h3 className="text-sm font-bold mt-1 mb-1.5">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <Link
                  to={tier.href}
                  className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-colors text-white"
                  style={{ backgroundColor: tier.color }}
                >
                  {tier.buttonText}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TierSelectionCards;
