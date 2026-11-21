# LUMÉA — Premium Beauty E-commerce Experience
### BSES Portfolio Flagship Demonstration

**Brand:** LUMÉA  
**Tagline:** *Your glow, your ritual.*  
**Studio:** BSES — Benchalh Solution E-commerce System  
**Contact:** [Bses47113@gmail.com](mailto:Bses47113@gmail.com)  
**WhatsApp:** [+212 694-991485](https://wa.me/212694991485)  
**Live Demo:** Local URL: [http://localhost:3102](http://localhost:3102)

---

## 1. Project Overview

LUMÉA is a client-facing flagship e-commerce demonstration designed and engineered for high-end cosmetics retailers, perfume houses, and luxury beauty boutiques in Morocco and internationally.

### Flagship Highlights
- **Distinctive Brand Identity:** Editorial serif typography, delicate thermal rose palettes, and fluted glass textures.
- **Minimum 32 Coherent Products:** 10 skincare, 6 perfumes, 6 makeup items, 4 haircare, 3 bodycare treatments, and 3 curated gift sets with authentic MAD pricing and volume variants.
- **Interactive Skincare Routine Finder:** 4-step personalized diagnostic with deterministic morning/evening recommendations and 1-click routine checkout.
- **Moroccan Guest Checkout:** Zod validation for Moroccan phone numbers (`+212`), major Moroccan cities selector, and cash-on-delivery (COD) simulation.
- **Simulated Order Tracking:** Real-time multi-stage order tracking synchronized with admin state.
- **Executive Admin Console (No Auth):** Public sandbox with live KPI dashboards, full Product CRUD, promotion code manager, homepage banner editor, and order progression.
- **Complete Trilingual Support:** French (`/fr`, default), English (`/en`), and Arabic (`/ar`, native RTL layout with visual mirroring).
- **Mobile-First UX & Material Design 3:** Zero clipped navigation, 48×48px comfortable touch targets, smooth scroll locking, and strict WCAG 2.2 AA accessibility.

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS with centralized M3 design tokens
- **State Management:** Zustand with versioned `localStorage` (`lumea_demo_store_v2`) and cross-tab sync
- **Validation:** Zod & React Hook Form
- **Icons:** Lucide React
- **Animations:** Lightweight CSS keyframes & Framer Motion transitions
- **Testing:** Playwright E2E suite across desktop, tablet, and mobile devices
- **Containerization:** Production multi-stage Dockerfile (`port 3102 -> 3000`)
- **Deployment:** Vercel Production via GitHub `main`

---

## 3. Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/Ayman-Benchalh/bses-lumea-demo.git
cd LUMÉA

# Install dependencies
npm ci

# Run development server on port 3102
npm run dev

# Open in browser:
# http://localhost:3102/fr
```

### Production Build & Local Start
```bash
npm run build
npm run start
```

---

## 4. Docker Deployment

The application includes a production multi-stage Dockerfile (Node 20 Alpine) with Next.js standalone optimization:

```bash
# Build and start container in detached mode
docker compose up --build -d

# Inspect status and healthcheck
docker compose ps

# View container logs
docker compose logs -f
```
The application will be accessible at: `http://localhost:3102`

---

## 5. Demonstration Features & Simulated Elements

LUMÉA is an interactive frontend demonstration. To ensure safety and zero risk of unauthorized charges:
- **Simulated Payments:** No real financial transactions, credit card charges, or payment gateway keys.
- **Simulated Orders:** Orders placed are persisted locally in the browser's `localStorage` sandbox and immediately visible in the Admin Console and Order Tracking view.
- **Data Reset:** Visitors can restore the pristine seed catalog and demo orders anytime via `/[locale]/admin-demo` -> Settings -> **Réinitialiser les données de démonstration**.
- **No Remote Backend Required:** Fully standalone client-side architecture with zero external database dependencies.

---

## 6. How the Routine Finder Works

Located at `/[locale]/routine-finder`:
1. **Step 1 — Concern:** Identifies primary skin focus (Dryness, Dullness, Oiliness, Texture, Antiaging).
2. **Step 2 — Complexity:** Essential (2 steps), Balanced (3-4 steps), or Complete (5 steps).
3. **Step 3 — Texture:** Light fluids, rich creams, or versatile.
4. **Step 4 — Budget:** Essential (<600 MAD), Mid-range (600-1100 MAD), or Premium (>1100 MAD).
5. **Algorithmic Selection:** Deterministically selects matching items from the live catalog (reflecting any real-time changes made in the Admin Console).
6. **1-Click Checkout:** Users can click **"Ajouter la Routine Complète au Panier"** to transfer all suggested morning and evening products directly to their shopping bag.

---

## 7. Running Automated Tests (Playwright)

```bash
# Run all E2E test suites (Desktop & Mobile)
npx playwright test

# View interactive test report
npx playwright show-report
```

---

## 8. BSES Contact & Custom E-commerce Studio

- **Email:** [Bses47113@gmail.com](mailto:Bses47113@gmail.com)
- **WhatsApp:** [+212 694-991485](https://wa.me/212694991485)
- **Pre-filled WhatsApp Lead Link:** [https://wa.me/212694991485?text=Bonjour...](https://wa.me/212694991485?text=Bonjour%20BSES%2C%20j%27ai%20d%C3%A9couvert%20votre%20d%C3%A9monstration%20LUM%C3%89A%20et%20je%20souhaite%20discuter%20de%20la%20cr%C3%A9ation%20d%27une%20boutique%20e-commerce%20pour%20mon%20activit%C3%A9.)

