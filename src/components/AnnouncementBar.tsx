import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Currency } from '../types';
import { ChevronDown, Phone, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

const MESSAGES = [
  'FREE SHIPPING ON ORDERS ABOVE RS. 3,000 | 10% OFF ON FIRST ORDER (CODE: MEHKAVI10)',
  '100% EXTRAIT DE PARFUM — CRAFTED WITH 35% PURE ESSENCE OIL (14-18+ HRS)',
  '15-DAY HASSLE-FREE EXCHANGE GUARANTEE | ATELIER: KARACHI, PAKISTAN'
];

interface AnnouncementBarProps {
  onNavigate: (route: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigate }) => {
  const { currency, setCurrency } = useApp();
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#003F43] text-[#F8F6EF] text-xs border-b border-[#07565A] py-1.5 px-4 tracking-wider uppercase font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left helper info */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-[#E4E5DD]/80">
          <span className="flex items-center gap-1.5 hover:text-[#C5A66A] transition">
            <Phone size={12} className="text-[#C5A66A]" />
            <a href="tel:+923348882358">+92 334 8882358</a>
          </span>
          <span className="text-[#07565A]">|</span>
          <span className="flex items-center gap-1.5 hover:text-[#C5A66A] transition">
            <MapPin size={12} className="text-[#C5A66A]" />
            <span>Bahadurabad, Karachi</span>
          </span>
        </div>

        {/* Center rotating message */}
        <div className="flex-1 text-center font-medium py-0.5 px-2">
          <div className="inline-flex items-center justify-center gap-2 transition-all duration-300">
            <Sparkles size={11} className="text-[#C5A66A] shrink-0" />
            <span className="truncate tracking-wide">{MESSAGES[currentMsgIndex]}</span>
          </div>
        </div>

        {/* Right currency & quick links */}
        <div className="flex items-center space-x-3 text-[11px]">
          <div className="relative flex items-center group">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-[#F8F6EF] text-[11px] font-semibold cursor-pointer pl-1 pr-4 py-0.5 focus:outline-none appearance-none"
            >
              <option value="PKR" className="bg-[#003F43] text-white">PKR (Rs.)</option>
              <option value="USD" className="bg-[#003F43] text-white">USD ($)</option>
              <option value="AED" className="bg-[#003F43] text-white">AED (AED)</option>
              <option value="GBP" className="bg-[#003F43] text-white">GBP (£)</option>
            </select>
            <ChevronDown size={11} className="pointer-events-none -ml-3 text-[#E4E5DD]" />
          </div>

          <span className="text-[#07565A] hidden sm:inline">|</span>
          
          <button 
            onClick={() => onNavigate('admin')}
            className="text-[10px] text-[#C5A66A] hover:text-white transition uppercase font-semibold hidden md:inline-flex items-center gap-1"
            title="Access administrative operations"
          >
            <ShieldCheck size={11} />
            Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
};
