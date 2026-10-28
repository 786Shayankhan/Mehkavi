import React from 'react';
import { Award, Compass, Users, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const PILLARS = [
    {
      icon: <Award className="text-[#0A3842]" size={28} />,
      title: 'Premium Quality Fragrances',
      description: 'Handcrafted with 35% pure French fragrance oils for lasting projection and genuine skin-safe elegance.'
    },
    {
      icon: <Compass className="text-[#0A3842]" size={28} />,
      title: 'Curated Collections for Every Mood',
      description: 'From boardroom dominance to romantic evenings, our notes pyramid is optimized for every occasion.'
    },
    {
      icon: <Users className="text-[#0A3842]" size={28} />,
      title: 'Trusted by Thousands',
      description: 'Over 12,000 verified clients across Pakistan trust MEHKAVI for luxury impressions and authentic attars.'
    },
    {
      icon: <Headphones className="text-[#0A3842]" size={28} />,
      title: 'Dedicated Customer Support',
      description: 'Fast WhatsApp consultations and 15-day hassle-free satisfaction exchange on every full bottle.'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-[#DFEAEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A262C] tracking-tight">
            Why Choose MEHKAVI Perfumes?
          </h2>
          <p className="text-xs sm:text-sm text-[#57757B] mt-2">
            The artisanal benchmark in luxury fragrance craftsmanship and silent impressions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F8FAFA] rounded-xl border border-[#DFEAEB] hover:border-[#0A3842] hover:bg-white hover:shadow-md transition-all duration-200 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#E5F0F2] flex items-center justify-center mb-4 text-[#0A3842]">
                {p.icon}
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-[#0A262C] mb-2">
                {p.title}
              </h3>
              <p className="text-xs text-[#57757B] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
