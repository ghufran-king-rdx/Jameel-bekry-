import { useState, useEffect, FormEvent } from 'react';
import { 
  Cake, Heart, Sparkles, Smile, Flame, Sun, Cookie, Award, Circle, Disc, 
  Compass, Pizza, Beef, GlassWater, Coffee, Utensils, Apple, Truck, 
  Crown, BadgeDollarSign, Palette, Globe, MessageSquareText, Phone, 
  MapPin, Clock, Search, ShoppingBag, X, Check, Star, User, Plus, Minus, 
  Calendar, CheckCircle2, ChevronRight, Moon, Sun as SunIcon, Shield, Map,
  History, RotateCcw, Edit3, Trash2, Save
} from 'lucide-react';
import { 
  BAKERY_INFO, CATEGORIES, GALLERY_ITEMS, WHY_CHOOSE_US, 
  MENU_ITEMS, PRICING_TIERS, REVIEWS, FAQS, CAKE_OF_THE_WEEK 
} from './data/bakeryData';
import { MenuItem, CustomCake, OrderDetails, BirthdayReminder, Review } from './types';

export default function App() {
  // Theme & UI States
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('jameel_dark_mode');
    return saved === 'true';
  });
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGalleryCat, setSelectedGalleryCat] = useState<string>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Interactive Cart States
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Custom Cake Builder States
  const [customSize, setCustomSize] = useState<'1kg' | '2kg' | '3kg' | '5kg'>('1kg');
  const [customFlavor, setCustomFlavor] = useState<string>('Belgian Chocolate Fudge');
  const [customFrosting, setCustomFrosting] = useState<string>('Rich Buttercream');
  const [customColor, setCustomColor] = useState<string>('White & Gold');
  const [customToppings, setCustomToppings] = useState<string[]>(['Chocolate Curls', 'Golden Flakes']);
  const [customMessage, setCustomMessage] = useState<string>('Happy Birthday!');
  const [customTiers, setCustomTiers] = useState<number>(1);
  const [customCakePrice, setCustomCakePrice] = useState<number>(2000);

  // Checkout and Order State
  const [orderName, setOrderName] = useState<string>(() => localStorage.getItem('jameel_profile_name') || '');
  const [orderPhone, setOrderPhone] = useState<string>(() => localStorage.getItem('jameel_profile_phone') || '');
  const [orderSecondaryPhone, setOrderSecondaryPhone] = useState<string>(() => localStorage.getItem('jameel_profile_sec_phone') || '');
  const [orderAddress, setOrderAddress] = useState<string>(() => localStorage.getItem('jameel_profile_address') || '');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('12:00 PM - 02:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(() => {
    const saved = localStorage.getItem('jameel_active_order');
    return saved ? JSON.parse(saved) : null;
  });

  // User Profile & Order History States
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('jameel_order_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Birthday Reminder States
  const [birthdayReminders, setBirthdayReminders] = useState<BirthdayReminder[]>(() => {
    const saved = localStorage.getItem('jameel_birthday_reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [remName, setRemName] = useState<string>('');
  const [remDate, setRemDate] = useState<string>('');
  const [remPhone, setRemPhone] = useState<string>('');
  const [remBirthdayName, setRemBirthdayName] = useState<string>('');

  // Reviews States
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const saved = localStorage.getItem('jameel_reviews');
    return saved ? JSON.parse(saved) : REVIEWS;
  });
  const [newReviewName, setNewReviewName] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');

  // Special Offer Coupon Claimed State
  const [couponClaimed, setCouponClaimed] = useState<boolean>(false);

  // Delivery Tracking Simulator progress timer
  const [trackingStep, setTrackingStep] = useState<number>(0);

  // Apply Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('jameel_dark_mode', String(darkMode));
  }, [darkMode]);

  // Sync Birthday Reminders to local storage
  useEffect(() => {
    localStorage.setItem('jameel_birthday_reminders', JSON.stringify(birthdayReminders));
  }, [birthdayReminders]);

  // Sync Active Order to local storage
  useEffect(() => {
    localStorage.setItem('jameel_active_order', JSON.stringify(activeOrder));
    if (activeOrder) {
      setTrackingStep(0);
    }
  }, [activeOrder]);

  // Sync Order History to local storage
  useEffect(() => {
    localStorage.setItem('jameel_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Update orderHistory status when activeOrder status changes
  useEffect(() => {
    if (activeOrder) {
      setOrderHistory((prev) => 
        prev.map((o) => o.id === activeOrder.id ? { ...o, status: activeOrder.status } : o)
      );
    }
  }, [activeOrder?.status]);

  // Sync Profile info to local storage
  useEffect(() => {
    localStorage.setItem('jameel_profile_name', orderName);
    localStorage.setItem('jameel_profile_phone', orderPhone);
    localStorage.setItem('jameel_profile_sec_phone', orderSecondaryPhone);
    localStorage.setItem('jameel_profile_address', orderAddress);
  }, [orderName, orderPhone, orderSecondaryPhone, orderAddress]);

  // Tracking simulator timer
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'delivered') {
      const interval = setInterval(() => {
        setTrackingStep((prev) => {
          const next = prev + 1;
          if (next >= 4) {
            clearInterval(interval);
            // update status
            const updated = { ...activeOrder, status: 'delivered' as const };
            setActiveOrder(updated);
            localStorage.setItem('jameel_active_order', JSON.stringify(updated));
            return 4;
          }
          const statuses: OrderDetails['status'][] = ['pending', 'baking', 'decorating', 'out_for_delivery', 'delivered'];
          const updated = { ...activeOrder, status: statuses[next] };
          setActiveOrder(updated);
          localStorage.setItem('jameel_active_order', JSON.stringify(updated));
          return next;
        });
      }, 25000); // Progresses step every 25 seconds
      return () => clearInterval(interval);
    }
  }, [activeOrder]);

  // Calculate dynamic custom cake price
  useEffect(() => {
    let base = 1500; // base price for 1kg
    if (customSize === '2kg') base = 2800;
    if (customSize === '3kg') base = 4000;
    if (customSize === '5kg') base = 6500;

    // Tiers multiplier
    base += (customTiers - 1) * 800;

    // Toppings cost
    base += customToppings.length * 150;

    // Premium flavors
    if (customFlavor.includes('Belgian') || customFlavor.includes('Velvet')) {
      base += 300;
    }

    setCustomCakePrice(base);
  }, [customSize, customFlavor, customFrosting, customColor, customToppings, customTiers]);

  // Helper mapping icon names to actual Lucide components
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: "w-5 h-5", strokeWidth: 1.8 };
    switch (iconName) {
      case 'Cake': return <Cake {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Cookie': return <Cookie {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Circle': return <Circle {...props} />;
      case 'Disc': return <Disc {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Pizza': return <Pizza {...props} />;
      case 'Beef': return <Beef {...props} />;
      case 'GlassWater': return <GlassWater {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Apple': return <Apple {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'BadgeDollarSign': return <BadgeDollarSign {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'MessageSquareText': return <MessageSquareText {...props} />;
      default: return <Cake {...props} />;
    }
  };

  // Cart Functions
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setCart((prev) => 
      prev.map((i) => {
        if (i.item.id === itemId) {
          const newQty = i.quantity + amount;
          return newQty > 0 ? { ...i, quantity: newQty } : i;
        }
        return i;
      }).filter((i) => i.quantity > 0)
    );
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, current) => sum + current.item.price * current.quantity, 0);
    // Apply 25% off if coupon claimed and active
    return couponClaimed ? Math.round(subtotal * 0.75) : subtotal;
  };

  // Add Custom Cake to Checkout Flow
  const handleCustomCakeOrder = () => {
    const customItem: MenuItem = {
      id: `custom-built-${Date.now()}`,
      name: `Custom Design Cake (${customSize}, ${customTiers} Tier)`,
      category: 'Cakes',
      price: customCakePrice,
      description: `Flavor: ${customFlavor}, Frosting: ${customFrosting}, Theme: ${customColor}, Toppings: ${customToppings.join(', ')}. Message: "${customMessage}"`,
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=500'
    };
    addToCart(customItem);
    const checkoutElem = document.getElementById('checkout-section');
    if (checkoutElem) checkoutElem.scrollIntoView({ behavior: 'smooth' });
  };

  // Claim Coupon
  const handleClaimCoupon = () => {
    setCouponClaimed(true);
  };

  // Submit standard/custom Order
  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Kindly add items to your cart/order list before finalizing!");
      return;
    }
    if (!orderName || !orderPhone || !orderAddress || !deliveryDate) {
      alert("Kindly fill all required fields marked with *");
      return;
    }

    const newOrder: OrderDetails = {
      id: `JB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderName,
      phone: orderPhone,
      secondaryPhone: orderSecondaryPhone,
      address: orderAddress,
      deliveryDate,
      deliveryTime,
      cakeType: cart.some(i => i.item.id.startsWith('custom-built')) ? 'custom' : 'standard',
      cakeName: cart.map(i => `${i.item.name} (x${i.quantity})`).join(', '),
      paymentMethod,
      status: 'pending',
      notes: specialNotes,
      items: [...cart],
      totalPrice: getCartTotal(),
      orderDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setActiveOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);

    // Build perfect WhatsApp Urdu/English message string
    const itemsText = cart.map(i => `• ${i.item.name} x ${i.quantity} = Rs. ${i.item.price * i.quantity}`).join('\n');
    const totalText = `Rs. ${getCartTotal()}`;
    const message = `🍰 *NEW CAKE ORDER - JAMEEL BAKERS* 🍰\n\n` +
      `*Order ID:* ${newOrder.id}\n` +
      `*Customer Name:* ${newOrder.customerName}\n` +
      `*Phone Number:* ${newOrder.phone}\n` +
      `${newOrder.secondaryPhone ? `*Alternate Phone:* ${newOrder.secondaryPhone}\n` : ''}` +
      `*Delivery Address:* ${newOrder.address}\n` +
      `*Delivery Date:* ${newOrder.deliveryDate}\n` +
      `*Delivery Time Slot:* ${newOrder.deliveryTime}\n` +
      `*Payment Method:* ${newOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'EasyPaisa / Bank Transfer'}\n` +
      `${newOrder.notes ? `*Special Instructions:* ${newOrder.notes}\n` : ''}\n` +
      `*🛒 ORDER ITEMS:* \n${itemsText}\n\n` +
      `${couponClaimed ? `*Promo Discount Applied:* 25% OFF\n` : ''}` +
      `*🔥 Total Payable:* ${totalText}\n\n` +
      `*Hygienic standard baking guaranteed! Please confirm our order.* 🎂✨`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BAKERY_INFO.whatsapp}?text=${encodedText}`;

    // Reset Form & Clear Cart but keep order state
    setCart([]);
    setIsCartOpen(false);

    // Open WhatsApp in new tab securely
    window.open(whatsappUrl, '_blank');
  };

  // Repeat a past order
  const handleRepeatOrder = (pastOrder: OrderDetails) => {
    if (!pastOrder.items || pastOrder.items.length === 0) {
      alert("This order has no item details to repeat.");
      return;
    }

    // Set cart to the items from the past order
    setCart(pastOrder.items);
    
    // Auto fill delivery info from that past order
    setOrderName(pastOrder.customerName || '');
    setOrderPhone(pastOrder.phone || '');
    setOrderSecondaryPhone(pastOrder.secondaryPhone || '');
    setOrderAddress(pastOrder.address || '');
    setPaymentMethod(pastOrder.paymentMethod || 'cod');
    setSpecialNotes(pastOrder.notes || '');

    // Close the profile panel and open the cart panel
    setIsProfileOpen(false);
    setIsCartOpen(true);

    // Scroll to the checkout area
    scrollToId('checkout-section');
  };

  // Clear single past order from history
  const handleRemoveFromHistory = (id: string) => {
    setOrderHistory((prev) => prev.filter((order) => order.id !== id));
  };

  // Clear entire history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire order history?")) {
      setOrderHistory([]);
    }
  };

  // Add Birthday Reminder
  const handleAddReminder = (e: FormEvent) => {
    e.preventDefault();
    if (!remName || !remBirthdayName || !remDate || !remPhone) {
      alert("Kindly fill out all birthday reminder details.");
      return;
    }
    const newRem: BirthdayReminder = {
      id: `BR-${Date.now()}`,
      name: remName,
      phone: remPhone,
      birthdayName: remBirthdayName,
      date: remDate
    };
    setBirthdayReminders([newRem, ...birthdayReminders]);
    setRemName('');
    setRemPhone('');
    setRemBirthdayName('');
    setRemDate('');
  };

  // Delete Birthday Reminder
  const handleDeleteReminder = (id: string) => {
    setBirthdayReminders(birthdayReminders.filter(r => r.id !== id));
  };

  // Add User Review
  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) {
      alert("Please provide your name and experience feedback!");
      return;
    }
    const newlyAdded: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
    };
    const updated = [newlyAdded, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('jameel_reviews', JSON.stringify(updated));
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    alert("Shukriya! Your feedback has been saved successfully.");
  };

  // Calculate days left to target date helper
  const getDaysLeft = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const bday = new Date(targetDateStr);
    bday.setFullYear(today.getFullYear());
    
    if (bday < today) {
      bday.setFullYear(today.getFullYear() + 1);
    }
    const difference = bday.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  // Filters for menus and gallery
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGalleryItems = GALLERY_ITEMS.filter((item) => {
    return selectedGalleryCat === 'All' || item.category.toLowerCase() === selectedGalleryCat.toLowerCase();
  });

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#120d09] text-[#eae3da]' : 'bg-[#fcfaf7] text-[#332211]'} font-sans`}>
      
      {/* HEADER & STICKY NAVBAR */}
      <header className="sticky top-0 z-50 transition-all duration-300 border-b border-[#dfba73]/20 glass-light dark:glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToId('home')}>
            <div className="w-10 h-10 rounded-full bg-[#dfba73] flex items-center justify-center text-[#21160c] font-serif font-extrabold text-lg shadow-md shadow-amber-500/10">
              JB
            </div>
            <div>
              <h1 className="font-serif font-extrabold text-xl tracking-wider text-[#4a3728] dark:text-[#f3e6d5] flex items-center gap-1.5">
                {BAKERY_INFO.name}
              </h1>
              <p className="text-[10px] tracking-widest font-mono text-[#c5a880] uppercase">Hala, Pakistan</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {['home', 'about', 'menu', 'custom-cake', 'gallery', 'pricing', 'reviews', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToId(sect)}
                className={`text-sm capitalize font-semibold tracking-wide transition-colors ${
                  activeSection === sect 
                    ? 'text-[#dfba73] border-b-2 border-[#dfba73] pb-1' 
                    : 'text-[#4a3728]/80 dark:text-[#eae3da]/80 hover:text-[#dfba73]'
                }`}
              >
                {sect.replace('-', ' ')}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#c5a880]"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile Button */}
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-transform active:scale-95 flex items-center justify-center text-[#c5a880]"
              aria-label="Open User Profile"
            >
              <User className="w-5 h-5" />
              {orderHistory.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#dfba73]" />
              )}
            </button>

            {/* Cart trigger button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#4a3728] text-white hover:bg-[#3b2c20] transition-transform active:scale-95 flex items-center justify-center shadow-lg shadow-amber-950/20"
              aria-label="Open Order Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#dfba73] text-[#21160c] text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cart.reduce((s, c) => s + c.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#c5a880]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#dfba73]/10 bg-[#fefdfb] dark:bg-[#1c1612] px-4 py-3 flex flex-col gap-2.5 shadow-xl">
            {['home', 'about', 'menu', 'custom-cake', 'gallery', 'pricing', 'reviews', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToId(sect)}
                className="w-full text-left py-2 px-3 text-sm rounded-lg hover:bg-[#dfba73]/10 text-[#4a3728] dark:text-[#eae3da] font-medium capitalize"
              >
                {sect.replace('-', ' ')}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsProfileOpen(true);
              }}
              className="w-full text-left py-2.5 px-3 text-sm rounded-lg bg-[#dfba73]/10 text-[#dfba73] hover:bg-[#dfba73]/20 font-bold flex items-center gap-2 border border-[#dfba73]/20 mt-1"
            >
              <User className="w-4 h-4" /> My Profile & Past Orders
            </button>
          </div>
        )}
      </header>

      {/* HERO BANNER SECTION */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-1/4 -left-36 w-96 h-96 bg-[#dfba73]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-[#4a3728]/10 dark:bg-[#dfba73]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full border border-[#dfba73]/30 bg-[#dfba73]/10 w-fit text-xs text-[#b08c4a] dark:text-[#dfba73] font-mono tracking-widest uppercase">
              ✨ Traditional Perfection Since 1995
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[#332211] dark:text-white">
              Every Day Deserves a <span className="text-[#dfba73] underline decoration-[#dfba73]/40">Freshly Baked</span> Celebration.
            </h1>
            <p className="text-base sm:text-lg text-[#5a483a] dark:text-[#ccc2b6] leading-relaxed max-w-xl">
              Welcome to <strong>JAMEEL BAKERS</strong>, Hala\'s landmark for exquisite multi-tier wedding cakes, customized birthday delicacies, sweet glazed donuts, fresh pastries, Italian pizzas, and hot zesty burgers. 
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToId('menu')}
                className="px-7 py-3.5 rounded-xl bg-[#4a3728] text-white hover:bg-[#3b2c20] dark:bg-[#dfba73] dark:text-[#21160c] font-bold text-sm tracking-wide shadow-lg shadow-amber-950/25 dark:shadow-amber-500/10 transition-transform active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Order from Menu
              </button>
              <button 
                onClick={() => scrollToId('custom-cake')}
                className="px-7 py-3.5 rounded-xl bg-[#dfba73]/10 text-[#4a3728] dark:text-[#dfba73] border border-[#dfba73]/55 hover:bg-[#dfba73]/20 font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
              >
                <Palette className="w-4 h-4" /> Design Custom Cake
              </button>
            </div>

            {/* Quick Access Info / Pakistan Delivery */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#dfba73]/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#dfba73]/10 text-[#c5a880]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4a3728] dark:text-[#eae3da]">Hala Delivery</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Fresh & Secure</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#dfba73]/10 text-[#c5a880]">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4a3728] dark:text-[#eae3da]">WhatsApp Support</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">+92 301 3566601</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-[#dfba73]/10 text-[#c5a880]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4a3728] dark:text-[#eae3da]">Operating Hours</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">8:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Display with AI Generated Luxury Cake */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#dfba73]/30">
              <img 
                src="/src/assets/images/hero_luxury_cake_1784614817106.jpg" 
                alt="Jameel Bakers Premium Luxury Tiered Golden Cake" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <div className="flex items-center gap-1.5 text-xs text-[#dfba73] font-bold mb-1">
                  <Crown className="w-4 h-4" /> Exclusive Masterpiece
                </div>
                <h3 className="font-serif text-lg font-bold">Royal Golden Drip Cake</h3>
                <p className="text-[11px] text-gray-300">Freshly prepared daily in Hala with imported fine Belgian chocolates & golden flakes.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* "CAKE OF THE WEEK" HERO OFFERS */}
      <section className="py-8 bg-gradient-to-r from-[#dfba73]/10 via-[#4a3728]/5 to-[#dfba73]/10 border-y border-[#dfba73]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
          <div className="md:col-span-4 relative flex justify-center">
            <span className="absolute top-3 left-3 bg-red-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse z-10 shadow-md">
              {CAKE_OF_THE_WEEK.discount}
            </span>
            <div className="w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border border-[#dfba73]/40 shadow-lg">
              <img 
                src={CAKE_OF_THE_WEEK.image} 
                alt={CAKE_OF_THE_WEEK.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-3">
            <div className="text-xs font-bold font-mono text-[#dfba73] tracking-widest uppercase">
              🔥 SPECIAL LIMITED PROMOTION
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4a3728] dark:text-white">
              {CAKE_OF_THE_WEEK.name}
            </h3>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] leading-relaxed max-w-2xl">
              {CAKE_OF_THE_WEEK.description}
            </p>
            <div className="flex items-baseline gap-4 pt-1">
              <span className="text-3xl font-extrabold text-[#dfba73]">Rs. {CAKE_OF_THE_WEEK.offerPrice}</span>
              <span className="text-sm text-gray-500 line-through">Rs. {CAKE_OF_THE_WEEK.originalPrice}</span>
              <span className="text-xs bg-[#4a3728] dark:bg-[#dfba73]/20 text-white dark:text-[#dfba73] px-2.5 py-1 rounded font-bold font-mono">Save Rs. 700</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  addToCart({
                    id: 'week-special-cake',
                    name: CAKE_OF_THE_WEEK.name,
                    category: 'Cakes',
                    price: CAKE_OF_THE_WEEK.offerPrice,
                    description: 'Special Golden Velvet Royal Delight Cake Promo order.'
                  });
                }}
                className="px-5 py-2.5 rounded-lg bg-[#4a3728] hover:bg-[#3b2c20] text-white font-bold text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add Promo Cake to Cart
              </button>

              <button
                onClick={handleClaimCoupon}
                disabled={couponClaimed}
                className={`px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  couponClaimed 
                    ? 'bg-green-600/15 text-green-500 border border-green-500/30' 
                    : 'bg-[#dfba73] text-[#21160c] hover:bg-[#b08c4a]'
                }`}
              >
                {couponClaimed ? '✓ 25% STORE COUPON CLAIMED' : 'CLAIM 25% CART DISCOUNT COUPON'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">Hygienic Standards • Hala Local Favorite</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-2">
              Why Hala Trusts Jameel Bakers
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-4 rounded-full"></div>
            <p className="text-sm sm:text-base text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              We balance visual luxury with strict sanitation. Every ingredient is inspected, and every kitchen worker adheres to medical-grade hygiene rules to ensure your family is perfectly safe and satisfied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border border-[#dfba73]/15 bg-white dark:bg-[#1c1612] text-left hover:shadow-xl hover:border-[#dfba73]/45 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#dfba73]/10 flex items-center justify-center text-[#dfba73] mb-5 group-hover:scale-110 transition-transform">
                    {renderCategoryIcon(item.icon)}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#4a3728] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE INTEGRATED CUSTOM CAKE BUILDER 🎂 */}
      <section id="custom-cake" className="py-20 bg-gradient-to-b from-transparent to-[#dfba73]/5 border-t border-[#dfba73]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">🍰 DESIGN YOUR MASTERPIECE LIVE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-2">
              Interactive Custom Cake Builder
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-4 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              Select your specifications below and witness your custom cake adapt in real-time. Estimate pricing instantly and dispatch your request directly via WhatsApp checkout!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* BUILDER SIDEBAR CONTROLS */}
            <div className="lg:col-span-7 bg-white dark:bg-[#1c1612] p-6 sm:p-8 rounded-2xl border border-[#dfba73]/20 shadow-xl text-left flex flex-col gap-6">
              
              {/* Option 1: Weight / Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-3">1. Select Cake Weight (Size)</label>
                <div className="grid grid-cols-4 gap-2.5">
                  {(['1kg', '2kg', '3kg', '5kg'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setCustomSize(sz)}
                      className={`py-2.5 rounded-lg font-bold text-xs transition-all ${
                        customSize === sz 
                          ? 'bg-[#4a3728] text-white dark:bg-[#dfba73] dark:text-[#21160c] ring-2 ring-[#dfba73]/50' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#eae3da] hover:bg-gray-200 dark:hover:bg-white/10'
                      }`}
                    >
                      {sz === '1kg' ? '1.5 Lb (1 Kg)' : sz === '2kg' ? '3 Lb (2 Kg)' : sz === '3kg' ? '4.5 Lb (3 Kg)' : '7.5 Lb (5 Kg)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Flavor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-3">2. Select Cake Sponge Flavor</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Belgian Chocolate Fudge', 
                    'Classic Red Velvet', 
                    'Creamy Vanilla Bliss', 
                    'Fresh Strawberry', 
                    'Royal Golden Pineapple'
                  ].map((flv) => (
                    <button
                      key={flv}
                      onClick={() => setCustomFlavor(flv)}
                      className={`py-2 px-3 rounded-lg text-left text-xs font-semibold transition-all h-12 flex items-center ${
                        customFlavor === flv 
                          ? 'bg-[#4a3728]/10 text-[#4a3728] dark:text-[#dfba73] dark:bg-[#dfba73]/10 border-2 border-[#dfba73]' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#eae3da] border border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Tiers */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-3">3. Number of Cake Tiers (Layers)</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[1, 2, 3].map((tr) => (
                    <button
                      key={tr}
                      onClick={() => setCustomTiers(tr)}
                      className={`py-2.5 rounded-lg font-bold text-xs transition-all ${
                        customTiers === tr 
                          ? 'bg-[#4a3728] text-white dark:bg-[#dfba73] dark:text-[#21160c] ring-2 ring-[#dfba73]/50' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#eae3da] hover:bg-gray-200'
                      }`}
                    >
                      {tr} {tr === 1 ? 'Tier' : 'Tiers'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Frosting Base */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-3">4. Choose Frosting Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Rich Buttercream', 'Whipped Cream', 'Cream Cheese', 'Chocolate Ganache'].map((fr) => (
                    <button
                      key={fr}
                      onClick={() => setCustomFrosting(fr)}
                      className={`py-2 rounded-lg font-semibold text-xs transition-all ${
                        customFrosting === fr 
                          ? 'bg-[#4a3728]/10 text-[#4a3728] dark:text-[#dfba73] dark:bg-[#dfba73]/10 border border-[#dfba73]' 
                          : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#eae3da] hover:bg-gray-200'
                      }`}
                    >
                      {fr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 5: Aesthetic Color Theme */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-3">5. Aesthetic Frosting Color Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { name: 'White & Gold', value: '#dfba73' },
                    { name: 'Chocolate Brown', value: '#4a3728' },
                    { name: 'Pastel Pink', value: '#fda4af' },
                    { name: 'Blue Sky', value: '#93c5fd' },
                    { name: 'Forest Green', value: '#86efac' }
                  ].map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setCustomColor(col.name)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                        customColor === col.name 
                          ? 'border-[#dfba73] bg-[#dfba73]/10 text-[#4a3728] dark:text-[#dfba73]' 
                          : 'border-transparent bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#eae3da] hover:bg-gray-200'
                      }`}
                    >
                      <span className="w-4.5 h-4.5 rounded-full border border-black/10" style={{ backgroundColor: col.value }}></span>
                      {col.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 6: Premium Toppings (Multiple) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-2">6. Luxury Toppings (Includes price adjustments)</label>
                <div className="flex flex-wrap gap-2">
                  {['Fresh Berries', 'Chocolate Curls', 'Golden Flakes', 'Macarons', 'Rainbow Sprinkles', 'Fondant Flowers'].map((tp) => {
                    const isSelected = customToppings.includes(tp);
                    return (
                      <button
                        key={tp}
                        onClick={() => {
                          if (isSelected) {
                            setCustomToppings(customToppings.filter(t => t !== tp));
                          } else {
                            setCustomToppings([...customToppings, tp]);
                          }
                        }}
                        className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                          isSelected 
                            ? 'bg-[#dfba73] text-[#21160c] border-[#dfba73]' 
                            : 'bg-transparent border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {isSelected ? '✓' : '+'} {tp}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 7: Written Message on Cake */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c5a880] mb-2">7. Customized Message written on Cake</label>
                <input
                  type="text"
                  maxLength={40}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday Papa, Happy 25th Anniversary!"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1">Maximum 40 characters for perfect visual presentation on cream.</p>
              </div>

            </div>

            {/* LIVE BUILDER PREVIEW & PRICE CARD */}
            <div className="lg:col-span-5 sticky top-24 bg-white dark:bg-[#1c1612] p-6 sm:p-8 rounded-2xl border-2 border-[#dfba73] shadow-xl text-center flex flex-col gap-6">
              
              <h3 className="font-serif text-lg font-black tracking-wide text-[#4a3728] dark:text-white uppercase">Live Design Blueprint</h3>
              
              {/* Visual Interactive 2D Cake Renderer */}
              <div className="w-full h-56 bg-[#fbf9f6] dark:bg-[#120d09] rounded-2xl border border-[#dfba73]/15 flex items-end justify-center pb-8 overflow-hidden relative">
                
                {/* Visual Toppings Layer represented by abstract elements */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
                  {customToppings.map((tp, idx) => (
                    <span key={idx} className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] bg-[#dfba73] text-[#21160c] font-bold shadow animate-bounce">
                      ✨
                    </span>
                  ))}
                </div>

                {/* Cake Tiers stacked */}
                <div className="flex flex-col items-center gap-1.5 w-full max-w-[200px]">
                  
                  {/* Tier 3 (Only visible if 3 tiers) */}
                  {customTiers >= 3 && (
                    <div 
                      className="h-10 rounded-t-lg shadow-md border-b-4 border-black/10 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold uppercase text-white/90"
                      style={{ 
                        width: '55%', 
                        backgroundColor: customColor === 'White & Gold' ? '#fdfdfb' : customColor === 'Chocolate Brown' ? '#4a3728' : customColor === 'Pastel Pink' ? '#fda4af' : customColor === 'Blue Sky' ? '#93c5fd' : '#86efac',
                        borderLeft: `5px solid ${customColor === 'White & Gold' ? '#dfba73' : 'transparent'}`
                      }}
                    >
                      3rd
                    </div>
                  )}

                  {/* Tier 2 (Visible if 2 or 3 tiers) */}
                  {customTiers >= 2 && (
                    <div 
                      className="h-11 rounded-t-lg shadow-md border-b-4 border-black/10 transition-all duration-300 flex items-center justify-center text-[9px] font-mono font-bold uppercase text-white/90"
                      style={{ 
                        width: '75%', 
                        backgroundColor: customColor === 'White & Gold' ? '#fdfdfb' : customColor === 'Chocolate Brown' ? '#4a3728' : customColor === 'Pastel Pink' ? '#fda4af' : customColor === 'Blue Sky' ? '#93c5fd' : '#86efac',
                        borderLeft: `6px solid ${customColor === 'White & Gold' ? '#dfba73' : 'transparent'}`
                      }}
                    >
                      2nd
                    </div>
                  )}

                  {/* Base Tier 1 (Always visible) */}
                  <div 
                    className="h-14 w-full rounded-t-xl shadow-lg border-b-4 border-black/15 transition-all duration-300 flex flex-col items-center justify-center relative"
                    style={{ 
                      backgroundColor: customColor === 'White & Gold' ? '#fdfdfb' : customColor === 'Chocolate Brown' ? '#4a3728' : customColor === 'Pastel Pink' ? '#fda4af' : customColor === 'Blue Sky' ? '#93c5fd' : '#86efac',
                      borderLeft: `8px solid ${customColor === 'White & Gold' ? '#dfba73' : 'transparent'}`
                    }}
                  >
                    {/* Creamy Message written abstractly on base */}
                    <span className="text-[10px] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded font-serif italic text-[#4a3728] dark:text-[#eae3da] max-w-[90%] truncate">
                      "{customMessage || 'Jameel Bakers'}"
                    </span>
                    <span className="text-[9px] font-mono text-gray-400 absolute bottom-1">Base Layer</span>
                  </div>

                </div>

                {/* Bottom elegant stand */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-white/10 dark:via-white/20 dark:to-white/10 rounded-full shadow"></div>
              </div>

              {/* Dynamic Bill Summary */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#120d09] border border-[#dfba73]/15 text-left text-xs flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected Size/Weight:</span>
                  <span className="font-bold">{customSize === '1kg' ? '1.5 Lb (1 Kg)' : customSize === '2kg' ? '3 Lb (2 Kg)' : customSize === '3kg' ? '4.5 Lb (3 Kg)' : '7.5 Lb (5 Kg)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sponge Flavor:</span>
                  <span className="font-bold">{customFlavor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Number of Tiers:</span>
                  <span className="font-bold">{customTiers} {customTiers === 1 ? 'Tier' : 'Tiers'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Premium Frosting:</span>
                  <span className="font-bold">{customFrosting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Toppings Selected:</span>
                  <span className="font-bold max-w-[150px] text-right truncate">{customToppings.join(', ') || 'None'}</span>
                </div>
                <div className="h-[1px] bg-gray-300 dark:bg-white/10 my-1"></div>
                <div className="flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[#4a3728] dark:text-white">Estimated Price:</span>
                  <span className="text-xl font-extrabold text-[#dfba73]">Rs. {customCakePrice}</span>
                </div>
              </div>

              <button
                onClick={handleCustomCakeOrder}
                className="w-full py-3 rounded-xl bg-[#4a3728] text-white hover:bg-[#3b2c20] dark:bg-[#dfba73] dark:text-[#21160c] font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95"
              >
                ✓ Add Custom Cake Design to Order
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC CATEGORIES LISTING */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">🍰 BAKERY RANGE</span>
            <h2 className="font-serif text-3xl font-black text-[#4a3728] dark:text-white mt-1">Explore Cake Categories</h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id === 'birthday' || cat.id === 'wedding' || cat.id === 'anniversary' || cat.id === 'chocolate' || cat.id === 'strawberry' || cat.id === 'pineapple' || cat.id === 'black-forest' || cat.id === 'red-velvet' ? 'cakes' : cat.id === 'cupcakes' || cat.id === 'donuts' || cat.id === 'croissants' ? 'pastries' : cat.id);
                  scrollToId('menu');
                }}
                className="p-4 rounded-xl border border-[#dfba73]/15 bg-white dark:bg-[#1c1612] hover:border-[#dfba73] hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#dfba73]/10 text-[#dfba73] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderCategoryIcon(cat.iconName)}
                </div>
                <h4 className="text-xs font-bold text-[#4a3728] dark:text-[#eae3da]">{cat.name}</h4>
                <span className="text-[10px] text-gray-400 font-mono">{cat.count} Items</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD MENU SECTION */}
      <section id="menu" className="py-20 bg-gradient-to-b from-[#dfba73]/5 to-transparent border-t border-[#dfba73]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">📋 FRESH BAKERY MENU</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-1">
              Order Fresh Delicacies Daily
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              Browse through our authentic, fresh items. Customize or add them straight to your interactive local cart!
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="w-full max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a880] w-4.5 h-4.5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, pizzas, cookies, or shakes..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
              />
            </div>

            {/* Menu Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label: '🍰 All Menu' },
                { id: 'cakes', label: '🎂 Premium Cakes' },
                { id: 'pastries', label: '🧁 Pastries & Cupcakes' },
                { id: 'pizza', label: '🍕 Pizzas' },
                { id: 'sandwiches', label: '🥪 Sandwiches' },
                { id: 'burgers', label: '🍔 Zesty Burgers' },
                { id: 'cookies', label: '🍪 Cookies' },
                { id: 'drinks', label: '🥤 Shakes & Drinks' },
                { id: 'ice cream', label: '🍨 Sundaes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-[#4a3728] text-white dark:bg-[#dfba73] dark:text-[#21160c] shadow' 
                      : 'bg-white dark:bg-[#1c1612] text-gray-600 dark:text-gray-300 border border-[#dfba73]/10 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenuItems.map((item) => (
              <div 
                key={item.id}
                className="rounded-2xl border border-[#dfba73]/15 bg-white dark:bg-[#1c1612] overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all text-left relative"
              >
                {/* Bestseller Badge */}
                {item.isBestSeller && (
                  <span className="absolute top-3 left-3 z-10 bg-[#dfba73] text-[#21160c] font-mono font-bold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                    ★ Best Seller
                  </span>
                )}

                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="p-4 flex flex-col gap-3 flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {item.tags?.map((tag, idx) => (
                        <span key={idx} className="bg-amber-100 dark:bg-amber-950/40 text-[#4a3728] dark:text-[#dfba73] font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#4a3728] dark:text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#dfba73]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">Price</span>
                      <span className="text-base font-extrabold text-[#dfba73]">Rs. {item.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 rounded-lg bg-[#4a3728] text-white hover:bg-[#3b2c20] dark:bg-[#dfba73]/10 dark:text-[#dfba73] dark:hover:bg-[#dfba73]/20 font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Order
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredMenuItems.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500">
                No freshly baked items match your current selection or search term.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* BIRTHDAY REMINDER WIDGET 📅 */}
      <section className="py-20 border-t border-b border-[#dfba73]/10 bg-white dark:bg-[#1c1612]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">📅 BIRTHDAY REMINDER SERVICE</span>
            <h2 className="font-serif text-3xl font-black text-[#4a3728] dark:text-white">
              Never Miss a Loved One\'s Birthday
            </h2>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] leading-relaxed">
              Add your family and friends\' birthdays here. We will calculate countdowns dynamically. When their special day approaches, customize a stunning cake for them, and click to coordinate via WhatsApp instantly!
            </p>

            <form onSubmit={handleAddReminder} className="bg-gray-50 dark:bg-[#120d09] p-5 sm:p-6 rounded-2xl border border-[#dfba73]/25 flex flex-col gap-4 mt-2">
              <h3 className="font-serif font-bold text-sm text-[#4a3728] dark:text-white">Add New Birthday Calendar Target</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={remName}
                    onChange={(e) => setRemName(e.target.value)}
                    placeholder="e.g. Zeeshan"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Your Phone</label>
                  <input 
                    type="text" 
                    value={remPhone}
                    onChange={(e) => setRemPhone(e.target.value)}
                    placeholder="e.g. 03013566601"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Birthday Person Name</label>
                  <input 
                    type="text" 
                    value={remBirthdayName}
                    onChange={(e) => setRemBirthdayName(e.target.value)}
                    placeholder="e.g. Ayesha"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Birthday Date</label>
                  <input 
                    type="date" 
                    value={remDate}
                    onChange={(e) => setRemDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#4a3728] text-white hover:bg-[#3b2c20] font-bold text-xs rounded-lg transition-colors uppercase tracking-wider"
              >
                + Save to Calendar
              </button>
            </form>
          </div>

          {/* ACTIVE BIRTHDAYS FEED */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <h3 className="font-serif font-black text-lg text-[#4a3728] dark:text-white">Active Birthday Reminders</h3>
            <div className="w-12 h-1 bg-[#dfba73] rounded-full"></div>

            <div className="flex flex-col gap-3.5 max-h-[420px] overflow-y-auto pr-2">
              {birthdayReminders.map((rem) => {
                const daysLeft = getDaysLeft(rem.date);
                return (
                  <div 
                    key={rem.id}
                    className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#120d09] flex items-center justify-between gap-4 hover:border-[#dfba73]/50 transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-[#4a3728] dark:text-white">
                        {rem.birthdayName}\'s Birthday
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Saved by: {rem.name} • {new Date(rem.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-red-500 block">
                          {daysLeft} Days Left
                        </span>
                        <button
                          onClick={() => {
                            setCustomMessage(`Happy Birthday ${rem.birthdayName}!`);
                            scrollToId('custom-cake');
                          }}
                          className="text-[10px] text-[#dfba73] hover:underline font-bold"
                        >
                          Build Cake 🍰
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete Reminder"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {birthdayReminders.length === 0 && (
                <div className="py-12 border-2 border-dashed border-gray-200 dark:border-white/15 rounded-2xl text-center text-gray-400 text-xs">
                  Your birthday list is empty. Add your friends above for custom alerts!
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* PORTFOLIO IMAGE GALLERY */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">✨ PHOTO GALLERY</span>
            <h2 className="font-serif text-3xl font-black text-[#4a3728] dark:text-white mt-1">Our Beautiful Cake Gallery</h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              Behold our custom-built marvels, baked in our sanitized kitchen on Dargah Road.
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['All', 'Birthday Cake', 'Wedding Cake', 'Custom Cake', 'Cartoon Cake', 'Floral Cake', 'Heart Cake', 'Photo Cake'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCat(cat)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all ${
                  selectedGalleryCat === cat 
                    ? 'bg-[#dfba73] text-[#21160c] font-bold shadow' 
                    : 'bg-white dark:bg-[#1c1612] text-gray-600 dark:text-gray-300 border border-[#dfba73]/10 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGalleryItems.map((item) => (
              <div 
                key={item.id}
                className="rounded-xl overflow-hidden border border-[#dfba73]/15 bg-white dark:bg-[#1c1612] group hover:shadow-lg transition-all text-left relative"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] text-[#dfba73] font-mono font-bold uppercase tracking-wider">{item.category}</span>
                    <h4 className="text-white font-bold text-sm mt-0.5">{item.title}</h4>
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.title,
                          category: 'Cakes',
                          price: 2500,
                          description: `Standard Gallery order: ${item.title}`
                        });
                      }}
                      className="mt-3 py-1.5 rounded bg-[#dfba73] text-[#21160c] font-bold text-[10px] tracking-wider uppercase text-center"
                    >
                      Instant Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-transparent to-[#dfba73]/5 border-t border-[#dfba73]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">💰 BUDGET OPTIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-1">
              Affordable Luxury Cake Packages
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              We host packages calibrated for small cravings to grand royal events. Choose a package below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PRICING_TIERS.map((tier) => (
              <div 
                key={tier.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between text-left transition-all ${
                  tier.isPopular 
                    ? 'border-[#dfba73] bg-white dark:bg-[#1c1612] ring-4 ring-[#dfba73]/10 relative shadow-xl' 
                    : 'border-[#dfba73]/20 bg-white dark:bg-[#1c1612]/40'
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#dfba73] text-[#21160c] font-mono font-bold text-[9px] tracking-wider uppercase py-1 px-3.5 rounded-full shadow-md">
                    ★ Most Requested
                  </span>
                )}

                <div>
                  <h3 className="font-serif font-black text-lg text-[#4a3728] dark:text-white mb-1">{tier.name}</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-2xl font-black text-[#dfba73]">{tier.price}</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-xs mb-8">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    if (tier.id === 'p4') {
                      scrollToId('custom-cake');
                    } else {
                      addToCart({
                        id: tier.id,
                        name: tier.name,
                        category: 'Cakes',
                        price: parseInt(tier.price.replace(/[^\d]/g, '')) || 3200,
                        description: `Tier selection Package: ${tier.name}`
                      });
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-center transition-all ${
                    tier.isPopular 
                      ? 'bg-[#dfba73] text-[#21160c] hover:bg-[#b08c4a]' 
                      : 'bg-[#4a3728] text-white dark:bg-white/5 hover:bg-[#3b2c20]'
                  }`}
                >
                  {tier.id === 'p4' ? 'Design Cake Now' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ONLINE INTERACTIVE CHECKOUT FORM & ORDER TRACKING 🛒 */}
      <section id="checkout-section" className="py-20 bg-gradient-to-r from-[#dfba73]/5 via-[#4a3728]/5 to-[#dfba73]/5 border-t border-b border-[#dfba73]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">🛒 CASH ON DELIVERY (COD) ORDER DESK</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-1">
              Finalize Your Order Details
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              Fill in your contact information below. Placing an order immediately schedules our baking queue, starts delivery tracking, and builds a customized WhatsApp template ready to click!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* CHECKOUT DETAILS FORM */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white dark:bg-[#1c1612] p-6 sm:p-8 rounded-2xl border border-[#dfba73]/25 shadow-xl flex flex-col gap-5">
              <h3 className="font-serif font-bold text-base text-[#4a3728] dark:text-white border-b border-gray-100 dark:border-white/10 pb-3">Delivery Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    placeholder="e.g. Zeeshan Ahmed"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">WhatsApp Mobile Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={orderPhone}
                    onChange={(e) => setOrderPhone(e.target.value)}
                    placeholder="e.g. +92 301 3566601"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Alternate Mobile Number</label>
                  <input 
                    type="tel" 
                    value={orderSecondaryPhone}
                    onChange={(e) => setOrderSecondaryPhone(e.target.value)}
                    placeholder="e.g. +92 300 4360120"
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Delivery Time Slot *</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none text-gray-700 dark:text-white"
                  >
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
                    <option value="09:00 PM - 11:00 PM">09:00 PM - 11:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Exact Delivery Address in Hala *</label>
                <textarea 
                  rows={3}
                  required
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  placeholder="Street name, landmark, house number, Hala"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Requested Delivery Date *</label>
                  <input 
                    type="date" 
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Payment Method *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-lg border font-bold text-[11px] uppercase text-center transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-[#dfba73] bg-[#dfba73]/10 text-[#4a3728] dark:text-[#dfba73]' 
                          : 'border-gray-200 dark:border-white/5 bg-transparent'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-2.5 rounded-lg border font-bold text-[11px] uppercase text-center transition-all ${
                        paymentMethod === 'bank_transfer' 
                          ? 'border-[#dfba73] bg-[#dfba73]/10 text-[#4a3728] dark:text-[#dfba73]' 
                          : 'border-gray-200 dark:border-white/5 bg-transparent'
                      }`}
                    >
                      EasyPaisa/Bank
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#c5a880] uppercase mb-1.5">Custom Instructions / Special Requests</label>
                <input 
                  type="text" 
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Please send chocolate cake topper, keep pizza extra spicy!"
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent text-sm focus:ring-2 focus:ring-[#dfba73] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-green-900/25 flex items-center justify-center gap-2"
              >
                <MessageSquareText className="w-5 h-5" /> Dispatch Order via WhatsApp
              </button>
            </form>

            {/* SUMMARY & REAL-TIME TRACKING SIDEBAR */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* CART SUMMARY */}
              <div className="bg-white dark:bg-[#1c1612] p-6 sm:p-8 rounded-2xl border border-[#dfba73]/25 shadow-xl text-left">
                <h3 className="font-serif font-bold text-base text-[#4a3728] dark:text-white border-b border-gray-100 dark:border-white/10 pb-3 mb-4">Your Order List</h3>
                
                <div className="flex flex-col gap-3.5 max-h-[220px] overflow-y-auto pr-2 mb-4">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex items-center justify-between gap-4 text-xs py-1.5 border-b border-gray-100 dark:border-white/5 pb-2">
                      <div className="max-w-[190px]">
                        <h4 className="font-bold text-[#4a3728] dark:text-white line-clamp-1">{cartItem.item.name}</h4>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Rs. {cartItem.item.price} each</span>
                      </div>
                      
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded px-2 py-0.5">
                          <button type="button" onClick={() => updateQuantity(cartItem.item.id, -1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Minus className="w-3 h-3" /></button>
                          <span className="font-bold text-xs font-mono">{cartItem.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(cartItem.item.id, 1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Plus className="w-3 h-3" /></button>
                        </div>
                        
                        <button type="button" onClick={() => removeFromCart(cartItem.item.id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <div className="py-10 text-center text-gray-400 text-xs">
                      No cakes or treats selected yet. Add from the menu or standard templates above!
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#120d09] border border-[#dfba73]/15 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cart Subtotal:</span>
                      <span className="font-bold">Rs. {cart.reduce((s, c) => s + c.item.price * c.quantity, 0)}</span>
                    </div>
                    {couponClaimed && (
                      <div className="flex justify-between text-green-500 font-bold">
                        <span>Claimed Coupon (25% Off):</span>
                        <span>- Rs. {Math.round(cart.reduce((s, c) => s + c.item.price * c.quantity, 0) * 0.25)}</span>
                      </div>
                    )}
                    <div className="h-[1px] bg-gray-300 dark:bg-white/10 my-1"></div>
                    <div className="flex justify-between items-baseline text-sm">
                      <span className="font-bold text-[#4a3728] dark:text-white">Grand Total Payable:</span>
                      <span className="text-lg font-extrabold text-[#dfba73]">Rs. {getCartTotal()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* REAL-TIME SIMULATED ORDER TRACKING */}
              <div className="bg-white dark:bg-[#1c1612] p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#dfba73]/30 shadow-xl text-left">
                <h3 className="font-serif font-bold text-base text-[#4a3728] dark:text-white mb-2">Simulated Order Tracking</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-6">See how our professional kitchen processes your cake after submission!</p>
                
                {activeOrder ? (
                  <div className="flex flex-col gap-6">
                    <div className="bg-[#dfba73]/10 p-3 rounded-lg border border-[#dfba73]/20 flex justify-between items-center text-xs text-[#4a3728] dark:text-[#dfba73]">
                      <span><strong>Active ID:</strong> {activeOrder.id}</span>
                      <span className="capitalize font-mono"><strong>Status:</strong> {activeOrder.status.replace('_', ' ')}</span>
                    </div>

                    <div className="relative border-l-2 border-gray-200 dark:border-white/15 ml-3 pl-6 flex flex-col gap-6">
                      {[
                        { step: 'pending', title: 'Order Submitted', desc: 'Schedules on our Hala baking dashboard.' },
                        { step: 'baking', title: 'Oven Baking Process', desc: 'Hygienic sponge cooking in sanitized pans.' },
                        { step: 'decorating', title: 'Custom Frosting & Decorating', desc: 'Crafting gold flakes & premium cream detailing.' },
                        { step: 'out_for_delivery', title: 'Out For Fast Delivery', desc: 'Dispatched with safe, specialized cake boxes.' },
                        { step: 'delivered', title: 'Delivered Successfully', desc: 'Enjoy the premium taste! Leave us a review.' }
                      ].map((st, idx) => {
                        const statusArray = ['pending', 'baking', 'decorating', 'out_for_delivery', 'delivered'];
                        const activeIdx = statusArray.indexOf(activeOrder.status);
                        const isDone = idx <= activeIdx;
                        return (
                          <div key={idx} className="relative">
                            <span className={`absolute -left-[31px] w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center text-[8px] ${
                              isDone ? 'bg-[#dfba73] border-[#dfba73] text-[#21160c]' : 'bg-gray-200 dark:bg-[#1c1612] border-gray-300 text-gray-400'
                            }`}>
                              {isDone ? '✓' : idx + 1}
                            </span>
                            <h4 className={`text-xs font-bold leading-none ${isDone ? 'text-[#dfba73]' : 'text-gray-400'}`}>{st.title}</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{st.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-400 text-xs">
                    No active delivery session. Fill in details and place an order to simulate the tracking line!
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-20 bg-white dark:bg-[#120d09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">⭐⭐⭐⭐⭐ VERIFIED OPINIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-1">
              What Our Hala Community Says
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              Real reviews from real dessert lovers who rely on Jameel Bakers for special occasions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {reviewsList.map((rev) => (
              <div 
                key={rev.id}
                className="p-6 rounded-2xl border border-[#dfba73]/15 bg-[#fbf9f6] dark:bg-[#1c1612] text-left flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#dfba73] mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#dfba73] text-[#dfba73]" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#dfba73]/10">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#4a3728] dark:text-white">{rev.name}</h4>
                    <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD REVIEW FORM */}
          <div className="max-w-xl mx-auto bg-gray-50 dark:bg-[#1c1612] p-6 rounded-2xl border border-[#dfba73]/25 text-left">
            <h3 className="font-serif font-bold text-sm text-[#4a3728] dark:text-white mb-4">Write Your Own Experience Feedback</h3>
            
            <form onSubmit={handleAddReview} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="e.g. Tariq Memon"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Star Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none text-gray-700 dark:text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Your Feedback Comment</label>
                <textarea 
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe your cake visual design, sponge softness, and overall delivery satisfaction..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="py-2 px-6 rounded-lg bg-[#4a3728] hover:bg-[#3b2c20] text-white font-bold text-xs uppercase tracking-wider transition-colors self-start"
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-gradient-to-b from-[#dfba73]/5 to-transparent border-t border-[#dfba73]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">📋 ANSWERS READY</span>
            <h2 className="font-serif text-3xl font-black text-[#4a3728] dark:text-white mt-1">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div 
                key={faq.id}
                className="p-5 rounded-xl border border-[#dfba73]/15 bg-white dark:bg-[#1c1612] shadow-sm flex flex-col gap-2"
              >
                <h4 className="font-serif font-bold text-sm text-[#4a3728] dark:text-white flex items-center gap-2">
                  <span className="text-[#dfba73]">Q.</span> {faq.question}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pl-5 border-l-2 border-[#dfba73]/30">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION, DETAILS & GOOGLE MAPS 🗺️ */}
      <section id="contact" className="py-20 border-t border-[#dfba73]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#dfba73] uppercase">🗺️ VISIT OR COORDINATE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#4a3728] dark:text-white mt-1">
              Contact & Location Map
            </h2>
            <div className="w-16 h-1 bg-[#dfba73] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#5a483a] dark:text-[#ccc2b6] mt-4 leading-relaxed">
              We are located on the famous Dargah Road in Hala. Drop by for a fresh tasting session or get instant delivery to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
            
            {/* Direct Contact Details */}
            <div className="lg:col-span-4 bg-[#4a3728] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-serif text-xl font-bold tracking-wide">JAMEEL BAKERS</h3>
                  <p className="text-[10px] text-gray-300 font-mono tracking-widest uppercase mt-1">Hala, Pakistan</p>
                </div>

                <div className="flex flex-col gap-5 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#dfba73] shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-200">Our Address</h4>
                      <p className="text-gray-300 mt-1 leading-relaxed">{BAKERY_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#dfba73] shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-200">Call Phone Numbers</h4>
                      <div className="flex flex-col gap-1 mt-1 font-mono">
                        {BAKERY_INFO.phones.map(ph => (
                          <a key={ph} href={`tel:${ph.replace(/\s+/g, '')}`} className="text-[#dfba73] hover:underline">{ph}</a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#dfba73] shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-200">Working Hours</h4>
                      <p className="text-gray-300 mt-1 font-mono">{BAKERY_INFO.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-xs">
                <a 
                  href={`https://wa.me/${BAKERY_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 font-bold text-center flex items-center justify-center gap-2"
                >
                  <MessageSquareText className="w-4 h-4" /> Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded Google Maps container */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#dfba73]/25 shadow-xl relative min-h-[350px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.5458129524675!2d68.4235!3d25.8111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzQwLjAiTiA2OMKwMjUnMjQuNiJF!5e0!3m2!1sen!2spk!4v1658300000000!5m2!1sen!2spk"
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '350px' }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Jameel Bakers Hala Dargah Road Location Map"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#dfba73]/15 bg-[#1c1612] text-[#eae3da] py-12 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#dfba73] flex items-center justify-center text-[#21160c] font-serif font-extrabold text-sm">
                JB
              </div>
              <h3 className="font-serif font-extrabold text-lg tracking-wider text-[#dfba73]">{BAKERY_INFO.name}</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Serving premium bakery range, gorgeous multi-tier designer wedding cakes, and delicious local food favorites in Hala since 1995.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfba73] mb-4">Quick Navigation</h4>
            <div className="flex flex-col gap-2 text-xs">
              {['Home', 'About Us', 'Baking Range', 'Interactive Builder'].map((lnk, idx) => (
                <button 
                  key={idx} 
                  onClick={() => scrollToId(lnk === 'Interactive Builder' ? 'custom-cake' : lnk === 'Baking Range' ? 'menu' : lnk.toLowerCase().replace(' ', '-'))}
                  className="hover:text-[#dfba73] text-gray-400 text-left"
                >
                  {lnk}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfba73] mb-4">Gallery Ranges</h4>
            <div className="flex flex-col gap-2 text-xs">
              {['Birthday Cakes', 'Wedding Cakes', 'Custom Creations', 'Floral Desserts'].map((lnk, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    setSelectedGalleryCat(lnk === 'Custom Creations' ? 'Custom Cake' : lnk === 'Floral Desserts' ? 'Floral Cake' : lnk.slice(0, -1));
                    scrollToId('gallery');
                  }}
                  className="hover:text-[#dfba73] text-gray-400 text-left"
                >
                  {lnk}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfba73] mb-4">Contact Directly</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <p>📍 Dargah Road, Hala, Sindh</p>
              <p>📱 +92 301 3566601</p>
              <p>📱 +92 300 4360120</p>
              <p className="text-green-500 font-bold">🟢 WhatsApp Active Daily</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Jameel Bakers Hala. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#checkout-section" className="hover:underline">Privacy Policy</a>
            <a href="#checkout-section" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href={`https://wa.me/${BAKERY_INFO.whatsapp}?text=Salam%20Jameel%20Bakers!%20I%20want%20to%20place%20a%20fresh%20bakery%20order.`} 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-2xl transition-transform hover:scale-110 active:scale-90 flex items-center justify-center cursor-pointer group"
        title="Chat on WhatsApp"
        aria-label="Direct WhatsApp Chat with Bakery"
      >
        <MessageSquareText className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2 whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* USER PROFILE & ORDER HISTORY OVERLAY / SIDE DRAWER */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white dark:bg-[#1c1612] p-6 shadow-2xl flex flex-col justify-between text-left border-l border-[#dfba73]/10 overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/10 pb-4 mb-4 shrink-0">
                <h3 className="font-serif font-black text-lg text-[#4a3728] dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#dfba73]" /> My Profile & History
                </h3>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsEditingProfile(false);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-6 scrollbar-thin pb-6">
                
                {/* 1. USER PROFILE SECTION */}
                <div className="p-4 rounded-xl border border-[#dfba73]/20 bg-gradient-to-br from-[#dfba73]/5 to-transparent">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-xs text-[#dfba73] tracking-wider uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Customer Profile
                    </h4>
                    {!isEditingProfile ? (
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="text-[10px] text-amber-600 dark:text-[#dfba73] font-bold hover:underline flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    ) : null}
                  </div>

                  {!isEditingProfile ? (
                    <div className="flex flex-col gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block uppercase">Full Name</span>
                        <span className="text-sm font-semibold text-[#4a3728] dark:text-[#eae3da]">
                          {orderName || <span className="italic text-gray-400 font-normal">Not configured yet</span>}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 block uppercase">WhatsApp Mobile</span>
                          <span className="text-xs font-mono font-semibold text-[#4a3728] dark:text-[#eae3da]">
                            {orderPhone || <span className="italic text-gray-400 font-normal">Not configured</span>}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 block uppercase">Alternate Phone</span>
                          <span className="text-xs font-mono font-semibold text-[#4a3728] dark:text-[#eae3da]">
                            {orderSecondaryPhone || <span className="italic text-gray-400 font-normal">Not configured</span>}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block uppercase">Delivery Address</span>
                        <span className="text-xs text-[#4a3728] dark:text-[#eae3da]">
                          {orderAddress || <span className="italic text-gray-400 font-normal">Not configured yet</span>}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setIsEditingProfile(false); }} className="flex flex-col gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          placeholder="Zeeshan Ahmed"
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">WhatsApp Phone</label>
                          <input 
                            type="tel" 
                            required
                            value={orderPhone}
                            onChange={(e) => setOrderPhone(e.target.value)}
                            placeholder="03013566601"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Alternate Phone</label>
                          <input 
                            type="tel" 
                            value={orderSecondaryPhone}
                            onChange={(e) => setOrderSecondaryPhone(e.target.value)}
                            placeholder="03004360120"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Delivery Address</label>
                        <textarea 
                          rows={2}
                          value={orderAddress}
                          onChange={(e) => setOrderAddress(e.target.value)}
                          placeholder="e.g. Near Bilal Masjid, Dargah Road, Hala"
                          className="w-full p-2 rounded-lg border border-gray-300 dark:border-white/10 bg-transparent text-xs focus:ring-1 focus:ring-[#dfba73] focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-1">
                        <button 
                          type="button" 
                          onClick={() => {
                            setOrderName(localStorage.getItem('jameel_profile_name') || '');
                            setOrderPhone(localStorage.getItem('jameel_profile_phone') || '');
                            setOrderSecondaryPhone(localStorage.getItem('jameel_profile_sec_phone') || '');
                            setOrderAddress(localStorage.getItem('jameel_profile_address') || '');
                            setIsEditingProfile(false);
                          }}
                          className="px-3 py-1.5 text-[10px] border border-gray-300 dark:border-white/10 rounded-lg hover:bg-black/5 text-gray-500 font-bold"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-3 py-1.5 text-[10px] bg-[#4a3728] hover:bg-[#3b2c20] text-white dark:bg-[#dfba73] dark:text-[#21160c] rounded-lg font-bold flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" /> Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* 2. ORDER HISTORY SECTION */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/10 pb-2">
                    <h4 className="font-bold text-xs text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-[#dfba73]" /> Order History ({orderHistory.length})
                    </h4>
                    {orderHistory.length > 0 && (
                      <button 
                        onClick={handleClearHistory}
                        className="text-[10px] text-red-500 hover:underline flex items-center gap-1 font-semibold"
                        title="Clear History"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    {orderHistory.map((pastOrder) => (
                      <div 
                        key={pastOrder.id} 
                        className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 flex flex-col gap-2"
                      >
                        {/* Order Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono font-bold text-xs text-[#dfba73] block">{pastOrder.id}</span>
                            <span className="text-[9px] text-gray-400 block">{pastOrder.orderDate}</span>
                          </div>
                          
                          {/* Colored status badge */}
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold shrink-0 ${
                            pastOrder.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' :
                            pastOrder.status === 'out_for_delivery' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' :
                            pastOrder.status === 'decorating' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400' :
                            pastOrder.status === 'baking' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' :
                            'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                          }`}>
                            {pastOrder.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="text-xs text-[#4a3728] dark:text-[#ccc2b6] mt-1">
                          {pastOrder.items && pastOrder.items.length > 0 ? (
                            <div className="flex flex-col gap-1 border-t border-b border-gray-100 dark:border-white/5 py-1.5 my-1 bg-white/40 dark:bg-black/10 px-2 rounded-lg">
                              {pastOrder.items.map((i, idx) => (
                                <div key={idx} className="flex justify-between items-center text-[11px]">
                                  <span className="line-clamp-1">{i.item.name} <span className="text-gray-400 font-mono font-bold">x{i.quantity}</span></span>
                                  <span className="font-mono text-gray-500 shrink-0 ml-1">Rs. {i.item.price * i.quantity}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="italic text-gray-400 text-[11px]">{pastOrder.cakeName}</p>
                          )}
                        </div>

                        {/* Order Footer Actions */}
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs font-bold text-[#dfba73]">
                            Total: Rs. {pastOrder.totalPrice || 0}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Delete single past order */}
                            <button
                              onClick={() => handleRemoveFromHistory(pastOrder.id)}
                              className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                              title="Delete past order record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* One click Repeat Order */}
                            <button 
                              onClick={() => handleRepeatOrder(pastOrder)}
                              className="px-3 py-1.5 text-[10px] bg-[#4a3728] text-white hover:bg-[#3b2c20] dark:bg-[#dfba73] dark:text-[#21160c] rounded-lg font-bold flex items-center gap-1 transition-transform active:scale-95 shadow-md"
                            >
                              <RotateCcw className="w-3 h-3" /> Repeat Order
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}

                    {orderHistory.length === 0 && (
                      <div className="py-16 border-2 border-dashed border-gray-100 dark:border-white/10 rounded-2xl text-center text-gray-400 text-xs flex flex-col items-center justify-center gap-2">
                        <History className="w-8 h-8 text-gray-300 dark:text-white/15" />
                        <p>No past orders recorded yet.</p>
                        <p className="text-[10px] text-gray-400/80">Make sure to place an order to see it here!</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART OVERLAY / SIDE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white dark:bg-[#1c1612] p-6 shadow-2xl flex flex-col justify-between text-left border-l border-[#dfba73]/10">
            <div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/10 pb-4 mb-4">
                <h3 className="font-serif font-black text-lg text-[#4a3728] dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#dfba73]" /> Your Order List
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-3 py-2.5 border-b border-gray-100 dark:border-white/5">
                    <img 
                      src={cartItem.item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=150'} 
                      alt={cartItem.item.name} 
                      className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gray-200"
                    />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#4a3728] dark:text-white line-clamp-1">{cartItem.item.name}</h4>
                        <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{cartItem.item.description}</p>
                      </div>

                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-bold text-[#dfba73]">Rs. {cartItem.item.price * cartItem.quantity}</span>
                        
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded px-2 py-0.5">
                          <button onClick={() => updateQuantity(cartItem.item.id, -1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-mono font-bold">{cartItem.quantity}</span>
                          <button onClick={() => updateQuantity(cartItem.item.id, 1)} className="text-gray-500 hover:text-black dark:hover:text-white"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="py-20 text-center text-gray-400 text-xs">
                    No items in your order cart. Add from our fresh cakes, pizzas, croissants, or burgers!
                  </div>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 dark:border-white/10 pt-4 flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-gray-500">Subtotal:</span>
                  <span className="text-base font-extrabold text-[#dfba73]">Rs. {getCartTotal()}</span>
                </div>
                
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToId('checkout-section');
                  }}
                  className="w-full py-3 rounded-xl bg-[#4a3728] text-white hover:bg-[#3b2c20] dark:bg-[#dfba73] dark:text-[#21160c] font-bold text-xs tracking-wider uppercase text-center"
                >
                  Proceed to Order Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
