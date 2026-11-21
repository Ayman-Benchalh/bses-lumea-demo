'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Product } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SearchModal({ isOpen, onClose, locale }: Props) {
  const t = getTranslations(locale);
  const { products } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = products.filter((p) => {
      const nameFr = p.name.fr.toLowerCase();
      const nameEn = p.name.en.toLowerCase();
      const nameAr = p.name.ar.toLowerCase();
      const cat = p.category.toLowerCase();
      const type = p.productType.toLowerCase();
      const botanicals = [
        ...p.keyBotanicals.fr,
        ...p.keyBotanicals.en,
        ...p.keyBotanicals.ar,
      ].join(' ').toLowerCase();

      return (
        nameFr.includes(q) ||
        nameEn.includes(q) ||
        nameAr.includes(q) ||
        cat.includes(q) ||
        type.includes(q) ||
        botanicals.includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });

    setResults(matches);
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.search}
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-pearl-white rounded-3xl shadow-floating border border-rose-border overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-rose-border/40 gap-3 bg-rose-mist/30">
          <Search className="w-5 h-5 text-rose-dusty shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.search}
            className="flex-1 bg-transparent text-espresso text-base placeholder:text-espresso-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-espresso-muted hover:text-espresso"
              aria-label="Effacer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg text-espresso-muted hover:text-espresso hover:bg-rose-mist/60 transition-colors"
          >
            {t.nav.close}
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                Suggestions Populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Sérum Éclat", q: "sérum" },
                  { label: "Ambre de l'Atlas", q: "ambre" },
                  { label: "Argan & Néroli", q: "argan" },
                  { label: "Figue de Barbarie", q: "figue" },
                  { label: "Huile à Lèvres", q: "lèvres" },
                  { label: "Coffret Cadeau", q: "coffret" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setQuery(item.q)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-mist/60 hover:bg-rose-mist text-espresso text-xs transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-rose-dusty" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-editorial text-lg text-espresso">
                {t.shop.noResults}
              </p>
              <p className="text-xs text-espresso-muted">
                Essayez avec un mot-clé plus générique tel que "sérum", "rose", "ambre" ou "huile".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-espresso-muted">
                {t.shop.resultsCount.replace('{count}', results.length.toString())}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/product/${product.slug}`}
                    onClick={onClose}
                    className="flex gap-3 p-3 rounded-2xl border border-rose-border/40 hover:border-rose-dusty hover:bg-rose-mist/20 transition-all group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/20">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name[locale] || product.name.fr}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-rose-dusty font-semibold">
                        {product.productType}
                      </span>
                      <h4 className="text-xs font-medium text-espresso truncate group-hover:text-rose-deep transition-colors">
                        {product.name[locale] || product.name.fr}
                      </h4>
                      <p className="text-xs font-semibold text-espresso mt-1">
                        {formatPrice(product.discountPriceMad ?? product.priceMad, locale)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-sand-light/50 border-t border-rose-border/30 text-center">
          <Link
            href={`/${locale}/shop`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-espresso hover:text-rose-dusty transition-colors"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}

