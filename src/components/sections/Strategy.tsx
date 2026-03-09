"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export function Strategy() {
  const c = content.strategy;
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const mediaQueryMatch = useMediaQuery("(max-width: 768px)");
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

  const scrollToTab = (index: number) => {
    if (isMobile) {
      setActiveTab(index);
      return;
    }
    const triggers = ScrollTrigger.getAll();
    const strategyTrigger = triggers.find(
      (st) => st.trigger === sectionRef.current
    );
    if (strategyTrigger) {
      const progress = index / c.tabs.length;
      const scrollTarget =
        strategyTrigger.start +
        progress * (strategyTrigger.end - strategyTrigger.start);
      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="strategy"
      className="relative min-h-screen bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:py-44">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} />
        </FadeInView>

        {/* Tab navigation */}
        <div className="mt-12 flex gap-1 border-b" style={{ borderColor: "#d9dcdd" }}>
          {c.tabs.map((tab, index) => (
            <button
              key={tab.key}
              onClick={() => scrollToTab(index)}
              className="relative px-6 py-4 text-sm font-medium transition-colors duration-300"
              style={{ color: activeTab === index ? "#b88463" : "#a2a9ac" }}
            >
              {tab.title}
              <span
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                style={{
                  width: activeTab === index ? "100%" : "0%",
                  background: "#b88463",
                }}
              />
            </button>
          ))}
        </div>

        {/* Mobile: stacked panels */}
        {isMobile ? (
          <div className="mt-10">
            {c.tabs.map((tab, index) => (
              <div key={tab.key} className={activeTab === index ? "block" : "hidden"}>
                <StrategyPanel tab={tab} />
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: horizontal scroll panels */
          <div ref={containerRef} className="mt-10 overflow-hidden">
            <div ref={panelsRef} className="flex gap-16">
              {c.tabs.map((tab) => (
                <div key={tab.key} className="w-[calc(100vw-120px)] max-w-5xl flex-shrink-0">
                  <StrategyPanel tab={tab} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        {!isMobile && (
          <div className="mt-8 h-0.5 w-full" style={{ background: "#d9dcdd" }}>
            <div
              className="h-full transition-all duration-200"
              style={{
                width: `${((activeTab + 1) / c.tabs.length) * 100}%`,
                background: "#b88463",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

type TabData = (typeof content.strategy.tabs)[number];

function StrategyPanel({ tab }: { tab: TabData }) {
  if ("pillars" in tab) {
    return (
      <div>
        <h3 className="text-3xl font-bold md:text-4xl" style={{ color: "#1b1b1b" }}>
          {tab.subtitle}
        </h3>
        <div className="mt-10 space-y-6">
          {tab.pillars.map((pillar, i) => (
            <FadeInView key={i} delay={i * 0.1}>
              <div
                className="flex gap-6 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: "#d9dcdd" }}
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: "rgba(184,132,99,0.1)", color: "#b88463" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-bold" style={{ color: "#1b1b1b" }}>
                    {pillar.heading}
                  </h4>
                  <p className="mt-1 text-sm" style={{ color: "#a2a9ac" }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-3xl font-bold md:text-4xl" style={{ color: "#1b1b1b" }}>
        {tab.subtitle}
      </h3>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "#a2a9ac" }}>
        {tab.description}
      </p>
    </div>
  );
}
