'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, Order, OrderStatus } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { formatPrice, formatDate } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Home,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default function OrderTrackingPage({ params: { locale } }: Props) {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';
  const t = getTranslations(locale);
  const { orders, getOrderByReference } = useStore();

  const [referenceInput, setReferenceInput] = useState(initialRef);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    initialRef ? getOrderByReference(initialRef) : undefined
  );
  const [hasSearched, setHasSearched] = useState(!!initialRef);

  useEffect(() => {
    if (initialRef) {
      setReferenceInput(initialRef);
      setSelectedOrder(getOrderByReference(initialRef));
      setHasSearched(true);
    }
  }, [initialRef, orders, getOrderByReference]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceInput.trim()) return;
    setHasSearched(true);
    const found = getOrderByReference(referenceInput);
    setSelectedOrder(found);
  };

  const stepsList: {
    status: OrderStatus;
    label: string;
    icon: any;
    desc: string;
  }[] = [
    {
      status: 'pending',
      label: t.tracking.statusPending,
      icon: Clock,
      desc: 'Enregistrement de la commande',
    },
    {
      status: 'confirmed',
      label: t.tracking.statusConfirmed,
      icon: CheckCircle2,
      desc: 'Validation du paiement et des coordonnées',
    },
    {
      status: 'preparing',
      label: t.tracking.statusPreparing,
      icon: Package,
      desc: 'Préparation et emballage dans notre atelier',
    },
    {
      status: 'shipped',
      label: t.tracking.statusShipped,
      icon: Truck,
      desc: 'Prise en charge par le transporteur partenaire',
    },
    {
      status: 'in_delivery',
      label: t.tracking.statusInDelivery,
      icon: Truck,
      desc: 'Livreur en route vers votre adresse',
    },
    {
      status: 'delivered',
      label: t.tracking.statusDelivered,
      icon: Home,
      desc: 'Colis remis en main propre',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    return stepsList.findIndex((s) => s.status === status);
  };

  const currentStepIndex = selectedOrder ? getStepIndex(selectedOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-dusty">
          Espace Client Démo
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium text-espresso">
          {t.tracking.title}
        </h1>
        <p className="text-xs sm:text-sm text-espresso-muted max-w-lg mx-auto">
          {t.tracking.subtitle}
        </p>
      </div>

      {/* Lookup Bar */}
      <div className="p-6 rounded-3xl bg-pearl-white border border-rose-border/40 shadow-subtle max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={referenceInput}
            onChange={(e) => setReferenceInput(e.target.value)}
            placeholder={t.tracking.lookupPrompt}
            className="flex-1 px-4 py-3 rounded-xl bg-sand-light/50 border border-rose-border text-xs sm:text-sm text-espresso font-mono focus:outline-none focus:border-rose-dusty uppercase"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-espresso hover:bg-espresso-light text-pearl-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>{t.tracking.lookupBtn}</span>
          </button>
        </form>
      </div>

      {/* Order Tracking Result View */}
      {selectedOrder ? (
        <div className="space-y-8 animate-fade-in">
          {/* Tracking Status Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-pearl-white border border-rose-border/50 shadow-card space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-border/30 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-espresso-muted">
                  Référence de suivi :
                </span>
                <h2 className="font-mono text-2xl font-bold text-rose-deep">
                  {selectedOrder.reference}
                </h2>
              </div>
              <div className="text-start sm:text-end text-xs text-espresso-muted">
                <span>{t.tracking.dateOrdered} </span>
                <span className="font-medium text-espresso">
                  {formatDate(selectedOrder.createdAt, locale)}
                </span>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="relative">
              {/* Stepper track */}
              <div className="hidden sm:block absolute top-6 inset-x-8 h-1 bg-sand-light -z-0">
                <div
                  className="bg-rose-dusty h-full transition-all duration-500"
                  style={{
                    width: `${(currentStepIndex / (stepsList.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 sm:gap-2 relative z-10">
                {stepsList.map((step, idx) => {
                  const IconComp = step.icon;
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={step.status}
                      className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isCurrent
                            ? 'bg-espresso text-sand-warm shadow-md ring-4 ring-rose-mist'
                            : isDone
                            ? 'bg-rose-dusty text-pearl-white'
                            : 'bg-sand-light text-espresso-muted border border-rose-border/40'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <span
                          className={`text-xs block font-semibold leading-tight ${
                            isCurrent
                              ? 'text-rose-deep font-bold'
                              : isDone
                              ? 'text-espresso'
                              : 'text-espresso-muted'
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[10px] text-espresso-muted hidden sm:block">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details & Delivery Summary */}
            <div className="pt-6 border-t border-rose-border/30 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-semibold text-espresso uppercase tracking-wider text-[11px]">
                  Informations Destinataire
                </span>
                <p className="font-medium text-espresso">{selectedOrder.customer.fullName}</p>
                <p className="text-espresso-muted">{selectedOrder.customer.phone}</p>
                <p className="text-espresso-muted">
                  {selectedOrder.customer.address}, {selectedOrder.customer.city}
                </p>
                {selectedOrder.customer.notes && (
                  <p className="text-espresso-muted italic">
                    Note : {selectedOrder.customer.notes}
                  </p>
                )}
              </div>

              <div className="space-y-2 sm:text-end">
                <span className="font-semibold text-espresso uppercase tracking-wider text-[11px]">
                  Mode de règlement
                </span>
                <p className="font-medium text-espresso">
                  {selectedOrder.paymentMethod === 'cod'
                    ? 'Paiement à la livraison (Espèces)'
                    : 'Carte bancaire marocaine CMI (Démonstration)'}
                </p>
                <p className="text-base font-bold text-rose-deep pt-1">
                  Total : {formatPrice(selectedOrder.totalMad, locale)}
                </p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3 pt-4 border-t border-rose-border/30">
              <span className="font-semibold text-espresso uppercase tracking-wider text-[11px] block">
                {t.tracking.itemsOrdered}
              </span>
              <div className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-sand-light/40 border border-rose-border/30 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-rose-mist shrink-0 border border-rose-border/20">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name[locale] || item.name.fr}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-espresso block">
                          {item.name[locale] || item.name.fr}
                        </span>
                        <span className="text-[11px] text-espresso-muted">
                          Qté : {item.quantity} × {item.volume}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-espresso">
                      {formatPrice(item.priceMad * item.quantity, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="p-8 text-center rounded-3xl bg-pearl-white border border-rose-border/50 shadow-subtle space-y-3">
          <AlertCircle className="w-8 h-8 text-semantic-warning mx-auto" />
          <h3 className="font-editorial text-xl font-medium text-espresso">
            {t.tracking.notFound}
          </h3>
          <p className="text-xs text-espresso-muted">
            Vérifiez l'orthographe de votre référence ou sélectionnez une des commandes récentes ci-dessous.
          </p>
        </div>
      ) : null}

      {/* Recent Orders in Browser Sandbox */}
      <div className="space-y-4 pt-6 border-t border-rose-border/30">
        <span className="text-xs uppercase tracking-wider font-semibold text-rose-dusty">
          {t.tracking.yourOrders}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {orders.map((ord) => (
            <button
              key={ord.id}
              onClick={() => {
                setReferenceInput(ord.reference);
                setSelectedOrder(ord);
                setHasSearched(true);
              }}
              className={`p-4 rounded-2xl border text-start transition-all ${
                selectedOrder?.id === ord.id
                  ? 'bg-rose-mist border-rose-dusty shadow-sm'
                  : 'bg-pearl-white border-rose-border hover:bg-sand-light/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-espresso">
                  {ord.reference}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sand-warm text-espresso">
                  {ord.status}
                </span>
              </div>
              <p className="text-[11px] text-espresso-muted truncate">
                {ord.customer.fullName} — {ord.customer.city}
              </p>
              <p className="text-xs font-bold text-espresso mt-1">
                {formatPrice(ord.totalMad, locale)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

