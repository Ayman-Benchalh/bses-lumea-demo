'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatDate } from '@/lib/utils';
import { INITIAL_ARTICLES } from '@/data/articles';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/product/ProductCard';
import { Clock, ArrowLeft, Share2, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

export default function ArticleReaderPage({ params: { locale, slug } }: Props) {
  const t = getTranslations(locale);
  const { products } = useStore();

  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  // Recommended products for this article
  const relatedSkincare = products.filter((p) => p.category === 'skincare').slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-espresso-muted">
        <Link href={`/${locale}`} className="hover:text-espresso transition-colors">
          {t.nav.home}
        </Link>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
        <Link href={`/${locale}/journal`} className="hover:text-espresso transition-colors">
          {t.nav.journal}
        </Link>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
        <span className="text-espresso font-medium truncate max-w-[200px]">
          {article.title[locale] || article.title.fr}
        </span>
      </nav>

      {/* Header */}
      <div className="space-y-4 text-center sm:text-start">
        <span className="inline-block px-3 py-1 rounded-full bg-rose-mist text-rose-deep text-xs font-semibold uppercase tracking-wider border border-rose-border">
          {article.category[locale] || article.category.fr}
        </span>

        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-espresso leading-tight">
          {article.title[locale] || article.title.fr}
        </h1>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-espresso-muted pt-2 border-b border-rose-border/30 pb-4">
          <span>Par {article.author}</span>
          <span>•</span>
          <span>Publié le {formatDate(article.publishedAt, locale)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTimeMinutes} min de lecture</span>
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-rose-mist/40 shadow-card border border-rose-border">
        <Image
          src={article.coverImage}
          alt={article.title[locale] || article.title.fr}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Excerpt Lead */}
      <p className="text-base sm:text-lg text-rose-deep font-medium leading-relaxed italic border-s-4 border-rose-dusty ps-4 my-6">
        {article.excerpt[locale] || article.excerpt.fr}
      </p>

      {/* Body Content */}
      <div className="prose prose-espresso max-w-none text-espresso/90 text-sm sm:text-base leading-relaxed space-y-6">
        {(article.content[locale] || article.content.fr)
          .split('\n\n')
          .map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-editorial text-2xl font-semibold text-espresso pt-4 mt-6 border-t border-rose-border/20"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-rose-border/30 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty me-2">
          Thématiques :
        </span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-sand-light/60 text-espresso text-xs font-medium border border-rose-border/30"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Recommended Care Grid */}
      <div className="pt-12 border-t border-rose-border/40 space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
            Dans la même inspiration
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-espresso">
            Soins Recommandés par nos Formulateurs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedSkincare.map((prod) => (
            <ProductCard key={prod.id} product={prod} locale={locale} />
          ))}
        </div>
      </div>
    </article>
  );
}

