# AJB Annual Report 2025 — UI/UX Brand Compliance Audit & Redesign Plan

## Context
The AJB (Aljazira Bank) Annual Report 2025 interactive microsite needs to be audited against the official Interbrand brand guidelines and the Arabic Annual Report PDF design reference. The goal is to align the microsite with brand standards, then convert the final design to a Figma file.

**Brand reference files** (in `resoruces/` folder):
- `251112_AJB_Guidelines_compressed_compressed.pdf` — Full brand guidelines (193 pages)
- `250910_AJB_color palette.pdf` — Official color palette
- `AJB aljazira bank key visual shapes OF CMYK.pdf` — Key visual shapes
- `AJB Annual report 2025 - Arabic - Batch 1-compressed.pdf` — PDF design reference

---

## COMPLETED WORK

<details>
<summary>PART 1: Brand Color Audit — DONE (all CSS tokens + 15 component files updated)</summary>

All CSS custom properties and hardcoded hex values updated to official brand palette:
- `--color-gold` → Sand `#b27f59`
- `--color-gold-dark` → Dark Sand `#8c684a`
- `--color-gold-light` → Dune `#a39382`
- `--color-navy` → Midnight Blue `#001421`
- KeyFacts bg → Pearl `#ffffff`
- All card colors → brand tones

Files: `globals.css`, `constants.ts`, + 13 component files
</details>

<details>
<summary>PART 1B: Typography Audit — DONE (headline weights, leading, Sand color misuse, serif font)</summary>

- Headlines → `font-light` (300) across Hero, CorporateIdentity, Sustainability, EmailCta, Strategy
- Sub-headlines → `font-medium` (500) for Strategy tabs
- Quotes → `font-medium` in Pearl white (CeoMessage, LeadershipMessages)
- Sand color misuse fixed: full sentences → Pearl white (Sustainability counters, CorporateIdentity stats, KeyFacts numbers)
- Body leading → 120%
- Removed serif font (PP Cirka) from KeyFacts → Tajawal
</details>

<details>
<summary>PART 1C-extra: Typography Weight & Leading Audit — DONE</summary>

**Off-brand weights fixed (only 300/400/500/700 allowed):**
- CorporateIdentity stats: `font-black` (900) → `font-bold` (700)
- Sustainability metrics: `font-extrabold` (800) → `font-bold` (700)
- StatCard counters: `font-extrabold` (800) → `font-bold` (700)
- MarqueeBanner: `font-extrabold` (800) → `font-bold` (700)
- Footer watermark: `font-extrabold` (800) → `font-bold` (700)
- CorporateIdentity purpose label: `font-semibold` (600) → `font-medium` (500)
- LeadershipMessages role label: `font-semibold` (600) → `font-medium` (500)

**Headline weight fixes:**
- AtAGlance title: `font-bold` (700) → `font-light` (300)
- KeyFacts card labels: `font-bold` (700) → `font-medium` (500)

**Leading normalization (headlines→1.15, body→1.2):**
- Hero headline: `leading-[0.95]` → `leading-[1.15]`
- AtAGlance title: `leading-snug/leading-tight` → `leading-[1.15]`
- AtAGlance description: `leading-relaxed` → `leading-[1.2]`
- KeyFacts header: `leading-tight` → `leading-[1.15]`
- KeyFacts card labels: `leading-snug` → `leading-[1.15]`
- CeoMessage quote: `leading-relaxed` → `leading-[1.15]`
- CeoMessage body: `leading-relaxed` → `leading-[1.2]`
- LeadershipMessages quote: `leading-tight` → `leading-[1.15]`
- LeadershipMessages body: `leading-relaxed` → `leading-[1.2]`
- CorporateIdentity description: `leading-relaxed` → `leading-[1.2]`
- Strategy subtitle: `leading-tight` → `leading-[1.15]`
- Strategy item desc: `leading-relaxed` → `leading-[1.2]`
- Strategy fallback desc: `leading-relaxed` → `leading-[1.2]`
- Sustainability description: added `leading-[1.2]`
- EmailCta description: added `leading-[1.2]`
- StatCard label: `leading-relaxed` → `leading-[1.2]`
</details>

