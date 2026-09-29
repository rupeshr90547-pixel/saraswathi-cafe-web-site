import React from 'react';
import { 
  ArrowRight, 
  UtensilsCrossed, 
  Coffee, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award,
  ChevronDown
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenLoyalty: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenLoyalty }) => {
  const { setIsCartOpen } = useRestaurant();

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FCF9F2] via-[#F8F3E6] to-[#FCF9F2]">
      {/* Decorative Traditional Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B4332]/8 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-800/20 text-[#1B4332] text-xs sm:text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse"></span>
              <span>100% PURE VEGETARIAN • పవిత్ర శాకాహారం</span>
              <span className="text-[#8C3B1E]">• Palamaner</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-[#D4AF37] text-2xl font-serif">✦</span>
                <span className="text-sm font-bold tracking-widest uppercase text-[#8C3B1E]">
                  A Warm Tradition Since Years
                </span>
                <span className="text-[#D4AF37] text-2xl font-serif">✦</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B4332] tracking-tight leading-[1.12]">
                Saraswathi Cafe <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-telugu text-[#8C3B1E] font-semibold block mt-1">
                  సరస్వతి కేఫే
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-stone-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <span className="italic font-serif text-[#1B4332] font-semibold">“Authentic South Indian Taste at Affordable Prices”</span>
              <br />
              <span className="text-base text-stone-600 font-normal">
                Crispy golden ghee roast dosas, pillow-soft thatte idlis with gun powder, royal South Indian thali meals, and freshly frothed Kumbakonam degree filter coffee on MBT Road, Palamaner.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-[#FCF9F2] font-bold text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <UtensilsCrossed className="w-5 h-5 text-[#D4AF37]" />
                <span>View Menu (మెనూ)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onExploreMenu();
                  setTimeout(() => {
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-stone-900 font-extrabold text-base shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Order Online Now</span>
                <span className="text-xs bg-amber-900/10 px-2 py-0.5 rounded-md font-semibold">₹20 - ₹150</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-900/10 text-left">
              <div className="p-3 bg-white/70 rounded-xl border border-amber-900/5 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Highway Stop</div>
                <div className="text-sm font-bold text-[#1B4332]">Free Parking</div>
                <div className="text-[11px] text-[#40916C]">Spacious for cars</div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-amber-900/5 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Ratings</div>
                <div className="text-sm font-bold text-[#8C3B1E] flex items-center gap-1">
                  <span>3.7 ⭐</span>
                  <span className="text-[11px] text-stone-500 font-normal">(1800+)</span>
                </div>
                <div className="text-[11px] text-stone-600">Loved by Travelers</div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-amber-900/5 shadow-2xs">
                <div className="text-xs text-stone-500 font-medium">Pocket Friendly</div>
                <div className="text-sm font-bold text-[#1B4332]">₹20 – ₹150</div>
                <div className="text-[11px] text-[#40916C]">Top quality & value</div>
              </div>

              <div 
                onClick={onOpenLoyalty} 
                className="p-3 bg-amber-50/90 rounded-xl border border-[#D4AF37]/40 shadow-2xs cursor-pointer hover:bg-amber-100 transition"
              >
                <div className="text-xs text-[#8C3B1E] font-medium flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#D4AF37]" />
                  <span>Swarna Club</span>
                </div>
                <div className="text-sm font-bold text-amber-900">10% Points</div>
                <div className="text-[11px] text-amber-800 font-medium">Redeem for meals</div>
              </div>
            </div>

          </div>

          {/* Right Visual Presentation Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative bg-white rounded-3xl p-3 shadow-2xl border-2 border-[#D4AF37]/30 transform lg:rotate-1 hover:rotate-0 transition duration-500">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900">
                  <img 
                    src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80" 
                    alt="Authentic Ghee Roast Masala Dosa" 
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Badge on Main Card */}
                  <div className="absolute top-3 left-3 bg-[#1B4332]/90 backdrop-blur-md text-[#FCF9F2] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D4AF37]/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Crispy Ghee Roast Special</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-bold font-serif-heading leading-tight">
                          Ghee Roast Masala Dosa
                        </h2>
                        <p className="text-xs text-amber-200 font-telugu">
                          నెయ్యి రోస్ట్ మసాలా దోశ • ₹75
                        </p>
                      </div>
                      <span className="bg-[#D4AF37] text-stone-950 font-black text-xs px-2.5 py-1 rounded-lg">
                        HOT SELLER
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-cards Row */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  
                  {/* Degree Filter Coffee Card */}
                  <div className="bg-[#FCF9F2] rounded-xl p-2.5 border border-amber-900/10 flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80" 
                      alt="Kumbakonam Filter Coffee" 
                      className="w-14 h-14 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#1B4332] leading-tight">Filter Coffee</div>
                      <div className="text-[11px] text-amber-900 font-telugu">డిగ్రీ కాఫీ</div>
                      <div className="text-xs font-extrabold text-[#8C3B1E]">₹25</div>
                    </div>
                  </div>

                  {/* Thatte Idli Card */}
                  <div className="bg-[#FCF9F2] rounded-xl p-2.5 border border-amber-900/10 flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80" 
                      alt="Thatte Idli" 
                      className="w-14 h-14 rounded-lg object-cover shadow-2xs"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#1B4332] leading-tight">Thatte Idli</div>
                      <div className="text-[11px] text-amber-900 font-telugu">తట్టె ఇడ్లీ పొడి</div>
                      <div className="text-xs font-extrabold text-[#8C3B1E]">₹50</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-amber-900/10 items-center gap-3 max-w-xs z-20">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                  <Coffee className="w-5 h-5 text-[#1B4332]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-stone-900">
                    <span>Authentic Highway Halt</span>
                    <span className="text-[#D4AF37]">★★★★☆</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    "Best filter coffee and hot sambar between Bangalore & Tirupati!"
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
