"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { asset } from "@/lib/basePath";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function getAllCards() {
  const c = content.keyFacts;
  return [
    { group: c.page1Title, ...c.page1[0] }, // 0: Assets
    { group: c.page1Title, ...c.page1[1] }, // 1: Financing
    { group: c.page1Title, ...c.page1[2] }, // 2: Deposits
    { group: c.page2Title, ...c.page2[0] }, // 3: Total Income
    { group: c.page2Title, ...c.page2[1] }, // 4: Net Income
    { group: c.page2Title, ...c.page2[2] }, // 5: CAR
  ];
}

function FactCard({ card, index, className, darkText = false }: { card: any, index: number, className: string, darkText?: boolean }) {
  /* Brand-aligned colors: Midnight Blue (#001421) for dark text, Pearl for light */
  const color = darkText ? "rgba(0,20,33,0.85)" : "rgba(255,255,255,0.7)";
  const mutedColor = darkText ? "rgba(0,20,33,0.12)" : "rgba(255,255,255,0.2)";

  return (
    <div className={`kf-grid-item flex flex-col justify-between p-8 md:p-10 rounded-[16px] shadow-sm overflow-hidden ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between font-medium tracking-tight mb-8" style={{ color: darkText ? "#001421" : "#ffffff" }}>
        <p className="text-lg md:text-xl leading-[1.15] max-w-[200px]">{card.label}</p>
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 text-right max-w-[100px] leading-tight">
          {card.group}
        </span>
      </div>

      <div className="flex flex-col mt-auto">
        {/* Visualizations based on index */}
        {index === 0 && (
          <div className="mb-6 flex gap-1 h-8 items-end w-24">
            <div className="w-1/4 bg-current opacity-30 h-[40%]" style={{ color }} />
            <div className="w-1/4 bg-current opacity-50 h-[60%]" style={{ color }} />
            <div className="w-1/4 bg-current opacity-70 h-[80%]" style={{ color }} />
            <div className="w-1/4 bg-current h-[100%]" style={{ color }} />
          </div>
        )}

        {index === 5 && (
          <div className="mb-6 relative w-1/2">
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: mutedColor }} />
            <div className="absolute top-0 left-0 h-1.5 rounded-full w-[19%]" style={{ backgroundColor: color }} />
          </div>
        )}

        {/* Number Area — fixed height to prevent layout shift during counter animation */}
        <div className="flex items-end" style={{ color: darkText ? "#001421" : "#ffffff", minHeight: "clamp(80px, 12vw, 130px)" }}>
          <div
            className="text-[80px] md:text-[96px] lg:text-[110px] xl:text-[130px] font-medium leading-[0.8] tracking-tighter relative"
            style={{ fontFamily: "Tajawal, sans-serif", fontVariantNumeric: "tabular-nums" }}
          >
            {/* Ring visualization for index 2 */}
            {index === 2 && (
              <svg viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-30 pointer-events-none">
                <circle cx="50" cy="50" r="48" fill="none" strokeWidth="1" stroke="currentColor" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="40" fill="none" strokeWidth="0.5" stroke="currentColor" />
              </svg>
            )}
            <AnimatedCounter
              value={card.value}
              decimals={card.decimals}
            />
          </div>
          <div className="flex items-baseline mb-1 lg:mb-2 ml-2 gap-1">
            {card.suffix && (
              <span
                className="text-4xl md:text-5xl lg:text-7xl font-normal"
                style={{
                  fontFamily: "Tajawal, sans-serif",
                  color: darkText ? "rgba(0,20,33,0.55)" : "rgba(255,255,255,0.5)"
                }}
              >
                {card.suffix}
              </span>
            )}
            {card.prefix && (
              <span className="text-2xl md:text-3xl font-light opacity-70 ml-2">
                {card.prefix.trim()}
              </span>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 flex justify-start">
          <button
            className="group flex items-center gap-[12px] rounded-full border px-[16px] py-[6px] transition-all"
            style={{
              borderColor: darkText ? "rgba(0,20,33,0.2)" : "rgba(255,255,255,0.2)",
              color: darkText ? "#001421" : "#ffffff",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = darkText ? "rgba(0,20,33,0.05)" : "rgba(255,255,255,0.05)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            aria-label="Download full report"
          >
            <span className="text-[14px] md:text-[16px] font-medium">
              Download Report
            </span>
            <div
              className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border transition-all"
              style={{ borderColor: darkText ? "rgba(0,20,33,0.2)" : "rgba(255,255,255,0.2)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export function KeyFacts() {
  const c = content.keyFacts;
  const sectionRef = useRef<HTMLElement>(null);
  const cards = getAllCards();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".kf-grid-item");

    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="key-facts"
      className="relative w-full overflow-hidden bg-white py-24 md:py-32 lg:py-40"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 w-full" style={{ color: "#001421" }}>
        <SectionMarker number={c.number} label={c.label} />
        <div className="mt-4 mb-6 h-px w-full" style={{ background: "rgba(0,20,33,0.1)" }} />
        <h2 className="text-[32px] md:text-[40px] lg:text-[50px] font-light leading-[1.15] max-w-2xl tracking-tight" style={{ fontFamily: "Tajawal, sans-serif", color: "#001421" }}>
          Key Facts & Figures
        </h2>
      </div>

      {/* Grid Layout (3 Flex Columns mimicking CSS Grid) */}
      <div className="relative z-10 mx-auto mt-12 md:mt-16 max-w-[1400px] px-6 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 min-h-[800px] xl:min-h-[900px]">

          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/3">
            <FactCard card={cards[0]} index={0} className="flex-[0.9] min-h-[240px] bg-[#001421]" />
            <FactCard card={cards[4]} index={4} className="flex-[0.8] min-h-[250px] bg-[#cda991]" darkText />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/3">
            <div className="kf-grid-item flex-[1.2] relative min-h-[350px] rounded-[16px] overflow-hidden shadow-sm">
              <img src={asset("/images/one-bank-shape.png")} className="absolute inset-0 w-full h-full object-contain" alt="" />
            </div>
            <FactCard card={cards[1]} index={1} className="flex-1 min-h-[300px] bg-[#001421]" />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/3">
            <FactCard card={cards[3]} index={3} className="flex-1 min-h-[280px] bg-[#333f48]" />
            <FactCard card={cards[2]} index={2} className="flex-1 min-h-[280px] bg-[#cda991]" darkText />
            <FactCard card={cards[5]} index={5} className="flex-1 min-h-[280px] bg-[#001421]" />
          </div>

        </div>
      </div>
    </section>
  );
}
