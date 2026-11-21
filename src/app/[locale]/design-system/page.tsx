'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  Check,
  AlertCircle,
  Info,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Palette,
  Type,
  Layout,
  MousePointer,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function DesignSystemPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);

  const [activeTab, setActiveTab] = useState<'tokens' | 'buttons' | 'forms' | 'cards' | 'feedback' | 'm3'>('tokens');
  const [testInput, setTestInput] = useState('');
  const [testError, setTestError] = useState(false);
  const [selectedChip, setSelectedChip] = useState('all');

  const brandColors = [
    { name: 'Rose Mist', hex: '#F7E9E5', role: 'Surface secondaire, arrière-plans doux, carrousels', textColor: '#43322F' },
    { name: 'Dusty Rose', hex: '#C78D9D', role: 'Accent signature, reflets, CTA secondaires, focus ring', textColor: '#FFFDFC' },
    { name: 'Warm Sand', hex: '#EEE2D0', role: 'Surfaces neutres chaleureuses, séparateurs, boutons secondaires', textColor: '#43322F' },
    { name: 'Espresso', hex: '#43322F', role: 'Texte primaire, titres éditoriaux, CTA dominants, contrastes forts', textColor: '#FFFDFC' },
    { name: 'Pearl White', hex: '#FFFDFC', role: 'Surface d\'application principale, cartes produits, fonds immaculés', textColor: '#43322F' },
    { name: 'Sage Accent', hex: '#9CAC9C', role: 'Notes botaniques, certifications éthiques, fraîcheur végétale', textColor: '#FFFDFC' },
  ];

  const semanticColors = [
    { name: 'Success', hex: '#2E7D32', bg: '#E8F5E9', role: 'Validation de commande, ajouts au panier réussis' },
    { name: 'Warning', hex: '#ED6C02', bg: '#FFF3E0', role: 'Alerte stock faible (≤ 5 unités), avertissements' },
    { name: 'Error', hex: '#D32F2F', bg: '#FFEBEE', role: 'Erreurs de validation de formulaire, rupture' },
    { name: 'Information', hex: '#0288D1', bg: '#E1F5FE', role: 'Notes pédagogiques, avis de livraison' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-start border-b border-rose-border/40 pb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sand-warm text-espresso text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Material Design 3 & Brand Tokens</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-espresso">
          LUMÉA Design System Showcase
        </h1>
        <p className="text-sm text-espresso-muted max-w-2xl leading-relaxed">
          Spécifications exhaustives de l'architecture visuelle LUMÉA, conformes aux standards Material Design 3 (M3) pour l'ergonomie, la mesure tactile (48×48px) et le contraste d'accessibilité WCAG 2.2 AA.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-rose-border/40 overflow-x-auto gap-2 sm:gap-6 pb-2">
        {[
          { key: 'tokens', label: '1. Couleurs & Typo', icon: Palette },
          { key: 'buttons', label: '2. Boutons & Cibles M3', icon: MousePointer },
          { key: 'forms', label: '3. Formulaires & États', icon: Type },
          { key: 'cards', label: '4. Composants Produits', icon: Layout },
          { key: 'feedback', label: '5. Retours & Toasts', icon: AlertCircle },
          { key: 'm3', label: '6. Métriques & Touch Targets', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-espresso text-pearl-white shadow-sm'
                  : 'text-espresso-muted hover:text-espresso hover:bg-rose-mist/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: TOKENS */}
      {activeTab === 'tokens' && (
        <div className="space-y-10 animate-fade-in">
          {/* Primary Palette */}
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Palette Chromatique Signature
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandColors.map((color) => (
                <div
                  key={color.name}
                  className="rounded-3xl p-5 border border-rose-border/40 shadow-subtle flex flex-col justify-between h-44"
                  style={{ backgroundColor: color.hex, color: color.textColor }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-editorial text-xl font-semibold">
                      {color.name}
                    </span>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-black/10 backdrop-blur-sm">
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed font-sans">
                    {color.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Couleurs Sémantiques & États Fonctionnels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {semanticColors.map((sem) => (
                <div
                  key={sem.name}
                  className="rounded-2xl p-4 border shadow-subtle space-y-2"
                  style={{ backgroundColor: sem.bg, borderColor: `${sem.hex}30` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs" style={{ color: sem.hex }}>
                      {sem.name}
                    </span>
                    <span className="font-mono text-[11px] font-semibold" style={{ color: sem.hex }}>
                      {sem.hex}
                    </span>
                  </div>
                  <p className="text-xs text-espresso-muted leading-relaxed">
                    {sem.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Échelle Typographique Bilingue (Serif / Sans / Arabe)
            </h2>
            <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-rose-dusty">Display Hero (48px - 64px)</span>
                <p className="font-editorial text-4xl sm:text-5xl font-medium text-espresso">
                  LUMÉA — Votre éclat, votre rituel.
                </p>
              </div>

              <div className="space-y-1 border-t border-rose-border/30 pt-4">
                <span className="text-[10px] uppercase font-mono text-rose-dusty">Title Large (28px - 32px)</span>
                <p className="font-editorial text-2xl sm:text-3xl font-medium text-espresso">
                  Les Essentiels Botaniques de l'Atlas
                </p>
              </div>

              <div className="space-y-1 border-t border-rose-border/30 pt-4">
                <span className="text-[10px] uppercase font-mono text-rose-dusty">Body Medium (14px - 16px)</span>
                <p className="text-sm text-espresso-muted leading-relaxed max-w-xl">
                  Formulée pour régénérer la barrière hydrolipidique, repulper les ridules et apaiser les sensations de tiraillement grâce à la synergie du squalane et des céramides.
                </p>
              </div>

              <div className="space-y-1 border-t border-rose-border/30 pt-4" dir="rtl">
                <span className="text-[10px] uppercase font-mono text-rose-dusty">Typography Arabic (النص العربي المتناسق)</span>
                <p className="text-xl font-bold text-espresso font-sans">
                  لوميا — طقوس جمالية حسية نقية تحتفي بكنوز الطبيعة المغربية.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: BUTTONS & TARGETS */}
      {activeTab === 'buttons' && (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Boutons & États Interactifs
            </h2>
            <p className="text-xs text-espresso-muted">
              Conçus selon les directives Material Design 3 : cible de contact minimale 48×48px pour éviter les erreurs de manipulation sur mobile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle">
            {/* Primary Filled */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                Bouton Primaire (Filled)
              </span>
              <button className="w-full touch-target py-3.5 px-6 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-xs font-semibold shadow-card hover:scale-[1.02] active:scale-[0.98] transition-all">
                Commander (Filled)
              </button>
              <button disabled className="w-full touch-target py-3.5 px-6 rounded-full bg-espresso/40 text-pearl-white/60 text-xs font-semibold cursor-not-allowed">
                Désactivé
              </button>
            </div>

            {/* Secondary Tonal */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                Secondaire (Tonal)
              </span>
              <button className="w-full touch-target py-3.5 px-6 rounded-full bg-sand-warm hover:bg-sand-light text-espresso text-xs font-semibold transition-all">
                Explorer (Tonal)
              </button>
              <button className="w-full touch-target py-3.5 px-6 rounded-full bg-rose-mist hover:bg-rose-mist/80 text-rose-deep text-xs font-semibold border border-rose-border transition-all">
                Rituel (Rose Mist)
              </button>
            </div>

            {/* Outlined */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                Contour (Outlined)
              </span>
              <button className="w-full touch-target py-3.5 px-6 rounded-full border border-rose-border hover:border-rose-dusty text-espresso text-xs font-semibold hover:bg-rose-mist/20 transition-all">
                Voir Détails
              </button>
              <button className="w-full touch-target py-3.5 px-6 rounded-full border border-espresso text-espresso text-xs font-semibold hover:bg-espresso hover:text-pearl-white transition-all">
                Contour Foncé
              </button>
            </div>

            {/* Floating Action Button (FAB) & Icon Buttons */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
                Icon Buttons (48×48px)
              </span>
              <div className="flex items-center gap-3">
                <button className="touch-target w-12 h-12 rounded-full bg-espresso text-sand-warm hover:scale-110 active:scale-95 shadow-card transition-all flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </button>
                <button className="touch-target w-12 h-12 rounded-full border border-rose-border bg-pearl-white text-rose-deep hover:bg-rose-mist hover:scale-110 active:scale-95 shadow-sm transition-all flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-rose-deep" />
                </button>
                <button className="touch-target w-12 h-12 rounded-full bg-rose-mist text-espresso hover:bg-rose-dusty hover:text-pearl-white transition-all flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: FORMS */}
      {activeTab === 'forms' && (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Contrôles de Formulaire & Validation
            </h2>
            <p className="text-xs text-espresso-muted">
              Composants formulaires aux états normaux, focus avec anneau accessible, et messages d'erreur explicites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle">
            {/* Standard Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Champ Texte Normal
              </label>
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Exemple : Sérum Botanique"
                className="w-full px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty focus:ring-2 focus:ring-rose-dusty/30"
              />
            </div>

            {/* Error Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-espresso">
                  Champ avec Erreur de Validation
                </label>
                <button
                  onClick={() => setTestError(!testError)}
                  className="text-[11px] text-rose-deep underline"
                >
                  Basculer l'état
                </button>
              </div>
              <input
                type="text"
                defaultValue="+212 555 12 34 56"
                className={`w-full px-4 py-3 rounded-xl bg-sand-light/50 border text-xs text-espresso focus:outline-none ${
                  testError
                    ? 'border-semantic-error focus:ring-2 focus:ring-semantic-error/30'
                    : 'border-rose-border'
                }`}
              />
              {testError && (
                <p className="text-[11px] text-semantic-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Numéro de mobile marocain invalide</span>
                </p>
              )}
            </div>

            {/* Dropdown Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Sélecteur Déroulant
              </label>
              <div className="relative">
                <select className="w-full appearance-none px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty cursor-pointer">
                  <option>Casablanca (24h ouvrées)</option>
                  <option>Rabat (24h ouvrées)</option>
                  <option>Marrakech (48h ouvrées)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute end-3 top-1/2 -translate-y-1/2 text-espresso-muted pointer-events-none" />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso block">
                Chips de Sélection (Filter Chips)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['all', 'hydratation', 'eclat', 'anti-age'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setSelectedChip(chip)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedChip === chip
                        ? 'bg-rose-dusty text-pearl-white border-rose-dusty shadow-sm'
                        : 'bg-sand-light/50 border-rose-border text-espresso hover:bg-rose-mist'
                    }`}
                  >
                    #{chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: PRODUCT CARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Composants Cartes Produits & Badges
            </h2>
            <p className="text-xs text-espresso-muted">
              Composants de vitrine optimisés avec badges de stock, prix en MAD et actions rapides accessibles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card Preview 1 */}
            <div className="rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle overflow-hidden p-4 space-y-3">
              <div className="relative aspect-[4/5] rounded-2xl bg-rose-mist/40 flex items-center justify-center text-rose-dusty">
                <span className="font-editorial text-xl font-medium">Sérum Éclat</span>
                <span className="absolute top-2 start-2 px-2.5 py-0.5 rounded-full bg-rose-deep text-pearl-white text-[10px] font-bold">
                  -15%
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-rose-dusty uppercase">Sérum</span>
                <h3 className="font-editorial text-base font-medium text-espresso">
                  Éclat Botanique 30ml
                </h3>
                <p className="text-xs font-bold text-espresso">340 MAD</p>
              </div>
            </div>

            {/* Card Preview 2 */}
            <div className="rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle overflow-hidden p-4 space-y-3">
              <div className="relative aspect-[4/5] rounded-2xl bg-sand-warm/30 flex items-center justify-center text-espresso-muted">
                <span className="font-editorial text-xl font-medium">Parfum Ambre</span>
                <span className="absolute top-2 start-2 px-2.5 py-0.5 rounded-full bg-espresso text-sand-warm text-[10px] font-semibold">
                  Best-Seller
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-rose-dusty uppercase">Eau de Parfum</span>
                <h3 className="font-editorial text-base font-medium text-espresso">
                  Ambre de l'Atlas 100ml
                </h3>
                <p className="text-xs font-bold text-espresso">680 MAD</p>
              </div>
            </div>

            {/* Card Preview 3 */}
            <div className="rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle overflow-hidden p-4 space-y-3">
              <div className="relative aspect-[4/5] rounded-2xl bg-rose-mist/30 flex items-center justify-center text-rose-deep">
                <span className="font-editorial text-xl font-medium">Coffret Spa</span>
                <span className="absolute top-2 start-2 px-2.5 py-0.5 rounded-full bg-sand-warm text-espresso text-[10px] font-semibold">
                  Coffret Cadeau
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-rose-dusty uppercase">Hammam</span>
                <h3 className="font-editorial text-base font-medium text-espresso">
                  Spa Marocain Prestige
                </h3>
                <p className="text-xs font-bold text-espresso">740 MAD</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: FEEDBACK & TOASTS */}
      {activeTab === 'feedback' && (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Messages de Notification & Retours Fonctionnels
            </h2>
          </div>

          <div className="space-y-3 max-w-2xl">
            {/* Success */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 shadow-sm">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">Action Réussie :</span>
                <span>Produit ajouté à votre panier avec succès !</span>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold block">Alerte d'Inventaire :</span>
                <span>Plus que 3 exemplaires disponibles en stock pour ce flacon.</span>
              </div>
            </div>

            {/* Error */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold block">Code Promotionnel Invalide :</span>
                <span>Ce coupon nécessite un montant de commande minimum de 500 MAD.</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 shadow-sm">
              <Info className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="font-bold block">Démonstration Technique :</span>
                <span>Aucune transaction réelle n'est effectuée sur ce portfolio.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: M3 SPECIFICATIONS */}
      {activeTab === 'm3' && (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Métriques Material Design 3 (M3)
            </h2>
            <p className="text-xs text-espresso-muted">
              Grille basée sur le pas de 4px / 8px et cibles tactiles confortables de 48×48px.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-3">
              <span className="text-xs uppercase font-mono text-rose-dusty font-bold">
                Échelle d'Espacement 4px
              </span>
              <ul className="text-xs text-espresso-muted space-y-1.5">
                <li>• xs : 4px (p-1)</li>
                <li>• sm : 8px (p-2)</li>
                <li>• md : 16px (p-4)</li>
                <li>• lg : 24px (p-6)</li>
                <li>• xl : 32px (p-8)</li>
                <li>• 2xl : 48px (p-12)</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-3">
              <span className="text-xs uppercase font-mono text-rose-dusty font-bold">
                Rayons de Courbure (Radii)
              </span>
              <ul className="text-xs text-espresso-muted space-y-1.5">
                <li>• rounded-lg : 12px (inputs, dropdowns)</li>
                <li>• rounded-2xl : 16px (boutons, chips)</li>
                <li>• rounded-3xl : 24px - 32px (cartes, modales)</li>
                <li>• rounded-full : 9999px (badges, CTA)</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-3">
              <span className="text-xs uppercase font-mono text-rose-dusty font-bold">
                Cibles Tactiles Touch Target
              </span>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-rose-dusty flex items-center justify-center text-xs font-mono font-bold text-rose-deep">
                  48px
                </div>
                <p className="text-xs text-espresso-muted leading-relaxed">
                  Tous les boutons mobiles principaux respectent ou dépassent 48×48px.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

