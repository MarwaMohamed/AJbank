"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/* ── AJB Key Visual Shape SVG (from KeyFactsGlassCards) ── */
const SHAPE_ID = "ajb-card-shape";
const SHAPE_VB_W = 1000;
const SHAPE_VB_H = 1921;
const SHAPE_PATH =
  "M 181 622 V 1326 L 0 1463 V 1921 C 0 1921 889 1247 900 1239 969 1186 1000 1119 1000 1025 V 0 Z";

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
          <path d="M 0.181 0.3237 V 0.6902 L 0 0.7616 V 1 C 0 1 0.889 0.6489 0.8996 0.6447 0.9687 0.6175 1 0.5826 1 0.5334 V 0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ── Card data ── */
const glassCards = [
  {
    id: 1,
    value: 223,
    suffix: "%",
    label: "Growth in digital onboarding for SMEs",
    color: "rgba(140, 104, 74, 0.8)",
    bgGradient: "linear-gradient(145deg, rgba(140,104,74,0.15) 0%, #000000 60%, #000000 100%)",
  },
  {
    id: 2,
    value: 22,
    suffix: "%",
    label: "Net profit growth",
    color: "rgba(140, 104, 74, 0.8)",
    bgGradient: "linear-gradient(145deg, rgba(140,104,74,0.1) 0%, #000000 60%, #000000 100%)",
  },
  {
    id: 3,
    value: 10,
    suffix: "X",
    label: "Cumulative growth in digital account openings over 3 years",
    color: "rgba(140, 104, 74, 0.8)",
    bgGradient: "linear-gradient(145deg, rgba(140,104,74,0.12) 0%, #000000 60%, #000000 100%)",
  },
];

