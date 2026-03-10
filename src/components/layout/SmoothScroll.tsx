"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScrollContext = createContext<{
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement) => void;
} | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [prefersReduced]);

  const scrollTo = (target: string | number | HTMLElement) => {
    if (lenis) {
      let scrollTarget = target;

      // For section IDs, try to find the ScrollTrigger start to ensure accuracy with pins
      if (typeof target === "string" && target.startsWith("#")) {
        const id = target.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const st = ScrollTrigger.getAll().find(
            (s) => s.trigger === el && s.vars.pin === true
          );
          if (st) {
            scrollTarget = st.start;
          }
        }
      }

      lenis.scrollTo(scrollTarget, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (typeof target === "string") {
      const el = document.getElementById(target.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
