'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatDate } from '@/lib/utils';
import { INITIAL_ARTICLES } from '@/data/articles';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function JournalPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-12">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-mist text-rose-deep text-xs font-semibold uppercase tracking-wider border border-rose-border">
          <BookOpen className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Édition Botanique</span>
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-espresso">
          {t.home.journalTitle}
        </h1>
        <p className="text-sm text-espresso-muted leading-relaxed">
          {t.home.journalSubtitle}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/journal/${article.slug}`}
            className="group flex flex-col rounded-3xl overflow-hidden bg-pearl-white border border-rose-border/40 hover:border-rose-dusty shadow-subtle hover:shadow-card transition-all"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-rose-mist/40">
              <Image
                src={article.coverImage}
                alt={article.title[locale] || article.title.fr}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 start-4 px-3 py-1 rounded-full bg-pearl-white/90 backdrop-blur-md text-[10px] font-semibold text-espresso uppercase tracking-wider">
                {article.category[locale] || article.category.fr}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-espresso-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} min de lecture</span>
                  </span>
                  <span>•</span>
                  <span>{formatDate(article.publishedAt, locale)}</span>
                </div>

                <h2 className="font-editorial text-xl sm:text-2xl font-medium text-espresso group-hover:text-rose-deep transition-colors line-clamp-2 leading-snug">
                  {article.title[locale] || article.title.fr}
                </h2>

                <p className="text-xs text-espresso-muted line-clamp-3 leading-relaxed">
                  {article.excerpt[locale] || article.excerpt.fr}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-rose-border/30">
                <span className="text-[11px] text-espresso-muted font-medium">
                  Par {article.author}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-deep group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{t.home.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

