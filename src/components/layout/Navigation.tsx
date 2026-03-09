"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS } from "@/lib/constants";

export function Navigation() {
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed left-8 top-1/2 z-50 -translate-y-1/2 flex flex-col items-start gap-5 2xl:left-12 max-xl:hidden"
      aria-label="Side navigation"
    >
      {SECTIONS.map(({ id, label, number }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-baseline gap-3 text-start transition-all duration-300"
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className="text-[10px] font-medium tabular-nums tracking-wider transition-opacity duration-300 group-hover:opacity-100"
              style={{
                color: "#b88463",
                opacity: isActive ? 1 : 0.3,
              }}
            >
              {number}
            </span>
            <span
              className="relative text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                color: isActive ? "#b88463" : "rgba(162,169,172,0.6)",
              }}
            >
              {label}
              <span
                className="absolute -bottom-1 left-0 h-[1px] transition-all duration-500 ease-out"
                style={{
                  width: isActive ? "100%" : "0%",
                  background: "#b88463",
                }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
