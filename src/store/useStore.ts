import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, WishlistItem, Order, OrderStatus, Promotion, Bundle, CampaignSettings, RoutineFinderAnswers } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/products';
import { INITIAL_PROMOTIONS, INITIAL_BUNDLES, INITIAL_CAMPAIGN } from '@/data/promotions';
import { generateOrderReference } from '@/lib/utils';

export interface InitialSeedState {
  products: Product[];
  promotions: Promotion[];
  bundles: Bundle[];
  campaign: CampaignSettings;
  orders: Order[];
}

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: "ord-seed-01",
    reference: "LUM-8X4K2P",
    createdAt: "2026-11-18T10:30:00Z",
    status: "delivered",
    customer: {
      fullName: "Kenza Alami",
      phone: "+212661234567",
      city: "Casablanca",
      address: "24 Boulevard d'Anfa, Résidence Marina, Casablanca",
      notes: "Laisser au concierge si absent",
    },
    items: [
      {
        id: "lumea-sk-01-v-sk01-30",
        productId: "lumea-sk-01",
        variantId: "v-sk01-30",
        name: { fr: "Sérum Éclat Botanique", en: "Botanical Radiance Serum", ar: "سيروم الإشراق النباتي" },
        priceMad: 340,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        volume: "30ml",
        stock: 24,
      },
      {
        id: "lumea-sk-02-v-sk02-50",
        productId: "lumea-sk-02",
        variantId: "v-sk02-50",
        name: { fr: "Crème Régénérante Velours", en: "Velvet Regenerating Cream", ar: "كريم التجديد المخملي" },
        priceMad: 420,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        volume: "50ml",
        stock: 30,
      },
    ],
    subtotalMad: 760,
    shippingMad: 0,
    discountMad: 76,
    totalMad: 684,
    paymentMethod: "cod",
    statusHistory: [
      { status: "pending", timestamp: "2026-11-18T10:30:00Z", note: "Commande enregistrée" },
      { status: "confirmed", timestamp: "2026-11-18T11:00:00Z", note: "Validée par le service client" },
      { status: "preparing", timestamp: "2026-11-18T14:00:00Z", note: "Conditionnée en atelier" },
      { status: "shipped", timestamp: "2026-11-19T09:00:00Z", note: "Prise en charge transporteur" },
      { status: "delivered", timestamp: "2026-11-20T11:15:00Z", note: "Livrée et encaissée" },
    ],
  },
  {
    id: "ord-seed-02",
    reference: "LUM-9F7M1Y",
    createdAt: "2026-11-19T16:45:00Z",
    status: "in_delivery",
    customer: {
      fullName: "Youssef Bennani",
      phone: "+212672345678",
      city: "Rabat",
      address: "12 Avenue Mohammed VI, Souissi, Rabat",
      notes: "Appeler 15 min avant",
    },
    items: [
      {
        id: "lumea-pf-01-v-pf01-100",
        productId: "lumea-pf-01",
        variantId: "v-pf01-100",
        name: { fr: "Ambre de l'Atlas Eau de Parfum", en: "Atlas Amber Eau de Parfum", ar: "ماء عطر عنبر الأطلس" },
        priceMad: 680,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80",
        volume: "100ml",
        stock: 20,
      },
    ],
    subtotalMad: 680,
    shippingMad: 0,
    discountMad: 0,
    totalMad: 680,
    paymentMethod: "card_demo",
    statusHistory: [
      { status: "pending", timestamp: "2026-11-19T16:45:00Z" },
      { status: "confirmed", timestamp: "2026-11-19T17:00:00Z" },
      { status: "preparing", timestamp: "2026-11-20T08:30:00Z" },
      { status: "shipped", timestamp: "2026-11-20T10:00:00Z" },
      { status: "in_delivery", timestamp: "2026-11-20T13:30:00Z", note: "Livreur en route" },
    ],
  },
  {
    id: "ord-seed-03",
    reference: "LUM-3V5B8N",
    createdAt: "2026-11-20T11:20:00Z",
    status: "confirmed",
    customer: {
      fullName: "Meryem Chraibi",
      phone: "+212663987654",
      city: "Marrakech",
      address: "Riad Zitoun El Jdid, Médina, Marrakech",
    },
    items: [
      {
        id: "lumea-gs-01-v-gs01-full",
        productId: "lumea-gs-01",
        variantId: "v-gs01-full",
        name: { fr: "Coffret Rituel Éclat Absolu", en: "Absolute Radiance Ritual Set", ar: "مجموعة طقوس الإشراق المطلق" },
        priceMad: 750,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        volume: "Coffret 3 Soins",
        stock: 15,
      },
    ],
    subtotalMad: 750,
    shippingMad: 0,
    discountMad: 75,
    totalMad: 675,
    paymentMethod: "cod",
    statusHistory: [
      { status: "pending", timestamp: "2026-11-20T11:20:00Z" },
      { status: "confirmed", timestamp: "2026-11-20T11:45:00Z", note: "Confirmée" },
    ],
  },
];

