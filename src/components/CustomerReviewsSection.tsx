import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Shahmeer Khan',
    city: 'Islamabad',
    perfume: 'Fantasy World (Impression of LV Imagination)',
    rating: 5,
    date: 'October 2026',
    comment: 'I own the authentic LV Imagination ($340 bottle) and side by side on skin, Fantasy World stays even longer in Pakistani summer heat. The black tea and ambroxan note is exquisitely realistic. MEHKAVI customer support on WhatsApp was prompt!'
  },
  {
    id: 2,
    name: 'Hamza Tariq',
    city: 'Lahore',
    perfume: 'Fearless Prince (Impression of Versace Eros)',
    rating: 5,
    date: 'October 2026',
    comment: 'I sprayed Fearless Prince at 8 AM for an event, and even after 14 hours people kept complimenting the vanilla-mint drydown. Better projection than the current reformulated designer batch. Will definitely reorder from MEHKAVI.'
  },
  {
    id: 3,
    name: 'Zainab Qureshi',
    city: 'Rawalpindi',
    perfume: 'Ace of Heart (Impression of Baccarat Rouge 540 Extrait)',
    rating: 5,
    date: 'September 2026',
    comment: 'Every single wedding I wear Ace of Heart to, at least 4 women ask me what perfume I have on. Simply spellbinding projection and the Moroccan almond note is so royal.'
  },
  {
    id: 4,
    name: 'Saad Farooqi',
    city: 'Karachi',
    perfume: 'Discovery Set (5 x 5ML)',
    rating: 5,
    date: 'October 2026',
    comment: 'The MEHKAVI Discovery set is the best purchase I made this year. High quality glass atomizers with proper mist sprayers. Allowed me to choose my signature scent before buying the full 100ml bottle.'
  }
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#DCE8EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0891B2] mb-2">
            <Sparkles size={14} />
            <span>Customer Praise</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0A2328] uppercase tracking-wide">
            Loved By Over 12,000 Fragrance Connoisseurs
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-[#0A2328] text-sm">4.9 / 5.0 Average Rating</span>
          </div>
          <div className="w-12 h-0.5 bg-[#0A3B44] mx-auto mt-4" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#F8FAFA] border border-[#DCE8EA] rounded-sm flex flex-col justify-between relative hover:shadow-md transition duration-300"
            >
              <Quote className="absolute top-4 right-4 text-[#C5DFE4]" size={28} />

              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xs text-[#3D565B] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2EEF0]">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-xs text-[#0A2328] uppercase">
                    {rev.name}
                  </h4>
                  <span className="flex items-center text-[10px] text-[#0E7490] font-semibold gap-0.5">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <p className="text-[10px] text-[#5C7980] mt-0.5">{rev.city}, Pakistan</p>
                <p className="text-[10px] text-[#0891B2] font-semibold mt-1 truncate">
                  {rev.perfume}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
