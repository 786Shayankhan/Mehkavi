import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Sparkles,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#061D22] text-[#A0C4CA] border-t border-[#0E3640] text-xs">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left group focus:outline-none"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-full border border-[#C5A66A] flex items-center justify-center bg-[#07565A]">
                  <span className="font-serif font-black text-sm text-[#C5A66A]">M</span>
                </div>
                <div>
                  <span className="block font-serif text-xl font-extrabold tracking-[0.24em] text-white uppercase group-hover:text-[#C5A66A] transition">
                    MEHKAVI
                  </span>
                  <span className="block text-[8px] tracking-[0.38em] text-[#C5A66A] uppercase font-bold">
                    PERFUMES
                  </span>
                </div>
              </div>
            </button>

            <p className="text-xs text-[#E4E5DD]/80 leading-relaxed pr-4">
              MEHKAVI PERFUMES is an artisanal fragrance house committed to democratizing olfactory luxury. We formulate high-intensity 35% Extrait De Parfum impressions using pure essence oils macerated for 60+ days. Based in Karachi, delivering nationwide across Pakistan.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C5A66A]">
                <Phone size={14} />
                <a href="tel:+923001234567" className="hover:underline">+92 300 1234567</a>
                <span className="text-[#07565A]">|</span>
                <a href="tel:+923348882358" className="hover:underline">+92 334 8882358</a>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#C5A66A]">
                <Mail size={14} />
                <a href="mailto:support@mehkavi.com" className="hover:underline">support@mehkavi.com</a>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#E4E5DD]/70">
                <MapPin size={14} className="text-[#C5A66A] shrink-0 mt-0.5" />
                <span>Bahadurabad, Karachi, Pakistan (Atelier & Nationwide Fulfillment)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://wa.me/923348882358" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#07565A] hover:bg-[#25D366] text-white rounded-full transition border border-[#0B6265]"
                title="Chat on WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#07565A] hover:bg-[#E1306C] text-white rounded-full transition border border-[#0B6265]"
                title="Follow on Instagram"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-[#07565A] hover:bg-[#1877F2] text-white rounded-full transition border border-[#0B6265]"
                title="Like on Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Column: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-[#07565A] pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('collection')} 
                  className="hover:text-white transition"
                >
                  Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('tracking')} 
                  className="hover:text-white transition"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq')} 
                  className="hover:text-white transition"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Collections */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-[#07565A] pb-2">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('collection', { gender: 'Men' })} 
                  className="hover:text-white transition"
                >
                  Men's Fragrances
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection', { gender: 'Women' })} 
                  className="hover:text-white transition"
                >
                  Women's Fragrances
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection', { gender: 'Unisex' })} 
                  className="hover:text-white transition"
                >
                  Unisex Fragrances
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection', { classification: 'Bundles' })} 
                  className="hover:text-white transition"
                >
                  Bundles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection', { classification: 'Candles' })} 
                  className="hover:text-white transition"
                >
                  Candles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('collection', { classification: 'Attar Collection' })} 
                  className="hover:text-white transition"
                >
                  Attar Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider border-b border-[#07565A] pb-2">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('shipping-policy')} 
                  className="hover:text-white text-[#E4E5DD]/80 transition text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('return-policy')} 
                  className="hover:text-white text-[#E4E5DD]/80 transition text-left"
                >
                  Exchange Policy (15 Days)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')} 
                  className="hover:text-white text-[#E4E5DD]/80 transition text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms-and-conditions')} 
                  className="hover:text-white text-[#E4E5DD]/80 transition text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('wishlist')} 
                  className="hover:text-white text-[#E4E5DD]/80 transition text-left"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="text-[#C5A66A] hover:text-white font-semibold transition flex items-center gap-1 mt-2 text-[11px]"
                >
                  <ShieldCheck size={13} />
                  <span>Store Administration</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Methods & Badges */}
        <div className="mt-12 pt-8 border-t border-[#07565A] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#E4E5DD]/80 uppercase tracking-wider mr-2 font-medium">
              Payment Methods:
            </span>
            <span className="bg-[#07565A] border border-[#0B6265] text-white px-2.5 py-1 rounded text-[10px] font-bold">
              Cash on Delivery (COD)
            </span>
            <span className="bg-[#07565A] border border-[#0B6265] text-white px-2.5 py-1 rounded text-[10px] font-bold">
              Direct Bank Transfer
            </span>
            <span className="bg-[#07565A] border border-[#0B6265] text-white px-2.5 py-1 rounded text-[10px] font-bold">
              Visa / Mastercard
            </span>
            <span className="bg-[#07565A] border border-[#0B6265] text-white px-2.5 py-1 rounded text-[10px] font-bold">
              JazzCash / EasyPaisa
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-[#E4E5DD]/80">
            <p>© {new Date().getFullYear()} MEHKAVI PERFUMES. All rights reserved.</p>
            <p className="mt-0.5 text-[10px] text-[#E4E5DD]/60">
              Silent impressions are inspired formulations and are not connected to original trademarks.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
