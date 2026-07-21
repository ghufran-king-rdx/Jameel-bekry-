import { Category, MenuItem, GalleryItem, Review, FAQItem, PricingTier } from '../types';

export const BAKERY_INFO = {
  name: 'JAMEEL BAKERS',
  slogan: 'Fresh Cakes • Bakery • Fast Delivery',
  address: 'Dargah Road, Hala, Sindh, Pakistan',
  phones: ['+92 301 3566601', '+92 300 4360120'],
  whatsapp: '+923013566601',
  hours: 'Monday - Sunday: 8:00 AM - 11:00 PM',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.5458129524675!2d68.4235!3d25.8111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzQwLjAiTiA2OMKwMjUnMjQuNiJF!5e0!3m2!1sen!2spk!4v1658300000000!5m2!1sen!2spk'
};

export const CATEGORIES: Category[] = [
  { id: 'birthday', name: 'Birthday Cakes', iconName: 'Cake', count: 12 },
  { id: 'wedding', name: 'Wedding Cakes', iconName: 'Heart', count: 8 },
  { id: 'anniversary', name: 'Anniversary Cakes', iconName: 'Sparkles', count: 6 },
  { id: 'kids', name: 'Kids Cakes', iconName: 'Smile', count: 10 },
  { id: 'chocolate', name: 'Chocolate Cakes', iconName: 'Flame', count: 15 },
  { id: 'strawberry', name: 'Strawberry Cakes', iconName: 'Cherry', count: 5 },
  { id: 'pineapple', name: 'Pineapple Cakes', iconName: 'Sun', count: 4 },
  { id: 'black-forest', name: 'Black Forest', iconName: 'Cookie', count: 6 },
  { id: 'red-velvet', name: 'Red Velvet', iconName: 'Award', count: 5 },
  { id: 'cupcakes', name: 'Cupcakes', iconName: 'Cookie', count: 14 },
  { id: 'donuts', name: 'Donuts', iconName: 'Circle', count: 8 },
  { id: 'cookies', name: 'Cookies', iconName: 'Disc', count: 10 },
  { id: 'croissants', name: 'Croissants', iconName: 'Compass', count: 6 },
  { id: 'pizza', name: 'Pizza', iconName: 'Pizza', count: 12 },
  { id: 'sandwiches', name: 'Sandwiches', iconName: 'Beef', count: 8 },
  { id: 'cold-drinks', name: 'Cold Drinks', iconName: 'GlassWater', count: 12 },
  { id: 'coffee', name: 'Coffee', iconName: 'Coffee', count: 8 },
  { id: 'snacks', name: 'Snacks', iconName: 'Utensils', count: 14 },
  { id: 'bread', name: 'Bread', iconName: 'CupSoda', count: 5 },
  { id: 'sweets', name: 'Sweets', iconName: 'Dessert', count: 15 }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Birthday Cake',
    title: 'Gilded Chocolate Birthday Sensation',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g2',
    category: 'Wedding Cake',
    title: 'Elegance 4-Tier Cascading Rose',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g3',
    category: 'Custom Cake',
    title: 'Luxury Macaron Drip Cake',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g4',
    category: 'Cartoon Cake',
    title: 'Friendly Teddy Blue Skies Cake',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g5',
    category: 'Floral Cake',
    title: 'Spring Blossom Buttercream Dream',
    image: 'https://images.unsplash.com/photo-1534432127792-62f585d4b76c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g6',
    category: 'Heart Cake',
    title: 'Rich Ruby Velvet Heart',
    image: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g7',
    category: 'Photo Cake',
    title: 'Memorable Moments Edible Print Cake',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Fresh Ingredients',
    description: 'We source only premium organic cream, fresh fruits, and high-quality chocolate daily.',
    icon: 'Apple'
  },
  {
    title: 'Same Day Delivery',
    description: 'Craving cakes or fresh snacks? Place your order and receive quick delivery across Hala.',
    icon: 'Truck'
  },
  {
    title: 'Premium Quality',
    description: 'Master chefs baking with pure dedication and top ingredients for a rich gourmet taste.',
    icon: 'Crown'
  },
  {
    title: 'Affordable Prices',
    description: 'Delectable, luxury bakery products and stunning designer cakes at reasonable prices.',
    icon: 'BadgeDollarSign'
  },
  {
    title: 'Hygienic Kitchen',
    description: 'Strict standards of handwashing, gloves, caps, and deep sanitization of all ovens and tools.',
    icon: 'Sparkles'
  },
  {
    title: 'Custom Cake Design',
    description: 'Show us any photo or design, and we will build a gorgeous, personalized cake for your special occasion.',
    icon: 'Palette'
  },
  {
    title: 'Online Ordering',
    description: 'Fill in your specifications or order from our menu with instantaneous confirmation.',
    icon: 'Globe'
  },
  {
    title: 'WhatsApp Support',
    description: 'Direct chatting with our team to customize, trace, or ask anything with quick response.',
    icon: 'MessageSquareText'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Cakes
  {
    id: 'm1',
    name: 'Belgian Chocolate Fudge Cake',
    category: 'Cakes',
    price: 1800,
    description: 'Deep layers of Belgian chocolate sponge, sandwiched with velvety rich dark chocolate fudge frosting.',
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=500',
    tags: ['Chocolate', 'Fudge', 'Best Seller']
  },
  {
    id: 'm2',
    name: 'Classic Red Velvet Cake',
    category: 'Cakes',
    price: 1950,
    description: 'Stunning bright red sponge layers subtly infused with premium cocoa, stacked with rich vanilla cream cheese icing.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf4991941?auto=format&fit=crop&q=80&w=500',
    tags: ['Red Velvet', 'Premium']
  },
  {
    id: 'm3',
    name: 'Gourmet Black Forest Gateau',
    category: 'Cakes',
    price: 1650,
    description: 'Rich dark sponge cake layers loaded with sweet cherries, premium chocolate shavings, and fresh whipped cream.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=500',
    tags: ['Black Forest', 'Classic']
  },
  {
    id: 'm4',
    name: 'Strawberry Fields Cream Cake',
    category: 'Cakes',
    price: 1700,
    description: 'Delicate light sponge filled with layers of real sweet Hala strawberries and fluffy white vanilla mousse.',
    image: 'https://images.unsplash.com/photo-1534432127792-62f585d4b76c?auto=format&fit=crop&q=80&w=500',
    tags: ['Strawberry', 'Seasonal']
  },
  {
    id: 'm5',
    name: 'Royal Golden Pineapple Cake',
    category: 'Cakes',
    price: 1550,
    description: 'Super moist, sweet vanilla sponge drenched in juicy tropical pineapple chunks and light airy frosting.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=500',
    tags: ['Pineapple', 'Sweet']
  },

  // Pastries
  {
    id: 'm6',
    name: 'Double Chocolate Glazed Donut',
    category: 'Pastries',
    price: 180,
    description: 'Freshly baked yeast-risen golden donut dipped in premium chocolate glaze and sprinkled with colorful fun curls.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=500',
    tags: ['Donut', 'Kid Friendly']
  },
  {
    id: 'm7',
    name: 'Red Velvet Cream Cupcake',
    category: 'Pastries',
    price: 150,
    description: 'Miniature Red Velvet cake with a beautiful mountain of cream cheese frosting and sweet white pearls.',
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=500',
    tags: ['Cupcake', 'Dessert']
  },
  {
    id: 'm8',
    name: 'Butter-Crisp Croissant',
    category: 'Pastries',
    price: 220,
    description: 'Golden, flaky, multi-layered French style crescent roll, baked with rich imported churned butter.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500',
    tags: ['Croissant', 'Bakery']
  },

  // Cookies
  {
    id: 'm12',
    name: 'Chunky Chocolate Chip Cookie',
    category: 'Cookies',
    price: 120,
    description: 'Soft-baked inside, crisp outer edges, loaded with giant molten chunks of high-quality premium dark chocolate.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=500',
    tags: ['Cookie', 'Sweet']
  },

  // Pizza
  {
    id: 'm9',
    name: 'Chicken Tikka Supreme Pizza',
    category: 'Pizza',
    price: 950,
    description: 'Freshly kneaded house dough topped with spicy tandoori chicken tikka chunks, green bell peppers, and bubbling mozzarella.',
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500',
    tags: ['Spicy', 'Pizza', 'Best Seller']
  },

  // Burgers & Sandwiches
  {
    id: 'm10',
    name: 'Jameel Special Club Sandwich',
    category: 'Sandwiches',
    price: 450,
    description: 'Triple-decker freshly toasted bakery bread with layers of slow-grilled chicken, fluffy omelet, crisp lettuce, tomato, and secret special garlic mayo.',
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&q=80&w=500',
    tags: ['Sandwich', 'Savory']
  },
  {
    id: 'm11',
    name: 'Crispy Zinger Delight Burger',
    category: 'Burgers',
    price: 480,
    description: 'Golden crisp deep-fried chicken thigh loaded inside our fresh sesame-seeded bakery bun with spicy mayo and shredded iceberg lettuce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500',
    tags: ['Burger', 'Spicy']
  },

  // Drinks
  {
    id: 'm14',
    name: 'Premium Caramel Macchiato Coffee',
    category: 'Drinks',
    price: 320,
    description: 'Rich freshly ground espresso poured over hot creamy steamed milk and completed with dark decadent caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500',
    tags: ['Coffee', 'Hot']
  },
  {
    id: 'm15',
    name: 'Rich Mango Shake Bliss',
    category: 'Drinks',
    price: 250,
    description: 'Thick, frosty, rich blend of sweetest Pakistani seasonal mangoes, fresh organic whole milk, and luxury vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=500',
    tags: ['Shake', 'Refreshing']
  },

  // Ice Cream
  {
    id: 'm16',
    name: 'Jameel Special Sundae',
    category: 'Ice Cream',
    price: 350,
    description: 'A decadent combination of vanilla, chocolate, and strawberry scoops topped with brownies, nuts, and cherries.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=500',
    tags: ['Ice Cream', 'Sweet']
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'p1',
    name: 'Starter Celebration',
    price: 'Rs. 1,500',
    description: 'Perfect for intimate gatherings, small birthdays, or casual sweet cravings.',
    features: [
      '1.5 Lb (Approx 0.75 Kg) Fresh Cake',
      'Select Chocolate, Pineapple or Vanilla Sponge',
      'Free Customized Chocolate Message Plate',
      'Matching Candles & Safe Cake Knife',
      'Next Day Delivery Option'
    ]
  },
  {
    id: 'p2',
    name: 'Premium Celebration',
    price: 'Rs. 3,200',
    description: 'Our most sought-after choice for beautiful birthday parties & lively anniversaries.',
    isPopular: true,
    features: [
      '3 Lb (Approx 1.5 Kg) Elaborated Cake',
      'Select Red Velvet, Belgian Fudge or Strawberry Mousse',
      'Sophisticated Custom Color & Frosting Decor',
      'Beautiful Custom Keepsake Cake Box',
      'Priority Same-Day Express Delivery'
    ]
  },
  {
    id: 'p3',
    name: 'Royal Wedding Celebration',
    price: 'Rs. 12,000+',
    description: 'Magnificent multi-tier masterfully sculpted wedding centerpieces.',
    features: [
      '6 Lb+ (Approx 3 Kg+) Multi-Tier Cake',
      'Personalized Tasting with Our Master Pastry Chef',
      'Intricate Sugar Flowers & Gold Leaf Detailing',
      'Safe Premium Cake Stand Rental Included',
      'Hand-delivered and Assembled at Venue in Hala'
    ]
  },
  {
    id: 'p4',
    name: 'Bespoke Custom Cake Builder',
    price: 'Custom Quote',
    description: 'Unleash your pure creative design! Fully calculated dynamic real-time customized structures.',
    features: [
      'Fully customizable weight, tiers & flavors',
      'Provide your sketch or picture via WhatsApp upload',
      'Handmade detailed customized figurines',
      'Hygienic kitchen-sourced specialty ingredients',
      'Direct contact with decorating artist'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Zeeshan Memon',
    rating: 5,
    comment: 'The Belgian Chocolate Fudge Cake was outstandingly rich! Best bakery in Hala without a doubt. Same day delivery was incredibly fast!',
    date: 'July 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r2',
    name: 'Sana Ahmed',
    rating: 5,
    comment: 'Ordered a customized doll birthday cake for my daughter. The colors were gorgeous, exactly like the design I sent on WhatsApp, and the sponge was so soft!',
    date: 'July 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r3',
    name: 'Dr. Kashif Shah',
    rating: 5,
    comment: 'Jameel Bakers delivers fantastic quality. Their Club Sandwiches and Pizza are delicious, and we always get our cakes from here. Highly recommended!',
    date: 'July 10, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'How do I place a custom cake order?',
    answer: 'You can use our interactive Custom Cake Builder on the website to design your dream cake, then click "Order via WhatsApp" or submit the Order Form. You can also share design reference images directly with us via WhatsApp at +92 301 3566601.'
  },
  {
    id: 'f2',
    question: 'Do you offer cash on delivery (COD) in Hala?',
    answer: 'Yes! We proudly offer Cash on Delivery for all standard cakes, pastries, pizzas, and snacks within Hala city limit. For custom tiered cakes over Rs. 5,000, we might ask for a minor advance security deposit via Bank Transfer.'
  },
  {
    id: 'f3',
    question: 'What is your delivery coverage area and schedule?',
    answer: 'We deliver throughout Hala and near-lying areas daily from 9:00 AM to 11:00 PM. Standard bakery orders can be delivered within 45-60 minutes, while pre-designed cakes can be delivered same-day if ordered before 4:00 PM.'
  },
  {
    id: 'f4',
    question: 'Are all cakes and products prepared in a clean environment?',
    answer: 'Absolutely. We place hygiene as our top priority. Our entire team uses sterile baking gloves, hairnets, and sanitizes all preparation equipment and counter surfaces every hour.'
  }
];

export const CAKE_OF_THE_WEEK = {
  name: 'Golden Velvet Royal Delight',
  description: 'A breathtaking masterpiece blending signature soft vanilla velvet sponge, luxurious creamy cream-cheese filling, edible pure gold leaf flakes, and golden macarons.',
  originalPrice: 2800,
  offerPrice: 2100,
  image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600',
  discount: '25% OFF',
  endsInHours: 42
};
