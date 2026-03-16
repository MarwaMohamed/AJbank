"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { asset } from "@/lib/basePath";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSmoothScroll } from "../layout/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function Strategy() {
  const c = content.strategy;
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const mediaQueryMatch = useMediaQuery("(max-width: 1024px)");
  const isMobile = mounted && mediaQueryMatch;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile || !panelsRef.current || !sectionRef.current)
      return;

    const panels = panelsRef.current;
    const totalWidth = panels.scrollWidth - panels.clientWidth;

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth * 1.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newTab = Math.min(
              c.tabs.length - 1,
              Math.floor(self.progress * c.tabs.length)
            );
            setActiveTab(newTab);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, isMobile, c.tabs.length]);

  return (
    <section
      ref={sectionRef}
      id="strategy"
      className="relative w-full min-h-screen overflow-hidden pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-8 lg:pb-12"
      style={{ background: "linear-gradient(180deg, #f5f0eb 0%, #ede6df 50%, #f5f0eb 100%)" }}
    >
      {/* Decorative Mask group SVG — brand key visual shape */}
      <div className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.06] md:right-0 lg:right-12">
        <img src={asset("/images/mask-group.svg")} alt="" className="h-[600px] w-auto md:h-[800px] lg:h-[1000px]" />
      </div>

      {/* Subtle line graphic accent */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(178,127,89,0.15), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-24 lg:px-40">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} />
        </FadeInView>

        {/* Tab navigation */}
        <div className="mt-6 lg:mt-8 flex flex-wrap gap-8 border-b border-[#001421]/10">
          {c.tabs.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => {
                if (!isMobile) {
                  const triggers = ScrollTrigger.getAll();
                  const strategyTrigger = triggers.find(st => st.trigger === sectionRef.current);
                  if (strategyTrigger) {
                    const progress = index / c.tabs.length;
                    const target = strategyTrigger.start + progress * (strategyTrigger.end - strategyTrigger.start);
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }
                } else {
                  setActiveTab(index);
                }
              }}
              className="relative pb-6 text-sm font-medium uppercase tracking-widest transition-colors duration-300"
              style={{ color: activeTab === index ? "#8c684a" : "rgba(0,20,33,0.4)" }}
            >
              {tab.title}
              <span
                className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                style={{
                  width: activeTab === index ? "100%" : "0%",
                  background: "#8c684a",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 overflow-hidden">
        <div ref={panelsRef} className="flex">
          {c.tabs.map((tab, index) => (
            <div
              key={tab.key}
              className="relative flex w-full flex-shrink-0 items-stretch overflow-hidden"
              style={{ width: isMobile ? "100%" : "100vw" }}
            >
              <StrategyPanel tab={tab} isActive={activeTab === index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type TabData = (typeof content.strategy.tabs)[number];

function AnimatedStrategyItem({ item, isActive, index }: { item: any, isActive: boolean, index: number }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced) return;

    if (isActive) {
      gsap.fromTo(
        iconRef.current,
        { rotation: -90 },
        { rotation: 0, duration: 0.8, ease: "power3.out", delay: 0.6 + index * 0.1 }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.6 + index * 0.1 }
      );
    } else {
      gsap.set(iconRef.current, { rotation: -90 });
      gsap.set(textRef.current, { opacity: 0, x: -16 });
    }
  }, [isActive, index, mounted, prefersReduced]);

  return (
    <div className="group flex gap-6 lg:gap-8 items-start">
      <div
        ref={iconRef}
        className="flex-shrink-0 mt-1.5 w-6 lg:w-8 h-6 lg:h-8 flex justify-center items-center"
        style={{ transform: "rotate(-90deg)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1px" viewBox="0 0 14 14" className="w-full block overflow-x-hidden overflow-y-hidden fill-none" style={{ stroke: "#8c684a" }}>
          <path d="M13.9999 6.99998C10.13 7.00015 7 10 7 14M13.9999 6.99998L-6.10352e-05 6.99998M13.9999 6.99998C10.13 6.99981 7 4 7 0" className="inline fill-none" style={{ stroke: "#8c684a" }} />
        </svg>
      </div>
      <div
        ref={textRef}
        className="opacity-0 -translate-x-4"
      >
        <h4 className="text-[22px] lg:text-2xl font-medium" style={{ color: "#001421" }}>{item.heading}</h4>
        <p className="mt-2 lg:mt-3 text-sm lg:text-base leading-[1.2]" style={{ color: "rgba(0,20,33,0.6)" }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Strategic Initiatives — Vertical stat-row list
   Matches Social Impact layout: number left, label right,
   thin dividers, staggered scroll-triggered fade-in
   ───────────────────────────────────────────── */

function StrategyInitiativesList({ items, isActive }: { items: readonly { heading: string; desc: string }[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  /* ── GSAP staggered reveal ── */
  useEffect(() => {
    if (!mounted || prefersReduced || !containerRef.current) return;

    const rows = rowsRef.current.filter(Boolean);

    if (isActive) {
      // Staggered fade-in from bottom, one row at a time
      gsap.fromTo(rows,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.set(rows, { opacity: 0, y: 30 });
    }
  }, [isActive, mounted, prefersReduced]);

  /* Number pad to 2 digits */
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
      {items.map((item, i) => (
        <div
          key={i}
          ref={el => { rowsRef.current[i] = el; }}
          className="opacity-0"
          style={{ borderTop: "1px solid rgba(0,20,33,0.1)" }}
        >
          <div className="flex items-center justify-between gap-4 py-4 lg:py-5">
            {/* Left: number + heading inline */}
            <div className="flex items-baseline gap-4 flex-1 min-w-0">
              <span
                className="flex-shrink-0 text-[32px] md:text-[40px] lg:text-[48px] font-light leading-none"
                style={{ color: "rgba(0,20,33,0.12)" }}
              >
                {pad(i + 1)}
              </span>
              <h4
                className="text-[17px] md:text-[20px] lg:text-[24px] font-medium leading-tight"
                style={{ color: "#001421" }}
              >
                {item.heading}
              </h4>
            </div>

            {/* Right: description, right-aligned */}
            <p
              className="hidden md:block flex-shrink-0 text-right text-[11px] lg:text-xs font-medium uppercase tracking-widest leading-snug max-w-[240px]"
              style={{ color: "rgba(0,20,33,0.4)" }}
            >
              {item.desc}
            </p>
          </div>
        </div>
      ))}
      {/* Bottom border */}
      <div style={{ borderTop: "1px solid rgba(0,20,33,0.1)" }} />
    </div>
  );
}


function StrategyPanel({ tab, isActive }: { tab: TabData; isActive?: boolean }) {
  const isHubLayout = tab.key === "strategicFocus";

  // Vertical list layout for strategic initiatives
  if (isHubLayout && "items" in tab) {
    return (
      <div className="relative flex h-full w-full flex-col">
        {/* Title */}
        <div className="z-10 px-6 pt-4 lg:pt-6 text-center">
          <FadeInView>
            <h3 className="text-[28px] font-light leading-[1.15] md:text-[36px] lg:text-[42px]" style={{ color: "#001421" }}>
              {tab.subtitle}
            </h3>
          </FadeInView>
        </div>

        {/* Vertical stat-row list */}
        <div className="mt-4 lg:mt-6 pb-4">
          <StrategyInitiativesList items={tab.items} isActive={isActive ?? true} />
        </div>
      </div>
    );
  }

  // Default layout: left text + right image with brand clip-path
  const hasImage = "image" in tab && (tab as any).image;

  if (!hasImage) {
    return (
      <div className="relative flex h-full w-full items-start justify-center px-6 md:px-16 pt-6 lg:pt-10 pb-4">
        <div className="w-full max-w-3xl text-center">
          <FadeInView>
            <h3 className="text-[28px] font-light leading-[1.15] md:text-[36px] lg:text-[42px]" style={{ color: "#001421" }}>
              {tab.subtitle}
            </h3>
            <div className="mt-5 lg:mt-6 space-y-5 lg:space-y-8">
              {"items" in tab ? (
                (tab.items as Array<{ title: string; description: string }>).map((item: { title: string; description: string }, i: number) => (
                  <AnimatedStrategyItem key={i} item={item} index={i} isActive={isActive ?? true} />
                ))
              ) : (
                <p className="text-[15px] lg:text-base leading-[1.5]" style={{ color: "rgba(0,20,33,0.6)" }}>
                  {tab.description}
                </p>
              )}
            </div>
          </FadeInView>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="mx-auto flex h-full max-w-7xl items-start gap-8 lg:gap-12 px-6 md:px-24 lg:px-40 pb-4">

        {/* Left: Text */}
        <div className="z-10 flex w-full flex-col lg:w-[45%] xl:w-[42%] pt-8 lg:pt-12">
          <FadeInView>
            <h3 className="text-[28px] font-light leading-[1.15] md:text-[36px] lg:text-[42px]" style={{ color: "#001421" }}>
              {tab.subtitle}
            </h3>
            <div className="mt-5 lg:mt-6 max-w-xl">
              <p className="text-[15px] lg:text-base leading-[1.5]" style={{ color: "rgba(0,20,33,0.6)" }}>
                {tab.description}
              </p>
            </div>
          </FadeInView>
        </div>

        {/* Right: Image as-is, no clip-path, no cropping */}
        <div className="hidden lg:flex lg:w-[55%] xl:w-[58%] justify-start pt-0">
          <Image
            src={asset((tab as any).image)}
            alt={tab.subtitle}
            width={500}
            height={650}
            className="h-auto w-full max-w-[336px] object-contain"
          />
        </div>

      </div>
    </div>
  );
}
