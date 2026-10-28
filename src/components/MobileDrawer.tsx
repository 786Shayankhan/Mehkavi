import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  User, 
  Sparkles,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onOpenAuth: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenAuth 
}) => {
  const { user, cart, cartTotal, formatPrice } = useApp();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  const handleNav = (route: string, params?: Record<string, string>) => {
    onClose();
    onNavigate(route, params);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#003F43] text-white shadow-2xl flex flex-col justify-between border-l border-[#07565A] animate-fade-in">
        
        {/* Header with Monogram */}
        <div className="p-5 border-b border-[#07565A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#07565A] border border-[#C5A66A]/60 flex items-center justify-center font-serif font-black text-sm text-[#C5A66A]">
              M
            </div>
            <div>
              <span className="block font-serif text-base font-extrabold tracking-[0.2em] text-white">
                MEHKAVI
              </span>
              <span className="block text-[8px] tracking-[0.3em] text-[#C5A66A] font-bold">
                PERFUMES
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full transition"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation items (Moodboard Style) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-1 text-xs font-semibold">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
          >
            <span>Home</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          <button
            onClick={() => handleNav('collection')}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
          >
            <span>Shop</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          {/* Classifications */}
          <div>
            <button
              onClick={() => toggleSection('classifications')}
              className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
            >
              <span>Classifications</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform ${expandedSection === 'classifications' ? 'rotate-180' : ''}`} 
              />
            </button>

            {expandedSection === 'classifications' && (
              <div className="pl-4 py-1 space-y-1 bg-[#092B32] rounded-lg">
                <button
                  onClick={() => handleNav('collection', { classification: 'Signature' })}
                  className="w-full text-left py-2 px-3 text-xs text-[#88ADB5] hover:text-[#22D3EE]"
                >
                  Signature Collection
                </button>
                <button
                  onClick={() => handleNav('collection', { classification: 'Exclusif' })}
                  className="w-full text-left py-2 px-3 text-xs text-[#88ADB5] hover:text-[#22D3EE]"
                >
                  Exclusif Tier
                </button>
                <button
                  onClick={() => handleNav('collection', { classification: 'Prive' })}
                  className="w-full text-left py-2 px-3 text-xs text-[#88ADB5] hover:text-[#22D3EE]"
                >
                  Prive Blend
                </button>
                <button
                  onClick={() => handleNav('collection', { classification: 'Own Creations' })}
                  className="w-full text-left py-2 px-3 text-xs text-[#88ADB5] hover:text-[#22D3EE]"
                >
                  MEHKAVI Own Creations
                </button>
              </div>
            )}
          </div>

          {/* Inspired by Brands */}
          <div>
            <button
              onClick={() => toggleSection('brands')}
              className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
            >
              <span>Inspired by Brands</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform ${expandedSection === 'brands' ? 'rotate-180' : ''}`} 
              />
            </button>

            {expandedSection === 'brands' && (
              <div className="pl-4 py-1 space-y-1 bg-[#092B32] rounded-lg">
                {['Creed', 'Louis Vuitton', 'Dior', 'Tom Ford', 'Versace', 'Parfums de Marly'].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleNav('collection', { brand })}
                    className="w-full text-left py-2 px-3 text-xs text-[#88ADB5] hover:text-[#22D3EE]"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bundles */}
          <button
            onClick={() => handleNav('collection', { classification: 'Bundles' })}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
          >
            <span>Bundles</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          {/* Candles */}
          <button
            onClick={() => handleNav('collection', { classification: 'Candles' })}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
          >
            <span>Candles</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          {/* Attar Collection */}
          <button
            onClick={() => handleNav('collection', { classification: 'Attar Collection' })}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between"
          >
            <span>Attar Collection</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          {/* About Us */}
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left py-3 px-3 hover:bg-[#0B353D] rounded-lg text-[#E2F1F3] flex items-center justify-between border-t border-[#0F3C45]/60 mt-1"
          >
            <span>About Us</span>
            <ChevronRight size={14} className="text-[#888]" />
          </button>

          {/* Contact Us */}
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left py-3 px-3 hover:bg-[#07565A] rounded-lg text-[#F8F6EF] flex items-center justify-between"
          >
            <span>Contact Us</span>
            <ChevronRight size={14} className="text-[#C5A66A]" />
          </button>

          {/* Track Order */}
          <button
            onClick={() => handleNav('tracking')}
            className="w-full text-left py-3 px-3 hover:bg-[#07565A] rounded-lg text-[#F8F6EF] flex items-center justify-between"
          >
            <span>Track Order</span>
            <ChevronRight size={14} className="text-[#C5A66A]" />
          </button>

          {/* FAQs */}
          <button
            onClick={() => handleNav('faq')}
            className="w-full text-left py-3 px-3 hover:bg-[#07565A] rounded-lg text-[#F8F6EF] flex items-center justify-between"
          >
            <span>FAQs & Help</span>
            <ChevronRight size={14} className="text-[#C5A66A]" />
          </button>

          {/* Account Section */}
          <div className="pt-4 mt-2 border-t border-[#07565A]">
            <p className="text-[10px] uppercase tracking-wider text-[#C5A66A] px-3 mb-1">
              My Account
            </p>
            <button
              onClick={() => {
                onClose();
                if (user) {
                  onNavigate('account');
                } else {
                  onOpenAuth();
                }
              }}
              className="w-full text-left py-2.5 px-3 hover:bg-[#07565A] rounded-lg text-[#F8F6EF] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#C5A66A]" />
                <span>{user ? user.name : 'Sign In / Register'}</span>
              </div>
              <ChevronRight size={14} className="text-[#C5A66A]" />
            </button>
          </div>

          {/* Cart preview */}
          {cart.length > 0 && (
            <div 
              onClick={() => handleNav('cart')}
              className="mt-3 p-3 bg-[#07565A] rounded-xl border border-[#0B6265] cursor-pointer hover:border-[#C5A66A] transition"
            >
              <div className="flex items-center justify-between text-xs text-[#E4E5DD]">
                <span>Your Cart</span>
                <span className="font-bold text-white">{totalCartItems} items</span>
              </div>
              <p className="text-sm font-bold text-[#C5A66A] mt-0.5">
                {formatPrice(cartTotal)}
              </p>
            </div>
          )}
        </div>

        {/* Live Chat CTA Button */}
        <div className="p-5 border-t border-[#07565A] bg-[#003F43]">
          <button
            onClick={() => {
              window.open('https://wa.me/923348882358', '_blank');
            }}
            className="w-full bg-[#07565A] hover:bg-[#0B6265] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#C5A66A]/40 transition shadow-md"
          >
            <MessageCircle size={15} className="text-[#C5A66A]" />
            <span>Live Chat Concierge</span>
          </button>
        </div>

      </div>
    </div>
  );
};