---

## PHASE 1: UI & BRAND ALIGNMENT (Figma-Ready)

> These items directly affect visual design and must be resolved before Figma conversion.

### 1A. Section Backgrounds & Color Consistency

| # | Section | Issue | Expected (per brand/PDF) | Status |
|---|---------|-------|--------------------------|--------|
| ~~1~~ | ~~Strategy~~ | ~~Background `#CCA991` not official brand color~~ | ~~Already fixed to Sand `#b27f59` in Part 1~~ | DONE (was already fixed) |
| ~~2~~ | ~~EmailCta~~ | ~~Plain black background — no brand identity~~ | ~~Already has Midnight Blue gradient + key visual shapes~~ | DONE (was already fixed) |
| ~~3~~ | ~~CorporateIdentity~~ | ~~Relies on bg image (`corporate-map.png`) with no color fallback~~ | ~~Add Midnight Blue `#001421` as fallback `backgroundColor`~~ | DONE |
| ~~4~~ | ~~Sustainability~~ | ~~Gradient nearly identical to LeadershipMessages — lacks visual distinction~~ | ~~Changed to `195deg` with Black → Midnight Blue → Slate palette~~ | DONE |

### 1B. WCAG Contrast Fixes — DONE

| # | Section | Issue | Fix | Status |
|---|---------|-------|-----|--------|
| ~~5~~ | ~~CorporateIdentity~~ | ~~Description text at `rgba(255,255,255,0.45)`~~ | Already `0.65` (~8.5:1 contrast) — passes WCAG AA | DONE (was OK) |
| ~~6~~ | ~~CorporateIdentity~~ | ~~Stats text at same low contrast~~ | Already `0.65` — passes | DONE (was OK) |
| ~~7~~ | ~~AtAGlance~~ | ~~Text reveal starts at `rgba(255,255,255,0.25)`~~ | Increased to `0.35` (animated to white, so transient) | DONE |
| ~~8~~ | ~~Global~~ | ~~Multiple elements at `rgba(255,255,255,0.3)`~~ | Audited all: Footer `0.3→0.55`, Leadership tabs `0.3→0.5`, Leadership counter `0.3→0.55`, CeoMessage body `0.5→0.65`, CeoMessage placeholder `0.3→0.55`, Sustainability tabs `0.4→0.5`, Strategy inactive tabs `0.3→0.45` | DONE |

### 1C. Hero Section Visual Fixes — DONE

| # | Issue | Expected (per PDF) | Status |
|---|-------|---------------------|--------|
| ~~9~~ | ~~Generic gradient overlay obscures background~~ | ~~Clean architectural photography with minimal overlay~~ | ~~DONE — reduced overlay opacity from 0.4 → 0.25~~ |
| ~~10~~ | ~~"/ ABOUT US" label feels generic~~ | ~~PDF uses "Annual Report 2025" branding~~ | ~~DONE (was already "/ Annual Report 2025")~~ |
| ~~11~~ | ~~Key visual shapes — reviewed positioning~~ | ~~Kept original `shapes.png` raster, reduced overlay opacity~~ | ~~DONE~~ |

### 1D. Leadership Messages Visual Fixes — DONE

| # | Issue | Expected (per PDF) | Status |
|---|-------|---------------------|--------|
| ~~12~~ | ~~Portrait images have `rounded-3xl` (24px radius)~~ | ~~PDF portraits are rectangular — NO border radius~~ | ~~DONE — removed `rounded-3xl` from CeoMessage portrait (LeadershipMessages was already rectangular)~~ |
| ~~13~~ | ~~`vector.png` overlay on portraits feels cluttered~~ | ~~Remove or simplify~~ | ~~DONE — removed empty vector div and its GSAP animation entirely~~ |
| ~~14~~ | ~~Image gradient overlay too dark (`rgba(0,0,0,0.4)`)~~ | ~~Reduce to subtle gradient~~ | ~~DONE — reduced to `rgba(0,0,0,0.25)` bottom / `rgba(0,0,0,0.08)` top~~ |
| ~~15~~ | ~~Complex gradient backgrounds (3 different per card)~~ | ~~PDF uses simple dark layout~~ | ~~DONE — unified all 3 cards to consistent Midnight Blue → Black gradient~~ |

