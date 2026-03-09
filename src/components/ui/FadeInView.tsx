"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  as?: keyof HTMLElementTagNameMap;
}

export function FadeInView({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = ANIMATION.reveal.duration,
  as: Tag = "div" as keyof HTMLElementTagNameMap,
}: FadeInViewProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") fromVars.y = distance;
    if (direction === "down") fromVars.y = -distance;
    if (direction === "left") fromVars.x = distance;
    if (direction === "right") fromVars.x = -distance;

    gsap.set(el, fromVars);

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: ANIMATION.reveal.ease,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay, direction, distance, duration, prefersReduced]);

  const Component = Tag as string;

  return (
    // @ts-expect-error dynamic tag
    <Component ref={ref} className={className} style={prefersReduced ? {} : { opacity: 0 }}>
      {children}
    </Component>
  );
}
