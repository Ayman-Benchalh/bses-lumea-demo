import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amountMad: number, locale: Locale = "fr"): string {
  if (locale === "ar") {
    return `${amountMad.toLocaleString("ar-MA")} د.م.`;
  }
  if (locale === "en") {
    return `${amountMad.toLocaleString("en-US")} MAD`;
  }
  return `${amountMad.toLocaleString("fr-FR")} MAD`;
}

export function formatDate(dateString: string, locale: Locale = "fr"): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function generateOrderReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LUM-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function getEstimatedDeliveryDate(daysFromNow: number = 2): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString();
}

