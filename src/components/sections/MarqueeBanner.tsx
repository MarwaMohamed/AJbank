"use client";

import { content } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function MarqueeBanner() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: "linear-gradient(165deg, #001421 0%, #000e18 25%, #000000 55%, #3d2414 73%, #8c684a 95%)",
      }}
    >
      <Marquee
        text="WEALTH GROWS HERE"
        className="text-4xl font-bold tracking-[0.08em] md:text-7xl"
        separator=" — "
        repeat={5}
        style={{ color: "rgba(178,127,89,0.2)" }}
      />
    </section>
  );
}
