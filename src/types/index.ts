export type Gender = 'Men' | 'Women' | 'Unisex';

export type Classification = 
  | 'Signature' 
  | 'Exclusif' 
  | 'Prive' 
  | 'Own Creations' 
  | 'Attar Collection' 
  | 'Candles' 
  | 'Bundles';

export type OlfactoryFamily = 
  | 'Woody & Oud' 
  | 'Fresh Citrus' 
  | 'Oriental & Spicy' 
  | 'Floral & Gourmand' 
  | 'Aromatic Aquatic' 
  | 'Leather & Tobacco';

export interface ProductVariant {
  id: string;
  size: string; // e.g. "5ML Travel Spray", "50ML Extrait", "100ML Grand Extrait", "6ML Attar", "12ML Attar"
  price: number; // in PKR
  originalPrice?: number;
  inStock: boolean;
  sku: string;
}

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  inspiredBy?: string; // e.g., "Impression of Dior Sauvage"
  inspiredBrand?: string; // e.g., "Dior", "Creed", "Tom Ford", "Louis Vuitton"
  gender: Gender;
  classification: Classification;
  olfactoryFamily: OlfactoryFamily;
  concentration: string; // e.g. "Extrait De Parfum (35% Oil)", "Pure Perfume Oil", "Soy Scented Candle"
  description: string;
  shortDescription: string;
  notes: FragranceNotes;
  longevity: '8-10 Hours' | '10-14 Hours' | '14-18+ Hours';
  sillage: 'Moderate' | 'Heavy' | 'Enormous';
  season: string; // e.g. "Spring / Summer" or "All Year Round"
  occasion: string; // e.g. "Signature Daily / Office / Evening"
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  onSale?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeShipping?: boolean;
  minSpend?: number;
  description: string;
  active: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode?: string;
  notes?: string;
}

export type PaymentMethod = 
  | 'cod' 
  | 'bank_transfer' 
  | 'card' 
  | 'jazzcash_easypaisa';

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Dispatched' 
  | 'Delivered' 
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Verification Required';
  status: OrderStatus;
  bankReferenceNumber?: string;
  trackingNumber?: string;
  estimatedDeliveryDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
  defaultAddress?: ShippingAddress;
  role: 'customer' | 'admin';
}

export type Currency = 'PKR' | 'USD' | 'AED' | 'GBP';

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: string;
  message: string;
  createdAt: string;
  status: 'New' | 'In Review' | 'Resolved';
}
