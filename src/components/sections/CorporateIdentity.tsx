"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { KeyVisualShape } from "@/components/ui/KeyVisualShape";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CorporateIdentity() {
  const c = content.corporateIdentity;
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="corporate-identity" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(160deg, #001421 0%, #0a2a3f 30%, #3E87D3 70%, #001421 100%)" }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('images/vision-2030-model.png')", opacity: 0.675 }}
        />
      </div>

      {/* Decorative key visual shape */}
      <div className="pointer-events-none absolute -right-12 top-16 md:right-8 lg:right-16">
        <KeyVisualShape
          variant="single"
          style="outline"
          opacity={0.06}
          className="h-[400px] w-[280px] md:h-[500px] md:w-[350px]"
          id="ci"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} light />
        </FadeInView>

        <div className="mt-16 max-w-3xl">
          <FadeInView delay={0.1}>
            <h2 className="text-3xl font-light text-white md:text-5xl">
              {c.title}
            </h2>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p className="mt-6 text-lg leading-[1.2]" style={{ color: "rgba(255,255,255,0.65)" }}>
              {c.description}
            </p>
          </FadeInView>
        </div>

        {/* Vertical connector line */}
        <div className="py-12">
          <div ref={lineRef} className="h-20 w-px" style={{ background: "#b27f59" }} />
        </div>

        {/* Purpose */}
        <FadeInView delay={0.3}>
          <p className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#b27f59" }}>
            {c.purpose}
          </p>
        </FadeInView>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-14 lg:grid-cols-3">
          {c.stats.map((stat, i) => (
            <FadeInView key={stat.label} delay={0.1 + i * 0.08}>
              <div>
                <AnimatedCounter
                  value={stat.value}
                  suffix={(stat as any).suffix}
                  className="text-6xl font-bold md:text-8xl tracking-tighter"
                  style={{ color: "#ffffff" }}
                />
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {stat.label}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
