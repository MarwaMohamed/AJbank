"use client";

import { content } from "@/lib/content";

export function Footer() {
  const c = content.footer;

  return (
    <footer
      className="relative overflow-hidden py-20 text-center text-white"
      style={{
        background:
          "linear-gradient(165deg, #000d33 0%, #00071c 30%, #000000 55%, #301d10 78%, #7e4d2c 95%)",
      }}
    >
      {/* Watermark logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0.03 }}>
        <span className="text-[200px] font-extrabold tracking-widest">ajb</span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-8 flex justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {c.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative transition-colors duration-200 hover:text-[#b88463]"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: "#b88463" }}
              />
            </a>
          ))}
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          {c.copyright}
        </p>
      </div>
    </footer>
  );
}
