import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, 
  Search, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle, 
  Package, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Mail, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  AlertCircle,
  FileText,
  Lock,
  Compass
} from 'lucide-react';

interface PolicyProps {
  onNavigate: (route: string, params?: Record<string, any>) => void;
  onNavigateToProduct?: (slug: string) => void;
}

// ==========================================
// 1. FAQ PAGE
// ==========================================
export const FAQPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'orders' | 'products' | 'shipping' | 'returns'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      id: 1,
      category: 'shipping',
      question: 'How long does delivery take across Pakistan?',
      answer: 'For Karachi deliveries, standard shipping takes 1 to 2 business days. For Lahore, Islamabad, Rawalpindi, and other major cities, it takes 2 to 3 business days. Remote locations across Pakistan take 3 to 4 business days. All orders placed before 3:00 PM are dispatched on the same business day.'
    },
    {
      id: 2,
      category: 'shipping',
      question: 'What is your free shipping policy?',
      answer: 'We provide 100% Free Nationwide Delivery on all orders above Rs. 3,000. For orders below Rs. 3,000, a flat standard courier delivery charge of Rs. 200 applies anywhere in Pakistan.'
    },
    {
      id: 3,
      category: 'returns',
      question: 'Can I return or exchange my perfume if I do not like the scent?',
      answer: 'Yes! MEHKAVI PERFUMES offers a 15-day hassle-free exchange policy. Every full-size bottle (50ml and 100ml) comes with a complimentary 2ml matching sample vial. We ask that you spray the sample vial first; if you are not delighted, you can return the unopened full bottle for an exchange or refund.'
    },
    {
      id: 4,
      category: 'products',
      question: 'What is the oil concentration and longevity of MEHKAVI perfumes?',
      answer: 'All MEHKAVI perfumes are formulated as Extrait De Parfum with an ultra-potent 35% pure fragrance essence oil concentration. This is significantly stronger than standard Eau de Parfum (15-20%) or Eau de Toilette (5-15%), providing verified 14 to 18+ hours of projection and skin longevity.'
    },
    {
      id: 5,
      category: 'orders',
      question: 'How do I track my order once placed?',
      answer: 'Once your order is dispatched, you will receive an automated SMS and WhatsApp message with your courier tracking number (TCS, Trax, or Call Courier). You can also use our Track Order page to check real-time progress anytime.'
    },
    {
      id: 6,
      category: 'orders',
      question: 'What payment methods do you accept?',
      answer: 'We support Cash on Delivery (COD) across 200+ cities in Pakistan, Direct Online Bank Transfer (HBL, Meezan, Alfalah), Visa and MasterCard credit/debit cards, and JazzCash / EasyPaisa.'
    },
    {
      id: 7,
      category: 'products',
      question: 'Are MEHKAVI perfumes safe for sensitive skin?',
      answer: 'Yes. We use premium cosmetic-grade ingredients sourced from Grasse, France. Our formulations are IFRA-compliant, free from harsh industrial solvents, and macerated for a minimum of 45-60 days to ensure skin safety.'
    },
    {
      id: 8,
      category: 'products',
      question: 'Do you offer gift wrapping or personalized messages?',
      answer: 'Yes, complimentary luxury black-and-gold gift packaging and hand-written greeting cards are available at checkout. Simply select the gift wrap option during checkout.'
    }
  ];

  const filteredFaqs = FAQS.filter(f => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#0B6265] text-white py-14 sm:py-20 border-b border-[#003F43]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <nav className="inline-flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-4">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Help & FAQs</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#F1EFE6]/80 max-w-xl mx-auto">
            Find immediate answers regarding orders, delivery timelines, fragrance notes, and exchanges.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#647577]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. longevity, returns, COD, tracking)..."
              className="w-full bg-white text-[#173B3D] text-sm pl-11 pr-4 py-3.5 rounded-full shadow-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C5A66A]"
            />
          </div>
        </div>
      </div>

      {/* Categories & Accordions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'returns', label: 'Returns & 15-Day Exchange' },
            { id: 'products', label: 'Formulas & Longevity' },
            { id: 'orders', label: 'Orders & Payments' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition ${
                activeCategory === cat.id
                  ? 'bg-[#003F43] text-white shadow-sm'
                  : 'bg-white text-[#647577] border border-[#E4E5DD] hover:border-[#003F43] hover:text-[#003F43]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E4E5DD]">
              <p className="text-sm text-[#647577]">No questions found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-[#003F43] font-bold underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-xl border border-[#E4E5DD] overflow-hidden transition-shadow duration-200 hover:shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#173B3D]"
                  >
                    <span>{faq.question}</span>
                    <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 ${
                      isOpen ? 'bg-[#003F43] text-white rotate-180' : 'bg-[#F1EFE6] text-[#003F43]'
                    }`}>
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm text-[#647577] leading-relaxed border-t border-[#F1EFE6] pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Support CTA Box */}
        <div className="mt-14 bg-white rounded-2xl p-8 border border-[#E4E5DD] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F1EFE6] flex items-center justify-center text-[#003F43] shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#173B3D]">Still have questions?</h3>
              <p className="text-xs text-[#647577] mt-0.5">Our perfume specialists are available Monday to Saturday, 10 AM to 7 PM.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 bg-[#003F43] hover:bg-[#07565A] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Contact Customer Care
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SHIPPING POLICY PAGE
// ==========================================
export const ShippingPolicyPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Shipping Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            Shipping & Nationwide Delivery
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80">
            Fast, secure, and temperature-controlled courier delivery across Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-xl border border-[#E4E5DD] text-center">
            <Truck className="mx-auto text-[#003F43] mb-3" size={32} />
            <h3 className="font-serif font-bold text-base text-[#173B3D]">Free Shipping</h3>
            <p className="text-xs text-[#647577] mt-1">On all orders above Rs. 3,000 nationwide across Pakistan.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E4E5DD] text-center">
            <Clock className="mx-auto text-[#003F43] mb-3" size={32} />
            <h3 className="font-serif font-bold text-base text-[#173B3D]">2-3 Days Delivery</h3>
            <p className="text-xs text-[#647577] mt-1">Karachi: 1-2 days. Major cities: 2-3 days. Remote: 3-4 days.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#E4E5DD] text-center">
            <ShieldCheck className="mx-auto text-[#003F43] mb-3" size={32} />
            <h3 className="font-serif font-bold text-base text-[#173B3D]">Fragile Protection</h3>
            <p className="text-xs text-[#647577] mt-1">Custom foam inserts and tamper-evident seal on every flacon.</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-2xl p-8 border border-[#E4E5DD] space-y-6 text-sm text-[#647577] leading-relaxed">
          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">1. Delivery Zones & Timelines</h2>
            <p>MEHKAVI PERFUMES operates from our primary fulfillment studio in Karachi, Pakistan. All orders undergo a stringent multi-point olfactory quality check before being packed with protective cushioning.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F6EF] text-[#173B3D] font-bold">
                    <th className="p-3 border border-[#E4E5DD]">Destination</th>
                    <th className="p-3 border border-[#E4E5DD]">Estimated Transit Time</th>
                    <th className="p-3 border border-[#E4E5DD]">Courier Partner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[#E4E5DD] font-semibold text-[#173B3D]">Karachi City</td>
                    <td className="p-3 border border-[#E4E5DD]">1 - 2 Business Days</td>
                    <td className="p-3 border border-[#E4E5DD]">Trax / TCS Express</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#E4E5DD] font-semibold text-[#173B3D]">Lahore, Islamabad, Rawalpindi</td>
                    <td className="p-3 border border-[#E4E5DD]">2 - 3 Business Days</td>
                    <td className="p-3 border border-[#E4E5DD]">TCS / Call Courier</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#E4E5DD] font-semibold text-[#173B3D]">Other Major Cities (Faisalabad, Multan, Peshawar, etc.)</td>
                    <td className="p-3 border border-[#E4E5DD]">2 - 3 Business Days</td>
                    <td className="p-3 border border-[#E4E5DD]">TCS / Trax / Call Courier</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#E4E5DD] font-semibold text-[#173B3D]">Rest of Pakistan & Remote Areas</td>
                    <td className="p-3 border border-[#E4E5DD]">3 - 4 Business Days</td>
                    <td className="p-3 border border-[#E4E5DD]">Pakistan Post / TCS Remote</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">2. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Orders Rs. 3,000 and above:</strong> Free Shipping nationwide.</li>
              <li><strong>Orders below Rs. 3,000:</strong> Flat courier fee of Rs. 200 is added at checkout.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">3. Cash on Delivery (COD) Verification</h2>
            <p>To avoid fraudulent orders and returned parcels, first-time Cash on Delivery orders may receive a quick WhatsApp confirmation message or automated verification phone call before dispatch. Your prompt response ensures immediate dispatch within 24 hours.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">4. Damaged or Broken Parcels</h2>
            <p>In the rare event that a bottle arrives broken or leaking, please photograph the outer parcel and damaged bottle, and message our WhatsApp helpline (+92 334 8882358) within 24 hours of receipt. We will dispatch a brand-new replacement bottle immediately with zero courier cost to you.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. RETURN & EXCHANGE POLICY PAGE
// ==========================================
export const ReturnPolicyPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Exchange Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            15-Day Hassle-Free Exchange Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80">
            Our risk-free fragrance promise — sample first, love always.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Step Cards */}
        <div className="bg-white rounded-2xl p-8 border border-[#E4E5DD] shadow-sm">
          <h2 className="font-serif font-bold text-xl text-[#173B3D] mb-6 text-center">
            How The MEHKAVI Sample-First Policy Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#F8F6EF] rounded-xl border border-[#E4E5DD] text-center">
              <span className="w-8 h-8 rounded-full bg-[#003F43] text-white font-bold text-xs inline-flex items-center justify-center mb-3">1</span>
              <h4 className="font-serif font-bold text-sm text-[#173B3D]">Receive & Sample</h4>
              <p className="text-xs text-[#647577] mt-1.5">Every 50ml or 100ml perfume includes a complimentary matching 2ml tester vial in the box.</p>
            </div>
            <div className="p-5 bg-[#F8F6EF] rounded-xl border border-[#E4E5DD] text-center">
              <span className="w-8 h-8 rounded-full bg-[#003F43] text-white font-bold text-xs inline-flex items-center justify-center mb-3">2</span>
              <h4 className="font-serif font-bold text-sm text-[#173B3D]">Test On Skin</h4>
              <p className="text-xs text-[#647577] mt-1.5">Spray the 2ml tester vial on your skin and clothes. Evaluate longevity, projection, and drydown for up to 15 days.</p>
            </div>
            <div className="p-5 bg-[#F8F6EF] rounded-xl border border-[#E4E5DD] text-center">
              <span className="w-8 h-8 rounded-full bg-[#003F43] text-white font-bold text-xs inline-flex items-center justify-center mb-3">3</span>
              <h4 className="font-serif font-bold text-sm text-[#173B3D]">Keep or Exchange</h4>
              <p className="text-xs text-[#647577] mt-1.5">Love it? Open the main bottle! If it is not your signature, keep the 2ml vial and exchange the unopened main bottle.</p>
            </div>
          </div>
        </div>

        {/* Policy Terms */}
        <div className="bg-white rounded-2xl p-8 border border-[#E4E5DD] space-y-6 text-sm text-[#647577] leading-relaxed">
          <section>
            <h3 className="font-serif font-bold text-lg text-[#173B3D] mb-2">Conditions for Exchange:</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Request must be submitted within <strong>15 days</strong> of receiving your delivery.</li>
              <li>The full-size flacon (50ml or 100ml) must remain sealed in its original luxury box with undamaged presentation.</li>
              <li>You may keep the 2ml trial vial — it is our gift to you.</li>
              <li>Exchanges can be made for any other MEHKAVI perfume of equal or greater value (difference paid via COD or bank transfer).</li>
            </ul>
          </section>

          <section>
            <h3 className="font-serif font-bold text-lg text-[#173B3D] mb-2">How to Initiate an Exchange:</h3>
            <p>1. Send a WhatsApp message to our customer concierge at <strong>+92 334 8882358</strong> or email <strong>support@mehkavi.com</strong> with your Order Number (e.g. MK-10492).</p>
            <p>2. State which fragrance you would like to receive instead.</p>
            <p>3. Our courier will pick up the unopened parcel from your doorstep and hand you the replacement bottle.</p>
          </section>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#003F43] hover:bg-[#07565A] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
            >
              Contact Support for Exchange
            </button>
            <button
              onClick={() => onNavigate('collection')}
              className="bg-white hover:bg-[#F8F6EF] text-[#003F43] border border-[#003F43] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
            >
              Browse Fragrance Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. PRIVACY POLICY PAGE
// ==========================================
export const PrivacyPolicyPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80">
            Last Updated: October 2026 | MEHKAVI PERFUMES Pakistan
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E4E5DD] space-y-6 text-sm text-[#647577] leading-relaxed">
          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">1. Overview</h2>
            <p>At MEHKAVI PERFUMES, we value the trust you place in our artisanal fragrance house. This Privacy Policy outlines the information we collect when you browse our boutique, create an account, purchase our fragrances, or speak with our concierge.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Details:</strong> Your name, delivery address, phone number, and email address for order fulfillment.</li>
              <li><strong>Transaction Data:</strong> Ordered products, bottle sizes, order totals, and payment status (COD, bank transfer, card).</li>
              <li><strong>Device & Usage Data:</strong> Anonymized analytical parameters such as browser type, IP address, and pages viewed to optimize user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">3. Zero Card Data Storage</h2>
            <p>MEHKAVI PERFUMES never stores or captures your credit card numbers, CVVs, or online banking passwords on our servers. Card transactions are processed securely via PCI-DSS certified banking gateways with 256-bit encryption.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">4. Sharing With Third Parties</h2>
            <p>We do not sell, rent, or trade your personal data. We only share essential shipping details (name, delivery address, phone number) with our verified courier logistics partners (TCS, Trax, Call Courier) strictly for delivering your order.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">5. Your Rights</h2>
            <p>You have the right to inspect, update, or request deletion of your account and personal details at any time by contacting us at <strong>privacy@mehkavi.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. TERMS & CONDITIONS PAGE
// ==========================================
export const TermsPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Terms & Conditions</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            Terms & Conditions of Service
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80">
            Please read these terms carefully before utilizing our boutique services.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E4E5DD] space-y-6 text-sm text-[#647577] leading-relaxed">
          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">1. Intellectual Property & Silent Impressions Disclaimer</h2>
            <p>All fragrance names, trademarks, and copyrights belonging to designer and niche houses (such as Creed, Tom Ford, Louis Vuitton, Dior, Bvlgari, MFK, etc.) are the exclusive property of their respective owners.</p>
            <p className="mt-2 bg-[#F8F6EF] p-4 rounded-lg border border-[#E4E5DD] text-xs italic">
              "MEHKAVI PERFUMES crafts artisanal interpretations and silent impressions. We have no affiliation, sponsorship, or association with the original trademark holders. Our references to luxury brands are solely intended to describe the olfactory character and notes profile to guide the consumer."
            </p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">2. Pricing & Currency</h2>
            <p>All prices listed on MEHKAVI PERFUMES are in Pakistani Rupees (PKR) and include all applicable taxes unless explicitly stated otherwise. We reserve the right to correct typographical errors in pricing or promotional campaigns without prior notice.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">3. Product Formulation & Oil Concentration</h2>
            <p>Our fragrances are formulated as 35% Extrait De Parfum using high-grade cosmetic essences. While crafted for high sillage, fragrance perception varies naturally based on skin chemistry, ambient temperature, humidity, and individual olfaction.</p>
          </section>

          <section>
            <h2 className="font-serif font-bold text-lg text-[#173B3D] mb-2">4. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, subject to the exclusive jurisdiction of the courts of Karachi, Sindh.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. ORDER TRACKING PAGE
// ==========================================
export const OrderTrackingPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  const { orders } = useApp();
  const [trackQuery, setTrackQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    setHasSearched(true);

    const query = trackQuery.trim().toUpperCase();
    const matched = orders.find(
      o => o.orderNumber.toUpperCase() === query || 
           o.id.toUpperCase() === query ||
           (o.trackingNumber && o.trackingNumber.toUpperCase() === query) ||
           o.customer.phone.includes(trackQuery.trim())
    );

    if (matched) {
      setTrackingResult(matched);
    } else {
      // Create a realistic simulated order tracking result for demo numbers
      if (query.includes('MK-') || query.length >= 5) {
        setTrackingResult({
          orderNumber: query.startsWith('MK-') ? query : `MK-${query}`,
          createdAt: '28 October 2026',
          status: 'Dispatched',
          trackingNumber: `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
          customer: {
            fullName: 'Valued Client',
            city: 'Lahore',
            phone: '0300-XXXXXXX'
          },
          items: [
            { product: { name: 'Royal Oud' }, variant: { size: '100ml' }, quantity: 1 }
          ],
          total: 7999,
          estimatedDeliveryDate: '30 October 2026'
        });
      } else {
        setTrackingResult(null);
      }
    }
  };

  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <nav className="inline-flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Track Order</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            Track Your Delivery
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80 max-w-lg mx-auto">
            Enter your MEHKAVI Order Number (e.g. MK-78219) or phone number to view live courier status.
          </p>

          <form onSubmit={handleTrackSubmit} className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="text"
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="Order Number (e.g. MK-78219)"
              className="flex-1 bg-white text-[#173B3D] text-xs sm:text-sm px-4 py-3 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C5A66A]"
            />
            <button
              type="submit"
              className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-sm"
            >
              Track
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {hasSearched && !trackingResult && (
          <div className="bg-white rounded-2xl p-8 border border-[#E4E5DD] text-center">
            <AlertCircle className="mx-auto text-[#003F43] mb-3" size={36} />
            <h3 className="font-serif font-bold text-lg text-[#173B3D]">Order Not Found</h3>
            <p className="text-xs text-[#647577] mt-1 max-w-md mx-auto">
              We could not find an order matching "{trackQuery}". Please double check your order number or phone number, or try demo order number <strong>MK-78219</strong>.
            </p>
          </div>
        )}

        {trackingResult && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E5DD] shadow-sm animate-fade-in space-y-8">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E4E5DD] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#647577] uppercase tracking-widest">Order Reference</span>
                <h2 className="font-serif font-extrabold text-xl text-[#003F43]">{trackingResult.orderNumber}</h2>
                <p className="text-xs text-[#647577] mt-0.5">Placed on {trackingResult.createdAt}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-block bg-[#003F43]/10 text-[#003F43] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Status: {trackingResult.status}
                </span>
                <p className="text-xs text-[#647577] mt-1">Est. Delivery: <strong>{trackingResult.estimatedDeliveryDate}</strong></p>
              </div>
            </div>

            {/* Visual Step Progress Timeline */}
            <div>
              <h4 className="font-serif font-bold text-sm text-[#173B3D] mb-6">Delivery Milestones</h4>
              <div className="relative flex items-center justify-between">
                {/* Horizontal bar */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E4E5DD] -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-[#003F43] -translate-y-1/2 z-0" />

                {[
                  { label: 'Order Placed', completed: true },
                  { label: 'Formulated & Sealed', completed: true },
                  { label: 'Dispatched (Karachi)', completed: true },
                  { label: 'Delivered', completed: trackingResult.status === 'Delivered' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.completed ? 'bg-[#003F43] text-white ring-4 ring-[#F1EFE6]' : 'bg-white text-[#647577] border-2 border-[#E4E5DD]'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    <span className="text-[11px] font-medium text-[#173B3D] mt-2 text-center max-w-[80px]">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Info Box */}
            <div className="bg-[#F8F6EF] p-4 rounded-xl border border-[#E4E5DD] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#647577]">Courier Tracking #:</span>
                <span className="ml-2 font-mono font-bold text-[#003F43]">{trackingResult.trackingNumber || 'TRX-827192'}</span>
              </div>
              <span className="text-[#07565A] font-semibold">Trax Logistics Express</span>
            </div>

            {/* Items Summary */}
            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#647577] mb-3">Shipment Contents</h4>
              <div className="divide-y divide-[#E4E5DD]">
                {trackingResult.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#173B3D]">{item.product.name} ({item.variant.size}) × {item.quantity}</span>
                    <span className="text-[#647577]">Includes 2ml Free Tester Vial</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 7. WISHLIST PAGE
// ==========================================
export const WishlistPage: React.FC<PolicyProps> = ({ onNavigate, onNavigateToProduct }) => {
  const { wishlist, products, addToCart, toggleWishlist, formatPrice } = useApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F6EF] min-h-screen text-[#173B3D]">
      <div className="bg-[#003F43] text-white py-14 border-b border-[#07565A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase mb-3">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={13} className="text-[#07565A]" />
            <span className="text-white">Saved Scents</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#F1EFE6]/80">
            Keep track of your dream olfactory wardrobe and curated impressions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E5DD] max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F8F6EF] flex items-center justify-center mx-auto text-[#003F43] mb-4">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#173B3D]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#647577] mt-2 mb-6">
              Explore our celebrated perfume collection and tap the heart icon to save your favorites.
            </p>
            <button
              onClick={() => onNavigate('collection')}
              className="bg-[#003F43] hover:bg-[#07565A] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => {
              const defaultVariant = product.variants[1] || product.variants[0];
              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl border border-[#E4E5DD] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F1EFE6]">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onNavigateToProduct ? onNavigateToProduct(product.slug) : onNavigate('product', { slug: product.slug })}
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-sm transition"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C5A66A] tracking-wider">{product.gender} • {product.classification}</span>
                      <h4 
                        onClick={() => onNavigateToProduct ? onNavigateToProduct(product.slug) : onNavigate('product', { slug: product.slug })}
                        className="font-serif font-bold text-base text-[#173B3D] hover:text-[#003F43] cursor-pointer mt-1"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#647577] line-clamp-1 mt-0.5">{product.tagline}</p>
                      <div className="mt-2 text-sm font-bold text-[#003F43]">
                        {formatPrice(defaultVariant.price)}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E4E5DD] flex gap-2">
                      <button
                        onClick={() => addToCart(product, defaultVariant, 1)}
                        className="flex-1 bg-[#003F43] hover:bg-[#07565A] text-white py-2 rounded-full text-xs font-bold uppercase tracking-wider transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 8. NOT FOUND (404) PAGE
// ==========================================
export const NotFoundPage: React.FC<PolicyProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8F6EF] min-h-[70vh] flex items-center justify-center text-[#173B3D] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 border border-[#E4E5DD] shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#003F43]/10 flex items-center justify-center mx-auto text-[#003F43] mb-4">
          <Compass size={32} />
        </div>
        <span className="text-xs font-extrabold text-[#C5A66A] uppercase tracking-widest">Error 404</span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D] mt-2 mb-3">
          Fragrance Lost in Time
        </h1>
        <p className="text-xs sm:text-sm text-[#647577] leading-relaxed mb-8">
          The perfume page or collection you are seeking has evaporated or moved to another shelf in our atelier.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 bg-[#003F43] hover:bg-[#07565A] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Return to Boutique
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className="flex-1 bg-white hover:bg-[#F8F6EF] text-[#003F43] border border-[#003F43] py-3 rounded-full text-xs font-bold uppercase tracking-wider transition"
          >
            Explore Scents
          </button>
        </div>
      </div>
    </div>
  );
};
