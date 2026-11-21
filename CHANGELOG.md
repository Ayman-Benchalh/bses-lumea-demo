# CHANGELOG — LUMÉA

All notable changes to this project will be documented in this file.

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

