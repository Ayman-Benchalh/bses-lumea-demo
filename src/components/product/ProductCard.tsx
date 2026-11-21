'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Product } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { Heart, ShoppingBag, Check } from 'lucide-react';

interface Props {
  product: Product;
  locale: Locale;
}

export function ProductCard({ product, locale }: Props) {
  const t = getTranslations(locale);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.discountPriceMad ?? product.priceMad;
  const isOutOfStock = product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(false);
    }, 1200);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-pearl-white border border-rose-border/40 hover:border-rose-dusty/50 shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden">
      {/* Top Image Container */}
      <Link
        href={`/${locale}/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-rose-mist/30 block"
      >
        {/* Badges */}
        <div className="absolute top-3 start-3 z-10 flex flex-col gap-1.5">
          {product.isOnSale && product.discountPriceMad && (
            <span className="px-2.5 py-1 rounded-full bg-rose-deep text-pearl-white text-[11px] font-bold tracking-wide shadow-sm">
              -
              {Math.round(
                ((product.priceMad - product.discountPriceMad) / product.priceMad) * 100
              )}
              %
            </span>
          )}
          {product.isBestSeller && !product.isOnSale && (
            <span className="px-2.5 py-1 rounded-full bg-espresso text-sand-warm text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              Best-Seller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-sand-warm text-espresso text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              Nouveau
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="touch-target absolute top-3 end-3 z-10 w-9 h-9 rounded-full bg-pearl-white/80 hover:bg-pearl-white backdrop-blur-md shadow-sm border border-rose-border/40 text-espresso transition-all hover:scale-110 active:scale-95"
          aria-label={inWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-deep text-rose-deep' : 'text-espresso/70'
            }`}
          />
        </button>

        {/* Product Image or SVG Fallback */}
        {product.images[0] && !imageError ? (
          <Image
            src={product.images[0]}
            alt={product.name[locale] || product.name.fr}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-rose-mist/40 p-4 text-center">
            <span className="font-editorial text-2xl font-medium text-rose-dusty">LUMÉA</span>
            <span className="text-[10px] uppercase tracking-widest text-espresso-muted mt-1">
              {product.productType}
            </span>
          </div>
        )}

        {/* Quick Add To Cart Overlay Button (Desktop) */}
        {!isOutOfStock && (
          <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-md flex items-center justify-center gap-1.5 ${
                justAdded
                  ? 'bg-semantic-success text-pearl-white'
                  : 'bg-espresso/90 hover:bg-espresso text-pearl-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.product.addedToCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-sand-warm" />
                  <span>{t.product.addToCart}</span>
                </>
              )}
            </button>
          </div>
        )}
      </Link>

      {/* Product Content info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-espresso-muted">
            <span className="uppercase tracking-wider font-medium text-rose-dusty">
              {product.productType}
            </span>
            <span>{product.volume}</span>
          </div>

          <Link href={`/${locale}/product/${product.slug}`} className="block">
            <h3 className="font-editorial text-lg sm:text-xl font-medium text-espresso group-hover:text-rose-deep transition-colors line-clamp-2 min-h-[2.8rem] sm:min-h-[3rem] leading-snug">
              {product.name[locale] || product.name.fr}
            </h3>
          </Link>

          <p className="text-xs text-espresso-muted line-clamp-2 leading-relaxed min-h-[2.25rem]">
            {product.subtitle[locale] || product.subtitle.fr}
          </p>
        </div>

        {/* Price & Mobile Quick Action */}
        <div className="pt-4 mt-3 border-t border-rose-border/30 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-espresso">
              {formatPrice(currentPrice, locale)}
            </span>
            {product.isOnSale && product.discountPriceMad && (
              <span className="text-xs text-espresso-muted line-through">
                {formatPrice(product.priceMad, locale)}
              </span>
            )}
          </div>

          {/* Mobile Direct Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock || isAdding}
            className={`touch-target sm:hidden p-2 rounded-full border transition-all ${
              isOutOfStock
                ? 'opacity-40 border-rose-border'
                : justAdded
                ? 'bg-semantic-success text-pearl-white border-semantic-success'
                : 'bg-rose-mist text-espresso border-rose-border hover:bg-rose-dusty hover:text-pearl-white'
            }`}
            aria-label={t.product.addToCart}
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

