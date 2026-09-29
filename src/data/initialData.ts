import { MenuItem, CustomerReview, Order, CustomerLoyalty } from '../types/restaurant';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'm-1',
    name: 'Ghee Roast Masala Dosa',
    teluguName: 'నెయ్యి రోస్ట్ మసాలా దోశ',
    category: 'breakfast',
    price: 75,
    description: 'Crispy golden crepe roasted in pure country ghee, folded with spiced mashed potato palya, served with coconut chutney, tomato chutney & piping hot sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    isBestseller: true,
    prepTimeMinutes: 8,
    isAvailable: true,
    calories: 320,
    tags: ['Pure Ghee', 'Bestseller']
  },
  {
    id: 'm-2',
    name: 'Steamed Thatte Idli with Ghee Podi',
    teluguName: 'తట్టె ఇడ్లీ పొడి నెయ్యి',
    category: 'breakfast',
    price: 50,
    description: 'Two fluffy, melt-in-mouth plate idlis sprinkled generously with gunpowder (karam podi) and drenched with melted aromatic cow ghee.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    isBestseller: true,
    isJainFriendly: true,
    prepTimeMinutes: 5,
    isAvailable: true,
    calories: 210,
    tags: ['Traditional', 'Soft & Fluffy']
  },
  {
    id: 'm-3',
    name: 'Crispy Medu Vada (2 Pcs)',
    teluguName: 'కరకరలాడే మేదు వడ (2)',
    category: 'breakfast',
    price: 45,
    description: 'Golden-fried spiced urad dal fritters with a crunchy crust and fluffy center, infused with crushed peppercorns and fresh curry leaves.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    isBestseller: false,
    prepTimeMinutes: 5,
    isAvailable: true,
    calories: 260,
    tags: ['Crispy Snack']
  },
  {
    id: 'm-4',
    name: 'Hot Fluffy Puri with Potato Sagu',
    teluguName: 'పూరి బంగాళాదుంప సాగు (3)',
    category: 'breakfast',
    price: 65,
    description: '3 puffed golden wheat puris served with home-style Karnataka-Andhra potato onion sagu and coconut chutney.',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    prepTimeMinutes: 10,
    isAvailable: true,
    calories: 380,
    tags: ['Comfort Food']
  },
  {
    id: 'm-5',
    name: 'Crispy Rava Onion Dosa',
    teluguName: 'రవ్వ ఉల్లిపాయ దోశ',
    category: 'breakfast',
    price: 85,
    description: 'Lacework thin semolina crepe studded with finely diced shallots, green chillies, ginger and whole cumin seeds.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    prepTimeMinutes: 12,
    isAvailable: true,
    calories: 290,
    tags: ['Extra Crispy']
  },
  {
    id: 'm-6',
    name: 'Andhra Pesarattu Upma',
    teluguName: 'ఆంధ్రా పెసరట్టు ఉప్మా',
    category: 'breakfast',
    price: 80,
    description: 'Traditional green moong dal dosa stuffed with hot rava upma, served with signature allam (ginger) chutney and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    isBestseller: true,
    prepTimeMinutes: 10,
    isAvailable: true,
    calories: 340,
    tags: ['Andhra Signature', 'High Protein']
  },
  {
    id: 'm-7',
    name: 'Rich Ghee Ven Pongal',
    teluguName: 'నెయ్యి పొంగల్ & జీడిపప్పు',
    category: 'breakfast',
    price: 65,
    description: 'Comforting mash of fragrant rice and moong dal slow-cooked with ghee, crushed black pepper, ginger, and roasted cashews.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 0,
    isJainFriendly: true,
    prepTimeMinutes: 5,
    isAvailable: true,
    calories: 310,
    tags: ['Pure Ghee']
  },

  // Meals
  {
    id: 'm-8',
    name: 'Saraswathi Special South Indian Thali',
    teluguName: 'సరస్వతి స్పెషల్ భోజనం',
    category: 'meals',
    price: 150,
    description: 'Complete royal meal: Steamed Sona Masoori Rice, Drumstick Sambar, Tomato Pepper Rasam, Special Kootu, 2 Vegetable Poriyals, Curd, Medu Vada, Appalam, Gunpowder with Ghee & Semiya Payasam sweet.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    isBestseller: true,
    prepTimeMinutes: 8,
    isAvailable: true,
    calories: 680,
    tags: ['Full Meal', 'Unlimited Rice']
  },
  {
    id: 'm-9',
    name: 'Andhra Mini Meals Pack',
    teluguName: 'ఆంధ్రా మినీ మీల్స్',
    category: 'meals',
    price: 100,
    description: 'Quick traveler meal: Rice, piping hot sambar, tangy rasam, daily vegetable fry, curd, pickle & crunchy papad.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    prepTimeMinutes: 5,
    isAvailable: true,
    calories: 520,
    tags: ['Quick Travel Meal']
  },
  {
    id: 'm-10',
    name: 'Karnataka Bisibelebath with Khara Boondi',
    teluguName: 'బిసిబేళె బాత్ & బూంది',
    category: 'meals',
    price: 70,
    description: 'Authentic spiced lentil & vegetable rice cooked in homemade masala powder, topped with crunchy spicy boondi and a dollop of fresh ghee.',
    image: 'https://images.unsplash.com/photo-1630409346824-4f0e7b080087?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    prepTimeMinutes: 6,
    isAvailable: true,
    calories: 410,
    tags: ['Spiced Comfort']
  },
  {
    id: 'm-11',
    name: 'Temple Style Curd Rice (Daddojanam)',
    teluguName: 'తిరుపతి స్టైల్ దద్దోజనం',
    category: 'meals',
    price: 55,
    description: 'Cooling probiotic curd rice tempered with mustard seeds, curry leaves, green chillies, ginger, cashews & pomegranate pearls.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 0,
    isJainFriendly: true,
    prepTimeMinutes: 5,
    isAvailable: true,
    calories: 270,
    tags: ['Cooling & Mild']
  },

  // Snacks
  {
    id: 'm-12',
    name: 'Crispy Mysore Bonda (4 Pcs)',
    teluguName: 'మైసూర్ బోండా & చట్నీ (4)',
    category: 'snacks',
    price: 40,
    description: 'Fluffy inside, crisp outside maida & curd dumplings with chopped ginger, green chillies, and cumin seeds, served with fiery coconut chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    isBestseller: true,
    prepTimeMinutes: 6,
    isAvailable: true,
    calories: 310,
    tags: ['Evening Favourite']
  },
  {
    id: 'm-13',
    name: 'Amritsari Chole Bhature (2 Bhature)',
    teluguName: 'ఛోలే భటూరే & ఉల్లిపాయలు',
    category: 'snacks',
    price: 95,
    description: 'Giant puffed bhature paired with slow-cooked dark spiced chickpea curry, pickled onions, and spicy green chilli.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    prepTimeMinutes: 12,
    isAvailable: true,
    calories: 560,
    tags: ['Heavy Snack']
  },
  {
    id: 'm-14',
    name: 'Andhra Stuffed Mirchi Bajji (3 Pcs)',
    teluguName: 'ఆంధ్రా ఉల్లి మిర్చి బజ్జీ (3)',
    category: 'snacks',
    price: 45,
    description: 'Slit Bhavnagri green chillies batter-fried and stuffed with tangy chopped onions, coriander, roasted peanut powder, and lemon squeeze.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 3,
    prepTimeMinutes: 8,
    isAvailable: true,
    calories: 240,
    tags: ['Spicy Street Style']
  },
  {
    id: 'm-15',
    name: 'Crispy Street Punugulu with Chutney',
    teluguName: 'కరకరలాడే పునుగులు',
    category: 'snacks',
    price: 40,
    description: 'Traditional Coastal Andhra crispy rice & urad dal bite-sized fritters served with peanut chutney and red chilli chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 2,
    prepTimeMinutes: 6,
    isAvailable: true,
    calories: 280,
    tags: ['Crispy Bites']
  },

  // Beverages
  {
    id: 'm-16',
    name: 'Kumbakonam Degree Filter Coffee',
    teluguName: 'కుంభకోణం డిగ్రీ ఫిల్టర్ కాఫీ',
    category: 'beverages',
    price: 25,
    description: 'Signature freshly brewed chicory-infused decoction with frothy boiled full-cream milk, served aerated in a traditional brass davarah and tumbler.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 0,
    isBestseller: true,
    prepTimeMinutes: 3,
    isAvailable: true,
    calories: 85,
    tags: ['Must Try', 'Brass Davarah']
  },
  {
    id: 'm-17',
    name: 'Allam Ginger Masala Chai',
    teluguName: 'అల్లం యాలకుల మసాలా టీ',
    category: 'beverages',
    price: 20,
    description: 'Fresh crushed ginger, green cardamom, and Assam CTC tea leaves simmered in creamy milk. An invigorating highway refresher.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 0,
    prepTimeMinutes: 4,
    isAvailable: true,
    calories: 70,
    tags: ['Fresh Brew']
  },
  {
    id: 'm-18',
    name: 'Chilled Kesar Badam Milk',
    teluguName: 'బాదాం పాలు (కుంకుమపువ్వు)',
    category: 'beverages',
    price: 40,
    description: 'Rich almond drink flavored with Kashmiri saffron strands, green cardamom powder, and garnished with slivered almonds and pistachios.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 0,
    prepTimeMinutes: 3,
    isAvailable: true,
    calories: 180,
    tags: ['Refreshing & Sweet']
  },
  {
    id: 'm-19',
    name: 'Spiced Masala Majjiga (Buttermilk)',
    teluguName: 'కమ్మని చల్లని మజ్జిగ',
    category: 'beverages',
    price: 25,
    description: 'Hand-churned refreshing curd drink whisked with roasted cumin, grated ginger, green chillies, curry leaves, and fresh coriander.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    spicyLevel: 1,
    prepTimeMinutes: 2,
    isAvailable: true,
    calories: 45,
    tags: ['Digestive', 'Cooling']
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Kalyan Chakravarthy',
    location: 'Bangalore-Tirupati Highway Traveler',
    rating: 5,
    date: '2 days ago',
    comment: 'Stopped here during our family drive from Bangalore to Tirupati. The Ghee Roast Dosa and Degree Filter Coffee are phenomenal! Ample free parking right on MBT road made it super hassle-free for our car. Very quick service.',
    teluguComment: 'తిరుపతి వెళ్లే దారిలో మంచి హోటల్. నెయ్యి రోస్ట్ దోశ, కాఫీ అద్భుతం!',
    pros: ['Crispy Ghee Dosa', 'Spacious Free Parking', 'Quick Service under 8 mins', 'Clean Restrooms'],
    recommendedDish: 'Ghee Roast Masala Dosa & Filter Coffee',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-2',
    author: 'Sunitha Reddy',
    location: 'Palamaner Resident',
    rating: 4,
    date: '1 week ago',
    comment: 'Our regular breakfast spot in Palamaner town. Thatte idli with podi and hot ghee is pure comfort food. Affordable pricing—you can easily fill your stomach for under ₹100. Sunday mornings are very crowded though.',
    pros: ['Authentic Andhra taste', 'Pocket-friendly prices', 'Hot fresh sambar'],
    cons: ['Peak morning rush on weekends can have 10-min table wait'],
    recommendedDish: 'Steamed Thatte Idli with Ghee Podi',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-3',
    author: 'Venkatesh Naidu',
    location: 'Chittoor District',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Had the Special South Indian Thali for lunch. Rice, rasam, and kootu were very tasty and gave that homely wedding feast feel. Loved the payasam at the end. Staff is polite and helpful.',
    pros: ['South Indian Thali variety', 'Fresh curd & payasam', 'Family-friendly AC section'],
    recommendedDish: 'Saraswathi Special South Indian Thali',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-4',
    author: 'Dr. Anand Kumar',
    location: 'Chennai Traveler',
    rating: 3,
    date: '3 weeks ago',
    comment: 'Food taste is genuinely good, especially the sambar and filter coffee. However, during evening rush hours around 7 PM, the bonda took about 15 minutes because of highway bus crowds. Good parking facility though.',
    pros: ['Taste of coffee & sambar', 'Clean tables', 'Plenty of car parking'],
    cons: ['Slightly slower takeaway during peak evening highway bus stops'],
    recommendedDish: 'Kumbakonam Degree Filter Coffee',
    source: 'Google',
    verifiedCustomer: true
  },
  {
    id: 'rev-5',
    author: 'Pooja Sharma',
    location: 'Bangalore',
    rating: 5,
    date: '1 month ago',
    comment: 'Cleanest pure vegetarian restaurant on the Palamaner highway stretch. Great vegan options and child-friendly high chairs. The online ordering feature for highway takeaway pick-up is a game changer!',
    pros: ['Hygiene', 'Fast pickup', 'Authentic filter coffee'],
    recommendedDish: 'Andhra Pesarattu Upma',
    source: 'Google',
    verifiedCustomer: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'SC-8421',
    customerName: 'Srinivas Murthy',
    phone: '9845012345',
    address: 'Near Clock Tower, Main Bazaar, Palamaner',
    orderType: 'delivery',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[0], // Ghee Roast Masala Dosa
        quantity: 2,
        addGhee: true
      },
      {
        menuItem: INITIAL_MENU_ITEMS[15], // Filter Coffee
        quantity: 2
      }
    ],
    subtotal: 200,
    deliveryFee: 20,
    discount: 0,
    pointsRedeemed: 20,
    pointsDiscountAmount: 10,
    finalTotal: 210,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    status: 'preparing',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-09-29T08:50:00Z',
        title: 'Order Placed',
        description: 'Order received and confirmed by kitchen cashier.'
      },
      {
        status: 'preparing',
        timestamp: '2026-09-29T08:53:00Z',
        title: 'Cooking in Kitchen',
        description: 'Chef is crisping your fresh Ghee Roast Masala Dosas.'
      }
    ],
    pointsEarned: 21,
    createdAt: '2026-09-29T08:50:00Z',
    updatedAt: '2026-09-29T08:53:00Z',
    estimatedDeliveryTimeMinutes: 18,
    notes: 'Please pack extra ginger chutney.'
  },
  {
    id: 'ord-102',
    orderNumber: 'SC-8422',
    customerName: 'Lakshmi Narayana',
    phone: '9440188990',
    address: 'Table #4 (Dine-in)',
    orderType: 'dine-in',
    tableNumber: 'Table 4',
    items: [
      {
        menuItem: INITIAL_MENU_ITEMS[7], // Saraswathi Special Thali
        quantity: 2
      },
      {
        menuItem: INITIAL_MENU_ITEMS[18], // Majjiga
        quantity: 2
      }
    ],
    subtotal: 350,
    deliveryFee: 0,
    discount: 0,
    pointsRedeemed: 0,
    pointsDiscountAmount: 0,
    finalTotal: 350,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'pending',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-09-29T09:02:00Z',
        title: 'Order Placed',
        description: 'Order placed for Table #4. Kitchen notified.'
      }
    ],
    pointsEarned: 35,
    createdAt: '2026-09-29T09:02:00Z',
    updatedAt: '2026-09-29T09:02:00Z',
    estimatedDeliveryTimeMinutes: 10
  }
];

