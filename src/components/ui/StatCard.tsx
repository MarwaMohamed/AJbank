"use client";

import { AnimatedCounter } from "./AnimatedCounter";

interface StatCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  dark?: boolean;
  className?: string;
}

export function StatCard({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  dark = false,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        dark
          ? "border-white/10 bg-gradient-to-br from-[#000d33] via-[#000000] to-[#301d10] text-white"
          : "border-border bg-white text-text-primary hover:border-gold/30 hover:shadow-gold/5"
      } ${className}`}
    >
      <div className="mb-4">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className={`text-4xl font-extrabold md:text-5xl ${
            dark ? "text-gold-light" : "text-gold"
          }`}
        />
      </div>
      <p
        className={`text-sm leading-relaxed ${
          dark ? "text-white/60" : "text-text-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
