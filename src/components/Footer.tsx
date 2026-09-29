import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Heart, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Share2, 
  ArrowUp,
  Award
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const { setIsLoyaltyModalOpen, setIsOrderTrackerOpen } = useRestaurant();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#11291F] text-amber-100 border-t-4 border-[#D4AF37] relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-stone-950 font-black flex items-center justify-center text-2xl shadow-md">
                స
              </div>
              <div>
                <h3 className="font-serif-heading font-extrabold text-xl text-white">
                  Saraswathi Cafe
                </h3>
                <p className="text-xs font-telugu text-[#D4AF37]">
                  సరస్వతి కేఫే • పలమనేరు
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Authentic South Indian vegetarian haven on MBT Road, Palamaner. Known for crispy ghee roast dosas, steamed thatte idlis, rich filter coffee, and warm highway hospitality.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-bold bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full">
                100% Pure Vegetarian
              </span>
              <span className="text-xs font-bold bg-emerald-800/60 text-emerald-200 px-3 py-1 rounded-full">
                Free Parking
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button 
                  onClick={() => onNavigate('menu')} 
                  className="hover:text-white hover:underline transition"
                >
                  Full Menu & Prices (మెనూ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white hover:underline transition"
                >
                  About Our Kitchen & Heritage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsLoyaltyModalOpen(true)} 
                  className="hover:text-white hover:underline transition flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Saraswathi Swarna Points (10% Rewards)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsOrderTrackerOpen(true)} 
                  className="hover:text-white hover:underline transition"
                >
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reviews')} 
                  className="hover:text-white hover:underline transition"
                >
                  Customer Reviews (3.7★ / 1800+ reviews)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white hover:underline transition"
                >
                  Google Maps Location & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Dishes */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider">
              Bestsellers
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              <li>• Ghee Roast Masala Dosa (₹75)</li>
              <li>• Thatte Idli with Podi (₹50)</li>
              <li>• Saraswathi Special Thali (₹150)</li>
              <li>• Degree Filter Coffee (₹25)</li>
              <li>• Mysore Bonda (₹40)</li>
              <li>• Andhra Pesarattu Upma (₹80)</li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>MBT Road, Palamaner, Andhra Pradesh 517408, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:09440215961" className="hover:text-white font-bold">
                  09440215961
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>6:00 AM – 11:00 PM (Daily)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919440215961"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-[#25D366] text-white flex items-center justify-center transition"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Saraswathi+Cafe+MBT+Road+Palamaner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-[#D4AF37] hover:text-stone-900 text-white flex items-center justify-center transition"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white flex items-center justify-center transition ml-auto"
                title="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/70 gap-3">
          <p>© {new Date().getFullYear()} Saraswathi Cafe (సరస్వతి కేఫే). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>for South Indian food lovers on MBT Road, Palamaner</span>
          </p>
        </div>

      </div>

      {/* Floating WhatsApp Action Button (Mobile & Desktop) */}
      <a
        href="https://wa.me/919440215961?text=Hello%20Saraswathi%20Cafe,%20I%20would%20like%20to%20order/inquire."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center border-2 border-white transform hover:scale-110 transition duration-300"
        title="Chat on WhatsApp (+91 9440215961)"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="w-3 h-3 rounded-full bg-amber-400 absolute top-0 right-0 border-2 border-white animate-ping"></span>
      </a>
    </footer>
  );
};
