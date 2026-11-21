'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice, getEstimatedDeliveryDate } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { MOROCCAN_CITIES } from '@/data/cities';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Banknote,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

// Moroccan Phone regex: accepts +2126XXXXXXXX, +2127XXXXXXXX, 06XXXXXXXX, 07XXXXXXXX
const moroccanPhoneRegex = /^(\+212|0)([5-7])([0-9]{8})$/;

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Veuillez saisir votre nom complet (au moins 3 caractères).'),
  phone: z
    .string()
    .regex(
      moroccanPhoneRegex,
      'Numéro marocain invalide (ex: 06 12 34 56 78 ou +212 6...)'
    ),
  city: z.string().min(1, 'Veuillez sélectionner une ville au Maroc.'),
  address: z.string().min(5, 'Veuillez préciser votre adresse de livraison complète.'),
  notes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'card_demo']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage({ params: { locale } }: Props) {
  const t = getTranslations(locale);
  const {
    cart,
    createOrder,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
  } = useStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderRef, setConfirmedOrderRef] = useState<string | null>(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getCartShipping();
  const total = getCartTotal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      city: 'casablanca',
      address: '',
      notes: '',
      paymentMethod: 'cod',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    // Simulate minimal processing delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const selectedCityObj = MOROCCAN_CITIES.find((c) => c.id === data.city);
    const cityName = selectedCityObj ? selectedCityObj.name[locale] : data.city;

    const order = createOrder({
      customer: {
        fullName: data.fullName,
        phone: data.phone,
        city: cityName,
        address: data.address,
        notes: data.notes,
      },
      items: cart,
      subtotalMad: subtotal,
      shippingMad: shipping,
      discountMad: discount,
      totalMad: total,
      paymentMethod: data.paymentMethod,
    });

    setConfirmedOrderRef(order.reference);
    setIsSubmitting(false);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedOrderRef) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full animate-fade-in text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-700 shadow-card">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-dusty">
            Démonstration Réussie
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso">
            {t.checkout.orderSuccessTitle}
          </h1>
          <p className="text-xs sm:text-sm text-espresso-muted max-w-md mx-auto">
            {t.checkout.orderSuccessSubtitle}
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/60 shadow-subtle space-y-3">
          <span className="text-xs uppercase tracking-wider text-espresso-muted">
            {t.checkout.orderReference}
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-rose-deep tracking-wider">
            {confirmedOrderRef}
          </div>
          <p className="text-[11px] text-espresso-muted">
            Livraison estimée : sous 24 à 48 heures ouvrées partout au Maroc.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/${locale}/order-tracking?ref=${confirmedOrderRef}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-xs sm:text-sm font-semibold transition-all shadow-card hover:scale-105"
          >
            <span>{t.checkout.trackOrderCta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>

          <Link
            href={`/${locale}/shop`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-rose-border text-xs sm:text-sm font-medium text-espresso hover:bg-rose-mist transition-colors"
          >
            <span>{t.checkout.backToShop}</span>
          </Link>
        </div>

        {/* Portfolio Disclaimer */}
        <div className="p-4 rounded-2xl bg-sand-light/50 border border-rose-border/40 text-[11px] text-espresso-muted max-w-lg mx-auto">
          {t.checkout.disclaimer}
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-mist flex items-center justify-center mx-auto text-rose-dusty">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-editorial text-2xl font-medium text-espresso">
          Votre panier est vide
        </h1>
        <p className="text-xs text-espresso-muted">
          Ajoutez des soins à votre panier avant de procéder à la commande simulée.
        </p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-pearl-white text-xs font-semibold hover:bg-espresso-light transition-colors"
        >
          <span>{t.cart.startShopping}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-dusty">
          Simulation E-Commerce Maroc
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-espresso">
          {t.checkout.title}
        </h1>
        <p className="text-xs text-espresso-muted">
          {t.checkout.subtitle}
        </p>
      </div>

      {/* Demo Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Environnement Démonstration BSES :</span>
          <p className="text-amber-800 leading-relaxed">
            Aucun prélèvement bancaire ne sera effectué. Cette commande de démonstration sera enregistrée localement dans votre navigateur pour tester le suivi de commande et la console d'administration.
          </p>
        </div>
      </div>

      {/* Main Checkout Form & Summary Grid */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Customer Info Form (Left Col) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-rose-border/30">
                <Truck className="w-4 h-4 text-rose-dusty" />
                <h2 className="font-editorial text-xl font-medium text-espresso">
                  {t.checkout.customerInfo}
                </h2>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-espresso block">
                  {t.checkout.fullName} *
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder={t.checkout.fullNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-semantic-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName.message}</span>
                  </p>
                )}
              </div>

              {/* Moroccan Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-espresso block">
                  {t.checkout.phone} *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder={t.checkout.phonePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty"
                />
                {errors.phone && (
                  <p className="text-[11px] text-semantic-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone.message}</span>
                  </p>
                )}
              </div>

              {/* City Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-espresso block">
                  {t.checkout.city} *
                </label>
                <select
                  {...register('city')}
                  className="w-full px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso focus:outline-none focus:border-rose-dusty cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name[locale]} ({c.deliveryDays}j ouvrés)
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-[11px] text-semantic-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.city.message}</span>
                  </p>
                )}
              </div>

              {/* Street Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-espresso block">
                  {t.checkout.address} *
                </label>
                <textarea
                  rows={2}
                  {...register('address')}
                  placeholder={t.checkout.addressPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty resize-none"
                />
                {errors.address && (
                  <p className="text-[11px] text-semantic-error flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.address.message}</span>
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-espresso block">
                  {t.checkout.notes}
                </label>
                <input
                  type="text"
                  {...register('notes')}
                  placeholder={t.checkout.notesPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-sand-light/50 border border-rose-border text-xs text-espresso placeholder:text-espresso-muted focus:outline-none focus:border-rose-dusty"
                />
              </div>
            </div>

            {/* Simulated Payment Methods */}
            <div className="p-6 sm:p-8 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle space-y-4">
              <h2 className="font-editorial text-xl font-medium text-espresso pb-3 border-b border-rose-border/30">
                {t.checkout.paymentMethod}
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'cod'
                      ? 'bg-rose-mist/80 border-rose-dusty shadow-sm'
                      : 'bg-sand-light/40 border-rose-border/50 hover:bg-rose-mist/30'
                  }`}
                >
                  <input
                    type="radio"
                    value="cod"
                    {...register('paymentMethod')}
                    className="mt-1 text-rose-dusty accent-rose-dusty"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-espresso">
                        {t.checkout.cod}
                      </span>
                    </div>
                    <p className="text-[11px] text-espresso-muted leading-relaxed">
                      {t.checkout.codDesc}
                    </p>
                  </div>
                </label>

                {/* Card Demo Option */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedPaymentMethod === 'card_demo'
                      ? 'bg-rose-mist/80 border-rose-dusty shadow-sm'
                      : 'bg-sand-light/40 border-rose-border/50 hover:bg-rose-mist/30'
                  }`}
                >
                  <input
                    type="radio"
                    value="card_demo"
                    {...register('paymentMethod')}
                    className="mt-1 text-rose-dusty accent-rose-dusty"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-rose-deep" />
                      <span className="text-xs font-semibold text-espresso">
                        {t.checkout.cardDemo}
                      </span>
                    </div>
                    <p className="text-[11px] text-espresso-muted leading-relaxed">
                      {t.checkout.cardDemoDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary (Right Col) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-card space-y-6 sticky top-28">
            <h2 className="font-editorial text-xl font-medium text-espresso pb-3 border-b border-rose-border/30">
              {t.checkout.orderSummary}
            </h2>

            {/* Mini Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pe-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/30">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name[locale] || item.name.fr}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-espresso truncate block">
                      {item.name[locale] || item.name.fr}
                    </span>
                    <span className="text-[11px] text-espresso-muted">
                      Qté: {item.quantity} × {item.volume}
                    </span>
                  </div>
                  <span className="font-semibold text-espresso shrink-0">
                    {formatPrice(item.priceMad * item.quantity, locale)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-2 text-xs text-espresso-muted pt-4 border-t border-rose-border/30">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full bg-espresso hover:bg-espresso-light text-pearl-white text-sm font-semibold transition-all shadow-card hover:shadow-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <span>{isSubmitting ? t.checkout.processing : t.checkout.placeOrder}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <p className="text-[11px] text-espresso-muted text-center leading-normal">
              En validant, vous confirmez l'enregistrement de cette commande dans le bac à sable de votre navigateur.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

