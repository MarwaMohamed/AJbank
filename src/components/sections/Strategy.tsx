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
      className="relative w-full overflow-hidden pt-6 pb-8 md:pt-8 md:pb-10 lg:pt-8 lg:pb-12"
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
   Radial Hub Diagram (Popp-inspired)
   Bent leader lines: diagonal from center → horizontal arm
   Labels hang below each arm endpoint
   Decorative thin fan lines radiate between main spokes
   ───────────────────────────────────────────── */

function StrategyHubDiagram({ items, isActive }: { items: readonly { heading: string; desc: string }[]; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  /* ── Coordinate system ── */
  const cx = 700, cy = 430;
  const vw = 1400, vh = 900;

  /* ── Spoke geometry — all integers, zero hydration risk ──
     Each spoke: center → diagonal to bend → horizontal arm to end
     Labels positioned just below arm endpoints                    */
  const spokeData: {
    bendX: number; bendY: number;
    endX: number; endY: number;
    side: "left" | "right";
  }[] = [
    // 0 — upper-left: "Launching the New Identity"
    { bendX: 520, bendY: 180, endX: 280, endY: 180, side: "left" },
    // 1 — upper-right: "Digital-Led Growth"
    { bendX: 910, bendY: 250, endX: 1120, endY: 250, side: "right" },
    // 2 — mid-right: "SME & Corporate Empowerment"
    { bendX: 890, bendY: 475, endX: 1120, endY: 475, side: "right" },
    // 3 — lower-left: "Value Realization"
    { bendX: 505, bendY: 630, endX: 280, endY: 630, side: "left" },
    // 4 — lower-right: "Operational Resilience"
    { bendX: 875, bendY: 685, endX: 1120, endY: 685, side: "right" },
  ];

  /* ── Decorative fan lines ──
     Thin straight lines radiating from center between main spokes.
     Angles precomputed from the spoke directions (degrees):
       spoke angles ≈ -126, -42, 13, 132, 60
       sorted: -126, -42, 13, 60, 132
     Fan lines fill the gaps between these sorted angles.          */
  const decorLen = 210;
  const decorAngles = [
    // gap -126° → -42° (84°)
    -105, -84, -63,
    // gap -42° → 13° (55°)
    -28, -14, 0,
    // gap 13° → 60° (47°)
    25, 37, 49,
    // gap 60° → 132° (72°)
    78, 96, 114,
    // gap 132° → 234° (102°)
    158, 183, 208,
  ];
  const decorLines = decorAngles.map(deg => {
    const rad = deg * Math.PI / 180;
    return {
      x: Math.round(cx + Math.cos(rad) * decorLen),
      y: Math.round(cy + Math.sin(rad) * decorLen),
    };
  });

  /* ── GSAP animation — 3 phases ── */
  useEffect(() => {
    if (!mounted || prefersReduced || !svgRef.current || !containerRef.current) return;

    const mainPaths = svgRef.current.querySelectorAll<SVGPathElement>(".spoke-main");
    const thinLines = svgRef.current.querySelectorAll<SVGLineElement>(".spoke-decor");
    const centerGroup = svgRef.current.querySelector<SVGGElement>(".center-hub");
    const labels = labelsRef.current.filter(Boolean);

    if (isActive) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Center hub scales in
      if (centerGroup) {
        gsap.set(centerGroup, { scale: 0, transformOrigin: `${cx}px ${cy}px` });
        tl.to(centerGroup, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0);
      }

      // Phase 1 — draw bent spoke paths outward
      mainPaths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(mainPaths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power2.inOut",
      }, 0.15);

      // Phase 2 — decorative fan lines
      thinLines.forEach((line) => {
        gsap.set(line, { strokeDasharray: decorLen, strokeDashoffset: decorLen });
      });
      tl.to(thinLines, {
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.025,
      }, "-=0.9");

      // Phase 3 — labels fade up
      tl.fromTo(labels,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
        "-=0.35"
      );
    } else {
      // Reset everything
      mainPaths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      thinLines.forEach((line) => {
        gsap.set(line, { strokeDasharray: decorLen, strokeDashoffset: decorLen });
      });
      if (centerGroup) gsap.set(centerGroup, { scale: 0, transformOrigin: `${cx}px ${cy}px` });
      gsap.set(labels, { opacity: 0, y: 14 });
    }
  }, [isActive, mounted, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto"
      style={{ maxWidth: "1100px", aspectRatio: `${vw} / ${vh}` }}
    >
      {/* ── SVG layer: lines, dots ── */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vw} ${vh}`}
        className="absolute inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Thin decorative fan lines */}
        {decorLines.map((pt, i) => (
          <line
            key={`d-${i}`}
            x1={cx} y1={cy} x2={pt.x} y2={pt.y}
            stroke="#cda991"
            strokeWidth="1"
            opacity={0.2}
            className="spoke-decor"
          />
        ))}

        {/* Main bent spoke paths: center → bend → horizontal arm end */}
        {spokeData.map((s, i) => (
          <path
            key={`s-${i}`}
            d={`M${cx},${cy} L${s.bendX},${s.bendY} L${s.endX},${s.endY}`}
            stroke="#001421"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="spoke-main"
          />
        ))}

        {/* Center hub — black circle with logo overlay */}
        <g className="center-hub">
          <circle cx={cx} cy={cy} r="52" fill="#001421" />
          <image
            href={asset("/images/ajb-logo-new.png")}
            x={cx - 38}
            y={cy - 38}
            width="76"
            height="76"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>

      {/* ── HTML labels layer ── */}
      {items.map((item, i) => {
        const spoke = spokeData[i];
        if (!spoke) return null;

        const isLeft = spoke.side === "left";
        const xPct = (spoke.endX / vw) * 100;
        const yPct = ((spoke.endY + 16) / vh) * 100;

        return (
          <div
            key={i}
            ref={el => { labelsRef.current[i] = el; }}
            className="absolute"
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: isLeft ? "translateX(-100%)" : "translateX(0)",
              maxWidth: "230px",
              textAlign: isLeft ? "right" : "left",
              opacity: 0,
            }}
          >
            <div
              className="text-[15px] lg:text-[17px] xl:text-lg font-bold leading-snug"
              style={{ color: "#001421" }}
            >
              {item.heading}
            </div>
            <p
              className="mt-1 text-[11px] lg:text-xs xl:text-[13px] leading-relaxed"
              style={{ color: "rgba(0,20,33,0.5)" }}
            >
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}


function StrategyPanel({ tab, isActive }: { tab: TabData; isActive?: boolean }) {
  const isHubLayout = tab.key === "strategicFocus";

  // Hub layout for items tab (radial diagram)
  if (isHubLayout && "items" in tab) {
    return (
      <div className="relative flex h-full w-full flex-col">
        {/* Title */}
        <div className="z-10 px-6 md:pl-32 lg:pl-[12vw] xl:pl-[15vw] pt-2 lg:pt-4">
          <FadeInView>
            <h3 className="text-[28px] font-light leading-[1.15] md:text-[38px] lg:text-[44px]" style={{ color: "#001421" }}>
              {tab.subtitle}
            </h3>
          </FadeInView>
        </div>

        {/* Hub diagram — centered in remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 lg:px-8 py-2">
          <StrategyHubDiagram items={tab.items} isActive={isActive ?? true} />
        </div>
      </div>
    );
  }

  // Default layout: left text + right image with brand clip-path
  const hasImage = "image" in tab && (tab as any).image;
  return (
    <div
      className="relative flex h-full w-full flex-col lg:flex-row lg:items-stretch"
    >
      {/* Left side: Content (centered when no image) */}
      <div className={`z-10 flex w-full flex-col justify-start pt-6 lg:pt-10 pb-4 ${hasImage ? "px-6 md:pl-32 md:pr-12 lg:w-[48%] lg:pl-[12vw] xl:pl-[15vw] lg:pr-16" : "px-6 md:px-16 lg:w-full items-center text-center"}`}>
        <FadeInView>
          <h3 className="text-[28px] font-light leading-[1.15] md:text-[36px] lg:text-[42px]" style={{ color: "#001421" }}>
            {tab.subtitle}
          </h3>

          <div className={`mt-5 lg:mt-6 space-y-5 lg:space-y-8 ${hasImage ? "max-w-xl" : "max-w-3xl w-full"}`}>
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

      {/* Right side: Image with brand key visual shape clip-path */}
      {"image" in tab && (tab as any).image && (
        <div className="hidden lg:flex lg:w-[52%] relative items-start justify-start pl-4 xl:pl-8">
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id={`brand-shape-${tab.key}`} clipPathUnits="objectBoundingBox">
                <path d="M0.18,0 L1,0 L1,1 L0,1 L0,0.75 C0,0.75 0.05,0.68 0.08,0.62 C0.11,0.56 0.12,0.5 0.12,0.44 C0.12,0.38 0.11,0.32 0.08,0.26 C0.05,0.2 0,0.13 0,0.13 L0.18,0Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Container for shape + accent — constrained size */}
          <div className="relative w-[340px] xl:w-[400px] aspect-[3/4]">
            {/* Gold accent behind the shape — bottom right */}
            <div
              className="absolute bottom-[5%] right-0 h-[40%] w-[55%]"
              style={{ background: "linear-gradient(135deg, #b27f59 0%, #8c684a 100%)" }}
            />

            {/* Clipped image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `url(#brand-shape-${tab.key})` }}
            >
              <Image
                src={asset("image" in tab ? (tab as any).image : "")}
                alt={tab.subtitle}
                fill
                className="object-cover"
                style={{ objectPosition: "center 15%" }}
                sizes="400px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
