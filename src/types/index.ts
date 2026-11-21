export type Locale = 'fr' | 'en' | 'ar';

export type ProductCategory = 'skincare' | 'fragrance' | 'makeup' | 'haircare' | 'bodycare' | 'giftsets';

export type SkinConcern = 'dryness' | 'dullness' | 'oiliness' | 'texture' | 'antiaging' | 'all';

export type FragranceFamily = 'oriental' | 'floral' | 'woody' | 'citrus' | 'amber';

export interface ProductVariant {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  volume: string; // e.g. "30ml", "50ml", "100ml", "Standard"
  priceMad: number;
  discountPriceMad?: number;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  subtitle: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  howToUse: {
    fr: string;
    en: string;
    ar: string;
  };
  ingredientsText: {
    fr: string;
    en: string;
    ar: string;
  };
  texture: {
    fr: string;
    en: string;
    ar: string;
  };
  category: ProductCategory;
  productType: string; // e.g. "Serum", "Crème", "Eau de Parfum", "Rouge à lèvres"
  priceMad: number;
  discountPriceMad?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  featured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  volume: string;
  variants: ProductVariant[];
  skinConcern?: SkinConcern[];
  fragranceFamily?: FragranceFamily;
  routineStep?: 'cleanse' | 'tone' | 'treat' | 'moisturize' | 'protect';
  routineTiming?: 'morning' | 'evening' | 'both';
  relatedProductIds: string[];
  tags: string[];
  keyBotanicals: {
    fr: string[];
    en: string[];
    ar: string[];
  };
}

export interface CartItem {
  id: string; // cart item id (product.id + variant.id)
  productId: string;
  variantId?: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  priceMad: number;
  quantity: number;
  image: string;
  volume: string;
  stock: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'in_delivery' | 'delivered';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  reference: string;
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: CartItem[];
  subtotalMad: number;
  shippingMad: number;
  discountMad: number;
  totalMad: number;
  paymentMethod: 'cod' | 'card_demo';
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface Promotion {
  id: string;
  code: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  discountPercent: number;
  isActive: boolean;
  minSpendMad: number;
  validUntil: string;
}

export interface Bundle {
  id: string;
  slug: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  productIds: string[];
  priceMad: number;
  regularPriceMad: number;
  image: string;
  inStock: boolean;
}

export interface CampaignSettings {
  announcementText: {
    fr: string;
    en: string;
    ar: string;
  };
  announcementLink: string;
  heroBadge: {
    fr: string;
    en: string;
    ar: string;
  };
  heroTitle: {
    fr: string;
    en: string;
    ar: string;
  };
  heroSubtitle: {
    fr: string;
    en: string;
    ar: string;
  };
  promoBannerActive: boolean;
  promoBannerText: {
    fr: string;
    en: string;
    ar: string;
  };
  promoBannerCode: string;
  deliveryPromoThreshold: number; // e.g. 500 MAD for free delivery
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: {
    fr: string;
    en: string;
    ar: string;
  };
  excerpt: {
    fr: string;
    en: string;
    ar: string;
  };
  content: {
    fr: string;
    en: string;
    ar: string;
  };
  category: {
    fr: string;
    en: string;
    ar: string;
  };
  readTimeMinutes: number;
  publishedAt: string;
  coverImage: string;
  author: string;
  tags: string[];
}

export interface RoutineFinderAnswers {
  concern: SkinConcern;
  complexity: 'essential' | 'balanced' | 'complete';
  preferences: {
    texture: 'light' | 'rich' | 'any';
    fragranceFree: boolean;
    minimalist: boolean;
  };
  budget: 'essential' | 'mid' | 'premium' | 'custom';
  customBudgetMax?: number;
}

