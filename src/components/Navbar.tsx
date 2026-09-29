import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Menu as MenuIcon, 
  X,
  Sparkles,
  Search
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  currentView: 'home' | 'admin';
  setCurrentView: (view: 'home' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, setCurrentView }) => {
  const { 
    cartItemsCount, 
    setIsCartOpen, 
    currentLoyaltyUser, 
    setIsLoyaltyModalOpen, 
    activeOrderToTrack, 
    setIsOrderTrackerOpen,
    isAdmin,
    setIsAdminLoginModalOpen,
    adminLogout
  } = useRestaurant();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        onNavigate(sectionId);
      }, 50);
    } else {
      onNavigate(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner with Location & Hours */}
      <div className="bg-[#1B4332] text-amber-100 text-xs py-1.5 px-4 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-200">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">MBT Road, Palamaner, AP</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>6:00 AM – 11:00 PM (Pure Veg)</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-amber-500/20">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Free Highway Parking Available</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-xs ml-auto">
            <a 
              href="tel:09440215961" 
              className="flex items-center gap-1 text-white hover:text-[#D4AF37] transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>09440215961</span>
            </a>

            <span className="text-emerald-700">|</span>

            {/* Admin Switcher */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                  className="bg-[#D4AF37] text-slate-900 hover:bg-amber-400 px-2.5 py-0.5 rounded font-bold transition flex items-center gap-1 text-[11px]"
                >
                  <ShieldCheck className="w-3 h-3" />
                  {currentView === 'admin' ? 'Exit Admin' : 'Admin Portal'}
                </button>
                <button
                  onClick={adminLogout}
                  className="text-amber-300 hover:text-white text-[11px] underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="text-emerald-200 hover:text-[#D4AF37] text-[11px] flex items-center gap-1 transition"
                title="Restaurant Staff & Admin Login"
              >
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Staff Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FCF9F2]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-[#D4AF37] flex items-center justify-center shadow-md border border-[#D4AF37]/40 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif font-black text-2xl tracking-tighter">స</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <h1 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-[#1B4332] tracking-tight group-hover:text-[#2D6A4F] transition">
                  Saraswathi Cafe
                </h1>
                <span className="text-[13px] font-telugu text-[#8C3B1E] font-semibold hidden sm:inline">
                  సరస్వతి కేఫే
                </span>
              </div>
              <p className="text-[11px] text-[#40916C] font-medium tracking-wide uppercase">
                Authentic South Indian • Pure Veg
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-stone-700">
            <button 
              onClick={() => handleNavClick('menu')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Menu <span className="text-xs text-[#8C3B1E] font-telugu">మెనూ</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Our Story
            </button>
            <button 
              onClick={() => handleNavClick('highlights')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Highlights
            </button>
            <button 
              onClick={() => handleNavClick('reviews')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Reviews <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold ml-0.5">3.7★</span>
            </button>
            <button 
              onClick={() => handleNavClick('gallery')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="hover:text-[#1B4332] transition hover:-translate-y-0.5 relative py-1"
            >
              Location & Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Order Tracker Trigger */}
            <button
              onClick={() => setIsOrderTrackerOpen(true)}
              className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
                activeOrderToTrack
                  ? 'bg-amber-500/15 text-amber-900 border border-amber-500/40 hover:bg-amber-500/25 animate-pulse'
                  : 'text-stone-700 hover:bg-amber-100/60 border border-stone-200'
              }`}
              title="Track your order status live"
            >
              <Compass className={`w-4 h-4 ${activeOrderToTrack ? 'text-amber-700 animate-spin' : 'text-stone-600'}`} />
              <span className="hidden sm:inline">
                {activeOrderToTrack ? `Track: ${activeOrderToTrack.orderNumber}` : 'Track Order'}
              </span>
              <span className="sm:hidden">Track</span>
              {activeOrderToTrack && (
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping absolute -top-0.5 -right-0.5"></span>
              )}
            </button>

            {/* Customer Loyalty Program Button */}
            <button
              onClick={() => setIsLoyaltyModalOpen(true)}
              className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-[#D4AF37]/50 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition shadow-2xs"
            >
              <Award className="w-4 h-4 text-[#B8860B]" />
              <div className="text-left leading-tight hidden sm:block">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C3B1E]">
                  <span>Swarna Club</span>
                  <span className="text-[10px] bg-[#D4AF37]/30 text-amber-950 px-1 rounded">
                    {currentLoyaltyUser ? currentLoyaltyUser.tier : 'Join'}
                  </span>
                </div>
                <div className="text-xs text-stone-700">
                  {currentLoyaltyUser ? `${currentLoyaltyUser.pointsBalance} pts (₹${currentLoyaltyUser.pointsBalance * 0.5})` : 'Earn Points'}
                </div>
              </div>
              <span className="sm:hidden font-bold text-amber-900">
                {currentLoyaltyUser ? `${currentLoyaltyUser.pointsBalance}p` : 'Points'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#D4AF37] text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-amber-100/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FCF9F2] border-t border-amber-900/10 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-amber-900/10">
              <button 
                onClick={() => handleNavClick('menu')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                🍱 Full Menu (మెనూ)
              </button>
              <button 
                onClick={() => handleNavClick('about')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                🌿 About Cafe
              </button>
              <button 
                onClick={() => handleNavClick('highlights')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                ⭐ Highlights
              </button>
              <button 
                onClick={() => handleNavClick('reviews')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                💬 Reviews (3.7★)
              </button>
              <button 
                onClick={() => handleNavClick('gallery')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                📸 Photo Gallery
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="text-left px-3 py-2 rounded-lg text-stone-800 font-medium hover:bg-amber-100"
              >
                📍 Directions & Hours
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setIsOrderTrackerOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 bg-amber-100 text-amber-900 py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-amber-700" />
                Live Order Tracker
              </button>
              <button
                onClick={() => { setIsLoyaltyModalOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 bg-[#1B4332] text-amber-200 py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Swarna Points Club
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
