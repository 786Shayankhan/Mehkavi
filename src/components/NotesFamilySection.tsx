import React from 'react';
import { OlfactoryFamily } from '../types';
import { Compass, Flame, Citrus, Flower2, Waves, Trees } from 'lucide-react';

interface NotesFamilySectionProps {
  onSelectFamily: (family: OlfactoryFamily) => void;
}

const FAMILIES: { name: OlfactoryFamily; desc: string; icon: React.ReactNode; scents: string }[] = [
  {
    name: 'Fresh Citrus',
    desc: 'Calabrian bergamot, Sicilian orange, sparkling neroli, black tea',
    icon: <Citrus className="text-[#0A3B44]" size={26} />,
    scents: 'Fantasy World, Citrus Sovereign'
  },
  {
    name: 'Woody & Oud',
    desc: 'Cambodian agarwood, smoky birch, cedar, solar driftwood',
    icon: <Trees className="text-[#0A3B44]" size={26} />,
    scents: 'Imperial Wood, Desert Rose, Velvet Shadow'
  },
  {
    name: 'Oriental & Spicy',
    desc: 'Bitter almond, Egyptian jasmine, saffron, aged cognac, vanilla',
    icon: <Flame className="text-[#0A3B44]" size={26} />,
    scents: 'Ace of Heart, Sovereign Oak, Celestial Amber'
  },
  {
    name: 'Floral & Gourmand',
    desc: 'Black cherry liqueur, Turkish rose, powdery musk, sweet vanilla',
    icon: <Flower2 className="text-[#0A3B44]" size={26} />,
    scents: 'Crimson Kiss, Royal Musk Tahara'
  },
  {
    name: 'Aromatic Aquatic',
    desc: 'Crisp ambroxan, Sichuan pepper, oceanic sea salt, cool mint',
    icon: <Waves className="text-[#0A3B44]" size={26} />,
    scents: 'Wild Sparkle, Marine Bleu'
  },
  {
    name: 'Leather & Tobacco',
    desc: 'Cured Cuban tobacco leaf, pimento berry, bourbon vanilla',
    icon: <Compass className="text-[#0A3B44]" size={26} />,
    scents: 'Bombastic, Tuscan accords'
  }
];

export const NotesFamilySection: React.FC<NotesFamilySectionProps> = ({ onSelectFamily }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#0891B2] block mb-1">
            Olfactory Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0A2328] uppercase tracking-wide">
            Explore By Fragrance Family
          </h2>
          <p className="text-xs text-[#527076] mt-2">
            Every nose is unique. Filter our collections by your preferred scent notes and olfactory profile.
          </p>
          <div className="w-12 h-0.5 bg-[#0A3B44] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FAMILIES.map((fam) => (
            <div
              key={fam.name}
              onClick={() => onSelectFamily(fam.name)}
              className="p-6 bg-white border border-[#DCE8EA] rounded-sm hover:border-[#0A3B44] hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#EEF5F6] rounded-sm group-hover:bg-[#0A3B44]/10 transition-colors">
                    {fam.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#527076] uppercase tracking-wider group-hover:text-[#0A3B44]">
                    View Scents →
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#0A2328] uppercase tracking-wide group-hover:text-[#0A3B44] transition-colors">
                  {fam.name}
                </h3>

                <p className="text-xs text-[#527076] mt-1.5 leading-relaxed">
                  {fam.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEF5F6] text-[11px] text-[#0891B2] font-semibold truncate">
                Popular: {fam.scents}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
