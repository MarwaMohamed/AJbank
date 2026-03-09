"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
  splitBy?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
}

export function TextReveal({
  children,
  className = "",
  style,
  as: Tag = "p",
  splitBy = "words",
  stagger = ANIMATION.stagger.normal,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;

    // Split text into spans
    const text = el.textContent || "";
    let items: string[];

    if (splitBy === "chars") {
      items = text.split("");
    } else if (splitBy === "words") {
      items = text.split(" ");
    } else {
      items = text.split("\n");
    }

    el.innerHTML = items
      .map(
        (item) =>
          `<span style="display:inline-block;overflow:hidden;"><span class="reveal-item" style="display:inline-block;transform:translateY(100%);opacity:0;">${item}${splitBy === "words" ? "&nbsp;" : ""}</span></span>`
      )
      .join("");

    const revealItems = el.querySelectorAll(".reveal-item");

    const tween = gsap.to(revealItems, {
      y: 0,
      opacity: 1,
      duration: ANIMATION.reveal.duration,
      ease: ANIMATION.reveal.ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      el.textContent = text;
    };
  }, [children, splitBy, stagger, delay, prefersReduced]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} style={style}>
      {children}
    </Tag>
  );
}
