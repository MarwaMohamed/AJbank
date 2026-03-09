"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { theme, subtitle, scroll } = content.hero;

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Character-by-character text reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word-span");
        words.forEach((word) => {
          const text = word.textContent || "";
          word.innerHTML = text
            .split("")
            .map(
              (char) =>
                `<span style="display:inline-block;opacity:0;transform:translateY(60px)">${char === " " ? "&nbsp;" : char}</span>`
            )
            .join("");
        });

        gsap.to(headlineRef.current.querySelectorAll(".word-span span"), {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.03, delay: 0.3,
        });
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 1.2, ease: "power2.out" }
        );
      }

      // Scroll indicator fade in + pulse
      if (scrollRef.current) {
        gsap.fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 1.6, ease: "power2.out" }
        );
      }

      // Expanding mask scroll animation (Anima.ai style)
      if (bgWrapperRef.current && bgImageRef.current) {
        gsap.set(bgWrapperRef.current, { clipPath: "inset(12% 8% 12% 8% round 24px)" });
        gsap.set(bgImageRef.current, { scale: 1.15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current, start: "top top", end: "+=120%", pin: true, scrub: 1,
          },
        });
        tl.to(bgWrapperRef.current, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" }, 0);
        tl.to(bgImageRef.current, { scale: 1, duration: 1, ease: "power2.inOut" }, 0);
        if (headlineRef.current) {
          tl.to(headlineRef.current, { opacity: 0, y: -60, scale: 0.95, duration: 0.6, ease: "power2.in" }, 0.3);
        }
        if (subtitleRef.current) {
          tl.to(subtitleRef.current, { opacity: 0, duration: 0.4 }, 0.2);
        }
        if (scrollRef.current) {
          tl.to(scrollRef.current, { opacity: 0, duration: 0.3 }, 0);
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  const words = theme.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Background with expanding mask */}
      <div ref={bgWrapperRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <div
          ref={bgImageRef}
          className="absolute inset-0 h-full w-full"
          style={{ background: "linear-gradient(165deg, #000d33 0%, #00071c 30%, #000000 55%, #301d10 78%, #7e4d2c 95%, #9e6137 110%)" }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="pointer-events-none relative z-10 flex flex-col items-center text-center px-6">
        <p
          ref={subtitleRef}
          className="mb-8 text-xs font-medium tracking-[0.35em] uppercase"
          style={{ opacity: prefersReduced ? 1 : 0, color: "#cfa77c" }}
        >
          {subtitle}
        </p>
        <h1
          ref={headlineRef}
          className="flex flex-col items-center justify-center gap-1 text-5xl font-extrabold leading-[1.05] md:text-7xl lg:text-[120px]"
          style={{ color: "#cfa77c", textShadow: "0px 4px 30px rgba(0,0,0,0.4)" }}
        >
          {words.map((word, i) => (
            <span key={i} className="word-span block overflow-hidden">{word}</span>
          ))}
        </h1>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-3"
        style={{ opacity: prefersReduced ? 1 : 0 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "rgba(207,167,124,0.6)" }}>
          {scroll}
        </span>
        <div className="h-10 w-px animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(184,132,99,0.6), transparent)" }} />
      </div>
    </section>
  );
}
