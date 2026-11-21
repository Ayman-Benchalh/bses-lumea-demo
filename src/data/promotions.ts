import { Promotion, Bundle, CampaignSettings } from "@/types";

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: "promo-glow10",
    code: "GLOW10",
    title: {
      fr: "10% de réduction de bienvenue",
      en: "10% Welcome Discount",
      ar: "خصم 10% ترحيبي",
    },
    discountPercent: 10,
    isActive: true,
    minSpendMad: 300,
    validUntil: "2026-12-31",
  },
  {
    id: "promo-rituel15",
    code: "RITUEL15",
    title: {
      fr: "15% sur les rituels complets",
      en: "15% off full rituals",
      ar: "خصم 15% على الطقوس الكاملة",
    },
    discountPercent: 15,
    isActive: true,
    minSpendMad: 600,
    validUntil: "2026-12-31",
  },
  {
    id: "promo-bses20",
    code: "BSES20",
    title: {
      fr: "Offre Spéciale Portfolio BSES (-20%)",
      en: "Special BSES Portfolio Offer (-20%)",
      ar: "عرض خاص لملف أعمال BSES (-20%)",
    },
    discountPercent: 20,
    isActive: true,
    minSpendMad: 450,
    validUntil: "2026-12-31",
  },
];

export const INITIAL_BUNDLES: Bundle[] = [
  {
    id: "bundle-eclat-absolu",
    slug: "coffret-rituel-eclat-absolu",
    name: {
      fr: "Coffret Rituel Éclat Absolu",
      en: "Absolute Radiance Ritual Set",
      ar: "مجموعة طقوس الإشراق المطلق",
    },
    description: {
      fr: "Le trio signature pour révéler la lumière de votre teint : Sérum Botanique, Crème Velours et Tonique Rééquilibrant.",
      en: "The signature trio to awaken your complexion: Botanical Serum, Velvet Cream and Balancing Tonic.",
      ar: "الثلاثي المميز لإشراقة بشرتك: سيروم نباتي، كريم مخملي، وتونيك موازن.",
    },
    productIds: ["lumea-sk-01", "lumea-sk-02", "lumea-sk-07"],
    priceMad: 820,
    regularPriceMad: 980,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "bundle-atlas-neroli",
    slug: "coffret-parfumerie-atlas-neroli",
    name: {
      fr: "Coffret Haute Parfumerie Atlas & Néroli",
      en: "Haute Parfumerie Atlas & Neroli Duo",
      ar: "مجموعة العطور الفاخرة الأطلس والنيرولي",
    },
    description: {
      fr: "Deux sillages complémentaires : la chaleur ambrée de l'Atlas et la délicatesse florale de la fleur d'oranger.",
      en: "Two harmonious scents: the warm Atlas amber and the delicate floral touch of orange blossom.",
      ar: "عطران متكاملان: دفء عنبر الأطلس ورقة زهر البرتقال العطرة.",
    },
    productIds: ["lumea-pf-01", "lumea-pf-03"],
    priceMad: 1150,
    regularPriceMad: 1380,
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
  {
    id: "bundle-spa-marocain",
    slug: "coffret-somptueux-spa-marocain",
    name: {
      fr: "Coffret Somptueux Spa Marocain",
      en: "Sumptuous Moroccan Spa Collection",
      ar: "مجموعة السبا المغربي الفاخرة",
    },
    description: {
      fr: "Une expérience sensorielle inspirée des traditions ancestrales du hammam : Gommage Sucre Roux, Crème Veloutée et Huile Pure d'Argan.",
      en: "A sensory voyage inspired by Moroccan hammam rituals: Brown Sugar Scrub, Velvet Body Butter and Pure Argan Oil.",
      ar: "تجربة حسية مستوحاة من تقاليد الحمام المغربي الأصيل: مقشر السكر البني، كريم مخملي، وزيت الأركان النقي.",
    },
    productIds: ["lumea-sk-04", "lumea-bd-01", "lumea-bd-02"],
    priceMad: 740,
    regularPriceMad: 890,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    inStock: true,
  },
];

export const INITIAL_CAMPAIGN: CampaignSettings = {
  announcementText: {
    fr: "Livraison offerte partout au Maroc dès 500 MAD • Code GLOW10 pour -10%",
    en: "Free delivery across Morocco from 500 MAD • Code GLOW10 for -10%",
    ar: "توصيل مجاني في جميع أنحاء المغرب ابتداءً من 500 درهم • الرمز GLOW10 لخصم 10%",
  },
  announcementLink: "/shop",
  heroBadge: {
    fr: "Nouvelle Collection Botanique 2026",
    en: "New 2026 Botanical Collection",
    ar: "مجموعة النباتات الجديدة 2026",
  },
  heroTitle: {
    fr: "LUMÉA — L'Art du Rayonnement Quotidien",
    en: "LUMÉA — The Art of Everyday Radiance",
    ar: "لوميا — فن الإشراق اليومي",
  },
  heroSubtitle: {
    fr: "Des rituels de beauté sensoriels et purs, célébrant les trésors botaniques du Maroc et la science cosmétique moderne.",
    en: "Sensory and pure beauty rituals celebrating Moroccan botanical treasures and contemporary cosmetic science.",
    ar: "طقوس جمالية حسية نقية، تجمع بين كنوز الطبيعة المغربية والعلوم التجميلية الحديثة.",
  },
  promoBannerActive: true,
  promoBannerText: {
    fr: "Démonstration E-commerce par BSES — Découvrez nos solutions sur-mesure",
    en: "BSES E-commerce Showcase — Discover our custom bespoke solutions",
    ar: "عرض تجارة إلكترونية من BSES — اكتشف حلولنا الاحترافية المخصصة",
  },
  promoBannerCode: "BSES20",
  deliveryPromoThreshold: 500,
};
