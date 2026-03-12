# AJB Annual Report 2025 — Interactive Microsite

## Project Overview
This is an interactive microsite for Aljazira Bank's 2025 Annual Report, built with Next.js 16, React 19, Tailwind CSS v4, GSAP ScrollTrigger, and Lenis smooth scroll. The site is a single-page app with hash-based section navigation, deployed as a static export to GitHub Pages.

## Tech Stack
- **Framework**: Next.js 16.1.6 (static export via `output: 'export'`)
- **UI**: React 19.2.3, Tailwind CSS v4 (inline `@theme` block in globals.css, no tailwind.config.js)
- **Animations**: GSAP 3.14.2 + ScrollTrigger (pinned sections, reveals, counters)
- **Smooth Scroll**: Lenis
- **Font**: Tajawal (Google Fonts, weights 300-800, CSS var `--font-tajawal`)
- **Dev Server**: `npm run dev` on port 3000

## Brand Guidelines
All design decisions MUST follow the official Interbrand brand guidelines located in `resoruces/` folder:
- `251112_AJB_Guidelines_compressed_compressed.pdf` — Full brand guidelines (193 pages)
- `250910_AJB_color palette.pdf` — Official color palette
- `AJB aljazira bank key visual shapes OF CMYK.pdf` — Key visual shapes

### Official Brand Colors (from 251112_AJB_Guidelines pages 32-34 & 250910_AJB_color palette.pdf)

**Primary Colors** — Main colors for key visuals and background gradients:
| Name | HEX | RGB | Pantone |
|------|-----|-----|---------|
| Black | `#000000` | 0/0/0 | Black 6 C |
| Midnight Blue | `#001421` | 0/20/33 | 296 C |
| Dark Sand | `#8c684a` | 140/104/74 | 4635 C |
| Sand | `#b27f59` | 178/127/89 | 4645 C |
| Pearl | `#ffffff` | 255/255/255 | — |

**Secondary Colors** — For separating segments, social media backgrounds, charts and graphs:
| Name | HEX | RGB | Pantone |
|------|-----|-----|---------|
| Dark Silver | `#333f48` | 51/63/72 | 7546 C |
| Silver | `#6c7378` | 108/115/120 | 431 C |
| Light Silver | `#a2aaad` | 162/170/173 | 429 C |
| Dune | `#cda991` | 205/169/145 | 4665 C |
| Sky Blue | `#3E87D3` | 100/143/191 | 2143 C |

**Tertiary Colors** — UX use only (positive/negative alerts):
| Name | HEX | Pantone |
|------|-----|---------|
| Emerald | `#33B793` | 2413 C |
| Rust | `#DB3512` | 3516 C |

### Color Usage Rules (CRITICAL — from guidelines page 34)
- **Sand and Dark Sand must NEVER be used as background colors**
- Sand is ONLY for highlighting key words in headlines, NEVER full sentences
- Sand is NOT recommended for body copy over Pearl (readability affected)
- The brand gradient (Black → Midnight Blue) is the dominant color element
- Pearl and Sand are used for text on dark backgrounds
- Secondary colors may ONLY be used for: graphs/charts (excluding Emerald/Rust), social media backgrounds (Silvers and Sky Blue only)
- Emerald and Rust are ONLY for UX positive/negative alerts
- Allowed flat background colors: Black, Midnight Blue, Dark Silver, Silvers, Sky Blue, Dune
- Color distribution target: ~65% gradient/dark, ~10% Dark Sand, ~10% Sand, ~10% Pearl, ~5% other

### Typography Rules (from guidelines pages 37-42)
- **Only font**: Tajawal (sans-serif, Arabic/Latin)
- **Headline**: Light (300), Leading 115%
- **Sub-headline**: Medium (500), Leading 115%
- **Body**: Regular (400) + Bold (700), Leading 120%
- **Small body**: Medium (500) + Bold (700), Leading 120%
- **Sand color rule**: Sand (`#b27f59`) is ONLY for highlighting key words in headlines, NEVER full sentences. Not recommended for body copy over Pearl.
- Icons: displayed in Sand or Pearl depending on background color

## Audit & Progress
See `AUDIT-PLAN.md` for the full brand compliance audit plan with completed/pending items.

### Completed
- PART 1: Brand color audit — all CSS custom properties and 15+ component files updated to official brand colors
- PART 1B: Typography audit — headline weights (Light 300), sub-headline weights (Medium 500), Sand color misuse fixed (full sentences → Pearl white), body leading (120%), serif font removed from KeyFacts

### Remaining Work (from AUDIT-PLAN.md)
- Mobile navigation (currently hidden on < 1280px)
- WCAG contrast fixes (body text opacity too low)
- Layout improvements (portrait border-radius, strategy images, footer)
- Performance optimizations (image optimization, font preloading)

## Important Constraints
- **DO NOT change layout, animation, or scroll behavior** unless explicitly asked
- **DO NOT change GSAP ScrollTrigger pinning** or Lenis smooth scroll config
- All visual changes must follow the brand guidelines strictly
- The `content.ts` file does NOT have a `ceoMessage` key — it uses `leadershipMessages` (pre-existing type error in CeoMessage.tsx)

## Key File Locations
- `src/app/globals.css` — CSS custom properties (brand tokens)
- `src/lib/constants.ts` — COLORS object, SECTIONS array, ANIMATION config
- `src/lib/content.ts` — All text content
- `src/lib/fonts.ts` — Tajawal font declaration
- `src/components/sections/` — All page sections
- `src/components/layout/` — Navigation, Footer, SmoothScroll
- `src/components/ui/` — Reusable UI components (AnimatedCounter, FadeInView, etc.)
- `resoruces/` — Brand guideline PDFs (note: folder has typo in name)
