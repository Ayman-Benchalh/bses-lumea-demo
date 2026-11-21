# LUMÉA Security & Privacy Review

## 1. Security Architecture & Threat Modeling

LUMÉA is designed as a **client-side sandbox demonstration** for enterprise and boutique e-commerce clients.

### Key Security Safeguards
1. **Zero Real Payment Exposure:**
   - No payment gateway API keys or secret tokens are present in client-side bundles.
   - All checkout flows are strictly simulated with clear user-facing badges.
2. **Data Privacy & GDPR / Moroccan Law 09-08 Compliance:**
   - No real customer personally identifiable information (PII) is stored or collected to any remote database.
   - All demonstration orders and preferences reside solely in the user's browser `localStorage`.
   - The user can erase all demonstration data at any time via the Admin Console Reset button.
3. **Cross-Site Scripting (XSS) Prevention:**
   - React's JSX automatic escaping protects against stored and reflected XSS.
   - External links (WhatsApp, Email) use `rel="noopener noreferrer"` and sanitize query parameters.
4. **Form Validation Security:**
   - Strict Zod schemas sanitize all incoming checkout and search inputs, preventing prototype pollution or unexpected type injection.
5. **Content Security & Asset Loading:**
   - Image domains are strictly whitelisted to `images.unsplash.com` in `next.config.mjs`.

