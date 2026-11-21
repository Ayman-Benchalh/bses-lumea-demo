'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, ProductVariant } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Droplets,
  Leaf,
  Info,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

export default function ProductDetailPage({ params: { locale, slug } }: Props) {
  const t = getTranslations(locale);
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'howToUse' | 'texture' | 'shipping'>('ingredients');
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = selectedVariant
    ? selectedVariant.discountPriceMad ?? selectedVariant.priceMad
    : product.discountPriceMad ?? product.priceMad;

  const originalPrice = selectedVariant ? selectedVariant.priceMad : product.priceMad;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const ok = addToCart(product, selectedVariant?.id, quantity);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  // Related products
  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || product.relatedProductIds?.includes(p.id)))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full space-y-16">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-espresso-muted">
        <Link href={`/${locale}`} className="hover:text-espresso transition-colors">
          {t.nav.home}
        </Link>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
        <Link href={`/${locale}/shop`} className="hover:text-espresso transition-colors">
          {t.nav.shop}
        </Link>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
        <Link
          href={`/${locale}/shop?category=${product.category}`}
          className="hover:text-espresso transition-colors uppercase tracking-wider"
        >
          {t.categories[product.category]}
        </Link>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
        <span className="text-espresso font-medium truncate max-w-[200px]">
          {product.name[locale] || product.name.fr}
        </span>
      </nav>

      {/* 2. Main Product Grid (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Gallery (Left Col) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-rose-dusty shadow-md scale-105'
                      : 'border-rose-border/40 hover:border-rose-dusty/40 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name[locale]} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Visual */}
          <div className="relative flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-rose-mist/30 border border-rose-border shadow-card">
            {product.images[selectedImageIndex] ? (
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name[locale] || product.name.fr}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-rose-dusty">
                <span className="font-editorial text-3xl font-medium">LUMÉA</span>
                <span className="text-xs tracking-widest uppercase mt-2">
                  Photographie Botanique
                </span>
              </div>
            )}

            {/* Badges on main image */}
            <div className="absolute top-4 start-4 flex flex-col gap-2">
              {product.isOnSale && product.discountPriceMad && (
                <span className="px-3 py-1 rounded-full bg-rose-deep text-pearl-white text-xs font-bold shadow-sm">
                  -
                  {Math.round(
                    ((product.priceMad - product.discountPriceMad) / product.priceMad) * 100
                  )}
                  %
                </span>
              )}
              {product.isBestSeller && !product.isOnSale && (
                <span className="px-3 py-1 rounded-full bg-espresso text-sand-warm text-xs font-semibold uppercase tracking-wider shadow-sm">
                  Best-Seller
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Info & Actions (Right Col) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-rose-dusty font-semibold uppercase tracking-wider">
              <span>{product.productType}</span>
              {product.rating && (
                <span className="flex items-center gap-1 text-espresso font-medium">
                  ★ {product.rating} ({product.reviewCount} avis)
                </span>
              )}
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso leading-tight">
              {product.name[locale] || product.name.fr}
            </h1>

            <p className="text-sm text-espresso-muted leading-relaxed">
              {product.subtitle[locale] || product.subtitle.fr}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl sm:text-3xl font-bold text-espresso">
              {formatPrice(currentPrice, locale)}
            </span>
            {product.isOnSale && product.discountPriceMad && (
              <span className="text-base text-espresso-muted line-through">
                {formatPrice(originalPrice, locale)}
              </span>
            )}
            <span className="text-xs text-espresso-muted">TTC</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed border-t border-rose-border/30 pt-4">
            {product.description[locale] || product.description.fr}
          </p>

          {/* Variant Selector (if available) */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                {t.product.volume} : {selectedVariant?.volume}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedVariant?.id === v.id
                        ? 'bg-espresso text-pearl-white border-espresso shadow-sm'
                        : 'bg-sand-light/50 border-rose-border text-espresso hover:bg-rose-mist'
                    }`}
                  >
                    {v.volume} — {formatPrice(v.discountPriceMad ?? v.priceMad, locale)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Availability status */}
          <div className="pt-2 text-xs">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-semantic-error font-medium">
                <span className="w-2 h-2 rounded-full bg-semantic-error" />
                <span>{t.product.outOfStock}</span>
              </span>
            ) : currentStock <= 5 ? (
              <span className="inline-flex items-center gap-1.5 text-semantic-warning font-medium">
                <span className="w-2 h-2 rounded-full bg-semantic-warning animate-pulse" />
                <span>{t.product.lowStock.replace('{count}', currentStock.toString())}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-semantic-success font-medium">
                <span className="w-2 h-2 rounded-full bg-semantic-success" />
                <span>{t.product.inStock.replace('{count}', currentStock.toString())}</span>
              </span>
            )}
          </div>

          {/* Purchase Actions (Quantity + Add to Cart + Wishlist) */}
          <div className="flex items-center gap-3 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center rounded-full border border-rose-border bg-sand-light/60 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center text-espresso hover:bg-rose-mist transition-colors"
                aria-label="Diminuer la quantité"
              >
                -
              </button>
              <span className="w-9 text-center font-semibold text-xs text-espresso">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))}
                disabled={quantity >= currentStock}
                className="w-9 h-9 rounded-full flex items-center justify-center text-espresso hover:bg-rose-mist transition-colors disabled:opacity-30"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-4 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-card flex items-center justify-center gap-2 ${
                justAdded
                  ? 'bg-semantic-success text-pearl-white'
                  : isOutOfStock
                  ? 'bg-rose-border text-espresso-muted cursor-not-allowed'
                  : 'bg-espresso hover:bg-espresso-light text-pearl-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.product.addedToCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-sand-warm" />
                  <span>{isOutOfStock ? t.product.outOfStock : t.product.addToCart}</span>
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="touch-target p-3.5 rounded-full border border-rose-border bg-pearl-white hover:bg-rose-mist transition-all hover:scale-105 active:scale-95"
              aria-label={inWishlist ? t.product.removeFromWishlist : t.product.addToWishlist}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  inWishlist ? 'fill-rose-deep text-rose-deep' : 'text-espresso/70'
                }`}
              />
            </button>
          </div>

          {/* Reassurance Icons */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-rose-border/30 text-[11px] text-espresso-muted text-center">
            <div className="p-2 rounded-xl bg-sand-light/40 space-y-1">
              <Truck className="w-4 h-4 mx-auto text-rose-dusty" />
              <span>Livraison 24-48h</span>
            </div>
            <div className="p-2 rounded-xl bg-sand-light/40 space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-rose-dusty" />
              <span>Paiement à la livraison</span>
            </div>
            <div className="p-2 rounded-xl bg-sand-light/40 space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-rose-dusty" />
              <span>Formule 100% Sûre</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Information Tabs */}
      <div className="rounded-3xl bg-pearl-white border border-rose-border/40 p-6 sm:p-10 shadow-subtle space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-rose-border/30 overflow-x-auto gap-4 sm:gap-8 pb-3">
          {[
            { key: 'ingredients', label: t.product.ingredientsTab, icon: Leaf },
            { key: 'howToUse', label: t.product.howToUseTab, icon: Sparkles },
            { key: 'texture', label: t.product.textureTab, icon: Droplets },
            { key: 'shipping', label: t.product.shippingTab, icon: Truck },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 pb-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
                  isActive
                    ? 'text-rose-deep border-b-2 border-rose-dusty'
                    : 'text-espresso-muted hover:text-espresso'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pt-2 text-xs sm:text-sm text-espresso/80 leading-relaxed max-w-3xl space-y-4">
          {activeTab === 'ingredients' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <span className="font-semibold text-espresso block">
                  {t.product.botanicals}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(product.keyBotanicals[locale] || product.keyBotanicals.fr).map(
                    (bot, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-rose-mist text-espresso font-medium text-xs border border-rose-border/40"
                      >
                        {bot}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-semibold text-espresso block">
                  Liste Complète (INCI) :
                </span>
                <p className="font-mono text-xs text-espresso-muted leading-relaxed bg-sand-light/40 p-4 rounded-xl border border-rose-border/20">
                  {product.ingredientsText[locale] || product.ingredientsText.fr}
                </p>
              </div>

              <p className="text-[11px] text-espresso-muted italic">
                {t.product.demoNotice}
              </p>
            </div>
          )}

          {activeTab === 'howToUse' && (
            <div className="space-y-3 animate-fade-in">
              <p>{product.howToUse[locale] || product.howToUse.fr}</p>
              <div className="p-4 rounded-2xl bg-rose-mist/40 border border-rose-border/40 space-y-1">
                <span className="font-semibold text-espresso block text-xs">
                  Moment conseillé :
                </span>
                <p className="text-xs text-espresso-muted">
                  {product.routineTiming === 'morning'
                    ? 'Idéal chaque matin pour illuminer et protéger votre peau.'
                    : product.routineTiming === 'evening'
                    ? 'À appliquer le soir pour favoriser la régénération cellulaire nocturne.'
                    : 'S\'intègre harmonieusement matin et soir dans votre rituel.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'texture' && (
            <div className="space-y-3 animate-fade-in">
              <p>{product.texture[locale] || product.texture.fr}</p>
              {product.fragranceFamily && (
                <div className="pt-2">
                  <span className="font-semibold text-espresso text-xs">
                    Famille olfactive :{' '}
                  </span>
                  <span className="capitalize text-xs text-rose-deep font-medium">
                    {product.fragranceFamily}
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 animate-fade-in">
              <p>{t.product.deliveryInfo}</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-espresso-muted">
                <li>Casablanca & Rabat : livraison sous 24 heures ouvrées.</li>
                <li>Marrakech, Tanger, Fès, Agadir : livraison sous 48 heures.</li>
                <li>Autres villes et provinces du Maroc : 48 à 72 heures.</li>
                <li>Paiement en espèces à la livraison (COD) sans frais additionnels.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 4. Related Products Grid */}
      {related.length > 0 && (
        <div className="space-y-8 pt-8">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
              Harmonie de Soins
            </span>
            <h2 className="font-editorial text-3xl font-medium text-espresso">
              {t.product.relatedTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} locale={locale} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

