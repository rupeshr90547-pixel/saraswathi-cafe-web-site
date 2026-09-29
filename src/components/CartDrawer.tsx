import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Award, 
  CheckCircle, 
  QrCode, 
  ShieldCheck, 
  Bike, 
  Utensils, 
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderType, PaymentMethod } from '../types/restaurant';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal,
    currentLoyaltyUser, 
    loginLoyaltyByPhone, 
    placeOrder,
    setActiveOrderToTrack,
    setIsOrderTrackerOpen
  } = useRestaurant();

  // Checkout Step
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  // Customer inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(currentLoyaltyUser?.phone || '');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  
  // Loyalty redemption state
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  // Placed order reference
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upiSimulated, setUpiSimulated] = useState(false);

  // Auto-sync customer name and phone if logged into loyalty
  React.useEffect(() => {
    if (currentLoyaltyUser) {
      if (!name) setName(currentLoyaltyUser.name);
      if (!phone) setPhone(currentLoyaltyUser.phone);
    }
  }, [currentLoyaltyUser]);

  // Max points redeemable (up to 50% of subtotal, 1 pt = ₹0.50)
  const maxRedeemablePoints = currentLoyaltyUser 
    ? Math.min(currentLoyaltyUser.pointsBalance, Math.floor((cartTotal * 0.5) / 0.5))
    : 0;

  const pointsDiscount = redeemPoints ? Math.min(pointsToUse * 0.5, cartTotal * 0.5) : 0;
  const deliveryFee = orderType === 'delivery' ? (cartTotal > 299 ? 0 : 25) : 0;
  const finalTotal = Math.max(0, cartTotal + deliveryFee - pointsDiscount);
  const estimatedPointsEarned = Math.floor(finalTotal / 10);

  const handleApplyPoints = (apply: boolean) => {
    setRedeemPoints(apply);
    if (apply) {
      setPointsToUse(maxRedeemablePoints);
    } else {
      setPointsToUse(0);
    }
  };

  const handlePhoneBlur = () => {
    if (phone.length === 10) {
      loginLoyaltyByPhone(phone, name);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide your name and 10-digit mobile number.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      alert('Please enter your delivery address in Palamaner.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await placeOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        address: orderType === 'delivery' ? address : undefined,
        tableNumber: orderType === 'dine-in' ? (tableNumber || 'Table 1') : undefined,
        orderType,
        paymentMethod,
        notes: notes.trim(),
        pointsToRedeem: redeemPoints ? pointsToUse : 0
      });

      setCompletedOrder(order);
      setStep('confirmation');

      // Trigger festive celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore confetti errors
      }
    } catch (err) {
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenTrackerFromConfirmation = () => {
    if (completedOrder) {
      setActiveOrderToTrack(completedOrder);
      setIsCartOpen(false);
      setIsOrderTrackerOpen(true);
      setStep('cart');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FCF9F2] w-full max-w-lg h-full shadow-2xl flex flex-col justify-between border-l border-amber-900/10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#1B4332] leading-tight">
                {step === 'cart' && 'Your Order Cart'}
                {step === 'checkout' && 'Checkout & Delivery'}
                {step === 'confirmation' && 'Order Confirmed!'}
              </h2>
              <p className="text-xs text-stone-500 font-telugu">
                {step === 'cart' && 'మీ ఆర్డర్ బుట్ట'}
                {step === 'checkout' && 'వివరాలు & చెల్లింపు'}
                {step === 'confirmation' && 'ఆర్డర్ విజయవంతమైంది'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              if (step === 'confirmation') setStep('cart');
            }}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* STEP 1: CART ITEMS LIST */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="text-6xl text-amber-200">🥘</div>
                  <h3 className="font-bold text-lg text-stone-700">Your cart is currently empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Explore our crispy dosas, steaming thatte idlis, or South Indian royal thali to get started.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#2D6A4F]"
                  >
                    Browse Menu (మెనూ చూడండి)
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-stone-500 pb-1 border-b border-stone-200">
                    <span>{cart.length} item(s) selected</span>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-3"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-sm text-[#1B4332] truncate">
                              {item.menuItem.name}
                            </h4>
                            <span className="font-bold text-xs text-[#8C3B1E] shrink-0">
                              ₹{(item.menuItem.price + (item.addGhee ? 15 : 0)) * item.quantity}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-stone-400 font-telugu">
                            {item.menuItem.teluguName}
                          </p>

                          {item.addGhee && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-1.5 py-0.5 rounded inline-block mt-0.5">
                              + Country Ghee (₹15)
                            </span>
                          )}

                          {item.specialInstructions && (
                            <p className="text-[11px] text-stone-500 italic mt-0.5">
                              "{item.specialInstructions}"
                            </p>
                          )}

                          {/* Quantity control */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                              <button
                                onClick={() => updateCartQuantity(item.menuItem.id, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-stone-200 text-stone-700"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-stone-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.menuItem.id, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-stone-200 text-stone-700"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.menuItem.id)}
                              className="text-stone-400 hover:text-red-600 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Loyalty Points Promo Teaser */}
                  <div className="bg-amber-50/80 border border-[#D4AF37]/50 rounded-2xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-200/70 flex items-center justify-center text-amber-900">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-950">
                          {currentLoyaltyUser 
                            ? `You have ${currentLoyaltyUser.pointsBalance} Swarna Points`
                            : 'Join Swarna Club & Earn 10% Points'}
                        </div>
                        <div className="text-[11px] text-amber-800">
                          {currentLoyaltyUser
                            ? `Save up to ₹${Math.min(currentLoyaltyUser.pointsBalance * 0.5, cartTotal * 0.5).toFixed(0)} at checkout`
                            : 'Earn points on this order for discounts'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT & DELIVERY DETAILS */}
          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Dining Mode selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      orderType === 'delivery'
                        ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      orderType === 'takeaway'
                        ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                      orderType === 'dine-in'
                        ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Dine-in</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
                <h4 className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider border-b pb-1">
                  Customer Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Naidu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Phone Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9845012345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      onBlur={handlePhoneBlur}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Delivery Address in Palamaner *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Shop No., Street, Landmark (e.g. Near MBT Road Clock Tower, Palamaner)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none resize-none"
                    />
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Table / Section Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4 / AC Hall Table 2"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Special Cooking Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra hot sambar, less spicy chutney, pack separately"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#2D6A4F] outline-none"
                  />
                </div>
              </div>

              {/* Loyalty Points Redemption Option */}
              {currentLoyaltyUser && currentLoyaltyUser.pointsBalance > 0 && (
                <div className="bg-amber-50/90 border border-[#D4AF37] p-3.5 rounded-2xl shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#B8860B]" />
                      <div>
                        <div className="text-xs font-bold text-amber-950">
                          Redeem Saraswathi Swarna Points
                        </div>
                        <div className="text-[11px] text-amber-800">
                          Balance: {currentLoyaltyUser.pointsBalance} pts (Max usable: {maxRedeemablePoints} pts = ₹{maxRedeemablePoints * 0.5})
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={redeemPoints}
                        onChange={(e) => handleApplyPoints(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1B4332]"></div>
                    </label>
                  </div>

                  {redeemPoints && (
                    <div className="mt-2.5 pt-2 border-t border-amber-300/40 text-xs flex justify-between items-center text-emerald-800 font-bold">
                      <span>Instant Discount Applied:</span>
                      <span>-₹{pointsDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Methods */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
                <h4 className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider border-b pb-1">
                  Payment Method
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-[#1B4332] bg-emerald-50/40 text-[#1B4332] font-bold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Cash on Delivery</span>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#1B4332]"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 font-normal">
                      Pay cash/counter upon receiving
                    </span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition ${
                      paymentMethod === 'upi'
                        ? 'border-[#1B4332] bg-emerald-50/40 text-[#1B4332] font-bold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1">
                        <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                        Instant UPI
                      </span>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-[#1B4332]"
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 font-normal">
                      GPay, PhonePe, Paytm QR
                    </span>
                  </label>
                </div>

                {/* Simulated UPI QR panel */}
                {paymentMethod === 'upi' && (
                  <div className="mt-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-2">
                    <div className="inline-block p-2 bg-white rounded-lg border shadow-xs">
                      {/* Stylized QR mockup */}
                      <div className="w-28 h-28 bg-stone-900 mx-auto rounded flex flex-col items-center justify-center p-1 relative">
                        <div className="w-full h-full bg-white p-1 rounded grid grid-cols-4 gap-1">
                          <div className="bg-stone-900 rounded-xs"></div>
                          <div className="bg-stone-300"></div>
                          <div className="bg-stone-900 rounded-xs"></div>
                          <div className="bg-stone-900"></div>
                          <div className="bg-stone-300"></div>
                          <div className="bg-stone-900"></div>
                          <div className="bg-stone-300"></div>
                          <div className="bg-stone-900"></div>
                          <div className="bg-stone-900"></div>
                          <div className="bg-stone-300"></div>
                          <div className="bg-stone-900"></div>
                          <div className="bg-stone-900"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="bg-[#1B4332] text-amber-300 font-black text-[9px] px-1 rounded">
                            UPI
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-bold text-stone-800">
                      UPI ID: saraswathicafe@upi
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Amount: <strong className="text-stone-900">₹{finalTotal}</strong> • Instant auto-confirmation
                    </p>
                  </div>
                )}
              </div>

            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION CELEBRATION */}
          {step === 'confirmation' && completedOrder && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-300">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#8C3B1E] uppercase tracking-wider">
                  Order Received Successfully
                </span>
                <h3 className="font-serif-heading font-extrabold text-2xl text-[#1B4332]">
                  Token #{completedOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Thank you, {completedOrder.customerName}! Our master chef has begun prepping your food.
                </p>
              </div>

              {/* Status Box */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs text-left space-y-2">
                <div className="flex justify-between text-xs pb-2 border-b">
                  <span className="text-stone-500">Estimated Preparation:</span>
                  <span className="font-bold text-[#1B4332]">
                    {completedOrder.estimatedDeliveryTimeMinutes} Mins
                  </span>
                </div>

                <div className="flex justify-between text-xs pb-2 border-b">
                  <span className="text-stone-500">Order Mode:</span>
                  <span className="font-bold capitalize text-stone-800">
                    {completedOrder.orderType}
                  </span>
                </div>

                <div className="flex justify-between text-xs pb-2 border-b">
                  <span className="text-stone-500">Total Paid/Due:</span>
                  <span className="font-extrabold text-[#1B4332]">
                    ₹{completedOrder.finalTotal} ({completedOrder.paymentMethod.toUpperCase()})
                  </span>
                </div>

                {completedOrder.pointsEarned > 0 && (
                  <div className="flex justify-between text-xs text-amber-900 bg-amber-50 p-2 rounded-lg font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Swarna Points Earned:
                    </span>
                    <span>+{completedOrder.pointsEarned} pts</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleOpenTrackerFromConfirmation}
                  className="w-full py-3.5 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Track Live Order Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setStep('cart');
                  }}
                  className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
                >
                  Back to Restaurant Home
                </button>
              </div>

              {/* Need Help Phone */}
              <div className="pt-2 text-xs text-stone-500 flex items-center justify-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-stone-400" />
                <span>Need modifications? Call kitchen: </span>
                <a href="tel:09440215961" className="font-bold text-[#1B4332] hover:underline">
                  09440215961
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bill & Navigation Actions */}
        {step !== 'confirmation' && cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
            
            {/* Bill breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-900">₹{cartTotal}</span>
              </div>

              {step === 'checkout' && orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Palamaner Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
              )}

              {pointsDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Swarna Points Discount:</span>
                  <span>-₹{pointsDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-extrabold text-[#1B4332] pt-2 border-t border-stone-200">
                <span>Final Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* CTAs */}
            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-300"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <span>Place Order • ₹{finalTotal}</span>
                      <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
