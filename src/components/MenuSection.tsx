import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Flame, 
  Sparkles, 
  Check, 
  Heart, 
  Leaf, 
  Clock, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { CategoryType, MenuItem } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

const CATEGORIES: { id: CategoryType; name: string; telugu: string; icon: string }[] = [
  { id: 'all', name: 'All Dishes', telugu: 'అన్నీ', icon: '🍽️' },
  { id: 'breakfast', name: 'Breakfast', telugu: 'టిఫిన్స్', icon: '🥞' },
  { id: 'meals', name: 'Meals & Rice', telugu: 'భోజనం', icon: '🍛' },
  { id: 'snacks', name: 'Snacks & Bajji', telugu: 'స్నాక్స్', icon: '🥟' },
  { id: 'beverages', name: 'Coffee & Drinks', telugu: 'కాఫీ & టీ', icon: '☕' }
];

export const MenuSection: React.FC = () => {
  const { menu, cart, addToCart, updateCartQuantity, setIsCartOpen } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'bestsellers' | 'jain' | 'vegan'>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [modalGheeAddon, setModalGheeAddon] = useState(false);
  const [modalNotes, setModalNotes] = useState('');

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return menu.filter(item => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesTelugu = item.teluguName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTelugu && !matchesDesc && !matchesTag) {
          return false;
        }
      }
      // Diet / Special filter
      if (dietFilter === 'bestsellers' && !item.isBestseller) return false;
      if (dietFilter === 'jain' && !item.isJainFriendly) return false;
      if (dietFilter === 'vegan' && !item.isVegan) return false;

      return true;
    });
  }, [menu, activeCategory, searchQuery, dietFilter]);

  // Check if item is in cart
  const getItemCartQuantity = (itemId: string) => {
    const found = cart.filter(ci => ci.menuItem.id === itemId);
    return found.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleOpenCustomize = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setModalGheeAddon(false);
    setModalNotes('');
  };

  const handleConfirmAddModal = () => {
    if (selectedItemForModal) {
      addToCart(selectedItemForModal, 1, modalNotes, modalGheeAddon);
      setSelectedItemForModal(null);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-[#FCF9F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <span>సంప్రదాయ రుచులు • Pure Vegetarian Menu</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#1B4332] tracking-tight">
            Our Traditional Menu
          </h2>
          <p className="mt-2 text-stone-600 text-base sm:text-lg">
            Cooked fresh daily with pure country ghee, stone-ground batters, and traditional recipes.
          </p>
        </div>

        {/* Search & Category Filter Navigation */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar & quick filters */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search dosa, idli, thali, coffee, or దోశ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-amber-900/15 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 text-stone-900 text-sm shadow-2xs transition outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick dietary pill tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  dietFilter === 'all'
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietFilter('bestsellers')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                  dietFilter === 'bestsellers'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Bestsellers Only
              </button>
              <button
                onClick={() => setDietFilter('jain')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 cursor-pointer ${
                  dietFilter === 'jain'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Leaf className="w-3 h-3" />
                Jain Friendly
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition cursor-pointer shadow-2xs ${
                    isActive
                      ? 'bg-[#1B4332] text-[#FCF9F2] shadow-md border-b-2 border-[#D4AF37]'
                      : 'bg-white/80 hover:bg-white text-stone-700 border border-amber-900/10'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-xs font-telugu ${isActive ? 'text-amber-300' : 'text-stone-500'}`}>
                    ({cat.telugu})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-stone-300 p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-stone-800">No dishes match your search</h3>
            <p className="text-stone-500 text-sm mt-1">Try clearing your filters or search keywords.</p>
            <button
              onClick={() => { setSearchQuery(''); setDietFilter('all'); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const inCartQty = getItemCartQuantity(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Image & Badges Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Vegetarian Green Badge (Authentic Indian FSSAI Veg Symbol) */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs border border-stone-200" title="100% Pure Vegetarian">
                      <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center p-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                      </div>
                    </div>

                    {/* Bestseller Ribbon */}
                    {item.isBestseller && (
                      <div className="absolute top-3 right-3 bg-[#D4AF37] text-stone-950 font-black text-[10px] tracking-wider px-2 py-0.5 rounded-md shadow-xs uppercase">
                        Bestseller
                      </div>
                    )}

                    {/* Prep time */}
                    <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>{item.prepTimeMinutes} mins</span>
                    </div>

                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
                        Temporarily Sold Out
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Dish Title & Telugu Subtitle */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-base text-[#1B4332] group-hover:text-[#2D6A4F] transition leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs font-telugu text-[#8C3B1E] font-medium mt-0.5">
                            {item.teluguName}
                          </p>
                        </div>
                        
                        {/* Spice Indicator */}
                        {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                          <div className="flex items-center text-red-500 shrink-0" title={`Spice Level: ${item.spicyLevel}/3`}>
                            {Array.from({ length: item.spicyLevel }).map((_, i) => (
                              <Flame key={i} className="w-3.5 h-3.5 fill-red-500" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {item.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-900/10 px-1.5 py-0.5 rounded font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-400 font-medium">Price</span>
                        <div className="text-lg font-black text-[#1B4332]">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Cart Action Buttons */}
                      {inCartQty > 0 ? (
                        <div className="flex items-center bg-[#1B4332] text-white rounded-xl shadow-xs overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.id, inCartQty - 1)}
                            className="p-1.5 hover:bg-[#2D6A4F] transition text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-2 text-xs font-black text-[#FCF9F2] min-w-[20px] text-center">
                            {inCartQty}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, inCartQty + 1)}
                            className="p-1.5 hover:bg-[#2D6A4F] transition text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {/* Customize trigger */}
                          <button
                            onClick={() => handleOpenCustomize(item)}
                            className="text-[11px] text-stone-500 hover:text-stone-800 underline px-1"
                            title="Customize ghee or special requests"
                          >
                            Customize
                          </button>
                          
                          <button
                            onClick={() => addToCart(item, 1)}
                            disabled={!item.isAvailable}
                            className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-300 text-white text-xs font-bold transition flex items-center gap-1 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>ADD</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Customization Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-900/10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-lg text-[#1B4332]">
                  Customize {selectedItemForModal.name}
                </h3>
                <p className="text-xs font-telugu text-[#8C3B1E]">
                  {selectedItemForModal.teluguName}
                </p>
              </div>
              <button 
                onClick={() => setSelectedItemForModal(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={modalGheeAddon}
                    onChange={(e) => setModalGheeAddon(e.target.checked)}
                    className="w-4 h-4 text-[#1B4332] rounded focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-stone-900">Add Extra Pure Country Ghee</div>
                    <div className="text-[11px] text-stone-500 font-telugu">అదనపు నెయ్యి</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#8C3B1E]">+₹15</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Special Kitchen Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, extra sambar, crispier..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none"
                  maxLength={100}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <div className="text-sm font-black text-[#1B4332]">
                Total: ₹{selectedItemForModal.price + (modalGheeAddon ? 15 : 0)}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItemForModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAddModal}
                  className="px-5 py-2 text-xs font-bold bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl shadow-xs"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Bar when items in cart (Mobile friendly) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-30 max-w-md mx-auto sm:hidden">
          <div 
            onClick={() => setIsCartOpen(true)}
            className="bg-[#1B4332] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between cursor-pointer border border-[#D4AF37]/50"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-[#D4AF37] text-stone-900 text-xs font-black px-2 py-0.5 rounded-lg">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
              <div className="text-xs">
                <span className="font-extrabold text-sm">₹{cart.reduce((s, i) => s + (i.menuItem.price * i.quantity), 0)}</span>
                <span className="text-emerald-200 text-[10px] ml-1">plus taxes/delivery</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#D4AF37]">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