export const INITIAL_LOYALTY_USERS: CustomerLoyalty[] = [
  {
    phone: '9845012345',
    name: 'Srinivas Murthy',
    email: 'srinivas.m@gmail.com',
    pointsBalance: 140,
    tier: 'Silver',
    totalSpent: 1650,
    totalOrdersCount: 6,
    joinedDate: '2026-07-15',
    history: [
      {
        id: 'tx-1',
        date: '2026-07-15',
        type: 'bonus',
        points: 50,
        description: 'Welcome Bonus for joining Saraswathi Swarna Club'
      },
      {
        id: 'tx-2',
        date: '2026-08-10',
        type: 'earned',
        points: 45,
        orderId: 'SC-7120',
        description: 'Earned 10% points on Order #SC-7120'
      },
      {
        id: 'tx-3',
        date: '2026-09-29',
        type: 'redeemed',
        points: -20,
        orderId: 'SC-8421',
        description: 'Redeemed ₹10 discount on Order #SC-8421'
      },
      {
        id: 'tx-4',
        date: '2026-09-29',
        type: 'earned',
        points: 21,
        orderId: 'SC-8421',
        description: 'Earned points on Order #SC-8421'
      }
    ]
  },
  {
    phone: '9440215961',
    name: 'Rupesh Kumar',
    email: 'rupesh@palamaner.in',
    pointsBalance: 280,
    tier: 'Gold',
    totalSpent: 3400,
    totalOrdersCount: 14,
    joinedDate: '2026-06-01',
    history: [
      {
        id: 'tx-10',
        date: '2026-06-01',
        type: 'bonus',
        points: 100,
        description: 'VIP Gold Welcome Grant'
      },
      {
        id: 'tx-11',
        date: '2026-08-20',
        type: 'earned',
        points: 180,
        description: 'Points earned on multiple orders'
      }
    ]
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
    title: 'Pure Ghee Roast Dosa',
    teluguTitle: 'నెయ్యి రోస్ట్ దోశ',
    subtitle: 'Golden crisp perfection'
  },
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    title: 'Kumbakonam Degree Filter Coffee',
    teluguTitle: 'డిగ్రీ ఫిల్టర్ కాఫీ',
    subtitle: 'Authentic brass tumbler brew'
  },
  {
    url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    title: 'South Indian Special Thali',
    teluguTitle: 'సరస్వతి స్పెషల్ భోజనం',
    subtitle: '12 authentic Andhra dishes'
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    title: 'Steamed Thatte Idli & Podi',
    teluguTitle: 'తట్టె ఇడ్లీ & కారప్పొడి',
    subtitle: 'Soft like jasmine petals'
  },
  {
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    title: 'Crispy Hot Medu Vada',
    teluguTitle: 'మేదు వడ',
    subtitle: 'Served with 3 chutneys'
  },
  {
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    title: 'Mysore Bonda & Punugulu',
    teluguTitle: 'మైసూర్ బోండా & పునుగులు',
    subtitle: 'Crisp evening highway snacks'
  }
];
