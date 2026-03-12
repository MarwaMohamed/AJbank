"use client";

import { content } from "@/lib/content";
import { asset } from "@/lib/basePath";
import { FadeInView } from "@/components/ui/FadeInView";

export function Footer() {
  const c = content.footer;

  return (
    <footer
      className="relative overflow-hidden py-20 text-white"
      style={{
        background:
          "linear-gradient(165deg, #001421 0%, #000e18 25%, #000000 55%, #3d2414 73%, #8c684a 95%)",
      }}
    >
      {/* Watermark logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0.06 }}>
        <span className="text-[200px] font-bold tracking-widest">ajb</span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Logo */}
        <FadeInView>
          <div className="mb-10 flex justify-center">
            <img
              src={asset("/images/ajb-logo-new.png")}
              alt="Aljazira Bank"
              className="h-12 w-auto object-contain"
            />
          </div>
        </FadeInView>

        {/* Links */}
        <FadeInView delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {c.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative transition-colors duration-200 hover:text-[#b27f59]"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "#b27f59" }}
                />
              </a>
            ))}
          </div>
        </FadeInView>

        {/* Regulatory note */}
        <FadeInView delay={0.15}>
          <p className="mx-auto mb-6 max-w-lg text-center text-xs leading-[1.2]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Aljazira Bank is a Saudi Joint Stock Company, regulated by the Saudi Central Bank (SAMA). Commercial Registration No. 4030010523.
          </p>
        </FadeInView>

        {/* Copyright */}
        <FadeInView delay={0.2}>
          <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
            {c.copyright}
          </p>
        </FadeInView>
      </div>
    </footer>
  );
}
