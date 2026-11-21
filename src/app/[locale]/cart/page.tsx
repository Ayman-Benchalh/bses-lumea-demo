'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  AlertCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function CartPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    appliedPromotion,
    applyPromotionCode,
    removePromotionCode,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
    campaign,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getCartShipping();
  const total = getCartTotal();
  const freeThreshold = campaign.deliveryPromoThreshold || 500;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (!promoInput.trim()) return;

    const res = applyPromotionCode(promoInput);
    if (res.success) {
      setPromoSuccess(t.cart.promoApplied.replace('{percent}', '10-20'));
      setPromoInput('');
    } else {
      setPromoError(res.message || t.cart.promoInvalid);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso">
          {t.cart.title}
        </h1>
        <p className="text-xs text-espresso-muted">
          {cart.reduce((s, i) => s + i.quantity, 0)} articles dans votre sélection
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="p-12 sm:p-20 text-center rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-mist flex items-center justify-center mx-auto text-rose-dusty">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-medium text-espresso">
              {t.cart.empty}
            </h2>
            <p className="text-xs text-espresso-muted max-w-sm mx-auto">
              {t.cart.emptySubtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors shadow-card"
          >
            <span>{t.cart.startShopping}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left Col) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping banner */}
            <div className="p-4 rounded-2xl bg-sand-light/60 border border-rose-border/40 text-xs">
              {remainingForFree > 0 ? (
                <div className="space-y-2">
                  <p className="text-espresso-muted">
                    {t.cart.freeShippingRemaining.replace('{amount}', remainingForFree.toString())}
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-rose-border/50 overflow-hidden">
                    <div
                      className="h-full bg-rose-dusty rounded-full transition-all"
                      style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-semantic-success font-medium">
                  <Check className="w-4 h-4" />
                  <span>Félicitations ! Vous bénéficiez de la livraison offerte partout au Maroc.</span>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle"
                >
                  <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name[locale] || item.name.fr}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-editorial text-lg font-medium text-espresso truncate">
                          {item.name[locale] || item.name.fr}
                        </h3>
                        <p className="text-xs text-espresso-muted">{item.volume}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-xl text-espresso-muted hover:text-semantic-error hover:bg-rose-mist/60 transition-colors"
                        aria-label={t.cart.itemRemoved}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-rose-border bg-sand-light/50 p-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-espresso hover:bg-rose-mist"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-espresso">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-espresso hover:bg-rose-mist disabled:opacity-30"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-base text-espresso">
                        {formatPrice(item.priceMad * item.quantity, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (Right Col) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-card space-y-6 sticky top-28">
            <h2 className="font-editorial text-xl font-medium text-espresso pb-3 border-b border-rose-border/30">
              {t.checkout.orderSummary}
            </h2>

            {/* Promo Code Form */}
            <div className="space-y-2">
              {appliedPromotion ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold">{appliedPromotion.code}</span>
                    <span>(-{appliedPromotion.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromotionCode}
                    className="text-xs text-emerald-700 hover:text-emerald-900 underline"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t.cart.promoPlaceholder}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-espresso hover:bg-espresso-light text-pearl-white text-xs font-semibold transition-colors"
                  >
                    {t.cart.applyPromo}
                  </button>
                </form>
              )}

              {promoError && (
                <p className="flex items-center gap-1 text-[11px] text-semantic-error">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{promoError}</span>
                </p>
              )}
              {promoSuccess && (
                <p className="flex items-center gap-1 text-[11px] text-semantic-success">
                  <Check className="w-3 h-3 shrink-0" />
                  <span>{promoSuccess}</span>
                </p>
              )}
            </div>

            {/* Subtotals */}
            <div className="space-y-2.5 text-xs text-espresso-muted pt-2 border-t border-rose-border/30">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-semibold text-espresso">{formatPrice(subtotal, locale)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-semantic-success font-semibold">
                  <span>{t.cart.discount}</span>
                  <span>-{formatPrice(discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.cart.shipping}</span>
                <span className="font-semibold text-espresso">
                  {shipping === 0 ? t.cart.freeShipping : formatPrice(shipping, locale)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-espresso pt-3 border-t border-rose-border/40">
                <span>{t.cart.total}</span>
                <span className="text-xl text-rose-deep font-editorial font-bold">
                  {formatPrice(total, locale)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href={`/${locale}/checkout`}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-sm font-semibold transition-all shadow-card hover:shadow-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t.cart.checkout}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <Link
              href={`/${locale}/shop`}
              className="block text-center text-xs text-espresso-muted hover:text-espresso font-medium transition-colors"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

