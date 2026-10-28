import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  onSelectProduct: (slug: string) => void;
  onNavigateToCollection: (searchQuery: string) => void;
}

const POPULAR_SEARCHES = [
  'Sauvage',
  'Baccarat Rouge',
  'Creed Aventus',
  'Imagination',
  'Spicebomb',
  'Oud Wood',
  'Discovery Set',
  'Musk Tahara'
];

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct, onNavigateToCollection }) => {
  const { isSearchOpen, setIsSearchOpen, products, formatPrice } = useApp();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchInspired = p.inspiredBy?.toLowerCase().includes(q);
      const matchBrand = p.inspiredBrand?.toLowerCase().includes(q);
      const matchNotes = [
        ...p.notes.top,
        ...p.notes.middle,
        ...p.notes.base
      ].some((note) => note.toLowerCase().includes(q));
      const matchFamily = p.olfactoryFamily.toLowerCase().includes(q);
      const matchGender = p.gender.toLowerCase().includes(q);

      return matchName || matchInspired || matchBrand || matchNotes || matchFamily || matchGender;
    });
  }, [products, query]);

  if (!isSearchOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      onNavigateToCollection(query.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="relative w-full max-w-3xl bg-[#F8FAFA] rounded-md shadow-2xl border border-[#D6E6E8] overflow-hidden animate-fade-in">
          
          {/* Search Header Bar */}
          <div className="p-4 sm:p-6 border-b border-[#DCE8EA] bg-white">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <Search size={22} className="text-[#0891B2] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search perfumes, inspirations (e.g. Sauvage, Creed, Vanilla)..."
                autoFocus
                className="flex-1 bg-transparent text-base sm:text-lg text-[#0A2328] placeholder:text-[#999] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-black transition"
                >
                  <X size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 text-xs uppercase font-bold tracking-wider text-[#888] hover:text-[#0A2328] p-1.5"
              >
                ESC
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-[#EEF5F6]">
              <span className="text-[11px] font-semibold text-[#527076] uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} className="text-[#0891B2]" />
                Trending:
              </span>
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs bg-[#EEF5F6] hover:bg-[#0891B2] hover:text-white text-[#3A5359] px-2.5 py-1 rounded-sm transition font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-xs text-[#527076]">
                Type to start searching through MEHKAVI's bespoke library of 35% Extrait perfumes and pure attars.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif text-base text-[#0A2328]">No fragrances found for "{query}"</p>
                <p className="text-xs text-[#527076] mt-1">
                  Try searching by fragrance note (e.g. Amber, Oud, Bergamot) or designer inspiration brand.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCE8EA] text-xs font-semibold text-[#527076]">
                  <span>FOUND {filteredProducts.length} MATCHING FRAGRANCES</span>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onNavigateToCollection(query);
                    }}
                    className="text-[#0891B2] hover:text-[#0A2328] flex items-center gap-1"
                  >
                    View in Catalog <ArrowRight size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.slice(0, 8).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSelectProduct(product.slug);
                      }}
                      className="flex items-center gap-3 p-2.5 bg-white border border-[#DCE8EA] rounded-sm hover:border-[#0891B2] hover:shadow-md cursor-pointer transition group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded bg-[#F1F6F7] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#0A2328] group-hover:text-[#0891B2] transition truncate">
                          {product.name}
                        </h4>
                        {product.inspiredBy && (
                          <p className="text-[11px] text-[#0891B2] truncate font-medium">
                            {product.inspiredBy}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#0A2328]">
                            {formatPrice(product.variants[0].price)}
                          </span>
                          <span className="text-[10px] text-[#888] bg-[#EEF5F6] px-1.5 py-0.5 rounded">
                            {product.classification}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
