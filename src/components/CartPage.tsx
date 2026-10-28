import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [orderNotes, setOrderNotes] = useState('');

  const freeShippingThreshold = 5000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMsg(null);
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMsg({ text: res.message, error: false });
      setCouponCode('');
    } else {
      setCouponMsg({ text: res.message, error: true });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8FAFA] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 bg-[#EEF5F6] rounded-full flex items-center justify-center mx-auto mb-5 text-[#0891B2]">
            <ShoppingBag size={36} />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A2328] uppercase tracking-wide">
            Your Shopping Bag Is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#527076] mt-2 mb-8">
            Experience our artisanal impressions with 35% pure French essence oils and 14-18+ hours longevity.
          </p>
          <button
            onClick={() => onNavigate('collection')}
            className="bg-[#0A3B44] hover:bg-[#0891B2] text-white text-xs uppercase font-bold tracking-widest px-8 py-4 rounded-sm transition shadow-lg"
          >
            Explore Bestseller Fragrances
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Moodboard Style) */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A2328] tracking-wide">
            Shopping Cart
          </h1>
          <button
            onClick={() => onNavigate('collection')}
            className="text-xs text-[#527076] hover:text-[#0A3842] flex items-center gap-1.5 font-semibold"
          >
            <ArrowLeft size={14} /> &lt; Continue Shopping
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-white border border-[#DCE8EA] p-4 sm:p-5 rounded-2xl mb-8 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-medium text-[#48656B]">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-[#0891B2] shrink-0" />
              {freeShippingRemaining === 0 ? (
                <span className="text-[#16A34A] font-bold flex items-center gap-1">
                  <CheckCircle2 size={15} /> You have unlocked Free Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#0891B2] font-bold">{formatPrice(freeShippingRemaining)}</strong> more for free shipping!
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#0891B2]">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full bg-[#E0ECED] h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#0891B2] to-[#22D3EE] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-[#DCE8EA] rounded-sm shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#E8F0F2] hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-[#777]">
                <span className="col-span-6">Fragrance</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              <div className="divide-y divide-[#E8F0F2]">
                {cart.map((item) => (
                  <div 
                    key={`${item.productId}-${item.variantId}`}
                    className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4"
                  >
                    {/* Product & Variant info */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-sm bg-[#F8FAFA] shrink-0 border border-[#DCE8EA]"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-base text-[#0A2328]">
                          {item.product.name}
                        </h3>
                        {item.product.inspiredBy && (
                          <p className="text-xs text-[#0891B2] font-medium mt-0.5">
                            {item.product.inspiredBy}
                          </p>
                        )}
                        <span className="inline-block text-[11px] font-semibold text-[#48656B] bg-[#EEF5F6] px-2 py-0.5 rounded mt-1.5 border border-[#DCE8EA]">
                          Size: {item.variant.size}
                        </span>

                        <div className="mt-2 sm:hidden flex items-center justify-between">
                          <span className="font-bold text-sm text-[#0A2328]">
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-center hidden sm:block text-xs font-semibold text-[#555]">
                      {formatPrice(item.variant.price)}
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <div className="flex items-center border border-[#D0E2E5] rounded">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#0A2328]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="text-gray-400 hover:text-red-600 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-right hidden sm:block font-serif font-bold text-base text-[#0A2328]">
                      {formatPrice(item.variant.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart link */}
              <div className="p-4 bg-[#F8FAFA] border-t border-[#E8F0F2] flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-600 font-medium transition"
                >
                  Empty Shopping Bag
                </button>
                <span className="text-[#888]">All prices inclusive of applicable taxes</span>
              </div>
            </div>

            {/* Special Instructions / Gift Note */}
            <div className="bg-white border border-[#DCE8EA] p-5 rounded-sm shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A2328] mb-2">
                Order Notes & Gift Packaging Instructions (Optional)
              </label>
              <textarea
                rows={3}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Include customized gift ribbon or delivery instructions for courier..."
                className="w-full text-xs p-3 border border-[#D0E2E5] rounded focus:outline-none focus:border-[#0891B2] bg-[#F8FAFA]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-[#DCE8EA] p-6 sm:p-7 rounded-2xl shadow-sm space-y-5">
              <h2 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-3">
                Order Summary
              </h2>

              {/* Coupon Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#F4F9F4] border border-[#C8E6C9] p-3 rounded-xl text-xs">
                    <div>
                      <span className="font-bold text-[#16A34A] flex items-center gap-1">
                        <Tag size={13} /> {appliedCoupon.code}
                      </span>
                      <p className="text-[11px] text-[#555]">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="block text-xs font-bold text-[#444] uppercase tracking-wider">
                      Apply Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 text-xs border border-[#D0E2E5] rounded-lg px-3 py-2.5 uppercase tracking-wider focus:outline-none focus:border-[#0A3842]"
                      />
                      <button
                        type="submit"
                        className="bg-[#0A3842] hover:bg-[#072B33] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition uppercase tracking-wider"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                )}

                {couponMsg && (
                  <p className={`text-xs mt-1.5 font-medium ${couponMsg.error ? 'text-red-600' : 'text-[#16A34A]'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs text-[#555] pt-3 border-t border-[#E8F0F2]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0A2328]">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#16A34A] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {cartShipping === 0 ? (
                      <span className="text-[#16A34A] font-bold">Rs. 0</span>
                    ) : (
                      formatPrice(cartShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold text-[#0A2328] pt-3 border-t border-[#DCE8EA]">
                  <span>Total</span>
                  <span className="font-serif">{formatPrice(cartTotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <p className="text-[11px] text-[#0891B2] font-semibold text-right">
                    You saved {formatPrice(cartDiscount)}
                  </p>
                )}
              </div>

              {/* Proceed to Checkout CTA (Moodboard Pill) */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-[#0A3842] hover:bg-[#072B33] text-white py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              {/* Guarantees */}
              <div className="pt-2 border-t border-[#E8F0F2] space-y-2 text-[11px] text-[#527076]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#0891B2]" />
                  <span>15-Day Satisfaction Exchange Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-[#0891B2]" />
                  <span>Cash on Delivery available nationwide</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
