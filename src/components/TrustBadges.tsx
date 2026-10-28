import React from 'react';
import { ShieldCheck, CreditCard, Truck, RotateCcw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const BADGES = [
    {
      icon: <ShieldCheck className="text-[#003F43]" size={22} />,
      title: '100% Original Products',
      subtitle: 'Pure French essence oils (35% Extrait)'
    },
    {
      icon: <CreditCard className="text-[#003F43]" size={22} />,
      title: 'Secure Payment Options',
      subtitle: 'Cash on Delivery & Bank Transfer'
    },
    {
      icon: <Truck className="text-[#003F43]" size={22} />,
      title: 'Free Shipping Above Rs. 3,000',
      subtitle: 'Fast standard nationwide delivery'
    },
    {
      icon: <RotateCcw className="text-[#003F43]" size={22} />,
      title: 'Easy Returns & Exchanges',
      subtitle: '15-day satisfaction guarantee'
    }
  ];

  return (
    <div className="bg-white border-b border-[#DCE8EA] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((badge, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-[#F8FAFA] rounded-xl border border-[#DFEAEB] hover:border-[#0A3842]/40 hover:bg-white hover:shadow-xs transition duration-200"
            >
              <div className="p-2.5 bg-[#EAF1F2] rounded-lg shrink-0 text-[#0A3842]">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-xs sm:text-sm text-[#0A262C] leading-snug truncate">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-[#57757B] mt-0.5 truncate hidden sm:block">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
