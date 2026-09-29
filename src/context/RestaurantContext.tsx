import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  OrderStatus, 
  CustomerLoyalty, 
  CustomerReview, 
  LoyaltyTransaction,
  OrderType,
  PaymentMethod
} from '../types/restaurant';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_ORDERS, 
  INITIAL_LOYALTY_USERS, 
  INITIAL_REVIEWS 
} from '../data/initialData';

interface RestaurantContextType {
  // Menu
  menu: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, instructions?: string, addGhee?: boolean) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;

  // Orders
  orders: Order[];
  activeOrderToTrack: Order | null;
  setActiveOrderToTrack: (order: Order | null) => void;
  lookupOrder: (query: string) => Order | undefined; // by orderNumber or phone
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    address?: string;
    tableNumber?: string;
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    notes?: string;
    pointsToRedeem?: number;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, customNote?: string) => void;

  // Customer Loyalty
  currentLoyaltyUser: CustomerLoyalty | null;
  loyaltyUsers: CustomerLoyalty[];
  loginLoyaltyByPhone: (phone: string, name?: string) => CustomerLoyalty;
  logoutLoyalty: () => void;
  addBonusPoints: (phone: string, points: number, reason: string) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;

  // Admin auth
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // UI helpers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoyaltyModalOpen: boolean;
  setIsLoyaltyModalOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'saraswathi_menu_v2',
  ORDERS: 'saraswathi_orders_v2',
  LOYALTY: 'saraswathi_loyalty_v2',
  REVIEWS: 'saraswathi_reviews_v2',
  CART: 'saraswathi_cart_v2',
  CURRENT_USER_PHONE: 'saraswathi_current_user_phone',
  ADMIN_AUTH: 'saraswathi_admin_auth'
};

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Menu State
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // 2. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 3. Loyalty Users State
  const [loyaltyUsers, setLoyaltyUsers] = useState<CustomerLoyalty[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOYALTY);
      return saved ? JSON.parse(saved) : INITIAL_LOYALTY_USERS;
    } catch {
      return INITIAL_LOYALTY_USERS;
    }
  });

  // Current logged in loyalty customer
  const [currentLoyaltyPhone, setCurrentLoyaltyPhone] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_PHONE) || '9845012345'; // Default sample customer for immediate experience
  });

  // 4. Reviews State
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // 5. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Active Tracked Order
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(null);

  // 7. Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOYALTY, JSON.stringify(loyaltyUsers));
  }, [loyaltyUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentLoyaltyPhone) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_PHONE, currentLoyaltyPhone);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_PHONE);
    }
  }, [currentLoyaltyPhone]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdmin));
  }, [isAdmin]);

  // Keep activeOrderToTrack updated whenever orders list changes
  useEffect(() => {
    if (activeOrderToTrack) {
      const updated = orders.find(o => o.id === activeOrderToTrack.id);
      if (updated && updated.status !== activeOrderToTrack.status) {
        setActiveOrderToTrack(updated);
        showNotification(`Order ${updated.orderNumber} status updated to ${updated.status.toUpperCase()}!`);
      }
    }
  }, [orders, activeOrderToTrack]);

  // Real-time synchronization across browser tabs via BroadcastChannel
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel('saraswathi_cafe_sync');

    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'ORDER_STATUS_CHANGED') {
        const { orderId, newStatus, updatedOrder } = payload;
        setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
        if (activeOrderToTrack && activeOrderToTrack.id === orderId) {
          setActiveOrderToTrack(updatedOrder);
          showNotification(`🔔 Your order ${updatedOrder.orderNumber} is now: ${newStatus.replace('_', ' ').toUpperCase()}`);
        }
      } else if (type === 'NEW_ORDER_PLACED') {
        setOrders(prev => [payload, ...prev]);
        if (isAdmin) {
          showNotification(`🍳 New Order Received: ${payload.orderNumber} (₹${payload.finalTotal})`);
        }
      } else if (type === 'MENU_UPDATED') {
        setMenu(payload);
      }
    };

    return () => {
      channel.close();
    };
  }, [activeOrderToTrack, isAdmin]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => prev === msg ? null : prev);
    }, 4500);
  };

  // Helper broadcast
  const broadcast = useCallback((type: string, payload: any) => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const channel = new BroadcastChannel('saraswathi_cafe_sync');
        channel.postMessage({ type, payload });
        channel.close();
      } catch (e) {
        console.error('Broadcast error:', e);
      }
    }
  }, []);

  // Cart operations
  const addToCart = (item: MenuItem, quantity = 1, instructions = '', addGhee = false) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.menuItem.id === item.id && ci.addGhee === addGhee);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        if (instructions) newCart[existingIndex].specialInstructions = instructions;
        return newCart;
      } else {
        return [...prev, {
          menuItem: item,
          quantity,
          specialInstructions: instructions,
          addGhee
        }];
      }
    });
    showNotification(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(ci => ci.menuItem.id === itemId ? { ...ci, quantity } : ci));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => {
    const itemPrice = item.menuItem.price + (item.addGhee ? 15 : 0);
    return sum + (itemPrice * item.quantity);
  }, 0);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Loyalty calculations
  const currentLoyaltyUser = loyaltyUsers.find(u => u.phone === currentLoyaltyPhone) || null;

  const loginLoyaltyByPhone = (phone: string, name?: string): CustomerLoyalty => {
    const cleanPhone = phone.trim();
    let user = loyaltyUsers.find(u => u.phone === cleanPhone);

    if (!user) {
      // Create new member with 50 bonus Swarna welcome points!
      user = {
        phone: cleanPhone,
        name: name || 'Valued Guest',
        pointsBalance: 50,
        tier: 'Bronze',
        totalSpent: 0,
        totalOrdersCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        history: [
          {
            id: 'tx-' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            type: 'bonus',
            points: 50,
            description: 'Welcome Gift: 50 Swarna Points for joining!'
          }
        ]
      };
      setLoyaltyUsers(prev => [user!, ...prev]);
      showNotification(`🎉 Welcome to Saraswathi Swarna Club! You received 50 Welcome Points.`);
    }

    setCurrentLoyaltyPhone(cleanPhone);
    return user;
  };

  const logoutLoyalty = () => {
    setCurrentLoyaltyPhone(null);
  };

  const addBonusPoints = (phone: string, points: number, reason: string) => {
    setLoyaltyUsers(prev => prev.map(user => {
      if (user.phone === phone) {
        const newBalance = user.pointsBalance + points;
        const newTier = newBalance >= 500 ? 'Gold' : newBalance >= 200 ? 'Silver' : 'Bronze';
        const newTx: LoyaltyTransaction = {
          id: 'tx-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          type: 'bonus',
          points,
          description: reason
        };
        return {
          ...user,
          pointsBalance: newBalance,
          tier: newTier,
          history: [newTx, ...user.history]
        };
      }
      return user;
    }));
    showNotification(`Added ${points} Swarna Points to ${phone}!`);
  };

  // Order Placement
  const placeOrder = async (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    address?: string;
    tableNumber?: string;
    orderType: OrderType;
    paymentMethod: PaymentMethod;
    notes?: string;
    pointsToRedeem?: number;
  }): Promise<Order> => {
    const subtotal = cartTotal;
    const deliveryFee = orderData.orderType === 'delivery' ? (subtotal > 299 ? 0 : 25) : 0;
    
    // Points discount (1 point = ₹0.50)
    const pointsToUse = orderData.pointsToRedeem || 0;
    const pointsDiscountAmount = Math.min(pointsToUse * 0.5, subtotal * 0.5); // max 50% of bill

    const finalTotal = Math.max(0, subtotal + deliveryFee - pointsDiscountAmount);
    
    // Points earned on cash/paid portion (1 point per ₹10)
    const pointsEarned = Math.floor(finalTotal / 10);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SC-${randomSuffix}`;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      tableNumber: orderData.tableNumber,
      orderType: orderData.orderType,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: 0,
      pointsRedeemed: pointsToUse,
      pointsDiscountAmount,
      finalTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'upi' ? 'paid' : 'pending',
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          title: 'Order Placed',
          description: orderData.orderType === 'dine-in' 
            ? `Order received for ${orderData.tableNumber || 'Dine-in'}. Token #${orderNumber}`
            : 'Order received. Kitchen notified for immediate preparation.'
        }
      ],
      notes: orderData.notes,
      pointsEarned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDeliveryTimeMinutes: orderData.orderType === 'delivery' ? 25 : 12
    };

    // Update orders list
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderToTrack(newOrder);

    // Update customer loyalty profile
    setLoyaltyUsers(prev => {
      const cleanPhone = orderData.phone.trim();
      const existingUser = prev.find(u => u.phone === cleanPhone);

      const historyEntries: LoyaltyTransaction[] = [];

      if (pointsToUse > 0) {
        historyEntries.push({
          id: 'tx-red-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          type: 'redeemed',
          points: -pointsToUse,
          orderId: orderNumber,
          description: `Redeemed on Order #${orderNumber}`
        });
      }

      if (pointsEarned > 0) {
        historyEntries.push({
          id: 'tx-earn-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          type: 'earned',
          points: pointsEarned,
          orderId: orderNumber,
          description: `Earned 10% points on Order #${orderNumber}`
        });
      }

      if (existingUser) {
        const newBalance = existingUser.pointsBalance - pointsToUse + pointsEarned;
        const totalSpent = existingUser.totalSpent + finalTotal;
        const newTier = newBalance >= 500 ? 'Gold' : newBalance >= 200 ? 'Silver' : 'Bronze';
        return prev.map(u => u.phone === cleanPhone ? {
          ...u,
          name: orderData.customerName || u.name,
          pointsBalance: newBalance,
          totalSpent,
          tier: newTier,
          totalOrdersCount: u.totalOrdersCount + 1,
          history: [...historyEntries, ...u.history]
        } : u);
      } else {
        // Create new user record
        const newUser: CustomerLoyalty = {
          phone: cleanPhone,
          name: orderData.customerName,
          email: orderData.email,
          pointsBalance: 50 - pointsToUse + pointsEarned, // 50 welcome bonus
          tier: 'Bronze',
          totalSpent: finalTotal,
          totalOrdersCount: 1,
          joinedDate: new Date().toISOString().split('T')[0],
          history: [
            {
              id: 'tx-wb-' + Date.now(),
              date: new Date().toISOString().split('T')[0],
              type: 'bonus',
              points: 50,
              description: 'Welcome Bonus for joining Saraswathi Swarna Club'
            },
            ...historyEntries
          ]
        };
        return [newUser, ...prev];
      }
    });

    setCurrentLoyaltyPhone(orderData.phone.trim());

    // Clear cart
    clearCart();
    
    // Broadcast new order
    broadcast('NEW_ORDER_PLACED', newOrder);

    return newOrder;
  };

  // Order status update (Admin action)
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, customNote?: string) => {
    let targetUpdatedOrder: Order | null = null;

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const statusTitles: Record<OrderStatus, { title: string; desc: string }> = {
          pending: { title: 'Order Placed', desc: 'Order received by cashier' },
          preparing: { title: 'Cooking in Kitchen', desc: 'Chef is preparing your fresh meal on the tawa.' },
          out_for_delivery: { 
            title: order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Counter Pickup', 
            desc: order.orderType === 'delivery' ? 'Delivery valet is on the way to your address.' : 'Your order is hot & packed at the pickup counter.' 
          },
          completed: { title: 'Delivered / Completed', desc: 'Order delivered successfully. Enjoy your authentic meal!' },
          cancelled: { title: 'Order Cancelled', desc: customNote || 'Order was cancelled by restaurant.' }
        };

        const historyItem = {
          status: newStatus,
          timestamp: new Date().toISOString(),
          title: statusTitles[newStatus]?.title || newStatus,
          description: customNote || statusTitles[newStatus]?.desc || 'Status changed'
        };

        const updated: Order = {
          ...order,
          status: newStatus,
          paymentStatus: newStatus === 'completed' ? 'paid' : order.paymentStatus,
          statusHistory: [historyItem, ...order.statusHistory],
          updatedAt: new Date().toISOString()
        };

        targetUpdatedOrder = updated;
        return updated;
      }
      return order;
    }));

    if (targetUpdatedOrder) {
      broadcast('ORDER_STATUS_CHANGED', {
        orderId,
        newStatus,
        updatedOrder: targetUpdatedOrder
      });

      if (activeOrderToTrack && activeOrderToTrack.id === orderId) {
        setActiveOrderToTrack(targetUpdatedOrder);
      }
    }

    showNotification(`Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const lookupOrder = (query: string): Order | undefined => {
    const q = query.trim().toLowerCase();
    return orders.find(o => 
      o.orderNumber.toLowerCase() === q ||
      o.phone.includes(q) ||
      o.id.toLowerCase() === q
    );
  };

  // Menu operations
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: 'm-' + Date.now()
    };
    const updated = [newItem, ...menu];
    setMenu(updated);
    broadcast('MENU_UPDATED', updated);
    showNotification(`Added ${itemData.name} to menu!`);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updated = menu.map(item => item.id === id ? { ...item, ...updates } : item);
    setMenu(updated);
    broadcast('MENU_UPDATED', updated);
    showNotification(`Updated menu item!`);
  };

  const deleteMenuItem = (id: string) => {
    const updated = menu.filter(item => item.id !== id);
    setMenu(updated);
    broadcast('MENU_UPDATED', updated);
    showNotification(`Removed item from menu.`);
  };

  const toggleItemAvailability = (id: string) => {
    const updated = menu.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item);
    setMenu(updated);
    broadcast('MENU_UPDATED', updated);
  };

  // Review operations
  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: 'Just now'
    };
    setReviews(prev => [newReview, ...prev]);

    // Give 20 Swarna points if logged in
    if (currentLoyaltyUser) {
      addBonusPoints(currentLoyaltyUser.phone, 20, 'Review Bonus: Thank you for sharing your experience!');
    }
    showNotification('Thank you for your review! +20 Swarna Points credited.');
  };

  // Admin Auth
  const adminLogin = (password: string): boolean => {
    if (password === 'admin123' || password === 'saraswathi@2026' || password === 'admin') {
      setIsAdmin(true);
      showNotification('Welcome back, Saraswathi Cafe Manager!');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    showNotification('Logged out from Admin Dashboard');
  };

  return (
    <RestaurantContext.Provider value={{
      menu,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      toggleItemAvailability,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartItemsCount,
      orders,
      activeOrderToTrack,
      setActiveOrderToTrack,
      lookupOrder,
      placeOrder,
      updateOrderStatus,
      currentLoyaltyUser,
      loyaltyUsers,
      loginLoyaltyByPhone,
      logoutLoyalty,
      addBonusPoints,
      reviews,
      addReview,
      isAdmin,
      adminLogin,
      adminLogout,
      isCartOpen,
      setIsCartOpen,
      isLoyaltyModalOpen,
      setIsLoyaltyModalOpen,
      isOrderTrackerOpen,
      setIsOrderTrackerOpen,
      isAdminLoginModalOpen,
      setIsAdminLoginModalOpen,
      notification,
      setNotification
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
