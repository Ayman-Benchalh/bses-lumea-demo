# LUMÉA Architecture & Technical Specifications

## 1. Architectural Overview

**LUMÉA** is built on a high-performance **Frontend-Only Next.js App Router** architecture designed for extreme responsiveness, internationalization, and deterministic demonstration persistence.

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 14 App Router                     │
├─────────────────────────────────────────────────────────────┤
│   /[locale]             Homepage & Brand Storytelling       │
│   /[locale]/shop        Contextual Filtering & Catalog      │
│   /[locale]/product/*   Product Detail, Gallery & Variants  │
│   /[locale]/routine-*   4-Step Deterministic Recommendation │
│   /[locale]/cart        Shopping Bag & Delivery Simulator   │
│   /[locale]/checkout    Moroccan Guest Checkout             │
│   /[locale]/tracking    Live Order Tracker Stepper          │
│   /[locale]/journal/*   Educational Editorial & Science     │
│   /[locale]/design-*    Material Design 3 Token Showcase    │
│   /[locale]/admin-demo  Executive Management Sandbox Console│
├─────────────────────────────────────────────────────────────┤
│                Centralized State & Persistence              │
│       Zustand Store + Versioned localStorage + Sync         │
├─────────────────────────────────────────────────────────────┤
│             Internationalization Engine (FR, EN, AR)        │
│          Locale Routing + Directional RTL Mirroring         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Key Technical Choices

- **Next.js 14 (App Router):** Server components for static layouts, client components for interactive rituals, and standalone output for minimal Docker image size.
- **Tailwind CSS & Centralized Design Tokens:** Complete color tokenization (`Rose Mist`, `Dusty Rose`, `Warm Sand`, `Espresso`, `Pearl White`, `Sage`).
- **Zustand with Versioned Persistence:**
  - Key: `lumea_demo_store_v2`.
  - SSR-safe hydration with auto-rehydrate.
  - Cross-tab synchronization via `window.addEventListener('storage')`.
- **Zod & React Hook Form:** Client-side validation ensuring valid Moroccan mobile formats (`+212 6...`, `+212 7...`, `06...`, `07...`) and destination cities.
- **Material Design 3 (M3) Ergonomics:** Touch targets of at least 48×48px on mobile, preventing navigation clipping and interaction errors.
- **Playwright E2E Suite:** Automated testing of navigation, filters, product details, cart, checkout, routine finder, admin CRUD, and Arabic RTL.
- **Docker Multi-Stage Build:** Runs on host port `3102` mapped to container port `3000`.

