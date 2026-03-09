"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = ANIMATION.counter.duration,
  className = "",
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ val: 0 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      setDisplay(`${prefix}${value.toFixed(decimals)}${suffix}`);
      return;
    }

    const tween = gsap.to(counterRef.current, {
      val: value,
      duration,
      ease: ANIMATION.counter.ease,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        setDisplay(
          `${prefix}${counterRef.current.val.toFixed(decimals)}${suffix}`
        );
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, prefix, suffix, decimals, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} style={style} aria-label={`${prefix}${value}${suffix}`}>
      {display}
    </span>
  );
}
