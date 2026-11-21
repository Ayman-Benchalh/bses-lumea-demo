'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Product, Order, OrderStatus, Promotion, Bundle, ProductCategory } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice, formatDate } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Gift,
  Settings,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Eye,
  TrendingUp,
  DollarSign,
  X,
  ExternalLink,
  Save,
  Megaphone,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function AdminDemoPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const {
    products,
    orders,
    promotions,
    bundles,
    campaign,
    addProduct,
    updateProduct,
    deleteProduct,
    addPromotion,
    deletePromotion,
    addBundle,
    deleteBundle,
    updateCampaign,
    updateOrderStatus,
    resetDemoData,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'promotions' | 'bundles' | 'campaign' | 'orders' | 'settings'>('overview');

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dynamic KPI calculations from store
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalMad, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const totalItemsSold = orders.reduce(
    (sum, ord) => sum + ord.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // Lock body scroll and handle ESC key when any modal is open
  useEffect(() => {
    if (isAddProductOpen || editingProduct) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isAddProductOpen, editingProduct]);

  // New Product Draft Form State
  const [newProd, setNewProd] = useState<Partial<Product>>({
    name: { fr: '', en: '', ar: '' },
    subtitle: { fr: '', en: '', ar: '' },
    description: { fr: '', en: '', ar: '' },
    howToUse: { fr: '', en: '', ar: '' },
    ingredientsText: { fr: '', en: '', ar: '' },
    texture: { fr: '', en: '', ar: '' },
    category: 'skincare',
    productType: 'Sérum',
    priceMad: 350,
    stock: 20,
    volume: '50ml',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    featured: false,
    isNew: true,
    isBestSeller: false,
    isOnSale: false,
    keyBotanicals: { fr: ['Actif Botanique'], en: ['Botanical Active'], ar: ['مستخلص نباتي'] },
    tags: ['nouveau'],
    relatedProductIds: [],
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name?.fr || !newProd.priceMad) return;

    const slug = newProd.name.fr.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: Product = {
      ...(newProd as Product),
      id: `lumea-custom-${Date.now()}`,
      slug,
      rating: 5.0,
      reviewCount: 1,
      variants: [
        {
          id: `v-custom-${Date.now()}`,
          name: newProd.name,
          volume: newProd.volume || '50ml',
          priceMad: newProd.priceMad,
          sku: `LUM-CUSTOM-${Date.now().toString().slice(-4)}`,
          stock: newProd.stock || 20,
        },
      ],
    };

    addProduct(created);
    setIsAddProductOpen(false);
    showToast('Nouveau produit créé avec succès dans le catalogue !');
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    showToast('Produit mis à jour avec succès !');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-8">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-24 end-6 z-50 p-4 rounded-2xl bg-espresso text-pearl-white text-xs font-semibold shadow-floating flex items-center gap-2 animate-fade-in border border-rose-dusty/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Sandbox Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-rose-border/40 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-dusty animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-dusty">
              Console de Gestion LUMÉA
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso mt-1">
            {t.admin.title}
          </h1>
          <p className="text-xs text-espresso-muted">
            {t.admin.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/shop`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-rose-border bg-pearl-white text-xs font-semibold text-espresso hover:bg-rose-mist transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir la Boutique</span>
            <ExternalLink className="w-3 h-3 text-rose-dusty" />
          </Link>
        </div>
      </div>

      {/* Sandbox Warning Banner */}
      <div className="p-4 rounded-2xl bg-rose-mist/60 border border-rose-border text-xs text-espresso flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-rose-dusty shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.admin.sandboxNotice}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-rose-border/40 overflow-x-auto gap-2 pb-2">
        {[
          { key: 'overview', label: t.admin.tabs.dashboard, icon: LayoutDashboard },
          { key: 'products', label: t.admin.tabs.products.replace('{count}', products.length.toString()), icon: Package },
          { key: 'promotions', label: t.admin.tabs.promotions, icon: Tag },
          { key: 'bundles', label: t.admin.tabs.bundles, icon: Gift },
          { key: 'campaign', label: t.admin.tabs.campaign, icon: Megaphone },
          { key: 'orders', label: t.admin.tabs.orders.replace('{count}', orders.length.toString()), icon: ShoppingBag },
          { key: 'settings', label: t.admin.tabs.settings, icon: Settings },
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

      {/* 1. OVERVIEW TAB (KPIs + Recent Orders + Inventory) */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-2">
              <span className="text-[11px] font-semibold text-rose-dusty uppercase tracking-wider block">
                {t.admin.stats.revenue}
              </span>
              <p className="text-xl sm:text-2xl font-bold font-editorial text-espresso">
                {formatPrice(totalRevenue, locale)}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-2">
              <span className="text-[11px] font-semibold text-rose-dusty uppercase tracking-wider block">
                {t.admin.stats.orders}
              </span>
              <p className="text-xl sm:text-2xl font-bold font-editorial text-espresso">
                {totalOrdersCount}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-2">
              <span className="text-[11px] font-semibold text-rose-dusty uppercase tracking-wider block">
                {t.admin.stats.avgOrder}
              </span>
              <p className="text-xl sm:text-2xl font-bold font-editorial text-espresso">
                {formatPrice(avgOrderValue, locale)}
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-2">
              <span className="text-[11px] font-semibold text-rose-dusty uppercase tracking-wider block">
                {t.admin.stats.itemsSold}
              </span>
              <p className="text-xl sm:text-2xl font-bold font-editorial text-espresso">
                {totalItemsSold}
              </p>
            </div>

            <div className="col-span-2 lg:col-span-1 p-5 rounded-3xl bg-amber-50/80 border border-amber-200/80 shadow-subtle space-y-2">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                {t.admin.stats.lowStock}
              </span>
              <p className="text-xl sm:text-2xl font-bold font-editorial text-amber-900">
                {lowStockCount} alertes
              </p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-border/30">
              <h2 className="font-editorial text-xl font-medium text-espresso">
                Dernières Commandes Enregistrées
              </h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-rose-deep font-semibold hover:underline"
              >
                Gérer toutes les commandes ({orders.length})
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-rose-border/30 text-espresso-muted">
                    <th className="py-2.5 font-semibold text-start">Réf.</th>
                    <th className="py-2.5 font-semibold text-start">Client</th>
                    <th className="py-2.5 font-semibold text-start">Ville</th>
                    <th className="py-2.5 font-semibold text-start">Montant</th>
                    <th className="py-2.5 font-semibold text-start">Statut</th>
                    <th className="py-2.5 font-semibold text-start">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-border/20">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-sand-light/30 transition-colors">
                      <td className="py-3 font-mono font-bold text-rose-deep">
                        {ord.reference}
                      </td>
                      <td className="py-3 text-espresso font-medium">
                        {ord.customer.fullName}
                      </td>
                      <td className="py-3 text-espresso-muted">
                        {ord.customer.city}
                      </td>
                      <td className="py-3 font-semibold text-espresso">
                        {formatPrice(ord.totalMad, locale)}
                      </td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-sand-warm text-espresso">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 text-espresso-muted">
                        {formatDate(ord.createdAt, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT TAB (CRUD) */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Catalogue Produits ({products.length})
            </h2>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.admin.addProduct}</span>
            </button>
          </div>

          {/* Products Table (Desktop/Tablet) */}
          <div className="hidden md:block p-4 sm:p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-rose-border/30 text-espresso-muted">
                  <th className="py-3 font-semibold text-start">Visuel</th>
                  <th className="py-3 font-semibold text-start">{t.admin.productName}</th>
                  <th className="py-3 font-semibold text-start">{t.admin.productCategory}</th>
                  <th className="py-3 font-semibold text-start">{t.admin.productPrice}</th>
                  <th className="py-3 font-semibold text-start">{t.admin.productStock}</th>
                  <th className="py-3 font-semibold text-end">{t.admin.productActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-border/20">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-sand-light/30 transition-colors">
                    <td className="py-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                        {prod.images[0] && (
                          <Image
                            src={prod.images[0]}
                            alt={prod.name[locale] || prod.name.fr}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-espresso block">
                        {prod.name[locale] || prod.name.fr}
                      </span>
                      <span className="text-[11px] text-espresso-muted">
                        {prod.volume}
                      </span>
                    </td>
                    <td className="py-3 uppercase text-[10px] font-semibold text-rose-dusty">
                      {prod.category}
                    </td>
                    <td className="py-3 font-bold text-espresso">
                      {prod.discountPriceMad ? (
                        <div>
                          <span className="text-rose-deep font-bold">
                            {prod.discountPriceMad} MAD
                          </span>
                          <span className="text-espresso-muted line-through ms-1.5 text-[10px]">
                            {prod.priceMad} MAD
                          </span>
                        </div>
                      ) : (
                        `${prod.priceMad} MAD`
                      )}
                    </td>
                    <td className="py-3">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                          prod.stock <= 5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {prod.stock} en stock
                      </span>
                    </td>
                    <td className="py-3 text-end space-x-1 rtl:space-x-reverse">
                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="p-1.5 rounded-lg text-espresso hover:bg-rose-mist transition-colors"
                        title={t.admin.editProduct}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(t.admin.deleteConfirm)) {
                            deleteProduct(prod.id);
                            showToast('Produit supprimé du catalogue');
                          }
                        }}
                        className="p-1.5 rounded-lg text-semantic-error hover:bg-rose-mist transition-colors"
                        title={t.admin.deleteProduct}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products Management Cards (Mobile) */}
          <div className="md:hidden space-y-3">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-pearl-white border border-rose-border/50 shadow-subtle space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                    {prod.images[0] && (
                      <Image
                        src={prod.images[0]}
                        alt={prod.name[locale] || prod.name.fr}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-espresso text-sm block truncate">
                      {prod.name[locale] || prod.name.fr}
                    </span>
                    <span className="text-[11px] text-espresso-muted block">
                      {prod.volume} • <span className="uppercase font-medium text-rose-dusty">{prod.category}</span>
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-xs text-espresso">
                        {prod.discountPriceMad ? `${prod.discountPriceMad} MAD` : `${prod.priceMad} MAD`}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${
                          prod.stock <= 5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {prod.stock} en stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-rose-border/20">
                  <button
                    onClick={() => setEditingProduct(prod)}
                    className="touch-target px-3 py-1.5 rounded-xl text-espresso bg-sand-warm/60 hover:bg-sand-warm text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(t.admin.deleteConfirm)) {
                        deleteProduct(prod.id);
                        showToast('Produit supprimé du catalogue');
                      }
                    }}
                    className="touch-target px-3 py-1.5 rounded-xl text-semantic-error bg-red-50 hover:bg-red-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PROMOTIONS TAB */}
      {activeTab === 'promotions' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-editorial text-2xl font-medium text-espresso">
            Codes Promotionnels & Campagnes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="p-5 rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-rose-deep px-3 py-1 rounded-xl bg-rose-mist border border-rose-border">
                    {promo.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    -{promo.discountPercent}%
                  </span>
                </div>
                <p className="text-xs text-espresso font-medium">
                  {promo.title[locale] || promo.title.fr}
                </p>
                <p className="text-[11px] text-espresso-muted">
                  Panier minimum : {promo.minSpendMad} MAD • Validité : {promo.validUntil}
                </p>
                <button
                  onClick={() => deletePromotion(promo.id)}
                  className="text-xs text-semantic-error hover:underline pt-2 block"
                >
                  Supprimer ce code
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BUNDLES & GIFT SETS TAB */}
      {activeTab === 'bundles' && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-editorial text-2xl font-medium text-espresso">
            Coffrets & Ensembles Cadeaux ({bundles.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bundles.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle space-y-3"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-rose-mist">
                  {b.image && (
                    <Image
                      src={b.image}
                      alt={b.name[locale] || b.name.fr}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="font-editorial text-lg font-medium text-espresso">
                  {b.name[locale] || b.name.fr}
                </h3>
                <p className="text-xs text-espresso-muted line-clamp-2">
                  {b.description[locale] || b.description.fr}
                </p>
                <div className="flex items-baseline gap-2 pt-2 border-t border-rose-border/30">
                  <span className="font-bold text-base text-espresso">
                    {b.priceMad} MAD
                  </span>
                  <span className="text-xs text-espresso-muted line-through">
                    {b.regularPriceMad} MAD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HOMEPAGE CAMPAIGN MANAGER TAB */}
      {activeTab === 'campaign' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-6 animate-fade-in">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Gestionnaire de Campagnes & Bannières
            </h2>
            <p className="text-xs text-espresso-muted">
              Modifiez le texte d'accroche du hero et de la barre d'annonces. Les changements se répercutent en temps réel sur la page d'accueil.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Message de la barre d'annonce (Français)
              </label>
              <input
                type="text"
                defaultValue={campaign.announcementText.fr}
                onBlur={(e) =>
                  updateCampaign({
                    announcementText: {
                      ...campaign.announcementText,
                      fr: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Titre Principal du Hero (Français)
              </label>
              <input
                type="text"
                defaultValue={campaign.heroTitle.fr}
                onBlur={(e) =>
                  updateCampaign({
                    heroTitle: { ...campaign.heroTitle, fr: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Sous-titre du Hero (Français)
              </label>
              <textarea
                rows={2}
                defaultValue={campaign.heroSubtitle.fr}
                onBlur={(e) =>
                  updateCampaign({
                    heroSubtitle: {
                      ...campaign.heroSubtitle,
                      fr: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-espresso">
                Seuil de Livraison Gratuite (MAD)
              </label>
              <input
                type="number"
                defaultValue={campaign.deliveryPromoThreshold}
                onBlur={(e) =>
                  updateCampaign({
                    deliveryPromoThreshold: Number(e.target.value),
                  })
                }
                className="w-full sm:w-60 px-4 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              Commandes Simulées ({orders.length})
            </h2>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-rose-border/30 gap-2">
                  <div>
                    <span className="font-mono text-base font-bold text-rose-deep">
                      {order.reference}
                    </span>
                    <span className="text-xs text-espresso-muted ms-2">
                      ({formatDate(order.createdAt, locale)})
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-espresso-muted">Statut :</span>
                    <select
                      value={order.status}
                      onChange={(e) => {
                        updateOrderStatus(order.id, e.target.value as OrderStatus);
                        showToast(`Statut de ${order.reference} mis à jour : ${e.target.value}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-sand-warm text-espresso font-semibold text-xs border border-sand-dark/20 focus:outline-none cursor-pointer"
                    >
                      <option value="pending">En attente (Pending)</option>
                      <option value="confirmed">Confirmée (Confirmed)</option>
                      <option value="preparing">En préparation (Preparing)</option>
                      <option value="shipped">Expédiée (Shipped)</option>
                      <option value="in_delivery">En cours de livraison (In Delivery)</option>
                      <option value="delivered">Livrée (Delivered)</option>
                    </select>
                  </div>
                </div>

                {/* Customer & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-espresso block">Client :</span>
                    <p className="text-espresso">{order.customer.fullName} ({order.customer.phone})</p>
                    <p className="text-espresso-muted">{order.customer.address}, {order.customer.city}</p>
                  </div>
                  <div className="sm:text-end">
                    <span className="font-semibold text-espresso block">Règlement :</span>
                    <p className="text-espresso">
                      {order.paymentMethod === 'cod' ? 'Paiement à la livraison' : 'Carte bancaire simulée'}
                    </p>
                    <p className="text-base font-bold text-rose-deep">
                      Total : {formatPrice(order.totalMad, locale)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="pt-2 border-t border-rose-border/20 flex flex-wrap gap-2 text-xs">
                  {order.items.map((item) => (
                    <span
                      key={item.id}
                      className="px-2.5 py-1 rounded-lg bg-sand-light/60 border border-rose-border/30 text-espresso"
                    >
                      {item.quantity}× {item.name[locale] || item.name.fr} ({item.volume})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SETTINGS & RESET TAB */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-6 animate-fade-in max-w-xl">
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              {t.admin.resetTitle}
            </h2>
            <p className="text-xs text-espresso-muted leading-relaxed">
              {t.admin.resetDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-mist/40 border border-rose-border/40 text-xs text-espresso space-y-2">
            <span className="font-semibold block">Ce que la réinitialisation effectue :</span>
            <ul className="list-disc list-inside space-y-1 text-espresso-muted">
              <li>Rétablit les 32 produits initiaux du catalogue LUMÉA</li>
              <li>Rétablit les codes promotionnels d'usine (GLOW10, RITUEL15, BSES20)</li>
              <li>Rétablit les commandes de démonstration initiales</li>
              <li>Vide le panier et la liste de favoris</li>
            </ul>
          </div>

          <button
            onClick={() => {
              if (confirm('Voulez-vous vraiment réinitialiser toutes les données de démonstration ?')) {
                resetDemoData();
                showToast(t.admin.resetSuccess);
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-semantic-error text-pearl-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.admin.resetBtn}</span>
          </button>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-pearl-white rounded-3xl p-6 sm:p-8 shadow-floating border border-rose-border max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-border/40">
              <h3 className="font-editorial text-xl font-medium text-espresso">
                {t.admin.addProduct}
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 rounded-full text-espresso-muted hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-espresso">Nom du Produit (Français) *</label>
                <input
                  type="text"
                  required
                  value={newProd.name?.fr || ''}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      name: { fr: e.target.value, en: e.target.value, ar: e.target.value },
                    })
                  }
                  placeholder="Ex : Huile Divine de Figue de Barbarie"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none focus:border-rose-dusty"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Catégorie</label>
                  <select
                    value={newProd.category}
                    onChange={(e) =>
                      setNewProd({ ...newProd, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  >
                    <option value="skincare">Soin Visage</option>
                    <option value="fragrance">Parfumerie</option>
                    <option value="makeup">Maquillage</option>
                    <option value="haircare">Cheveux</option>
                    <option value="bodycare">Corps</option>
                    <option value="giftsets">Coffrets</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Type de Produit</label>
                  <input
                    type="text"
                    value={newProd.productType || ''}
                    onChange={(e) => setNewProd({ ...newProd, productType: e.target.value })}
                    placeholder="Ex : Sérum"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Prix (MAD) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.priceMad || 0}
                    onChange={(e) => setNewProd({ ...newProd, priceMad: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Stock</label>
                  <input
                    type="number"
                    value={newProd.stock || 20}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Volume</label>
                  <input
                    type="text"
                    value={newProd.volume || '50ml'}
                    onChange={(e) => setNewProd({ ...newProd, volume: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-espresso">Sous-titre / Actifs</label>
                <input
                  type="text"
                  value={newProd.subtitle?.fr || ''}
                  onChange={(e) =>
                    setNewProd({
                      ...newProd,
                      subtitle: { fr: e.target.value, en: e.target.value, ar: e.target.value },
                    })
                  }
                  placeholder="Ex : Complexe Figue de Barbarie & Squalane"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-espresso">URL de la photo (Unsplash)</label>
                <input
                  type="url"
                  value={newProd.images?.[0] || ''}
                  onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-rose-border/30">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-full border border-rose-border text-espresso"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-espresso text-pearl-white font-semibold"
                >
                  Créer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-pearl-white rounded-3xl p-6 sm:p-8 shadow-floating border border-rose-border max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-border/40">
              <h3 className="font-editorial text-xl font-medium text-espresso">
                {t.admin.editProduct}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-espresso-muted hover:text-espresso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-espresso">Nom (Français)</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name.fr}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: { ...editingProduct.name, fr: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none focus:border-rose-dusty"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Prix Normal (MAD)</label>
                  <input
                    type="number"
                    value={editingProduct.priceMad}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        priceMad: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Prix Promo (MAD)</label>
                  <input
                    type="number"
                    value={editingProduct.discountPriceMad || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountPriceMad: e.target.value ? Number(e.target.value) : undefined,
                        isOnSale: !!e.target.value,
                      })
                    }
                    placeholder="Optionnel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Stock Unités</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-espresso">Volume</label>
                  <input
                    type="text"
                    value={editingProduct.volume}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        volume: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-espresso focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-rose-border/30">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-full border border-rose-border text-espresso"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-espresso text-pearl-white font-semibold"
                >
                  {t.admin.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
