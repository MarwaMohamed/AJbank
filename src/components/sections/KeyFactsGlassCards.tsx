"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/* ── AJB Key Visual Shape SVG path (landscape card adaptation) ──
   Matches the brand shape: diagonal top-left cut, straight right,
   large rounded bottom-right corner, bottom-left step/notch. */
const SHAPE_ID = "ajb-card-shape";
const SHAPE_BORDER_ID = "ajb-card-shape-border";

/* SVG path for the AJB key visual shape in a 1000x500 viewBox.
   - Top-left diagonal cut from (0, 120) to top-right (1000, 0)
   - Right side straight down
   - Bottom-right: large rounded curve
   - Bottom-left: step/notch indentation */
const SHAPE_PATH =
  "M 0 120 L 1000 0 L 1000 380 C 1000 450 950 500 880 500 L 120 500 L 60 440 L 0 460 Z";

function ShapeDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <clipPath id={SHAPE_ID} clipPathUnits="objectBoundingBox">
          {/* Normalize path from 1000x500 viewBox to 0-1 range */}
          <path
            d="M 0 0.24 L 1 0 L 1 0.76 C 1 0.9 0.95 1 0.88 1 L 0.12 1 L 0.06 0.88 L 0 0.92 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ── Card data: pulled from keyFacts content ── */
const glassCards = [
  {
    id: 1,
    value: 223,
    suffix: "%",
    label: "Growth in digital onboarding for SMEs",
    description:
      "Accelerating small & medium enterprise digital adoption through streamlined onboarding journeys and tailored banking solutions.",
    color: "rgba(178, 127, 89, 0.8)", // Sand
  },
  {
    id: 2,
    value: 22,
    suffix: "%",
    label: "Net profit growth",
    description:
      "Sustained profitability driven by disciplined capital allocation, prudent risk management, and operational efficiency across all business lines.",
    color: "rgba(140, 104, 74, 0.8)", // Dark Sand
  },
  {
    id: 3,
    value: 10,
    suffix: "X",
    label: "Cumulative growth in digital account openings over 3 years",
    description:
      "A tenfold increase reflecting the Bank's successful digital-first strategy and customer-centric transformation journey.",
    color: "rgba(62, 135, 211, 0.8)", // Sky Blue
  },
];

/* ── Single Glass Card ── */
interface GlassCardProps {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
  index: number;
  totalCards: number;
  color: string;
}

function GlassCard({
  value,
  suffix,
  label,
  description,
  index,
  totalCards,
  color,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, { scale: 1, transformOrigin: "center top" });

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [index, totalCards, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center sticky top-0"
      style={{ height: "100vh" }}
    >
      <div
        ref={cardRef}
        className="relative w-[90%] md:w-[75%] lg:w-[65%] xl:w-[55%]"
        style={{
          height: "clamp(400px, 55vh, 540px)",
          isolation: "isolate",
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: "top",
        }}
      >
        {/* Electric border glow — shaped with the AJB key visual shape via SVG */}
        <svg
          className="absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] -z-10"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          style={{ filter: `drop-shadow(0 0 12px ${color})` }}
        >
          <defs>
            <linearGradient id={`glow-${index}`} gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="15%" stopColor={color} />
              <stop offset="35%" stopColor={color.replace("0.8", "0.5")} />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="70%" stopColor={color.replace("0.8", "0.3")} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d={SHAPE_PATH}
            fill="none"
            stroke={`url(#glow-${index})`}
            strokeWidth="4"
          />
        </svg>

        {/* Main glass card body — clipped to AJB key visual shape */}
        <div
          className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14"
          style={{
            clipPath: `url(#${SHAPE_ID})`,
            WebkitClipPath: `url(#${SHAPE_ID})`,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            backdropFilter: "blur(25px) saturate(180%)",
            WebkitBackdropFilter: "blur(25px) saturate(180%)",
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.3),
              0 2px 8px rgba(0,0,0,0.2)
            `,
            overflow: "hidden",
          }}
        >
          {/* Inner border that follows the shape */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <path
              d={SHAPE_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
          </svg>

          {/* Glass reflection overlay */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "60%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            }}
          />

          {/* Top shine line — follows the diagonal */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 125 L 990 5"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Left edge reflection */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <path
              d="M 2 125 L 2 458"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />
          </svg>

          {/* Frosted glass texture dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)
              `,
              backgroundSize: "30px 30px, 25px 25px, 35px 35px",
            }}
          />

          {/* ─── Content ─── */}
          <div className="relative z-10 flex flex-col h-full justify-between pt-8 md:pt-10">
            {/* Label */}
            <div>
              <p
                className="text-sm md:text-base font-medium uppercase tracking-[0.15em] leading-[1.2]"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {label}
              </p>
            </div>

            {/* Big number */}
            <div className="flex items-end my-auto py-4">
              <div
                className="text-[72px] sm:text-[90px] md:text-[110px] lg:text-[130px] font-light leading-[0.85] tracking-tighter text-white"
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <AnimatedCounter value={value} />
              </div>
              <span
                className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-light ml-2 mb-1 md:mb-2"
                style={{ color: color.replace("0.8", "1") }}
              >
                {suffix}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-sm md:text-base font-normal leading-[1.5] max-w-xl"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export function KeyFactsGlassCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }
    );
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ background: "#0a0a0c" }}
      aria-label="Key performance highlights"
    >
      {/* SVG clip-path definition for AJB key visual shape */}
      <ShapeDefs />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(178,127,89,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(178,127,89,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />

      {/* Hero intro */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ height: "60vh" }}
      >
        {/* Section marker */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-bold tabular-nums tracking-wider"
            style={{ color: "#b27f59" }}
          >
            003
          </span>
          <span
            className="h-px w-6"
            style={{ background: "#b27f59", opacity: 0.4 }}
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Key Highlights
          </span>
        </div>

        <h2
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-light leading-[1.15] tracking-tight text-white max-w-3xl"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          Performance That{" "}
          <span style={{ color: "#b27f59" }}>Speaks</span> for Itself
        </h2>
        <p
          className="mt-4 text-base md:text-lg font-normal leading-[1.5] max-w-xl"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Three numbers that define our 2025 transformation story.
        </p>
      </div>

      {/* Stacking glass cards */}
      <div className="relative w-full">
        {glassCards.map((card, index) => (
          <GlassCard
            key={card.id}
            id={card.id}
            value={card.value}
            suffix={card.suffix}
            label={card.label}
            description={card.description}
            index={index}
            totalCards={glassCards.length}
            color={card.color}
          />
        ))}
      </div>

      {/* Bottom fade into white KeyFacts section */}
      <div
        className="relative z-10 h-32 md:h-48"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0c 0%, #0a0a0c 40%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
