import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Gift, 
  History, 
  Coffee, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  User, 
  HelpCircle,
  Zap,
  Tag
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LoyaltyModal: React.FC = () => {
  const { 
    isLoyaltyModalOpen, 
    setIsLoyaltyModalOpen, 
    currentLoyaltyUser, 
    loginLoyaltyByPhone, 
    logoutLoyalty,
    addBonusPoints 
  } = useRestaurant();

  const [inputPhone, setInputPhone] = useState('');
  const [inputName, setInputName] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'history'>('overview');
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  if (!isLoyaltyModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    loginLoyaltyByPhone(inputPhone, inputName || undefined);
    setInputPhone('');
    setInputName('');
  };

  const handleClaimVoucher = (voucherName: string, pointsNeeded: number) => {
    if (!currentLoyaltyUser) return;
    if (currentLoyaltyUser.pointsBalance < pointsNeeded) {
      alert(`You need ${pointsNeeded} points for this reward. Keep dining to earn more!`);
      return;
    }

    addBonusPoints(currentLoyaltyUser.phone, -pointsNeeded, `Redeemed Voucher: ${voucherName}`);
    setClaimSuccess(`Voucher unlocked: ${voucherName}! Present token to your waiter or apply in cart.`);
    setTimeout(() => setClaimSuccess(null), 4000);
  };

  // Tier calculation
  const points = currentLoyaltyUser?.pointsBalance || 0;
  const currentTier = currentLoyaltyUser?.tier || 'Bronze';
  const nextTier = currentTier === 'Bronze' ? 'Silver' : currentTier === 'Silver' ? 'Gold' : 'VIP Crown';
  const targetPoints = currentTier === 'Bronze' ? 200 : currentTier === 'Silver' ? 500 : 1000;
  const progressPercent = Math.min(100, Math.round((points / targetPoints) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FCF9F2] w-full max-w-xl rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header with South Indian Gold Styling */}
        <div className="bg-gradient-to-r from-[#1B4332] via-[#245842] to-[#1B4332] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#D4AF37] border-2 border-[#D4AF37]/50 flex items-center justify-center shadow-inner">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading font-extrabold text-xl text-white">
                  Saraswathi Swarna Club
                </h3>
                <span className="bg-[#D4AF37] text-stone-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                  LOYALTY
                </span>
              </div>
              <p className="text-xs text-amber-200 font-telugu">
                సరస్వతి స్వర్ణ పాయింట్ల పథకం • Eat Authentic, Earn Rewards
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoyaltyModalOpen(false)}
            className="p-1.5 text-emerald-100 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Guest vs Member View */}
        {!currentLoyaltyUser ? (
          /* Sign-in / Register Form */
          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-900">
                <Gift className="w-8 h-8 text-[#B8860B]" />
              </div>
              <h4 className="font-serif-heading font-extrabold text-xl text-[#1B4332]">
                Join and Get 50 Free Swarna Points!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Enter your mobile number to check your rewards balance or enroll instantly. Earn 10% points on every meal!
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 max-w-sm mx-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mobile Number (10 Digits) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9845012345"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#2D6A4F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Name (Optional for new members)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. Anand Sharma"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#2D6A4F] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-[#FCF9F2] font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
              >
                Access My Rewards Club
              </button>
            </form>

            <div className="pt-4 border-t border-stone-200 text-center text-xs text-stone-500">
              💡 Sample demo customer phone: <span className="font-mono font-bold text-stone-800">9845012345</span>
            </div>
          </div>
        ) : (
          /* Member Dashboard */
          <div>
            {/* Tabs */}
            <div className="flex border-b border-stone-200 bg-white">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-[#1B4332] text-[#1B4332]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Points & Tier</span>
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'rewards'
                    ? 'border-b-2 border-[#1B4332] text-[#1B4332]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Redeem Vouchers</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'border-b-2 border-[#1B4332] text-[#1B4332]'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History ({currentLoyaltyUser.history.length})</span>
              </button>
            </div>

            {claimSuccess && (
              <div className="m-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>{claimSuccess}</span>
              </div>
            )}

            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
              
              {/* TAB 1: OVERVIEW & PASS */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Swarna Club Digital Membership Card */}
                  <div className="relative rounded-3xl p-5 bg-gradient-to-br from-[#1B4332] via-[#245842] to-[#0D281E] text-white shadow-xl border-2 border-[#D4AF37]/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/15 rounded-full blur-2xl"></div>

                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-amber-300 font-bold">
                          SARASWATHI SWARNA MEMBER
                        </div>
                        <h4 className="font-bold text-lg text-white mt-0.5">
                          {currentLoyaltyUser.name}
                        </h4>
                        <p className="text-xs text-emerald-200 font-mono">
                          +91 {currentLoyaltyUser.phone}
                        </p>
                      </div>

                      <span className="bg-[#D4AF37] text-stone-950 font-black text-xs px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                        {currentLoyaltyUser.tier} Tier
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-emerald-700/50 flex justify-between items-end">
                      <div>
                        <div className="text-xs text-amber-200">Current Balance</div>
                        <div className="text-3xl font-black text-[#D4AF37] tracking-tight">
                          {currentLoyaltyUser.pointsBalance}{' '}
                          <span className="text-sm font-normal text-white">Points</span>
                        </div>
                        <div className="text-[11px] text-emerald-300 mt-0.5">
                          Cash value: ₹{(currentLoyaltyUser.pointsBalance * 0.5).toFixed(0)} discount
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-emerald-300">Total Spent</div>
                        <div className="text-sm font-bold text-white">₹{currentLoyaltyUser.totalSpent}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tier Progress */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-stone-700">Next Tier Progress: {nextTier}</span>
                      <span className="font-bold text-[#8C3B1E]">{currentLoyaltyUser.pointsBalance} / {targetPoints} pts</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-[#1B4332] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Earn {Math.max(0, targetPoints - currentLoyaltyUser.pointsBalance)} more points to unlock {nextTier} perks (extra 5% cashback & exclusive chef dishes).
                    </p>
                  </div>

                  {/* How to Earn More */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <h5 className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Ways to Earn Swarna Points
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50">
                        <div className="font-bold text-amber-950">1 Point per ₹10 Spent</div>
                        <div className="text-[11px] text-stone-600">On every dine-in, takeaway, or online delivery.</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50">
                        <div className="font-bold text-amber-950">+20 Points for Review</div>
                        <div className="text-[11px] text-stone-600">Share your dining feedback on our website.</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50">
                        <div className="font-bold text-amber-950">+50 Welcome Gift</div>
                        <div className="text-[11px] text-stone-600">Credited on your very first order!</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50">
                        <div className="font-bold text-amber-950">Birthday Special Dish</div>
                        <div className="text-[11px] text-stone-600">Complimentary sweet payasam on your special day.</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: REDEEMABLE VOUCHERS */}
              {activeTab === 'rewards' && (
                <div className="space-y-3">
                  <div className="text-xs text-stone-600 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Redeem points here for special dining perks or apply them directly at checkout!</span>
                  </div>

                  {/* Voucher 1 */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        ₹25
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1B4332]">₹25 Instant Bill Discount</div>
                        <div className="text-[11px] text-stone-500">Applicable on any order over ₹100</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClaimVoucher('₹25 Instant Discount', 50)}
                      disabled={currentLoyaltyUser.pointsBalance < 50}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-bold transition shrink-0"
                    >
                      50 Pts
                    </button>
                  </div>

                  {/* Voucher 2 */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center font-bold">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1B4332]">Free Degree Filter Coffee</div>
                        <div className="text-[11px] text-stone-500">Served in traditional brass davarah tumbler</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClaimVoucher('Free Degree Filter Coffee', 50)}
                      disabled={currentLoyaltyUser.pointsBalance < 50}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-bold transition shrink-0"
                    >
                      50 Pts
                    </button>
                  </div>

                  {/* Voucher 3 */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        ₹60
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1B4332]">₹60 Super Saver Meal Coupon</div>
                        <div className="text-[11px] text-stone-500">Applicable on any order over ₹200</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClaimVoucher('₹60 Super Saver Coupon', 100)}
                      disabled={currentLoyaltyUser.pointsBalance < 100}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-bold transition shrink-0"
                    >
                      100 Pts
                    </button>
                  </div>

                  {/* Voucher 4 */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#8C3B1E] flex items-center justify-center font-bold">
                        🥞
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1B4332]">Free Ghee Roast Masala Dosa</div>
                        <div className="text-[11px] text-stone-500">Our signature dish roasted in cow ghee</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClaimVoucher('Free Ghee Roast Dosa', 150)}
                      disabled={currentLoyaltyUser.pointsBalance < 150}
                      className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-bold transition shrink-0"
                    >
                      150 Pts
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: TRANSACTION HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-2.5">
                  {currentLoyaltyUser.history.length === 0 ? (
                    <div className="text-center py-8 text-stone-400 text-xs">
                      No points activity recorded yet.
                    </div>
                  ) : (
                    currentLoyaltyUser.history.map((tx) => (
                      <div
                        key={tx.id}
                        className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-stone-800">{tx.description}</div>
                          <div className="text-[10px] text-stone-400 mt-0.5">
                            {tx.date} {tx.orderId && `• Order: ${tx.orderId}`}
                          </div>
                        </div>

                        <div className={`font-black text-sm ${
                          tx.points > 0 ? 'text-emerald-700' : 'text-red-600'
                        }`}>
                          {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

            {/* Modal Bottom Account Action Bar */}
            <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Logged in as <strong className="text-stone-800">{currentLoyaltyUser.name}</strong>
              </span>

              <button
                onClick={logoutLoyalty}
                className="text-red-600 hover:underline font-semibold"
              >
                Switch Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
