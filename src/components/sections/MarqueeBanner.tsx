"use client";

import { content } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function MarqueeBanner() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: "linear-gradient(165deg, #000d33 0%, #00071c 30%, #000000 55%, #301d10 78%, #7e4d2c 95%)",
      }}
    >
      <Marquee
        text={content.marquee.text}
        className="text-4xl font-extrabold tracking-[0.08em] md:text-7xl"
        separator=" — "
        repeat={5}
        style={{ color: "rgba(184,132,99,0.2)" }}
      />
    </section>
  );
}
