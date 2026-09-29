export type CategoryType = 'all' | 'breakfast' | 'meals' | 'snacks' | 'beverages' | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  teluguName: string;
  category: 'breakfast' | 'meals' | 'snacks' | 'beverages' | 'specials';
  price: number;
  description: string;
  image: string;
  spicyLevel?: 0 | 1 | 2 | 3; // 0=mild, 1=medium, 2=spicy, 3=extra spicy
  isBestseller?: boolean;
  isJainFriendly?: boolean;
  isVegan?: boolean;
  prepTimeMinutes: number;
  isAvailable: boolean;
  calories?: number;
  tags?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  spicePreference?: 'Mild' | 'Regular' | 'Spicy';
  addGhee?: boolean;
}

export type OrderStatus = 'pending' | 'preparing' | 'out_for_delivery' | 'completed' | 'cancelled';
export type OrderType = 'delivery' | 'takeaway' | 'dine-in';
export type PaymentMethod = 'cod' | 'upi';
export type PaymentStatus = 'pending' | 'paid';

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  title: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. SC-8421
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  tableNumber?: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  pointsRedeemed: number;
  pointsDiscountAmount: number;
  finalTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  statusHistory: OrderStatusHistory[];
  notes?: string;
  pointsEarned: number;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTimeMinutes: number;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed' | 'bonus';
  points: number;
  orderId?: string;
  description: string;
}

export interface CustomerLoyalty {
  phone: string;
  name: string;
  email?: string;
  pointsBalance: number;
  tier: 'Bronze' | 'Silver' | 'Gold';
  totalSpent: number;
  totalOrdersCount: number;
  joinedDate: string;
  history: LoyaltyTransaction[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  teluguComment?: string;
  pros: string[];
  cons?: string[];
  recommendedDish?: string;
  source: 'Google' | 'Direct Customer';
  verifiedCustomer?: boolean;
}
