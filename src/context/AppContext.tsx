import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  UserProfile, 
  Coupon, 
  Currency, 
  ProductVariant, 
  OrderStatus,
  ShippingAddress,
  PaymentMethod,
  ProductReview,
  ContactInquiry
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/initialProducts';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: UserProfile | null;
  orders: Order[];
  coupons: Coupon[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (pricePKR: number) => string;
  
  // Contact & Inquiries
  contactInquiries: ContactInquiry[];
  submitContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => Promise<{ success: boolean; message: string; inquiryId?: string }>;
  
  // Cart Actions
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartCount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Feedback Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Auth & Profile
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Orders
  placeOrder: (
    shippingAddress: ShippingAddress, 
    paymentMethod: PaymentMethod,
    bankRef?: string
  ) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Admin Operations
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  deleteReview: (productId: string, reviewId: string) => void;
  toggleCoupon: (code: string) => void;
  addCoupon: (coupon: Coupon) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  PKR: { rate: 1, symbol: 'Rs. ', prefix: true },
  USD: { rate: 0.0036, symbol: '$', prefix: true },
  AED: { rate: 0.013, symbol: 'AED ', prefix: true },
  GBP: { rate: 0.0028, symbol: '£', prefix: true }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial products from local storage or seed
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_products_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ord-1001',
        orderNumber: 'MK-2026-8741',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        customer: {
          fullName: 'Ahmed Raza',
          email: 'ahmed.raza@example.com',
          phone: '+92 300 1234567',
          address: 'House # 45, Street 12, Phase 5, DHA',
          city: 'Karachi',
          postalCode: '75500'
        },
        items: [
          {
            productId: 'mehkavi-001',
            variantId: 'fp-50ml',
            product: INITIAL_PRODUCTS[0],
            variant: INITIAL_PRODUCTS[0].variants[1],
            quantity: 1
          }
        ],
        subtotal: 2950,
        discount: 0,
        shipping: 250,
        total: 3200,
        paymentMethod: 'cod',
        paymentStatus: 'Pending',
        status: 'Dispatched',
        trackingNumber: 'TCS-92847192',
        estimatedDeliveryDate: 'Tomorrow by 5 PM'
      }
    ];
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_coupons');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<Currency>('PKR');

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('mehkavi_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('mahakawi_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'MHK-INQ-1001',
        fullName: 'Zainab Fatima',
        email: 'zainab.f@example.com',
        phone: '+92 321 4455667',
        subject: 'Custom Extrait Bridal Gift Set',
        inquiryType: 'Product Inquiry',
        message: 'Hello MAHAKAWI team, I would like to inquire about creating a personalized fragrance box for our upcoming wedding in November.',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
        status: 'In Review'
      }
    ];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('mehkavi_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mehkavi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mehkavi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mehkavi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mehkavi_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mehkavi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mehkavi_user');
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const formatPrice = (pricePKR: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = pricePKR * config.rate;
    if (currency === 'PKR') {
      return `Rs. ${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  // Cart logic
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          product,
          variant,
          quantity
        }
      ];
    });

    showToast(`Added ${product.name} (${variant.size}) to cart`, 'success');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.variantId === variantId)));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Discount calculation
  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      cartDiscount = appliedCoupon.discountAmount;
    }
  }

  // Shipping calculation: Free if over Rs. 5000 or FREESHIP coupon
  const cartShipping = 
    cart.length === 0 
      ? 0 
      : cartSubtotal >= 5000 || (appliedCoupon && appliedCoupon.freeShipping)
      ? 0 
      : 250;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum spend of Rs. ${found.minSpend.toLocaleString()} required for this coupon`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist logic
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth mock
  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    if (email === 'admin@mehkavi.com' && pass === 'admin123') {
      const adminUser: UserProfile = {
        id: 'usr-admin',
        name: 'MEHKAVI Executive Admin',
        email: 'admin@mehkavi.com',
        phone: '+92 334 8882358',
        role: 'admin',
        addresses: [
          {
            fullName: 'MEHKAVI Perfumes Head Office',
            email: 'admin@mehkavi.com',
            phone: '+92 334 8882358',
            address: 'Suite #402, Maryam Complex, Main Bahadurabad',
            city: 'Karachi',
            postalCode: '74800'
          }
        ]
      };
      setUser(adminUser);
      showToast('Logged in as Administrator', 'success');
      return { success: true, message: 'Admin login successful' };
    }

    if (email && pass.length >= 6) {
      const customerUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        phone: '+92 300 0000000',
        role: 'customer',
        addresses: []
      };
      setUser(customerUser);
      showToast(`Welcome back, ${customerUser.name}!`, 'success');
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid credentials. Password must be at least 6 characters.' };
  };

  const register = async (name: string, email: string, phone: string, pass: string) => {
    if (!name || !email || pass.length < 6) {
      return { success: false, message: 'Please provide valid registration details (password minimum 6 chars).' };
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      addresses: []
    };
    setUser(newUser);
    showToast(`Account created! Welcome to MEHKAVI, ${name}.`, 'success');
    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
    showToast('Profile updated', 'success');
  };

  // Orders logic
  const placeOrder = async (
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod,
    bankRef?: string
  ): Promise<Order> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MK-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: shippingAddress,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      appliedCoupon: appliedCoupon ? appliedCoupon.code : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'card' ? 'Paid' : 'Pending',
      status: 'Confirmed',
      bankReferenceNumber: bankRef,
      trackingNumber: `MK-EXP-${randomSuffix}`,
      estimatedDeliveryDate: 'Within 3-4 working days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status}`, 'success');
  };

  // Admin Catalog operations
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added ${product.name} to catalog`, 'success');
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    showToast(`Updated ${product.name}`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from catalog', 'info');
  };

  const addReview = (productId: string, reviewData: Omit<ProductReview, 'id' | 'date'>) => {
    const newRev: ProductReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...(p.reviews || [])];
          const avgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );
    showToast('Your review has been published. Thank you!', 'success');
  };

  const deleteReview = (productId: string, reviewId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId && p.reviews) {
          const updatedReviews = p.reviews.filter((r) => r.id !== reviewId);
          const avgRating = updatedReviews.length
            ? Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1))
            : 5.0;
          return {
            ...p,
            reviews: updatedReviews,
            rating: avgRating,
            reviewCount: updatedReviews.length
          };
        }
        return p;
      })
    );
    showToast('Review removed', 'info');
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created!`, 'success');
  };

  const submitContactInquiry = async (
    data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<{ success: boolean; message: string; inquiryId?: string }> => {
    // Simulate short network request
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newInquiryId = `MHK-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: ContactInquiry = {
      ...data,
      id: newInquiryId,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    setContactInquiries((prev) => {
      const updated = [newInquiry, ...prev];
      try {
        localStorage.setItem('mahakawi_inquiries', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast('Your inquiry has been received! Our concierge will respond shortly.', 'success');
    return {
      success: true,
      message: 'Inquiry successfully submitted',
      inquiryId: newInquiryId
    };
  };

  const resetToDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCoupons(INITIAL_COUPONS);
    localStorage.removeItem('mehkavi_products_v2');
    localStorage.removeItem('mehkavi_coupons');
    showToast('Reset catalog to authentic MEHKAVI demo data', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        orders,
        coupons,
        currency,
        setCurrency,
        formatPrice,
        contactInquiries,
        submitContactInquiry,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        login,
        register,
        logout,
        updateProfile,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        deleteReview,
        toggleCoupon,
        addCoupon,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
