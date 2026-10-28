import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  LogOut,
  Package,
  ShieldCheck,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenAuth }) => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    user, 
    logout,
    products,
    formatPrice
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (brandName: string) => {
    setActiveDropdown(null);
    onNavigate('collection', { brand: brandName });
  };

  const handleClassificationClick = (classification: string) => {
    setActiveDropdown(null);
    onNavigate('collection', { classification });
  };

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      setIsSearchFocused(false);
      onNavigate('collection', { search: headerSearchQuery.trim() });
    }
  };

  // Live quick search matches
  const quickSearchResults = headerSearchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
        p.inspiredBy?.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
        p.classification.toLowerCase().includes(headerSearchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#DCE8EA] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Top Header Row */}
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Mobile menu hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => onNavigate('mobile-menu')}
                className="p-2 text-[#0A3842] hover:text-[#0891B2] transition"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Brand Logo - Stylized Monogram like MS PERFUMES / MEHKAVI */}
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')} 
                className="inline-flex items-center gap-2 text-left group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border border-[#003F43] flex items-center justify-center bg-[#F8F6EF] group-hover:bg-[#003F43] transition-colors">
                  <span className="font-serif font-black text-xl text-[#003F43] group-hover:text-white transition-colors">
                    M
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl sm:text-2xl font-extrabold tracking-[0.22em] text-[#003F43] uppercase group-hover:text-[#07565A] transition-colors leading-tight">
                    MEHKAVI
                  </span>
                  <span className="block text-[8px] sm:text-[9px] tracking-[0.35em] text-[#C5A66A] uppercase font-bold">
                    PERFUMES
                  </span>
                </div>
              </button>
            </div>

            {/* Center Integrated Pill Search Bar (Exact Moodboard Design) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6 relative" ref={searchContainerRef}>
              <form onSubmit={handleHeaderSearchSubmit} className="w-full">
                <div className="relative">
                  <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#57757B]" />
                  <input
                    type="text"
                    value={headerSearchQuery}
                    onChange={(e) => setHeaderSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for perfumes..."
                    className="w-full bg-[#F0F4F5] hover:bg-[#EAF0F2] text-[#0A262C] text-xs rounded-full pl-11 pr-4 py-2.5 border border-transparent focus:border-[#0A3842] focus:bg-white focus:outline-none transition-all placeholder:text-[#6F8C92]"
                  />
                  {headerSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setHeaderSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </form>

              {/* Quick Live Search Dropdown */}
              {isSearchFocused && quickSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-[#DCE8EA] p-3 z-50 animate-fade-in">
                  <div className="text-[10px] uppercase font-bold text-[#6F8C92] px-2 pb-1.5 border-b border-[#F0F4F5]">
                    Quick Suggestions
                  </div>
                  <div className="divide-y divide-[#F0F4F5] mt-1">
                    {quickSearchResults.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setHeaderSearchQuery('');
                          onNavigate('product', { slug: product.slug });
                        }}
                        className="py-2 px-2 hover:bg-[#F4F8F9] rounded cursor-pointer flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={product.images[0]} alt="" className="w-9 h-11 object-cover rounded bg-[#F1F6F7]" />
                          <div>
                            <p className="font-serif font-bold text-xs text-[#0A262C]">{product.name}</p>
                            <p className="text-[10px] text-[#0891B2] truncate max-w-[180px]">{product.inspiredBy || product.classification}</p>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-[#0A3842]">{formatPrice(product.variants[0].price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons (User, Wishlist, Cart) */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-1.5 text-[#0A3842] hover:text-[#0891B2] transition"
                title="Search"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* User Account / Auth Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => {
                    if (user) {
                      setIsUserMenuOpen(!isUserMenuOpen);
                    } else {
                      onOpenAuth();
                    }
                  }}
                  className="p-1.5 text-[#0A3842] hover:text-[#0891B2] transition flex items-center gap-1.5"
                  title={user ? user.name : 'Sign In / Account'}
                  aria-label="User Account"
                >
                  <User size={20} />
                  {user && (
                    <span className="hidden xl:inline text-xs font-semibold text-[#0A3842] max-w-[90px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                {user && isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white text-[#0A262C] shadow-xl border border-[#DCE8EA] rounded-md py-2 z-50 animate-fade-in text-xs">
                    <div className="px-4 py-2 border-b border-[#F0F4F5]">
                      <p className="font-bold truncate">{user.name}</p>
                      <p className="text-[11px] text-[#57757B] truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 text-[10px] bg-[#0A3842] text-white px-1.5 py-0.5 rounded font-medium">
                          Administrator
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => { setIsUserMenuOpen(false); onNavigate('account'); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F4F8F9] flex items-center gap-2"
                    >
                      <Package size={14} className="text-[#0891B2]" />
                      <span>My Orders & Profile</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => { setIsUserMenuOpen(false); onNavigate('admin'); }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F4F8F9] flex items-center gap-2 text-[#0A3842] font-semibold"
                      >
                        <ShieldCheck size={14} />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <div className="border-t border-[#F0F4F5] mt-1 pt-1">
                      <button
                        onClick={() => { setIsUserMenuOpen(false); logout(); }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => onNavigate('wishlist')}
                className="relative p-1.5 text-[#0A3842] hover:text-[#0891B2] transition"
                title="View Wishlist"
                aria-label="View Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0A3842] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#0A3842] hover:text-[#0891B2] transition flex items-center gap-1.5 group"
                title="Open Shopping Cart"
                aria-label="Open Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag size={21} className="group-hover:scale-105 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#0A3842] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>

          </div>

          {/* Sub Navigation Bar (Exact Moodboard: Centered row with dropdowns) */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-3 border-t border-[#EAEFEF] text-[13px] tracking-wider font-medium text-[#1A3D44]">
            
            {/* Shop Dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => onNavigate('collection')}
                className="flex items-center gap-1 hover:text-[#0891B2] transition font-semibold"
              >
                <span>Shop</span>
                <ChevronDown size={14} className="opacity-70" />
              </button>

              {activeDropdown === 'shop' && (
                <div className="absolute top-full left-0 w-60 bg-[#07262C] text-white shadow-2xl border border-[#10404B] rounded-md py-3 px-2 animate-fade-in z-50">
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate('collection'); }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[#0B353D] hover:text-[#22D3EE] transition rounded flex items-center justify-between"
                  >
                    <span>All Fragrances</span>
                    <span className="text-[10px] text-[#88ADB5]">20+ Items</span>
                  </button>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate('collection', { filter: 'bestseller' }); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] transition rounded flex items-center gap-2"
                  >
                    <Sparkles size={12} className="text-[#22D3EE]" />
                    <span>Top Bestsellers</span>
                  </button>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate('collection', { filter: 'new' }); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] transition rounded"
                  >
                    New Arrivals
                  </button>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate('collection', { filter: 'sale' }); }}
                    className="w-full text-left px-3 py-2 text-xs text-[#F87171] hover:bg-[#0B353D] hover:text-[#FCA5A5] transition rounded font-medium"
                  >
                    Sale & Promotions
                  </button>
                </div>
              )}
            </div>

            {/* Classifications Dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('classifications')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 hover:text-[#0891B2] transition"
              >
                <span>Classifications</span>
                <ChevronDown size={14} className="opacity-70" />
              </button>

              {activeDropdown === 'classifications' && (
                <div className="absolute top-full -left-12 w-[460px] bg-[#07262C] text-white shadow-2xl border border-[#10404B] rounded-md p-5 animate-fade-in grid grid-cols-2 gap-4 z-50">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#22D3EE] border-b border-[#0F3C45] pb-2 mb-2">
                      Perfume Lines
                    </h4>
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleClassificationClick('Signature')}
                        className="w-full text-left py-1.5 px-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] rounded transition"
                      >
                        <p className="font-semibold">Signature Collection</p>
                        <p className="text-[10px] text-[#88ADB5]">Daily versatile wear</p>
                      </button>
                      <button 
                        onClick={() => handleClassificationClick('Exclusif')}
                        className="w-full text-left py-1.5 px-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] rounded transition"
                      >
                        <p className="font-semibold">Exclusif Tier</p>
                        <p className="text-[10px] text-[#88ADB5]">High-intensity formulation</p>
                      </button>
                      <button 
                        onClick={() => handleClassificationClick('Prive')}
                        className="w-full text-left py-1.5 px-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] rounded transition"
                      >
                        <p className="font-semibold">Prive Blend</p>
                        <p className="text-[10px] text-[#88ADB5]">Complex niche profiles</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#22D3EE] border-b border-[#0F3C45] pb-2 mb-2">
                      MEHKAVI Exclusives
                    </h4>
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleClassificationClick('Own Creations')}
                        className="w-full text-left py-1.5 px-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] rounded transition"
                      >
                        <p className="font-semibold">Own Creations</p>
                        <p className="text-[10px] text-[#88ADB5]">Bespoke master blends</p>
                      </button>
                      <button 
                        onClick={() => handleClassificationClick('Attar Collection')}
                        className="w-full text-left py-1.5 px-2 text-xs hover:bg-[#0B353D] hover:text-[#22D3EE] rounded transition"
                      >
                        <p className="font-semibold">Attar Collection</p>
                        <p className="text-[10px] text-[#88ADB5]">100% pure perfume oils</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inspired By Brands */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown('brands')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 hover:text-[#0891B2] transition"
              >
                <span>Inspired by Brands</span>
                <ChevronDown size={14} className="opacity-70" />
              </button>

              {activeDropdown === 'brands' && (
                <div className="absolute top-full -left-28 w-[540px] bg-[#07262C] text-white shadow-2xl border border-[#10404B] rounded-md p-5 animate-fade-in z-50">
                  <div className="flex items-center justify-between border-b border-[#0F3C45] pb-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#22D3EE]">
                      Designer & Niche House Inspirations
                    </span>
                    <button 
                      onClick={() => { setActiveDropdown(null); onNavigate('collection'); }}
                      className="text-[11px] text-[#88ADB5] hover:text-white underline underline-offset-4"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Creed', sample: 'Imperial Wood' },
                      { name: 'Louis Vuitton', sample: 'Fantasy World' },
                      { name: 'Dior', sample: 'Wild Sparkle' },
                      { name: 'Tom Ford', sample: 'Velvet Shadow' },
                      { name: 'Versace', sample: 'Fearless Prince' },
                      { name: 'Parfums de Marly', sample: 'Royal Pegasus' },
                      { name: 'Maison Francis Kurkdjian', sample: 'Ace of Heart' },
                      { name: 'Bvlgari', sample: 'Citrus Sovereign' },
                      { name: 'Kilian', sample: "Sovereign Oak" }
                    ].map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => handleBrandClick(brand.name)}
                        className="text-left p-2 hover:bg-[#0B353D] rounded transition group"
                      >
                        <p className="text-xs font-semibold text-[#E2F1F3] group-hover:text-[#22D3EE]">
                          {brand.name}
                        </p>
                        <p className="text-[10px] text-[#88ADB5] truncate">
                          {brand.sample}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bundles */}
            <button 
              onClick={() => onNavigate('collection', { classification: 'Bundles' })}
              className="hover:text-[#0891B2] transition font-medium"
            >
              Bundles
            </button>

            {/* Candles */}
            <button 
              onClick={() => onNavigate('collection', { classification: 'Candles' })}
              className="hover:text-[#0891B2] transition font-medium"
            >
              Candles
            </button>

            {/* Attar Collection */}
            <button 
              onClick={() => onNavigate('collection', { classification: 'Attar Collection' })}
              className="hover:text-[#0891B2] transition font-medium"
            >
              Attar Collection
            </button>

            {/* About Us */}
            <button 
              onClick={() => onNavigate('about')}
              className={`hover:text-[#0891B2] transition font-medium ${currentRoute === 'about' ? 'text-[#0891B2] font-bold' : ''}`}
            >
              About Us
            </button>

            {/* Contact Us */}
            <button 
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#0891B2] transition font-medium ${currentRoute === 'contact' ? 'text-[#0891B2] font-bold' : ''}`}
            >
              Contact Us
            </button>
          </nav>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Exact Moodboard Mobile Screen) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#DCE8EA] py-2 px-4 z-40 flex items-center justify-around text-[10px] font-semibold text-[#57757B] shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 ${currentRoute === 'home' ? 'text-[#0A3842] font-bold' : ''}`}
        >
          <Home size={18} />
          <span>Home</span>
        </button>

        <button
          onClick={() => onNavigate('collection')}
          className={`flex flex-col items-center gap-1 ${currentRoute === 'collection' ? 'text-[#0A3842] font-bold' : ''}`}
        >
          <Package size={18} />
          <span>Shop</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1"
        >
          <ShoppingBag size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-[#0A3842] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            if (user) {
              onNavigate('account');
            } else {
              onOpenAuth();
            }
          }}
          className={`flex flex-col items-center gap-1 ${currentRoute === 'account' ? 'text-[#0A3842] font-bold' : ''}`}
        >
          <User size={18} />
          <span>Account</span>
        </button>
      </div>
    </>
  );
};
