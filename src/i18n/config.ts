import { Locale } from "@/types";

export const LOCALES: Locale[] = ['fr', 'en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_LABELS: Record<Locale, { label: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  fr: { label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  en: { label: 'English', flag: '🇬🇧', dir: 'ltr' },
  ar: { label: 'العربية', flag: '🇲🇦', dir: 'rtl' },
};

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

