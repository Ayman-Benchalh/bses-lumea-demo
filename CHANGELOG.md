# CHANGELOG — LUMÉA

All notable changes to this project will be documented in this file.

## [1.1.0] — 2026-11-21

### UI/UX Refinement & Responsive Perfection (Design Polish)

#### Desktop Header
- Re-architected desktop header into a balanced 3-zone layout (Zone 1: Left Brand Wordmark + Tagline, Zone 2: Center Navigation with `whitespace-nowrap`, Zone 3: Right Actions with standardized touch targets and discreet Admin CTA).
- Switched desktop navigation breakpoint to `xl:flex` (1280px+) with `xl:hidden` for mobile drawer to eliminate text wrapping on 1024px–1279px screens.

#### Responsive & Mobile Perfection
- Solved 320px micro-viewport horizontal overflow (`scrollWidth == clientWidth == 320px`).
- Wrapped hero ambient blur elements in `<div className="absolute inset-0 overflow-hidden pointer-events-none">`.
- Added body scroll locking (`overflow: hidden`) and Escape key listeners to Cart Drawer, Catalog Mobile Filter Drawer, and Admin Modals.
- Implemented responsive management cards for Admin Console on mobile screens (<768px), preventing table squishing.
- Aligned product card titles (`min-h-[2.8rem]`) and subtitles (`min-h-[2.25rem]`) across all catalog grids.

#### Verification & Quality Assurance
- Automated Playwright suite expanded to 12 tests, achieving 100% PASS rate.
- Docker multi-stage standalone container rebuilt and verified healthy on port 3102.
- Created `UI_UX_AUDIT.md`, `RESPONSIVE_AUDIT.md`, and `VISUAL_REGRESSION_REPORT.md`.

## [1.0.0] — 2026-11-20

### Initial Release — BSES Flagship Portfolio Demonstration

#### Brand & Design System
- Created the LUMÉA luxury brand visual identity ("Your glow, your ritual").
- Established centralized Material Design 3 tokens: Rose Mist (#F7E9E5), Dusty Rose (#C78D9D), Warm Sand (#EEE2D0), Espresso (#43322F), Pearl White (#FFFDFC), Sage Accent (#9CAC9C).
- Implemented full Material Design 3 showcase at `/[locale]/design-system`.
- 48×48px mobile touch targets across all interactive controls.

#### Core Functionality
- Initialized comprehensive 32-product catalog across 6 categories (10 skincare, 6 perfumes, 6 makeup, 4 haircare, 3 bodycare, 3 gift sets) with MAD pricing, stock, volume variants, plausible botanical ingredients, and usage instructions.
- Implemented 4-Step Interactive Skincare Routine Finder with deterministic algorithm, morning/evening ritual breakdown, and "Add Complete Routine to Cart".
- Implemented persistent shopping bag (drawer + full page) with free Moroccan shipping threshold progress, promo codes (`GLOW10`, `RITUEL15`, `BSES20`), and accurate MAD totals.
- Built Moroccan Guest Checkout simulation with phone validation (+212), destination city picker, COD/card simulation, and unique reference generation.
- Built simulated Order Tracking (`/[locale]/order-tracking`) with live stepper linked to browser state and admin updates.
- Built Beauty Journal (`/[locale]/journal`) featuring 6 educational articles.
- Built public Executive Management Console (`/[locale]/admin-demo`) with KPI dashboards, Product CRUD, Promotions, Bundles, Campaign Banner Editor, and Order Status management.
- Implemented complete internationalization: French (`/fr`, default), English (`/en`), and Arabic (`/ar`, genuine RTL with layout mirroring).
- Docker multi-stage configuration on port 3102:3000.
- Playwright automated E2E test suite.

