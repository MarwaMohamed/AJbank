"use client";

export function useDirection() {
  return { isRTL: false, dir: "ltr" as const, locale: "en" } as const;
}
