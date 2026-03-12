"use client";

import { content } from "@/lib/content";
import { asset } from "@/lib/basePath";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Sustainability() {
  const c = content.sustainability;

  return (
    <section
      id="sustainability"
      className="relative overflow-hidden py-24"
      style={{
        background:
          "linear-gradient(180deg, #f5f0eb 0%, #ede6df 50%, #f5f0eb 100%)",
      }}
    >
      {/* Decorative Mask group SVG — brand key visual shape */}
      <div className="pointer-events-none absolute -left-20 bottom-12 md:-left-8 opacity-[0.05]">
        <img src={asset("/images/mask-group.svg")} alt="" className="h-[500px] w-auto md:h-[700px] lg:h-[900px]" />
      </div>

      {/* Decorative Mask group SVG — right side, mirrored */}
      <div className="pointer-events-none absolute -right-20 top-12 md:-right-8 opacity-[0.04]" style={{ transform: "scaleX(-1)" }}>
        <img src={asset("/images/mask-group.svg")} alt="" className="h-[500px] w-auto md:h-[700px] lg:h-[900px]" />
      </div>

      {/* Subtle line graphic accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(178,127,89,0.15), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} />
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="mt-12 text-3xl font-light md:text-5xl" style={{ color: "#001421" }}>{c.title}</h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-[1.2]" style={{ color: "rgba(0,20,33,0.6)" }}>
            {c.description}
          </p>
        </FadeInView>

        {/* ESG Sub-sections — horizontal layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">

          {/* Environment */}
          <FadeInView delay={0.1}>
            <div>
              <h3 className="text-lg font-medium tracking-wide" style={{ color: "#001421" }}>
                Environment
              </h3>
              <div className="mt-6 space-y-2">
                {c.environment.map((m, i) => (
                  <MetricCard key={i} {...m} />
                ))}
              </div>
            </div>
          </FadeInView>

          {/* Society */}
          <FadeInView delay={0.2}>
            <div>
              <h3 className="text-lg font-medium tracking-wide" style={{ color: "#001421" }}>
                Society
              </h3>
              <div className="mt-6 space-y-2">
                {c.society.map((m, i) => (
                  <MetricCard key={i} {...m} />
                ))}
              </div>
            </div>
          </FadeInView>

          {/* Governance */}
          <FadeInView delay={0.3}>
            <div>
              <h3 className="text-lg font-medium tracking-wide" style={{ color: "#001421" }}>
                Governance
              </h3>
              <div className="mt-6 space-y-4">
                {c.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CertIcon index={i} />
                    <p className="text-sm font-medium" style={{ color: "rgba(0,20,33,0.75)" }}>
                      {cert}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  );
}

/* Certification badge icons — brand-aligned SVG for each governance cert */
function CertIcon({ index }: { index: number }) {
  const size = 40;
  const color = "#8c684a"; // Dark Sand for icons on light bg
  const muted = "rgba(140,104,74,0.15)";

  const icons: Record<number, React.ReactNode> = {
    /* ISO 9001: Quality — shield with checkmark */
    0: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={muted} />
        <path d="M20 8l9 4v8c0 5.5-3.8 10.6-9 12-5.2-1.4-9-6.5-9-12v-8l9-4z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M15 20l3.5 3.5L25 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    /* ISO 14001: Environmental — leaf */
    1: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={muted} />
        <path d="M12 28c0 0 2-10 10-14s10-4 10-4-2 10-10 14-10 4-10 4z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M16 26c3-4 7-8 14-12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 30c1-2 3-4 5-5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    /* ISO 45001: Health & Safety — person with shield */
    2: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={muted} />
        <circle cx="16" cy="14" r="3.5" stroke={color} strokeWidth="1.5" />
        <path d="M10 28c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 16l5 2.5v4c0 3-2 5.5-5 6.5-3-1-5-3.5-5-6.5v-4l5-2.5z" stroke={color} strokeWidth="1.3" fill="none" />
        <path d="M24 22l2 2 3-3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    /* PCI DSS v4.0: Payment security — lock with card */
    3: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={muted} />
        <rect x="12" y="18" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M16 18v-4a4 4 0 018 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="24" r="1.5" fill={color} />
        <path d="M20 25.5v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    /* Certified Innovative Organization — lightbulb with gear */
    4: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={muted} />
        <path d="M20 8a8 8 0 015 14.3V26a2 2 0 01-2 2h-6a2 2 0 01-2-2v-3.7A8 8 0 0120 8z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M17 30h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 32h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 13v3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M17 16l2 1.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M23 16l-2 1.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  };

  return <div className="shrink-0">{icons[index] ?? icons[0]}</div>;
}

function MetricCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="py-6">
      {/* Brand decorative line — top accent */}
      <div
        className="mb-5 h-[2px] w-16"
        style={{ background: "#B98666", opacity: 0.94 }}
      />
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className="text-4xl font-bold"
        style={{ color: "#001421" }}
      />
      <p className="mt-3 text-sm" style={{ color: "rgba(0,20,33,0.6)" }}>
        {label}
      </p>
    </div>
  );
}
