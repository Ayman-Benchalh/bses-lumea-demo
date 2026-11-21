'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function CartDrawer({ isOpen, onClose, locale }: Props) {
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

  // Lock body scroll and handle ESC key when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getCartShipping();
  const total = getCartTotal();
  const freeThreshold = campaign.deliveryPromoThreshold || 500;
  const remainingForFreeShipping = Math.max(0, freeThreshold - subtotal);

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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`relative w-full max-w-md bg-pearl-white text-espresso h-[100dvh] flex flex-col shadow-2xl z-10 ${
          locale === 'ar' ? 'mr-auto' : 'ml-auto'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-rose-border/40 bg-rose-mist/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-dusty" />
            <h2 className="font-editorial text-xl font-medium tracking-wide">
              {t.cart.title}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-dusty/20 text-rose-deep">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="touch-target p-2 rounded-xl text-espresso hover:bg-rose-mist/60 transition-colors"
            aria-label={t.nav.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {subtotal > 0 && (
          <div className="px-5 py-3 bg-sand-light/60 border-b border-rose-border/20 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-espresso-muted mb-1.5">
                  {t.cart.freeShippingRemaining.replace(
                    '{amount}',
                    remainingForFreeShipping.toString()
                  )}
                </p>
                <div className="w-full h-1.5 rounded-full bg-rose-border/50 overflow-hidden">
                  <div
                    className="h-full bg-rose-dusty rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-semantic-success font-medium">
                <Check className="w-4 h-4" />
                <span>Livraison offerte sur votre commande !</span>
              </div>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-mist flex items-center justify-center text-rose-dusty">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-xl font-medium text-espresso">
                  {t.cart.empty}
                </h3>
                <p className="text-xs text-espresso-muted max-w-xs">
                  {t.cart.emptySubtitle}
                </p>
              </div>
              <Link
                href={`/${locale}/shop`}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-pearl-white text-xs font-medium hover:bg-espresso-light transition-colors"
              >
                <span>{t.cart.startShopping}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl bg-pearl-white border border-rose-border/40 shadow-subtle hover:border-rose-dusty/40 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name[locale] || item.name.fr}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-rose-dusty text-xs">
                      LUMÉA
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium text-espresso truncate">
                        {item.name[locale] || item.name.fr}
                      </h4>
                      <p className="text-[11px] text-espresso-muted mt-0.5">
                        {item.volume}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-lg text-espresso-muted hover:text-semantic-error hover:bg-rose-mist/40 transition-colors"
                      title={t.cart.itemRemoved}
                      aria-label={t.cart.itemRemoved}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-lg border border-rose-border bg-sand-light/50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2 text-espresso hover:bg-rose-mist transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-espresso min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-espresso hover:bg-rose-mist transition-colors disabled:opacity-30"
                        disabled={item.quantity >= item.stock}
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-espresso">
                      {formatPrice(item.priceMad * item.quantity, locale)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-rose-border/40 bg-rose-mist/20 space-y-3">
            {/* Promo Code Input */}
            <div>
              {appliedPromotion ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold">{appliedPromotion.code}</span>
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
                    className="flex-1 px-3 py-2 rounded-xl bg-pearl-white border border-rose-border text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-espresso hover:bg-espresso-light text-pearl-white text-xs font-medium transition-colors"
                  >
                    {t.cart.applyPromo}
                  </button>
                </form>
              )}

              {promoError && (
                <p className="flex items-center gap-1 text-[11px] text-semantic-error mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{promoError}</span>
                </p>
              )}
              {promoSuccess && (
                <p className="flex items-center gap-1 text-[11px] text-semantic-success mt-1">
                  <Check className="w-3 h-3 shrink-0" />
                  <span>{promoSuccess}</span>
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-espresso-muted pt-2 border-t border-rose-border/20">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-medium text-espresso">{formatPrice(subtotal, locale)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-semantic-success font-medium">
                  <span>{t.cart.discount}</span>
                  <span>-{formatPrice(discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.cart.shipping}</span>
                <span className="font-medium text-espresso">
                  {shipping === 0 ? t.cart.freeShipping : formatPrice(shipping, locale)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-espresso pt-2 border-t border-rose-border/30">
                <span>{t.cart.total}</span>
                <span className="text-base text-rose-deep font-bold">
                  {formatPrice(total, locale)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href={`/${locale}/checkout`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-sm font-medium transition-colors shadow-card hover:shadow-hover"
            >
              <span>{t.cart.checkout}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