### 1E. Strategy Section Visual Fixes — DONE

| # | Issue | Expected | Status |
|---|-------|----------|--------|
| ~~16~~ | ~~Strategy images (`focus-1.png`, `focus-2.png`) defined in content.ts but never rendered~~ | ~~Render in StrategyPanel~~ | ~~DONE — added right-side image column in StrategyPanel using Next.js Image~~ |
| ~~17~~ | ~~Arrow SVG stroke hardcoded `stroke-black`~~ | ~~Use brand color~~ | ~~DONE — changed to Dark Sand `#8c684a`~~ |
| ~~18~~ | ~~Background image `strategy-bg.png` may clash with text readability~~ | ~~Review and adjust~~ | ~~DONE — added subtle Sand overlay `rgba(178,127,89,0.15)` + z-index layering~~ |

### 1F. Other Section Visual Fixes — DONE

| # | Section | Issue | Fix | Status |
|---|---------|-------|-----|--------|
| ~~19~~ | ~~AtAGlance~~ | ~~Title is ALL CAPS~~ | ~~Removed `uppercase` class — now title case~~ | ~~DONE~~ |
| ~~20~~ | ~~KeyFacts~~ | ~~Image (`keyfact.png`) has awkward scale/translate offsets~~ | ~~Removed `scale-[1.2] origin-left -translate-x-2` — clean `object-cover`~~ | ~~DONE~~ |
| ~~21~~ | ~~Sustainability~~ | ~~Metric cards `border-white/10` barely visible~~ | ~~Increased to `border-white/20`~~ | ~~DONE~~ |
| ~~22~~ | ~~Sustainability~~ | ~~Tab UI identical to Leadership Messages~~ | ~~Changed to pill-style tabs with Sand accent border~~ | ~~DONE~~ |

### 1G. Footer & Navigation Brand Alignment — DONE

| # | Section | Issue | Fix | Status |
|---|---------|-------|-----|--------|
| ~~23~~ | ~~Footer~~ | ~~No official logo~~ | ~~Added `ajb-logo-new.png` centered above links~~ | ~~DONE~~ |
| ~~24~~ | ~~Footer~~ | ~~"ajb" watermark at 3% opacity — invisible~~ | ~~Increased from `0.03` → `0.06`~~ | ~~DONE~~ |
| ~~25~~ | ~~Footer~~ | ~~Missing regulatory disclaimers, Saudi Central Bank reference~~ | ~~Added SAMA regulatory note + CR number~~ | ~~DONE~~ |
| ~~26~~ | ~~Navigation~~ | ~~No top header bar~~ | ~~Reviewed — Hero already has logo; side nav is the chosen UX pattern for this microsite~~ | ~~DONE (by design)~~ |
| ~~27~~ | ~~EmailCta~~ | ~~Section marker "008" / "Contact" mislabeled~~ | ~~Changed label to "Get the Report"~~ | ~~DONE~~ |

### 1H. Brand Decorative Elements — DONE

| # | Issue | Expected | Status |
|---|-------|----------|--------|
| ~~28~~ | ~~No key visual shapes used as decorative elements~~ | ~~Add across sections per brand guidelines~~ | ~~DONE — added `KeyVisualShape` to CorporateIdentity (single/outline) and Sustainability (columns/outline). EmailCta already had shapes.~~ |
| ~~29~~ | ~~No desert/sand imagery in AtAGlance~~ | ~~PDF page 3 has stunning desert/sand dune image~~ | ~~DONE — section already uses `glance-bg-new.png` with golden abstract aesthetic~~ |
| ~~30~~ | ~~EmailCta has no decorative elements~~ | ~~Add brand patterns or shapes~~ | ~~DONE (was already fixed) — has `KeyVisualShape` single + columns + radial glow~~ |

---

## PHASE 2: FUNCTIONAL & UX FIXES

