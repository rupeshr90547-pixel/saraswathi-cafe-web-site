import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  AlertTriangle, 
  MessageSquare, 
  Plus, 
  CheckCircle, 
  Award,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, currentLoyaltyUser } = useRestaurant();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newPros, setNewPros] = useState('');
  const [newDish, setNewDish] = useState('');

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    addReview({
      author: newAuthor,
      location: newLocation || 'Verified Diner',
      rating: newRating,
      comment: newComment,
      pros: newPros ? newPros.split(',').map(s => s.trim()) : ['Tasty food', 'Courteous staff'],
      recommendedDish: newDish || 'Ghee Roast Dosa',
      source: 'Direct Customer',
      verifiedCustomer: true
    });

    setIsModalOpen(false);
    setNewAuthor('');
    setNewComment('');
    setNewPros('');
    setNewDish('');
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#F8F3E6] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Customer Feedback • సమీక్షలు</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#1B4332]">
            Real Stories from Highway Travelers & Locals
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Honest dining experiences from thousands who stop by MBT Road Palamaner every month.
          </p>
        </div>

        {/* Rating Breakdown & Honest Sentiment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Overall Score Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Overall Google & Diner Rating
              </div>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-serif-heading font-black text-5xl text-[#1B4332]">
                  3.7
                </span>
                <div>
                  <div className="flex text-amber-400">
                    {[1, 2, 3].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                    <Star className="w-5 h-5 fill-amber-400/70" />
                    <Star className="w-5 h-5 text-stone-300" />
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    Based on 1,842+ Google & Customer Reviews
                  </span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-1.5 mt-5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-12 text-stone-500">5 Star</span>
                  <div className="flex-1 bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[55%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">55%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-stone-500">4 Star</span>
                  <div className="flex-1 bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[22%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">22%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-stone-500">3 Star</span>
                  <div className="flex-1 bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[12%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-stone-500">1-2 Star</span>
                  <div className="flex-1 bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full w-[11%]"></div>
                  </div>
                  <span className="w-8 text-right font-medium">11%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Write a Review (+20 Swarna Pts)</span>
            </button>
          </div>

          {/* Transparent Honest Sentiment Summary */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Positive Aspects */}
            <div className="bg-emerald-50/80 rounded-3xl p-6 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <ThumbsUp className="w-4 h-4 text-emerald-700" />
                <span>What Diners Love Most (85%+ praise)</span>
              </div>
              
              <ul className="space-y-2 text-xs text-emerald-950">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Crispy Ghee Roast Dosa:</strong> Thin, buttery crust with authentic potato sagu and hot sambar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Kumbakonam Degree Coffee:</strong> Thick decoction with brass tumbler aroma.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Spacious Free Car Parking:</strong> Easy halt directly on MBT Road without highway bottleneck.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Quick Counter Service:</strong> Fresh hot breakfast served in 5-8 minutes.</span>
                </li>
              </ul>
            </div>

            {/* Honest Areas We Actively Address */}
            <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Transparent Feedback We're Improving</span>
              </div>

              <ul className="space-y-2 text-xs text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span><strong>Weekend Peak Rush:</strong> Sunday mornings (8:30-10 AM) can experience 10-minute wait times during Bangalore-Tirupati rush.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span><strong>Evening Snack Consistency:</strong> Fresh batches of Mysore Bonda are fried every 20 minutes to maintain crispness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span><strong>Restroom Upkeep:</strong> Dedicated cleaning staff now stationed during all highway travel hours.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Sliding Testimonials Cards Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(currentIndex, currentIndex + 3).concat(
                reviews.length < currentIndex + 3 ? reviews.slice(0, (currentIndex + 3) % reviews.length) : []
              ).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>

                    <p className="text-xs text-stone-700 italic leading-relaxed">
                      "{rev.comment}"
                    </p>

                    {rev.teluguComment && (
                      <p className="text-xs font-telugu text-[#8C3B1E] bg-amber-50/60 p-2 rounded-xl">
                        {rev.teluguComment}
                      </p>
                    )}

                    {rev.recommendedDish && (
                      <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <span>Recommends:</span>
                        <span className="text-[#1B4332] underline">{rev.recommendedDish}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#1B4332] flex items-center gap-1">
                        <span>{rev.author}</span>
                        {rev.verifiedCustomer && (
                          <span title="Verified Customer">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400">{rev.location}</div>
                    </div>

                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                      {rev.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 shadow-2xs transition"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-stone-500">
              {currentIndex + 1} of {reviews.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 shadow-2xs transition"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="font-bold text-lg text-[#1B4332]">Share Your Review</h3>
                <p className="text-xs text-amber-800 font-medium">
                  {currentLoyaltyUser ? 'Earn +20 Swarna Points for your feedback!' : 'Help other travelers on MBT Road'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Madhavan Rao"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Traveler or Local?</label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore traveler / Palamaner local"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the dosa, sambar, coffee, parking or staff service..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favourite Dish</label>
                <input
                  type="text"
                  placeholder="e.g. Ghee Roast Masala Dosa & Degree Filter Coffee"
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
