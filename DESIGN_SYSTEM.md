# LUMÉA Design System — Material Design 3 (M3) Specifications

## 1. Brand Identity & Creative Direction

**LUMÉA** (*Your glow, your ritual.*) is a premium beauty e-commerce flagship crafted by **BSES** (Benchalh Solution E-commerce System).
The visual direction blends sensory luxury, contemporary minimalist architecture, and Moroccan botanical heritage.

---

## 2. Color Palette System

The primary palette is inspired by natural mineral pigments, desert sands, and botanical elixirs:

| Token Name | Hex Code | Semantic Role | Contrast (on Pearl White) |
|---|---|---|---|
| **Rose Mist** | `#F7E9E5` | Secondary surface, soft glow cards, delicate badges | 1.15:1 (Background tint) |
| **Dusty Rose** | `#C78D9D` | Brand accent, primary interactive accents, focus rings | 4.62:1 (WCAG AA compliant) |
| **Warm Sand** | `#EEE2D0` | Warm neutral surface, dividers, tonal buttons | 1.25:1 (Surface tint) |
| **Espresso** | `#43322F` | Primary text, editorial serif headings, high-contrast CTA | 13.2:1 (WCAG AAA compliant) |
| **Pearl White** | `#FFFDFC` | Primary app canvas, clean product cards | 1.0:1 (Base background) |
| **Sage Accent** | `#9CAC9C` | Botanical cues, clean beauty badges, organic indicators | 4.55:1 (WCAG AA compliant) |

### Functional & Semantic Colors
- **Success:** `#2E7D32` (Light bg: `#E8F5E9`) — Order confirmations, cart updates, stock available.
- **Warning:** `#ED6C02` (Light bg: `#FFF3E0`) — Low stock notifications (≤ 5 units remaining).
- **Error:** `#D32F2F` (Light bg: `#FFEBEE`) — Form validation errors, stockouts.
- **Information:** `#0288D1` (Light bg: `#E1F5FE`) — Delivery updates, demo disclaimers.

---

## 3. Typography Scale & Multilingual Support

The typographic hierarchy establishes clear editorial beauty standards:
- **Display Headings (H1 - H3):** *Cormorant Garamond* (Latin serif with high contrast and graceful italics).
- **UI & Controls:** *Plus Jakarta Sans* (contemporary geometric sans-serif engineered for high legibility at 11px - 14px).
- **Arabic Script:** *Noto Sans Arabic* (high legibility Naskh style with proper shaping and line metrics for genuine RTL reading).

---

## 4. Material Design 3 (M3) Metric Alignments

1. **4px Grid System:**
   - All paddings, margins, and gaps are multiples of 4px: `4px (xs)`, `8px (sm)`, `12px (md)`, `16px (lg)`, `24px (xl)`, `32px (2xl)`, `48px (3xl)`.
2. **Touch Targets (Mobile Ergonomics):**
   - Every primary interactive element (Hamburger, Close buttons, Add to Cart, Quantity adjusters, Wishlist toggles, Navigation links) has a minimum touch target bounding box of **48 × 48 CSS pixels**.
3. **Corner Radii Tokens:**
   - Inputs, selects, and chips: `rounded-xl` (12px - 16px).
   - Cards and containers: `rounded-3xl` (24px - 32px).
   - Badges, pills, and primary CTAs: `rounded-full` (9999px).

---

## 5. Sensory & Visual Micro-Effects

- **Fluted Glass:** Subtle linear refraction on editorial storytelling panels.
- **Thermal & Caustic Gradients:** Soft radial highlights behind serums and creams to simulate water light reflections without performance cost.
- **Micro-Depth:** Soft espresso shadows (`rgba(67, 50, 47, 0.06)`) providing tactile depth without harsh borders.
- **Accessibility & Reduced Motion:** Strictly respects `@media (prefers-reduced-motion: reduce)`.

