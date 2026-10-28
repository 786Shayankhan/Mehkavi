import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod, ShippingAddress } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Building2, 
  Wallet, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface CheckoutPageProps {
  onOrderCompleted: (orderId: string) => void;
  onNavigate: (route: string) => void;
}

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Gujrat',
  'Sukkur',
  'Mardan',
  'Wah Cantt',
  'Mirpur (AJK)',
  'Other City in Pakistan'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderCompleted, onNavigate }) => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    formatPrice, 
    appliedCoupon, 
    placeOrder,
    user 
  } = useApp();

  // Shipping details form
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+92 ');
  const [address, setAddress] = useState(user?.defaultAddress?.address || '');
  const [apartment, setApartment] = useState(user?.defaultAddress?.apartment || '');
  const [city, setCity] = useState(user?.defaultAddress?.city || 'Karachi');
  const [postalCode, setPostalCode] = useState(user?.defaultAddress?.postalCode || '');
  const [orderNotes, setOrderNotes] = useState('');

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [bankRef, setBankRef] = useState('');
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Mobile wallet
  const [walletPhone, setWalletPhone] = useState('');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Recalculate shipping based on choice
  const calculatedShipping = 
    shippingMethod === 'express' 
      ? 400 
      : cartShipping;

  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + calculatedShipping);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!fullName.trim()) {
      setValidationError('Please enter your full recipient name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address for order notifications.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setValidationError('Please enter a valid Pakistani contact phone number (e.g. 0300 1234567).');
      return;
    }
    if (!address.trim()) {
      setValidationError('Please enter your complete street address.');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !bankRef.trim()) {
      setValidationError('Please enter your bank transfer transaction reference / slip ID.');
      return;
    }

    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16 || !cardExpiry || !cardCvv) {
        setValidationError('Please enter valid credit/debit card information.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const shippingAddress: ShippingAddress = {
        fullName,
        email,
        phone,
        address,
        apartment,
        city,
        postalCode,
        notes: orderNotes
      };

      const createdOrder = await placeOrder(
        shippingAddress, 
        paymentMethod, 
        paymentMethod === 'bank_transfer' ? bankRef : undefined
      );

      // Redirect to confirmation
      onOrderCompleted(createdOrder.orderNumber);
    } catch {
      setValidationError('Failed to place order. Please try again or contact our Karachi studio.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8FAFA] min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <p className="text-base text-gray-700 font-serif mb-4">Your bag is empty. Please select fragrances to checkout.</p>
          <button
            onClick={() => onNavigate('collection')}
            className="bg-[#0A3B44] text-white px-6 py-3 rounded-sm uppercase tracking-widest font-bold text-xs"
          >
            Explore Fragrances
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Steps (Exact Moodboard Design) */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-bold text-[#0A2328]">
          <div className="flex items-center gap-2 text-[#0891B2]">
            <span className="w-5 h-5 rounded-full bg-[#0891B2] text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Shipping Details</span>
          </div>
          <span className="text-gray-300">──</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Payment</span>
          </div>
          <span className="text-gray-300">──</span>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Review & Place Order</span>
          </div>
        </div>

        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            {validationError}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left: Shipping & Payment Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8F0F2] pb-3">
                <h2 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0A3B44] text-white text-[11px] flex items-center justify-center font-sans">1</span>
                  <span>Contact Information</span>
                </h2>
                {!user && (
                  <span className="text-[11px] text-[#527076]">Guest Checkout</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Email for Confirmation *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Phone (For Delivery Rider) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-[#E8F0F2] pb-3">
                <h2 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0A3B44] text-white text-[11px] flex items-center justify-center font-sans">2</span>
                  <span>Delivery Address</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Full Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Farhan Zaidi"
                    className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Complete Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Plot #, Street name, Sector or Block"
                    className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block font-bold uppercase text-[#333] mb-1">Apartment / Unit</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Floor 3, Apt 4B"
                      className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block font-bold uppercase text-[#333] mb-1">Destination City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs font-semibold focus:outline-none focus:border-[#0891B2]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block font-bold uppercase text-[#333] mb-1">Postal Code (Optional)</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 75500"
                      className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Special Rider Instructions</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Please ring bell twice or call on arrival"
                    className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded p-2.5 text-xs focus:outline-none focus:border-[#0891B2]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Shipping Speed */}
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-[#E8F0F2] pb-3">
                <h2 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0A3B44] text-white text-[11px] flex items-center justify-center font-sans">3</span>
                  <span>Shipping Option</span>
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* Standard */}
                <label 
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded border flex items-center justify-between cursor-pointer transition ${
                    shippingMethod === 'standard' 
                      ? 'border-[#0891B2] bg-[#EEF5F6]' 
                      : 'border-[#D0E2E5] hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div>
                      <p className="font-bold text-sm text-[#0A2328]">Standard Nationwide Delivery</p>
                      <p className="text-[11px] text-[#527076]">3-4 working days via Leopard / TCS Express</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#0A2328]">
                    {cartShipping === 0 ? 'FREE' : formatPrice(cartShipping)}
                  </span>
                </label>

                {/* Priority Swift */}
                <label 
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded border flex items-center justify-between cursor-pointer transition ${
                    shippingMethod === 'express' 
                      ? 'border-[#0891B2] bg-[#EEF5F6]' 
                      : 'border-[#D0E2E5] hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div>
                      <p className="font-bold text-sm text-[#0A2328]">Swift Priority Air Courier</p>
                      <p className="text-[11px] text-[#527076]">1-2 working days fast dispatch with tracking</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#0A2328]">
                    {formatPrice(400)}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-[#E8F0F2] pb-3">
                <h2 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0A3B44] text-white text-[11px] flex items-center justify-center font-sans">4</span>
                  <span>Payment Method</span>
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded border cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-[#0891B2] bg-[#EEF5F6]' : 'border-[#D0E2E5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#0A2328] flex items-center gap-2">
                          <Banknote size={18} className="text-[#0891B2]" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] bg-[#DCE8EA] text-[#444] px-2 py-0.5 rounded font-bold uppercase">
                          Most Popular
                        </span>
                      </div>
                      <p className="text-[11px] text-[#666] mt-1">
                        Pay with cash upon package arrival at your doorstep. No prepayment required.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Bank Transfer */}
                <div 
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded border cursor-pointer transition ${
                    paymentMethod === 'bank_transfer' ? 'border-[#0891B2] bg-[#EEF5F6]' : 'border-[#D0E2E5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-sm text-[#0A2328] flex items-center gap-2">
                        <Building2 size={18} className="text-[#0891B2]" />
                        Direct Bank Transfer (Meezan / Alfalah / HBL)
                      </span>
                      <p className="text-[11px] text-[#666] mt-1">
                        Transfer via online banking/mobile app. Enter your transaction reference below.
                      </p>
                    </div>
                  </div>

                  {/* Bank Details Dropdown when selected */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-4 pt-3 border-t border-[#D6E6E8] space-y-3 bg-white p-3.5 rounded border border-[#CDE1E4]">
                      <div className="space-y-1 text-xs">
                        <p><strong>Bank:</strong> Meezan Bank Ltd</p>
                        <p><strong>Account Title:</strong> MEHKAVI HAUTE PARFUMERIE</p>
                        <p><strong>Account Number:</strong> 01020304050607</p>
                        <p><strong>IBAN:</strong> PK55MEZN0001020304050607</p>
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-bold text-[#0A2328] uppercase mb-1">
                          Transaction Reference / Slip ID *
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'bank_transfer'}
                          value={bankRef}
                          onChange={(e) => setBankRef(e.target.value)}
                          placeholder="e.g. MEZN-TXN-84920"
                          className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Credit / Debit Card */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded border cursor-pointer transition ${
                    paymentMethod === 'card' ? 'border-[#0891B2] bg-[#EEF5F6]' : 'border-[#D0E2E5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-sm text-[#0A2328] flex items-center gap-2">
                        <CreditCard size={18} className="text-[#0891B2]" />
                        Debit / Credit Card (Visa / Mastercard)
                      </span>
                      <p className="text-[11px] text-[#666] mt-1">
                        Instant secure card verification via 3D-Secure gateway.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-[#D6E6E8] space-y-3 bg-white p-3.5 rounded border border-[#CDE1E4]">
                      <div>
                        <label className="block text-xs font-bold text-[#333] mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name as printed on card"
                          className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#333] mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#333] mb-1">MM / YY</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#333] mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* JazzCash / EasyPaisa */}
                <div 
                  onClick={() => setPaymentMethod('jazzcash_easypaisa')}
                  className={`p-4 rounded border cursor-pointer transition ${
                    paymentMethod === 'jazzcash_easypaisa' ? 'border-[#0891B2] bg-[#EEF5F6]' : 'border-[#D0E2E5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'jazzcash_easypaisa'}
                      onChange={() => setPaymentMethod('jazzcash_easypaisa')}
                      className="text-[#0891B2] focus:ring-0"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-sm text-[#0A2328] flex items-center gap-2">
                        <Wallet size={18} className="text-[#0891B2]" />
                        JazzCash / EasyPaisa Mobile Wallet
                      </span>
                      <p className="text-[11px] text-[#666] mt-1">
                        Receive instant approval prompt on your mobile phone.
                      </p>
                    </div>
                  </div>

                  {paymentMethod === 'jazzcash_easypaisa' && (
                    <div className="mt-4 pt-3 border-t border-[#D6E6E8] space-y-2 bg-white p-3.5 rounded border border-[#CDE1E4]">
                      <label className="block text-xs font-bold text-[#333]">
                        Mobile Wallet Account Number
                      </label>
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="0300 0000000"
                        className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                      />
                      <p className="text-[10px] text-gray-500">You will receive an MPIN confirmation prompt on your phone screen.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* Right: Order Summary Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-md space-y-5 sticky top-24">
              <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-3">
                Order Review ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#E8F0F2] max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="py-3 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded bg-[#F8FAFA] border border-[#DCE8EA] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#0A2328] truncate">
                        {item.product.name}
                      </h4>
                      {item.product.inspiredBy && (
                        <p className="text-[10px] text-[#0891B2] truncate font-medium">
                          {item.product.inspiredBy}
                        </p>
                      )}
                      <p className="text-[10px] text-[#777]">
                        Size: {item.variant.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-xs text-[#0A2328]">
                      {formatPrice(item.variant.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[#555] pt-3 border-t border-[#E8F0F2]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0A2328]">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span>
                    {calculatedShipping === 0 ? (
                      <span className="text-[#2E7D32] font-bold">FREE DELIVERY</span>
                    ) : (
                      formatPrice(calculatedShipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold text-[#0A2328] pt-3 border-t border-[#DCE8EA]">
                  <span>Total</span>
                  <span className="font-serif text-[#0A2328]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA (Moodboard Place Order Pill) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0A3842] hover:bg-[#072B33] text-white py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <span>Place Order</span>
                )}
              </button>

              <div className="text-center text-[11px] text-[#527076] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck size={14} className="text-[#0891B2]" />
                <span>Your information is safe and secure</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
