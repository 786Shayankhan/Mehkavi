import React from 'react';
import { ShieldCheck, Droplets, Clock, Sparkles } from 'lucide-react';

interface BrandStoryBannerProps {
  onNavigateToCollection: () => void;
}

export const BrandStoryBanner: React.FC<BrandStoryBannerProps> = ({ onNavigateToCollection }) => {
  return (
    <section className="bg-[#061F24] text-white py-16 sm:py-24 border-y border-[#0C3B44] relative overflow-hidden">
      {/* Decorative luxury dark cyan background elements */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#0891B2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#0891B2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Philosophy Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#082930] px-3.5 py-1.5 rounded-full border border-[#0E7490]/40 text-xs font-semibold tracking-widest text-[#E2F1F3] uppercase">
              <Sparkles size={13} className="text-[#22D3EE]" />
              <span>THE MEHKAVI DIFFERENCE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide leading-tight text-[#FAF7F2]">
              Why Pay For Designer Brand Names When You Can Wear Pure Perfume Art?
            </h2>

            <p className="text-[#C5E2E7] text-sm sm:text-base leading-relaxed">
              Traditional high-end fashion perfumes cost between <strong>Rs. 60,000 to Rs. 120,000</strong>, with over 85% of that price tag going directly towards celebrity endorsements, billboard campaigns, and retail middleman markups.
            </p>

            <p className="text-[#C5E2E7] text-sm sm:text-base leading-relaxed">
              At <strong>MEHKAVI</strong>, we invest entirely into the liquid itself. We import premium raw fragrance oils directly from Grasse, France, compound them at a concentrated <strong>35% Extrait De Parfum ratio</strong>, and cold-macerate each batch for over 60 days. The result is identical olfactory richness with unprecedented 14-18+ hours of projection.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 bg-[#08272D] rounded-sm border border-[#10434E]">
                <Droplets className="text-[#22D3EE] mb-2" size={22} />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">35% Extrait</h4>
                <p className="text-[11px] text-[#A2C7CE] mt-1">Double the oil ratio of generic store EDTs.</p>
              </div>

              <div className="p-3.5 bg-[#08272D] rounded-sm border border-[#10434E]">
                <Clock className="text-[#22D3EE] mb-2" size={22} />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">60-Day Aging</h4>
                <p className="text-[11px] text-[#A2C7CE] mt-1">Dark cold maceration for smooth drydowns.</p>
              </div>

              <div className="p-3.5 bg-[#08272D] rounded-sm border border-[#10434E]">
                <ShieldCheck className="text-[#22D3EE] mb-2" size={22} />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Skin Safe</h4>
                <p className="text-[11px] text-[#A2C7CE] mt-1">IFRA compliant, cruelty-free formulation.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onNavigateToCollection}
                className="bg-[#0A3B44] hover:bg-[#0E515D] text-white border border-[#22D3EE]/50 px-8 py-4 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-widest transition duration-200 shadow-xl"
              >
                Experience Extrait Formulations
              </button>
            </div>
          </div>

          {/* Right: Visual Comparison Card */}
          <div className="bg-[#08262C] p-6 sm:p-8 rounded-sm border border-[#10434E] shadow-2xl space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-center text-[#E2F1F3] border-b border-[#0F3C45] pb-4">
              Real Value Comparison
            </h3>

            <div className="space-y-4">
              {/* Designer Retail */}
              <div className="p-4 bg-[#0B2F36] rounded border border-[#124B57] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#88ADB5] block">
                    Retail Designer Bottle
                  </span>
                  <p className="font-serif text-lg font-bold text-white mt-0.5">Commercial 100ml EDT</p>
                  <p className="text-xs text-[#88ADB5]">10-15% Concentration • 4-6 Hours Longevity</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-red-400 block uppercase font-semibold">Average Price</span>
                  <span className="font-serif text-xl font-bold text-white">Rs. 65,000+</span>
                </div>
              </div>

              {/* MEHKAVI Extrait */}
              <div className="p-5 bg-gradient-to-r from-[#0C3F49] to-[#082B32] rounded border-2 border-[#22D3EE] flex items-center justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#22D3EE] text-[#061F24] text-[9px] font-extrabold px-3 py-0.5 uppercase tracking-widest">
                  SMART CHOICE
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#22D3EE] block">
                    MEHKAVI Extrait De Parfum
                  </span>
                  <p className="font-serif text-lg font-bold text-white mt-0.5">MEHKAVI 100ml Grand Extrait</p>
                  <p className="text-xs text-[#C5E2E7]">35% Pure Oil • 14-18+ Hours Projection</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#22D3EE] block uppercase font-semibold">Only</span>
                  <span className="font-serif text-2xl font-extrabold text-[#22D3EE]">Rs. 5,450</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-[#A2C7CE]">
              Enjoy identical olfactory brilliance with over <strong>90% financial savings</strong> on every single bottle.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
