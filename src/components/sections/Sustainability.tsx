"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const TABS = ["environment", "society", "governance"] as const;
const TAB_LABELS: Record<(typeof TABS)[number], string> = {
  environment: "Environment",
  society: "Society",
  governance: "Governance",
};

export function Sustainability() {
  const c = content.sustainability;
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("environment");

  return (
    <section
      id="sustainability"
      className="relative flex min-h-screen items-center overflow-hidden py-24 text-white"
      style={{
        background:
          "linear-gradient(165deg, #000d33 0%, #00071c 30%, #000000 55%, #301d10 78%, #7e4d2c 95%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <FadeInView>
          <SectionMarker number={c.number} label={c.label} light />
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="mt-12 text-3xl font-bold md:text-5xl">{c.title}</h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
            {c.description}
          </p>
        </FadeInView>

        {/* ESG Tabs */}
        <div className="mt-12 flex gap-1 border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-6 py-4 text-sm font-medium transition-colors duration-300"
              style={{ color: activeTab === tab ? "#b88463" : "rgba(255,255,255,0.4)" }}
            >
              {TAB_LABELS[tab]}
              <span
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                style={{
                  width: activeTab === tab ? "100%" : "0%",
                  background: "#b88463",
                }}
              />
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-10">
          {/* Environment */}
          <div className={activeTab === "environment" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {c.environment.map((m, i) => (
                <MetricCard key={i} {...m} />
              ))}
            </div>
          </div>

          {/* Society */}
          <div className={activeTab === "society" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {c.society.map((m, i) => (
                <MetricCard key={i} {...m} />
              ))}
            </div>
          </div>

          {/* Governance */}
          <div className={activeTab === "governance" ? "block" : "hidden"}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.certifications.map((cert, i) => (
                <FadeInView key={i} delay={i * 0.08}>
                  <div className="rounded-xl border border-white/10 p-5 transition-all duration-300 hover:border-[#b88463]/30">
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {cert}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 p-8 transition-all duration-300 hover:border-[#b88463]/30">
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className="text-4xl font-extrabold"
        style={{ color: "#cfa77c" }}
      />
      <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {label}
      </p>
    </div>
  );
}
