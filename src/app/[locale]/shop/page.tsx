'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Locale, ProductCategory, SkinConcern, FragranceFamily } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function ShopPage({ params: { locale } }: Props) {
  const searchParams = useSearchParams();
  const t = getTranslations(locale);
  const { products } = useStore();

  // URL query params or defaults
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';
  const initialConcern = (searchParams.get('concern') as SkinConcern) || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'all'>(initialConcern);
  const [selectedFragranceFamily, setSelectedFragranceFamily] = useState<FragranceFamily | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'newest' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Categories definition
  const categories: { key: ProductCategory | 'all'; label: string }[] = [
    { key: 'all', label: t.nav.allProducts },
    { key: 'skincare', label: t.categories.skincare },
    { key: 'fragrance', label: t.categories.fragrance },
    { key: 'makeup', label: t.categories.makeup },
    { key: 'haircare', label: t.categories.haircare },
    { key: 'bodycare', label: t.categories.bodycare },
    { key: 'giftsets', label: t.categories.giftsets },
  ];

  const skinConcerns: { key: SkinConcern | 'all'; label: string }[] = [
    { key: 'all', label: t.concerns.all },
    { key: 'dryness', label: t.concerns.dryness },
    { key: 'dullness', label: t.concerns.dullness },
    { key: 'oiliness', label: t.concerns.oiliness },
    { key: 'texture', label: t.concerns.texture },
    { key: 'antiaging', label: t.concerns.antiaging },
  ];

  const fragranceFamilies: { key: FragranceFamily | 'all'; label: string }[] = [
    { key: 'all', label: 'Toutes les familles' },
    { key: 'oriental', label: 'Oriental & Épicé' },
    { key: 'floral', label: 'Floral & Rosé' },
    { key: 'woody', label: 'Boisé & Santal' },
    { key: 'citrus', label: 'Hespéridé & Néroli' },
    { key: 'amber', label: 'Ambré & Chaleureux' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName =
          p.name.fr.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.toLowerCase().includes(q);
        const matchesType = p.productType.toLowerCase().includes(q);
        if (!matchesName && !matchesType) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Contextual Skin Concern
      if (selectedConcern !== 'all') {
        if (!p.skinConcern || !p.skinConcern.includes(selectedConcern)) {
          return false;
        }
      }

      // Contextual Fragrance Family
      if (selectedFragranceFamily !== 'all') {
        if (p.fragranceFamily !== selectedFragranceFamily) {
          return false;
        }
      }

      // Price
      const currentPrice = p.discountPriceMad ?? p.priceMad;
      if (currentPrice > maxPrice) {
        return false;
      }

      // In Stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // On Sale
      if (onSaleOnly && !p.isOnSale) {
        return false;
      }

      return true;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedConcern,
    selectedFragranceFamily,
    maxPrice,
    inStockOnly,
    onSaleOnly,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'priceAsc':
        return list.sort(
          (a, b) =>
            (a.discountPriceMad ?? a.priceMad) - (b.discountPriceMad ?? b.priceMad)
        );
      case 'priceDesc':
        return list.sort(
          (a, b) =>
            (b.discountPriceMad ?? b.priceMad) - (a.discountPriceMad ?? a.priceMad)
        );
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedConcern('all');
    setSelectedFragranceFamily('all');
    setMaxPrice(1200);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedConcern !== 'all' ||
    selectedFragranceFamily !== 'all' ||
    maxPrice < 1200 ||
    inStockOnly ||
    onSaleOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      {/* Header Title */}
      <div className="mb-8 space-y-2 text-center sm:text-start">
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-espresso">
          {t.shop.title}
        </h1>
        <p className="text-sm text-espresso-muted max-w-2xl leading-relaxed">
          {t.shop.subtitle}
        </p>
      </div>

      {/* Control Bar: Search + Mobile Filter Toggle + Sorting */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-pearl-white border border-rose-border/40 shadow-subtle mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-espresso-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.shop.filterBy}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-sand-light/60 border border-rose-border/40 text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty"
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex-1 sm:flex-initial touch-target flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-mist/80 border border-rose-border text-xs font-semibold text-espresso"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-dusty" />
            <span>{t.shop.filters}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-rose-deep" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-espresso-muted">{t.shop.sortBy}:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none px-3.5 py-2.5 pe-8 rounded-xl bg-sand-light/60 border border-rose-border/40 text-xs font-medium text-espresso focus:outline-none focus:border-rose-dusty cursor-pointer"
              >
                <option value="featured">{t.shop.sortFeatured}</option>
                <option value="priceAsc">{t.shop.sortPriceAsc}</option>
                <option value="priceDesc">{t.shop.sortPriceDesc}</option>
                <option value="newest">{t.shop.sortNewest}</option>
                <option value="rating">{t.shop.sortRating}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute end-2.5 top-1/2 -translate-y-1/2 text-espresso-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs animate-fade-in">
          <span className="text-espresso-muted font-medium">{t.shop.activeFilters}</span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-mist text-espresso font-medium border border-rose-border">
              <span>
                {categories.find((c) => c.key === selectedCategory)?.label}
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="hover:text-semantic-error"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedConcern !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-warm/60 text-espresso font-medium border border-sand-dark/30">
              <span>
                {skinConcerns.find((c) => c.key === selectedConcern)?.label}
              </span>
              <button
                onClick={() => setSelectedConcern('all')}
                className="hover:text-semantic-error"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedFragranceFamily !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-warm/60 text-espresso font-medium border border-sand-dark/30">
              <span>
                {
                  fragranceFamilies.find((f) => f.key === selectedFragranceFamily)
                    ?.label
                }
              </span>
              <button
                onClick={() => setSelectedFragranceFamily('all')}
                className="hover:text-semantic-error"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
              <span>{t.shop.inStockOnly}</span>
              <button
                onClick={() => setInStockOnly(false)}
                className="hover:text-semantic-error"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onSaleOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-deep/10 text-rose-deep font-medium border border-rose-deep/20">
              <span>{t.shop.onSaleOnly}</span>
              <button
                onClick={() => setOnSaleOnly(false)}
                className="hover:text-semantic-error"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-espresso-muted hover:text-espresso font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.shop.clearFilters}</span>
          </button>
        </div>
      )}

      {/* Main Catalog Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-rose-border/30">
            <h3 className="font-editorial text-lg font-medium text-espresso">
              {t.shop.filters}
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-deep hover:underline font-medium"
              >
                {t.shop.clearFilters}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
              {t.shop.category}
            </span>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setSelectedCategory(cat.key);
                    if (cat.key !== 'skincare' && cat.key !== 'all') {
                      setSelectedConcern('all');
                    }
                    if (cat.key !== 'fragrance' && cat.key !== 'all') {
                      setSelectedFragranceFamily('all');
                    }
                  }}
                  className={`text-start px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat.key
                      ? 'bg-rose-mist text-espresso font-semibold'
                      : 'text-espresso-muted hover:bg-sand-light hover:text-espresso'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contextual: Skin Concerns (Visible for Skincare or All) */}
          {(selectedCategory === 'all' || selectedCategory === 'skincare') && (
            <div className="space-y-2 pt-4 border-t border-rose-border/30 animate-fade-in">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                {t.shop.skinConcern}
              </span>
              <div className="flex flex-col gap-1">
                {skinConcerns.map((sc) => (
                  <button
                    key={sc.key}
                    onClick={() => setSelectedConcern(sc.key)}
                    className={`text-start px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedConcern === sc.key
                        ? 'bg-sand-warm text-espresso font-semibold'
                        : 'text-espresso-muted hover:bg-sand-light hover:text-espresso'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contextual: Fragrance Family (Visible for Fragrance or All) */}
          {(selectedCategory === 'all' || selectedCategory === 'fragrance') && (
            <div className="space-y-2 pt-4 border-t border-rose-border/30 animate-fade-in">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                {t.shop.fragranceFamily}
              </span>
              <div className="flex flex-col gap-1">
                {fragranceFamilies.map((ff) => (
                  <button
                    key={ff.key}
                    onClick={() => setSelectedFragranceFamily(ff.key)}
                    className={`text-start px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedFragranceFamily === ff.key
                        ? 'bg-sand-warm text-espresso font-semibold'
                        : 'text-espresso-muted hover:bg-sand-light hover:text-espresso'
                    }`}
                  >
                    {ff.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-rose-border/30">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider font-semibold text-rose-dusty">
                {t.shop.priceRange}
              </span>
              <span className="font-semibold text-espresso">
                ≤ {maxPrice} MAD
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="1200"
              step="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rose-dusty cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-4 border-t border-rose-border/30">
            <label className="flex items-center gap-2.5 text-xs text-espresso cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-rose-dusty accent-rose-dusty"
              />
              <span>{t.shop.inStockOnly}</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-espresso cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="w-4 h-4 rounded text-rose-dusty accent-rose-dusty"
              />
              <span>{t.shop.onSaleOnly}</span>
            </label>
          </div>
        </aside>

        {/* Products Grid Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-espresso-muted">
            <span>
              {t.shop.resultsCount.replace(
                '{count}',
                sortedProducts.length.toString()
              )}
            </span>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 rounded-3xl bg-pearl-white border border-rose-border/40 p-8 shadow-subtle">
              <div className="w-16 h-16 rounded-full bg-rose-mist flex items-center justify-center mx-auto text-rose-dusty">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-medium text-espresso">
                  {t.shop.noResults}
                </h3>
                <p className="text-xs text-espresso-muted max-w-md mx-auto">
                  Aucun soin ou parfum ne correspond à vos filtres actuels. Modifiez vos critères pour explorer notre catalogue.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.shop.clearFilters}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.shop.filters}
          className="fixed inset-0 z-50 flex lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Body */}
          <div
            className={`relative w-full max-w-sm bg-pearl-white text-espresso h-[100dvh] flex flex-col shadow-2xl z-10 ${
              locale === 'ar' ? 'mr-auto' : 'ml-auto'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-rose-border/40 bg-rose-mist/30">
              <h3 className="font-editorial text-xl font-medium text-espresso">
                {t.shop.filters}
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="touch-target p-2 rounded-xl text-espresso hover:bg-rose-mist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                  {t.shop.category}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-start transition-colors ${
                        selectedCategory === cat.key
                          ? 'bg-rose-mist border-rose-dusty text-espresso font-semibold'
                          : 'border-rose-border text-espresso hover:bg-sand-light'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-4 border-t border-rose-border/30">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wider font-semibold text-rose-dusty">
                    {t.shop.priceRange}
                  </span>
                  <span className="font-semibold text-espresso">
                    ≤ {maxPrice} MAD
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-rose-dusty cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-4 border-t border-rose-border/30">
                <label className="flex items-center gap-2.5 text-xs text-espresso cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-dusty accent-rose-dusty"
                  />
                  <span>{t.shop.inStockOnly}</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-espresso cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-dusty accent-rose-dusty"
                  />
                  <span>{t.shop.onSaleOnly}</span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-rose-border/40 bg-sand-light/60 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 px-4 rounded-xl border border-rose-border text-espresso text-xs font-medium hover:bg-rose-mist"
              >
                {t.shop.clearFilters}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-espresso text-pearl-white text-xs font-medium hover:bg-espresso-light"
              >
                {t.shop.applyFilters} ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

