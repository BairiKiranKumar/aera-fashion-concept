# AERA — DESIGN SYSTEM & ART DIRECTION SPECIFICATION

## 1. Brand Identity & Positioning
- **Brand Name**: AERA
- **Tagline**: The New Form / Designed for Movement. Made for Everything After.
- **Positioning**: Contemporary premium apparel label focused on refined essentials, modern silhouettes, and quiet confidence.
- **Aesthetic Benchmark**: The restraint, composition, and craftsmanship of COS, Totême, Massimo Dutti, Fear of God Essentials, and high-fashion campaign editorials.
- **Core Principle**: Fashion Campaign + Editorial Magazine + High-Conversion Commerce. Usability and commerce clarity are paramount; visual tension is created via typography, framing, scale, and negative space rather than decorative gimmicks.

---

## 2. Liveliness Dials
- **ENERGY: 2 / 5** (Understated, quiet confidence, spacious, sophisticated neutral tones).
- **RHYTHM: 3 / 5** (Deliberate tempo variation: cinematic hero -> spacious editorial statement -> quiet product grid -> full-bleed campaign moment -> tactile storytelling).
- **MOTION: 2 / 5** (Restrained, purposeful micro-interactions, subtle image scale settle, elegant clip reveals, no spring bounces, strict `prefers-reduced-motion` compliance).

---

## 3. Color Architecture
All colors serve clear hierarchy functions:
- **Warm Off White (`#F5F2EC`)**: Primary atmospheric ground. Provides tactile warmth and editorial paper feel instead of harsh clinical `#FFFFFF`.
- **Black (`#0A0A0A`)**: Primary ink, dominant display headlines, deep grounding frames.
- **Charcoal (`#242424`)**: Secondary typography, subtle borders, high-contrast utility controls.
- **Soft Grey (`#D8D5CF`)**: Structural dividing lines, muted badges, neutral hover fills.
- **Muted Stone (`#B9B1A6`)**: Secondary metadata, inactive states, architectural warm tint.
- **Campaign Accent - Deep Oxide / Burgundy (`#5A201C`)**: Used with extreme discipline (under 3% total surface area): select tag accents, focus states, or collection marks.

---

## 4. Typography System
- **Display / Editorial**: `Instrument Serif` (Google Fonts, italic and normal weights).
  - Used for large oversized headlines, campaign phrases, editorial intros, and brand statements.
  - Carries the fashion campaign feeling and editorial sophistication.
- **Interface / Commerce**: `Inter` (Google Fonts, weights 300, 400, 500, 600).
  - Used for navigation, product details, prices, buttons, utility tags, specifications, and cart operations.
  - Clean, neutral, high-legibility sans-serif.
- **Typographic Rules**:
  - Oversized display headlines with tight tracking and calibrated line-heights.
  - Uppercase micro-labels with `0.1em` to `0.2em` tracking (`tracking-wider` / `tracking-widest`).
  - Strict prohibition of em dashes (`—`) in agent copy per R-02; punctuation relies on colons, commas, periods, or balanced typography.
  - Zero gradient text, zero generic bolding.

---

## 5. Layout & Spacing Rhythm
- **Container Max-Width**: `1440px` for desktop hero and content; `1600px` for select full-width campaign sections.
- **Grid Structure**:
  - Desktop (1440px): 12-column baseline, 4-column product grid, asymmetric editorial layouts.
  - Tablet (768px-1024px): 2 to 3-column product grids, compact navigation.
  - Mobile (360px-390px): 2-column compact product grid, full-screen bespoke menu sheet, 44px+ tap targets, zero horizontal overflow.
- **Card Philosophy**:
  - No drop shadows.
  - No rounded pill boxes on product cards.
  - No boxed card borders that look like SaaS dashboards.
  - Products float naturally directly on the warm off-white canvas with crisp editorial framing.

---

## 6. Photography & Asset Direction
- Tactile studio lighting, textured concrete, warm plaster, architectural daylight.
- Cohesive seasonal palette: bone, chalk, charcoal, deep olive, washed black, camel.
- High-res campaign framing with genuine garment drapery and natural posture.
- Dual imagery on product cards: Primary on-figure shot + Secondary styled garment detail on hover/touch.

---

## 7. Interactive Philosophy
- Instant responsive feedback on touch and hover.
- Fast cart slide-in drawer with clear subtotal and frictionless checkout action.
- Accessible dialogs, keyboard navigation (`Escape` closing, logical `Tab` indexing, visible focus indicators).
- Real commerce state management (cart count, item addition, size selection, filter drawer).
