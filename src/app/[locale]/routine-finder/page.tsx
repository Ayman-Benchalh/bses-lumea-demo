'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Product, RoutineFinderAnswers, SkinConcern } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  ShoppingBag,
  Sun,
  Moon,
  Droplets,
  Flame,
  Layers,
  Shield,
  Info,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function RoutineFinderPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const { products, addToCart, setRoutineAnswers } = useStore();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<RoutineFinderAnswers>({
    concern: 'dullness',
    complexity: 'balanced',
    preferences: {
      texture: 'any',
      fragranceFree: false,
      minimalist: false,
    },
    budget: 'mid',
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [allAdded, setAllAdded] = useState<boolean>(false);

  // Deterministic Recommendation Engine
  const recommendation = React.useMemo(() => {
    // Only skincare products
    const skincare = products.filter((p) => p.category === 'skincare' && p.stock > 0);

    // Filter by concern match or fallback to versatile
    let matched = skincare.filter((p) =>
      p.skinConcern?.includes(answers.concern)
    );
    if (matched.length === 0) {
      matched = skincare;
    }

    // Sort by rating & best seller
    matched.sort((a, b) => b.rating - a.rating);

    // Group by routine step: Cleanse, Tone, Treat, Moisturize, Protect
    const cleansers = skincare.filter((p) => p.routineStep === 'cleanse');
    const tonics = skincare.filter((p) => p.routineStep === 'tone');
    const treatments = skincare.filter((p) => p.routineStep === 'treat');
    const moisturizers = skincare.filter((p) => p.routineStep === 'moisturize');
    const sunscreens = skincare.filter((p) => p.routineStep === 'protect');

    const morningRoutine: Product[] = [];
    const eveningRoutine: Product[] = [];

    if (answers.complexity === 'essential') {
      // 2 products: Treatment or Moisturizer + Sunscreen
      const bestTreat =
        treatments.find((p) => p.skinConcern?.includes(answers.concern)) || treatments[0];
      const bestMoist =
        moisturizers.find((p) => p.skinConcern?.includes(answers.concern)) || moisturizers[0];
      const spf = sunscreens[0];

      if (bestTreat) morningRoutine.push(bestTreat);
      if (spf) morningRoutine.push(spf);
      if (bestMoist) eveningRoutine.push(bestMoist);
    } else if (answers.complexity === 'balanced') {
      // 3-4 products: Cleanser + Treatment + Moisturizer + Sunscreen
      const cleanser = cleansers[0];
      const tonic = tonics[0];
      const treat =
        treatments.find((p) => p.skinConcern?.includes(answers.concern)) || treatments[0];
      const moist =
        moisturizers.find((p) => p.skinConcern?.includes(answers.concern)) || moisturizers[0];
      const spf = sunscreens[0];

      if (cleanser) {
        morningRoutine.push(cleanser);
        eveningRoutine.push(cleanser);
      }
      if (tonic) morningRoutine.push(tonic);
      if (treat) {
        morningRoutine.push(treat);
        eveningRoutine.push(treat);
      }
      if (moist) eveningRoutine.push(moist);
      if (spf) morningRoutine.push(spf);
    } else {
      // Complete: 4-5 products: Cleanser + Tonic + Serum + Cream + Oil/Mask + SPF
      const cleanser = cleansers[0];
      const tonic = tonics[0];
      const treat =
        treatments.find((p) => p.skinConcern?.includes(answers.concern)) || treatments[0];
      const moist =
        moisturizers.find((p) => p.skinConcern?.includes(answers.concern)) || moisturizers[0];
      const spf = sunscreens[0];
      const nightTreat =
        skincare.find((p) => p.id === 'lumea-sk-04' || p.id === 'lumea-sk-09') || moist;

      if (cleanser) {
        morningRoutine.push(cleanser);
        eveningRoutine.push(cleanser);
      }
      if (tonic) {
        morningRoutine.push(tonic);
        eveningRoutine.push(tonic);
      }
      if (treat) morningRoutine.push(treat);
      if (moist) morningRoutine.push(moist);
      if (spf) morningRoutine.push(spf);
      if (nightTreat) eveningRoutine.push(nightTreat);
    }

    // Deduplicate unique recommended products
    const uniqueProducts: Product[] = [];
    [...morningRoutine, ...eveningRoutine].forEach((p) => {
      if (!uniqueProducts.some((item) => item.id === p.id)) {
        uniqueProducts.push(p);
      }
    });

    const totalEstimate = uniqueProducts.reduce(
      (sum, p) => sum + (p.discountPriceMad ?? p.priceMad),
      0
    );

    return {
      morningRoutine,
      eveningRoutine,
      uniqueProducts,
      totalEstimate,
    };
  }, [answers, products]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      setRoutineAnswers(answers);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAddAllToCart = () => {
    recommendation.uniqueProducts.forEach((prod) => {
      addToCart(prod);
    });
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2500);
  };

  const handleRestart = () => {
    setStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      {!isCompleted ? (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-mist text-rose-deep text-xs font-semibold uppercase tracking-wider border border-rose-border">
              <Compass className="w-3.5 h-3.5 text-rose-dusty" />
              <span>Étape {step} sur 4</span>
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-espresso">
              {t.routineFinder.title}
            </h1>
            <p className="text-xs sm:text-sm text-espresso-muted max-w-lg mx-auto">
              {t.routineFinder.subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-sand-light rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-rose-dusty h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Wizard Step Cards */}
          <div className="p-6 sm:p-10 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-6">
            {/* STEP 1: CONCERN */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="font-editorial text-2xl font-medium text-espresso">
                    {t.routineFinder.step1Title}
                  </h2>
                  <p className="text-xs text-espresso-muted">
                    {t.routineFinder.step1Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { key: 'dullness', title: t.concerns.dullness, desc: 'Teint fatigué, manque d\'éclat, taches légères' },
                    { key: 'dryness', title: t.concerns.dryness, desc: 'Tiraillements, desquamation, inconfort cutané' },
                    { key: 'oiliness', title: t.concerns.oiliness, desc: 'Brillances, excès de sébum, pores obstrués' },
                    { key: 'texture', title: t.concerns.texture, desc: 'Grain irrégulier, pores dilatés, rugosités' },
                    { key: 'antiaging', title: t.concerns.antiaging, desc: 'Perte de fermeté, ridules de déshydratation' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setAnswers({ ...answers, concern: item.key as SkinConcern })}
                      className={`p-4 rounded-2xl border text-start transition-all ${
                        answers.concern === item.key
                          ? 'bg-rose-mist/80 border-rose-dusty shadow-sm'
                          : 'bg-sand-light/40 border-rose-border/40 hover:bg-rose-mist/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-espresso">
                          {item.title}
                        </span>
                        {answers.concern === item.key && (
                          <Check className="w-4 h-4 text-rose-deep" />
                        )}
                      </div>
                      <p className="text-xs text-espresso-muted">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: COMPLEXITY */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="font-editorial text-2xl font-medium text-espresso">
                    {t.routineFinder.step2Title}
                  </h2>
                  <p className="text-xs text-espresso-muted">
                    {t.routineFinder.step2Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    {
                      key: 'essential',
                      title: t.routineFinder.step2Essential,
                      desc: '2 à 3 soins fondamentaux pour aller droit au but sans perte de temps.',
                    },
                    {
                      key: 'balanced',
                      title: t.routineFinder.step2Balanced,
                      desc: '3 à 4 étapes complémentaires alliant nettoyage, soin ciblé et protection.',
                    },
                    {
                      key: 'complete',
                      title: t.routineFinder.step2Complete,
                      desc: 'Le rituel palace en 5 étapes pour une métamorphose sensorielle totale.',
                    },
                  ].map((comp) => (
                    <button
                      key={comp.key}
                      onClick={() => setAnswers({ ...answers, complexity: comp.key as any })}
                      className={`p-5 rounded-2xl border text-start flex flex-col justify-between transition-all ${
                        answers.complexity === comp.key
                          ? 'bg-rose-mist/80 border-rose-dusty shadow-sm'
                          : 'bg-sand-light/40 border-rose-border/40 hover:bg-rose-mist/30'
                      }`}
                    >
                      <div className="space-y-1 mb-3">
                        <span className="font-semibold text-sm text-espresso block">
                          {comp.title}
                        </span>
                        <p className="text-xs text-espresso-muted leading-relaxed">
                          {comp.desc}
                        </p>
                      </div>
                      {answers.complexity === comp.key && (
                        <div className="flex justify-end">
                          <Check className="w-4 h-4 text-rose-deep" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: PREFERENCES & TEXTURE */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="font-editorial text-2xl font-medium text-espresso">
                    {t.routineFinder.step3Title}
                  </h2>
                  <p className="text-xs text-espresso-muted">
                    {t.routineFinder.step3Desc}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { key: 'light', label: t.routineFinder.textureLight },
                    { key: 'rich', label: t.routineFinder.textureRich },
                    { key: 'any', label: t.routineFinder.textureAny },
                  ].map((tex) => (
                    <button
                      key={tex.key}
                      onClick={() =>
                        setAnswers({
                          ...answers,
                          preferences: { ...answers.preferences, texture: tex.key as any },
                        })
                      }
                      className={`w-full p-4 rounded-xl border text-start flex items-center justify-between text-xs sm:text-sm font-medium transition-all ${
                        answers.preferences.texture === tex.key
                          ? 'bg-rose-mist border-rose-dusty text-espresso font-semibold'
                          : 'bg-sand-light/40 border-rose-border/40 text-espresso hover:bg-rose-mist/30'
                      }`}
                    >
                      <span>{tex.label}</span>
                      {answers.preferences.texture === tex.key && (
                        <Check className="w-4 h-4 text-rose-deep" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: BUDGET */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="font-editorial text-2xl font-medium text-espresso">
                    {t.routineFinder.step4Title}
                  </h2>
                  <p className="text-xs text-espresso-muted">
                    {t.routineFinder.step4Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    {
                      key: 'essential',
                      title: t.routineFinder.budgetEssential,
                      desc: 'Sélection optimisée pour une haute efficacité au prix le plus doux.',
                    },
                    {
                      key: 'mid',
                      title: t.routineFinder.budgetMid,
                      desc: 'L\'équilibre parfait combinant nos sérums et crèmes phares.',
                    },
                    {
                      key: 'premium',
                      title: t.routineFinder.budgetPremium,
                      desc: 'Les soins les plus précieux et concentrés pour une expérience d\'exception.',
                    },
                  ].map((b) => (
                    <button
                      key={b.key}
                      onClick={() => setAnswers({ ...answers, budget: b.key as any })}
                      className={`p-5 rounded-2xl border text-start flex flex-col justify-between transition-all ${
                        answers.budget === b.key
                          ? 'bg-rose-mist/80 border-rose-dusty shadow-sm'
                          : 'bg-sand-light/40 border-rose-border/40 hover:bg-rose-mist/30'
                      }`}
                    >
                      <div className="space-y-1 mb-3">
                        <span className="font-semibold text-sm text-espresso block">
                          {b.title}
                        </span>
                        <p className="text-xs text-espresso-muted leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                      {answers.budget === b.key && (
                        <div className="flex justify-end">
                          <Check className="w-4 h-4 text-rose-deep" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wizard Controls */}
            <div className="pt-6 border-t border-rose-border/40 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-rose-border text-xs font-semibold text-espresso hover:bg-rose-mist transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>Précédent</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-xs sm:text-sm font-semibold transition-all shadow-card hover:scale-105 active:scale-95"
              >
                <span>{step === 4 ? 'Révéler ma Routine' : 'Continuer'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS VIEW */
        <div className="space-y-10 animate-fade-in">
          {/* Result Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Diagnostic Validé</span>
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-espresso">
              {t.routineFinder.resultTitle}
            </h1>
            <p className="text-xs sm:text-sm text-espresso-muted max-w-lg mx-auto">
              {t.routineFinder.resultSubtitle}
            </p>
          </div>

          {/* Explanation Callout */}
          <div className="p-5 rounded-2xl bg-rose-mist/50 border border-rose-border flex items-start gap-3">
            <Info className="w-5 h-5 text-rose-dusty shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-espresso block">
                {t.routineFinder.whyThisRoutine}
              </span>
              <p className="text-espresso-muted leading-relaxed">
                {t.routineFinder.whyText}
              </p>
            </div>
          </div>

          {/* Morning Ritual Sequence */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-rose-deep font-semibold text-sm">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>{t.routineFinder.morningRoutine}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendation.morningRoutine.map((product, idx) => (
                <div
                  key={`am-${product.id}-${idx}`}
                  className="p-4 rounded-2xl bg-pearl-white border border-rose-border/50 shadow-subtle flex flex-col justify-between"
                >
                  <div className="flex gap-3 items-center mb-3">
                    <span className="w-6 h-6 rounded-full bg-rose-mist text-rose-deep font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-dusty">
                      Étape {idx + 1} : {product.routineStep}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name[locale] || product.name.fr}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${locale}/product/${product.slug}`}
                        className="text-xs font-semibold text-espresso hover:text-rose-deep truncate block"
                      >
                        {product.name[locale] || product.name.fr}
                      </Link>
                      <p className="text-[11px] text-espresso-muted truncate">
                        {product.volume}
                      </p>
                      <p className="text-xs font-bold text-espresso mt-1">
                        {formatPrice(product.discountPriceMad ?? product.priceMad, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Ritual Sequence */}
          <div className="space-y-4 pt-4 border-t border-rose-border/30">
            <div className="flex items-center gap-2 text-rose-deep font-semibold text-sm">
              <Moon className="w-5 h-5 text-indigo-500" />
              <span>{t.routineFinder.eveningRoutine}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendation.eveningRoutine.map((product, idx) => (
                <div
                  key={`pm-${product.id}-${idx}`}
                  className="p-4 rounded-2xl bg-pearl-white border border-rose-border/50 shadow-subtle flex flex-col justify-between"
                >
                  <div className="flex gap-3 items-center mb-3">
                    <span className="w-6 h-6 rounded-full bg-sand-warm text-espresso font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-dusty">
                      Étape {idx + 1} : {product.routineStep}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name[locale] || product.name.fr}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/${locale}/product/${product.slug}`}
                        className="text-xs font-semibold text-espresso hover:text-rose-deep truncate block"
                      >
                        {product.name[locale] || product.name.fr}
                      </Link>
                      <p className="text-[11px] text-espresso-muted truncate">
                        {product.volume}
                      </p>
                      <p className="text-xs font-bold text-espresso mt-1">
                        {formatPrice(product.discountPriceMad ?? product.priceMad, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Routine Summary Box & Add All to Cart CTA */}
          <div className="p-6 sm:p-8 rounded-3xl bg-espresso text-pearl-white shadow-floating flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-start">
              <span className="text-xs uppercase tracking-wider text-sand-warm font-semibold">
                {t.routineFinder.totalPrice}
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-editorial">
                {formatPrice(recommendation.totalEstimate, locale)}
              </div>
              <p className="text-xs text-pearl-white/70">
                {recommendation.uniqueProducts.length} soins botaniques complémentaires
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-pearl-white/20 text-xs font-semibold hover:bg-pearl-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.routineFinder.restartFinder}</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-card hover:scale-105 active:scale-95 ${
                  allAdded
                    ? 'bg-semantic-success text-pearl-white'
                    : 'bg-sand-warm hover:bg-sand-light text-espresso'
                }`}
              >
                {allAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.routineFinder.allAddedSuccess}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.routineFinder.addAllToCart}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

