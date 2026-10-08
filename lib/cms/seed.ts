import type { CmsJson } from "@/lib/db/schema";
import type { ProductData } from "@/lib/cms/types";

export const seedCategories = [
  { slug: "rice-dishes", name: "Rice Dishes", description: "Comforting Ghanaian rice favourites.", image: "/food images/riceandbeansstew.jpeg", icon: "fas fa-bowl-food" },
  { slug: "traditional", name: "Traditional", description: "Classic dishes rooted in Ghanaian tradition.", image: "/food images/Ga Kenkey.jpeg", icon: "fas fa-drumstick-bite" },
  { slug: "gari-specials", name: "Gari Specials", description: "Gari and beans with all the good extras.", image: "/food images/gariandbeans.jpeg", icon: "fas fa-pepper-hot" },
  { slug: "akyeke", name: "Akyeke", description: "Cassava couscous with bold coastal flavours.", image: "/food images/akyeke.jpg", icon: "fas fa-fish" },
  { slug: "snacks", name: "Snacks", description: "Something crispy for every moment.", image: "/food images/springrolls.jpeg", icon: "fas fa-cookie-bite" },
  { slug: "drinks", name: "Drinks", description: "Cold, refreshing favourites.", image: "/food images/hibiscus.jpeg", icon: "fas fa-glass-water" },
] as const;

