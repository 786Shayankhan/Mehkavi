import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductVariant } from '../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Check, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface QuickViewModalProps {
  onNavigateToProduct: (slug: string) => void;
  onNavigateToCheckout: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  onNavigateToProduct, 
  onNavigateToCheckout 
}) => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    formatPrice, 
    toggleWishlist, 
    isInWishlist 
  } = useApp();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants[1] || quickViewProduct.variants[0]);
      setSelectedImage(quickViewProduct.images[0]);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedVariant, quantity);
    setQuickViewProduct(null);
    onNavigateToCheckout();
  };

  const isFavorited = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="relative w-full max-w-4xl bg-white rounded-md shadow-2xl border border-[#D6E6E8] overflow-hidden animate-fade-in grid grid-cols-1 md:grid-cols-2">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-md transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Left: Gallery */}
          <div className="bg-[#F1F6F7] p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-sm overflow-hidden bg-white border border-[#DCE8EA]">
              <img
                src={selectedImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.isBestseller && (
                <span className="absolute top-3 left-3 bg-[#0A3B44] text-[#E2F1F3] text-[10px] font-bold px-2 py-1 tracking-widest uppercase rounded">
                  BESTSELLER
                </span>
              )}
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded border-2 overflow-hidden transition ${
                      selectedImage === img ? 'border-[#0891B2]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Purchase */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Inspiration Header */}
              {quickViewProduct.inspiredBy && (
                <div className="inline-flex items-center gap-1.5 bg-[#EEF5F6] text-[#0891B2] text-xs font-semibold px-2.5 py-1 rounded border border-[#CDE1E4] mb-2">
                  <Sparkles size={13} />
                  <span>{quickViewProduct.inspiredBy}</span>
                </div>
              )}

              <h2 className="font-serif text-2xl font-bold text-[#0A2328] uppercase tracking-wide">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-[#527076] mt-1 font-medium">
                {quickViewProduct.concentration} • {quickViewProduct.gender}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-3 border-b border-[#E8F0F2]">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#0A2328]">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(selectedVariant.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-[#444]">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-semibold ml-1">{quickViewProduct.rating}</span>
                  <span className="text-[#888]">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#555] mt-3 leading-relaxed line-clamp-3">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#222] uppercase tracking-wider mb-2">
                  Select Bottle Size: <span className="text-[#0891B2] font-semibold">{selectedVariant.size}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`py-2 px-2 text-xs rounded border text-center transition ${
                        selectedVariant.id === v.id
                          ? 'border-[#0A3B44] bg-[#0A3B44] text-white font-bold'
                          : 'border-[#D0E2E5] text-[#333] hover:border-black bg-white'
                      }`}
                    >
                      <div className="truncate">{v.size}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">{formatPrice(v.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fragrance Notes Highlights */}
              <div className="mt-4 bg-[#F8FAFA] p-2.5 rounded border border-[#D6E6E8] text-[11px]">
                <span className="font-bold text-[#444] uppercase tracking-wider block mb-1">
                  Key Notes:
                </span>
                <span className="text-[#666]">
                  {[...quickViewProduct.notes.top, ...quickViewProduct.notes.base].slice(0, 4).join(' • ')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#E8F0F2] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D0E2E5] rounded h-11">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-gray-600 hover:bg-gray-100 transition h-full"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#0A2328]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-gray-600 hover:bg-gray-100 transition h-full"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0A3B44] hover:bg-[#0891B2] text-white h-11 px-4 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`h-11 w-11 border rounded flex items-center justify-center transition ${
                    isFavorited
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-[#D0E2E5] text-gray-700 hover:text-black hover:border-black'
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Buy Now & Full Details link */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBuyNow}
                  className="bg-[#0891B2] hover:bg-[#0E7490] text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    onNavigateToProduct(quickViewProduct.slug);
                  }}
                  className="border border-[#0A3B44] text-[#0A2328] hover:bg-[#0A3B44] hover:text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1"
                >
                  <span>Full Details</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#527076] pt-1">
                <span className="flex items-center gap-1">
                  <Truck size={12} className="text-[#0891B2]" /> Free Shipping Over Rs. 5,000
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#0891B2]" /> 15-Day Exchange
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
