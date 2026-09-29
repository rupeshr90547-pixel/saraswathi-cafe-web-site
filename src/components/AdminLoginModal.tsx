import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound, AlertCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const AdminLoginModal: React.FC<{ onSuccessfulLogin: () => void }> = ({ onSuccessfulLogin }) => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, adminLogin } = useRestaurant();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setIsAdminLoginModalOpen(false);
      setPassword('');
      setError('');
      onSuccessfulLogin();
    } else {
      setError('Invalid admin password. (Hint: use "admin123")');
    }
  };

  const handleQuickDemoFill = () => {
    setPassword('admin123');
    const success = adminLogin('admin123');
    if (success) {
      setIsAdminLoginModalOpen(false);
      onSuccessfulLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FCF9F2] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-amber-900/15 space-y-5 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1B4332]">Restaurant Staff Portal</h3>
              <p className="text-[10px] text-stone-500 font-telugu">నిర్వాహక లాగిన్</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Admin / Manager Passcode
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                placeholder="Enter passcode..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-300 focus:border-[#2D6A4F] outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-[#FCF9F2] font-bold text-xs rounded-xl shadow-xs transition"
          >
            Authenticate & Open Dashboard
          </button>

          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl border border-amber-300/80 transition flex items-center justify-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>1-Click Demo Login (admin123)</span>
          </button>
        </form>

        <p className="text-[11px] text-stone-500 text-center">
          Manage kitchen tickets, update dish pricing, and track live customer orders.
        </p>

      </div>
    </div>
  );
};
