'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BSESFloatingBadge } from '@/components/layout/BSESFloatingBadge';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { useStore } from '@/store/useStore';

interface Props {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cross-tab synchronization via storage event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lumea_demo_store_v2' && e.newValue) {
        useStore.persist.rehydrate();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen flex flex-col bg-pearl-white text-espresso selection:bg-rose-dusty selection:text-pearl-white">
        <Header
          locale={locale}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <Footer locale={locale} />

        <BSESFloatingBadge locale={locale} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          locale={locale}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          locale={locale}
        />
      </body>
    </html>
  );
}

