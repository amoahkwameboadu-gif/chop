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

// ============================================================
//  MENU DATA
// ============================================================
let menuItems = [
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
    id: 13, category: 'Akyeke', available: false,
    name: 'Akyeke (Attiéké)',
    desc: 'Traditional Ivorian cassava couscous served with grilled fish, spicy pepper sauce, and fresh vegetables.',
    price: 45, oldPrice: 55, hot: false,
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
let deals = [
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
let promoMessages = [
  '🔥 Free Delivery on Orders Over GH₵100',
  '⚡ Fresh Waakye — Served Daily!',
  '🎉 Kenkey Combo Deal — GH₵40 Only!',
  '📍 Delivering in Elmina & Cape Coast',
  '🍽️ Authentic Ghanaian Meals — Made Fresh',
  '💯 Real Ghanaian Flavours, Zero Compromise',
  '🚀 Order via WhatsApp — Fast & Easy',
  '🏆 Rated 4.9★ by Our Customers',
];

// ============================================================
//  CART STATE
// ============================================================
let cart = [];
let currentCategory = 'All';
let currentCartTab = 'order';
let currentCheckout = { name: '', phone: '', email: '', address: '', city: 'Elmina', notes: '' };
let orderSubmitting = false;
let storefrontData = {
  initialized: false,
  siteSettings: { businessName: 'Chop', currency: 'GHS', websiteStatus: 'open', whatsapp: '055 461 1569', phone: '053 832 5214' },
  homepage: {},
  about: {},
  footerSettings: {},
  deliverySettings: { defaultFee: 5, freeDeliveryThreshold: 100, minimumOrder: 0, deliveryAvailable: true },
  deliveryAreas: [
    { name: 'Elmina', city: 'Elmina', fee: 5, minimumOrder: 0, available: true },
    { name: 'Cape Coast', city: 'Cape Coast', fee: 5, minimumOrder: 0, available: true },
    { name: 'Elmina — Benya', city: 'Elmina - Benya', fee: 5, minimumOrder: 0, available: true },
    { name: 'Elmina — Bantuma', city: 'Elmina - Bantuma', fee: 5, minimumOrder: 0, available: true },
    { name: 'Cape Coast — Pedu', city: 'Cape Coast - Pedu', fee: 5, minimumOrder: 0, available: true },
    { name: 'Cape Coast — Abura', city: 'Cape Coast - Abura', fee: 5, minimumOrder: 0, available: true }
  ],
  navigation: []
};

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>\"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;'
  })[character]);
}

function inlineArgument(value) {
  return escapeHtml(JSON.stringify(String(value)));
}

function sameItemId(left, right) {
  return String(left) === String(right);
}

function currencySymbol() {
  return ({ GHS: 'GH₵', USD: '$', GBP: '£', EUR: '€' })[storefrontData.siteSettings.currency] || 'GH₵';
}

function formatPrice(value) {
  const amount = Number(value);
  return `${currencySymbol()}${Number.isFinite(amount) ? amount.toFixed(Number.isInteger(amount) ? 0 : 2) : '0'}`;
}

function safeLink(value, fallback = '#menu') {
  const candidate = String(value ?? '').trim();
  if (candidate.startsWith('#') || (candidate.startsWith('/') && !candidate.startsWith('//'))) return candidate;
  try {
    return ['https:', 'mailto:', 'tel:'].includes(new URL(candidate).protocol) ? candidate : fallback;
  } catch {
    return fallback;
  }
}

function getDeliveryArea(city = currentCheckout.city) {
  return storefrontData.deliveryAreas.find(area => String(area.city ?? area.name) === String(city));
}

function deliveryAreaOptions() {
  const areas = storefrontData.deliveryAreas;
  if (areas.length && !areas.some(area => String(area.city ?? area.name) === currentCheckout.city)) {
    const firstAvailable = areas.find(area => area.available !== false) || areas[0];
    currentCheckout.city = String(firstAvailable.city ?? firstAvailable.name ?? '');
  }
  if (!areas.length) return '<option value="">No delivery areas are configured</option>';
  return areas.map(area => {
    const city = String(area.city ?? area.name ?? '');
    const selected = city === currentCheckout.city ? ' selected' : '';
    const disabled = area.available === false ? ' disabled' : '';
    return `<option value="${escapeHtml(city)}"${selected}${disabled}>${escapeHtml(area.name ?? city)}</option>`;
  }).join('');
}

