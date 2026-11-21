'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { MessageCircle, Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  locale: Locale;
}

export function Footer({ locale }: Props) {
  const t = getTranslations(locale);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const encodedMsg = encodeURIComponent(
    "Bonjour BSES, j'ai découvert votre démonstration LUMÉA et je souhaite discuter de la création d'une boutique e-commerce pour mon activité."
  );
  const whatsappUrl = `https://wa.me/212694991485?text=${encodedMsg}`;

  return (
    <footer className="bg-espresso text-pearl-white/90 border-t border-rose-dusty/20 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-pearl-white/10">
          {/* Col 1 & 2: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <span className="font-editorial text-3xl tracking-[0.2em] font-medium text-pearl-white">
                LUMÉA
              </span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-sand-warm mt-0.5">
                {t.tagline}
              </span>
            </Link>

            <p className="text-sm text-pearl-white/75 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-pearl-white text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +212 694-991485</span>
              </a>

              <a
                href="mailto:Bses47113@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pearl-white/10 hover:bg-pearl-white/20 text-pearl-white text-xs font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-sand-warm" />
                <span>Bses47113@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-sand-warm mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={`/${locale}/shop`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.allProducts}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=skincare`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.skincare}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/shop?category=fragrance`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.fragrance}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/routine-finder`}
                  className="hover:text-sand-warm transition-colors flex items-center gap-1.5 text-rose-dusty"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.nav.routineFinder}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/journal`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.journal}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer & Demo Info */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-sand-warm mb-4">
              {t.footer.customerService}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={`/${locale}/order-tracking`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.orderTracking}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/design-system`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.designSystem}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/admin-demo`}
                  className="hover:text-sand-warm transition-colors"
                >
                  {t.nav.adminDemo}
                </Link>
              </li>
              <li className="pt-2 text-xs text-pearl-white/60 leading-normal">
                Livraison express 24-48h partout au Maroc. Paiement à la livraison accepté.
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter Simulation */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-sand-warm">
              {t.footer.newsletterTitle}
            </h3>
            <p className="text-xs text-pearl-white/70 leading-relaxed">
              {t.footer.newsletterSubtitle}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{t.footer.newsletterSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-pearl-white/10 border border-pearl-white/20 text-pearl-white placeholder:text-pearl-white/40 text-xs focus:outline-none focus:border-sand-warm transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label={t.footer.newsletterSubmit}
                    className="absolute end-1.5 top-1.5 p-1.5 rounded-lg bg-sand-warm hover:bg-sand-light text-espresso transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Studio Attribution & Legal Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-pearl-white/60">
          <p className="text-center md:text-start leading-relaxed">
            {t.footer.copyright}
          </p>

          <div className="p-2.5 rounded-xl bg-pearl-white/5 border border-pearl-white/10 max-w-md text-[11px] leading-relaxed text-center md:text-end text-pearl-white/50">
            {t.demoWarning}
          </div>
        </div>
      </div>
    </footer>
  );
}

