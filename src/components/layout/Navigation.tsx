"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS } from "@/lib/constants";
import { useSmoothScroll } from "./SmoothScroll";

export function Navigation() {
  const activeSection = useActiveSection();
  const smoothScroll = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? scrollY / totalHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (smoothScroll) {
      smoothScroll.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLight = ["strategy", "corporate-identity", "sustainability"].includes(activeSection);

  return (
    <nav
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2 flex items-center gap-4 max-xl:hidden"
      aria-label="Side navigation"
    >
      {/* Vertical progress bar */}
      <div
        className="relative w-[1px] self-stretch"
        style={{
          background: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
          minHeight: "200px",
          maxHeight: "320px",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: `${scrollProgress * 100}%`,
            background: "#b27f59",
            transition: "height 0.1s linear",
          }}
        />
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-[18px]">
        {SECTIONS.map(({ id, label, number }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredId === id;
          // Label is visible when: not scrolled yet, OR item is active, OR hovered
          const showLabel = !scrolled || isActive || isHovered;

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex items-center gap-2.5 text-start"
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active/hover dot indicator */}
              <span
                className="flex-shrink-0 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "6px" : "4px",
                  height: isActive ? "6px" : "4px",
                  background: isActive
                    ? "#b27f59"
                    : isHovered
                      ? "rgba(178,127,89,0.6)"
                      : isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 6px rgba(178,127,89,0.6)" : "none",
                }}
              />

              {/* Number */}
              <span
                className="text-[13px] font-bold tabular-nums tracking-wider transition-all duration-300"
                style={{
                  color: isActive || isHovered ? "#b27f59" : isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)",
                }}
              >
                {number}
              </span>

              {/* Label — collapses on scroll, expands on hover/active */}
              <span
                className="overflow-hidden whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-500"
                style={{
                  maxWidth: showLabel ? "120px" : "0px",
                  opacity: showLabel ? (isActive ? 1 : isHovered ? 0.8 : (isLight ? 0.5 : 0.35)) : 0,
                  color: isActive ? "#b27f59" : isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                }}
              >
                {label}
              </span>

              {/* Active underline */}
              {(isActive || isHovered) && (
                <span
                  className="ml-[-4px] block h-[1px] transition-all duration-500"
                  style={{
                    width: isActive ? "16px" : "8px",
                    background: "#b27f59",
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
