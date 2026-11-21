export interface MoroccanCity {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  deliveryDays: number;
  deliveryFeeMad: number;
}

export const MOROCCAN_CITIES: MoroccanCity[] = [
  {
    id: 'casablanca',
    name: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' },
    deliveryDays: 1,
    deliveryFeeMad: 25,
  },
  {
    id: 'rabat',
    name: { fr: 'Rabat', en: 'Rabat', ar: 'الرباط' },
    deliveryDays: 1,
    deliveryFeeMad: 30,
  },
  {
    id: 'marrakech',
    name: { fr: 'Marrakech', en: 'Marrakech', ar: 'مراكش' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'tanger',
    name: { fr: 'Tanger', en: 'Tangier', ar: 'طنجة' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'agadir',
    name: { fr: 'Agadir', en: 'Agadir', ar: 'أكادير' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'fes',
    name: { fr: 'Fès', en: 'Fez', ar: 'فاس' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'meknes',
    name: { fr: 'Meknès', en: 'Meknes', ar: 'مكناس' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'oujda',
    name: { fr: 'Oujda', en: 'Oujda', ar: 'وجدة' },
    deliveryDays: 3,
    deliveryFeeMad: 40,
  },
  {
    id: 'kenitra',
    name: { fr: 'Kénitra', en: 'Kenitra', ar: 'القنيطرة' },
    deliveryDays: 1,
    deliveryFeeMad: 30,
  },
  {
    id: 'tetouan',
    name: { fr: 'Tétouan', en: 'Tetouan', ar: 'تطوان' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'el-jadida',
    name: { fr: 'El Jadida', en: 'El Jadida', ar: 'الجديدة' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'nador',
    name: { fr: 'Nador', en: 'Nador', ar: 'الناظور' },
    deliveryDays: 3,
    deliveryFeeMad: 40,
  },
  {
    id: 'essaouira',
    name: { fr: 'Essaouira', en: 'Essaouira', ar: 'الصويرة' },
    deliveryDays: 2,
    deliveryFeeMad: 35,
  },
  {
    id: 'laayoune',
    name: { fr: 'Laâyoune', en: 'Laayoune', ar: 'العيون' },
    deliveryDays: 4,
    deliveryFeeMad: 50,
  },
  {
    id: 'dakhla',
    name: { fr: 'Dakhla', en: 'Dakhla', ar: 'الداخلة' },
    deliveryDays: 4,
    deliveryFeeMad: 50,
  },
];

