import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  PartyPopper, 
  PhoneCall, 
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Order, OrderStatus } from '../types/restaurant';

export const LiveOrderTrackerModal: React.FC = () => {
  const { 
    isOrderTrackerOpen, 
    setIsOrderTrackerOpen, 
    activeOrderToTrack, 
    setActiveOrderToTrack, 
    lookupOrder, 
    orders 
  } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  if (!isOrderTrackerOpen) return null;

  // Selected order to display: either activeOrderToTrack, or the latest order
  const order: Order | undefined = activeOrderToTrack || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = lookupOrder(searchQuery.trim());
    if (found) {
      setActiveOrderToTrack(found);
      setSearchError('');
    } else {
      setSearchError(`No order found matching "${searchQuery}". Check your Order Token or Phone Number.`);
    }
  };

  // Helper for tracking steps
  const steps: { key: OrderStatus; label: string; telugu: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'pending',
      label: 'Order Placed',
      telugu: 'ఆర్డర్ నమోదు చేయబడింది',
      desc: 'Cashier confirmed order & queued for kitchen.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      key: 'preparing',
      label: 'Cooking on Tawa',
      telugu: 'వంటశాలలో తయారవుతోంది',
      desc: 'Chef is frying fresh dosas and pouring hot sambar.',
      icon: <ChefHat className="w-5 h-5" />
    },
    {
      key: 'out_for_delivery',
      label: order?.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Pickup Counter',
      telugu: order?.orderType === 'delivery' ? 'డెలివరీకి బయలుదేరింది' : 'కౌంటర్‌లో సిద్ధంగా ఉంది',
      desc: order?.orderType === 'delivery' ? 'Valet is on the way to your doorstep.' : 'Ready for pickup at restaurant counter.',
      icon: <Bike className="w-5 h-5" />
    },
    {
      key: 'completed',
      label: 'Delivered & Enjoyed',
      telugu: 'పూర్తయింది • భోజనం ఆస్వాదించండి',
      desc: 'Delivered successfully. Thank you for choosing Saraswathi Cafe!',
      icon: <PartyPopper className="w-5 h-5" />
    }
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const orderIndex: Record<OrderStatus, number> = {
      pending: 0,
      preparing: 1,
      out_for_delivery: 2,
      completed: 3,
      cancelled: -1
    };

    const targetIdx = orderIndex[stepKey];
    const currentIdx = orderIndex[currentStatus];

    if (currentStatus === 'cancelled') return 'cancelled';
    if (currentIdx > targetIdx) return 'done';
    if (currentIdx === targetIdx) return 'active';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FCF9F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shadow-inner">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading font-extrabold text-lg text-white">
                  Live Order Tracker
                </h3>
                <span className="bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE SYNC
                </span>
              </div>
              <p className="text-xs text-amber-200 font-telugu">
                ప్రత్యక్ష ఆర్డర్ స్థితి ట్రాకింగ్
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 text-emerald-100 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Order Bar */}
        <div className="p-4 bg-white/80 border-b border-stone-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Track by Order # (e.g. SC-8421) or 10-digit Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-[#2D6A4F] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition shrink-0"
            >
              Search
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {searchError}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {!order ? (
            <div className="text-center py-10 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700">No active order selected</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Place an order from our menu, or search using your order token above.
              </p>
            </div>
          ) : (
            <>
              {/* Order Meta Header */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                      Token ID:
                    </span>
                    <span className="font-serif-heading font-black text-xl text-[#1B4332]">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border">
                      {order.orderType.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-3 flex-wrap">
                    <span>Customer: <strong className="text-stone-800">{order.customerName}</strong></span>
                    <span>•</span>
                    <span>Placed: <strong className="text-stone-800">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500">Estimated Prep Time</div>
                  <div className="text-lg font-black text-[#8C3B1E] flex items-center justify-end gap-1">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>~{order.estimatedDeliveryTimeMinutes} Mins</span>
                  </div>
                </div>
              </div>

              {/* Live Status Pipeline (Interactive Steps) */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider">
                    Preparation & Delivery Pipeline
                  </h4>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Current: {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {steps.map((st) => {
                    const stepState = getStepStatus(st.key, order.status);

                    let iconBg = 'bg-stone-100 text-stone-400 border-stone-300';
                    let titleColor = 'text-stone-400';
                    let descColor = 'text-stone-400';

                    if (stepState === 'done') {
                      iconBg = 'bg-emerald-600 text-white border-emerald-700';
                      titleColor = 'text-[#1B4332] font-bold';
                      descColor = 'text-stone-600';
                    } else if (stepState === 'active') {
                      iconBg = 'bg-[#D4AF37] text-stone-900 border-amber-600 ring-4 ring-amber-100 animate-pulse';
                      titleColor = 'text-[#8C3B1E] font-black text-sm';
                      descColor = 'text-stone-800 font-medium';
                    }

                    return (
                      <div key={st.key} className="relative flex items-start gap-4">
                        {/* Status Icon Marker */}
                        <div className={`absolute -left-6 w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 z-10 ${iconBg}`}>
                          {stepState === 'done' ? <CheckCircle2 className="w-3.5 h-3.5" /> : st.icon}
                        </div>

                        {/* Step Details */}
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <h5 className={`text-xs ${titleColor}`}>
                              {st.label}
                            </h5>
                            <span className="text-[11px] font-telugu text-stone-400">
                              {st.telugu}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 ${descColor}`}>
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3">
                <h4 className="text-xs font-extrabold text-[#1B4332] uppercase tracking-wider border-b pb-1">
                  Ordered Dishes ({order.items.length} items)
                </h4>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1B4332] bg-emerald-50 px-1.5 py-0.5 rounded">
                          {item.quantity}x
                        </span>
                        <div>
                          <span className="font-semibold text-stone-800">{item.menuItem.name}</span>
                          {item.addGhee && <span className="text-[10px] text-amber-800 ml-1">(+Ghee)</span>}
                        </div>
                      </div>
                      <span className="font-bold text-stone-700">
                        ₹{(item.menuItem.price + (item.addGhee ? 15 : 0)) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs font-bold text-stone-900">
                  <span>Total Amount ({order.paymentMethod.toUpperCase()} - {order.paymentStatus.toUpperCase()}):</span>
                  <span className="text-sm font-black text-[#1B4332]">₹{order.finalTotal}</span>
                </div>
              </div>

              {/* Delivery Destination or Table info */}
              {order.address && (
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs">
                  <MapPin className="w-4 h-4 text-[#8C3B1E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950">Delivery Destination: </span>
                    <span className="text-amber-900">{order.address}</span>
                  </div>
                </div>
              )}

              {/* Direct Support Contact */}
              <div className="p-4 bg-emerald-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-amber-300">Need Immediate Assistance?</div>
                  <div className="text-[11px] text-emerald-100">
                    Call our Palamaner kitchen manager directly for updates.
                  </div>
                </div>
                <a
                  href="tel:09440215961"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call: 09440215961</span>
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
