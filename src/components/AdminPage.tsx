import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus, ProductVariant, Classification, OlfactoryFamily, Gender, Coupon } from '../types';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit, 
  RotateCcw, 
  Check, 
  X, 
  Lock,
  Tag,
  Star,
  Search,
  Truck
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (route: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { 
    user, 
    login, 
    products, 
    orders, 
    coupons, 
    formatPrice, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    toggleCoupon, 
    addCoupon, 
    deleteReview,
    resetToDemoData,
    contactInquiries
  } = useApp();

  // Admin login credentials state
  const [adminEmail, setAdminEmail] = useState('admin@mahakawi.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'reviews' | 'inquiries'>('overview');

  // Edit / Add Product Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New product form states
  const [formName, setFormName] = useState('');
  const [formInspiredBy, setFormInspiredBy] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formGender, setFormGender] = useState<Gender>('Unisex');
  const [formClass, setFormClass] = useState<Classification>('Signature');
  const [formFamily, setFormFamily] = useState<OlfactoryFamily>('Fresh Citrus');
  const [formPrice50, setFormPrice50] = useState(3250);
  const [formPrice100, setFormPrice100] = useState(5850);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80');
  const [formDesc, setFormDesc] = useState('');

  // Order search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // New Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  const isAdmin = user && user.role === 'admin';

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await login(adminEmail, adminPassword);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-[#061D22] min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="bg-[#0A313A] border border-[#332E27] p-8 rounded-sm shadow-2xl max-w-md w-full text-white">
          <div className="w-14 h-14 bg-[#292520] rounded-full flex items-center justify-center mx-auto mb-4 text-[#22D3EE]">
            <ShieldCheck size={28} />
          </div>

          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#22D3EE] block text-center mb-1">
            Restricted Portal
          </span>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-center text-[#E2F1F3]">
            MEHKAVI Administration
          </h2>

          <p className="text-xs text-[#A89885] text-center mt-2 mb-6">
            Sign in with authorized store administrator credentials to manage products, customer orders, and discounts.
          </p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#22D3EE] font-bold uppercase mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#141210] border border-[#3E3830] rounded p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-[#22D3EE] font-bold uppercase mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Hint: admin123"
                className="w-full bg-[#141210] border border-[#3E3830] rounded p-2.5 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#22D3EE] hover:bg-[#0E7490] text-[#0A2328] py-3 font-bold uppercase tracking-widest rounded transition mt-2"
            >
              Sign In As Administrator
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#2C2720] text-center text-[11px] text-[#527076]">
            <p>Demo Admin Credentials: <strong className="text-white">admin@mehkavi.com</strong> / <strong className="text-white">admin123</strong></p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newSlug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct: Product = {
      id: 'mehkavi-custom-' + Date.now(),
      name: formName,
      slug: newSlug,
      tagline: `MEHKAVI's signature formulation of ${formName}.`,
      inspiredBy: formInspiredBy ? `Impression of ${formInspiredBy}` : undefined,
      inspiredBrand: formBrand || 'MEHKAVI Exclusive',
      gender: formGender,
      classification: formClass,
      olfactoryFamily: formFamily,
      concentration: 'Extrait De Parfum (35% Oil Concentration)',
      description: formDesc || `${formName} is mastercrafted with 35% pure essence oils and 60-day cold maceration.`,
      shortDescription: formDesc || `Mastercrafted 35% Extrait impression of ${formName}.`,
      notes: {
        top: ['Calabrian Bergamot', 'Citrus Peel'],
        middle: ['Lavender', 'Spices'],
        base: ['Amber', 'Cedarwood', 'Musk']
      },
      longevity: '14-18+ Hours',
      sillage: 'Heavy',
      season: 'All Year Round',
      occasion: 'Signature Wear',
      images: [formImage],
      variants: [
        { id: `v50-${Date.now()}`, size: '50ML Extrait', price: Number(formPrice50), inStock: true, sku: `MK-50-${Date.now()}` },
        { id: `v100-${Date.now()}`, size: '100ML Grand Extrait', price: Number(formPrice100), inStock: true, sku: `MK-100-${Date.now()}` }
      ],
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true
    };

    addProduct(newProduct);
    setIsAddProductOpen(false);
    setFormName('');
    setFormInspiredBy('');
    setFormDesc('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponPercent),
      description: newCouponDesc || `${newCouponPercent}% storewide discount`,
      active: true
    });

    setNewCouponCode('');
    setNewCouponDesc('');
  };

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    if (orderStatusFilter !== 'All' && ord.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchNum = ord.orderNumber.toLowerCase().includes(q);
      const matchCust = ord.customer.fullName.toLowerCase().includes(q);
      const matchCity = ord.customer.city.toLowerCase().includes(q);
      return matchNum || matchCust || matchCity;
    }
    return true;
  });

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Bar */}
        <div className="bg-[#07262C] text-white p-6 rounded-sm mb-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#2D2A26]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#22D3EE] mb-1">
              <ShieldCheck size={16} />
              <span>Administrative Workspace</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#EEF5F6]">
              MEHKAVI Store Operations
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={resetToDemoData}
              className="bg-[#26231F] hover:bg-[#38332C] text-[#22D3EE] border border-[#3E3830] px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition"
              title="Reset all products & orders to authentic MEHKAVI demo state"
            >
              <RotateCcw size={13} />
              <span>Reset Demo Catalog</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="bg-[#22D3EE] hover:bg-[#0E7490] text-[#0A2328] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition"
            >
              Customer Storefront →
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#DCE8EA] gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider mb-8">
          <button
            onClick={() => setAdminTab('overview')}
            className={`pb-3.5 transition border-b-2 ${
              adminTab === 'overview' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`pb-3.5 transition border-b-2 ${
              adminTab === 'products' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Catalog Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`pb-3.5 transition border-b-2 ${
              adminTab === 'orders' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setAdminTab('coupons')}
            className={`pb-3.5 transition border-b-2 ${
              adminTab === 'coupons' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Coupons & Promos ({coupons.length})
          </button>
          <button
            onClick={() => setAdminTab('inquiries')}
            className={`pb-3.5 transition border-b-2 ${
              adminTab === 'inquiries' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
            }`}
          >
            Customer Inquiries ({contactInquiries.length})
          </button>
        </div>

        {/* TAB 1: Overview & Metrics */}
        {adminTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm">
                <span className="text-[11px] font-bold text-[#527076] uppercase tracking-wider block">Gross Sales Value</span>
                <p className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0A2328] mt-2">{formatPrice(totalRevenue)}</p>
                <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">Nationwide Pakistan Orders</span>
              </div>

              <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm">
                <span className="text-[11px] font-bold text-[#527076] uppercase tracking-wider block">Customer Orders</span>
                <p className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0A2328] mt-2">{totalOrdersCount}</p>
                <span className="text-[11px] text-[#666] mt-1 block">Active dispatches</span>
              </div>

              <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm">
                <span className="text-[11px] font-bold text-[#527076] uppercase tracking-wider block">Catalog Fragrances</span>
                <p className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0A2328] mt-2">{totalProductsCount}</p>
                <span className="text-[11px] text-[#666] mt-1 block">35% Extrait & Pure Attars</span>
              </div>

              <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm">
                <span className="text-[11px] font-bold text-[#527076] uppercase tracking-wider block">Discounts & Promos</span>
                <p className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0A2328] mt-2">{coupons.filter(c => c.active).length} Active</p>
                <span className="text-[11px] text-[#2E7D32] font-semibold mt-1 block">MEHKAVI10, LUXURY20</span>
              </div>
            </div>

            {/* Quick Recent Orders Preview */}
            <div className="bg-white border border-[#DCE8EA] rounded-sm p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg uppercase text-[#0A2328] tracking-wide mb-4">
                Recent Dispatches
              </h3>
              <div className="divide-y divide-[#E8F0F2]">
                {orders.slice(0, 5).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#0A2328] mr-2">{ord.orderNumber}</span>
                      <span className="text-[#666]">{ord.customer.fullName} ({ord.customer.city})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-[#0A2328]">{formatPrice(ord.total)}</span>
                      <span className="px-2 py-0.5 rounded bg-[#EEF5F6] border text-[10px] font-bold uppercase">{ord.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Products Catalog */}
        {adminTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded border border-[#DCE8EA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#333]">
                Managing {products.length} Fragrances in Catalog
              </span>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#0A3B44] hover:bg-[#0891B2] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <Plus size={14} /> Add New Fragrance
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#DCE8EA] rounded-sm shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EEF5F6] border-b border-[#DCE8EA] uppercase tracking-wider text-[#666] font-bold">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Line</th>
                    <th className="p-3.5">Gender</th>
                    <th className="p-3.5">Inspired By</th>
                    <th className="p-3.5">Price (50ml / 100ml)</th>
                    <th className="p-3.5">Rating</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F0F2]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFA] transition">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded bg-[#F8FAFA] border" />
                        <div>
                          <p className="font-serif font-bold text-sm text-[#0A2328]">{p.name}</p>
                          <p className="text-[10px] text-[#777]">{p.concentration}</p>
                        </div>
                      </td>
                      <td className="p-3.5 font-medium">{p.classification}</td>
                      <td className="p-3.5 font-medium">{p.gender}</td>
                      <td className="p-3.5 text-[#0891B2] font-semibold">{p.inspiredBy || 'MEHKAVI Original'}</td>
                      <td className="p-3.5 font-bold">
                        {p.variants[1] ? formatPrice(p.variants[1].price) : formatPrice(p.variants[0].price)}
                      </td>
                      <td className="p-3.5 font-semibold text-amber-600">★ {p.rating} ({p.reviewCount})</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Orders Management */}
        {adminTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter Bar */}
            <div className="bg-white border border-[#DCE8EA] p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <Search size={16} className="text-[#0891B2]" />
                <input
                  type="text"
                  placeholder="Search by order #, customer, or city..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full text-xs p-2 bg-[#F8FAFA] border border-[#DDD] rounded focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold uppercase text-[#777]">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#F8FAFA] border border-[#DDD] p-2 rounded font-semibold text-xs"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-[#DCE8EA] rounded-sm shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EEF5F6] border-b border-[#DCE8EA] uppercase tracking-wider text-[#666] font-bold">
                  <tr>
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Customer & City</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total & Payment</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5">Tracking Number</th>
                    <th className="p-3.5 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F0F2]">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F8FAFA] transition">
                      <td className="p-3.5 font-mono font-bold text-[#0A2328]">
                        {ord.orderNumber}
                        <span className="block text-[10px] text-gray-400 font-sans font-normal">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <p className="font-bold text-[#0A2328]">{ord.customer.fullName}</p>
                        <p className="text-[11px] text-[#666]">{ord.customer.city} • {ord.customer.phone}</p>
                      </td>

                      <td className="p-3.5">
                        <p className="font-semibold">{ord.items.length} Fragrance(s)</p>
                        <p className="text-[10px] text-[#777] truncate max-w-[180px]">
                          {ord.items.map(i => i.product.name).join(', ')}
                        </p>
                      </td>

                      <td className="p-3.5">
                        <p className="font-serif font-bold text-sm text-[#0A2328]">{formatPrice(ord.total)}</p>
                        <span className="text-[10px] uppercase font-bold text-[#527076]">
                          {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-[#EEF5F6] text-[#0891B2] border border-[#CDE1E4]">
                          {ord.status}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-[#555]">
                        {ord.trackingNumber || 'Pending'}
                      </td>

                      <td className="p-3.5 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-[#F8FAFA] border border-[#DDD] p-1.5 rounded font-semibold text-xs"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Coupons Management */}
        {adminTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {/* Left: Create Coupon */}
            <div className="bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide border-b pb-3">
                Create New Promo Code
              </h3>

              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SUMMER15"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs uppercase tracking-wider"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Discount %</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    required
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#333] mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 15% off on summer extraits"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    className="w-full bg-[#F8FAFA] border border-[#DDD] rounded p-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A3B44] hover:bg-[#0891B2] text-white py-2.5 rounded font-bold uppercase tracking-wider text-xs transition"
                >
                  Activate Promo Code
                </button>
              </form>
            </div>

            {/* Right: Active Coupons List */}
            <div className="md:col-span-2 bg-white border border-[#DCE8EA] p-6 rounded-sm shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-[#0A2328] uppercase tracking-wide border-b pb-3">
                Existing Store Coupons
              </h3>

              <div className="divide-y divide-[#E8F0F2]">
                {coupons.map((c) => (
                  <div key={c.code} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#0A2328]">{c.code}</span>
                        {c.active ? (
                          <span className="text-[10px] text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded font-bold">ACTIVE</span>
                        ) : (
                          <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-bold">DISABLED</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#666] mt-0.5">{c.description}</p>
                    </div>

                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`text-xs px-3 py-1.5 rounded font-semibold transition ${
                        c.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {c.active ? 'Deactivate' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Customer Inquiries */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-[#DCE8EA] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#072B33]">
                    Customer Inquiries & Feedback ({contactInquiries.length})
                  </h3>
                  <p className="text-xs text-[#5A7B82]">
                    Messages submitted via the Contact MAHAKAWI inquiry form.
                  </p>
                </div>
              </div>

              {contactInquiries.length === 0 ? (
                <div className="text-center py-12 text-[#6F8C92] text-xs">
                  No inquiries submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactInquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-5 rounded-xl border border-[#DCE8EA] bg-[#F8FAFA] hover:border-[#0891B2] transition space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3ECEE] pb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#0891B2] bg-[#E0F2FE] px-2 py-0.5 rounded">
                            {inq.id}
                          </span>
                          <span className="font-bold text-xs text-[#072B33]">
                            {inq.fullName}
                          </span>
                          <span className="text-[11px] text-[#698B92]">
                            &lt;{inq.email}&gt;
                          </span>
                          {inq.phone && (
                            <span className="text-[11px] text-[#698B92]">
                              • {inq.phone}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#072B33] text-white">
                            {inq.inquiryType}
                          </span>
                          <span className="text-[11px] text-[#88ADB5]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#072B33]">
                          Subject: {inq.subject}
                        </h4>
                        <p className="text-xs text-[#3E5C63] mt-1 whitespace-pre-wrap leading-relaxed">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E3ECEE] text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#698B92]">Status:</span>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {inq.status || 'New'}
                          </span>
                        </div>
                        <a 
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)} [${inq.id}]`}
                          className="text-[#0891B2] hover:underline font-semibold flex items-center gap-1 text-xs"
                        >
                          Reply via Email →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-2xl max-w-xl w-full p-6 sm:p-8 border border-[#E5DFD5]">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-serif font-bold text-lg uppercase text-[#0A2328]">
                Add New Fragrance to Catalog
              </h3>
              <button onClick={() => setIsAddProductOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Fragrance Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Royal Sovereign"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Impression Of</label>
                  <input
                    type="text"
                    value={formInspiredBy}
                    onChange={(e) => setFormInspiredBy(e.target.value)}
                    placeholder="e.g. Dior Sauvage Elixir"
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Gender</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as Gender)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Classification</label>
                  <select
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value as Classification)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="Signature">Signature</option>
                    <option value="Exclusif">Exclusif</option>
                    <option value="Prive">Prive</option>
                    <option value="Own Creations">Own Creations</option>
                    <option value="Attar Collection">Attar Collection</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Fragrance Family</label>
                  <select
                    value={formFamily}
                    onChange={(e) => setFormFamily(e.target.value as OlfactoryFamily)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="Fresh Citrus">Fresh Citrus</option>
                    <option value="Woody & Oud">Woody & Oud</option>
                    <option value="Oriental & Spicy">Oriental & Spicy</option>
                    <option value="Floral & Gourmand">Floral & Gourmand</option>
                    <option value="Aromatic Aquatic">Aromatic Aquatic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">50ml Price (PKR)</label>
                  <input
                    type="number"
                    value={formPrice50}
                    onChange={(e) => setFormPrice50(Number(e.target.value))}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">100ml Price (PKR)</label>
                  <input
                    type="number"
                    value={formPrice100}
                    onChange={(e) => setFormPrice100(Number(e.target.value))}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Fragrance notes, impression details, and longevity..."
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A3B44] text-white rounded font-bold uppercase tracking-wider"
                >
                  Publish Fragrance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