function getDeliveryFee(subtotal = getCartTotal(), city = currentCheckout.city) {
  const threshold = Number(storefrontData.deliverySettings.freeDeliveryThreshold ?? 100);
  if (threshold > 0 && subtotal >= threshold) return 0;
  const fee = Number(getDeliveryArea(city)?.fee ?? storefrontData.deliverySettings.defaultFee ?? 5);
  return Number.isFinite(fee) ? Math.max(0, fee) : 0;
}

// ============================================================
//  BUILD PROMO STRIP
// ============================================================
function buildPromoStrip() {
  const track = document.getElementById('promoTrack');
  const doubled = [...promoMessages, ...promoMessages];
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
  grid.innerHTML = deals.map(d => `
    <a class="deal-card" href="${escapeHtml(safeLink(d.ctaHref))}" style="color:inherit;text-decoration:none">
      <div class="deal-img-wrap">
        <img src="${escapeHtml(d.img)}" alt="${escapeHtml(d.name)}" loading="lazy" />
      </div>
      <div class="deal-info">
        <span class="deal-badge">${escapeHtml(d.badge)}</span>
        <div class="deal-name">${escapeHtml(d.name)}</div>
        <div class="deal-desc">${escapeHtml(d.desc)}</div>
        <div class="deal-price">${formatPrice(d.price)} ${(d.originalPrice ?? d.original) ? `<span>${formatPrice(d.originalPrice ?? d.original)}</span>` : ''}</div>
        ${d.ctaText ? `<span class="deal-cta">${escapeHtml(d.ctaText)}</span>` : ''}
      </div>
    </a>
  `).join('');
}

// ============================================================
//  CATEGORIES & TABS
// ============================================================
function getCategories() {
  return ['All', ...new Set(menuItems.map(i => i.category))];
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
  tabs.innerHTML = getCategories().map(cat => `
    <button class="tab-btn ${cat === currentCategory ? 'active' : ''}" onclick="filterCategory(${inlineArgument(cat)})">
      <i class="${categoryIcons[cat] || 'fas fa-star'}"></i>${cat}
    </button>
  `).join('');
}

function filterCategory(cat) {
  currentCategory = cat;
  buildCategoryTabs();
  buildMenuGrid();
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
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
    const cartItem = cart.find(c => sameItemId(c.id, item.id));
    const qty = cartItem ? cartItem.qty : 0;
    const isAvail = item.available !== false && storefrontData.siteSettings.websiteStatus === 'open' && storefrontData.deliverySettings.deliveryAvailable !== false;
    return `
      <div class="food-card${!isAvail ? ' unavailable' : ''}" id="card-${escapeHtml(item.id)}">
        <div class="food-card-img-wrap">
          <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}" loading="lazy" style="${!isAvail ? 'filter: grayscale(0.6) brightness(0.65);' : ''}" />
          <span class="food-category-badge">${escapeHtml(item.category)}</span>
          ${item.hot ? '<span class="food-hot-badge">HOT</span>' : ''}
          ${!isAvail ? `<span class="food-unavailable-badge">${item.available === false ? 'Coming Soon' : 'Ordering Closed'}</span>` : ''}
        </div>
        <div class="food-card-body" style="${!isAvail ? 'opacity:0.7' : ''}">
          <div class="food-name">${escapeHtml(item.name)}</div>
          <div class="food-desc">${escapeHtml(item.desc)}</div>
          <div class="food-card-footer">
            <div class="food-price">
              <span class="currency">${escapeHtml(currencySymbol())}</span>${Number(item.price).toFixed(Number.isInteger(Number(item.price)) ? 0 : 2)}
              ${item.oldPrice ? `<span class="old-price">${formatPrice(item.oldPrice)}</span>` : ''}
            </div>
            ${!isAvail
              ? `<button class="btn-unavailable" disabled aria-label="${item.available === false ? 'Currently unavailable' : 'Ordering closed'}"><i class="fas fa-clock"></i></button>`
              : qty === 0
                ? `<button class="btn-add-cart" aria-label="Add ${escapeHtml(item.name)} to cart" onclick="addToCart(${inlineArgument(item.id)})"><i class="fas fa-plus"></i></button>`
                : `<div class="quantity-controls">
                     <button class="qty-btn minus" aria-label="Remove one ${escapeHtml(item.name)}" onclick="updateCardQty(${inlineArgument(item.id)}, -1)"><i class="fas fa-minus"></i></button>
                     <span class="qty-num">${qty}</span>
                     <button class="qty-btn plus" aria-label="Add one ${escapeHtml(item.name)}" onclick="updateCardQty(${inlineArgument(item.id)}, 1)"><i class="fas fa-plus"></i></button>
                   </div>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
//  CART LOGIC
// ============================================================
function addToCart(id) {
  const item = menuItems.find(i => sameItemId(i.id, id));
  if (!item || item.available === false) {
    showToast('This item is currently unavailable');
    return;
  }
  if (storefrontData.siteSettings.websiteStatus !== 'open' || storefrontData.deliverySettings.deliveryAvailable === false) {
    showToast('Ordering is currently paused. Please contact CHOP for help.');
    return;
  }
  const existing = cart.find(c => sameItemId(c.id, id));
  if (existing) { existing.qty++; }
  else { cart.push({ ...item, qty: 1 }); }
  updateCart();
  buildMenuGrid();
  showToast(`${item.name} added to cart!`);
  animateCartCount();
}

function updateCardQty(id, delta) {
  const existing = cart.find(c => sameItemId(c.id, id));
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) cart = cart.filter(c => !sameItemId(c.id, id));
  }
  updateCart();
  buildMenuGrid();
}

