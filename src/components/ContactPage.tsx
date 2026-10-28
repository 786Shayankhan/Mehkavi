import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Plus, 
  Minus,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string, params?: Record<string, string>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { submitContactInquiry } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: 'General Inquiry',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      errors.subject = 'Please specify or select an inquiry subject';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write your message';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        inquiryType: formData.inquiryType,
        message: formData.message
      });

      if (res.success && res.inquiryId) {
        setSubmittedInquiryId(res.inquiryId);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: 'General Inquiry',
          message: ''
        });
        setFormErrors({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      q: 'How long does delivery take?',
      a: 'Standard nationwide delivery across Karachi takes 24 to 48 hours. For major cities like Lahore, Islamabad, Faisalabad, Peshawar, and Multan, delivery takes 2 to 3 business days via tracked express courier (TCS/Trax/Call Courier).'
    },
    {
      q: 'Can I return or exchange my order?',
      a: 'Yes! We offer an effortless 15-day exchange policy. Every full bottle includes a matching 2ml trial vial. If the fragrance profile does not match your taste, simply contact our team via WhatsApp or email, and we will arrange an exchange.'
    },
    {
      q: 'Do you offer international shipping?',
      a: 'We currently deliver throughout Pakistan with Cash on Delivery (COD) and online card payments. Direct express shipping to GCC countries (UAE, Saudi Arabia, Oman, Bahrain) will be launching in 2027!'
    },
    {
      q: 'How can I track my order?',
      a: 'As soon as your package leaves our Karachi atelier, an automated SMS and WhatsApp containing your courier tracking code will be dispatched. You can also view live delivery milestones inside our Track Order page.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Cash on Delivery (COD) nationwide, Direct Bank Transfers (HBL, Meezan, Bank Alfalah), Visa and MasterCard credit/debit cards, as well as JazzCash and EasyPaisa mobile wallets.'
    },
    {
      q: 'Do you offer gift wrapping?',
      a: 'Yes! Complimentary signature luxury gift packaging with embossed gold seals and personalized gift cards can be selected during checkout at no extra cost.'
    }
  ];

  return (
    <div className="bg-[#F8F6EF] text-[#173B3D] min-h-screen">
      
      {/* 1. Hero Header Banner */}
      <section className="relative bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#0B6265] text-white py-14 sm:py-20 overflow-hidden border-b border-[#003F43]/40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#07565A]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#C5A66A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            
            {/* Left Content */}
            <div className="space-y-4 max-w-2xl">
              <nav className="flex items-center gap-2 text-xs font-medium text-[#C5A66A] tracking-wider uppercase">
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Home
                </button>
                <ChevronRight size={13} className="text-[#07565A]" />
                <span className="text-white font-semibold">Contact Us</span>
              </nav>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase text-white leading-tight">
                Contact MEHKAVI
              </h1>

              <p className="text-sm sm:text-base text-[#F1EFE6]/90 leading-relaxed font-normal">
                We're here to help. Get in touch with us for any inquiries, feedback or fragrance consultations.
              </p>
            </div>

            {/* Right Flacon Graphic */}
            <div className="hidden md:flex shrink-0 items-center justify-center">
              <div className="w-36 h-44 rounded-2xl bg-gradient-to-b from-[#07565A] to-[#003F43] p-2 shadow-2xl border border-[#C5A66A]/30 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
                  alt="MEHKAVI Concierge"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Top 3 Info Channel Cards */}
      <section className="py-10 sm:py-12 border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Email Us */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E5DD] shadow-xs flex items-start gap-4 hover:border-[#003F43] transition group">
              <div className="w-12 h-12 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#173B3D]">Email Us</h3>
                <a 
                  href="mailto:support@mehkavi.com" 
                  className="block text-xs font-semibold text-[#003F43] hover:underline mt-1"
                >
                  support@mehkavi.com
                </a>
                <p className="text-[11px] text-[#647577] mt-0.5">We'll respond within 24 hours</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E5DD] shadow-xs flex items-start gap-4 hover:border-[#003F43] transition group">
              <div className="w-12 h-12 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#173B3D]">Call Us</h3>
                <a 
                  href="tel:+923001234567" 
                  className="block text-xs font-semibold text-[#003F43] hover:underline mt-1"
                >
                  +92 300 1234567
                </a>
                <p className="text-[11px] text-[#647577] mt-0.5">Mon - Sat, 10AM - 7PM</p>
              </div>
            </div>

            {/* Our Location */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E5DD] shadow-xs flex items-start gap-4 hover:border-[#003F43] transition group">
              <div className="w-12 h-12 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-[#173B3D]">Our Atelier Location</h3>
                <p className="text-xs font-semibold text-[#173B3D] mt-1">
                  Bahadurabad, Karachi, Pakistan
                </p>
                <p className="text-[11px] text-[#647577] mt-0.5">(Nationwide Fulfillment)</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Send Us a Message Form & Right Sidebar */}
      <section className="py-14 sm:py-20 border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Form: Send Us a Message */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E4E5DD] shadow-xl">
              
              <div className="mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D]">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-[#647577] mt-1">
                  Fill out the form below and our perfume specialists will get back to you promptly.
                </p>
              </div>

              {submittedInquiryId ? (
                <div className="bg-[#F8F6EF] border border-[#C5A66A] rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={32} />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173B3D]">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-xs text-[#647577] mt-1.5">
                      Your inquiry ticket has been registered. Our concierge team will review and reply within 24 hours.
                    </p>
                  </div>

                  <div className="inline-block bg-white px-4 py-2 rounded-lg border border-[#E4E5DD] text-xs font-mono font-bold text-[#003F43]">
                    Ticket ID: {submittedInquiryId}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedInquiryId(null)}
                      className="bg-[#003F43] hover:bg-[#07565A] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition"
                    >
                      Submit Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className={`w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border ${
                          formErrors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#E4E5DD] focus:border-[#003F43]'
                        } focus:bg-white focus:outline-none transition`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email address"
                        className={`w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border ${
                          formErrors.email ? 'border-red-400 focus:border-red-500' : 'border-[#E4E5DD] focus:border-[#003F43]'
                        } focus:bg-white focus:outline-none transition`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                        Phone Number <span className="text-[#647577] font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border border-[#E4E5DD] focus:border-[#003F43] focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                        Inquiry Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border ${
                          formErrors.subject ? 'border-red-400 focus:border-red-500' : 'border-[#E4E5DD] focus:border-[#003F43]'
                        } focus:bg-white focus:outline-none transition`}
                      >
                        <option value="">Select subject</option>
                        <option value="Fragrance Recommendation">Fragrance Recommendation</option>
                        <option value="Track Existing Order">Track Existing Order</option>
                        <option value="15-Day Exchange Request">15-Day Exchange Request</option>
                        <option value="Bulk / Wedding Favors">Bulk / Wedding Favors</option>
                        <option value="General Question">General Question</option>
                      </select>
                      {formErrors.subject && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Inquiry Type */}
                  <div>
                    <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                      Inquiry Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border border-[#E4E5DD] focus:border-[#003F43] focus:bg-white focus:outline-none transition"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Delivery Issue">Delivery Issue</option>
                      <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#173B3D] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className={`w-full bg-[#F8F6EF] text-xs text-[#173B3D] px-4 py-3 rounded-xl border ${
                        formErrors.message ? 'border-red-400 focus:border-red-500' : 'border-[#E4E5DD] focus:border-[#003F43]'
                      } focus:bg-white focus:outline-none transition resize-none`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#003F43] hover:bg-[#07565A] text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 shadow-md disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Right Sidebar: "Have a Question?" Card */}
            <div className="lg:col-span-5 bg-[#003F43] text-white p-6 sm:p-8 rounded-3xl border border-[#07565A] shadow-2xl space-y-6">
              
              {/* Top Image: Flacon with jasmine flowers */}
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-[#003F43] relative">
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
                  alt="MEHKAVI Concierge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003F43] via-transparent to-transparent" />
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                  Have a Question?
                </h3>
                <p className="text-xs text-[#F1EFE6]/80 mt-1 leading-relaxed">
                  Our customer support team is always ready to assist you. Reach out to us through any of the methods below.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-4 pt-2 border-t border-[#07565A]">
                
                {/* Live Chat */}
                <div 
                  onClick={() => window.open('https://wa.me/923348882358', '_blank')}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#07565A] border border-[#0B6265] hover:border-[#C5A66A] cursor-pointer transition group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#003F43] text-[#C5A66A] group-hover:bg-[#25D366] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white group-hover:text-[#C5A66A] transition">Live Chat</p>
                    <p className="text-[11px] text-[#E4E5DD]/80">Available on website & WhatsApp</p>
                  </div>
                  <ExternalLink size={14} className="text-[#E4E5DD]/70 group-hover:text-white" />
                </div>

                {/* Email Support */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#07565A] border border-[#0B6265]">
                  <div className="w-10 h-10 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Email Support</p>
                    <a href="mailto:support@mehkavi.com" className="text-[11px] text-[#E4E5DD]/80 hover:text-[#C5A66A]">
                      support@mehkavi.com
                    </a>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#07565A] border border-[#0B6265]">
                  <div className="w-10 h-10 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Phone Support</p>
                    <a href="tel:+923001234567" className="text-[11px] text-[#E4E5DD]/80 hover:text-[#C5A66A]">
                      +92 300 1234567
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#07565A] border border-[#0B6265]">
                  <div className="w-10 h-10 rounded-full bg-[#003F43] text-[#C5A66A] flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Business Hours</p>
                    <p className="text-[11px] text-[#E4E5DD]/80">
                      Mon - Sat, 10AM - 7PM <br />
                      <span className="text-[10px] text-[#E4E5DD]/60">(Excluding Public Holidays)</span>
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E4E5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#C5A66A] uppercase">
                Got Questions?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#173B3D] mt-1">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#647577] mt-1">
                Find quick answers to common questions about our products, shipping, orders and more.
              </p>
            </div>

            <button
              onClick={() => onNavigate('faq')}
              className="self-start sm:self-auto bg-[#003F43] hover:bg-[#07565A] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition"
            >
              View All FAQs
            </button>
          </div>

          {/* 2-Column Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl p-5 transition-all duration-200 ${
                    isOpen 
                      ? 'bg-[#F8F6EF] border-[#003F43] shadow-xs' 
                      : 'bg-white border-[#E4E5DD] hover:border-[#003F43]/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-3 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#173B3D]">
                      {faq.q}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#003F43] text-white' : 'bg-[#F1EFE6] text-[#003F43]'
                    }`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-[#E4E5DD] text-xs text-[#647577] leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. "We'd Love to Hear From You" Bottom Banner */}
      <section className="py-12 sm:py-16 bg-[#F1EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#003F43] via-[#07565A] to-[#003F43] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl border border-[#07565A]">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                We'd Love to Hear From You
              </h2>
              <p className="text-xs sm:text-sm text-[#F1EFE6]/80 leading-relaxed">
                Your feedback helps us grow and improve. Thank you for being a part of MEHKAVI's journey.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-[#C5A66A] hover:bg-[#b5955a] text-[#003F43] font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-md inline-flex items-center gap-1.5"
                >
                  <span>Send a Message</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
