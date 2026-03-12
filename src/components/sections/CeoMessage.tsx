"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { ANIMATION } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { TextReveal } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CeoMessage() {
  const c = content.ceoMessage;
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: ANIMATION.revealSlow.duration,
            ease: ANIMATION.revealSlow.ease,
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="ceo-message"
      className="relative flex min-h-screen items-center overflow-hidden py-24 text-white"
      style={{
        background:
          "linear-gradient(165deg, #001421 0%, #000e18 25%, #000000 55%, #3d2414 73%, #8c684a 95%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} light />
        </FadeInView>

        <div className="mt-16 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Quote & text */}
          <div>
            <TextReveal
              as="blockquote"
              className="text-2xl font-medium leading-[1.15] md:text-3xl"
              splitBy="words"
              stagger={0.05}
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {c.quote}
            </TextReveal>

            <FadeInView delay={0.5}>
              <p className="mt-10 text-base leading-[1.2]" style={{ color: "rgba(255,255,255,0.65)" }}>
                {c.body}
              </p>
            </FadeInView>

            <FadeInView delay={0.7}>
              <div className="mt-12">
                <div className="mb-2 h-px w-12" style={{ background: "#b27f59" }} />
                <p className="text-sm font-bold text-white">{c.name}</p>
                <p className="text-xs" style={{ color: "rgba(178,127,89,0.7)" }}>
                  {c.title}
                </p>
              </div>
            </FadeInView>
          </div>

          {/* Portrait placeholder */}
          <div
            ref={portraitRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden"
            style={{
              opacity: prefersReduced ? 1 : 0,
              background:
                "linear-gradient(180deg, rgba(178,127,89,0.15) 0%, rgba(0,13,51,0.3) 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="mx-auto mb-4 h-28 w-28 rounded-full"
                  style={{ background: "rgba(178,127,89,0.12)" }}
                />
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  CEO Portrait
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
