/* ── AJB Official Brand Colors (Interbrand Sept 2025) ── */
export const COLORS = {
  sand: {
    DEFAULT: "#b27f59",   // Primary Sand (Pantone 4645 C)
    dark: "#8c684a",      // Primary Dark Sand (Pantone 4635 C)
    light: "#cda991",     // Dune (Pantone 4665 C) — secondary
  },
  // Legacy aliases (gold → sand) for backward compat
  gold: {
    DEFAULT: "#b27f59",
    dark: "#8c684a",
    light: "#cda991",
  },
  navy: {
    DEFAULT: "#001421",   // Primary Midnight Blue (Pantone 296 C)
    deep: "#000d33",      // Gradient stop
  },
  slate: "#333f48",       // Pantone 7546 — secondary
  dune: "#cda991",        // Pantone 4665 C — secondary
  grey: {
    DEFAULT: "#5b6770",   // Pantone 431
    light: "#a2aaad",     // Pantone 429
  },
  text: {
    primary: "#1b1b1b",
    secondary: "#343f48",
    muted: "#a2a9ac",
    dim: "#4e4e4e",
  },
  border: "#d9dcdd",
  white: "#ffffff",
  pearl: "#ffffff",       // Primary Pearl
  black: "#000000",
} as const;

export const GRADIENT_DARK =
  "linear-gradient(15deg, #001421 0%, #000e18 25%, #000000 53%, #3d2414 73%, #8c684a 109%, #b27f59 125%)";

export const SECTIONS = [
  { id: "hero", label: "Home", number: "001" },
  { id: "at-a-glance", label: "At a Glance", number: "002" },
  { id: "key-facts", label: "Key Facts", number: "003" },
  { id: "leadership-messages", label: "Messages", number: "004" },
  { id: "strategy", label: "Strategy", number: "005" },
  { id: "corporate-identity", label: "Identity", number: "006" },
  { id: "sustainability", label: "Sustainability", number: "007" },
  { id: "contact", label: "Contact", number: "008" },
] as const;

export const ANIMATION = {
  reveal: { duration: 0.7, ease: "power3.out" },
  revealFast: { duration: 0.4, ease: "power2.out" },
  revealSlow: { duration: 1.2, ease: "power3.out" },
  counter: { duration: 2.0, ease: "expo.out" },
  stagger: { tight: 0.05, normal: 0.15, loose: 0.25 },
  hover: { duration: 0.3, ease: "power1.inOut" },
} as const;
