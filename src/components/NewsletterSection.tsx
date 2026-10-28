import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    // Save to localStorage subscribers
    try {
      const subs = JSON.parse(localStorage.getItem('mehkavi_subscribers') || '[]');
      subs.push({ email, date: new Date().toISOString() });
      localStorage.setItem('mehkavi_subscribers', JSON.stringify(subs));
    } catch {
      // fallback
    }

    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MEHKAVI10');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section className="bg-[#003F43] text-white py-14 sm:py-16 border-t border-[#07565A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C5A66A] mb-2">
          <Sparkles size={14} />
          <span>The MEHKAVI Connoisseurs Club</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#F8F6EF]">
          Enjoy 10% Off Your First Purchase
        </h2>

        <p className="text-xs sm:text-sm text-[#F1EFE6]/80 max-w-lg mx-auto mt-2 mb-8">
          Subscribe to receive VIP access to limited bottle drops, private vault releases, and bespoke scent recommendations from MEHKAVI.
        </p>

        {isSubscribed ? (
          <div className="bg-[#07565A] border border-[#C5A66A] p-6 rounded-xl max-w-md mx-auto animate-fade-in">
            <p className="text-sm font-semibold text-[#F8F6EF] mb-2">
              Welcome to the MEHKAVI Inner Circle!
            </p>
            <p className="text-xs text-[#E4E5DD] mb-4">
              Use your exclusive voucher code at checkout:
            </p>
            <div className="flex items-center justify-center gap-3 bg-[#003F43] p-3 rounded-lg border border-[#07565A]">
              <span className="font-mono text-lg font-bold tracking-widest text-[#C5A66A]">
                MEHKAVI10
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] p-1.5 rounded transition flex items-center gap-1 text-xs font-bold"
                title="Copy Code"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647577]" size={18} />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#07565A] border border-[#0B6265] text-white text-xs sm:text-sm rounded-full pl-10 pr-4 py-3.5 placeholder:text-[#E4E5DD]/70 focus:outline-none focus:border-[#C5A66A]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition whitespace-nowrap shadow-sm"
            >
              Claim 10% Off
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
