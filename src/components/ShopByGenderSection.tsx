import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Gender } from '../types';

interface ShopByGenderSectionProps {
  onSelectGender: (gender: Gender) => void;
}

export const ShopByGenderSection: React.FC<ShopByGenderSectionProps> = ({ onSelectGender }) => {
  const GENDERS = [
    {
      title: 'Men',
      gender: 'Men' as Gender,
      tagline: 'Bold, smoky woods and magnetic sillage',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      bottleOverlay: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Women',
      gender: 'Women' as Gender,
      tagline: 'Sensual blooming florals and velvet gourmands',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bottleOverlay: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Unisex',
      gender: 'Unisex' as Gender,
      tagline: 'Refined niche profiles shared by connoisseurs',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      bottleOverlay: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D] tracking-tight">
            Shop by Gender
          </h2>
          <p className="text-xs sm:text-sm text-[#647577] mt-1">
            Find the olfactory harmony tailored specifically for your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GENDERS.map((g) => (
            <div
              key={g.title}
              onClick={() => onSelectGender(g.gender)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-[#E4E5DD] hover:border-[#003F43] transition-all duration-300"
            >
              {/* Main Model Photography */}
              <img
                src={g.image}
                alt={g.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter brightness-[0.78]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#003F43]/95 via-[#07565A]/40 to-transparent transition-opacity" />

              {/* Inset floating perfume thumbnail */}
              <div className="absolute top-4 right-4 w-16 h-20 rounded-lg overflow-hidden border border-white/40 shadow-xl bg-white/20 backdrop-blur-md p-1 hidden sm:block">
                <img src={g.bottleOverlay} alt="" className="w-full h-full object-cover rounded" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase tracking-wide group-hover:text-[#C5A66A] transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-[#F1EFE6]/80 mt-1 line-clamp-2">
                  {g.tagline}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#C5A66A] transition-colors">
                  <span className="border-b border-white group-hover:border-[#C5A66A] pb-0.5">Shop {g.title}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