interface AppState {
  // Catalog & Data
  products: Product[];
  promotions: Promotion[];
  bundles: Bundle[];
  campaign: CampaignSettings;
  orders: Order[];

  // User Interactive State
  cart: CartItem[];
  wishlist: WishlistItem[];
  appliedPromotion: Promotion | null;
  routineAnswers: RoutineFinderAnswers | null;

  // Cart Actions
  addToCart: (product: Product, variantId?: string, quantity?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromotionCode: (code: string) => { success: boolean; message?: string };
  removePromotionCode: () => void;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartShipping: () => number;
  getCartTotal: () => number;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Orders
  createOrder: (orderInput: {
    customer: Order['customer'];
    items: CartItem[];
    subtotalMad: number;
    shippingMad: number;
    discountMad: number;
    totalMad: number;
    paymentMethod: 'cod' | 'card_demo';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderByReference: (ref: string) => Order | undefined;

  // Routine Finder
  setRoutineAnswers: (answers: RoutineFinderAnswers | null) => void;

  // Admin CRUD & Settings
  addProduct: (newProduct: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPromotion: (promo: Promotion) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  addBundle: (bundle: Bundle) => void;
  updateBundle: (id: string, updates: Partial<Bundle>) => void;
  deleteBundle: (id: string) => void;
  updateCampaign: (updates: Partial<CampaignSettings>) => void;
  resetDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      promotions: INITIAL_PROMOTIONS,
      bundles: INITIAL_BUNDLES,
      campaign: INITIAL_CAMPAIGN,
      orders: INITIAL_DEMO_ORDERS,
      cart: [],
      wishlist: [],
      appliedPromotion: null,
      routineAnswers: null,

      // Cart Actions
      addToCart: (product, variantId, quantity = 1) => {
        const currentProducts = get().products;
        const liveProduct = currentProducts.find((p) => p.id === product.id) || product;

        let selectedPrice = liveProduct.discountPriceMad ?? liveProduct.priceMad;
        let selectedVolume = liveProduct.volume;
        let selectedStock = liveProduct.stock;
        let targetId = liveProduct.id;

        if (variantId && liveProduct.variants && liveProduct.variants.length > 0) {
          const variant = liveProduct.variants.find((v) => v.id === variantId);
          if (variant) {
            targetId = `${liveProduct.id}-${variant.id}`;
            selectedPrice = variant.discountPriceMad ?? variant.priceMad;
            selectedVolume = variant.volume;
            selectedStock = variant.stock;
          }
        }

        if (selectedStock <= 0) return false;

        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === targetId);

        if (existingItem) {
          const newQty = Math.min(existingItem.quantity + quantity, selectedStock);
          set({
            cart: currentCart.map((item) =>
              item.id === targetId ? { ...item, quantity: newQty } : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: targetId,
            productId: liveProduct.id,
            variantId: variantId,
            name: liveProduct.name,
            priceMad: selectedPrice,
            quantity: Math.min(quantity, selectedStock),
            image: liveProduct.images[0] || "",
            volume: selectedVolume,
            stock: selectedStock,
          };
          set({ cart: [...currentCart, newItem] });
        }
        return true;
      },

      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.id !== cartItemId) });
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) => {
            if (item.id === cartItemId) {
              return { ...item, quantity: Math.min(quantity, item.stock) };
            }
            return item;
          }),
        });
      },

      clearCart: () => {
        set({ cart: [], appliedPromotion: null });
      },

      applyPromotionCode: (code) => {
        const clean = code.trim().toUpperCase();
        const promo = get().promotions.find(
          (p) => p.code.toUpperCase() === clean && p.isActive
        );
        if (!promo) {
          return { success: false, message: "Code promo non reconnu ou inactif." };
        }
        const subtotal = get().getCartSubtotal();
        if (subtotal < promo.minSpendMad) {
          return {
            success: false,
            message: `Ce code nécessite un panier minimum de ${promo.minSpendMad} MAD.`,
          };
        }
        set({ appliedPromotion: promo });
        return { success: true };
      },

      removePromotionCode: () => {
        set({ appliedPromotion: null });
      },

      getCartSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.priceMad * item.quantity, 0);
      },

      getCartDiscount: () => {
        const promo = get().appliedPromotion;
        const subtotal = get().getCartSubtotal();
        if (!promo || subtotal < promo.minSpendMad) return 0;
        return Math.round((subtotal * promo.discountPercent) / 100);
      },

      getCartShipping: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        const threshold = get().campaign.deliveryPromoThreshold || 500;
        return subtotal >= threshold ? 0 : 35;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getCartDiscount();
        const shipping = get().getCartShipping();
        return Math.max(0, subtotal - discount + shipping);
      },

      // Wishlist Actions
      toggleWishlist: (productId) => {
        const current = get().wishlist;
        const exists = current.some((item) => item.productId === productId);
        if (exists) {
          set({ wishlist: current.filter((item) => item.productId !== productId) });
        } else {
          set({
            wishlist: [...current, { productId, addedAt: new Date().toISOString() }],
          });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.productId === productId);
      },

      // Checkout & Orders
      createOrder: (orderInput) => {
        const newOrder: Order = {
          id: `ord-${Date.now()}`,
          reference: generateOrderReference(),
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          customer: orderInput.customer,
          items: [...orderInput.items],
          subtotalMad: orderInput.subtotalMad,
          shippingMad: orderInput.shippingMad,
          discountMad: orderInput.discountMad,
          totalMad: orderInput.totalMad,
          paymentMethod: orderInput.paymentMethod,
          statusHistory: [
            {
              status: 'pending',
              timestamp: new Date().toISOString(),
              note: 'Commande enregistrée dans le sandbox démo',
            },
            {
              status: 'confirmed',
              timestamp: new Date(Date.now() + 1000).toISOString(),
              note: 'Confirmation automatique de démonstration',
            },
          ],
        };

        // Decrement stock in catalog
        const updatedProducts = get().products.map((prod) => {
          const itemOrdered = orderInput.items.find((i) => i.productId === prod.id);
          if (itemOrdered) {
            const newStock = Math.max(0, prod.stock - itemOrdered.quantity);
            return { ...prod, stock: newStock };
          }
          return prod;
        });

        set({
          orders: [newOrder, ...get().orders],
          cart: [],
          appliedPromotion: null,
          products: updatedProducts,
        });

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus, note) => {
        set({
          orders: get().orders.map((order) => {
            if (order.id === orderId) {
              const updatedHistory = [
                ...order.statusHistory,
                {
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  note: note || `Statut mis à jour : ${newStatus}`,
                },
              ];
              return {
                ...order,
                status: newStatus,
                statusHistory: updatedHistory,
              };
            }
            return order;
          }),
        });
      },

      getOrderByReference: (ref) => {
        const clean = ref.trim().toUpperCase();
        return get().orders.find((o) => o.reference.toUpperCase() === clean);
      },

      // Routine Finder
      setRoutineAnswers: (answers) => {
        set({ routineAnswers: answers });
      },

      // Admin CRUD
      addProduct: (newProd) => {
        set({ products: [newProd, ...get().products] });
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        });
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },

      addPromotion: (promo) => {
        set({ promotions: [promo, ...get().promotions] });
      },

      updatePromotion: (id, updates) => {
        set({
          promotions: get().promotions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        });
      },

      deletePromotion: (id) => {
        set({ promotions: get().promotions.filter((p) => p.id !== id) });
      },

      addBundle: (bundle) => {
        set({ bundles: [bundle, ...get().bundles] });
      },

      updateBundle: (id, updates) => {
        set({
          bundles: get().bundles.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        });
      },

      deleteBundle: (id) => {
        set({ bundles: get().bundles.filter((b) => b.id !== id) });
      },

      updateCampaign: (updates) => {
        set({ campaign: { ...get().campaign, ...updates } });
      },

      resetDemoData: () => {
        set({
          products: INITIAL_PRODUCTS,
          promotions: INITIAL_PROMOTIONS,
          bundles: INITIAL_BUNDLES,
          campaign: INITIAL_CAMPAIGN,
          orders: INITIAL_DEMO_ORDERS,
          cart: [],
          wishlist: [],
          appliedPromotion: null,
          routineAnswers: null,
        });
      },
    }),
    {
      name: 'lumea_demo_store_v2',
      storage: createJSONStorage(() => localStorage),
      version: 2,
    }
  )
);