export const seedProducts: Array<ProductData & { id: string }> = [
  { id: "legacy-rice-beans-stew", category: "rice-dishes", name: "Rice & Beans Stew", desc: "Classic Ghanaian rice and beans served with rich tomato stew. A hearty, satisfying everyday favourite.", price: 30, oldPrice: 38, img: "/food images/riceandbeansstew.jpeg", available: false, featured: true, popular: false, isNew: false, sortOrder: 10, tags: ["rice", "beans"], additionalImages: [], ingredients: "Rice, beans, tomato stew", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-rice-beans-stew-with-fish", category: "rice-dishes", name: "Rice & Beans Stew with Fish", desc: "Rice and beans stew elevated with seasoned fried fish on the side — full Ghanaian vibes.", price: 38, oldPrice: null, img: "/food images/riceandbeansstew.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 20, tags: ["rice", "fish"], additionalImages: [], ingredients: "Rice, beans, fish", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-rice-palava-stew-with-egg", category: "rice-dishes", name: "Rice & Palava Stew with Egg", desc: "Steamed white rice served with rich palava (kontomire) sauce and a boiled egg — pure comfort food.", price: 40, oldPrice: 48, img: "/food images/riceandpalava sauce.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 30, tags: ["rice", "egg"], additionalImages: [], ingredients: "Rice, kontomire, egg", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-rice-vegetable-stew", category: "rice-dishes", name: "Rice & Vegetable Stew", desc: "Light, nutritious rice paired with a fresh garden vegetable stew — clean, balanced, and delicious.", price: 35, oldPrice: 38, img: "/food images/riceandstewandchicken.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 40, tags: ["rice", "vegetables"], additionalImages: [], ingredients: "Rice, vegetables", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-ga-kenkey-fried-fish", category: "traditional", name: "Ga Kenkey & Fried Fish", desc: "Authentic Ga kenkey served with crispy seasoned fried fish and fiery pepper sauce. A true Ghanaian classic.", price: 30, oldPrice: 38, img: "/food images/Ga Kenkey.jpeg", available: false, featured: true, popular: true, isNew: false, sortOrder: 50, tags: ["kenkey", "fish"], additionalImages: [], ingredients: "Ga kenkey, fried fish, pepper sauce", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-waakye", category: "traditional", name: "Waakye", desc: "Iconic Ghanaian waakye (rice & beans) loaded with stew, spaghetti, egg, gari, and plantain. The full experience.", price: 35, oldPrice: 40, img: "/food images/waakye.jpeg", available: false, featured: true, popular: true, isNew: false, sortOrder: 60, tags: ["waakye", "rice"], additionalImages: [], ingredients: "Rice, beans, stew, spaghetti, egg, gari, plantain", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-spaghetti", category: "traditional", name: "Spaghetti", desc: "Ghanaian-style spaghetti cooked with rich tomato and pepper sauce. Served as a standalone or side.", price: 25, oldPrice: 30, img: "/food images/spaghetti.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 70, tags: ["pasta"], additionalImages: [], ingredients: "Spaghetti, tomato, pepper", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-gari-beans-plantain-pear", category: "gari-specials", name: "Gari & Beans with Fried Plantain & Pear", desc: "Creamy gari and beans served with sweet fried plantain and ripe avocado pear. A power combo.", price: 40, oldPrice: 48, img: "/food images/gariandbeans.jpeg", available: false, featured: true, popular: false, isNew: false, sortOrder: 80, tags: ["gari", "beans", "plantain"], additionalImages: [], ingredients: "Gari, beans, plantain, avocado pear", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-gari-beans-plantain", category: "gari-specials", name: "Gari & Beans with Fried Plantain", desc: "Classic gari soakings paired with seasoned beans and golden fried plantain. Simple and satisfying.", price: 45, oldPrice: 48, img: "/food images/gariandbeanswithplantain.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 90, tags: ["gari", "beans", "plantain"], additionalImages: [], ingredients: "Gari, beans, plantain", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-akyeke", category: "akyeke", name: "Akyeke (Attiéké)", desc: "Traditional Ivorian cassava couscous served with grilled fish, spicy pepper sauce, and fresh vegetables.", price: 45, oldPrice: 55, img: "https://i.ibb.co/L2T8BNB/akyeke.jpg", available: false, featured: true, popular: false, isNew: false, sortOrder: 100, tags: ["cassava", "fish"], additionalImages: [], ingredients: "Cassava couscous, fish, pepper, vegetables", size: "", preparation: "Prepared fresh to order" },
  { id: "legacy-spring-rolls", category: "snacks", name: "Spring Rolls", desc: "Crispy golden spring rolls stuffed with spiced vegetables. Perfect as a starter or street-style snack.", price: 10, oldPrice: 15, img: "/food images/springrolls.jpeg", available: true, featured: true, popular: true, isNew: false, sortOrder: 110, tags: ["snack", "vegetables"], additionalImages: [], ingredients: "Pastry, seasoned vegetables", size: "", preparation: "Fried fresh" },
  { id: "legacy-chips", category: "snacks", name: "Chips", desc: "Crispy golden potato chips, perfectly salted and served hot.", price: 5, oldPrice: null, img: "/food images/chips.jpg", available: true, featured: false, popular: false, isNew: false, sortOrder: 120, tags: ["potato", "snack"], additionalImages: [], ingredients: "Potato, salt", size: "", preparation: "Fried fresh" },
  { id: "legacy-pastries", category: "snacks", name: "Pastries", desc: "Freshly baked assorted pastries — meat pie, sausage rolls, and more.", price: 20, oldPrice: null, img: "/food images/patries.jpg", available: true, featured: false, popular: true, isNew: false, sortOrder: 130, tags: ["pastry", "snack"], additionalImages: [], ingredients: "Assorted pastries", size: "", preparation: "Baked fresh" },
  { id: "legacy-plantain-chips", category: "snacks", name: "Plantain Chips", desc: "Crunchy fried plantain chips, sweet and savory — a Ghanaian favorite.", price: 5, oldPrice: null, img: "/food images/plantian chips.jpg", available: true, featured: true, popular: false, isNew: false, sortOrder: 140, tags: ["plantain", "snack"], additionalImages: [], ingredients: "Plantain, salt", size: "", preparation: "Fried fresh" },
  { id: "legacy-hibiscus-juice", category: "drinks", name: "Hibiscus Juice (Sobolo)", desc: "Refreshing chilled hibiscus flower drink blended with ginger and citrus — bold, tangy, and authentic.", price: 7, oldPrice: 10, img: "/food images/hibiscus.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 150, tags: ["sobolo", "drink"], additionalImages: [], ingredients: "Hibiscus, ginger, citrus", size: "", preparation: "Served chilled" },
  { id: "legacy-vico-strawberry", category: "drinks", name: "Vico Strawberry", desc: "Sweet and creamy Vico strawberry flavoured drink — a beloved Ghanaian treat for all ages.", price: 4, oldPrice: 10, img: "/food images/VicoStrawberry.jpeg", available: false, featured: false, popular: false, isNew: false, sortOrder: 160, tags: ["strawberry", "drink"], additionalImages: [], ingredients: "Vico strawberry drink", size: "", preparation: "Served chilled" },
  { id: "legacy-soft-drinks", category: "drinks", name: "Chilled Soft Drinks", desc: "Coke, Fanta, Sprite, or Malta — always ice-cold and served right.", price: 10, oldPrice: null, img: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80&fit=crop", available: false, featured: false, popular: false, isNew: false, sortOrder: 170, tags: ["drink"], additionalImages: [], ingredients: "Assorted soft drinks", size: "", preparation: "Served chilled" },
];

export const seedPromotions = [
  { slug: "waakye-family-box", name: "Waakye Family Box", desc: "Waakye with all toppings for 4 — stew, spaghetti, egg, plantain, and drinks.", price: 100, originalPrice: 120, badge: "17% OFF", img: "/food images/waakye.jpeg", startDate: "", endDate: "" },
  { slug: "kenkey-combo-deal", name: "Kenkey Combo Deal", desc: "Ga Kenkey + fried fish + Sobolo drink — the ultimate classic Ghanaian meal deal.", price: 70, originalPrice: 100, badge: "30% OFF", img: "/food images/Ga Kenkey.jpeg", startDate: "", endDate: "" },
  { slug: "gari-power-plate", name: "Gari Power Plate", desc: "Gari & beans with plantain, pear, and a chilled Vico Strawberry drink.", price: 50, originalPrice: 80, badge: "38% OFF", img: "/food images/gariandbeans.jpeg", startDate: "", endDate: "" },
  { slug: "spring-rolls-party-pack", name: "Spring Rolls Party Pack", desc: "10 crispy spring rolls with dipping sauce — perfect for sharing or snacking.", price: 10, originalPrice: 12, badge: "17% OFF", img: "/food images/springrolls.jpeg", startDate: "", endDate: "" },
] as const;

export const seedPromoMessages = [
  "Free Delivery on Orders Over GH₵100",
  "Fresh Waakye — Served Daily!",
  "Kenkey Combo Deal — GH₵70",
  "Delivering in Elmina & Cape Coast",
  "Authentic Ghanaian Meals — Made Fresh",
  "Real Ghanaian Flavours, Zero Compromise",
  "Order via WhatsApp — Fast & Easy",
  "Rated 4.9★ by Our Customers",
];

export const seedContent: Record<string, CmsJson> = {
  "site-settings": {
    businessName: "Chop",
    tagline: "Taste the Vibe",
    phone: "053 832 5214",
    whatsapp: "055 461 1569",
    email: "",
    address: "Elmina, Ghana",
    locationUrl: "",
    openingHours: "Mon–Sat: 8AM – 11PM\nSunday: 10AM – 9PM",
    instagram: "",
    facebook: "",
    tiktok: "",
    twitter: "",
    defaultSeoTitle: "Chop Ghana | Taste the Vibe",
    metaDescription: "Bold Ghanaian flavours, made fresh in Elmina.",
    socialImage: "/chop.png",
    currency: "GHS",
    websiteStatus: "open",
    footerText: "Made with care in Elmina.",
  },
  homepage: {
    heroTitle: "Taste the Vibe",
    heroSubtitle: "Bold. Fresh. Unmatched.",
    heroDescription: "Experience Ghanaian fast food like never before — crispy, flavourful, and made to hit different every single time. From the heart of Elmina to your doorstep.",
    heroImage: "/food images/akyeke.jpg",
    heroCtaText: "Explore Menu",
    heroCtaLink: "#menu",
    promoHeading: "Today's Special Offers",
    promoText: "Limited time deals — grab them before they're gone!",
    promoImage: "/food images/waakye.jpeg",
    promoBadge: "Hot Deals",
    promoButtonText: "View Deals",
    promoButtonLink: "#deals",
    promoStart: "",
    promoEnd: "",
    showHero: true,
    showPromo: true,
    featuredProductIds: ["legacy-rice-beans-stew", "legacy-ga-kenkey-fried-fish", "legacy-waakye"],
    popularProductIds: ["legacy-ga-kenkey-fried-fish", "legacy-waakye", "legacy-spring-rolls"],
  },
  about: {
    title: "We Don't Just Cook. We Vibe.",
    description: "Born in Elmina, Chop is more than a fast food brand — it's a movement. We blend bold West African flavours with modern fast-food energy to give you an experience that hits different. Fresh ingredients, real spice, and zero compromise.",
    story: "Born in Elmina, Chop brings bold West African flavours to every table.",
    mission: "Serve fresh, flavourful food with Ghanaian pride.",
    vision: "Bring the taste of Elmina to every doorstep.",
    values: "Freshness\nHospitality\nGhanaian pride",
    image: "/food images/riceandbeansstew.jpeg",
    visible: true,
  },
  "delivery-settings": {
    defaultFee: 5,
    freeDeliveryThreshold: 100,
    minimumOrder: 0,
    estimatedTime: "30–45 minutes",
    deliveryAvailable: true,
    instructions: "We deliver across Elmina and Cape Coast.",
    pickupInfo: "Pickup is available in Elmina.",
  },
  "footer-settings": {
    logo: "/choplifelogo1.png",
    businessDescription: "Ghana's boldest fast food brand. Fresh, flavourful meals with a Ghanaian soul and a modern vibe.",
    location: "Elmina, Ghana",
    openingHours: "Mon–Sat: 8AM – 11PM\nSunday: 10AM – 9PM",
    announcement: "Delivering across Elmina and Cape Coast.",
    copyright: "© 2026 Chop Ghana. All rights reserved.",
    showLogo: true,
    showContactDetails: true,
  },
  "promo-messages": { messages: seedPromoMessages },
};

export const seedDeliveryAreas = [
  { name: "Elmina", city: "Elmina", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
  { name: "Cape Coast", city: "Cape Coast", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
  { name: "Elmina — Benya", city: "Elmina - Benya", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
  { name: "Elmina — Bantuma", city: "Elmina - Bantuma", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
  { name: "Cape Coast — Pedu", city: "Cape Coast - Pedu", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
  { name: "Cape Coast — Abura", city: "Cape Coast - Abura", fee: 5, minimumOrder: 0, deliveryTime: "30–45 minutes", instructions: "", available: true },
];

export const seedNavigation = [
  { label: "Home", url: "#hero", section: "header", visible: true },
  { label: "Deals", url: "#deals", section: "header", visible: true },
  { label: "Menu", url: "#menu", section: "header", visible: true },
  { label: "About", url: "#about", section: "header", visible: true },
  { label: "Contact", url: "#contact", section: "header", visible: true },
];
