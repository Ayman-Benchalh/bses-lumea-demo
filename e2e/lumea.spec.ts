import { test, expect } from '@playwright/test';

test.describe('LUMÉA E-commerce Experience & BSES Showcase', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/fr');
  });

  test('1. Homepage: Brand identity, Tagline, Hero & BSES attribution', async ({ page }) => {
    // Check Brand & Tagline
    await expect(page.locator('header')).toContainText('LUMÉA');
    await expect(page.locator('header')).toContainText('Votre éclat, votre rituel');

    // Check Hero section
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Check floating BSES pill
    const bsesPill = page.locator('button[aria-label="Ouvrir le menu démonstration BSES"]');
    await expect(bsesPill).toBeVisible();

    // Check Footer studio credit
    const footer = page.locator('footer');
    await expect(footer).toContainText('BSES');
    await expect(footer).toContainText('Bses47113@gmail.com');
  });

  test('2. Multilingual Support: FR, EN, AR with genuine RTL', async ({ page }) => {
    // French by default
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');

    // Navigate to English
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('header')).toContainText('Your glow, your ritual');

    // Navigate to Arabic
    await page.goto('/ar');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('header')).toContainText('إشراقتك، طقوسك اليومية');
  });

  test('3. Mobile Navigation: Zero clipped navigation & accessible drawer', async ({ page }) => {
    // Set small mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr');

    const hamburger = page.locator('button[aria-label="Menu"]');
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    // Drawer should open and be visible
    const drawer = page.locator('div[role="dialog"][aria-label="Menu"]');
    await expect(drawer).toBeVisible();

    // Verify all key navigation links exist and are not clipped
    await expect(drawer.getByRole('link', { name: 'Tous les produits' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Soin Visage' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Parfumerie' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Trouver ma Routine' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Journal de Beauté' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Design System' })).toBeVisible();

    // Close button works
    const closeBtn = drawer.locator('button[aria-label="Fermer"]');
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });

  test('4. Product Catalog: Contextual filtering, search & price slider', async ({ page }) => {
    await page.goto('/fr/shop');

    // Ensure initial catalog has all 32 products
    await expect(page.locator('text=/32 produits trouvés/')).toBeVisible();

    // Filter by Skincare
    await page.getByRole('button', { name: 'Soins du Visage' }).first().click();
    await expect(page.locator('text=/10 produits trouvés/')).toBeVisible();

    // Search for serum
    const searchInput = page.getByPlaceholder('Filtrer les produits');
    await searchInput.fill('sérum');
    await expect(page.locator('h3:has-text("Sérum Éclat Botanique")')).toBeVisible();

    // Clear filters
    await page.getByRole('button', { name: 'Réinitialiser les filtres' }).first().click();
    await expect(page.locator('text=/32 produits trouvés/')).toBeVisible();
  });

  test('5. Product Detail: Variants, Tabs, and Add to Bag', async ({ page }) => {
    await page.goto('/fr/product/serum-eclat-botanique');

    // Verify Title & Price
    await expect(page.locator('h1')).toContainText('Sérum Éclat Botanique');
    await expect(page.getByText('340 MAD', { exact: true })).toBeVisible();

    // Verify Variant selector
    const variant50 = page.getByRole('button', { name: /50ml/ });
    if (await variant50.count() > 0) {
      await variant50.click();
      await expect(page.locator('text=490 MAD').first()).toBeVisible();
    }

    // Add to Bag
    const addBtn = page.getByRole('button', { name: 'Ajouter au Panier' }).first();
    await addBtn.click();
    await expect(page.getByRole('button', { name: 'Ajouté avec succès !' })).toBeVisible();

    // Check Header Bag Count is updated to 1
    const cartButton = page.locator('button[aria-label="Panier"]');
    await expect(cartButton).toContainText('1');
  });

  test('6. Cart Drawer & Coupon GLOW10', async ({ page }) => {
    // Add product to cart first
    await page.goto('/fr/product/serum-eclat-botanique');
    await page.getByRole('button', { name: 'Ajouter au Panier' }).first().click();

    // Open Cart Drawer
    const cartBtn = page.locator('button[aria-label="Panier"]');
    await cartBtn.click();

    const drawer = page.locator('div[role="dialog"][aria-label="Mon Panier de Soins"]');
    await expect(drawer).toBeVisible();

    // Apply promo code
    const promoInput = drawer.getByPlaceholder('Code promo (ex: GLOW10)');
    await promoInput.fill('GLOW10');
    await drawer.getByRole('button', { name: 'Appliquer' }).click();

    // Should indicate promo code activated
    await expect(drawer.locator('text=GLOW10')).toBeVisible();
  });

  test('7. Moroccan Checkout Simulation & Order Confirmation', async ({ page }) => {
    // Add product to cart
    await page.goto('/fr/product/serum-eclat-botanique');
    await page.getByRole('button', { name: 'Ajouter au Panier' }).first().click();

    // Go to checkout
    await page.goto('/fr/checkout');
    await expect(page.locator('h1')).toContainText('Finaliser ma Commande');

    // Fill Moroccan Checkout fields
    await page.getByPlaceholder('Ex: Salma Benali').fill('Salma Benali');
    await page.getByPlaceholder('Ex: 06 12 34 56 78 ou +212 6...').fill('0661234567');
    await page.getByPlaceholder('Ex: Quartier Racine, Rue Ahmed El Mokri, Résidence Les Fleurs').fill('24 Rue Hassan II, Résidence Majorelle');

    // Submit order
    const placeOrderBtn = page.getByRole('button', { name: 'Valider ma Commande Simulée' });
    await placeOrderBtn.click();

    // Verify order confirmation screen
    await expect(page.locator('h1')).toContainText('Commande Démo Confirmée !', { timeout: 10000 });
    await expect(page.locator('text=/LUM-[A-Z0-9]+/')).toBeVisible();
  });

  test('8. Routine Finder: 4-Step Interactive Diagnostic & Results', async ({ page }) => {
    await page.goto('/fr/routine-finder');

    // Step 1: Concern (Éclat)
    await page.locator('button:has-text("Éclat & Teint Terne")').click();
    await page.getByRole('button', { name: 'Continuer' }).click();

    // Step 2: Complexity (Équilibré)
    await page.locator('button:has-text("Équilibré (3 à 4 soins ciblés)")').click();
    await page.getByRole('button', { name: 'Continuer' }).click();

    // Step 3: Textures
    await page.locator('button:has-text("Toutes les textures me conviennent")').click();
    await page.getByRole('button', { name: 'Continuer' }).click();

    // Step 4: Budget
    await page.locator('button:has-text("Équilibré (600 - 1 100 MAD)")').click();
    await page.getByRole('button', { name: 'Révéler ma Routine' }).click();

    // Results screen
    await expect(page.locator('h1')).toContainText('Votre Rituel LUMÉA Sur-Mesure');
    await expect(page.locator('text=Rituel du Matin')).toBeVisible();
    await expect(page.locator('text=Rituel du Soir')).toBeVisible();

    // Add all routine to cart
    const addAllBtn = page.getByRole('button', { name: 'Ajouter la Routine Complète au Panier' });
    await addAllBtn.click();
    await expect(page.locator('text=Routine complète ajoutée au panier !')).toBeVisible();
  });

  test('9. Admin Demo Console: KPI dashboard, status updates & store synchronization', async ({ page }) => {
    await page.goto('/fr/admin-demo');

    // Verify Dashboard KPIs exist
    await expect(page.locator('text=Chiffre d\'Affaires Simulé')).toBeVisible();
    await expect(page.locator('text=Commandes Démo')).toBeVisible();

    // Navigate to Products tab
    await page.getByRole('button', { name: /Produits/ }).click();
    await expect(page.locator('text=Catalogue Produits')).toBeVisible();

    // Navigate to Settings and verify Reset button
    await page.getByRole('button', { name: /Paramètres/ }).click();
    await expect(page.locator('button:has-text("Réinitialiser les données de démonstration")')).toBeVisible();
  });

  test('10. Design System Showcase', async ({ page }) => {
    await page.goto('/fr/design-system');
    await expect(page.locator('h1')).toContainText('LUMÉA Design System Showcase');
    await expect(page.locator('text=Rose Mist')).toBeVisible();
    await expect(page.locator('text=Dusty Rose')).toBeVisible();
    await expect(page.locator('text=Espresso')).toBeVisible();
  });

  test('11. WhatsApp Pre-filled Lead Generation URL', async ({ page }) => {
    await page.goto('/fr');
    const bsesPill = page.locator('button[aria-label="Ouvrir le menu démonstration BSES"]');
    await bsesPill.click();

    const whatsappLink = page.locator('a[href*="wa.me/212694991485"]').first();
    await expect(whatsappLink).toBeVisible();
    const href = await whatsappLink.getAttribute('href');
    expect(href).toContain('wa.me/212694991485');
    expect(href).toContain('Bonjour%20BSES');
  });
});
