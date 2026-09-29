import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/initialData';

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#FCF9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Visual Feast • చిత్రమాలిక</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332]">
            Ambience & Culinary Art
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Glimpses of freshly roasted dosas, traditional brass filter coffee, and welcoming dining hall in Palamaner.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-md cursor-pointer border border-amber-900/10"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition"></div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-base leading-tight">
                  {img.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-amber-300 font-telugu">
                    {img.teluguTitle}
                  </p>
                  <span className="text-[11px] text-stone-300">
                    {img.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 p-2 text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Close</span>
              <X className="w-6 h-6" />
            </button>

            <img
              src={GALLERY_IMAGES[activeImageIndex].url}
              alt={GALLERY_IMAGES[activeImageIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold font-serif-heading">
                {GALLERY_IMAGES[activeImageIndex].title}
              </h3>
              <p className="text-sm text-amber-300 font-telugu mt-0.5">
                {GALLERY_IMAGES[activeImageIndex].teluguTitle} • {GALLERY_IMAGES[activeImageIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
