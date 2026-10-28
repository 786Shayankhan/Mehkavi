import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Gender, Classification, OlfactoryFamily } from '../types';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  Sparkles, 
  RotateCcw,
  Grid3X3,
  Grid2X2,
  LayoutGrid
} from 'lucide-react';

interface CollectionPageProps {
  initialFilter?: {
    gender?: Gender;
    classification?: string;
    brand?: string;
    family?: OlfactoryFamily;
    filter?: string;
    search?: string;
  };
  onNavigateToProduct: (slug: string) => void;
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ 
  initialFilter, 
  onNavigateToProduct,
  onNavigate 
}) => {
  const { products, formatPrice } = useApp();

  // Filters state
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [onlySale, setOnlySale] = useState(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(12000);
  const [sortBy, setSortBy] = useState<'featured' | 'bestselling' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync incoming props
  useEffect(() => {
    if (initialFilter?.gender) {
      setSelectedGender(initialFilter.gender);
    }
    if (initialFilter?.classification) {
      setSelectedClassification(initialFilter.classification);
    }
    if (initialFilter?.brand) {
      setSelectedBrand(initialFilter.brand);
    }
    if (initialFilter?.family) {
      setSelectedFamily(initialFilter.family);
    }
    if (initialFilter?.filter === 'bestseller') {
      setOnlyBestsellers(true);
    }
    if (initialFilter?.filter === 'sale') {
      setOnlySale(true);
    }
    if (initialFilter?.search) {
      setSearchTerm(initialFilter.search);
    }
  }, [initialFilter]);

  // Unique list of brands
  const brands = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      if (p.inspiredBrand) list.add(p.inspiredBrand);
    });
    return Array.from(list).sort();
  }, [products]);

  // Unique classifications
  const classifications: Classification[] = [
    'Signature',
    'Exclusif',
    'Prive',
    'Own Creations',
    'Attar Collection',
    'Candles',
    'Bundles'
  ];

  // Families
  const families: OlfactoryFamily[] = [
    'Fresh Citrus',
    'Woody & Oud',
    'Oriental & Spicy',
    'Floral & Gourmand',
    'Aromatic Aquatic',
    'Leather & Tobacco'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchInsp = p.inspiredBy?.toLowerCase().includes(q);
          const matchBrand = p.inspiredBrand?.toLowerCase().includes(q);
          if (!matchName && !matchInsp && !matchBrand) return false;
        }

        // Gender
        if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'Unisex') {
          return false;
        }

        // Classification
        if (selectedClassification !== 'All' && p.classification !== selectedClassification) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'All' && p.inspiredBrand !== selectedBrand) {
          return false;
        }

        // Family
        if (selectedFamily !== 'All' && p.olfactoryFamily !== selectedFamily) {
          return false;
        }

        // Sale
        if (onlySale && !p.onSale) {
          return false;
        }

        // Bestseller
        if (onlyBestsellers && !p.isBestseller) {
          return false;
        }

        // Price
        const minPrice = p.variants[0]?.price || 0;
        if (minPrice > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;

        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'bestselling':
            return (b.reviewCount || 0) - (a.reviewCount || 0);
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [
    products, 
    searchTerm, 
    selectedGender, 
    selectedClassification, 
    selectedBrand, 
    selectedFamily, 
    onlySale, 
    onlyBestsellers, 
    priceRange, 
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedGender('All');
    setSelectedClassification('All');
    setSelectedBrand('All');
    setSelectedFamily('All');
    setOnlySale(false);
    setOnlyBestsellers(false);
    setPriceRange(12000);
    setSearchTerm('');
  };

  const hasActiveFilters = 
    selectedGender !== 'All' ||
    selectedClassification !== 'All' ||
    selectedBrand !== 'All' ||
    selectedFamily !== 'All' ||
    onlySale ||
    onlyBestsellers ||
    searchTerm !== '' ||
    priceRange < 12000;

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#527076] mb-4 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
          <span>/</span>
          <span className="font-semibold text-black uppercase">
            {selectedClassification !== 'All' ? selectedClassification : 'All Fragrances'}
          </span>
          {selectedBrand !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[#0891B2] font-semibold">{selectedBrand}</span>
            </>
          )}
        </div>

        {/* Collection Hero Header (Moodboard Dark Cyan Panoramic Banner) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#0B6265] text-white p-8 sm:p-12 mb-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#07565A]">
          <div className="max-w-xl z-10 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A66A] block mb-2">
              MEHKAVI HAUTE PARFUMERIE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-wide mb-3">
              {selectedBrand !== 'All' 
                ? `Inspired by ${selectedBrand}` 
                : selectedClassification !== 'All' 
                ? `${selectedClassification}` 
                : selectedGender !== 'All'
                ? `${selectedGender}'s Fragrances`
                : 'Men\'s Fragrances'}
            </h1>
            <p className="text-sm sm:text-base text-[#D0E7EB] font-light italic">
              Bold. Confident. Unforgettable.
            </p>
          </div>

          <div className="relative w-44 h-36 sm:w-60 sm:h-44 shrink-0 flex items-center justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Fragrance"
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white border border-[#DCE8EA] p-4 rounded-sm mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-[#0A3B44] text-white text-xs uppercase font-bold tracking-wider px-4 py-2.5 rounded-sm"
          >
            <SlidersHorizontal size={14} />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          {/* Results Count */}
          <div className="text-xs text-[#3A5359] font-medium">
            Showing <strong className="text-[#0A2328] font-bold">{filteredProducts.length}</strong> fragrances
          </div>

          {/* Right Controls: Sort & Grid View */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#777] hidden sm:inline uppercase tracking-wider font-semibold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8FAFA] border border-[#D0E2E5] rounded px-3 py-1.5 text-xs font-semibold text-[#0A2328] focus:outline-none focus:border-[#0891B2]"
              >
                <option value="featured">Featured Masterpieces</option>
                <option value="bestselling">Best Selling</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Grid Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 border-l border-[#DCE8EA] pl-3">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition ${gridCols === 3 ? 'bg-[#0A3B44] text-white' : 'text-gray-400 hover:text-black'}`}
                title="3 Column Grid"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition ${gridCols === 4 ? 'bg-[#0A3B44] text-white' : 'text-gray-400 hover:text-black'}`}
                title="4 Column Grid"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-[#777] font-semibold uppercase tracking-wider">Active Filters:</span>
            
            {selectedGender !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#D0E2E5] px-2.5 py-1 rounded">
                Gender: {selectedGender}
                <button onClick={() => setSelectedGender('All')}><X size={12} /></button>
              </span>
            )}

            {selectedClassification !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#D0E2E5] px-2.5 py-1 rounded">
                Line: {selectedClassification}
                <button onClick={() => setSelectedClassification('All')}><X size={12} /></button>
              </span>
            )}

            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#D0E2E5] px-2.5 py-1 rounded">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand('All')}><X size={12} /></button>
              </span>
            )}

            {selectedFamily !== 'All' && (
              <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#D0E2E5] px-2.5 py-1 rounded">
                Family: {selectedFamily}
                <button onClick={() => setSelectedFamily('All')}><X size={12} /></button>
              </span>
            )}

            {onlySale && (
              <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded">
                On Sale
                <button onClick={() => setOnlySale(false)}><X size={12} /></button>
              </span>
            )}

            {onlyBestsellers && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#FAF5EB] text-[#0891B2] border border-[#E8DEC8] px-2.5 py-1 rounded">
                Bestsellers Only
                <button onClick={() => setOnlyBestsellers(false)}><X size={12} /></button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:underline font-semibold ml-2 flex items-center gap-1"
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-white p-5 rounded-sm border border-[#DCE8EA] shadow-sm h-fit">
            <div className="flex items-center justify-between border-b border-[#E8F0F2] pb-3">
              <span className="font-serif font-bold text-sm uppercase text-[#0A2328] tracking-wider">
                Refine Fragrances
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#0891B2] hover:underline font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2328] mb-2.5">
                Target Gender
              </h4>
              <div className="space-y-1 text-xs">
                {['All', 'Men', 'Women', 'Unisex'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g as any)}
                    className={`w-full text-left py-1.5 px-2 rounded transition flex items-center justify-between ${
                      selectedGender === g 
                        ? 'bg-[#0A3B44] text-white font-bold' 
                        : 'text-[#555] hover:bg-[#F8FAFA] hover:text-black'
                    }`}
                  >
                    <span>{g === 'All' ? 'All Genders' : `${g}'s Fragrances`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Classification Filter */}
            <div className="pt-4 border-t border-[#E8F0F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2328] mb-2.5">
                Classification Line
              </h4>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedClassification('All')}
                  className={`w-full text-left py-1.5 px-2 rounded transition ${
                    selectedClassification === 'All' 
                      ? 'bg-[#0A3B44] text-white font-bold' 
                      : 'text-[#555] hover:bg-[#F8FAFA]'
                  }`}
                >
                  All Lines
                </button>
                {classifications.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedClassification(c)}
                    className={`w-full text-left py-1.5 px-2 rounded transition ${
                      selectedClassification === c 
                        ? 'bg-[#0A3B44] text-white font-bold' 
                        : 'text-[#555] hover:bg-[#F8FAFA]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspired Brand Filter */}
            <div className="pt-4 border-t border-[#E8F0F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2328] mb-2.5">
                Inspired By Brand
              </h4>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrand('All')}
                  className={`w-full text-left py-1.5 px-2 rounded transition ${
                    selectedBrand === 'All' 
                      ? 'bg-[#0A3B44] text-white font-bold' 
                      : 'text-[#555] hover:bg-[#F8FAFA]'
                  }`}
                >
                  All Brands
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left py-1.5 px-2 rounded transition ${
                      selectedBrand === b 
                        ? 'bg-[#0A3B44] text-white font-bold' 
                        : 'text-[#555] hover:bg-[#F8FAFA]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Olfactory Family Filter */}
            <div className="pt-4 border-t border-[#E8F0F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2328] mb-2.5">
                Fragrance Family
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedFamily('All')}
                  className={`w-full text-left py-1.5 px-2 rounded transition ${
                    selectedFamily === 'All' 
                      ? 'bg-[#0A3B44] text-white font-bold' 
                      : 'text-[#555] hover:bg-[#F8FAFA]'
                  }`}
                >
                  All Families
                </button>
                {families.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFamily(f)}
                    className={`w-full text-left py-1.5 px-2 rounded transition ${
                      selectedFamily === f 
                        ? 'bg-[#0A3B44] text-white font-bold' 
                        : 'text-[#555] hover:bg-[#F8FAFA]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-[#E8F0F2]">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-[#0A2328]">Max Price</span>
                <span className="font-semibold text-[#0891B2]">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="12000"
                step="250"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#0891B2] cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="pt-4 border-t border-[#E8F0F2] space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#333]">
                <input
                  type="checkbox"
                  checked={onlyBestsellers}
                  onChange={(e) => setOnlyBestsellers(e.target.checked)}
                  className="rounded text-[#0891B2] focus:ring-0"
                />
                <span className="font-semibold">Bestsellers Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#333]">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded text-[#0891B2] focus:ring-0"
                />
                <span className="font-semibold">Special Deals & Sale</span>
              </label>
            </div>
          </div>

          {/* Products Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#DCE8EA] p-12 text-center rounded-sm">
                <div className="w-16 h-16 bg-[#EEF5F6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0891B2]">
                  <Sparkles size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0A2328]">
                  No fragrances matched your filters
                </h3>
                <p className="text-xs text-[#527076] mt-2 mb-6 max-w-sm mx-auto">
                  Try adjusting your selected brand, gender, or price range to explore more of our luxury catalogue.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#0A3B44] hover:bg-[#0891B2] text-white text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-sm transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div>
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    gridCols === 3
                      ? 'grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onNavigate={onNavigateToProduct}
                    />
                  ))}
                </div>

                {/* Pagination (Moodboard Style) */}
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button className="w-9 h-9 rounded-full bg-[#0A3842] text-white font-bold text-xs flex items-center justify-center shadow-md">
                    1
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white border border-[#D0E2E5] text-[#334D52] hover:bg-[#EEF5F6] font-semibold text-xs flex items-center justify-center transition">
                    2
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white border border-[#D0E2E5] text-[#334D52] hover:bg-[#EEF5F6] font-semibold text-xs flex items-center justify-center transition">
                    3
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white border border-[#D0E2E5] text-[#334D52] hover:bg-[#EEF5F6] font-semibold text-xs flex items-center justify-center transition">
                    4
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white border border-[#D0E2E5] text-[#334D52] hover:bg-[#EEF5F6] font-semibold text-xs flex items-center justify-center transition">
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col p-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="font-serif font-bold text-base uppercase">Filter Fragrances</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Filter Contents */}
              <div className="space-y-6 text-xs">
                {/* Gender */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2">Gender</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['All', 'Men', 'Women', 'Unisex'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g as any)}
                        className={`p-2 rounded border text-center font-medium ${
                          selectedGender === g ? 'bg-[#0A3B44] text-white' : 'border-[#DDD]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Classification */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-2">Classification</h4>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    <button
                      onClick={() => setSelectedClassification('All')}
                      className={`w-full text-left p-1.5 rounded ${
                        selectedClassification === 'All' ? 'bg-[#0A3B44] text-white' : ''
                      }`}
                    >
                      All Lines
                    </button>
                    {classifications.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedClassification(c)}
                        className={`w-full text-left p-1.5 rounded ${
                          selectedClassification === c ? 'bg-[#0A3B44] text-white' : ''
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-6 border-t">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-[#0A3B44] text-white py-3 rounded-sm font-bold uppercase tracking-widest text-xs"
                  >
                    Apply Filters ({filteredProducts.length} Results)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
