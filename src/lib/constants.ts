export const COLORS = {
  gold: {
    DEFAULT: "#b88463",
    dark: "#b27e59",
    light: "#cfa77c",
  },
  navy: {
    DEFAULT: "#00132e",
    deep: "#000d33",
  },
  text: {
    primary: "#1b1b1b",
    secondary: "#343f48",
    muted: "#a2a9ac",
    dim: "#4e4e4e",
  },
  border: "#d9dcdd",
  white: "#ffffff",
  black: "#000000",
} as const;

export const GRADIENT_DARK =
  "linear-gradient(15deg, #000d33 0%, #00071c 25%, #000000 53%, #301d10 73%, #7e4d2c 109%, #9e6137 125%)";

export const SECTIONS = [
  { id: "hero", label: "Home", number: "001" },
  { id: "at-a-glance", label: "At a Glance", number: "002" },
  { id: "key-facts", label: "Key Facts", number: "003" },
  { id: "ceo-message", label: "CEO Message", number: "004" },
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