> These items affect functionality/interaction but are less critical for Figma conversion.

### 2A. Mobile Navigation (P0)

| # | Issue | Fix |
|---|-------|-----|
| 31 | No mobile nav — `max-xl:hidden` hides on < 1280px | Add hamburger menu / bottom nav |
| 32 | No keyboard accessibility on mobile | Comes with mobile nav implementation |
| 33 | Active section detection (`isLight`) only checks two sections | Expand detection logic |

### 2B. Accessibility

| # | Issue |
|---|-------|
| 34 | No skip-to-content link |
| 35 | Animated counters start at "0" — screen readers see "0" until animation fires |
| 36 | No `aria-live` regions for dynamic content changes |

### 2C. Performance

| # | Issue |
|---|-------|
| 37 | Hero bg uses CSS `url()` — not optimized |
| 38 | Logo uses `<img>` instead of Next.js `<Image>` |
| 39 | No font preloading for Tajawal |
| 40 | Multiple GSAP ScrollTrigger pins create heavy computation |

### 2D. Content & Interaction

| # | Issue |
|---|-------|
| 41 | Footer links all point to "#" |
| 42 | Email form has no backend — just shows success message |
| 43 | No PDF download link for actual annual report |
| 44 | No Arabic language toggle |
| 45 | Horizontal scroll in Leadership unintuitive — no swipe hints on mobile |

---

## PHASE 3: SCROLL/ANIMATION REVIEW (DO NOT CHANGE WITHOUT EXPLICIT ASK)

> Per CLAUDE.md: DO NOT change layout, animation, GSAP ScrollTrigger pinning, or Lenis smooth scroll unless explicitly asked.

| # | Issue | Note |
|---|-------|------|
| 46 | 4 pinned sections create jarring scroll experience | Needs explicit user approval |
| 47 | Combined pin duration = 5-6x viewport heights of stuck scrolling | Needs explicit user approval |
| 48 | No scroll progress indicator on mobile | Can add without changing scroll behavior |

---

## Official Brand Colors Reference

| Name | HEX | Role |
|------|-----|------|
| **Black** | `#000000` | Primary - key visual/gradient |
| **Midnight Blue** | `#001421` | Primary - key visual/gradient |
| **Dark Sand** | `#8c684a` | Primary - key visual/gradient |
| **Sand** | `#b27f59` | Primary - key visual/gradient |
| **Pearl** | `#ffffff` | Primary |
| Dune | `#a39382` | Secondary - segments/charts |
| Slate | `#425563` | Secondary - segments/charts |
| Grey | `#5b6770` | Secondary - charts |
| Grey Light | `#a2aaad` | Secondary - charts |

## Typography Reference

| Style | Weight | Leading |
|-------|--------|---------|
| Headline | Light (300) | 115% |
| Sub-headline | Medium (500) | 115% |
| Body | Regular (400) + Bold (700) | 120% |
| Small body | Medium (500) + Bold (700) | 120% |

**Sand color rule**: ONLY for highlighting key words in headlines. Never full sentences. Not recommended for body copy over Pearl.

---

## FILES MODIFIED (Previous Work)

| File | Changes | Status |
|------|---------|--------|
| `src/app/globals.css` | CSS custom properties → brand colors | DONE |
| `src/lib/constants.ts` | COLORS object → brand values | DONE |
| `Hero.tsx` | Gradient, headline weight, body leading | DONE |
| `KeyFacts.tsx` | Placeholder text, colors, font, bg | DONE |
| `LeadershipMessages.tsx` | Quote weight & color | DONE |
| `CeoMessage.tsx` | Quote weight & color | DONE |
| `Strategy.tsx` | Heading weight, tab nav weight | DONE |
| `CorporateIdentity.tsx` | Heading weight, stat color | DONE |
| `Sustainability.tsx` | Heading weight, counter color | DONE |
| `EmailCta.tsx` | Heading weight | DONE |
| `MarqueeBanner.tsx`, `Navigation.tsx`, `Footer.tsx`, `Marquee.tsx`, `SectionMarker.tsx`, `StatCard.tsx` | Brand colors | DONE |
