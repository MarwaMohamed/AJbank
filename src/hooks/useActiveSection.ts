"use client";

import { useState, useEffect } from "react";
import { SECTIONS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    // Wait for components to register their own pins/ScrollTriggers
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        SECTIONS.forEach(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return;

          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
            onToggle: (self) => {
              if (self.isActive) setActiveSection(id);
            }
          });
        });
      });

      // Ensure we re-calculate on some layout changes
      ScrollTrigger.refresh();
      return () => ctx.revert();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return activeSection;
}
