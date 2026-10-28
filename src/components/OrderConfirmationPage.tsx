import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Printer, 
  ShoppingBag, 
  Truck, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Building2,
  Banknote
} from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (route: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ 
  orderId, 
  onNavigate 
}) => {
  const { getOrderById, formatPrice } = useApp();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="bg-[#F8FAFA] min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <p className="text-base text-gray-700 font-serif mb-4">Order record not found.</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#0A3B44] text-white px-6 py-3 rounded-sm uppercase tracking-widest font-bold text-xs"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello MEHKAVI Team, I just placed order #${order.orderNumber} for ${formatPrice(order.total)}. Please confirm my order dispatch.`
  );

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white border border-[#DCE8EA] rounded-sm p-6 sm:p-10 shadow-sm text-center">
          
          <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0891B2] block mb-1">
            Order Confirmed Successfully
          </span>

          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0A2328] uppercase tracking-wide">
            Thank You For Your Order!
          </h1>

          <p className="text-xs sm:text-sm text-[#48656B] mt-2 max-w-lg mx-auto">
            Your artisanal fragrances are being prepared for dispatch from our Karachi studio. A confirmation has been registered under order number:
          </p>

          <div className="inline-block mt-4 bg-[#EEF5F6] border border-[#CDE1E4] px-5 py-2.5 rounded-sm">
            <span className="text-xs text-[#527076] block uppercase tracking-wider font-semibold">Order Number</span>
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#0A2328] tracking-wider">
              {order.orderNumber}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/923348882358?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Confirmation</span>
            </a>

            <button
              onClick={handlePrint}
              className="bg-[#EEF5F6] hover:bg-[#F2ECE3] text-[#333] border border-[#D0E2E5] px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
            >
              <Printer size={15} />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Bank Instructions notice if applicable */}
        {order.paymentMethod === 'bank_transfer' && (
          <div className="mt-6 bg-[#FFF9EE] border border-[#FFE0A3] p-5 rounded-sm text-xs text-[#855B00] space-y-2">
            <h4 className="font-serif font-bold text-sm uppercase flex items-center gap-2">
              <Building2 size={16} />
              Bank Transfer Verification in Progress
            </h4>
            <p>
              Thank you for transferring to <strong>Meezan Bank Ltd</strong> (Account: 01020304050607 / IBAN: PK55MEZN0001020304050607). Your reference: <strong>{order.bankReferenceNumber || 'Submitted'}</strong>. Our accounts team will verify and dispatch within 24 hours.
            </p>
          </div>
        )}

        {/* Order Details & Summary Card */}
        <div className="mt-8 bg-white border border-[#DCE8EA] rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-3">
            Order & Delivery Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#3A5359]">
            {/* Delivery Address */}
            <div className="p-4 bg-[#F8FAFA] rounded-sm border border-[#DCE8EA]">
              <span className="font-bold text-[#0A2328] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Truck size={14} className="text-[#0891B2]" />
                Delivery Details
              </span>
              <p className="font-semibold text-[#0A2328]">{order.customer.fullName}</p>
              <p>{order.customer.address}</p>
              {order.customer.apartment && <p>{order.customer.apartment}</p>}
              <p className="font-semibold text-[#0A2328]">{order.customer.city}, Pakistan</p>
              <p className="mt-1 text-[#777]">{order.customer.phone}</p>
              <p className="text-[#777]">{order.customer.email}</p>
            </div>

            {/* Estimated Arrival */}
            <div className="p-4 bg-[#F8FAFA] rounded-sm border border-[#DCE8EA]">
              <span className="font-bold text-[#0A2328] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-[#0891B2]" />
                Estimated Arrival
              </span>
              <p className="font-semibold text-[#0A2328]">{order.estimatedDeliveryDate}</p>
              <p className="mt-1">Status: <strong className="text-[#2E7D32]">{order.status}</strong></p>
              {order.trackingNumber && (
                <p className="mt-2 text-[#777]">
                  Tracking Courier: <span className="font-mono text-[#0A2328] font-semibold">{order.trackingNumber}</span>
                </p>
              )}
            </div>

            {/* Payment Summary */}
            <div className="p-4 bg-[#F8FAFA] rounded-sm border border-[#DCE8EA]">
              <span className="font-bold text-[#0A2328] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Banknote size={14} className="text-[#0891B2]" />
                Payment Method
              </span>
              <p className="font-semibold text-[#0A2328] uppercase">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod.replace('_', ' ')}
              </p>
              <p className="mt-1">Payment Status: <strong>{order.paymentStatus}</strong></p>
              <p className="mt-2 font-serif font-bold text-base text-[#0A2328]">
                Total: {formatPrice(order.total)}
              </p>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className="pt-4 border-t border-[#E8F0F2]">
            <h4 className="font-serif font-bold text-sm text-[#0A2328] uppercase tracking-wider mb-4">
              Items In This Parcel
            </h4>

            <div className="divide-y divide-[#E8F0F2]">
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover rounded bg-[#F8FAFA] border border-[#DCE8EA]"
                    />
                    <div>
                      <h5 className="font-serif font-bold text-sm text-[#0A2328]">{item.product.name}</h5>
                      {item.product.inspiredBy && (
                        <p className="text-[11px] text-[#0891B2] font-medium">{item.product.inspiredBy}</p>
                      )}
                      <p className="text-[11px] text-[#777]">Size: {item.variant.size} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#0A2328]">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary breakdown */}
            <div className="mt-4 pt-4 border-t border-[#E8F0F2] space-y-1.5 text-xs text-[#666] max-w-xs ml-auto">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0A2328]">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#0A2328] pt-2 border-t border-[#DCE8EA]">
                <span>Total Paid / Due</span>
                <span className="font-serif">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="pt-6 border-t border-[#E8F0F2] flex justify-center">
            <button
              onClick={() => onNavigate('collection')}
              className="bg-[#0A3B44] hover:bg-[#0891B2] text-white px-8 py-3.5 rounded-sm text-xs uppercase font-bold tracking-widest transition flex items-center gap-2"
            >
              <span>Continue Exploring Fragrances</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