/* ── Single Glass Card (inline, no scroll-driven animation here) ── */
function GlassCard({
  value,
  suffix,
  label,
  index,
  color,
  bgGradient,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  color: string;
  bgGradient: string;
  active: boolean;
}) {
  return (
    <div
      className="glass-card relative"
      style={{
        width: "100%",
        aspectRatio: `${SHAPE_VB_W} / ${SHAPE_VB_H}`,
        isolation: "isolate",
      }}
    >
      {/* Opaque backing layer to hide cards behind */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `url(#${SHAPE_ID})`,
          WebkitClipPath: `url(#${SHAPE_ID})`,
          background: bgGradient,
        }}
      />
      {/* Electric border glow */}
      <svg
        className="absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] -z-10"
        viewBox={`0 0 ${SHAPE_VB_W} ${SHAPE_VB_H}`}
        preserveAspectRatio="none"
        style={{ filter: `drop-shadow(0 0 12px ${color})` }}
      >
        <defs>
          <linearGradient id={`glow-aag-${index}`} gradientTransform="rotate(45)">
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
          stroke={`url(#glow-aag-${index})`}
          strokeWidth="4"
        />
      </svg>

      {/* Main glass card body */}
      <div
        className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14"
        style={{
          clipPath: `url(#${SHAPE_ID})`,
          WebkitClipPath: `url(#${SHAPE_ID})`,
          background: bgGradient,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Inner border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${SHAPE_VB_W} ${SHAPE_VB_H}`} preserveAspectRatio="none">
          <path d={SHAPE_PATH} fill="none" stroke="rgba(140,104,74,0.4)" strokeWidth="2" />
        </svg>

        {/* Glass reflection */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: "45%", background: "linear-gradient(160deg, rgba(140,104,74,0.15) 0%, rgba(140,104,74,0.05) 50%, transparent 100%)" }}
        />

        {/* Top shine line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${SHAPE_VB_W} ${SHAPE_VB_H}`} preserveAspectRatio="none">
          <path d="M 190 625 L 995 5" fill="none" stroke="rgba(140,104,74,0.35)" strokeWidth="1.5" />
        </svg>

        {/* Left edge reflection */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${SHAPE_VB_W} ${SHAPE_VB_H}`} preserveAspectRatio="none">
          <path d="M 183 630 L 183 1320" fill="none" stroke="rgba(140,104,74,0.25)" strokeWidth="2" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-center" style={{ paddingTop: "34%", paddingBottom: "44%", paddingLeft: "22%", paddingRight: "6%" }}>
          <div className="card-text-item flex items-end">
            <div
              className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[68px] font-light leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "Tajawal, sans-serif", fontVariantNumeric: "tabular-nums" }}
            >
              <AnimatedCounter value={value} active={active} />
            </div>
            <span className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-light ml-1 mb-0.5 md:mb-1 text-white">
              {suffix}
            </span>
          </div>
          <div className="card-text-item mt-3 md:mt-4">
            <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-medium uppercase tracking-[0.15em] leading-[1.2]" style={{ color: "rgba(255,255,255,0.65)" }}>
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Combined At a Glance + Glass Cards Section ── */
export function AtAGlance() {
  const c = content.atAGlance;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const titleWords = c.title.split(" ");

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !titleRef.current) return;

    const section = sectionRef.current;
    const words = titleRef.current.querySelectorAll<HTMLSpanElement>(".ag-word");
    const desc = descRef.current;
    const marker = markerRef.current;
    const textBlock = textBlockRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardsContainer?.querySelectorAll<HTMLElement>(".glass-card") ?? [];

    const ctx = gsap.context(() => {
      /* ── Phase 1: Pinned word reveal (centered text) ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      /* 0–0.15: Marker fade in */
      if (marker) {
        tl.fromTo(marker, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0);
      }

      /* 0–0.25: Word-by-word color reveal */
      words.forEach((word, i) => {
        tl.to(word, { color: "#ffffff", duration: 0.12, ease: "none" }, (i / titleWords.length) * 0.22);
      });

      /* 0.2–0.3: Description fade in */
      if (desc) {
        tl.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.2);
      }

      /* ── Phase 2: Text shifts left, cards appear right ── */
      if (textBlock) {
        tl.to(textBlock, {
          textAlign: "left",
          x: () => {
            const vw = window.innerWidth;
            // Smaller shift on mobile, larger on desktop
            return vw < 768 ? -(vw * 0.04) : -(vw * 0.08);
          },
          scale: () => window.innerWidth < 768 ? 0.75 : 0.85,
          transformOrigin: "left center",
          duration: 0.15,
          ease: "power2.inOut",
        }, 0.32);
      }

      // Cards container: fade in and slide from right
      if (cardsContainer) {
        gsap.set(cardsContainer, { opacity: 0, xPercent: 30 });
        tl.to(cardsContainer, {
          opacity: 1,
          xPercent: 0,
          duration: 0.15,
          ease: "power3.out",
        }, 0.35);
      }

      /* ── Phase 3: Stacking cards — each flips up from below, previous scales down ── */
      if (cards.length > 0) {
        // All cards start hidden below
        cards.forEach((card) => {
          gsap.set(card, { opacity: 0, yPercent: 80, scale: 0.85 });
        });

        // Card 1 flips up
        tl.to(cards[0], {
          opacity: 1, yPercent: 0, scale: 1,
          duration: 0.12, ease: "power3.out",
          onStart: () => setVisibleCards(prev => new Set(prev).add(0)),
        }, 0.42);

        // Subsequent cards: flip up from below, previous cards scale down behind
        for (let i = 1; i < cards.length; i++) {
          const startTime = 0.42 + i * 0.18;

          // Scale down ALL previous cards
          for (let j = 0; j < i; j++) {
            const scaleTarget = 1 - (i - j) * 0.06;
            const yTarget = -(i - j) * 18;
            tl.to(cards[j], {
              scale: scaleTarget,
              y: yTarget,
              duration: 0.12,
              ease: "power2.inOut",
            }, startTime);
          }

          // Flip up new card from below
          const cardIndex = i;
          tl.to(cards[i], {
            opacity: 1, yPercent: 0, scale: 1,
            duration: 0.14, ease: "power3.out",
            onStart: () => setVisibleCards(prev => new Set(prev).add(cardIndex)),
          }, startTime + 0.02);
        }

        // Hold final stack briefly
        tl.to({}, { duration: 0.12 });
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReduced, titleWords.length]);

  return (
    <section
      ref={sectionRef}
      id="at-a-glance"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(images/glance/glance-bg-new.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0a0700",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 55% 45%, rgba(160,115,55,0.35) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 25% 55%, rgba(140,100,40,0.25) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 70% 30%, rgba(180,130,60,0.3) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.35)" }} />

      {/* SVG shape defs for glass cards */}
      <ShapeDefs />

      {/* Section marker */}
      <div
        ref={markerRef}
        className="absolute left-6 top-16 z-10 md:left-12 md:top-20"
        style={{ opacity: prefersReduced ? 1 : 0 }}
      >
        <SectionMarker number={c.number} label={c.label} light />
      </div>

      {/* Main content area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-16">
        {/* Text block — starts centered full width, moves left */}
        <div
          ref={textBlockRef}
          className="w-full max-w-2xl text-center"
        >
          <h2
            ref={titleRef}
            className="text-3xl font-light leading-[1.15] tracking-wide md:text-5xl lg:text-5xl"
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="ag-word inline-block"
                style={{
                  color: prefersReduced ? "#ffffff" : "rgba(255,255,255,0.35)",
                  transition: prefersReduced ? "none" : "color 0.2s ease",
                  marginRight: "0.3em",
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            ref={descRef}
            className="mx-auto mt-10 max-w-xl text-lg leading-[1.2] md:text-xl lg:mx-0"
            style={{
              color: "rgba(255,255,255,0.65)",
              opacity: prefersReduced ? 1 : 0,
            }}
          >
            {c.description}
          </p>
        </div>

        {/* Glass cards container — absolutely positioned right, starts hidden */}
        <div
          ref={cardsContainerRef}
          className="absolute right-[18%] top-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            width: "min(35vw, 320px)",
            height: `calc(min(35vw, 320px) * ${SHAPE_VB_H} / ${SHAPE_VB_W})`,
            maxHeight: "70vh",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          {glassCards.map((card, index) => (
            <div
              key={card.id}
              className="absolute"
              style={{
                width: "100%",
                zIndex: index + 1,
              }}
            >
              <GlassCard
                value={card.value}
                suffix={card.suffix}
                label={card.label}
                index={index}
                color={card.color}
                bgGradient={card.bgGradient}
                active={visibleCards.has(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
