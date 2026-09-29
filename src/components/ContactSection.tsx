import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  MessageCircle, 
  Mail, 
  Car, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const addressText = "Saraswathi Cafe, MBT Road (Madanapalle-Bangalore-Tirupati Road), Palamaner, Chittoor District, Andhra Pradesh 517408, India";
  const googleMapsDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Saraswathi+Cafe+MBT+Road+Palamaner+Andhra+Pradesh";
  const whatsappUrl = "https://wa.me/919440215961?text=Hello%20Saraswathi%20Cafe,%20I%20would%20like%20to%20order/inquire%20about%20your%20menu.";

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FCF9F2] relative border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Location & Hospitality • సంప్రదించండి</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332]">
            Visit Us on MBT Road, Palamaner
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Conveniently situated right off the main highway with spacious parking and quick service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-md space-y-6">
            
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-[#8C3B1E] flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Restaurant Location
                </h3>
                <p className="text-base font-bold text-[#1B4332] mt-0.5 leading-snug">
                  Saraswathi Cafe (సరస్వతి కేఫే)
                </p>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  MBT Road, Near Highway Junction, Palamaner, Andhra Pradesh 517408, India
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>Free dedicated parking lot on-site</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-[#1B4332] flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Operating Hours
                </h3>
                <div className="text-base font-extrabold text-[#1B4332] mt-0.5">
                  6:00 AM – 11:00 PM
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Open All 7 Days (Including Festival Holidays & Sundays)
                </p>
                <div className="text-[11px] text-[#8C3B1E] mt-1 font-medium">
                  • Breakfast: 6:00 AM – 11:30 AM <br />
                  • Thali Meals: 12:00 PM – 4:00 PM <br />
                  • Evening Snacks & Dinner: 4:30 PM – 11:00 PM
                </div>
              </div>
            </div>

            {/* Telephone & Direct Order */}
            <div className="flex items-start gap-4 pt-4 border-t border-stone-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-[#8C3B1E] flex items-center justify-center shrink-0 shadow-2xs">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Phone & Kitchen Desk
                </h3>
                <a 
                  href="tel:09440215961"
                  className="text-lg font-black text-[#1B4332] hover:text-[#2D6A4F] hover:underline block mt-0.5"
                >
                  09440215961
                </a>
                <p className="text-xs text-stone-500">
                  Call for advance highway parcel orders, table bookings, or bulk catering inquiries.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:09440215961"
                  className="py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp (+91 9440215961)</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Maps Embed Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 shadow-md border border-amber-900/10 overflow-hidden">
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-stone-200">
              {/* Responsive Google Maps iFrame centering Palamaner MBT Road */}
              <iframe
                title="Saraswathi Cafe Location on MBT Road Palamaner"
                src="https://maps.google.com/maps?q=Palamaner%2C%20MBT%20Road%2C%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-amber-900/10 flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                  స
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1B4332]">Saraswathi Cafe</div>
                  <div className="text-[11px] text-stone-500 font-medium">MBT Road, Palamaner</div>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#8C3B1E] font-bold hover:underline flex items-center gap-0.5 mt-0.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-3 text-center text-xs text-stone-500">
              📍 Landmark: Easily accessible on the Bangalore-Chittoor-Tirupati highway stretch.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
