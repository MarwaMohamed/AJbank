# Figma Make Prompt — AJB Annual Report 2025 Full Page

## How to Use
Copy everything below the "---" line and paste it into Figma Make. For best results, break it into sections — paste one section at a time if Figma Make struggles with the full prompt length.

## Best Approach for Cloning to Figma Make

1. **Section-by-section**: Paste each section individually as a separate Figma Make generation, then assemble them in one page. This gives Claude Opus more room to nail each section's details.
2. **Upload screenshots**: Take a full-page screenshot of each section from your running dev server (localhost:3000) and attach it to each Figma Make prompt as visual reference — Claude Opus will match the design much more accurately with an image.
3. **Upload brand assets**: Upload your logo (ajb-logo-new.png), mask-group.svg, and portrait images to Figma first, then reference them in the prompt so Figma Make can use the actual assets.

---

Design a full single-page interactive microsite for "Aljazira Bank Annual Report 2025" at 1440px desktop width. The site scrolls vertically through 8 sections. Use the font **Tajawal** throughout. The brand palette is: Black #000000, Midnight Blue #001421, Dark Sand #8c684a, Sand #b27f59, Pearl #ffffff, Dark Silver #333f48, Silver #6c7378, Light Silver #a2aaad, Dune #cda991. Sand is ONLY for accents and highlighted keywords — never as background. The dominant visual is dark gradients (Black ↔ Midnight Blue).

---

### SECTION 1 — HERO (full viewport height)

**Background:** Black base with a full-bleed photographic background image, slightly zoomed (scale 1.15). A rounded-corner mask (inset 12% on all sides with border-radius 24px) crops the background creating a framed effect.

**Layout:**
- Top-left: Bank logo (white, ~60px height), 32px from edges
- Center-left (40% width): Main headline in two lines:
  - Line 1: "Wealth" in Sand #b27f59, 102px, font-weight 300
  - Line 2: "Grows Here." in Pearl white, 102px, font-weight 300
  - Line-height: 115%
- Below headline (16px gap): Small label "/ Annual Report 2025" — 12px, bold, uppercase, white, tracking wide
- Below label (16px gap): Description text "Aljazira Bank is a Saudi Joint Stock Company and a full-service bank delivering an integrated suite of banking solutions — corporate, retail, SME, treasury — anchored in Shariah-compliant principles." — 14px, white 75% opacity, max-width 420px, leading 120%
- Right side (50%): Large decorative angular brand shapes image — geometric gold/sand line art on transparent background, positioned right-aligned, vertically centered
- Bottom center: Scroll indicator — small downward chevron icon with text "Scroll to explore" in 11px white 50%, with a subtle pulsing animation

**Interactions:**
- On page load: Logo drops in from above (0.6s), headline lines slide up sequentially with stagger (0.9s each, 0.15s delay between), sub-content fades up (0.7s), shapes scale up from below (1.1s)
- On scroll: Background mask expands to full bleed (removes inset), image scales from 1.15→1, headline fades up and scales down slightly, scroll indicator fades out

---

### SECTION 2 — AT A GLANCE (full viewport height, pinned during scroll)

**Background:** Full-bleed dark atmospheric photographic background with dark radial gradient overlays for readability.

**Layout:**
- Top-left: Section marker "002 — At a Glance" (12px, medium, uppercase, white 40% opacity, tracking wide)
- Center: Large headline text "2025 marked an advanced stage of disciplined execution" — 56px, font-weight 300, white, leading 115%, centered, max-width 900px
- Below headline (24px gap): Description "where improvements in financial and operational performance aligned with accelerated digital transformation, enhanced asset quality, and a broader institutional impact." — 20px, white 65%, leading 120%, centered

**Interactions:**
- Section pins (stays fixed) while the user scrolls
- Headline words reveal one-by-one during scroll: each word starts as dim gray (white 20% opacity) and transitions to full white as the user scrolls, creating a progressive reading effect
- After all words revealed, description fades up from below
- Section unpins after full reveal

