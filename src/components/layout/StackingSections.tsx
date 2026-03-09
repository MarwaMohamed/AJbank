"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface StackingSectionsProps {
    children: React.ReactNode[];
}

export function StackingSections({ children }: StackingSectionsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (prefersReduced || !containerRef.current) return;

        const sections = Array.from(containerRef.current.children) as HTMLElement[];
        const ctx = gsap.context(() => {
            sections.forEach((section, index) => {
                // Skip sections explicitly marked not to stack (e.g. ones with their own complex pin logic like Strategy)
                if (section.dataset.noStack === "true") return;

                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    pin: true,
                    pinSpacing: false, // This is key for the "stacking" effect
                    scrub: true,
                });

                // Add a subtle shadow transition or scale for the covered section
                // Find the next section to trigger the scale down
                const nextSection = sections.slice(index + 1).find(s => s.dataset.noStack !== "true") || sections[index + 1];
                if (nextSection) {
                    gsap.to(section, {
                        scale: 0.95,
                        opacity: 0.5,
                        scrollTrigger: {
                            trigger: nextSection,
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        },
                    });
                }
            });
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, [prefersReduced, children]);

    return (
        <div ref={containerRef} className="relative">
            {children}
        </div>
    );
}
