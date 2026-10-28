import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
  };

  const handleViewBag = () => {
    setIsCartOpen(false);
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8FAFA] shadow-2xl flex flex-col border-l border-[#D6E6E8]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#DCE8EA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#0891B2]" />
              <h2 className="font-serif text-lg font-bold tracking-wider text-[#0A2328] uppercase">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#EEF5F6] p-3.5 border-b border-[#D6E6E8]">
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-[#3A5359]">
              <Truck size={16} className="text-[#0891B2] shrink-0" />
              {freeShippingRemaining === 0 ? (
                <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Congratulations! You unlocked FREE Standard Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#0891B2]">{formatPrice(freeShippingRemaining)}</strong> more to unlock <strong>FREE DELIVERY</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-[#D6E6E8] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#0891B2] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 bg-[#E2EEF0] rounded-full flex items-center justify-center mb-4 text-[#0891B2]">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0A2328]">Your bag is currently empty</h3>
                <p className="text-xs text-[#527076] mt-2 mb-6 max-w-xs">
                  Discover our concentrated impressions and artisanal perfume extraits crafted for maximum sillage and longevity.
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); onNavigate('collection'); }}
                  className="bg-[#0A3B44] hover:bg-[#0891B2] text-white text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-sm transition"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-3.5 p-3.5 bg-white border border-[#DCE8EA] rounded-sm shadow-sm relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-sm bg-[#EEF5F6] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-[#0A2328] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-gray-400 hover:text-red-600 transition p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {item.product.inspiredBy && (
                        <p className="text-[11px] text-[#0891B2] font-medium mt-0.5 line-clamp-1">
                          {item.product.inspiredBy}
                        </p>
                      )}

                      <span className="inline-block text-[11px] font-semibold text-[#48656B] bg-[#EEF5F6] px-2 py-0.5 rounded mt-1">
                        {item.variant.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EEF5F6]">
                      {/* Qty Selector */}
                      <div className="flex items-center border border-[#D0E2E5] rounded">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#111] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-bold text-sm text-[#0A2328]">
                          {formatPrice(item.variant.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-gray-500">
                            {formatPrice(item.variant.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout if not empty */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#DCE8EA] shadow-lg space-y-3">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#F4F9F4] border border-[#C8E6C9] p-2 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                      <Tag size={14} />
                      <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (e.g. MEHKAVI10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs border border-[#D0E2E5] rounded px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-[#0891B2]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2B2825] hover:bg-[#111] text-white text-xs font-bold px-4 py-2 rounded transition uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-red-600 text-[11px] mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#555] pt-2 border-t border-[#E8F0F2]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0A2328]">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {cartShipping === 0 ? (
                      <span className="text-[#2E7D32] font-semibold">FREE</span>
                    ) : (
                      formatPrice(cartShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#0A2328] pt-2 border-t border-[#DCE8EA]">
                  <span>Total</span>
                  <span className="font-serif">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0A3B44] hover:bg-[#0891B2] text-white py-3.5 px-4 rounded-sm font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition shadow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={handleViewBag}
                  className="w-full bg-transparent hover:bg-[#F8F5F0] text-[#3A5359] py-2 text-xs font-semibold uppercase tracking-wider transition border border-[#D0E2E5] rounded-sm"
                >
                  View Shopping Bag Page
                </button>
              </div>

              {/* Trust message */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-[#527076] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#0891B2]" />
                  100% Authentic Extrait
                </span>
                <span>•</span>
                <span>15-Day Hassle-Free Exchange</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
