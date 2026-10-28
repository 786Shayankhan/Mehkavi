import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  Package, 
  User, 
  Heart, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  LogOut, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface AccountPageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onOpenAuth: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate, onOpenAuth }) => {
  const { 
    user, 
    logout, 
    orders, 
    wishlist, 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist,
    updateProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'profile' | 'wishlist' | 'addresses'>('dashboard');
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  // Profile edit states
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');

  if (!user) {
    return (
      <div className="bg-[#F8FAFA] min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="bg-white border border-[#DCE8EA] p-8 sm:p-10 rounded-2xl shadow-sm max-w-md text-center">
          <div className="w-16 h-16 bg-[#EEF5F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0891B2]">
            <User size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0A2328] uppercase tracking-wide">
            Customer Account Access
          </h2>
          <p className="text-xs text-[#527076] mt-2 mb-6">
            Sign in to check your order dispatch tracking, manage delivery addresses, and access your saved wishlist.
          </p>
          <button
            onClick={onOpenAuth}
            className="w-full bg-[#0A3B44] hover:bg-[#0891B2] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition"
          >
            Sign In or Register
          </button>
        </div>
      </div>
    );
  }

  // Filter orders for logged in user (or show all if admin)
  const userOrders = user.role === 'admin' 
    ? orders 
    : orders.filter((o) => o.customer.email.toLowerCase() === user.email.toLowerCase() || orders.length <= 2);

  // Wishlisted product entities
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Dispatched':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Confirmed':
        return 'bg-[#EEF5F6] text-[#0891B2] border-[#CDE1E4]';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Sidebar + Right Dashboard (Moodboard Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#0A2328] uppercase tracking-wide px-2">
              My Account
            </h2>

            <div className="bg-white border border-[#DCE8EA] rounded-2xl p-3 shadow-sm space-y-1.5">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-[#0A3842] text-white shadow-md'
                    : 'text-[#48656B] hover:bg-[#F4F8F8] hover:text-[#0A2328]'
                }`}
              >
                <Package size={16} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'orders'
                    ? 'bg-[#0A3842] text-white shadow-md'
                    : 'text-[#48656B] hover:bg-[#F4F8F8] hover:text-[#0A2328]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock size={16} />
                  <span>My Orders</span>
                </div>
                <span className="text-[11px] opacity-75">{userOrders.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'profile'
                    ? 'bg-[#0A3842] text-white shadow-md'
                    : 'text-[#48656B] hover:bg-[#F4F8F8] hover:text-[#0A2328]'
                }`}
              >
                <User size={16} />
                <span>Account Details</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'addresses'
                    ? 'bg-[#0A3842] text-white shadow-md'
                    : 'text-[#48656B] hover:bg-[#F4F8F8] hover:text-[#0A2328]'
                }`}
              >
                <MapPin size={16} />
                <span>Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                  activeTab === 'wishlist'
                    ? 'bg-[#0A3842] text-white shadow-md'
                    : 'text-[#48656B] hover:bg-[#F4F8F8] hover:text-[#0A2328]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} />
                  <span>Wishlist</span>
                </div>
                <span className="text-[11px] opacity-75">{wishlistedProducts.length}</span>
              </button>

              <div className="pt-2 border-t border-[#E8F0F2]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {user.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className="w-full bg-[#0A3842] text-[#22D3EE] p-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#145C6D]"
              >
                <ShieldCheck size={16} />
                <span>Open Admin Portal</span>
              </button>
            )}
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Welcome Greeting Banner */}
            <div className="bg-white border border-[#DCE8EA] p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A2328]">
                  Welcome, {user.name}
                </h1>
                <p className="text-xs text-[#527076] mt-1 font-medium">
                  Customer since 2025 • {user.email}
                </p>
              </div>

              <button
                onClick={() => onNavigate('collection')}
                className="bg-[#0A3842] hover:bg-[#072B33] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition self-start sm:self-auto shadow-sm"
              >
                Shop New Scents
              </button>
            </div>

            {/* Dashboard / Orders Table View */}
            {(activeTab === 'dashboard' || activeTab === 'orders') && (
              <div className="bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#E8F0F2] pb-4">
                  <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide">
                    Recent Orders
                  </h3>
                  {activeTab === 'dashboard' && (
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#0891B2] hover:underline"
                    >
                      View All
                    </button>
                  )}
                </div>

                {userOrders.length === 0 ? (
                  <div className="py-12 text-center">
                    <Package size={36} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-xs text-[#527076]">No orders placed yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-[11px] uppercase tracking-wider text-[#7B959A] border-b border-[#E8F0F2]">
                        <tr>
                          <th className="pb-3 font-bold">Order ID</th>
                          <th className="pb-3 font-bold">Total</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold">Date</th>
                          <th className="pb-3 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8F0F2]">
                        {userOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#F8FAFA] transition">
                            <td className="py-4 font-mono font-bold text-[#0A2328]">
                              #{ord.orderNumber}
                            </td>
                            <td className="py-4 font-bold text-[#0A2328]">
                              {formatPrice(ord.total)}
                            </td>
                            <td className="py-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusBadge(ord.status)}`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-4 text-[#527076]">
                              {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => setTrackingOrder(ord)}
                                className="text-[#0891B2] hover:underline font-bold"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Exclusive Offers Promo Banner (Moodboard Style) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#072B33] via-[#0A3842] to-[#0E4B58] text-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#145C6D]/40">
              <div className="text-center sm:text-left">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#22D3EE] mb-1">
                  Exclusive Offers
                </h4>
                <p className="text-xs sm:text-sm text-[#D0E7EB] font-light">
                  Stay updated with our latest deals and new arrivals.
                </p>
              </div>

              <button
                onClick={() => onNavigate('collection', { filter: 'sale' })}
                className="bg-[#22D3EE] hover:bg-white text-[#072B33] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm shrink-0"
              >
                Subscribe Now
              </button>
            </div>

            {/* Tab 2: Wishlist View */}
            {activeTab === 'wishlist' && (
              <div className="bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-4 mb-6">
                  Saved Wishlist ({wishlistedProducts.length})
                </h3>

                {wishlistedProducts.length === 0 ? (
                  <div className="p-12 text-center">
                    <Heart size={36} className="mx-auto text-gray-300 mb-3" />
                    <h4 className="font-serif font-bold text-lg text-[#0A2328]">Your Wishlist is Empty</h4>
                    <p className="text-xs text-[#527076] mt-1 mb-6">Save your favorite fragrances by clicking the heart icon on any product.</p>
                    <button
                      onClick={() => onNavigate('collection')}
                      className="bg-[#0A3842] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
                    >
                      Explore Fragrances
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="bg-[#F8FAFA] border border-[#DCE8EA] rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover rounded-lg mb-3 bg-white" />
                          <h4 className="font-serif font-bold text-base text-[#0A2328]">{p.name}</h4>
                          {p.inspiredBy && <p className="text-xs text-[#0891B2] font-medium">{p.inspiredBy}</p>}
                          <p className="font-bold text-sm text-[#0A2328] mt-2">{formatPrice(p.variants[0].price)}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E8F0F2] flex gap-2">
                          <button
                            onClick={() => addToCart(p, p.variants[0], 1)}
                            className="flex-1 bg-[#0A3842] hover:bg-[#072B33] text-white text-xs font-bold py-2 rounded-lg uppercase tracking-wider transition"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 border border-[#DCE8EA] rounded-lg text-red-500 hover:bg-red-50 transition"
                            title="Remove"
                          >
                            <Heart size={16} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Account Details View */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-4">
                  Personal Information
                </h3>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs max-w-xl">
                  <div>
                    <label className="block font-bold uppercase text-[#333] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded-lg p-3 text-xs focus:outline-none focus:border-[#0A3842]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[#333] mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-[#E8F0F2] border border-[#D0E2E5] rounded-lg p-3 text-xs opacity-70 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-[#333] mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-[#F8FAFA] border border-[#D0E2E5] rounded-lg p-3 text-xs focus:outline-none focus:border-[#0A3842]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0A3842] hover:bg-[#072B33] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition shadow-sm"
                  >
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Addresses View */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide border-b border-[#E8F0F2] pb-4">
                  Saved Addresses
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border-2 border-[#0A3842] bg-[#F4F8F8] relative">
                    <span className="bg-[#0A3842] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full absolute top-4 right-4">
                      Default
                    </span>
                    <h4 className="font-bold text-sm text-[#0A2328] mb-1">{user.name}</h4>
                    <p className="text-xs text-[#527076] leading-relaxed">
                      {user.defaultAddress?.address || 'House No. 125, Street 1, DHA'}<br />
                      {user.defaultAddress?.city || 'Lahore'}, {user.defaultAddress?.postalCode || '54000'}<br />
                      Pakistan<br />
                      Phone: {user.phone || '+92 300 1234567'}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Track Parcel Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E5DFD5]">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <span className="text-[10px] text-[#0891B2] font-bold uppercase tracking-widest">Courier Dispatch Tracking</span>
                <h3 className="font-serif font-bold text-lg uppercase text-[#0A2328]">
                  Order #{trackingOrder.orderNumber}
                </h3>
              </div>
              <button onClick={() => setTrackingOrder(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Courier Info */}
            <div className="p-3 bg-[#EEF5F6] rounded border border-[#CDE1E4] text-xs text-[#3A5359] mb-6 flex justify-between items-center">
              <div>
                <span className="block text-[#888]">Carrier Partner</span>
                <strong>Leopard / TCS Courier Logistics</strong>
              </div>
              <div>
                <span className="block text-[#888]">Waybill / Tracking</span>
                <strong className="font-mono text-[#0891B2]">{trackingOrder.trackingNumber || 'RW-EXP-9821'}</strong>
              </div>
            </div>

            {/* Timeline stages */}
            <div className="space-y-6 text-xs pl-2 border-l-2 border-[#0891B2]/30 ml-4">
              <div className="relative pl-6">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#2E7D32] ring-4 ring-white" />
                <h4 className="font-bold text-[#0A2328]">Order Confirmed</h4>
                <p className="text-gray-500 text-[11px]">Received at Karachi atelier.</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#2E7D32] ring-4 ring-white" />
                <h4 className="font-bold text-[#0A2328]">Cold Macerated & Quality Checked</h4>
                <p className="text-gray-500 text-[11px]">Extrait 35% concentration verified and packaged.</p>
              </div>

              <div className="relative pl-6">
                <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${
                  trackingOrder.status === 'Dispatched' || trackingOrder.status === 'Delivered' ? 'bg-[#2E7D32]' : 'bg-gray-300'
                }`} />
                <h4 className="font-bold text-[#0A2328]">Dispatched with Courier</h4>
                <p className="text-gray-500 text-[11px]">Handed over to delivery carrier hub in Karachi.</p>
              </div>

              <div className="relative pl-6">
                <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${
                  trackingOrder.status === 'Delivered' ? 'bg-[#2E7D32]' : 'bg-gray-300'
                }`} />
                <h4 className="font-bold text-[#0A2328]">Delivered to Destination</h4>
                <p className="text-gray-500 text-[11px]">{trackingOrder.customer.city}, Pakistan.</p>
              </div>
            </div>

            <button
              onClick={() => setTrackingOrder(null)}
              className="w-full mt-8 bg-[#0A3B44] text-white py-3 rounded text-xs font-bold uppercase tracking-wider"
            >
              Close Tracking Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
