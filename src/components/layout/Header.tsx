'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/types';
import { getTranslations } from '@/i18n/translations';
import { LOCALES, LOCALE_LABELS } from '@/i18n/config';
import { useStore } from '@/store/useStore';
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  Globe,
  Settings,
  Sparkles,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';

interface Props {
  locale: Locale;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export function Header({ locale, onOpenSearch, onOpenCart }: Props) {
  const pathname = usePathname();
  const t = getTranslations(locale);
  const { cart, wishlist, campaign } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setLangMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute localized path when changing language
  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${locale}/shop`, label: t.nav.shop },
    { href: `/${locale}/shop?category=skincare`, label: t.nav.skincare },
    { href: `/${locale}/shop?category=fragrance`, label: t.nav.fragrance },
    { href: `/${locale}/shop?category=makeup`, label: t.nav.makeup },
    { href: `/${locale}/routine-finder`, label: t.nav.routineFinder, highlight: true },
    { href: `/${locale}/journal`, label: t.nav.journal },
  ];

  const encodedMsg = encodeURIComponent(
    "Bonjour BSES, j'ai découvert votre démonstration LUMÉA et je souhaite discuter de la création d'une boutique e-commerce pour mon activité."
  );
  const whatsappUrl = `https://wa.me/212694991485?text=${encodedMsg}`;

  return (
    <header className="sticky top-0 z-30 w-full bg-pearl-white/95 backdrop-blur-md border-b border-rose-border/40 transition-colors">
      {/* 1. Announcement Bar */}
      <div className="bg-rose-mist/90 text-espresso text-xs border-b border-rose-border/30 px-3 sm:px-6 py-2 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Campaign Notice */}
          <div className="flex-1 text-center sm:text-start truncate flex items-center justify-center sm:justify-start gap-2">
            <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-rose-dusty" />
            <span className="font-medium truncate">
              {campaign.announcementText[locale] || campaign.announcementText.fr}
            </span>
          </div>

          {/* Quick Right Meta */}
          <div className="hidden md:flex items-center gap-4 text-espresso-muted">
            <Link
              href={`/${locale}/order-tracking`}
              className="hover:text-espresso transition-colors"
            >
              {t.nav.orderTracking}
            </Link>
            <span className="text-rose-border">|</span>
            <Link
              href={`/${locale}/design-system`}
              className="hover:text-espresso transition-colors text-[11px] uppercase tracking-wider"
            >
              {t.nav.designSystem}
            </Link>
            <span className="text-rose-border">|</span>
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 font-medium hover:text-espresso transition-colors focus-visible:outline-none"
                aria-label={t.nav.language}
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-3.5 h-3.5 text-rose-dusty" />
                <span>{LOCALE_LABELS[locale].label}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute mt-2 w-32 rounded-xl bg-pearl-white shadow-floating border border-rose-border p-1 z-50 animate-fade-in ${
                    locale === 'ar' ? 'left-0' : 'right-0'
                  }`}
                >
                  {LOCALES.map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalizedPath(loc)}
                      onClick={() => setLangMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        locale === loc
                          ? 'bg-rose-mist text-espresso font-semibold'
                          : 'text-espresso-muted hover:bg-sand-light hover:text-espresso'
                      }`}
                    >
                      <span>{LOCALE_LABELS[loc].label}</span>
                      <span>{LOCALE_LABELS[loc].flag}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (3-Zone Balanced Architecture) */}
      <div className="max-w-7xl mx-auto px-2.5 min-[360px]:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4 lg:gap-8">
          {/* ZONE 1: Left - Mobile Toggle + Brand Wordmark */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="touch-target p-2 rounded-xl text-espresso hover:bg-rose-mist/60 transition-colors xl:hidden"
              aria-label={t.nav.menu}
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href={`/${locale}`}
              className="group flex flex-col items-start focus-visible:outline-none"
            >
              <span className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl tracking-[0.12em] sm:tracking-[0.16em] font-medium text-espresso group-hover:text-rose-dusty transition-colors leading-none">
                {locale === 'ar' ? 'لوميا LUMÉA' : 'LUMÉA'}
              </span>
              <span className="hidden min-[380px]:inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-rose-dusty mt-1 font-sans font-medium">
                {t.tagline}
              </span>
            </Link>
          </div>

          {/* ZONE 2: Center - Desktop Navigation Links (Balanced & Non-Wrapping) */}
          <nav className="hidden xl:flex items-center justify-center gap-6 2xl:gap-8 flex-1 mx-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1.5 transition-colors whitespace-nowrap hover:text-rose-dusty ${
                  link.highlight
                    ? 'text-rose-deep font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-mist/60 border border-rose-border/60 shadow-xs'
                    : 'text-espresso/90'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-rose-dusty shrink-0" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* ZONE 3: Right - Actions & Discreet Admin Shortcut */}
          <div className="flex items-center shrink-0 gap-0.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="touch-target p-2 sm:p-2.5 rounded-full text-espresso hover:bg-rose-mist/60 transition-colors"
              aria-label={t.nav.search}
            >
              <Search className="w-5 h-5 text-espresso" />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              href={`/${locale}/wishlist`}
              className="relative touch-target p-2 sm:p-2.5 rounded-full text-espresso hover:bg-rose-mist/60 transition-colors"
              aria-label={t.nav.wishlist}
            >
              <Heart className="w-5 h-5 text-espresso" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-rose-dusty text-[10px] font-bold text-pearl-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger with Badge */}
            <button
              onClick={onOpenCart}
              className="relative touch-target p-2 sm:p-2.5 rounded-full text-espresso hover:bg-rose-mist/60 transition-colors"
              aria-label={t.nav.cart}
            >
              <ShoppingBag className="w-5 h-5 text-espresso" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-espresso text-[10px] font-bold text-pearl-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Console Demo Shortcut */}
            <Link
              href={`/${locale}/admin-demo`}
              className="hidden sm:inline-flex items-center gap-1.5 ms-1 sm:ms-2 px-3.5 py-2 rounded-full bg-sand-warm/70 hover:bg-sand-warm text-espresso text-xs font-semibold border border-sand-dark/20 transition-all shadow-xs"
              title={t.nav.adminDemo}
            >
              <Settings className="w-3.5 h-3.5 text-rose-dusty" />
              <span className="hidden 2xl:inline">{t.nav.adminDemo}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (ZERO CLIPPED NAVIGATION) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="fixed inset-0 z-50 xl:hidden flex"
        >
          {/* Backdrop with Click to Close */}
          <div
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Body - Full Viewport Height, Scrollable */}
          <div
            className={`relative w-full max-w-sm bg-pearl-white text-espresso h-[100dvh] flex flex-col shadow-2xl z-10 transition-transform ${
              locale === 'ar' ? 'mr-auto' : 'ml-auto'
            }`}
          >
            {/* Drawer Top Header with 48x48 Close Touch Target */}
            <div className="flex items-center justify-between p-4 border-b border-rose-border/40 bg-rose-mist/30">
              <Link
                href={`/${locale}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-editorial text-2xl tracking-[0.16em] font-medium text-espresso"
              >
                {locale === 'ar' ? 'لوميا LUMÉA' : 'LUMÉA'}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target p-2 rounded-xl text-espresso hover:bg-rose-mist/80 transition-colors"
                aria-label={t.nav.close}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {/* Category Links */}
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-dusty px-3 mb-2">
                  {t.shop.category}
                </p>

                <Link
                  href={`/${locale}/shop`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 font-medium transition-colors"
                >
                  <span>{t.nav.allProducts}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=skincare`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.skincare}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=fragrance`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.fragrance}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=makeup`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.makeup}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=haircare`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.haircare}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=bodycare`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.bodycare}</span>
                </Link>

                <Link
                  href={`/${locale}/shop?category=giftsets`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.giftsets}</span>
                </Link>
              </div>

              {/* Discovery & Editorial Links */}
              <div className="space-y-1 pt-4 border-t border-rose-border/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-dusty px-3 mb-2">
                  {t.home.concernTitle}
                </p>

                <Link
                  href={`/${locale}/routine-finder`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-rose-mist/60 text-rose-deep font-semibold transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-rose-dusty" />
                  <span>{t.nav.routineFinder}</span>
                </Link>

                <Link
                  href={`/${locale}/journal`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.journal}</span>
                </Link>

                <Link
                  href={`/${locale}/order-tracking`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.orderTracking}</span>
                </Link>

                <Link
                  href={`/${locale}/design-system`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-espresso hover:bg-rose-mist/50 transition-colors"
                >
                  <span>{t.nav.designSystem}</span>
                </Link>

                <Link
                  href={`/${locale}/admin-demo`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-3 rounded-xl bg-sand-warm/50 text-espresso font-medium transition-colors"
                >
                  <Settings className="w-4 h-4 text-rose-dusty" />
                  <span>{t.nav.adminDemo}</span>
                </Link>
              </div>

              {/* Language Switcher inside Mobile Drawer */}
              <div className="pt-4 border-t border-rose-border/30">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-dusty px-3 mb-2">
                  {t.nav.language}
                </p>
                <div className="grid grid-cols-3 gap-2 px-2">
                  {LOCALES.map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalizedPath(loc)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition-colors ${
                        locale === loc
                          ? 'bg-espresso text-pearl-white border-espresso'
                          : 'bg-pearl-white border-rose-border text-espresso hover:bg-rose-mist/40'
                      }`}
                    >
                      <span className="text-base mb-1">{LOCALE_LABELS[loc].flag}</span>
                      <span>{LOCALE_LABELS[loc].label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer with Quick Contact */}
            <div className="p-4 border-t border-rose-border/40 bg-sand-light/60">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-pearl-white font-medium text-xs transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.bses.whatsappCta}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
