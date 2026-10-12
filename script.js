// ============================================================
//  IMAGE URLS (using local images for reliability)
// ============================================================
const IMG = {
  logo:          'chop.png',
  chopLifeLogo:  'choplifelogo1.png',
  gaKenkey:      'food images/Ga Kenkey.jpeg',
  gariBeans:     'food images/gariandbeans.jpeg',
  gariBeansPlantain: 'food images/gariandbeanswithplantain.jpeg',
  ghana:         'other images/ghana.png',
  hibiscus:      'food images/hibiscus.jpeg',
  riceBeanStew:  'food images/riceandbeansstew.jpeg',
  palavaStew:    'food images/riceandpalava sauce.jpeg',
  riceVegStew:   'food images/riceandstewandchicken.jpeg',
  spaghetti:     'food images/spaghetti.jpeg',
  springRolls:   'food images/springrolls.jpeg',
  vicoStrawberry:'food images/VicoStrawberry.jpeg',
  waakye:        'food images/waakye.jpeg',
  akyeke:        'https://i.ibb.co/L2T8BNB/akyeke.jpg',
  chips:         'food images/chips.jpg',
  pastries:      'food images/patries.jpg',
  plantainChips: 'food images/plantian chips.jpg',
  // Kept original drinks from old menu
  softDrink:     'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80&fit=crop',
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function safeImageUrl(value) {
  const url = String(value || '');
  if (/^https:\/\//i.test(url) || (url.startsWith('/') && !url.startsWith('//'))) return url;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('//') && !url.split(/[\\/]/).includes('..')) return url;
  return '';
}

// ============================================================
//  MENU DATA
// ============================================================
const menuItems = [
  // === RICE DISHES ===
  {
    id: 1, category: 'Rice Dishes', available: false,
    name: 'Rice & Beans Stew',
    desc: 'Classic Ghanaian rice and beans served with rich tomato stew. A hearty, satisfying everyday favourite.',
    price: 30, oldPrice: 38, hot: false,
    img: IMG.riceBeanStew
  },
  {
    id: 2, category: 'Rice Dishes', available: false,
    name: 'Rice & Beans Stew with Fish',
    desc: 'Rice and beans stew elevated with seasoned fried fish on the side — full Ghanaian vibes.',
    price: 38, oldPrice: null, hot: false,
    img: IMG.riceBeanStew
  },
  {
    id: 3, category: 'Rice Dishes', available: false,
    name: 'Rice & Palava Stew with Egg',
    desc: 'Steamed white rice served with rich palava (kontomire) sauce and a boiled egg — pure comfort food.',
    price: 40, oldPrice: 48, hot: false,
    img: IMG.palavaStew
  },
  {
    id: 4, category: 'Rice Dishes', available: false,
    name: 'Rice & Vegetable Stew',
    desc: 'Light, nutritious rice paired with a fresh garden vegetable stew — clean, balanced, and delicious.',
    price: 35, oldPrice: 38, hot: false,
    img: IMG.riceVegStew
  },

  // === TRADITIONAL MEALS ===
  {
    id: 5, category: 'Traditional', available: false,
    name: 'Ga Kenkey & Fried Fish',
    desc: 'Authentic Ga kenkey served with crispy seasoned fried fish and fiery pepper sauce. A true Ghanaian classic.',
    price: 30, oldPrice: 38, hot: false,
    img: IMG.gaKenkey
  },
  {
    id: 6, category: 'Traditional', available: false,
    name: 'Waakye',
    desc: 'Iconic Ghanaian waakye (rice & beans) loaded with stew, spaghetti, egg, gari, and plantain. The full experience.',
    price: 35, oldPrice: 40, hot: false,
    img: IMG.waakye
  },
  {
    id: 7, category: 'Traditional', available: false,
    name: 'Spaghetti',
    desc: 'Ghanaian-style spaghetti cooked with rich tomato and pepper sauce. Served as a standalone or side.',
    price: 25, oldPrice: 30, hot: false,
    img: IMG.spaghetti
  },

  // === GARI SPECIALS ===
  {
    id: 8, category: 'Gari Specials', available: false,
    name: 'Gari & Beans with Fried Plantain & Pear',
    desc: 'Creamy gari and beans served with sweet fried plantain and ripe avocado pear. A power combo.',
    price: 40, oldPrice: 48, hot: false,
    img: IMG.gariBeans
  },
  {
    id: 9, category: 'Gari Specials', available: false,
    name: 'Gari & Beans with Fried Plantain',
    desc: 'Classic gari soakings paired with seasoned beans and golden fried plantain. Simple and satisfying.',
    price: 45, oldPrice: 48, hot: false,
    img: IMG.gariBeansPlantain
  },

  // === AYKEKE ===
  {
    id: 13, category: 'Akyeke', available: true,
    name: 'Akyeke (Attiéké)',
    desc: 'Traditional Ivorian cassava couscous served with grilled fish, spicy pepper sauce, and fresh vegetables.',
    price: 20, oldPrice: 55, hot: false,
    img: IMG.akyeke
  },

  // === SNACKS ===
  {
    id: 10, category: 'Snacks', available: true,
    name: 'Spring Rolls',
    desc: 'Crispy golden spring rolls stuffed with spiced vegetables. Perfect as a starter or street-style snack.',
    price: 10, oldPrice: 15, hot: false,
    img: IMG.springRolls
  },
  {
    id: 16, category: 'Snacks', available: true,
    name: 'Chips',
    desc: 'Crispy golden potato chips, perfectly salted and served hot.',
    price: 5, oldPrice: null, hot: false,
    img: IMG.chips
  },
  {
    id: 17, category: 'Snacks', available: true,
    name: 'Pastries',
    desc: 'Freshly baked assorted pastries — meat pie, sausage rolls, and more.',
    price: 20, oldPrice: null, hot: true,
    img: IMG.pastries
  },
  {
    id: 18, category: 'Snacks', available: true,
    name: 'Plantain Chips',
    desc: 'Crunchy fried plantain chips, sweet and savory — a Ghanaian favorite.',
    price: 5, oldPrice: null, hot: false,
    img: IMG.plantainChips
  },

  // === DRINKS ===
  {
    id: 11, category: 'Drinks', available: false,
    name: 'Hibiscus Juice (Sobolo)',
    desc: 'Refreshing chilled hibiscus flower drink blended with ginger and citrus — bold, tangy, and authentic.',
    price: 7, oldPrice: 10, hot: false,
    img: IMG.hibiscus
  },
  {
    id: 12, category: 'Drinks', available: false,
    name: 'Vico Strawberry',
    desc: 'Sweet and creamy Vico strawberry flavoured drink — a beloved Ghanaian treat for all ages.',
    price: 4, oldPrice: 10, hot: false,
    img: IMG.vicoStrawberry
  },
  {
    id: 15, category: 'Drinks', available: false,
    name: 'Chilled Soft Drinks',
    desc: 'Coke, Fanta, Sprite, or Malta — always ice-cold and served right.',
    price: 10, oldPrice: null, hot: false,
    img: IMG.softDrink
  }
];

// ============================================================
//  DEALS DATA
// ============================================================
const deals = [
  {
    name: 'Waakye Family Box',
    desc: 'Waakye with all toppings for 4 — stew, spaghetti, egg, plantain, and drinks.',
    price: 100, original: 120, badge: '17% OFF',
    img: IMG.waakye
  },
  {
    name: 'Kenkey Combo Deal',
    desc: 'Ga Kenkey + fried fish + Sobolo drink — the ultimate classic Ghanaian meal deal.',
    price: 70, original: 100, badge: '30% OFF',
    img: IMG.gaKenkey
  },
  {
    name: 'Gari Power Plate',
    desc: 'Gari & beans with plantain, pear, and a chilled Vico Strawberry drink.',
    price: 50, original: 80, badge: '38% OFF',
    img: IMG.gariBeans
  },
  {
    name: 'Spring Rolls Party Pack',
    desc: '10 crispy spring rolls with dipping sauce — perfect for sharing or snacking.',
    price: 10, original: 12, badge: '17% OFF',
    img: IMG.springRolls
  }
];

// ============================================================
//  PROMO MESSAGES
// ============================================================
const promoMessages = [
  '🔥 Free Delivery on Orders Over GH₵100',
  '⚡ Fresh Waakye — Served Daily!',
  '🎉 Kenkey Combo Deal — GH₵40 Only!',
  '📍 Delivering in Elmina & Cape Coast',
  '🍽️ Authentic Ghanaian Meals — Made Fresh',
  '💯 Real Ghanaian Flavours, Zero Compromise',
  '🚀 Order via WhatsApp — Fast & Easy',
  '🏆 Rated 4.9★ by Our Customers',
];

let siteContent = {};
let siteCategories = [];
let deliveryAreas = [];
let deliverySettings = { freeDeliveryMinimum: 100, defaultDeliveryFee: 5, currency: 'GH₵' };
let navigationItems = [];
let shopSmsNumber = '0554611569';
let lastPublicDataRefresh = 0;

// ============================================================
//  PAGE ROUTER (single-page navigation: Home/Deals/Menu/About/Contact)
// ============================================================
const PAGE_HREFS = { home: '#hero', deals: '#deals', menu: '#menu', about: '#about', contact: '#contact' };
const PAGE_LABELS = { home: 'Home', deals: 'Deals', menu: 'Menu', about: 'About', contact: 'Contact' };

function currentPageName() {
  const hash = decodeURIComponent((location.hash || '').replace(/^#/, ''));
  return PAGE_HREFS[hash] ? hash : 'home';
}

function setPageEnabled(element, enabled) {
  if (element) element.dataset.enabled = enabled ? 'true' : 'false';
}

function applyPageVisibility() {
  const active = currentPageName();
  document.querySelectorAll('[data-page]').forEach(element => {
    element.hidden = element.dataset.page !== active || element.dataset.enabled === 'false';
  });
  const footer = document.getElementById('footer');
  if (footer) footer.hidden = footer.dataset.enabled === 'false';
  document.querySelectorAll('.nav-links a, .drawer-nav a').forEach(link => {
    const isActive = link.getAttribute('href') === PAGE_HREFS[active];
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function showPage({ scroll = true } = {}) {
  applyPageVisibility();
  const page = currentPageName();
  const businessName = siteContent.businessName || 'Chop';
  document.title = page === 'home'
    ? (siteContent.seoTitle || `${businessName} — Taste the Vibe`)
    : `${businessName} — ${PAGE_LABELS[page]}`;
  // Legacy links to the old game section anchor now scroll to the game strip on Home
  if (decodeURIComponent(location.hash) === '#chop-catcher') {
    document.getElementById('chop-catcher')?.scrollIntoView({ behavior: 'smooth' });
  } else if (scroll) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  // Safety net: reveal entrance-animated content even if the observer has not fired
  window.setTimeout(() => {
    document.querySelectorAll(`[data-page="${page}"] .slide-up`).forEach(element => element.classList.add('visible'));
  }, 900);
}

function navigateTo(page) {
  const target = PAGE_HREFS[page] || PAGE_HREFS.home;
  if (location.hash === target) showPage();
  else location.hash = target;
}

window.addEventListener('hashchange', () => showPage());

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.textContent = value;
}

function applySiteContent(content) {
  siteContent = content || {};
  deliverySettings = {
    freeDeliveryMinimum: Number(content.freeDeliveryMinimum ?? 100),
    defaultDeliveryFee: Number(content.defaultDeliveryFee ?? 5),
    currency: content.currency || 'GH₵'
  };
  shopSmsNumber = String(content.whatsappNumber || '0554611569').replace(/[^\d+]/g, '') || '0554611569';
  const hero = document.getElementById('hero');
  const about = document.getElementById('about');
  const dealsSection = document.getElementById('deals');
  const contact = document.getElementById('contact');
  const footer = document.getElementById('footer');
  setPageEnabled(hero, content.heroVisible !== false);
  setPageEnabled(about, content.aboutVisible !== false);
  setPageEnabled(dealsSection, content.dealsVisible !== false);
  setPageEnabled(contact, content.contactVisible !== false);
  setPageEnabled(footer, content.footerVisible !== false);
  setText('#heroBadgeText', content.heroBadge);
  setText('.preloader-tagline', content.tagline);
  const heading = document.querySelector('.hero-title');
  if (heading) {
    const brand = document.createElement('span');
    brand.className = 'brand';
    brand.textContent = `${content.businessName || 'Chop'}.`;
    heading.replaceChildren(brand, document.createTextNode(` ${content.heroHeading || 'Taste the Vibe'}`));
  }
  const navBrand = document.querySelector('.nav-logo-text');
  const footerBrand = document.querySelector('.footer-logo-name');
  if (navBrand && content.businessName) navBrand.innerHTML = `${escapeHtml(content.businessName)}<span>.</span>`;
  if (footerBrand && content.businessName) footerBrand.innerHTML = `${escapeHtml(content.businessName)}<span>.</span>`;
  setText('.hero-subtitle', content.heroSubheading);
  setText('.hero-desc', content.heroDescription);
  const heroImage = document.querySelector('.hero-food-img');
  if (heroImage && safeImageUrl(content.heroImage)) heroImage.src = safeImageUrl(content.heroImage);
  const logoImage = safeImageUrl(content.logoImage);
  if (logoImage) {
    const logo = document.querySelector('.nav-logo img');
    if (logo) logo.src = logoImage;
  }
  const footerLogo = document.querySelector('#footerLogoImage');
  if (footerLogo && safeImageUrl(content.footerLogo || content.logoImage)) footerLogo.src = safeImageUrl(content.footerLogo || content.logoImage);
  const favicon = document.getElementById('siteFavicon');
  if (favicon && safeImageUrl(content.faviconImage)) favicon.href = safeImageUrl(content.faviconImage);
  const aboutImages = document.querySelectorAll('.about-img-stack img');
  if (aboutImages[0] && safeImageUrl(content.aboutImage)) aboutImages[0].src = safeImageUrl(content.aboutImage);
  if (aboutImages[1] && safeImageUrl(content.aboutSecondImage)) aboutImages[1].src = safeImageUrl(content.aboutSecondImage);
  const primary = document.querySelector('.btn-hero-primary');
  const secondary = document.querySelector('.btn-hero-secondary');
  if (primary && content.heroPrimaryButton) primary.innerHTML = `<i class="fas fa-utensils" style="margin-right:8px"></i>${escapeHtml(content.heroPrimaryButton)}`;
  if (secondary && content.heroSecondaryButton) secondary.innerHTML = `<i class="fas fa-tag" style="margin-right:8px"></i>${escapeHtml(content.heroSecondaryButton)}`;
  setText('[data-content="dealsHeading"]', content.dealsHeading);
  setText('[data-content="dealsDescription"]', content.dealsDescription);
  setText('[data-content="aboutHeading"]', content.aboutHeading);
  const aboutDescription = document.getElementById('aboutDescription');
  if (aboutDescription && content.aboutDescription) aboutDescription.textContent = content.aboutDescription;
  setText('#aboutMissionText', content.aboutMission);
  setText('#aboutVisionText', content.aboutVision);
  setText('#aboutValuesText', content.aboutValues);
  const aboutMvv = document.querySelector('.about-mvv');
  if (aboutMvv) {
    const details = aboutMvv.closest('details');
    const hasMvv = content.aboutMission || content.aboutVision || content.aboutValues;
    if (details) details.hidden = !hasMvv;
    aboutMvv.hidden = !hasMvv;
  }
  const aboutValues = [
    [content.aboutFeatureOneTitle, content.aboutFeatureOneBody],
    [content.aboutFeatureTwoTitle, content.aboutFeatureTwoBody],
    [content.aboutFeatureThreeTitle, content.aboutFeatureThreeBody]
  ];
  document.querySelectorAll('.about-feature').forEach((feature, index) => {
    const [title, body] = aboutValues[index] || [];
    if (title) feature.querySelector('h4').textContent = title;
    if (body) feature.querySelector('p').textContent = body;
  });
  setText('.footer-desc', content.footerDescription);
  setText('.footer-delivery p', content.deliveryDescription);
  setText('#contactWhatsappText', content.whatsappNumber);
  setText('#contactPhoneText', content.phoneNumber);
  setText('#contactLocationText', content.location ? `📍 ${content.location}` : '');
  const contactEmail = document.getElementById('contactEmailText');
  if (contactEmail) {
    contactEmail.textContent = content.email || '';
    contactEmail.hidden = !content.email;
  }
  const currencyLabels = document.querySelectorAll('.currency, .cur');
  currencyLabels.forEach(label => { label.textContent = deliverySettings.currency; });
  setText('#footerWhatsapp', content.whatsappNumber);
  setText('#footerPhone', content.phoneNumber);
  setText('#footerLocation', content.location || '');
  const locationLink = document.getElementById('footerLocation');
  if (locationLink) {
    locationLink.href = /^https:\/\//i.test(content.googleMapsUrl || '') ? content.googleMapsUrl : '#';
    locationLink.target = content.googleMapsUrl ? '_blank' : '';
    locationLink.rel = content.googleMapsUrl ? 'noopener' : '';
  }
  const footerHours = document.getElementById('footerHours');
  if (footerHours && content.businessHours) footerHours.innerHTML = escapeHtml(content.businessHours).replace(/\n/g, '<br>');
  const copyright = document.querySelector('.footer-bottom > p');
  if (copyright && content.footerCopyright) copyright.textContent = content.footerCopyright;
  document.querySelectorAll('[data-social]').forEach(link => {
    const key = link.dataset.social;
    const target = key === 'whatsapp' ? `https://wa.me/${shopSmsNumber.replace(/\D/g, '')}` : content[key];
    if (target && /^(https:\/\/|mailto:|tel:)/i.test(target)) {
      link.href = target;
      link.hidden = false;
    } else if (key !== 'whatsapp') {
      link.hidden = true;
    }
  });
  const whatsappCard = document.getElementById('contactWhatsappCard');
  if (whatsappCard) whatsappCard.onclick = () => window.open(`https://wa.me/${shopSmsNumber.replace(/\D/g, '')}`, '_blank', 'noopener');
  const phoneCard = document.getElementById('contactPhoneCard');
  if (phoneCard) phoneCard.onclick = () => window.open(`tel:${String(content.phoneNumber || '').replace(/[^\d+]/g, '')}`, '_self');
  const title = document.querySelector('title');
  if (title && content.seoTitle) title.textContent = content.seoTitle;
  const currency = document.querySelector('.cart-bar-total .cur');
  if (currency) currency.textContent = deliverySettings.currency;
  const freeDeliveryBadge = document.querySelector('.hero-floating-badge.bottom-left small');
  if (freeDeliveryBadge) freeDeliveryBadge.textContent = `Orders over ${deliverySettings.currency}${deliverySettings.freeDeliveryMinimum}`;
  const featuredHeroProduct = menuItems.find(item => item.id === 13) || menuItems.find(item => item.featured);
  const heroProductBadge = document.getElementById('heroSellingText');
  if (heroProductBadge) {
    heroProductBadge.textContent = featuredHeroProduct
      ? `${featuredHeroProduct.name} — ${deliverySettings.currency}${Number(featuredHeroProduct.price).toFixed(2)}`
      : '';
  }
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.name = 'description';
    document.head.appendChild(description);
  }
  if (content.seoDescription) description.content = content.seoDescription;
  applyPageVisibility();
}

function renderAnnouncements(announcements) {
  const section = document.getElementById('announcementSection');
  const list = document.getElementById('announcementList');
  if (!section || !list) return;
  const published = Array.isArray(announcements) ? announcements : [];
  setPageEnabled(section, published.length > 0);
  list.innerHTML = published.map(item => {
    const title = escapeHtml(item.title);
    const message = escapeHtml(item.message);
    const link = /^https:\/\//i.test(item.link || '') || (item.link || '').startsWith('/') ? item.link : '';
    return `<article class="announcement-card">${item.image_url && safeImageUrl(item.image_url) ? `<img src="${escapeHtml(safeImageUrl(item.image_url))}" alt="" loading="lazy">` : ''}<div><strong>${title}</strong><p>${message}</p>${link ? `<a href="${escapeHtml(link)}" rel="noopener">Learn more</a>` : ''}</div></article>`;
  }).join('');
}

function renderNavigation(items) {
  if (!Array.isArray(items)) return;
  const desktop = document.querySelector('.nav-links');
  const mobile = document.querySelector('.drawer-nav');
  const links = items.filter(item => item.visible !== false);
  if (desktop) desktop.replaceChildren(...links.map(item => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = item.href;
    anchor.textContent = item.label;
    li.appendChild(anchor);
    return li;
  }));
  if (mobile) mobile.replaceChildren(...links.map(item => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = item.href;
    anchor.textContent = item.label;
    anchor.addEventListener('click', closeDrawer);
    li.appendChild(anchor);
    return li;
  }));
}

function renderFooterCategories() {
  if (!siteCategories.length) return;
  const footerLists = document.querySelectorAll('.footer-col .footer-links');
  const list = footerLists[1];
  if (!list) return;
  list.replaceChildren(...siteCategories.map(category => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = '#menu';
    const icon = document.createElement('i');
    icon.className = 'fas fa-chevron-right';
    anchor.append(icon, document.createTextNode(category.name));
    li.appendChild(anchor);
    return li;
  }));
}

async function bootstrapSiteData() {
  try {
    const response = await fetch('/api/site', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Site content request failed (${response.status}).`);
    const data = await response.json();
    lastPublicDataRefresh = Date.now();

    if (Array.isArray(data.menuItems)) {
      menuItems.splice(0, menuItems.length, ...data.menuItems.map(item => ({
        ...item,
        id: Number(item.id),
        category: item.category || 'General',
        available: item.available !== false,
        featured: Boolean(item.featured),
        popular: Boolean(item.popular),
        hot: Boolean(item.hot || item.featured),
        desc: item.desc || item.description || '',
        img: safeImageUrl(item.img || item.image_url || item.imageUrl) || IMG.akyeke,
        oldPrice: item.oldPrice ?? item.old_price ?? null
      })));
    }

    if (Array.isArray(data.deals)) {
      deals.splice(0, deals.length, ...data.deals.map(item => ({
        ...item,
        name: item.name || 'Deal',
        desc: item.desc || item.description || '',
        price: Number(item.price || 0),
        original: item.originalPrice ?? item.original_price ?? Number(item.price || 0),
        badge: item.badge || 'Deal',
        img: safeImageUrl(item.img || item.image_url) || IMG.waakye,
        active: item.active !== false
      })));
    }

    if (Array.isArray(data.promoMessages)) {
      promoMessages.splice(0, promoMessages.length, ...data.promoMessages);
    }

    siteCategories = Array.isArray(data.categories) ? data.categories : [];
    deliveryAreas = Array.isArray(data.deliveryAreas) ? data.deliveryAreas.filter(area => area.enabled !== false && area.enabled !== 0) : [];
    navigationItems = Array.isArray(data.navigation) ? data.navigation : [];
    applySiteContent(data.content || data.businessInfo || {});
    renderAnnouncements(data.announcements);
    renderNavigation(navigationItems);
    renderFooterCategories();
  } catch (error) {
    console.warn('Falling back to the bundled CHOP menu data.', error);
  }
}

async function refreshPublicContent() {
  if (document.visibilityState !== 'visible' || document.getElementById('cart-sidebar').classList.contains('open')) return;
  if (Date.now() - lastPublicDataRefresh < 60000) return;
  await bootstrapSiteData();
  if (currentCategory !== 'All' && !getCategories().includes(currentCategory)) currentCategory = 'All';
  const currentItems = new Map(menuItems.map(item => [item.id, item]));
  const previousCount = cart.length;
  cart = cart.flatMap(item => {
    const current = currentItems.get(item.id);
    return current && current.available !== false ? [{ ...current, qty: item.qty }] : [];
  });
  buildPromoStrip();
  buildDeals();
  buildCategoryTabs();
  buildMenuGrid();
  updateCart();
  if (cart.length < previousCount) showToast('Some cart items are no longer available and were removed.');
}

// ============================================================
//  CART STATE
// ============================================================
let cart = [];
let currentCategory = 'All';
let currentCartTab = 'order';

// ============================================================
//  BUILD PROMO STRIP
// ============================================================
function buildPromoStrip() {
  const track = document.getElementById('promoTrack');
  const strip = document.getElementById('promo-strip');
  const doubled = [...promoMessages, ...promoMessages];
  track.hidden = doubled.length === 0;
  setPageEnabled(strip, doubled.length > 0);
  applyPageVisibility();
  track.innerHTML = doubled.map(msg => `
    <div class="promo-item">
      <i class="fas fa-star"></i>${escapeHtml(msg)}
      <span class="promo-dot"></span>
    </div>
  `).join('');
}

// ============================================================
//  BUILD DEALS
// ============================================================
function buildDeals() {
  const grid = document.getElementById('dealsGrid');
  const section = document.getElementById('deals');
  setPageEnabled(section, deals.length > 0 && siteContent.dealsVisible !== false);
  applyPageVisibility();
  grid.innerHTML = deals.map(d => `
    <div class="deal-card" onclick="showToast('Deal added to inquiry!')">
      <div class="deal-img-wrap">
        <img src="${escapeHtml(safeImageUrl(d.img))}" alt="${escapeHtml(d.name)}" />
      </div>
      <div class="deal-info">
        <span class="deal-badge">${escapeHtml(d.badge)}</span>
        <div class="deal-name">${escapeHtml(d.name)}</div>
        <div class="deal-desc">${escapeHtml(d.desc)}</div>
        <div class="deal-price">${escapeHtml(deliverySettings.currency)}${Number(d.price).toFixed(2)} <span>${d.original == null ? '' : `${escapeHtml(deliverySettings.currency)}${Number(d.original).toFixed(2)}`}</span></div>
      </div>
    </div>
  `).join('');
}

// ============================================================
//  CATEGORIES & TABS
// ============================================================
function getCategories() {
  const names = siteCategories.length
    ? siteCategories.map(category => category.name)
    : menuItems.map(item => item.category);
  return ['All', ...new Set(names)];
}

const categoryIcons = {
  'All':           'fas fa-th',
  'Rice Dishes':   'fas fa-bowl-food',
  'Traditional':   'fas fa-drumstick-bite',
  'Gari Specials': 'fas fa-pepper-hot',
  'Snacks':        'fas fa-cookie-bite',
  'Drinks':        'fas fa-cup-straw'
};

function buildCategoryTabs() {
  const tabs = document.getElementById('categoryTabs');
  tabs.replaceChildren(...getCategories().map(cat => {
    const button = document.createElement('button');
    button.className = `tab-btn ${cat === currentCategory ? 'active' : ''}`;
    const icon = document.createElement('i');
    icon.className = categoryIcons[cat] || 'fas fa-star';
    button.append(icon, document.createTextNode(cat));
    button.addEventListener('click', () => filterCategory(cat));
    return button;
  }));
}

function filterCategory(cat) {
  currentCategory = cat;
  buildCategoryTabs();
  buildMenuGrid();
}

// ============================================================
//  BUILD MENU GRID
// ============================================================
function buildMenuGrid() {
  const grid = document.getElementById('menuGrid');
  const filtered = currentCategory === 'All'
    ? menuItems
    : menuItems.filter(i => i.category === currentCategory);

  grid.innerHTML = filtered.map(item => {
    const cartItem = cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;
    const isAvail = item.available !== false;
    return `
      <div class="food-card${!isAvail ? ' unavailable' : ''}" id="card-${item.id}">
        <div class="food-card-img-wrap">
          <img src="${escapeHtml(safeImageUrl(item.img))}" alt="${escapeHtml(item.name)}" style="${!isAvail ? 'filter: grayscale(0.6) brightness(0.65);' : ''}" />
          <span class="food-category-badge">${escapeHtml(item.category)}</span>
          ${item.hot ? '<span class="food-hot-badge">HOT</span>' : ''}
          ${!isAvail ? '<span class="food-unavailable-badge">Out of Stock</span>' : ''}
        </div>
        <div class="food-card-body" style="${!isAvail ? 'opacity:0.7' : ''}">
          <div class="food-name">${escapeHtml(item.name)}</div>
          <div class="food-desc">${escapeHtml(item.desc)}</div>
          <div class="food-card-footer">
            <div class="food-price">
              <span class="currency">${escapeHtml(deliverySettings.currency)}</span>${Number(item.price).toFixed(2)}
              ${item.oldPrice ? `<span class="old-price">${escapeHtml(deliverySettings.currency)}${Number(item.oldPrice).toFixed(2)}</span>` : ''}
            </div>
            ${!isAvail
              ? `<button class="btn-unavailable" disabled><i class="fas fa-clock"></i></button>`
              : qty === 0
                ? `<button class="btn-add-cart" onclick="addToCart(${item.id})"><i class="fas fa-plus"></i></button>`
                : `<div class="quantity-controls">
                     <button class="qty-btn minus" onclick="updateCardQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                     <span class="qty-num">${qty}</span>
                     <button class="qty-btn plus" onclick="updateCardQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                   </div>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
  buildShowcaseProducts();
}

function buildShowcaseProducts() {
  const groups = [
    [document.getElementById('featuredProductsSection'), document.getElementById('featuredProductsGrid'), item => item.featured],
    [document.getElementById('popularProductsSection'), document.getElementById('popularProductsGrid'), item => item.popular]
  ];
  groups.forEach(([section, grid, isSelected]) => {
    if (!section || !grid) return;
    const items = menuItems.filter(item => isSelected(item) && item.status === 'published');
    setPageEnabled(section, items.length > 0);
    applyPageVisibility();
    grid.innerHTML = items.map(item => `
      <article class="showcase-card">
        <img src="${escapeHtml(safeImageUrl(item.img))}" alt="${escapeHtml(item.name)}" loading="lazy">
        <div class="showcase-card-info">
          <strong>${escapeHtml(item.name)}</strong>
          <p>${escapeHtml(item.desc)}</p>
          <button type="button" onclick="addToCart(${Number(item.id)})" ${item.available === false ? 'disabled' : ''}>
            ${item.available === false ? 'Out of stock' : `${escapeHtml(deliverySettings.currency)}${Number(item.price).toFixed(2)} · Add`}
          </button>
        </div>
      </article>
    `).join('');
  });
}

// ============================================================
//  CART LOGIC
// ============================================================
function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (!item || item.available === false) {
    showToast('This item is currently unavailable');
    return;
  }
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...item, qty: 1 }); }
  updateCart();
  buildMenuGrid();
  showToast(`${item.name} added to cart!`);
  animateCartCount();
}

function updateCardQty(id, delta) {
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) cart = cart.filter(c => c.id !== id);
  }
  updateCart();
  buildMenuGrid();
}

function updateCartItemQty(id, delta) {
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) cart = cart.filter(c => c.id !== id);
  }
  updateCart();
  buildMenuGrid();
  renderCartBody();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
  buildMenuGrid();
  renderCartBody();
}

function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getGameDeliveryReward() {
  const reward = JSON.parse(localStorage.getItem('chopCatcherPromo') || 'null');
  const score = Number(reward?.score);
  return reward && Number.isFinite(score) && score >= 10000 ? reward : null;
}
function getDeliveryFee() {
  if (getCartTotal() >= deliverySettings.freeDeliveryMinimum || getGameDeliveryReward()) return 0;
  const selected = deliveryAreas.find(area => area.name === localStorage.getItem('custCity'));
  return Number(selected?.fee ?? deliverySettings.defaultDeliveryFee);
}

function getDeliveryMarkup() {
  const selected = localStorage.getItem('custCity') || '';
  const options = deliveryAreas.map(area => `
    <option value="${escapeHtml(area.name)}" ${selected === area.name ? 'selected' : ''}>${escapeHtml(area.name)}${Number(area.fee) ? ` — ${escapeHtml(deliverySettings.currency)}${Number(area.fee).toFixed(2)}` : ' — Free delivery'}</option>
  `).join('');
  return `<select id="custCity"><option value="">${deliveryAreas.length ? 'Choose a delivery area' : 'Confirm delivery area with Chop'}</option>${options}<option value="Other" ${selected === 'Other' ? 'selected' : ''}>Other / confirm with Chop</option></select>`;
}

function updateDeliverySelection() {
  const selector = document.getElementById('custCity');
  if (selector) {
    selector.addEventListener('change', () => {
      localStorage.setItem('custCity', selector.value);
      renderCartBody();
    });
  }
}

function updateCart() {
  const count = getCartCount();
  const total = getCartTotal();
  document.getElementById('navCartCount').textContent = count;
  document.getElementById('cartBarCount').textContent = `${count} item${count !== 1 ? 's' : ''} in cart`;
  document.getElementById('cartBarTotal').textContent = total.toFixed(2);
  const bar = document.getElementById('cart-bar');
  count > 0 ? bar.classList.add('visible') : bar.classList.remove('visible');
  if (document.getElementById('cart-sidebar').classList.contains('open')) renderCartBody();
}

function animateCartCount() {
  const el = document.getElementById('navCartCount');
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 400);
}

// ============================================================
//  CART SIDEBAR
// ============================================================
function openCart() {
  closeChat();
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.classList.add('cart-open');
  document.body.style.overflow = 'hidden';
  switchCartTab('order');
  renderCartBody();
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
  document.body.classList.remove('cart-open');
  document.body.style.overflow = '';
}

function switchCartTab(tab) {
  currentCartTab = tab;
  document.querySelectorAll('.cart-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.add('active');
  renderCartBody();
}

function renderCartBody() {
  const body = document.getElementById('cartBody');
  const btn = document.getElementById('whatsappBtn');

  if (currentCartTab === 'order') {
    btn.innerHTML = '<i class="fas fa-arrow-right"></i> Continue to Details';
    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Your cart is empty</p>
          <small>Browse the menu and add your favourites!</small>
        </div>`;
      return;
    }
    const delivery = getDeliveryFee();
    const total = getCartTotal() + delivery;
    body.innerHTML = `
      ${cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${escapeHtml(safeImageUrl(item.img))}" alt="${escapeHtml(item.name)}" />
          <div class="cart-item-details">
            <div class="cart-item-name">${escapeHtml(item.name)}</div>
            <div class="cart-item-price">${escapeHtml(deliverySettings.currency)}${(item.price * item.qty).toFixed(2)}</div>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn minus" onclick="updateCartItemQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn plus" onclick="updateCartItemQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        </div>
      `).join('')}
      <div class="cart-summary-box">
        <div class="cart-summary-row"><span>Subtotal</span><span>${escapeHtml(deliverySettings.currency)}${getCartTotal().toFixed(2)}</span></div>
        <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : `${escapeHtml(deliverySettings.currency)}${delivery.toFixed(2)}`}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>${escapeHtml(deliverySettings.currency)}${total.toFixed(2)}</span></div>
        ${getGameDeliveryReward() && getCartTotal() < deliverySettings.freeDeliveryMinimum
          ? '<p style="font-size:0.72rem;color:#16864a;margin-top:6px;text-align:center">🎁 Your Chop Catcher reward covers delivery on this order!</p>'
          : getCartTotal() < deliverySettings.freeDeliveryMinimum
            ? `<p style="font-size:0.72rem;color:var(--amber);margin-top:6px;text-align:center">Add ${escapeHtml(deliverySettings.currency)}${(deliverySettings.freeDeliveryMinimum-getCartTotal()).toFixed(2)} more for free delivery!</p>`
            : ''}
      </div>
    `;
  } else if (currentCartTab === 'checkout') {
    btn.innerHTML = '<i class="fas fa-comment-sms"></i> Send Order by SMS';
    body.innerHTML = `
      <div class="checkout-form">
        <div class="form-section-title"><i class="fas fa-user"></i>Your Information</div>
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="custName" placeholder="Kwame Mensah" value="${escapeHtml(localStorage.getItem('custName')||'')}" />
        </div>
        <div class="form-group">
          <label>Phone / WhatsApp *</label>
          <input type="tel" id="custPhone" placeholder="055 123 4567" value="${escapeHtml(localStorage.getItem('custPhone')||'')}" />
        </div>
        <div class="form-group">
          <label>Email Address (for order confirmation)</label>
          <input type="email" id="custEmail" placeholder="yourname@gmail.com" value="${escapeHtml(localStorage.getItem('custEmail')||'')}" />
        </div>
        <div class="form-section-title"><i class="fas fa-map-marker-alt"></i>Delivery Details</div>
        <div class="form-group">
          <label>Delivery Address *</label>
          <input type="text" id="custAddress" placeholder="Street, town or landmark" value="${escapeHtml(localStorage.getItem('custAddress')||'')}" />
        </div>
        <div class="form-group">
          <label>City / Area</label>
          ${getDeliveryMarkup()}
        </div>
        <div class="form-section-title"><i class="fas fa-receipt"></i>Payment</div>
        <div style="background:rgba(255,176,0,0.08);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:10px 14px;margin-bottom:0.8rem;font-size:0.75rem;color:rgba(39,4,4,0.65);line-height:1.6">
          <i class="fas fa-info-circle" style="color:var(--amber);margin-right:6px"></i>
          Place your order now. The Chop team will contact you to confirm payment and delivery.
        </div>
        <div class="form-section-title"><i class="fas fa-sticky-note"></i>Order Notes</div>
        <div class="form-group">
          <label>Special Instructions</label>
          <textarea id="custNotes" placeholder="e.g. Extra pepper sauce, no onions, ring bell on arrival...">${escapeHtml(localStorage.getItem('custNotes')||'')}</textarea>
        </div>
        <button type="button" class="mobile-send-order" onclick="handleCartAction()">
          <i class="fas fa-comment-sms"></i> Send Order by SMS
        </button>
      </div>
    `;
    updateDeliverySelection();
  } else if (currentCartTab === 'confirm') {
    const name = localStorage.getItem('custName') || '';
    const phone = localStorage.getItem('custPhone') || '';
    const address = localStorage.getItem('custAddress') || '';
    const city = localStorage.getItem('custCity') || 'Elmina';
    const notes = localStorage.getItem('custNotes') || '';
    const email = localStorage.getItem('custEmail') || '';
    const delivery = getDeliveryFee();
    const total = getCartTotal() + delivery;
    btn.innerHTML = '<i class="fas fa-comment-sms"></i> Place Order by SMS';
    body.innerHTML = `
      <div style="padding:0.5rem 0">
        <div style="background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(37,211,102,0.03));border:1px solid rgba(37,211,102,0.2);border-radius:14px;padding:1rem;margin-bottom:1.2rem;display:flex;align-items:center;gap:10px">
          <i class="fas fa-check-circle" style="color:#25D366;font-size:1.2rem"></i>
          <div>
            <div style="font-weight:800;font-size:0.88rem;color:var(--dark)">Ready to order!</div>
            <div style="font-size:0.75rem;color:rgba(39,4,4,0.5)">Review your details below</div>
          </div>
        </div>
        <div style="background:rgba(255,176,0,0.08);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:10px 14px;margin-bottom:1rem;font-size:0.75rem;color:rgba(39,4,4,0.65);line-height:1.6">
          <i class="fas fa-info-circle" style="color:var(--amber);margin-right:6px"></i>
          No online payment is required here. Submit the order and the Chop team will confirm payment and delivery with you.
        </div>

        <div class="cart-summary-box" style="margin-bottom:1rem">
          <div style="font-weight:800;font-size:0.82rem;color:var(--dark);margin-bottom:0.7rem;text-transform:uppercase;letter-spacing:0.5px">Order Summary</div>
          ${cart.map(i => `
            <div class="cart-summary-row">
              <span>${escapeHtml(i.name)} x${i.qty}</span>
              <span style="color:var(--dark);font-weight:700">${escapeHtml(deliverySettings.currency)}${(i.price * i.qty).toFixed(2)}</span>
            </div>`).join('')}
          <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : `${escapeHtml(deliverySettings.currency)}${delivery.toFixed(2)}`}</span></div>
          <div class="cart-summary-row total"><span>TOTAL</span><span>${escapeHtml(deliverySettings.currency)}${total.toFixed(2)}</span></div>
        </div>
        <div style="background:rgba(39,4,4,0.04);border-radius:14px;padding:1rem">
          <div style="font-weight:800;font-size:0.82rem;color:var(--dark);margin-bottom:0.7rem;text-transform:uppercase;letter-spacing:0.5px">Your Details</div>
          ${name ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-user" style="color:var(--red);margin-right:6px;width:14px"></i>${escapeHtml(name)}</div>` : ''}
          ${phone ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-phone" style="color:var(--red);margin-right:6px;width:14px"></i>${escapeHtml(phone)}</div>` : ''}
          ${email ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-envelope" style="color:var(--red);margin-right:6px;width:14px"></i>${escapeHtml(email)}</div>` : ''}
          ${address ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-map-marker-alt" style="color:var(--red);margin-right:6px;width:14px"></i>${escapeHtml(address)}, ${escapeHtml(city)}</div>` : ''}
          ${notes ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65)"><i class="fas fa-sticky-note" style="color:var(--red);margin-right:6px;width:14px"></i>${escapeHtml(notes)}</div>` : ''}
        </div>
      </div>
    `;
  }
}

function handleCartAction() {
  if (currentCartTab === 'order') {
    if (cart.length === 0) { showToast('Add items to your cart first!'); return; }
    switchCartTab('checkout');
  } else if (currentCartTab === 'checkout') {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const city = document.getElementById('custCity').value;
    const notes = document.getElementById('custNotes').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const payMethodEl = document.querySelector('input[name="payMethod"]:checked');
    const payMethod = payMethodEl ? payMethodEl.value : '';
    if (!name || !phone || !address) { showToast('Please fill in all required fields!'); return; }
    if (deliveryAreas.length && !city) { showToast('Please choose a delivery area.'); return; }
    if (getCartTotal() < Number(deliverySettings.minimumOrder || 0)) {
      showToast(`The minimum order is ${deliverySettings.currency}${Number(deliverySettings.minimumOrder).toFixed(2)}.`);
      return;
    }
    localStorage.setItem('custName', name);
    localStorage.setItem('custPhone', phone);
    localStorage.setItem('custEmail', email);
    localStorage.setItem('custAddress', address);
    localStorage.setItem('custCity', city);
    localStorage.setItem('custNotes', notes);
    localStorage.setItem('custPayMethod', 'To be confirmed');
    submitOrder();
  } else if (currentCartTab === 'confirm') {
    submitOrder();
  }
}

// ============================================================
//  CONFIG — Set your keys here
// ============================================================
// BUSINESS NUMBERS (for SMS confirmations)
const SHOP_NUMBER_MTN = '0554611569';   // MTN Momo
const SHOP_NUMBER_TELECEL = '0509511619'; // Telecel Cash

// ============================================================
//  ORDER SUBMISSION
// ============================================================
async function submitOrder() {
  const name = localStorage.getItem('custName') || '';
  const phone = localStorage.getItem('custPhone') || '';
  const email = localStorage.getItem('custEmail') || phone + '@chopgh.com';
  const delivery = getDeliveryFee();
  const total = getCartTotal() + delivery;
  const orderId = 'CHOP-' + Date.now().toString().slice(-6);
  const address = localStorage.getItem('custAddress') || '';
  const city = localStorage.getItem('custCity') || 'Elmina';
  const notes = localStorage.getItem('custNotes') || '';
  const itemsList = cart.map(i => `${i.name} x${i.qty} - ${deliverySettings.currency}${(i.price * i.qty).toFixed(2)}`).join('\n');
  const usedGameReward = getCartTotal() < deliverySettings.freeDeliveryMinimum && Boolean(getGameDeliveryReward());
  showGlobalLoading('Sending your order...');
  try {
    sendSMSNotification(orderId, total, name, phone, email, address, city, notes, itemsList);
    localStorage.setItem('lastOrderId', orderId);
    localStorage.setItem('lastOrderTotal', total);
    hideGlobalLoading();
    showReceipt(orderId, total, name, phone, email, address, city, notes, 'To be confirmed');
    if (usedGameReward) {
      localStorage.removeItem('chopCatcherPromo');
      refreshGameRewardNotice();
    }
  } catch (error) {
    hideGlobalLoading();
    showToast(error.message || 'Unable to send your order. Please try again.');
  }
}

function refreshGameRewardNotice() {
  const notice = document.getElementById('gameRewardNotice');
  if (notice) notice.hidden = !getGameDeliveryReward();
}

function submitItemRequest(event) {
  event.preventDefault();
  const name = document.getElementById('requestName').value.trim();
  const phone = document.getElementById('requestPhone').value.trim();
  const type = document.getElementById('requestType').value;
  const item = document.getElementById('requestItem').value.trim();
  const details = document.getElementById('requestDetails').value.trim();
  const smsBody = `CHOP MENU REQUEST\nName: ${name}\nPhone: ${phone}\nCategory: ${type}\nRequested item: ${item}\nDetails: ${details || 'None'}\nSent from the Chop website`;
  window.location.href = `sms:${SHOP_NUMBER_MTN}?body=${encodeURIComponent(smsBody)}`;
}

function sendSMSNotification(orderId, total, name, phone, email, address, city, notes, itemsList) {
  const delivery = getDeliveryFee();
  const smsBody = `CHOP ORDER #${orderId}\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}, ${city}\nItems:\n${itemsList}\nDelivery: ${delivery === 0 ? 'FREE' : `${deliverySettings.currency}${delivery.toFixed(2)}`}\nTotal: ${deliverySettings.currency}${total.toFixed(2)}\nNotes: ${notes || 'None'}\nPayment: To be confirmed`;
  window.open(`sms:${shopSmsNumber || SHOP_NUMBER_MTN}?body=${encodeURIComponent(smsBody)}`, '_blank');
}

// ============================================================
//  RECEIPT MODAL
// ============================================================
function showReceipt(orderId, total, name, phone, email, address, city, notes, payMethod) {
  const delivery = getDeliveryFee();
  document.getElementById('receiptOrderId').textContent = '#' + orderId;
  document.getElementById('receiptItems').innerHTML = cart.map(i => `
    <div class="receipt-item">
      <span>${escapeHtml(i.name)} ×${i.qty}</span>
      <span>${escapeHtml(deliverySettings.currency)}${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('') + `
    <div class="receipt-item">
      <span>Delivery</span>
      <span>${delivery === 0 ? 'FREE' : escapeHtml(deliverySettings.currency) + delivery.toFixed(2)}</span>
    </div>
  `;
  document.getElementById('receiptTotal').textContent = `${deliverySettings.currency}${total.toFixed(2)}`;
  document.getElementById('receiptCustomer').innerHTML = `
    <div class="receipt-customer-row"><strong>Name:</strong> ${escapeHtml(name)}</div>
    <div class="receipt-customer-row"><strong>Phone:</strong> ${escapeHtml(phone)}</div>
    ${email ? `<div class="receipt-customer-row"><strong>Email:</strong> ${escapeHtml(email)}</div>` : ''}
    <div class="receipt-customer-row"><strong>Address:</strong> ${escapeHtml(address)}, ${escapeHtml(city)}</div>
    ${notes ? `<div class="receipt-customer-row"><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ''}
    <div style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px dashed rgba(39,4,4,0.12)">
      <div style="font-size:0.75rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.5rem">Payment</div>
      <div style="font-size:0.8rem;color:rgba(39,4,4,0.65)">To be confirmed by the Chop team.</div>
    </div>
    <div style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px dashed rgba(39,4,4,0.12)">
      <div style="font-size:0.72rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">📬 Confirmation Status</div>
      <div style="font-size:0.78rem;color:rgba(39,4,4,0.6);line-height:1.9">
        <div><i class="fas fa-check-circle" style="color:#25D366;font-size:0.7rem;margin-right:4px"></i> Order details ready for the Chop team</div>
        <div><i class="fas fa-comment-sms" style="color:var(--amber);font-size:0.7rem;margin-right:4px"></i> Owner SMS draft opened for sending</div>
      </div>
    </div>
      <div style="margin-top:0.5rem;background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(37,211,102,0.03));border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:10px 14px;font-size:0.73rem;color:rgba(39,4,4,0.65);line-height:1.6">
        <i class="fas fa-info-circle" style="color:#25D366;margin-right:6px"></i>
        <strong style="color:var(--dark)">What happens next:</strong> The Chop team will confirm your payment and delivery time with you.
      </div>
      </div>
    </div>
  `;
  document.getElementById('receiptModal').classList.add('show');
  closeCart();
}

function selectPayMethod(method) {
  localStorage.setItem('custPayMethod', method);
  const mtnLabel = document.getElementById('mtnLabel');
  const telcelLabel = document.getElementById('telcelLabel');
  const mtnCheck = document.getElementById('mtnCheck');
  const telcelCheck = document.getElementById('telcelCheck');
  if (mtnLabel && telcelLabel) {
    if (method === 'MTN') {
      mtnLabel.style.borderColor = '#FFCC00';
      mtnLabel.style.boxShadow = '0 0 0 3px rgba(255,204,0,0.15)';
      telcelLabel.style.borderColor = 'rgba(39,4,4,0.1)';
      telcelLabel.style.boxShadow = 'none';
      if (mtnCheck) mtnCheck.innerHTML = '<i class="fas fa-check-circle" style="color:#FFCC00"></i>';
      if (telcelCheck) telcelCheck.innerHTML = '';
    } else {
      telcelLabel.style.borderColor = '#E31235';
      telcelLabel.style.boxShadow = '0 0 0 3px rgba(227,18,53,0.1)';
      mtnLabel.style.borderColor = 'rgba(39,4,4,0.1)';
      mtnLabel.style.boxShadow = 'none';
      if (telcelCheck) telcelCheck.innerHTML = '<i class="fas fa-check-circle" style="color:#E31235"></i>';
      if (mtnCheck) mtnCheck.innerHTML = '';
    }
  }
}

function closeReceipt() {
  document.getElementById('receiptModal').classList.remove('show');
  cart = [];
  updateCart();
  buildMenuGrid();
  // Clear stored customer data for fresh next order
  ['custName','custPhone','custEmail','custAddress','custCity','custNotes','custPayMethod'].forEach(k => localStorage.removeItem(k));
}

// ============================================================
//  DRAWER
// ============================================================
function toggleDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const ham = document.getElementById('hamburger');
  const opening = !drawer.classList.contains('open');
  if (opening) closeChat();
  drawer.classList.toggle('open');
  overlay.classList.toggle('show');
  ham.classList.toggle('active');
  document.body.classList.toggle('drawer-open', opening);
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}
function closeDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('active');
  document.body.classList.remove('drawer-open');
  document.body.style.overflow = '';
}

// ============================================================
//  TOAST — single queued notification, dismissible, never blocks ordering
// ============================================================
const toastQueue = [];
let toastActive = false;
let toastTimer = null;

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const icon = document.getElementById('toastIcon');
  if (!toast || !msgEl) return;
  // Queue instead of stacking: a second call while one is visible waits its turn
  if (toastActive) { toastQueue.push({ msg, type }); return; }
  msgEl.textContent = msg;
  if (icon) {
    icon.className = 'fas toast-icon ' + (type === 'error' ? 'fa-exclamation-triangle' : type === 'warning' ? 'fa-exclamation-circle' : 'fa-check-circle');
    icon.style.color = type === 'error' ? 'var(--red)' : type === 'warning' ? 'var(--amber)' : '';
  }
  toast.dataset.type = type;
  toast.classList.add('show');
  toastActive = true;
  toastTimer = setTimeout(() => dismissToast(), type === 'error' ? 6000 : 3200);
}

function dismissToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.remove('show');
  toastActive = false;
  clearTimeout(toastTimer);
  if (toastQueue.length) showToast(toastQueue.shift().msg, toastQueue.length ? toastQueue[0].type : 'success');
}

document.getElementById('toastClose')?.addEventListener('click', dismissToast);
// Tap outside the notification also dismisses it (common on mobile)
document.getElementById('toast')?.addEventListener('click', event => {
  if (event.target.closest('.toast-close')) return;
  dismissToast();
});

// ============================================================
//  NAVBAR SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================================
//  SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));
}

// ============================================================
//  FEEDBACK FORM
// ============================================================
function submitFeedback(e) {
  e.preventDefault();
  const name = document.getElementById('feedbackName').value;
  const phone = document.getElementById('feedbackPhone').value;
  const msg = document.getElementById('feedbackMsg').value;
  showGlobalLoading('Sending feedback...');
  const waMsg = `💬 *Feedback for CHOP*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n\n📝 Message:\n${msg}\n\n_Sent via Chop Website_`;
  setTimeout(() => { window.open(`https://wa.me/${shopSmsNumber.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`, '_blank', 'noopener'); hideGlobalLoading(); }, 600);
  showToast('Thanks for your feedback, ' + name + '! 🙏');
  document.getElementById('feedbackForm').reset();
}

// ============================================================
//  AI CHATBOT
// ============================================================
const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const chatSubtitle = document.getElementById('chatSubtitle');
let chatHistory = [];
let chatBusy = false;
let chatGreeted = false;

function chatScrollToBottom() {
  if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setChatStatus(text) {
  if (chatSubtitle) chatSubtitle.textContent = text;
}

function appendChatMessage(role, text) {
  if (!chatMessages) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-msg ${role}`;
  const paragraph = document.createElement('p');
  paragraph.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
  bubble.appendChild(paragraph);
  chatMessages.appendChild(bubble);
  chatScrollToBottom();
}

function showChatTyping() {
  if (!chatMessages || document.getElementById('chatTyping')) return;
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot typing';
  typing.id = 'chatTyping';
  typing.setAttribute('aria-label', 'The Chop assistant is typing');
  typing.innerHTML = '<span class="chat-dot"></span><span class="chat-dot"></span><span class="chat-dot"></span>';
  chatMessages.appendChild(typing);
  chatScrollToBottom();
}

function hideChatTyping() {
  document.getElementById('chatTyping')?.remove();
}

function openChat() {
  if (!chatPanel) return;
  chatPanel.hidden = false;
  chatFab?.setAttribute('aria-expanded', 'true');
  chatFab?.classList.add('is-open');
  if (!chatGreeted) {
    chatGreeted = true;
    appendChatMessage('bot', "Hi! 👋 I'm the Chop assistant. Ask me about our menu, prices, deals, or delivery in Elmina & Cape Coast.");
  }
  setTimeout(() => chatInput?.focus(), 60);
}

function closeChat() {
  if (!chatPanel || chatPanel.hidden) return;
  chatPanel.hidden = true;
  chatFab?.setAttribute('aria-expanded', 'false');
  chatFab?.classList.remove('is-open');
}

async function sendChatMessage(text) {
  const message = String(text || '').trim();
  if (!message || chatBusy) return;
  appendChatMessage('user', message);
  chatHistory.push({ role: 'user', content: message });
  if (chatHistory.length > 12) chatHistory = chatHistory.slice(-12);
  chatBusy = true;
  if (chatInput) chatInput.value = '';
  setChatStatus('Chop is typing...');
  showChatTyping();
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `The assistant could not respond (HTTP ${response.status}).`);
    const reply = String(data.reply || '').trim() || "Sorry, I didn't quite catch that. Could you ask again?";
    appendChatMessage('bot', reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 12) chatHistory = chatHistory.slice(-12);
    setChatStatus('Ask about our menu, deals & delivery');
  } catch (error) {
    appendChatMessage('bot', `⚠️ ${error.message || 'Something went wrong. Please try again in a moment.'}`);
    setChatStatus('Connection issue — try again');
  } finally {
    hideChatTyping();
    chatBusy = false;
    chatInput?.focus();
  }
}

if (chatFab) {
  chatFab.addEventListener('click', () => {
    if (chatPanel.hidden) openChat();
    else closeChat();
  });
}
if (chatForm) {
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    sendChatMessage(chatInput?.value || '');
  });
}
document.getElementById('chatClose')?.addEventListener('click', closeChat);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && chatPanel && !chatPanel.hidden) closeChat();
});

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  refreshGameRewardNotice();
  bootstrapSiteData().finally(() => {
    buildPromoStrip();
    buildDeals();
    buildCategoryTabs();
    buildMenuGrid();
    initScrollAnimations();
    showPage({ scroll: false });

    // Hide preloader after page loads
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.classList.add('hidden');
    }, 1800);
  });
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshPublicContent();
});
window.addEventListener('storage', event => {
  if (event.key !== 'chopCatcherPromo') return;
  refreshGameRewardNotice();
  if (cart.length) renderCartBody();
});
setInterval(refreshPublicContent, 60000);

// Fallback: hide preloader after 4s max (prevents stuck loader)
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
  }
}, 4000);

// ============================================================
//  GLOBAL LOADING HELPER
// ============================================================
function showGlobalLoading(msg) {
  const overlay = document.getElementById('globalLoadingOverlay');
  const text = document.getElementById('globalLoadingText');
  if (text && msg) text.textContent = msg;
  if (overlay) overlay.classList.add('show');
}
function hideGlobalLoading() {
  const overlay = document.getElementById('globalLoadingOverlay');
  if (overlay) overlay.classList.remove('show');
}
