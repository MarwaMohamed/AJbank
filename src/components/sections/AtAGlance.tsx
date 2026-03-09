"use client";

import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { TextReveal } from "@/components/ui/TextReveal";

export function AtAGlance() {
  const c = content.atAGlance;

  return (
    <section
      id="at-a-glance"
      className="relative flex min-h-screen items-center bg-white py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} />
        </FadeInView>

        <div className="mt-16 max-w-4xl">
          <TextReveal
            as="h2"
            className="text-3xl font-bold leading-snug md:text-5xl lg:text-6xl md:leading-tight"
            splitBy="words"
            stagger={0.04}
            style={{ color: "#1b1b1b" }}
          >
            {c.title}
          </TextReveal>
          <FadeInView delay={0.4}>
            <p className="mt-10 max-w-3xl text-lg leading-relaxed md:text-xl md:leading-relaxed" style={{ color: "#a2a9ac" }}>
              {c.description}
            </p>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