---

### SECTION 3 — KEY FACTS (white background)

**Background:** Pearl white #ffffff

**Layout:**
- Top: Section marker "003 — Key Facts" in dark variant (Midnight Blue 40% opacity)
- Below: Responsive grid of 6 metric cards in 3 columns, with varied card sizes creating visual rhythm:

**Card grid arrangement (3 columns):**
- Col 1: "Digital Growth" card (dark bg #001421, tall) + "SME Growth" card (Dune bg #cda991)
- Col 2: Photo card (full image) + "Digital Accounts" card (dark bg)
- Col 3: "Net Profit" card (Dark Silver bg #333f48) + "Deposits Growth" card (dark bg) + "NPL Ratio" card (dark bg)

**Each metric card contains:**
- Large animated number (80-130px, bold, tabular-nums) that counts up from 0 on scroll
- Prefix (e.g. "SAR ") in lighter weight
- Suffix (e.g. "B", "%", "M+") in smaller size, 50% opacity
- Label text (14px, medium weight) below the number
- Some cards have mini visualizations: bar charts, ring circles, progress bars
- "Download Report" button on select cards: rounded-full pill, bordered, with download icon

**Metric values:**
1. +40% Annual retail digital account openings (dark bg)
2. 10X Cumulative 3-year growth (dark bg)
3. 223% SME digital onboarding growth (Dune bg)
4. SAR 165.9B Total assets (dark bg)
5. 22% Net profit growth (Dark Silver bg)
6. 1.03% NPL ratio (dark bg)

**Colors:** Dark cards have white text. Dune card has Midnight Blue text. All numbers are bold.

**Interactions:**
- Cards stagger in from below as user scrolls into view (0.8s each, 0.1s stagger between cards)
- Numbers animate/count up from 0 to target value (2s, exponential ease-out) when card enters viewport

---

### SECTION 4 — LEADERSHIP MESSAGES (full viewport, horizontal scroll)

**Background:** Dynamic gradient that crossfades between 3 states:
1. Chairman: 145deg gradient #001421 → #000d1a → #000000
2. CEO: 215deg gradient #000000 → #001421 → #0a1e2d
3. CFO: 170deg gradient #000000 → #000a14 → #001421

**Layout — 3 horizontal panels, each full viewport width:**
- Fixed top bar: Section marker "004 — Leadership Messages" (white 90%) + 3 tab buttons (Chairman, CEO, CFO) — 12px, uppercase, tracking 0.15em
- Active tab: Dune #cda991 color with 2px underline. Inactive: white 50%

**Each panel (side-by-side, horizontal scroll):**
- Left column (55%): Role label (12px, uppercase, Sand 60%, tracking 0.25em), blockquote (36px, medium, white 85%, leading 115%, with opening quotation mark), body paragraph (15px, white 65%, leading 120%), name (14px, bold, white), title (12px, Sand 70%)
- Right column (45%): Portrait photo in aspect-ratio 3:4, width 350px, with dark gradient overlay at top and bottom edges for blending

**Bottom center:** Progress indicator — 3 pill dots (active = 32px wide, inactive = 8px), counter "01 / 03"

**Card 1 — Chairman:** Faisal Hamad Almansour. Quote: "The Board's strategic oversight has guided the Bank through a transformative era..."
**Card 2 — CEO:** Hamad Abdulaziz AlEsa. Quote: "This theme reflects the Bank's decisive transition from building foundations..."
**Card 3 — CFO:** Hani Mohammed Araki. Quote: "Our financial results reflect the maturity of our strategy — with net profit growing 22%..."

**Interactions:**
- Section pins while user scrolls horizontally through 3 cards
- Background gradient crossfades smoothly (0.6s) as cards transition
- Portrait images scale from 1.2→1 as they enter view
- Text elements stagger in from below (0.9s, 0.15s stagger)
- Clicking tab buttons scrolls to corresponding card
- Progress dots update with active card

---

### SECTION 5 — STRATEGY (light background, horizontal scroll)

**Background:** Warm light gradient — linear-gradient 180deg: #f5f0eb → #ede6df → #f5f0eb. Subtle decorative brand mask shape SVG on right side (opacity 6%). Thin sand-gradient vertical line on left edge.

**Layout — 2 horizontal panels (tab-based):**
- Top: Section marker "005 — Strategy" (dark variant)
- Tab bar: 2 tabs — "Our Strategy" and "Bank Focus 2025" — 12px, uppercase, tracking 0.35em. Active: Dark Sand #8c684a with 4px bottom underline. Inactive: rgba(0,20,33,0.4)

**Panel 1 — "Our Strategy":**
- Left column: Subtitle "The One Bank Approach" (40px, light 300, #001421), long description paragraph about unified operating model (15px, rgba(0,20,33,0.6), leading 120%)
- Right column (desktop): Image with brand key visual angular clip-path mask (wavy/angular left edge)

**Panel 2 — "Bank Focus 2025":**
- Subtitle: "Key Strategic Initiatives" (40px, light 300, #001421)
- Radial hub diagram: Center circle (black, 90px) with bank logo, 5 bent leader lines radiating outward (diagonal from center then horizontal arm). At each arm endpoint, bold heading + description text. Thin decorative fan lines between spokes (Dune #cda991, opacity 20%).
- 5 strategic items:
  1. "Launching the New Identity" — top-left
  2. "Digital-Led Growth" — top-right
  3. "SME & Corporate Empowerment" — mid-right
  4. "Value Realization" — bottom-left
  5. "Operational Resilience" — bottom-right

**Interactions:**
- Section pins while scrolling horizontally between 2 panels
- Tab underline indicator updates based on scroll position
- Clicking tabs scrolls to corresponding panel
- Hub diagram animates in 3 phases: center hub scales in (0.5s, bouncy overshoot), spokes draw outward (1.2s, staggered), decorative lines draw (0.8s), labels fade up (0.5s, staggered)

---

### SECTION 6 — CORPORATE IDENTITY (dark background)

**Background:** Midnight Blue #001421 with corporate map background image. Decorative key visual shape outline in top-right (opacity 6%).

**Layout:**
- Section marker "006 — Corporate Identity" (light variant, white 90%)
- Vertical sand-colored decorative line (80px, #b27f59) — animates scaleY 0→1 on scroll
- Title: "A Mature Corporate Identity" (36px, light 300, white)
- Description paragraph (18px, white 65%, leading 120%)
- Purpose statement: Label "Our Purpose" (12px, uppercase, Sand #b27f59), text "Enriching Lives through Financial Wellbeing"
- Stats grid (3 columns on desktop, 2 on mobile), 6 stats:
  - 2,328 Employees
  - 73 Branches across the Kingdom
  - 565 ATMs
  - 24 Remittance centers
  - 72 Media platforms coverage
  - 18M+ Audience reached
- Each stat: Large number (64-96px, bold, white, tabular-nums) + label (14px, white 65%)

**Interactions:**
- Vertical line animates scaleY from 0 to 1 (1.2s) when section enters view
- All content fades up with staggered delays
- Numbers count up from 0 (2s, exponential ease-out)

---

### SECTION 7 — SUSTAINABILITY (light background)

**Background:** Warm light gradient — same as Strategy. Two decorative brand mask SVG shapes: left-bottom (opacity 5%), right-top mirrored (opacity 4%).

**Layout:**
- Section marker "007 — Sustainability"
- Title: "Sustainability & Social Responsibility" (48px, light 300, #001421)
- Description (18px, rgba(0,20,33,0.6), max-width 672px)
- 3-column grid (stacked on mobile):

**Column 1 — Environment:** Heading "Environment" (18px, medium, #001421). Two metric cards stacked — each has: thin 2px x 64px sand accent line (#B98666), large number (36px, bold, #001421), label (14px, rgba(0,20,33,0.6)). Metrics: "SAR 3.2B" Green financing, "10M+" Documents automated.

**Column 2 — Society:** Heading "Society". Four metric cards: "130+" Social initiatives, "27,800+" Individuals benefited, "15,000+" Productive families, "3,200+" Youth empowered.

**Column 3 — Governance:** Heading "Governance". Five certification items — each is a row: 40x40px rounded icon (sand-tinted bg, dark sand line-art icon) + certification name (14px, medium). Items: ISO 9001 (shield), ISO 14001 (leaf), ISO 45001 (person+shield), PCI DSS v4.0 (lock), Certified Innovative Organization (lightbulb).

**Interactions:**
- Columns stagger in from below (0.1s, 0.2s, 0.3s delays)
- Metric numbers count up from 0 (2s, exponential ease-out)

---

### SECTION 8 — EMAIL CTA (dark background)

**Background:** Dark gradient — 165deg: #001421 → #000e18 → #000000 → #0a0805. Decorative key visual shapes: outline variant right side (opacity 8%), columns variant left-bottom rotated (opacity 5%). Subtle radial sand glow behind content (opacity 6%).

**Layout — centered:**
- Section marker "008 — Get the Report" (light variant)
- Title: "Get the Full Report" (36px, light 300, white)
- Description: "Enter your email to receive the complete Annual Report 2025." (18px, white 65%)
- Email form: Input field (rounded-full, semi-transparent white bg, white text, white 10% border, placeholder "Your email address" in white 30%) + "Send" button (rounded-full, Sand bg #b27f59, white text, 14px bold)
- On submit: Success state — checkmark icon + "Thank you! Check your inbox." in Sand #b27f59

**Interactions:**
- Input focus: border transitions to Sand #b27f59, subtle sand glow shadow
- Button hover: brightness increases 10%
- On submit: Form fades out, success message fades in

---

### FOOTER (dark gradient)

**Background:** Gradient 165deg #001421 → #8c684a. Large watermark "ajb" text (200px, opacity 6%) behind content.

**Layout — centered:**
- Logo (white, 48px height)
- 3 links: "Privacy Policy", "Terms of Use", "Investor Relations" (14px, white 50%, hover → Sand #b27f59 with underline animation left→right)
- Regulatory text (12px, white 40%, centered, leading 120%): "Aljazira Bank is a Saudi Joint Stock Company, regulated by the Saudi Central Bank (SAMA). Commercial Registration No. 4030010523."
- Copyright: "© 2025 Aljazira Bank. All rights reserved." (12px, white 55%)

---

### FIXED NAVIGATION (left sidebar, desktop only)

- Fixed vertical dot navigation on left edge of viewport
- Vertical progress line that fills as user scrolls (thin, Sand colored)
- 8 dot items stacked vertically (one per section):
  - Each: small dot (4px, expands to 6px when active) + section number + label
  - Active: Sand #b27f59 color with glow
  - Inactive: white 20% (on dark sections) or black 20% (on light sections)
  - Labels collapse to hidden on scroll, expand on hover
- Clicking a dot smooth-scrolls to that section

---

### GLOBAL DESIGN RULES
- Font: Tajawal only. Headlines: weight 300 (Light). Sub-headlines: weight 500 (Medium). Body: weight 400 + 700.
- All headline leading: 115%. All body leading: 120%.
- Sand #b27f59 is ONLY for accent keywords, icons, active states — NEVER as background
- Transitions: use ease-out for entrances, ease-in for exits, ease-in-out for repositioning
- All scroll-triggered animations fire once (don't replay)
- Custom scrollbar: 4px wide, Sand thumb, transparent track
- Text selection: Sand background, white text
