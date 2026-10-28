import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onNavigate: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { 
    formatPrice, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    addToCart 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const isFavorited = isInWishlist(product.id);
  const defaultVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const discountPercent = 
    defaultVariant.originalPrice && defaultVariant.originalPrice > defaultVariant.price
      ? Math.round(((defaultVariant.originalPrice - defaultVariant.price) / defaultVariant.originalPrice) * 100)
      : null;

  return (
    <div 
      className="group relative bg-white border border-[#E4E5DD] rounded-xl hover:border-[#003F43] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge on Top Left (Exact Moodboard Design: Teal Pill e.g. -20%) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {discountPercent ? (
          <span className="bg-[#003F43] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </span>
        ) : product.isBestseller ? (
          <span className="bg-[#003F43] text-[#C5A66A] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-[#C5A66A]/30">
            BESTSELLER
          </span>
        ) : null}
      </div>

      {/* Wishlist & Quick View Buttons on Top Right */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full shadow-xs backdrop-blur-md transition ${
            isFavorited
              ? 'bg-red-50 text-red-500'
              : 'bg-white/90 text-gray-700 hover:text-black hover:bg-white'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={15} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-[#0A3842] rounded-full shadow-xs transition"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye size={15} />
        </button>
      </div>

      {/* Product Image Area with soft pedestal background */}
      <div 
        onClick={() => onNavigate(product.slug)}
        className="relative aspect-square sm:aspect-[4/5] bg-gradient-to-b from-[#F3F7F8] to-[#E8EFF0] p-4 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-106 shadow-xs"
          loading="lazy"
        />

        {/* Quick Add Overlay on hover */}
        <div className="absolute bottom-3 inset-x-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, defaultVariant, 1);
            }}
            className="w-full bg-[#003F43] hover:bg-[#07565A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-full transition flex items-center justify-center gap-1.5 shadow-md"
          >
            <ShoppingBag size={14} />
            <span>Quick Add ({defaultVariant.size})</span>
          </button>
        </div>
      </div>

      {/* Product Details Area (Exact Moodboard: Title, Category subtitle, Prices, Stars) */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onNavigate(product.slug)}
            className="font-serif font-bold text-sm sm:text-base text-[#173B3D] group-hover:text-[#003F43] transition-colors cursor-pointer truncate"
          >
            {product.name}
          </h3>

          {/* Subtitle / Concentration */}
          <p className="text-xs text-[#647577] mt-0.5 truncate font-normal">
            {product.inspiredBy ? product.inspiredBy : `${product.concentration} • ${product.gender}`}
          </p>

          {/* Pricing Row: Sale Price & Original Strikethrough */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm sm:text-base font-extrabold text-[#173B3D]">
              {formatPrice(defaultVariant.price)}
            </span>
            {defaultVariant.originalPrice && defaultVariant.originalPrice > defaultVariant.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(defaultVariant.originalPrice)}
              </span>
            )}
          </div>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="currentColor" />
              ))}
            </div>
            <span className="text-[11px] text-[#647577] ml-1 font-medium">({product.reviewCount})</span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="mt-3 pt-2 border-t border-[#F1EFE6] sm:hidden flex items-center justify-between">
          <span className="text-[11px] text-[#647577]">{defaultVariant.size}</span>
          <button
            onClick={() => addToCart(product, defaultVariant, 1)}
            className="p-2 bg-[#003F43] text-white rounded-full hover:bg-[#07565A] transition"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