function updateCartItemQty(id, delta) {
  const existing = cart.find(c => sameItemId(c.id, id));
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) cart = cart.filter(c => !sameItemId(c.id, id));
  }
  updateCart();
  buildMenuGrid();
  renderCartBody();
}

function removeFromCart(id) {
  cart = cart.filter(c => !sameItemId(c.id, id));
  updateCart();
  buildMenuGrid();
  renderCartBody();
}

function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCart() {
  const count = getCartCount();
  const total = getCartTotal();
  document.getElementById('navCartCount').textContent = count;
  document.getElementById('cartBarCount').textContent = `${count} item${count !== 1 ? 's' : ''} in cart`;
  document.getElementById('cartBarTotal').textContent = total.toFixed(2);
  document.querySelectorAll('.cart-bar-total .cur').forEach(element => { element.textContent = currencySymbol(); });
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
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  switchCartTab('order');
  renderCartBody();
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
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
    const subtotal = getCartTotal();
    const delivery = getDeliveryFee(subtotal);
    const total = subtotal + delivery;
    const freeDeliveryThreshold = Number(storefrontData.deliverySettings.freeDeliveryThreshold ?? 100);
    body.innerHTML = `
      ${cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}" />
          <div class="cart-item-details">
            <div class="cart-item-name">${escapeHtml(item.name)}</div>
            <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn minus" aria-label="Remove one ${escapeHtml(item.name)}" onclick="updateCartItemQty(${inlineArgument(item.id)}, -1)"><i class="fas fa-minus"></i></button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn plus" aria-label="Add one ${escapeHtml(item.name)}" onclick="updateCartItemQty(${inlineArgument(item.id)}, 1)"><i class="fas fa-plus"></i></button>
          </div>
          <button class="cart-item-remove" aria-label="Remove ${escapeHtml(item.name)} from cart" onclick="removeFromCart(${inlineArgument(item.id)})"><i class="fas fa-trash-alt"></i></button>
        </div>
      `).join('')}
      <div class="cart-summary-box">
        <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : formatPrice(delivery)}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        ${freeDeliveryThreshold > 0 && subtotal < freeDeliveryThreshold ? `<p style="font-size:0.72rem;color:var(--amber);margin-top:6px;text-align:center">Add ${formatPrice(freeDeliveryThreshold - subtotal)} more for free delivery!</p>` : ''}
      </div>
    `;
  } else if (currentCartTab === 'checkout') {
    btn.innerHTML = '<i class="fas fa-comment-sms"></i> Send Order by SMS';
    body.innerHTML = `
      <div class="checkout-form">
        <div class="form-section-title"><i class="fas fa-user"></i>Your Information</div>
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="custName" placeholder="Kwame Mensah" value="${escapeHtml(currentCheckout.name)}" autocomplete="name" />
        </div>
        <div class="form-group">
          <label>Phone / WhatsApp *</label>
          <input type="tel" id="custPhone" placeholder="055 123 4567" value="${escapeHtml(currentCheckout.phone)}" autocomplete="tel" />
        </div>
        <div class="form-group">
          <label>Email Address (for order confirmation)</label>
          <input type="email" id="custEmail" placeholder="yourname@gmail.com" value="${escapeHtml(currentCheckout.email)}" autocomplete="email" />
        </div>
        <div class="form-section-title"><i class="fas fa-map-marker-alt"></i>Delivery Details</div>
        <div class="form-group">
          <label>Delivery Address *</label>
          <input type="text" id="custAddress" placeholder="e.g. Benya, Elmina or Pedu, Cape Coast" value="${escapeHtml(currentCheckout.address)}" autocomplete="street-address" />
        </div>
        <div class="form-group">
          <label>City / Area</label>
          <select id="custCity" autocomplete="address-level2">
            ${deliveryAreaOptions()}
          </select>
        </div>
        <div class="form-section-title"><i class="fas fa-receipt"></i>Payment</div>
        <div style="background:rgba(255,176,0,0.08);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:10px 14px;margin-bottom:0.8rem;font-size:0.75rem;color:rgba(39,4,4,0.65);line-height:1.6">
          <i class="fas fa-info-circle" style="color:var(--amber);margin-right:6px"></i>
          Place your order now. The Chop team will contact you to confirm payment and delivery.
        </div>
        <div class="form-section-title"><i class="fas fa-sticky-note"></i>Order Notes</div>
        <div class="form-group">
          <label>Special Instructions</label>
          <textarea id="custNotes" placeholder="e.g. Extra pepper sauce, no onions, ring bell on arrival...">${escapeHtml(currentCheckout.notes)}</textarea>
        </div>
        <button type="button" class="mobile-send-order" onclick="handleCartAction()">
          <i class="fas fa-comment-sms"></i> Send Order by SMS
        </button>
      </div>
    `;
    [['custName', 'name'], ['custPhone', 'phone'], ['custEmail', 'email'], ['custAddress', 'address'], ['custCity', 'city'], ['custNotes', 'notes']].forEach(([elementId, key]) => {
      const field = document.getElementById(elementId);
      field?.addEventListener('input', () => { currentCheckout[key] = field.value; });
      field?.addEventListener('change', () => { currentCheckout[key] = field.value; });
    });
  } else if (currentCartTab === 'confirm') {
    const { name, phone, address, city, notes, email } = currentCheckout;
    const subtotal = getCartTotal();
    const delivery = getDeliveryFee(subtotal);
    const total = subtotal + delivery;
    const freeDeliveryThreshold = Number(storefrontData.deliverySettings.freeDeliveryThreshold ?? 100);
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
              <span>${escapeHtml(i.name)} ×${i.qty}</span>
              <span style="color:var(--dark);font-weight:700">${formatPrice(i.price * i.qty)}</span>
            </div>`).join('')}
          <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : formatPrice(delivery)}</span></div>
          <div class="cart-summary-row total"><span>TOTAL</span><span>${formatPrice(total)}</span></div>
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
    return;
  }

  if (currentCartTab !== 'checkout' && currentCartTab !== 'confirm') return;
  if (storefrontData.siteSettings.websiteStatus !== 'open') {
    showToast('The store is not accepting orders right now.');
    return;
  }
  if (storefrontData.deliverySettings.deliveryAvailable === false) {
    showToast('Delivery is currently unavailable.');
    return;
  }

  if (currentCartTab === 'checkout') {
    const emailField = document.getElementById('custEmail');
    const email = emailField.value.trim();
    if (email && !emailField.checkValidity()) {
      showToast('Enter a valid email address or leave it blank.');
      emailField.focus();
      return;
    }
    currentCheckout = {
      name: document.getElementById('custName').value.trim(),
      phone: document.getElementById('custPhone').value.trim(),
      email,
      address: document.getElementById('custAddress').value.trim(),
      city: document.getElementById('custCity').value,
      notes: document.getElementById('custNotes').value.trim(),
    };
  }

  if (!currentCheckout.name || !currentCheckout.phone || !currentCheckout.address || !currentCheckout.city) {
    showToast('Please fill in your name, phone, address, and delivery area.');
    return;
  }
  const area = getDeliveryArea(currentCheckout.city);
  if (!area || area.available === false) {
    showToast('Choose a delivery area that is currently available.');
    return;
  }
  if (storefrontData.initialized && storefrontData.deliveryAreas.length === 0) {
    showToast('Delivery areas are not configured right now.');
    return;
  }
  const minimumOrder = Number(area.minimumOrder ?? storefrontData.deliverySettings.minimumOrder ?? 0);
  if (getCartTotal() < minimumOrder) {
    showToast(`The minimum order for this area is ${formatPrice(minimumOrder)}.`);
    return;
  }

  void submitOrder();
}

