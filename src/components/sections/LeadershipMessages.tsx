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

/* ── Brand gradient: Dark Sand (#8c684a) → Black (#000000) from guidelines ── */
const CARD_GRADIENTS = [
  /* Chairman */
  "linear-gradient(160deg, #8c684a 0%, #3d2414 35%, #000000 100%)",
  /* CEO */
  "linear-gradient(180deg, #8c684a 0%, #3d2414 40%, #000000 100%)",
  /* CFO */
  "linear-gradient(200deg, #8c684a 0%, #3d2414 35%, #000000 100%)",
];

export function LeadershipMessages() {
  const c = content.leadershipMessages;
  const smoothScroll = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const prefersReduced = useReducedMotion();
  const cards = c.cards;

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const section = sectionRef.current;
    const totalCards = cards.length;
    const bgLayers = bgRef.current?.querySelectorAll<HTMLElement>(".lm-bg") ?? [];
    const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const scrollDistance = window.innerHeight * (totalCards - 1) * 1.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
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

      // Each transition occupies 1/(totalCards-1) of the timeline
      for (let i = 1; i < totalCards; i++) {
        const pos = (i - 1) / (totalCards - 1); // 0 for card 1, 0.5 for card 2

        // Image[i] reveals from bottom via clip-path
        if (images[i]) {
          tl.fromTo(
            images[i],
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
            pos
          );
        }

        // Text[i-1] fades out
        if (texts[i - 1]) {
          tl.to(
            texts[i - 1],
            { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" },
            pos
          );
        }

        // Text[i] fades in
        if (texts[i]) {
          tl.fromTo(
            texts[i],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
            pos + 0.25
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReduced, cards.length]);

  return (
    <section
      ref={sectionRef}
      id="leadership-messages"
      className="relative h-screen w-full overflow-hidden text-white"
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

      {/* Main content: left text + right images */}
      <div className="relative z-10 mx-auto flex h-[calc(100vh-120px)] max-w-7xl items-stretch gap-8 px-6 md:px-12 xl:pl-28 lg:gap-12">

        {/* LEFT: Stacked text panels (~55%) */}
        <div className="relative flex-1">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { textRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12"
              style={{
                opacity: i === 0 ? 1 : 0,
                willChange: "opacity, transform",
              }}
            >
              {/* Role label */}
              <p
                className="text-xs font-medium uppercase tracking-[0.25em]"
                style={{ color: "rgba(178,127,89,0.6)" }}
              >
                {card.role}
              </p>

              {/* Quote */}
              <blockquote className="mt-6">
                <p
                  className="text-xl font-medium leading-[1.15] md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>
              </blockquote>

              {/* Body */}
              <p
                className="mt-6 text-sm leading-[1.5] md:text-base lg:text-lg"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {card.body}
              </p>

              {/* Signature */}
              <div className="mt-8">
                <div className="mb-3 h-px w-12" style={{ background: "#b27f59" }} />
                <p className="text-sm font-bold text-white">{card.name}</p>
                <p className="mt-1 text-xs" style={{ color: "rgba(178,127,89,0.7)" }}>
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Stacked portrait images (~35%) */}
        <div className="relative hidden w-[35%] md:block">
          <div className="relative h-full w-full overflow-hidden rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]">
            {cards.map((card, i) => (
              <div
                key={i}
                ref={(el) => { imageRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{
                  zIndex: i + 1,
                  clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  willChange: "clip-path",
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 92%)" }}
                >
                  <Image
                    src={asset(card.image)}
                    alt={card.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: i === 0 ? "center 5%" : "center top" }}
                    sizes="(max-width: 768px) 100vw, 35vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicator — top right */}
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
