'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function WishlistPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const { wishlist, products } = useStore();

  const wishlistProducts = products.filter((p) =>
    wishlist.some((item) => item.productId === p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-8">
      <div className="space-y-1">
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso">
          {t.nav.wishlist}
        </h1>
        <p className="text-xs text-espresso-muted">
          {wishlistProducts.length} soins botaniques précieux enregistrés
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-mist flex items-center justify-center mx-auto text-rose-dusty">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Votre liste de favoris est vide
            </h2>
            <p className="text-xs text-espresso-muted max-w-sm mx-auto">
              Cliquez sur l'icône cœur présente sur chaque soin pour composer votre sélection idéale.
            </p>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors shadow-card"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

