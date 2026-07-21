export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isBestSeller?: boolean;
  image?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface CustomCake {
  size: '1kg' | '2kg' | '3kg' | '5kg';
  flavor: string;
  frosting: string;
  color: string;
  toppings: string[];
  message: string;
  tiers: number;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  cakeType: 'standard' | 'custom';
  cakeName: string;
  customCakeDetails?: CustomCake;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'pending' | 'baking' | 'decorating' | 'out_for_delivery' | 'delivered';
  notes?: string;
  items?: { item: MenuItem; quantity: number }[];
  totalPrice?: number;
  orderDate?: string;
}

export interface BirthdayReminder {
  id: string;
  name: string;
  phone: string;
  birthdayName: string;
  date: string;
}
