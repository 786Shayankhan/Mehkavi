import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedCollectionProps {
  onNavigateToProduct: (slug: string) => void;
  onNavigateToCollection: (filter?: Record<string, string>) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ 
  onNavigateToProduct, 
  onNavigateToCollection 
}) => {
  const { products } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women' | 'unisex' | 'bundles'>('all');

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case 'men':
        return products.filter((p) => p.gender === 'Men');
      case 'women':
        return products.filter((p) => p.gender === 'Women');
      case 'unisex':
        return products.filter((p) => p.gender === 'Unisex');
      case 'bundles':
        return products.filter((p) => p.classification === 'Bundles' || p.classification === 'Attar Collection');
      default:
        // Prioritize bestsellers and featured
        return products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 8);
    }
  }, [products, activeTab]);

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title on Left, View All on Right (Exact Moodboard Design) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D] tracking-tight">
              Best Selling Perfumes
            </h2>
            <p className="text-xs sm:text-sm text-[#647577] mt-1">
              Our most celebrated formulations loved for their enduring projection.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filter Pills */}
            <div className="hidden md:flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#E4E5DD]">
              {[
                { id: 'all', label: 'All' },
                { id: 'men', label: 'Men' },
                { id: 'women', label: 'Women' },
                { id: 'unisex', label: 'Unisex' },
                { id: 'bundles', label: 'Bundles' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition font-semibold ${
                    activeTab === tab.id
                      ? 'bg-[#003F43] text-white shadow-xs'
                      : 'text-[#647577] hover:text-[#003F43] hover:bg-[#F1EFE6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View All link */}
            <button
              onClick={() => onNavigateToCollection()}
              className="text-xs sm:text-sm font-semibold text-[#003F43] hover:text-[#07565A] flex items-center gap-1 transition group whitespace-nowrap"
            >
              <span>View All</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Product Grid (4 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigateToProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
