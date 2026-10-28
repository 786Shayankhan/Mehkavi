import React, { useState } from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  Sparkles, 
  Award, 
  Feather, 
  Leaf, 
  Play, 
  X, 
  ArrowRight,
  Droplet
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="bg-[#F8F6EF] text-[#173B3D] min-h-screen">
      
      {/* 1. Hero Header Banner */}
      <section className="relative bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#0B6265] text-white py-14 sm:py-20 overflow-hidden border-b border-[#003F43]/40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#07565A]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#C5A66A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            
            {/* Left Title & Breadcrumbs */}
            <div className="space-y-4 max-w-2xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase">
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Home
                </button>
                <ChevronRight size={13} className="text-[#07565A]" />
                <span className="text-white font-semibold">About Us</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase text-white leading-tight">
                About MEHKAVI
              </h1>

              <p className="text-sm sm:text-base text-[#F1EFE6]/90 leading-relaxed font-normal">
                More than just perfumes — we create fragrances that tell your story.
              </p>
            </div>

            {/* Right Hero Flacon Highlight */}
            <div className="hidden md:flex shrink-0 items-center justify-center">
              <div className="relative group">
                <div className="w-36 h-44 rounded-2xl bg-gradient-to-b from-[#07565A] to-[#003F43] p-2 shadow-2xl border border-[#C5A66A]/30 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
                    alt="MEHKAVI Luxury Perfume"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003F43]/80 via-transparent to-transparent flex items-end justify-center pb-2">
                    <span className="font-serif text-[10px] tracking-widest text-[#C5A66A] uppercase font-bold">
                      MEHKAVI
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Our Vision Section */}
      <section className="py-14 sm:py-20 border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Image: Luxury flacon on stone plinth */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border border-[#E4E5DD] group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
                    alt="MEHKAVI Fragrance Plinth"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003F43]/60 via-transparent to-transparent" />
                  
                  {/* Floating Monogram Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-md border border-[#E4E5DD] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center font-serif font-black text-xs">
                      M
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-[#003F43] uppercase">MEHKAVI</p>
                      <p className="text-[9px] text-[#647577]">Haute Parfumerie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content: Vision Statement & 4 Pillars */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#C5A66A] uppercase">
                  Our Vision
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B3D] leading-snug tracking-tight">
                  To be a global brand that brings the essence of luxury, confidence and individuality through timeless fragrances.
                </h2>
              </div>

              <p className="text-[#647577] text-sm sm:text-base leading-relaxed">
                At MEHKAVI, we believe that a fragrance is more than a scent — it's an expression of who you are. Our vision is to create unique and memorable experiences through high-quality perfumes that inspire, empower and stay with you always.
              </p>

              {/* 4 Feature Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E4E5DD]">
                
                <div className="bg-white p-4 rounded-xl border border-[#E4E5DD] text-center shadow-xs hover:border-[#003F43] transition group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#F1EFE6] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-2.5">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#173B3D]">Premium Quality</h4>
                  <p className="text-[10px] text-[#647577] mt-0.5">35% French Oils</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E4E5DD] text-center shadow-xs hover:border-[#003F43] transition group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#F1EFE6] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-2.5">
                    <Clock size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#173B3D]">Long Lasting</h4>
                  <p className="text-[10px] text-[#647577] mt-0.5">14-18+ Hours</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E4E5DD] text-center shadow-xs hover:border-[#003F43] transition group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#F1EFE6] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-2.5">
                    <HeartHandshake size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#173B3D]">Customer Care</h4>
                  <p className="text-[10px] text-[#647577] mt-0.5">15-Day Exchange</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E4E5DD] text-center shadow-xs hover:border-[#003F43] transition group">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#F1EFE6] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-2.5">
                    <Sparkles size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-xs text-[#173B3D]">Timeless Elegance</h4>
                  <p className="text-[10px] text-[#647577] mt-0.5">Artisanal Blends</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.2em] text-[#C5A66A] uppercase">
                  Our Story
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B3D] leading-tight">
                  A Journey of Passion and Fragrance
                </h2>
              </div>

              <p className="text-[#647577] text-sm sm:text-base leading-relaxed">
                MEHKAVI was born from a simple idea — to bring extraordinary fragrances to people who value quality, elegance and authenticity. What started as a passion for scents has now grown into a brand dedicated to crafting perfumes that make every moment special.
              </p>

              <p className="text-[#647577] text-sm sm:text-base leading-relaxed">
                Every bottle from MEHKAVI is macerated for a minimum of 60 days in temperature-controlled dark chambers. We hand-select pure botanical essences and natural woods from Grasse, France, delivering pure sillage without harsh chemical alcohol harshness.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('collection')}
                  className="inline-flex items-center gap-2.5 bg-[#003F43] hover:bg-[#07565A] text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md group"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Story Video Card (Matches Mockup with Central Play Button) */}
            <div className="lg:col-span-6">
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E4E5DD] cursor-pointer group aspect-[16/10] bg-[#003F43]"
              >
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80"
                  alt="MEHKAVI Atelier Craftsmanship Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-[#003F43]/40 group-hover:bg-[#003F43]/25 transition-colors" />

                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#003F43] flex items-center justify-center shadow-2xl pl-1 group-hover:scale-110 group-hover:bg-[#C5A66A] group-hover:text-[#003F43] transition-all">
                    <Play size={28} className="fill-current" />
                  </div>
                </div>

                {/* Video Info Caption */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white text-xs font-medium">
                  <span className="bg-[#003F43]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Watch: The Art of MEHKAVI Perfumery
                  </span>
                  <span className="text-[11px] text-[#F1EFE6] bg-black/40 px-2 py-0.5 rounded">
                    1:45 min
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Fragrance Collection Banner (Dark Teal Card) */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#0B6265] text-white p-8 sm:p-12 lg:p-16 border border-[#07565A] shadow-2xl">
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#C5A66A]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column Text */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold tracking-[0.25em] text-[#C5A66A] uppercase">
                  HAUTE PARFUMERIE
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Our Fragrance Collection
                </h2>

                <p className="text-sm sm:text-base text-[#F1EFE6]/80 leading-relaxed">
                  From fresh and floral to deep and woody, explore a world of scents crafted for every mood, every season and every you.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('collection')}
                    className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-lg"
                  >
                    Explore Collections
                  </button>
                </div>
              </div>

              {/* Right Column Flacons Lineup */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-[#C5A66A]/30 bg-[#003F43] p-2 shadow-2xl group">
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80"
                    alt="MEHKAVI Fragrance Lineup"
                    className="w-full h-64 sm:h-72 object-cover rounded-xl group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Values Section (What Makes MEHKAVI Special) */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C5A66A] uppercase">
              Our Values
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173B3D]">
              What Makes MEHKAVI Special
            </h2>
            <p className="text-xs sm:text-sm text-[#647577]">
              Rooted in tradition, formulated with pure passion, and crafted for modern individuality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Value 1: Authenticity */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E5DD] hover:border-[#003F43] transition shadow-xs group">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4E5DD] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-4 shadow-xs">
                <Award size={22} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#173B3D] mb-2">Authenticity</h3>
              <p className="text-xs text-[#647577] leading-relaxed">
                We offer only genuine and premium fragrances with strictly transparent ingredient declarations.
              </p>
            </div>

            {/* Value 2: Craftsmanship */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E5DD] hover:border-[#003F43] transition shadow-xs group">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4E5DD] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-4 shadow-xs">
                <Feather size={22} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#173B3D] mb-2">Craftsmanship</h3>
              <p className="text-xs text-[#647577] leading-relaxed">
                Every bottle is a result of careful artistry, 60-day cold maceration, and artisanal precision.
              </p>
            </div>

            {/* Value 3: Customer First */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E5DD] hover:border-[#003F43] transition shadow-xs group">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4E5DD] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-4 shadow-xs">
                <HeartHandshake size={22} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#173B3D] mb-2">Customer First</h3>
              <p className="text-xs text-[#647577] leading-relaxed">
                Your satisfaction is our priority with free exchanges, dedicated concierge, and doorstep trial.
              </p>
            </div>

            {/* Value 4: Sustainable Choices */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E5DD] hover:border-[#003F43] transition shadow-xs group">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4E5DD] group-hover:bg-[#003F43] text-[#003F43] group-hover:text-[#C5A66A] flex items-center justify-center transition-colors mb-4 shadow-xs">
                <Leaf size={22} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#173B3D] mb-2">Sustainable Choices</h3>
              <p className="text-xs text-[#647577] leading-relaxed">
                We care for a better tomorrow through recyclable glass bottles and zero harsh cruelty practices.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Ready to Find Your Signature Scent? Bottom CTA */}
      <section className="py-14 sm:py-20 bg-[#F1EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003F43] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-[#07565A]">
            <div className="max-w-2xl space-y-4 relative z-10">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Ready to Find Your Signature Scent?
              </h2>
              <p className="text-xs sm:text-sm text-[#F1EFE6]/80 leading-relaxed">
                Explore our exclusive collection and experience the luxury of MEHKAVI.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onNavigate('collection')}
                  className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-transparent hover:bg-white/10 text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider border border-white/40 transition"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Background bottle silhouette */}
            <div className="hidden lg:block absolute -right-10 -bottom-10 opacity-20 pointer-events-none w-80 h-80">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#003F43] rounded-2xl overflow-hidden shadow-2xl border border-[#07565A]">
            <div className="p-4 border-b border-[#07565A] flex items-center justify-between text-white">
              <h3 className="font-serif font-bold text-sm tracking-wider uppercase">
                The MEHKAVI Atelier Craftsmanship
              </h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video bg-black relative flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="MEHKAVI Perfume Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-[#07565A] text-xs text-[#F1EFE6]/80 flex items-center justify-between">
              <span>Pure 35% oil maceration documented in Karachi atelier.</span>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onNavigate('collection');
                }}
                className="text-[#C5A66A] font-bold hover:underline uppercase text-[11px]"
              >
                View Perfumes →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
