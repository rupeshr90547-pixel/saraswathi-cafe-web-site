import React from 'react';
import { Leaf, Clock, Utensils, Award, Heart, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F3E6] border-y border-amber-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic South Indian Meal Spread"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Overlapping Secondary Photo */}
              <div className="absolute -bottom-8 -right-6 w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
                  alt="Frothy Filter Coffee"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pill badge */}
              <div className="absolute -top-4 -left-4 bg-[#1B4332] text-[#D4AF37] px-4 py-2 rounded-2xl shadow-lg border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>100% Shuddha Vegetarian</span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
              <span>Our Heritage & Values • మా కథ</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B4332] leading-tight">
              Rooted in Tradition, <br />
              <span className="text-[#8C3B1E]">Served with Warmth in Palamaner</span>
            </h2>

            <p className="text-stone-700 text-base leading-relaxed">
              Situated right on the bustling <strong>MBT Road in Palamaner, Andhra Pradesh</strong>, Saraswathi Cafe was born with a simple conviction: authentic South Indian cuisine should be pure, wholesome, and accessible to everyone.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you are an early-morning commuter seeking crispy <em>Ghee Roast Dosa</em> with stone-ground coconut chutney, a family pausing for an elaborate <em>Special Thali</em> with rasam and payasam, or a weary traveler craving an energizing tumbler of <em>Kumbakonam Degree Filter Coffee</em>, our kitchen serves with devotion and lightning-fast speed.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B4332]">Pure Vegetarian & Fresh Ghee</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    No artificial colors or preservatives. Made with authentic country ghee and fragrant spices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B4332]">Honest Pocket-Friendly Pricing</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Dishes starting from ₹20 up to ₹150 for our 12-item royal meal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B4332]">Speedy Highway Service</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Crispy hot orders served in under 8-10 minutes, perfect for bus and car commuters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B4332]">Dine-In, Takeaway & Delivery</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Air-conditioned family dining hall, quick parcel counter, and swift online town delivery.
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
