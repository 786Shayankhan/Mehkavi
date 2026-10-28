import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductVariant, ProductReview } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  ChevronRight,
  Maximize2,
  X,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigateToProduct: (slug: string) => void;
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  slug, 
  onNavigateToProduct, 
  onNavigate 
}) => {
  const { 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addReview,
    showToast 
  } = useApp();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'performance' | 'shipping' | 'reviews'>('notes');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState('');

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  // Update selected variant & image when product slug changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[1] || product.variants[0]);
      setSelectedImage(product.images[0]);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, product]);

  const isFavorited = isInWishlist(product.id);

  const discountPercent = 
    selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
      ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    onNavigate('checkout');
  };

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    setPincodeMessage(`Delivery available to ${pincode}: Estimated arrival within 2-3 working days.`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    addReview(product.id, {
      author: newAuthor,
      rating: newRating,
      title: newTitle || 'Exceptional Fragrance',
      comment: newComment,
      verifiedPurchase: true,
      location: newCity ? `${newCity}, Pakistan` : 'Pakistan'
    });

    setShowReviewForm(false);
    setNewAuthor('');
    setNewCity('');
    setNewTitle('');
    setNewComment('');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.gender === product.gender || p.classification === product.classification))
    .slice(0, 4);

  return (
    <div className="bg-[#F8FAFA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#527076] mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
          <span>/</span>
          <button 
            onClick={() => onNavigate('collection', { classification: product.classification })} 
            className="hover:text-black uppercase"
          >
            {product.classification}
          </button>
          <span>/</span>
          <span className="font-semibold text-black uppercase truncate">{product.name}</span>
        </div>

        {/* Main Product Section */}
        {/* Main Product Section */}
        <div className="bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery with Vertical Thumbnails (Moodboard Style) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden shrink-0 transition bg-[#F1F6F7] ${
                    selectedImage === img
                      ? 'border-[#0891B2] shadow-md ring-2 ring-[#0891B2]/30'
                      : 'border-[#E0ECED] opacity-70 hover:opacity-100 hover:border-[#0891B2]/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative aspect-square sm:aspect-[4/5] bg-[#F4F8F8] rounded-2xl overflow-hidden border border-[#DCE8EA] group shadow-inner">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {discountPercent && (
                  <span className="bg-[#0A3B44] text-[#22D3EE] text-xs font-bold px-3 py-1 tracking-wider uppercase rounded-full shadow-md border border-[#104D59]">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Trigger */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 hover:bg-white text-gray-700 hover:text-black rounded-full shadow-md transition"
                title="Click to Zoom"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0A2328] tracking-wide">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[#527076]">({product.reviewCount} Reviews)</span>
              </div>

              {/* Price Block */}
              <div className="mt-3.5 pb-4 border-b border-[#E8F0F2] flex items-center gap-3">
                <span className="font-serif text-3xl font-extrabold text-[#0A2328]">
                  {formatPrice(selectedVariant.price)}
                </span>
                {selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(selectedVariant.originalPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-[#0891B2] bg-[#E6F4F6] px-2.5 py-0.5 rounded-full border border-[#BDE3E8]">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#48656B] leading-relaxed">
              {product.description}
            </p>

            {/* Fragrance Notes Breakdown */}
            <div className="space-y-1.5 text-xs text-[#334D52] bg-[#F4F8F8] p-4 rounded-xl border border-[#DCE8EA]">
              <p>
                <strong className="text-[#0A2328] font-bold">Fragrance Family:</strong> {product.olfactoryFamily}
              </p>
              <p>
                <strong className="text-[#0A2328] font-bold">Top Notes:</strong> {product.notes?.top?.join(', ') || 'Bergamot, Saffron'}
              </p>
              <p>
                <strong className="text-[#0A2328] font-bold">Heart Notes:</strong> {product.notes?.middle?.join(', ') || 'Oud, Rose'}
              </p>
              <p>
                <strong className="text-[#0A2328] font-bold">Base Notes:</strong> {product.notes?.base?.join(', ') || 'Amber, Musk'}
              </p>
            </div>

            {/* Size Selector Pills */}
            <div>
              <label className="block text-xs font-bold text-[#0A2328] uppercase tracking-wider mb-2">
                Size:
              </label>

              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                      selectedVariant.id === v.id
                        ? 'bg-[#0A3B44] text-white shadow-md'
                        : 'bg-white border border-[#D0E2E5] text-[#333] hover:border-[#0A3B44]'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper and In Stock Badge */}
            <div>
              <label className="block text-xs font-bold text-[#0A2328] uppercase tracking-wider mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D0E2E5] rounded-lg h-10 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 text-gray-600 hover:bg-gray-100 transition h-full font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-[#0A2328]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 text-gray-600 hover:bg-gray-100 transition h-full font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <span>In Stock</span>
                </div>
              </div>
            </div>

            {/* Cart & Buy Now Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#003F43] hover:bg-[#07565A] text-white h-12 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 border-2 border-[#003F43] hover:bg-[#003F43] hover:text-white text-[#003F43] h-12 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-12 w-12 border rounded-full flex items-center justify-center transition shrink-0 ${
                    isFavorited
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-[#E4E5DD] text-[#173B3D] hover:text-[#003F43] hover:border-[#003F43]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* 3 Horizontal Trust Badges below buttons (Exact Moodboard Design) */}
            <div className="pt-4 border-t border-[#E8F0F2] grid grid-cols-3 gap-2 text-center text-[10px] sm:text-[11px] text-[#647577]">
              <div className="flex flex-col items-center gap-1">
                <Truck size={18} className="text-[#003F43]" />
                <span>Free Shipping Above Rs. 3,000</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-[#E4E5DD] px-1">
                <ShieldCheck size={18} className="text-[#003F43]" />
                <span>Easy Returns & Exchanges</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 size={18} className="text-[#003F43]" />
                <span>Secure Payment Options</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12 bg-white border border-[#DCE8EA] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Tabs Navigation (Moodboard Style) */}
          <div className="flex flex-wrap border-b border-[#DCE8EA] gap-8 text-xs sm:text-sm font-bold tracking-wide mb-6">
            <button
              onClick={() => setActiveTab('notes')}
              className={`pb-3 transition border-b-2 ${
                activeTab === 'notes' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#6B858B] hover:text-[#0A2328]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition border-b-2 ${
                activeTab === 'shipping' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#6B858B] hover:text-[#0A2328]'
              }`}
            >
              Shipping
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`pb-3 transition border-b-2 ${
                activeTab === 'performance' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#6B858B] hover:text-[#0A2328]'
              }`}
            >
              Exchange Policy
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition border-b-2 ${
                activeTab === 'reviews' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#6B858B] hover:text-[#0A2328]'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab 1: Olfactory Notes Pyramid */}
          {activeTab === 'notes' && (
            <div className="space-y-6 animate-fade-in">
              <p className="text-xs sm:text-sm text-[#3A5359] max-w-2xl leading-relaxed">
                MEHKAVI fragrances unfold in three distinct stages over 14+ hours. Sourced using authentic cold-pressed botanical essences from Grasse:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Top Notes */}
                <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0891B2] block mb-1">
                    0 — 30 MINUTES
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase mb-2">
                    Top Opening Notes
                  </h4>
                  <ul className="space-y-1 text-xs text-[#555]">
                    {product.notes.top.map((note, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Heart Notes */}
                <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0891B2] block mb-1">
                    30 MIN — 4 HOURS
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase mb-2">
                    Heart / Middle Notes
                  </h4>
                  <ul className="space-y-1 text-xs text-[#555]">
                    {product.notes.middle.map((note, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Base Notes */}
                <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0891B2] block mb-1">
                    4 — 18+ HOURS DRYDOWN
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase mb-2">
                    Base / Drydown Notes
                  </h4>
                  <ul className="space-y-1 text-xs text-[#555]">
                    {product.notes.base.map((note, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Performance & Metrics */}
          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in text-xs">
              <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                <span className="text-[#527076] uppercase font-bold tracking-wider block mb-1">Longevity</span>
                <p className="font-serif font-bold text-lg text-[#0A2328]">{product.longevity}</p>
                <p className="text-[#48656B] mt-1">Formulated with 35% oil concentration for all-day staying power.</p>
              </div>

              <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                <span className="text-[#527076] uppercase font-bold tracking-wider block mb-1">Sillage & Projection</span>
                <p className="font-serif font-bold text-lg text-[#0A2328]">{product.sillage}</p>
                <p className="text-[#48656B] mt-1">Leaves a memorable scent trail without suffocating the room.</p>
              </div>

              <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                <span className="text-[#527076] uppercase font-bold tracking-wider block mb-1">Optimal Season</span>
                <p className="font-serif font-bold text-lg text-[#0A2328]">{product.season}</p>
                <p className="text-[#48656B] mt-1">Tested for peak performance in diverse climates.</p>
              </div>

              <div className="p-5 bg-[#EEF5F6] rounded-sm border border-[#D6E6E8]">
                <span className="text-[#527076] uppercase font-bold tracking-wider block mb-1">Ideal Occasion</span>
                <p className="font-serif font-bold text-lg text-[#0A2328]">{product.occasion}</p>
                <p className="text-[#48656B] mt-1">Commands presence in both executive and casual spaces.</p>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Exchange Policy */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#3A5359] leading-relaxed max-w-3xl animate-fade-in">
              <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase">
                Shipping & Delivery Terms
              </h4>
              <p>
                • <strong>Free Nationwide Delivery:</strong> Available on all domestic orders above <strong>Rs. 5,000</strong> across Pakistan. Standard orders below Rs. 5,000 have a nominal delivery fee of Rs. 250.
              </p>
              <p>
                • <strong>Delivery Timelines:</strong> Major cities (Karachi, Lahore, Islamabad, Rawalpindi) typically receive their parcels within <strong>2 to 4 working days</strong>. Other nationwide areas arrive in 3 to 5 working days.
              </p>
              <p>
                • <strong>Payment Methods:</strong> Cash on Delivery (COD), Direct Bank Transfer (Meezan / Alfalah / HBL), and Visa/Mastercard.
              </p>

              <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase pt-4">
                15-Day Hassle-Free Exchange Guarantee
              </h4>
              <p>
                We stand behind every bottle we blend. If you are not completely satisfied with the fragrance impression, you can claim an exchange within <strong>15 days of delivery</strong>, provided that at least 95% of the product remains in the bottle with original packaging.
              </p>
            </div>
          )}

          {/* Tab 4: Reviews & Write Review */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fade-in">
              {/* Reviews Summary Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#DCE8EA] gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0A2328] uppercase">
                    Customer Feedback & Ratings
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-bold text-sm text-[#0A2328]">{product.rating} out of 5</span>
                    <span className="text-xs text-[#777]">({product.reviewCount} total reviews)</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-[#0A3B44] hover:bg-[#0891B2] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm transition"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-[#EEF5F6] p-6 rounded-sm border border-[#D6E6E8] space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#0A2328] uppercase">
                    Share Your Honest Experience with {product.name}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333] mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Farhan Zaidi"
                        className="w-full bg-white border border-[#DDD] text-xs p-2.5 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#333] mb-1">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="e.g. Lahore"
                        className="w-full bg-white border border-[#DDD] text-xs p-2.5 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333] mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-500 hover:scale-110 transition"
                        >
                          <Star size={22} fill={star <= newRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333] mb-1">Review Headline</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Incomparable longevity and compliments!"
                      className="w-full bg-white border border-[#DDD] text-xs p-2.5 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#333] mb-1">Your Detailed Comments</label>
                    <textarea
                      required
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Describe the projection, compliment factor, and notes on your skin..."
                      className="w-full bg-white border border-[#DDD] text-xs p-2.5 rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0A3B44] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-[#F8FAFA] border border-[#DCE8EA] rounded-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex text-amber-500 mb-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} size={13} fill="currentColor" />
                            ))}
                          </div>
                          <h5 className="font-serif font-bold text-sm text-[#0A2328]">{rev.title}</h5>
                        </div>
                        <span className="text-[11px] text-[#888]">{rev.date}</span>
                      </div>

                      <p className="text-xs text-[#3A5359] leading-relaxed mb-3">
                        {rev.comment}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-[#527076]">
                        <span className="font-bold text-[#0A2328]">{rev.author}</span>
                        {rev.location && <span>• {rev.location}</span>}
                        {rev.verifiedPurchase && (
                          <span className="flex items-center gap-0.5 text-[#2E7D32] font-semibold">
                            <CheckCircle2 size={12} /> Verified Buyer
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">No reviews yet for this size. Be the first to share your experience!</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0891B2] block mb-1">
                Curated Recommendations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A2328] uppercase tracking-wide">
                You May Also Admire
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onNavigate={onNavigateToProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/20 rounded-full transition"
          >
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};
