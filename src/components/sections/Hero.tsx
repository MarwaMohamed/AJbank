"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { KeyVisualShape } from "@/components/ui/KeyVisualShape";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scroll } = content.hero;

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Logo drops in
      const logoInner = logoRef.current?.querySelector(".logo-inner");
      if (logoInner) {
        tl.fromTo(logoInner,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0
        );
      }

      // Headline lines slide up from below
      const lines = headlineRef.current?.querySelectorAll(".hero-line") ?? [];
      tl.fromTo(lines,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15 }, 0.15
      );

      // Sub-content slides up
      const subItems = subContentRef.current?.querySelectorAll(".sub-item") ?? [];
      tl.fromTo(subItems,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, 0.55
      );

      // Shapes image slides up from below, synced with text
      const shapesInner = shapesRef.current?.querySelector(".shapes-inner");
      if (shapesInner) {
        tl.fromTo(shapesInner,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, 0.25
        );
      }

      // Scroll indicator fades in last
      const scrollInner = scrollRef.current?.querySelector(".scroll-inner");
      if (scrollInner) {
        tl.fromTo(scrollInner,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.0
        );
      }

      // Background expanding mask on scroll
      if (bgWrapperRef.current && bgImageRef.current) {
        gsap.set(bgWrapperRef.current, { clipPath: "inset(12% 8% 12% 8% round 24px)" });
        gsap.set(bgImageRef.current, { scale: 1.15 });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
          },
        });
        scrollTl.to(bgWrapperRef.current, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" }, 0);
        scrollTl.to(bgImageRef.current, { scale: 1, duration: 1, ease: "power2.inOut" }, 0);
        scrollTl.to(headlineRef.current, { opacity: 0, y: -60, scale: 0.92, duration: 0.8, ease: "power2.inOut" }, 0.2);
        scrollTl.to(subContentRef.current, { opacity: 0, duration: 0.4 }, 0.2);
        scrollTl.to(shapesRef.current, { opacity: 0, y: -60, scale: 0.92, duration: 0.8, ease: "power2.inOut" }, 0.2);
        scrollTl.to(logoRef.current, { opacity: 0, duration: 0.3 }, 0.2);
        scrollTl.to(scrollRef.current, { opacity: 0, duration: 0.2 }, 0);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-screen w-full flex-col overflow-hidden bg-black"
    >
      {/* Background with expanding mask */}
      <div ref={bgWrapperRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <div
          ref={bgImageRef}
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: "url(images/hero/hero-bg-final.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              background: "linear-gradient(165deg, #001421 0%, #000e18 25%, #000000 55%, #3d2414 73%, #8c684a 95%, #b27f59 110%)",
              opacity: 0.25,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="absolute top-12 md:top-16 left-6 z-50 md:left-12 lg:left-32 xl:left-64 pointer-events-auto h-[48px] lg:h-[60px] w-[140px] lg:w-[170px]"
      >
        <div className="logo-inner h-full w-full flex items-center justify-start" style={{ opacity: prefersReduced ? 1 : 0 }}>
          <img
            src="images/ajb-logo-new.png"
            alt="Aljazira Bank Logo"
            className="max-h-full w-full object-contain object-left pointer-events-none"
          />
        </div>
      </div>

      {/* Main content — left aligned, vertically centered */}
      <div
        className="pointer-events-none relative z-10 flex h-full w-full max-w-7xl flex-col justify-center px-6 md:pl-20 lg:pl-32 xl:pl-64"
        style={{ fontFamily: "Tajawal, sans-serif" }}
      >
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="flex flex-col text-left font-light"
        >
          <span
            className="hero-line block text-[38px] leading-[1.15] md:text-[64px] lg:text-[102px] lg:leading-[1.15]"
            style={{
              color: "#b27f59",
              display: "block",
              opacity: prefersReduced ? 1 : 0,
            }}
          >
            Wealth
          </span>
          <span
            className="hero-line block text-[38px] leading-[1.15] md:text-[64px] lg:text-[102px] lg:leading-[1.15]"
            style={{
              color: "#ffffff",
              display: "block",
              opacity: prefersReduced ? 1 : 0,
            }}
          >
            Grows Here.
          </span>
        </h1>

        {/* Sub-content */}
        <div
          ref={subContentRef}
          className="mt-10 max-w-[520px] text-left lg:mt-14"
        >
          <p
            className="sub-item text-sm font-bold uppercase tracking-widest text-white/90"
            style={{ opacity: prefersReduced ? 1 : 0 }}
          >
            / Annual Report 2025
          </p>
          <p
            className="sub-item mt-4 text-[13px] leading-[1.2] text-white/75 md:text-[15px] lg:text-[16px]"
            style={{ opacity: prefersReduced ? 1 : 0 }}
          >
            Aljazira Bank is a Saudi Joint Stock Company and a full-service bank
            delivering an integrated suite of banking solutions serving retail,
            corporate, and institutional clients, as well as the treasury and
            investment sectors
          </p>
        </div>

      </div>

      {/* Shapes Image — moved outside max-w-7xl to prevent overlap */}
      <div
        ref={shapesRef}
        className="absolute right-4 md:right-8 lg:right-16 xl:right-32 top-1/2 z-[1] h-[50%] w-[30%] -translate-y-1/2 opacity-40 md:h-[65%] md:w-[35%] md:opacity-60 lg:h-[80%] lg:w-[38%] lg:opacity-100"
      >
        <div className="shapes-inner h-full w-full" style={{ opacity: prefersReduced ? 1 : 0 }}>
          <img
            src="images/hero/shapes.png"
            alt=""
            className="h-full w-full object-contain object-right"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <div className="scroll-inner flex flex-col items-center gap-3" style={{ opacity: prefersReduced ? 1 : 0 }}>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: "rgba(178,127,89,0.6)" }}
          >
            {scroll}
          </span>
          <div
            className="h-10 w-px animate-pulse"
            style={{ background: "linear-gradient(to bottom, rgba(178,127,89,0.6), transparent)" }}
          />
        </div>
      </div>
    </section >
  );
}
