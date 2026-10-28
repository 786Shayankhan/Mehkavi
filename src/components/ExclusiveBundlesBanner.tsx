import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ExclusiveBundlesBannerProps {
  onNavigateToCollection: () => void;
}

export const ExclusiveBundlesBanner: React.FC<ExclusiveBundlesBannerProps> = ({ onNavigateToCollection }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#064C50] text-white shadow-xl border border-[#07565A]">
        
        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#C5A66A]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-6">
          
          {/* Left Text */}
          <div className="md:col-span-5 space-y-4 z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#07565A] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest text-[#C5A66A] uppercase border border-[#C5A66A]/30">
              <Sparkles size={12} />
              <span>VALUE PACKS • SAVE UP TO 30%</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide leading-tight text-white">
              Exclusive Bundles
            </h2>

            <p className="text-sm sm:text-base text-[#F1EFE6]/80 font-light">
              More Fragrance, More Value. Pair your signature daytime extraits with intense evening formulations at an exclusive price.
            </p>

            <div className="pt-2">
              <button
                onClick={onNavigateToCollection}
                className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold text-xs uppercase tracking-widest px-7 py-3 rounded-full transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                <span>Shop Bundles</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Panoramic Bottles Image (Moodboard: Panoramic bottle row) */}
          <div className="md:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full aspect-[16/7] md:aspect-[16/8] rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80"
                alt="MEHKAVI Exclusive Bundles"
                className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#072B33]/80 via-transparent to-black/30" />
              
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10">
                Discovery Set & Duo Packages Included
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
