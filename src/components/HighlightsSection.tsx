import React from 'react';
import { 
  Coffee, 
  Car, 
  Users, 
  Sparkles, 
  Leaf, 
  SunMedium, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export const HighlightsSection: React.FC = () => {
  const highlights = [
    {
      icon: <Coffee className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Legendary Kumbakonam Degree Coffee',
      telugu: 'డిగ్రీ ఫిల్టర్ కాఫీ',
      description: 'Slow-dripped decoction blended with full-cream milk, aerated vigorously to create that thick, aromatic froth. Served in brass davarah tumblers.',
      tag: 'Customer Favourite'
    },
    {
      icon: <Car className="w-6 h-6 text-[#1B4332]" />,
      title: 'Free Spacious Highway Parking',
      telugu: 'ఉచిత విశాలమైన పార్కింగ్',
      description: 'Zero parking stress on MBT Road. Wide dedicated parking bays for cars, SUVs, and tour buses with security watch.',
      tag: 'Highway Essential'
    },
    {
      icon: <SunMedium className="w-6 h-6 text-[#8C3B1E]" />,
      title: 'All-Day Dining: Breakfast, Lunch & Dinner',
      telugu: 'ఉదయం నుండి రాత్రి వరకు',
      description: 'From 6:00 AM steaming thatte idlis to afternoon grand thalis and evening crispy bajjis until 11:00 PM.',
      tag: '6 AM – 11 PM'
    },
    {
      icon: <Users className="w-6 h-6 text-[#1B4332]" />,
      title: 'Family-Friendly AC Dining Section',
      telugu: 'కుటుంబాలకు అనువైన ఏసీ హాల్',
      description: 'Comfortable seating with high chairs for kids, clean restrooms, and hygienic dining tables for families and groups.',
      tag: 'AC Seating'
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: '100% Shuddha Vegetarian & Jain Friendly',
      telugu: 'పవిత్ర శాఖాహారం & జైన్ ఫుడ్',
      description: 'Strict vegetarian protocols. Special no-onion, no-garlic Jain items prepared with utmost purity upon request.',
      tag: 'Pure Veg Standard'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      title: 'Saraswathi Swarna Club Rewards',
      telugu: 'స్వర్ణ పాయింట్ల లాయల్టీ',
      description: 'Earn 10% points on every single meal. Redeem for instant bill discounts or free filter coffee on your next visit.',
      tag: '10% Cashback'
    }
  ];

  return (
    <section id="highlights" className="py-16 sm:py-20 bg-[#FCF9F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <span>The Saraswathi Experience • ప్రత్యేకతలు</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332]">
            Why Travelers & Locals Choose Us
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Engineered for great taste, wholesome purity, and highway travel convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {h.icon}
                  </div>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                    {h.tag}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#1B4332] leading-snug">
                  {h.title}
                </h3>
                <p className="text-xs font-telugu text-[#8C3B1E] font-medium mt-0.5">
                  {h.telugu}
                </p>

                <p className="text-xs text-stone-500 mt-2.5 leading-relaxed">
                  {h.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1 text-[11px] text-[#2D6A4F] font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Standard at Palamaner branch</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
