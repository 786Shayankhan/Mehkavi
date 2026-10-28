import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryTilesProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({ onNavigate }) => {
  const COLLECTIONS = [
    {
      title: "Men's Fragrances",
      subtitle: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
      gender: 'Men'
    },
    {
      title: "Women's Fragrances",
      subtitle: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80',
      gender: 'Women'
    },
    {
      title: 'Unisex Fragrances',
      subtitle: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80',
      gender: 'Unisex'
    },
    {
      title: 'Attar Collection',
      subtitle: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80',
      classification: 'Attar Collection'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title on Left, View All on Right */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D] tracking-tight">
            Featured Collections
          </h2>

          <button
            onClick={() => onNavigate('collection')}
            className="text-xs sm:text-sm font-semibold text-[#003F43] hover:text-[#07565A] flex items-center gap-1 transition group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid (Exact Moodboard Design) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (col.gender) {
                  onNavigate('collection', { gender: col.gender });
                } else if (col.classification) {
                  onNavigate('collection', { classification: col.classification });
                }
              }}
              className="group bg-white rounded-xl overflow-hidden border border-[#E4E5DD] hover:border-[#003F43] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with soft pedestal styling */}
              <div className="relative aspect-square bg-gradient-to-b from-[#F8F6EF] to-[#F1EFE6] overflow-hidden p-4 flex items-center justify-center">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-106 shadow-xs"
                />
              </div>

              {/* Title & Shop Now link */}
              <div className="p-4 text-center">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#173B3D] group-hover:text-[#003F43] transition-colors">
                  {col.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#003F43] font-semibold mt-1 group-hover:text-[#C5A66A]">
                  <span>{col.subtitle}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
