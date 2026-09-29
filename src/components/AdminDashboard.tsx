import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Award, 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Phone, 
  MapPin, 
  RefreshCw,
  LogOut,
  User,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus, MenuItem, CategoryType } from '../types/restaurant';

export const AdminDashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { 
    orders, 
    updateOrderStatus, 
    menu, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleItemAvailability,
    loyaltyUsers,
    addBonusPoints,
    adminLogout 
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'loyalty' | 'analytics'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Menu item modal
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formTeluguName, setFormTeluguName] = useState('');
  const [formCategory, setFormCategory] = useState<'breakfast' | 'meals' | 'snacks' | 'beverages' | 'specials'>('breakfast');
  const [formPrice, setFormPrice] = useState(60);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formBestseller, setFormBestseller] = useState(false);
  const [formJain, setFormJain] = useState(false);
  const [formSpicy, setFormSpicy] = useState<0 | 1 | 2 | 3>(1);

  // Bonus Points modal
  const [selectedCustomerForPoints, setSelectedCustomerForPoints] = useState<string | null>(null);
  const [bonusPointsAmount, setBonusPointsAmount] = useState(50);
  const [bonusReason, setBonusReason] = useState('Valued Regular Diner Bonus');

  // KPI calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.finalTotal : 0), 0);
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'out_for_delivery');
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalLoyaltyIssued = loyaltyUsers.reduce((sum, u) => sum + u.pointsBalance, 0);

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase().trim();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q)
      );
    }
    return true;
  });

  const handleOpenAddMenu = () => {
    setEditingItem(null);
    setFormName('');
    setFormTeluguName('');
    setFormCategory('breakfast');
    setFormPrice(60);
    setFormDesc('');
    setFormImage('https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80');
    setFormBestseller(false);
    setFormJain(false);
    setFormSpicy(1);
    setIsMenuModalOpen(true);
  };

  const handleOpenEditMenu = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormTeluguName(item.teluguName);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormDesc(item.description);
    setFormImage(item.image);
    setFormBestseller(!!item.isBestseller);
    setFormJain(!!item.isJainFriendly);
    setFormSpicy(item.spicyLevel || 1);
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, {
        name: formName,
        teluguName: formTeluguName || formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDesc,
        image: formImage || editingItem.image,
        isBestseller: formBestseller,
        isJainFriendly: formJain,
        spicyLevel: formSpicy
      });
    } else {
      addMenuItem({
        name: formName,
        teluguName: formTeluguName || formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDesc,
        image: formImage || 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
        isBestseller: formBestseller,
        isJainFriendly: formJain,
        spicyLevel: formSpicy,
        prepTimeMinutes: 8,
        isAvailable: true
      });
    }

    setIsMenuModalOpen(false);
  };

  const handleGrantBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomerForPoints && bonusPointsAmount > 0) {
      addBonusPoints(selectedCustomerForPoints, Number(bonusPointsAmount), bonusReason);
      setSelectedCustomerForPoints(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EEDF] pb-16">
      
      {/* Admin Top Header */}
      <header className="bg-[#1B4332] text-white border-b border-[#D4AF37]/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-stone-950 font-black flex items-center justify-center text-lg shadow-sm">
              స
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg leading-tight">
                  Saraswathi Cafe Admin Portal
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  KITCHEN & CASHIER
                </span>
              </div>
              <p className="text-[11px] text-amber-200">
                Palamaner MBT Road Branch • Live Control Room
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-emerald-100 transition"
            >
              Customer Site View
            </button>
            <button
              onClick={() => {
                adminLogout();
                onExit();
              }}
              className="p-2 rounded-xl bg-red-800/60 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1 transition"
              title="Logout from Admin"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-3 overflow-x-auto text-xs font-bold border-t border-emerald-900/50">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#D4AF37] text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Live Kitchen Orders ({activeOrders.length} Active)</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-[#D4AF37] text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Menu Manager ({menu.length} Items)</span>
          </button>

          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'loyalty'
                ? 'border-[#D4AF37] text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Swarna Loyalty Customers ({loyaltyUsers.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Total Revenue
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1B4332] mt-1">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Orders & Counter Billing</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B4332] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Active Kitchen Orders
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#8C3B1E] mt-1">
                {activeOrders.length}
              </div>
              <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                On tawa or out for delivery
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#8C3B1E] flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Total Orders Placed
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {totalOrders}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                {completedOrders.length} fulfilled
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Swarna Points Pool
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-800 mt-1">
                {totalLoyaltyIssued}
              </div>
              <div className="text-[11px] text-amber-900 font-medium mt-0.5">
                Across {loyaltyUsers.length} active members
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#8C3B1E] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* TAB 1: LIVE ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                {(['all', 'pending', 'preparing', 'out_for_delivery', 'completed'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search token #, phone, or name..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-[#2D6A4F] outline-none"
                />
              </div>
            </div>

            {/* Orders Kanban Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOrders.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-stone-300">
                  <div className="text-3xl mb-2">📋</div>
                  <h4 className="font-bold text-stone-700">No orders match filter</h4>
                </div>
              ) : (
                filteredOrders.map(order => {
                  let badgeColor = 'bg-stone-100 text-stone-800';
                  if (order.status === 'pending') badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
                  if (order.status === 'preparing') badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
                  if (order.status === 'out_for_delivery') badgeColor = 'bg-purple-100 text-purple-900 border-purple-300';
                  if (order.status === 'completed') badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                  if (order.status === 'cancelled') badgeColor = 'bg-red-100 text-red-900 border-red-300';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
                    >
                      <div>
                        {/* Order Header */}
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif-heading font-black text-lg text-[#1B4332]">
                                {order.orderNumber}
                              </span>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                                {order.orderType}
                              </span>
                            </div>
                            <div className="text-xs text-stone-500 mt-0.5">
                              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>

                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${badgeColor}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>

                        {/* Customer Info */}
                        <div className="mt-3 space-y-1 text-xs">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>{order.customerName}</span>
                            <a href={`tel:${order.phone}`} className="text-[#2D6A4F] hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{order.phone}</span>
                            </a>
                          </div>

                          {order.address && (
                            <div className="text-stone-500 text-[11px] flex items-start gap-1">
                              <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{order.address}</span>
                            </div>
                          )}

                          {order.tableNumber && (
                            <div className="text-[#8C3B1E] font-semibold text-[11px]">
                              🍽️ {order.tableNumber}
                            </div>
                          )}
                        </div>

                        {/* Items list */}
                        <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-stone-700">
                              <span>
                                <strong className="text-[#1B4332]">{it.quantity}x</strong> {it.menuItem.name}
                                {it.addGhee && <span className="text-[10px] text-amber-800 ml-1">(+Ghee)</span>}
                              </span>
                              <span className="font-medium text-stone-900">
                                ₹{(it.menuItem.price + (it.addGhee ? 15 : 0)) * it.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <div className="mt-2 p-2 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] text-amber-900 italic">
                            Note: "{order.notes}"
                          </div>
                        )}
                      </div>

                      {/* Total & 1-Click Status Controls (Real-time Broadcast trigger) */}
                      <div className="pt-3 border-t border-stone-100 space-y-2.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-stone-500">
                            Total ({order.paymentMethod.toUpperCase()} • {order.paymentStatus.toUpperCase()}):
                          </span>
                          <span className="font-black text-base text-[#1B4332]">
                            ₹{order.finalTotal}
                          </span>
                        </div>

                        {/* Interactive Status Transition Buttons */}
                        <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                                className="col-span-2 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <ChefHat className="w-3.5 h-3.5" />
                                <span>Move to Kitchen (Cooking)</span>
                              </button>
                            </>
                          )}

                          {order.status === 'preparing' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                                className="col-span-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Bike className="w-3.5 h-3.5" />
                                <span>{order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Pickup'}</span>
                              </button>
                            </>
                          )}

                          {order.status === 'out_for_delivery' && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                className="col-span-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark Delivered / Completed</span>
                              </button>
                            </>
                          )}

                          {order.status === 'completed' && (
                            <div className="col-span-2 py-1.5 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                              ✓ Completed & Swarna Points Awarded
                            </div>
                          )}

                          {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'cancelled', 'Cancelled by restaurant')}
                              className="col-span-2 py-1 text-[11px] text-red-600 hover:underline font-semibold"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* TAB 2: MENU MANAGER */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-stone-200">
              <div>
                <h3 className="font-bold text-base text-[#1B4332]">Restaurant Food Dishes</h3>
                <p className="text-xs text-stone-500">Edit pricing, toggle availability, or introduce seasonal specials.</p>
              </div>
              <button
                onClick={handleOpenAddMenu}
                className="px-4 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Add New Food Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map(item => (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs flex gap-3 ${
                    !item.isAvailable ? 'opacity-60 bg-stone-50' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-[#1B4332] truncate">{item.name}</h4>
                        <span className="font-black text-sm text-[#8C3B1E]">₹{item.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 font-telugu">{item.teluguName}</p>
                      <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded font-medium capitalize text-stone-600">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                      <button
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          item.isAvailable ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                        }`}
                      >
                        {item.isAvailable ? 'In Stock' : 'Sold Out'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditMenu(item)}
                          className="text-stone-500 hover:text-stone-800 p-1"
                          title="Edit Item"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LOYALTY USERS DIRECTORY */}
        {activeTab === 'loyalty' && (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <h3 className="font-bold text-base text-[#1B4332]">Saraswathi Swarna Club Members</h3>
                <p className="text-xs text-stone-500">Registered customers, points balance, and loyalty awards.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3">Points Balance</th>
                    <th className="p-3">Total Spend</th>
                    <th className="p-3">Orders</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {loyaltyUsers.map((user) => (
                    <tr key={user.phone} className="hover:bg-amber-50/40">
                      <td className="p-3 font-bold text-stone-900">{user.name}</td>
                      <td className="p-3 font-mono text-stone-600">+91 {user.phone}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-black text-[10px] uppercase ${
                          user.tier === 'Gold' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          user.tier === 'Silver' ? 'bg-slate-100 text-slate-800 border border-slate-300' :
                          'bg-amber-50 text-amber-800'
                        }`}>
                          {user.tier}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-emerald-800">
                        {user.pointsBalance} pts (₹{user.pointsBalance * 0.5})
                      </td>
                      <td className="p-3 font-bold text-stone-800">₹{user.totalSpent}</td>
                      <td className="p-3 text-stone-600">{user.totalOrdersCount}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedCustomerForPoints(user.phone);
                            setBonusPointsAmount(50);
                          }}
                          className="px-2.5 py-1 bg-[#1B4332] text-amber-200 rounded-lg font-bold text-[11px] hover:bg-[#2D6A4F] transition"
                        >
                          + Gift Points
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Add / Edit Menu Item Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-base text-[#1B4332]">
                {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              <button onClick={() => setIsMenuModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveMenuItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Item Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Podi Ghee Roast Dosa"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Telugu Name (తెలుగు పేరు)</label>
                <input
                  type="text"
                  placeholder="e.g. పొడి నెయ్యి రోస్ట్ దోశ"
                  value={formTeluguName}
                  onChange={(e) => setFormTeluguName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 outline-none"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="meals">Meals & Rice</option>
                    <option value="snacks">Snacks</option>
                    <option value="beverages">Beverages</option>
                    <option value="specials">Chef Specials</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={5}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Crispy, fragrant, served with sambar and 3 chutneys..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F] resize-none"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formBestseller}
                    onChange={(e) => setFormBestseller(e.target.checked)}
                    className="rounded text-[#1B4332]"
                  />
                  <span>Bestseller Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formJain}
                    onChange={(e) => setFormJain(e.target.checked)}
                    className="rounded text-[#1B4332]"
                  />
                  <span>Jain Friendly</span>
                </label>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] text-white rounded-xl font-bold shadow-xs hover:bg-[#2D6A4F]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gift Bonus Points Modal */}
      {selectedCustomerForPoints && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#1B4332]">Gift Swarna Loyalty Points</h3>
              <button onClick={() => setSelectedCustomerForPoints(null)} className="text-stone-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleGrantBonus} className="space-y-3 text-xs">
              <div className="text-stone-600">
                Granting bonus points to: <strong className="text-stone-900 font-mono">+91 {selectedCustomerForPoints}</strong>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Points to Award</label>
                <input
                  type="number"
                  required
                  min={5}
                  value={bonusPointsAmount}
                  onChange={(e) => setBonusPointsAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Reason / Note</label>
                <input
                  type="text"
                  required
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCustomerForPoints(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] text-amber-200 font-bold rounded-xl shadow-xs"
                >
                  Confirm Award
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
