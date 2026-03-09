"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";

export function EmailCta() {
  const c = content.emailCta;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40" style={{ background: "#f7f7f7" }}>
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeInView>
          <SectionMarker number="008" label="Contact" />
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="mt-12 text-3xl font-bold md:text-5xl" style={{ color: "#1b1b1b" }}>
            {c.title}
          </h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mt-6 text-lg" style={{ color: "#a2a9ac" }}>
            {c.description}
          </p>
        </FadeInView>

        <FadeInView delay={0.3}>
          {submitted ? (
            <div className="mt-12 flex items-center justify-center gap-3" style={{ color: "#b88463" }}>
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
                className="flex-1 rounded-xl border bg-white px-5 py-4 text-sm outline-none transition-all duration-200"
                style={{ borderColor: "#d9dcdd", color: "#1b1b1b" }}
                onFocus={(e) => { e.target.style.borderColor = "#b88463"; e.target.style.boxShadow = "0 0 0 3px rgba(184,132,99,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#d9dcdd"; e.target.style.boxShadow = "none"; }}
              />
              <button
                type="submit"
                className="rounded-xl px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ background: "#b88463" }}
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
