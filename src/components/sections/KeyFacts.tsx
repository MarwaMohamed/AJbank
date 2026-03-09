"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/* ── Background gradients per card ── */
const CARD_BACKGROUNDS = [
  "linear-gradient(135deg, #00132e 0%, #001a3d 50%, #0a2244 100%)",
  "linear-gradient(135deg, #0a1628 0%, #1a1030 50%, #2a1040 100%)",
  "linear-gradient(135deg, #1c0e0a 0%, #301d10 50%, #4a2e1a 100%)",
  "linear-gradient(135deg, #0a1628 0%, #0d1520 50%, #162030 100%)",
  "linear-gradient(135deg, #18100c 0%, #2a1a10 50%, #3d2818 100%)",
  "linear-gradient(135deg, #00132e 0%, #000d33 50%, #001040 100%)",
];

/* ── All stat cards data flattened ── */
function getAllCards() {
  const c = content.keyFacts;
  return [
    { group: c.page1Title, ...c.page1[0] },
    { group: c.page1Title, ...c.page1[1] },
    { group: c.page1Title, ...c.page1[2] },
    { group: c.page2Title, ...c.page2[0] },
    { group: c.page2Title, ...c.page2[1] },
    { group: c.page2Title, ...c.page2[2] },
  ];
}

export function KeyFacts() {
  const c = content.keyFacts;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const prefersReduced = useReducedMotion();
  const cards = getAllCards();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !cardsContainerRef.current) return;

    const cardEls = cardsContainerRef.current.querySelectorAll<HTMLElement>(".kf-card");
    const bgLayers = bgRef.current?.querySelectorAll<HTMLElement>(".kf-bg") ?? [];
    const totalCards = cardEls.length;
    const sectionHeight = totalCards * 100; // vh per card step

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${sectionHeight}vh`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newActive = Math.min(
            totalCards - 1,
            Math.floor(progress * totalCards)
          );
          setActiveCard(newActive);

          // Animate cards: current card rises to center, previous cards recede
          cardEls.forEach((card, i) => {
            if (i < newActive) {
              // Previous cards: move up, scale down, and fully hide after 1 step
              const distance = newActive - i;
              gsap.to(card, {
                y: -(distance * 40),
                scale: 1 - distance * 0.05,
                opacity: distance === 1 ? 0.4 : 0,
                zIndex: i,
                duration: 0.5,
                ease: "power2.out",
              });
            } else if (i === newActive) {
              // Active card: full size, centered
              gsap.to(card, {
                y: 0,
                scale: 1,
                opacity: 1,
                zIndex: totalCards,
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              // Upcoming cards: below the stack, hidden
              gsap.to(card, {
                y: 80,
                scale: 0.95,
                opacity: 0,
                zIndex: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          // Animate background gradient transitions
          bgLayers.forEach((bg, i) => {
            gsap.to(bg, {
              opacity: i === newActive ? 1 : 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced, cards.length]);

  return (
    <section
      ref={sectionRef}
      id="key-facts"
      className="relative flex h-screen w-full flex-col overflow-hidden"
    >
      {/* Dynamic background layers */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {cards.map((_, i) => (
          <div
            key={i}
            className="kf-bg absolute inset-0 transition-opacity"
            style={{
              background: CARD_BACKGROUNDS[i % CARD_BACKGROUNDS.length],
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Fixed header */}
      <div className="relative z-10 px-6 pt-16 md:px-12 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <SectionMarker number={c.number} label={c.label} light />
          <h2 className="mt-6 text-2xl font-bold text-white md:text-4xl">
            Key Facts <span style={{ color: "#b88463" }}>&</span> Figures
          </h2>
        </div>
      </div>

      {/* Group label */}
      <div className="relative z-10 mt-6 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-500"
            style={{ color: "rgba(184,132,99,0.7)" }}
          >
            {cards[activeCard]?.group}
          </p>
        </div>
      </div>

      {/* Stacking cards */}
      <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
        <div ref={cardsContainerRef} className="relative mx-auto w-full max-w-5xl">
          {cards.map((card, i) => (
            <div
              key={i}
              className="kf-card absolute inset-x-0 rounded-3xl border border-white/[0.08] p-8 md:p-12"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateY(0) scale(1)" : "translateY(80px) scale(0.95)",
                willChange: "transform, opacity",
              }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                {/* Big stat number */}
                <div>
                  <AnimatedCounter
                    value={card.value}
                    prefix={card.prefix}
                    suffix={card.suffix}
                    decimals={card.decimals}
                    className="text-6xl font-extrabold leading-none md:text-8xl lg:text-[120px]"
                    style={{ color: "#cfa77c" }}
                  />
                </div>
                {/* Label */}
                <div className="max-w-sm md:pb-3">
                  <p className="text-base font-medium leading-relaxed text-white/70 md:text-lg">
                    {card.label}
                  </p>
                </div>
              </div>

              {/* Subtle bottom accent line */}
              <div className="mt-8 h-px w-full" style={{ background: "rgba(184,132,99,0.15)" }} />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                  {card.group}
                </span>
                <span className="text-xs tabular-nums text-white/30">
                  {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-10">
        {cards.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: activeCard === i ? 24 : 6,
              background: activeCard === i ? "#b88463" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
