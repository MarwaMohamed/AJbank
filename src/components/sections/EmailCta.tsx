"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { KeyVisualShape } from "@/components/ui/KeyVisualShape";

export function EmailCta() {
  const c = content.emailCta;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 md:py-40"
      style={{
        background:
          "linear-gradient(165deg, #001421 0%, #000e18 40%, #000000 70%, #0a0805 100%)",
      }}
    >
      {/* Decorative key visual shape — right side, partially off-screen */}
      <div className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 md:-right-8 lg:right-0">
        <KeyVisualShape
          variant="single"
          style="outline"
          opacity={0.08}
          className="h-[500px] w-[350px] md:h-[600px] md:w-[420px]"
        />
      </div>

      {/* Secondary shape — left side, smaller, creating visual balance */}
      <div className="pointer-events-none absolute -left-24 bottom-8 md:-left-16">
        <KeyVisualShape
          variant="columns"
          style="outline"
          opacity={0.05}
          className="h-[300px] w-[200px] rotate-180 md:h-[400px] md:w-[280px]"
        />
      </div>

      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(178,127,89,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <FadeInView>
          <SectionMarker number="008" label="Get the Report" light />
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="mt-12 text-3xl font-light text-white md:text-5xl">
            {c.title}
          </h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mt-6 text-lg leading-[1.2]" style={{ color: "rgba(255,255,255,0.65)" }}>
            {c.description}
          </p>
        </FadeInView>

        <FadeInView delay={0.3}>
          {submitted ? (
            <div className="mt-12 flex items-center justify-center gap-3" style={{ color: "#b27f59" }}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg font-medium">{c.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 flex gap-3 max-sm:flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                required
                className="flex-1 rounded-xl border px-5 py-4 text-sm outline-none transition-all duration-200 placeholder:text-white/30"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#b27f59"; e.target.style.boxShadow = "0 0 0 3px rgba(178,127,89,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <button
                type="submit"
                className="rounded-xl px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: "#b27f59" }}
              >
                {c.button}
              </button>
            </form>
          )}
        </FadeInView>
      </div>
    </section>
  );
}
