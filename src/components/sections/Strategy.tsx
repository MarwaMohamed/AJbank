"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
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
      className="relative w-full overflow-hidden bg-[#CCA991] bg-cover bg-center pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-16 lg:pb-40"
      style={{ backgroundImage: "url(images/strategy/strategy-bg.png)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-24 lg:px-40">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} />
        </FadeInView>

        {/* Tab navigation */}
        <div className="mt-8 lg:mt-12 flex flex-wrap gap-8 border-b border-black/5">
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
              className="relative pb-6 text-sm font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: activeTab === index ? "#b78260" : "rgba(0,0,0,0.3)" }}
            >
              {tab.title}
              <span
                className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                style={{
                  width: activeTab === index ? "100%" : "0%",
                  background: "#b78260",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="overflow-hidden">
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
      // Animate icon rotation from -90 to 0
      gsap.fromTo(
        iconRef.current,
        { rotation: -90 },
        { rotation: 0, duration: 0.8, ease: "power3.out", delay: 0.2 + index * 0.1 }
      );
      // Animate text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 + index * 0.1 }
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
        <svg stroke="rgb(0, 0, 0)" xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1px" viewBox="0 0 14 14" className="w-full block overflow-x-hidden overflow-y-hidden fill-none stroke-black">
          <path d="M13.9999 6.99998C10.13 7.00015 7 10 7 14M13.9999 6.99998L-6.10352e-05 6.99998M13.9999 6.99998C10.13 6.99981 7 4 7 0" className="inline fill-none stroke-black" />
        </svg>
      </div>
      <div
        ref={textRef}
        className="opacity-0 -translate-x-4"
      >
        <h4 className="text-xl font-bold text-black">{item.heading}</h4>
        <p className="mt-2 lg:mt-3 text-sm lg:text-base leading-relaxed text-black/60">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function StrategyPanel({ tab, isActive }: { tab: TabData; isActive?: boolean }) {
  return (
    <div
      className="relative flex h-full min-h-[500px] w-full flex-col lg:flex-row"
    >
      {/* Left side: Content */}
      <div className="z-10 flex w-full flex-col justify-start px-6 md:pl-32 md:pr-12 lg:w-1/2 lg:pl-[12vw] xl:pl-[15vw] lg:pr-16 pt-6 pb-12 lg:pt-8 lg:pb-24">
        <FadeInView>
          <h3 className="text-[32px] font-bold leading-tight text-black md:text-[42px] lg:text-[48px]">
            {tab.subtitle}
          </h3>

          <div className="mt-6 lg:mt-8 space-y-6 lg:space-y-10 max-w-2xl">
            {"items" in tab ? (
              tab.items.map((item, i) => (
                <AnimatedStrategyItem key={i} item={item} index={i} isActive={isActive ?? true} />
              ))
            ) : (
              <p className="text-base lg:text-lg leading-relaxed text-black/70">
                {tab.description}
              </p>
            )}
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