// ============================================================
//  CONFIG — Set your keys here
// ============================================================
// CLOUDFLARE WORKER: paste the deployed Worker URL here after deployment.
const HUBTEL_WORKER_URL = 'https://choptastethevibe.choptastethevibep3.workers.dev';

// BUSINESS NUMBERS (for confirmations)
const SHOP_NUMBER_MTN = '0554611569';   // MTN Momo
const SHOP_NUMBER_TELECEL = '0509511619'; // Telecel Cash

// ============================================================
//  ORDER SUBMISSION
// ============================================================
async function submitOrder() {
  if (orderSubmitting) return;
  orderSubmitting = true;
  showGlobalLoading('Saving your order...');
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: currentCheckout.name,
        phone: currentCheckout.phone,
        email: currentCheckout.email,
        address: currentCheckout.address,
        city: currentCheckout.city,
        notes: currentCheckout.notes,
        items: cart.map(item => ({ id: String(item.id), quantity: item.qty }))
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to place the order. Please try again.');

    const itemsList = result.items.map(item => `${item.name} ×${item.quantity} — ${formatPrice(item.price * item.quantity)}`).join('\n');
    sendSMSNotification(result.reference, result.total, currentCheckout.name, currentCheckout.phone, currentCheckout.email, currentCheckout.address, currentCheckout.city, currentCheckout.notes, result.deliveryFee, itemsList);
    hideGlobalLoading();
    showReceipt(result, currentCheckout);
  } catch (error) {
    hideGlobalLoading();
    showToast(error instanceof Error ? error.message : 'Unable to place the order. Please try again.');
  } finally {
    orderSubmitting = false;
  }
}

