import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSliderProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  targetRoute: string;
  targetParams?: Record<string, string>;
  image: string;
  accentBottle: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'HAUTE PARFUMERIE',
    title: 'Luxury Scents for Every Moment',
    subtitle: 'Discover the finest fragrances crafted for your unique personality. 35% pure essence oils cold-macerated for unmatched sillage and all-day longevity.',
    ctaText: 'Shop Now',
    targetRoute: 'collection',
    targetParams: {},
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    accentBottle: 'Royal Oud'
  },
  {
    id: 2,
    tag: 'NEW ARRIVAL',
    title: 'Fantasy World',
    subtitle: 'Inspired by Louis Vuitton Imagination. Crisp Calabrian bergamot, Chinese black tea, Nigerian ginger, and deep ambroxan crystals.',
    ctaText: 'Explore Scent',
    targetRoute: 'product',
    targetParams: { slug: 'fantasy-world' },
    image: 'https://images.unsplash.com/photo-1588405748480-1cf414c89329?auto=format&fit=crop&w=1200&q=85',
    accentBottle: 'Fantasy World'
  },
  {
    id: 3,
    tag: 'CURATED VALUE',
    title: 'Exclusive Discovery Sets',
    subtitle: 'Explore 5 of MEHKAVI’s top iconic bestsellers before committing to a full bottle. Includes voucher towards full bottle purchase.',
    ctaText: 'Order Discovery Box',
    targetRoute: 'product',
    targetParams: { slug: 'discovery-set-5x5ml' },
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    accentBottle: 'Discovery Set'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative bg-[#F8F6EF] border-b border-[#E4E5DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 min-h-[500px] lg:min-h-[580px] flex items-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Text Column (Moodboard: "Luxury Scents for Every Moment") */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 z-10 animate-fade-in">
            
            <div className="inline-flex items-center gap-2 bg-[#F1EFE6] border border-[#E4E5DD] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#003F43] uppercase">
              <Sparkles size={13} className="text-[#C5A66A]" />
              <span>{slide.tag}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B3D] leading-tight tracking-tight">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-[#647577] leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate(slide.targetRoute, slide.targetParams)}
                className="bg-[#003F43] hover:bg-[#07565A] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onNavigate('collection')}
                className="bg-white hover:bg-[#F8F6EF] text-[#003F43] border border-[#003F43]/30 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition duration-200"
              >
                Explore Collections
              </button>
            </div>

          </div>

          {/* Right Product Image Column (Moodboard: Large flacon on warm architectural stone) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Soft decorative background glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#003F43]/10 blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-b from-white to-[#F1EFE6] p-4 flex items-center justify-center group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating Monogram Badge on bottle */}
              <div className="absolute bottom-6 right-6 bg-[#003F43]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A66A]/40 text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#C5A66A] animate-pulse" />
                <span>MEHKAVI • {slide.accentBottle}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-7 h-2 bg-[#0A3842]' 
                : 'w-2 h-2 bg-[#CADCDF] hover:bg-[#0A3842]/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Left/Right Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#0A3842] shadow-md transition border border-[#DCE8EA] hidden sm:block"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#0A3842] shadow-md transition border border-[#DCE8EA] hidden sm:block"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
