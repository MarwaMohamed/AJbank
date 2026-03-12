"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AtAGlance() {
  const c = content.atAGlance;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  /* Split title into words for the color-reveal effect */
  const titleWords = c.title.split(" ");

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !titleRef.current) return;

    const section = sectionRef.current;
    const words = titleRef.current.querySelectorAll<HTMLSpanElement>(".ag-word");
    const desc = descRef.current;
    const marker = markerRef.current;

    const ctx = gsap.context(() => {
      /* Pin the section while the word reveal plays */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerHeight * 1.5}`, // Reduced from 2.2 to feel less redundant
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      /* Marker fade in */
      if (marker) {
        tl.fromTo(
          marker,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          0
        );
      }

      /* Word-by-word color reveal: dim → white */
      words.forEach((word, i) => {
        tl.to(
          word,
          {
            color: "#ffffff",
            duration: 0.2,
            ease: "none",
          },
          (i / titleWords.length) * 0.8 // Fill most of the timeline
        );
      });

      /* Description paragraph fade in after title completes */
      if (desc) {
        tl.fromTo(
          desc,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          0.7 // Arrive towards the end
        );
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReduced, titleWords.length]);

  return (
    <section
      ref={sectionRef}
      id="at-a-glance"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with fallback gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(images/glance/glance-bg-new.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0a0700",
        }}
      />
      {/* Fallback gradient matching the golden abstract aesthetic */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 55% 45%, rgba(160,115,55,0.35) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 25% 55%, rgba(140,100,40,0.25) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 70% 30%, rgba(180,130,60,0.3) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(0,0,0,0.35)" }}
      />

      {/* Section marker – top-left */}
      <div
        ref={markerRef}
        className="absolute left-6 top-16 z-10 md:left-12 md:top-20"
        style={{ opacity: prefersReduced ? 1 : 0 }}
      >
        <SectionMarker number={c.number} label={c.label} light />
      </div>

      {/* Centered text block */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2
          ref={titleRef}
          className="text-3xl font-light leading-[1.15] tracking-wide md:text-5xl lg:text-6xl"
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="ag-word inline-block"
              style={{
                color: prefersReduced ? "#ffffff" : "rgba(255,255,255,0.35)",
                transition: prefersReduced ? "none" : "color 0.2s ease",
                marginRight: "0.3em",
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        <p
          ref={descRef}
          className="mx-auto mt-10 max-w-2xl text-lg leading-[1.2] md:text-xl"
          style={{
            color: "rgba(255,255,255,0.65)",
            opacity: prefersReduced ? 1 : 0,
          }}
        >
          {c.description}
        </p>
      </div>
    </section>
  );
}