function sendSMSNotification(orderId, total, name, phone, email, address, city, notes, deliveryFee, itemsList) {
  const smsBody = `CHOP ORDER #${orderId}\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}, ${city}\nItems:\n${itemsList}\nDelivery: ${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}\nTotal: ${formatPrice(total)}\nNotes: ${notes || 'None'}\nPayment: To be confirmed`;
  window.open(`sms:${SHOP_NUMBER_MTN}?body=${encodeURIComponent(smsBody)}`, '_blank');
}

// ============================================================
//  RECEIPT MODAL
// ============================================================
function showReceipt(orderId, total, name, phone, email, address, city, notes, payMethod) {
  const delivery = getCartTotal() >= 100 ? 0 : 5;
  document.getElementById('receiptOrderId').textContent = '#' + orderId;
  document.getElementById('receiptItems').innerHTML = cart.map(i => `
    <div class="receipt-item">
      <span>${i.name} ×${i.qty}</span>
      <span>GH₵${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('') + `
    <div class="receipt-item">
      <span>Delivery</span>
      <span>${delivery === 0 ? 'FREE' : 'GH₵' + delivery.toFixed(2)}</span>
    </div>
  `;
  document.getElementById('receiptTotal').textContent = `GH₵${total.toFixed(2)}`;
  document.getElementById('receiptCustomer').innerHTML = `
    <div class="receipt-customer-row"><strong>Name:</strong> ${name}</div>
    <div class="receipt-customer-row"><strong>Phone:</strong> ${phone}</div>
    ${email ? `<div class="receipt-customer-row"><strong>Email:</strong> ${email}</div>` : ''}
    <div class="receipt-customer-row"><strong>Address:</strong> ${address}, ${city}</div>
    ${notes ? `<div class="receipt-customer-row"><strong>Notes:</strong> ${notes}</div>` : ''}
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
  currentCheckout.payMethod = method;
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
  currentCheckout = { name: '', phone: '', email: '', address: '', city: 'Elmina', notes: '' };
  updateCart();
  buildMenuGrid();
}

// ============================================================
//  DRAWER
// ============================================================
function toggleDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const ham = document.getElementById('hamburger');
  drawer.classList.toggle('open');
  overlay.classList.toggle('show');
  ham.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}
function closeDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
  document.getElementById('hamburger').classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

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
  setTimeout(() => { window.open(`https://wa.me/233554611569?text=${encodeURIComponent(waMsg)}`, '_blank'); hideGlobalLoading(); }, 600);
  showToast('Thanks for your feedback, ' + name + '! 🙏');
  document.getElementById('feedbackForm').reset();
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildPromoStrip();
  buildDeals();
  buildCategoryTabs();
  buildMenuGrid();
  initScrollAnimations();

  // Hide preloader after page loads
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1800);
});

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
