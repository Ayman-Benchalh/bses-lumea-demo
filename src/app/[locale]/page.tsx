'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, ProductCategory, SkinConcern } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import { INITIAL_ARTICLES } from '@/data/articles';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Check,
  Compass,
  Gift,
  Droplets,
  Flame,
  Sun,
  Layers,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function HomePage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const { products, bundles, campaign } = useStore();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const perfumes = products.filter((p) => p.category === 'fragrance').slice(0, 3);
  const articles = INITIAL_ARTICLES.slice(0, 3);

  const categoriesList: {
    key: ProductCategory;
    name: string;
    image: string;
    tag: string;
  }[] = [
    {
      key: 'skincare',
      name: t.categories.skincare,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      tag: '10 Soins Botaniques',
    },
    {
      key: 'fragrance',
      name: t.categories.fragrance,
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
      tag: '6 Parfums Nobles',
    },
    {
      key: 'makeup',
      name: t.categories.makeup,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      tag: '6 Teintes Éclat',
    },
    {
      key: 'haircare',
      name: t.categories.haircare,
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
      tag: '4 Rituels Capillaires',
    },
    {
      key: 'bodycare',
      name: t.categories.bodycare,
      image: 'https://images.unsplash.com/photo-1608248597359-57e3f225916d?auto=format&fit=crop&w=600&q=80',
      tag: '3 Soins Hammam',
    },
    {
      key: 'giftsets',
      name: t.categories.giftsets,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      tag: '3 Coffrets Cadeaux',
    },
  ];

  const skinConcernsList: { key: SkinConcern; label: string; icon: any }[] = [
    { key: 'dullness', label: t.concerns.dullness, icon: Sun },
    { key: 'dryness', label: t.concerns.dryness, icon: Droplets },
    { key: 'oiliness', label: t.concerns.oiliness, icon: Flame },
    { key: 'texture', label: t.concerns.texture, icon: Layers },
    { key: 'antiaging', label: t.concerns.antiaging, icon: Sparkles },
  ];

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20 overflow-x-hidden w-full max-w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-mist/60 via-sand-light/40 to-pearl-white pt-8 pb-16 sm:pt-16 sm:pb-24 w-full">
        {/* Subtle decorative atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 end-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-rose-dusty/10 blur-3xl" />
          <div className="absolute bottom-0 start-0 translate-y-12 -translate-x-12 w-96 h-96 rounded-full bg-sand-warm/30 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pearl-white/90 border border-rose-border text-rose-deep text-xs font-semibold shadow-subtle tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-rose-dusty animate-pulse" />
                <span>{campaign.heroBadge[locale] || campaign.heroBadge.fr}</span>
              </div>

              {/* Title */}
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-espresso leading-[1.08]">
                {campaign.heroTitle[locale] || campaign.heroTitle.fr}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-espresso-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {campaign.heroSubtitle[locale] || campaign.heroSubtitle.fr}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href={`/${locale}/shop`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-sm font-medium transition-all shadow-card hover:shadow-hover hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{t.hero.shopCta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href={`/${locale}/routine-finder`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-rose-mist/80 hover:bg-rose-mist text-rose-deep border border-rose-border text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 text-rose-dusty" />
                  <span>{t.hero.routineCta}</span>
                </Link>
              </div>

              {/* Value propositions */}
              <div className="pt-6 border-t border-rose-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-espresso-muted">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-dusty shrink-0" />
                  <span>{t.hero.guarantee1}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Truck className="w-4 h-4 text-rose-dusty shrink-0" />
                  <span>{t.hero.guarantee2}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <HeartHandshake className="w-4 h-4 text-rose-dusty shrink-0" />
                  <span>{t.hero.guarantee3}</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-floating border-4 border-pearl-white bg-sand-warm/30">
                <Image
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85"
                  alt="LUMÉA Luxury Skincare Still Life"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />

                {/* Floating highlight badge */}
                <div className="absolute bottom-5 inset-x-5 glass-panel p-4 rounded-2xl shadow-card text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-rose-dusty font-bold">
                      Sérum Signature
                    </span>
                    <h4 className="font-editorial text-base font-semibold text-espresso">
                      Éclat Botanique
                    </h4>
                  </div>
                  <Link
                    href={`/${locale}/product/serum-eclat-botanique`}
                    className="p-2 rounded-full bg-espresso text-pearl-white hover:bg-espresso-light transition-colors"
                    aria-label="Voir le sérum"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Collections
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
              {t.home.featuredTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-rose-dusty transition-colors group"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/shop?category=${cat.key}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-rose-mist/30 border border-rose-border/40 hover:border-rose-dusty/50 shadow-subtle hover:shadow-card transition-all"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-pearl-white">
                  <span className="block text-[10px] text-sand-warm font-medium">
                    {cat.tag}
                  </span>
                  <h3 className="text-sm font-semibold truncate leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY SKIN CONCERN */}
      <section className="bg-sand-light/50 border-y border-rose-border/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Diagnostic Ciblé
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso">
              {t.home.concernTitle}
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted">
              {t.home.concernSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {skinConcernsList.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.key}
                  href={`/${locale}/shop?concern=${item.key}`}
                  className="group flex flex-col items-center p-5 rounded-2xl bg-pearl-white border border-rose-border/40 hover:border-rose-dusty shadow-subtle hover:shadow-card transition-all text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-mist/60 group-hover:bg-rose-dusty flex items-center justify-center text-rose-deep group-hover:text-pearl-white transition-colors mb-3">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-espresso group-hover:text-rose-deep transition-colors line-clamp-2">
                    {item.label}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Plébiscités
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
              {t.home.bestSellersTitle}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-rose-dusty transition-colors group"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL STORY: HAMMAM MODERNE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-espresso text-pearl-white p-8 sm:p-14 lg:p-20 shadow-floating">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1608248597359-57e3f225916d?auto=format&fit=crop&w=1600&q=80"
              alt="Hammam Ritual Background"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pearl-white/10 text-sand-warm text-xs font-semibold tracking-wider uppercase border border-pearl-white/10">
              <Sparkles className="w-3.5 h-3.5 text-sand-warm" />
              <span>Rituel Séculaire</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
              {t.home.ritualStoryTitle}
            </h2>

            <p className="text-sm sm:text-base text-pearl-white/80 leading-relaxed">
              {t.home.ritualStoryDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/${locale}/shop?category=bodycare`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sand-warm hover:bg-sand-light text-espresso font-medium text-xs sm:text-sm transition-colors shadow-sm"
              >
                <span>{t.home.ritualStoryCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href={`/${locale}/product/coffret-somptueux-spa-marocain`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pearl-white/10 hover:bg-pearl-white/20 text-pearl-white font-medium text-xs sm:text-sm transition-colors border border-pearl-white/20"
              >
                <Gift className="w-4 h-4 text-sand-warm" />
                <span>Voir le Coffret Spa</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HAUTE PARFUMERIE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Sillages Signatures
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
              {t.home.perfumeDiscoveryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted mt-1">
              {t.home.perfumeDiscoverySubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?category=fragrance`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-rose-dusty transition-colors group"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perfumes.map((perfume) => (
            <ProductCard key={perfume.id} product={perfume} locale={locale} />
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE ROUTINE FINDER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-mist via-sand-warm/50 to-rose-mist p-8 sm:p-12 border border-rose-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-start">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-deep">
              <Compass className="w-4 h-4 text-rose-dusty" />
              <span>Diagnostic Déterministe</span>
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-espresso">
              {t.routineFinder.title}
            </h3>
            <p className="text-xs sm:text-sm text-espresso-muted leading-relaxed">
              {t.routineFinder.subtitle}
            </p>
          </div>

          <Link
            href={`/${locale}/routine-finder`}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-xs sm:text-sm font-semibold transition-all shadow-card hover:scale-105 active:scale-95 shrink-0"
          >
            <span>{t.hero.routineCta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* 8. CURATED GIFT SETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Cadeaux & Écrins
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
              {t.home.giftSetsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted mt-1">
              {t.home.giftSetsSubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/shop?category=giftsets`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-rose-dusty transition-colors group"
          >
            <span>{t.home.viewAllProducts}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products
            .filter((p) => p.category === 'giftsets')
            .slice(0, 3)
            .map((set) => (
              <ProductCard key={set.id} product={set} locale={locale} />
            ))}
        </div>
      </section>

      {/* 9. BEAUTY JOURNAL PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Éditorial
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
              {t.home.journalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-espresso-muted mt-1">
              {t.home.journalSubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/journal`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-espresso hover:text-rose-dusty transition-colors group"
          >
            <span>{t.home.viewAllArticles}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/${locale}/journal/${art.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden bg-pearl-white border border-rose-border/40 hover:border-rose-dusty shadow-subtle hover:shadow-card transition-all"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-rose-mist/40">
                <Image
                  src={art.coverImage}
                  alt={art.title[locale] || art.title.fr}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-pearl-white/90 backdrop-blur-md text-[10px] font-semibold text-espresso uppercase tracking-wider">
                  {art.category[locale] || art.category.fr}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] text-espresso-muted">
                    {art.readTimeMinutes} min de lecture
                  </span>
                  <h3 className="font-editorial text-xl font-medium text-espresso group-hover:text-rose-deep transition-colors line-clamp-2 leading-snug">
                    {art.title[locale] || art.title.fr}
                  </h3>
                  <p className="text-xs text-espresso-muted line-clamp-2 leading-relaxed">
                    {art.excerpt[locale] || art.excerpt.fr}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-deep group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform pt-2">
                  <span>{t.home.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

