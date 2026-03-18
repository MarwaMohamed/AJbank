"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { asset } from "@/lib/basePath";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useSmoothScroll } from "../layout/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/* ── Background gradients per card (brand-aligned: Black ↔ Midnight Blue, page 61) ── */
const CARD_GRADIENTS = [
  /* Chairman: deep Midnight Blue dominant, Black lower-right corner */
  "linear-gradient(145deg, #001421 0%, #000d1a 45%, #000000 100%)",
  /* CEO: diagonal, Midnight Blue bottom-left, Black top-right, subtle Dark Sand warmth */
  "linear-gradient(215deg, #000000 0%, #001421 55%, #0a1e2d 100%)",
  /* CFO: Black dominant upper, Midnight Blue sweep from bottom corner */
  "linear-gradient(170deg, #000000 0%, #000a14 50%, #001421 100%)",
];

export function LeadershipMessages() {
  const c = content.leadershipMessages;
  const smoothScroll = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const panelsWrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const prefersReduced = useReducedMotion();
  const cards = c.cards;

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !panelsWrapRef.current) return;

    const section = sectionRef.current;
    const panels = panelsWrapRef.current;
    const totalCards = cards.length;
    const bgLayers = bgRef.current?.querySelectorAll<HTMLElement>(".lm-bg") ?? [];

    const ctx = gsap.context(() => {
      // Pin section and scrub the panels horizontally
      const totalWidth = panels.scrollWidth - window.innerWidth;

      const mainTween = gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalWidth * 1.8}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newActive = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveCard(newActive);

            // Crossfade background gradients
            bgLayers.forEach((bg, i) => {
              gsap.to(bg, {
                opacity: i === newActive ? 1 : 0,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
            });
          },
        },
      });

      // Animate each card's inner elements on scroll using containerAnimation
      const cardEls = panels.querySelectorAll<HTMLElement>(".lm-card");
      cardEls.forEach((card) => {
        const img = card.querySelector(".lm-img");
        const textEls = card.querySelectorAll(".lm-reveal");

        // Image: scale up from 1.15 and fade in
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "left 85%",
                end: "left 40%",
                scrub: 1,
                containerAnimation: mainTween,
              },
            }
          );
        }

        // Text elements: staggered fade up
        if (textEls.length) {
          gsap.fromTo(
            textEls,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "left 70%",
                containerAnimation: mainTween,
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced, cards.length]);

  return (
    <section
      ref={sectionRef}
      id="leadership-messages"
      className="relative flex h-screen w-full flex-col overflow-hidden text-white"
    >
      {/* Dynamic background layers */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {cards.map((_, i) => (
          <div
            key={i}
            className="lm-bg absolute inset-0 transition-opacity"
            style={{
              background: CARD_GRADIENTS[i % CARD_GRADIENTS.length],
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Fixed header + navigation */}
      <div className="relative z-10 flex-shrink-0 px-6 pt-5 md:px-12 md:pt-6 xl:pl-28">
        <div className="mx-auto max-w-7xl">
          <SectionMarker number={c.number} label={c.label} light />

          {/* Tab navigation */}
          <div className="mt-2 flex gap-1">
            {cards.map((card, i) => (
              <button
                key={i}
                className="relative px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300"
                style={{
                  color: activeCard === i ? "#cda991" : "rgba(255,255,255,0.5)",
                }}
                onClick={() => {
                  const triggers = ScrollTrigger.getAll();
                  const thisTrigger = triggers.find(
                    (st) => st.trigger === sectionRef.current
                  );
                  if (thisTrigger) {
                    const progress = i / cards.length;
                    const scrollTarget =
                      thisTrigger.start +
                      progress * (thisTrigger.end - thisTrigger.start);

                    if (smoothScroll) {
                      smoothScroll.scrollTo(scrollTarget);
                    } else {
                      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
                    }
                  }
                }}
              >
                {card.role}
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{
                    width: activeCard === i ? "100%" : "0%",
                    background: "#b27f59",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scrolling panels */}
      <div className="relative z-10 flex-1">
        <div ref={panelsWrapRef} className="flex h-full">
          {cards.map((card, i) => (
            <div
              key={i}
              className="lm-card flex h-full w-screen flex-shrink-0 items-start px-6 md:px-12 xl:pl-28"
              style={{ paddingTop: "1vh" }}
            >
              <div className="mx-auto grid w-full h-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-[1fr_minmax(250px,350px)] md:gap-10 lg:gap-16">
                {/* Text column (LEFT) */}
                <div className="flex flex-col justify-center">
                  <div className="lm-reveal">
                    <p
                      className="text-xs font-medium uppercase tracking-[0.25em]"
                      style={{ color: "rgba(178,127,89,0.6)" }}
                    >
                      {card.role}
                    </p>
                  </div>

                  <blockquote className="lm-reveal mt-4">
                    <p
                      className="text-xl font-medium leading-[1.15] md:text-2xl lg:text-3xl"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      &ldquo;{card.quote}&rdquo;
                    </p>
                  </blockquote>

                  <p
                    className="lm-reveal mt-4 text-sm leading-[1.2] md:text-base"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {card.body}
                  </p>

                  <div className="lm-reveal mt-6">
                    <div
                      className="mb-3 h-px w-12"
                      style={{ background: "#b27f59" }}
                    />
                    <p className="text-sm font-bold text-white">{card.name}</p>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "rgba(178,127,89,0.7)" }}
                    >
                      {card.title}
                    </p>
                  </div>
                </div>

                {/* Portrait column (RIGHT) */}
                <div className="relative flex h-full items-center justify-center md:justify-end">
                  <div
                    className="lm-img relative z-10 aspect-[3/4] w-[180px] md:w-[230px] lg:w-[270px] overflow-hidden"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 92%)" }}
                  >
                    {/* Gradient overlay for blending */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 35%, transparent 75%, rgba(0,0,0,0.08) 100%)",
                      }}
                    />
                    <Image
                      src={asset(card.image)}
                      alt={card.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: i === 0 ? "center 5%" : "center top" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator — top, next to tabs */}
      <div className="absolute top-[52px] right-6 z-10 flex items-center gap-3 md:top-[56px] md:right-12">
        {cards.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: activeCard === i ? 32 : 8,
              background:
                activeCard === i ? "#b27f59" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
        <span
          className="ml-4 text-xs tabular-nums"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {String(activeCard + 1).padStart(2, "0")} /{" "}
          {String(cards.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
