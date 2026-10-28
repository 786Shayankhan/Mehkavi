import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Phone, Sparkles, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToAdmin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onNavigateToAdmin }) => {
  const { login, register } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (tab === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onClose();
          if (email === 'admin@mehkavi.com' && onNavigateToAdmin) {
            onNavigateToAdmin();
          }
        } else {
          setError(res.message);
        }
      } else {
        const res = await register(name, email, phone, password);
        if (res.success) {
          onClose();
        } else {
          setError(res.message);
        }
      }
    } catch {
      setError('An error occurred during authentication. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@mehkavi.com');
    setPassword('admin123');
    setTab('login');
  };

  const fillCustomerCredentials = () => {
    setEmail('customer@example.com');
    setPassword('customer123');
    setTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-md bg-white rounded-md shadow-2xl border border-[#D6E6E8] overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="p-6 bg-[#07262C] text-white flex items-center justify-between border-b border-[#0F3C45]">
            <div>
              <span className="block font-serif text-lg font-bold tracking-[0.2em] uppercase text-[#E2F1F3]">
                MEHKAVI
              </span>
              <span className="text-[10px] tracking-wider text-[#88ADB5] uppercase">
                Customer & Connoisseur Portal
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Demo Credentials Bar for Easy Testing */}
          <div className="bg-[#EEF5F6] p-2.5 px-4 border-b border-[#DCE8EA] flex items-center justify-between text-[11px]">
            <span className="text-[#527076] font-medium flex items-center gap-1">
              <Sparkles size={12} className="text-[#0891B2]" /> Fast Demo Login:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={fillCustomerCredentials}
                className="text-[#0891B2] hover:underline font-semibold"
              >
                Customer
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-[#0A2328] hover:text-[#0891B2] font-bold flex items-center gap-0.5"
              >
                <ShieldCheck size={11} /> Admin
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#DCE8EA] text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-3 transition border-b-2 ${
                tab === 'login' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 py-3 transition border-b-2 ${
                tab === 'register' ? 'border-[#0A3B44] text-[#0A2328]' : 'border-transparent text-[#777] hover:text-black'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-medium">
                {error}
              </div>
            )}

            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#333] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Malik"
                      className="w-full bg-[#FAF8F5] border border-[#D0E2E5] rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0891B2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#333] mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full bg-[#FAF8F5] border border-[#D0E2E5] rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0891B2]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-[#333] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF8F5] border border-[#D0E2E5] rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0891B2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#333] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF8F5] border border-[#D0E2E5] rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#0891B2]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A3B44] hover:bg-[#0891B2] text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition shadow-md disabled:opacity-50"
            >
              {isLoading 
                ? 'Processing...' 
                : tab === 'login' 
                ? 'Sign In to Account' 
                : 'Create My Account'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
