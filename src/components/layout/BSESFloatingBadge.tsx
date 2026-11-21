'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { Sparkles, X, MessageCircle, Mail, Settings, Compass, ShoppingBag } from 'lucide-react';

interface Props {
  locale: Locale;
}

export function BSESFloatingBadge({ locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const t = getTranslations(locale);

  const encodedMsg = encodeURIComponent(
    "Bonjour BSES, j'ai découvert votre démonstration LUMÉA et je souhaite discuter de la création d'une boutique e-commerce pour mon activité."
  );
  const whatsappUrl = `https://wa.me/212694991485?text=${encodedMsg}`;

  return (
    <div className={`fixed bottom-4 z-40 ${locale === 'ar' ? 'left-4' : 'right-4'}`}>
      {/* Expanded Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="BSES Studio Menu"
          className="mb-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-espresso text-pearl-white p-5 shadow-floating border border-rose-dusty/30 animate-fade-in text-sm"
        >
          <div className="flex items-center justify-between pb-3 border-b border-pearl-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wider text-xs uppercase text-sand-warm">
                BSES Studio
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-pearl-white/70 hover:text-pearl-white hover:bg-pearl-white/10 transition-colors"
              aria-label={t.nav.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-pearl-white/80 leading-relaxed mb-4">
            {t.bses.portfolioDesc}
          </p>

          <div className="space-y-2 mb-4">
            <Link
              href={`/${locale}/shop`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-pearl-white/5 hover:bg-pearl-white/15 transition-colors text-xs text-pearl-white"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-sand-warm" />
              <span>{t.home.viewAllProducts}</span>
            </Link>

            <Link
              href={`/${locale}/routine-finder`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-pearl-white/5 hover:bg-pearl-white/15 transition-colors text-xs text-pearl-white"
            >
              <Compass className="w-3.5 h-3.5 text-sand-warm" />
              <span>{t.bses.tryRoutine}</span>
            </Link>

            <Link
              href={`/${locale}/admin-demo`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-rose-dusty/20 hover:bg-rose-dusty/30 border border-rose-dusty/30 transition-colors text-xs font-medium text-rose-mist"
            >
              <Settings className="w-3.5 h-3.5 text-rose-dusty" />
              <span>{t.bses.openAdmin}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-pearl-white/10 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-pearl-white font-medium text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.bses.whatsappCta}</span>
            </a>

            <a
              href="mailto:Bses47113@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-pearl-white/10 hover:bg-pearl-white/20 text-pearl-white text-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Bses47113@gmail.com</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-espresso/95 hover:bg-espresso text-pearl-white text-xs font-medium shadow-floating border border-rose-dusty/40 transition-all hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-dusty"
        aria-expanded={isOpen}
        aria-label="Ouvrir le menu démonstration BSES"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-dusty opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-dusty" />
        </span>
        <Sparkles className="w-3.5 h-3.5 text-sand-warm group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide">{t.bses.badgeTitle}</span>
      </button>
    </div>
  );
}

