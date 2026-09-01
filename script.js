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
  // Kept original drinks from old menu
  softDrink:     'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80&fit=crop',
};

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
    id: 2, category: 'Rice Dishes', available: true,
    name: 'Rice & Beans Stew with Fish',
    desc: 'Rice and beans stew elevated with seasoned fried fish on the side — full Ghanaian vibes.',
    price: 38, oldPrice: null, hot: true,
    img: IMG.riceBeanStew
  },
  {
    id: 3, category: 'Rice Dishes', available: true,
    name: 'Rice & Palava Stew with Egg',
    desc: 'Steamed white rice served with rich palava (kontomire) sauce and a boiled egg — pure comfort food.',
    price: 40, oldPrice: 48, hot: false,
    img: IMG.palavaStew
  },
  {
    id: 4, category: 'Rice Dishes', available: true,
    name: 'Rice & Vegetable Stew',
    desc: 'Light, nutritious rice paired with a fresh garden vegetable stew — clean, balanced, and delicious.',
    price: 35, oldPrice: 38, hot: false,
    img: IMG.riceVegStew
  },

  // === TRADITIONAL MEALS ===
  {
    id: 5, category: 'Traditional', available: true,
    name: 'Ga Kenkey & Fried Fish',
    desc: 'Authentic Ga kenkey served with crispy seasoned fried fish and fiery pepper sauce. A true Ghanaian classic.',
    price: 30, oldPrice: 38, hot: true,
    img: IMG.gaKenkey
  },
  {
    id: 6, category: 'Traditional', available: true,
    name: 'Waakye',
    desc: 'Iconic Ghanaian waakye (rice & beans) loaded with stew, spaghetti, egg, gari, and plantain. The full experience.',
    price: 35, oldPrice: 40, hot: true,
    img: IMG.waakye
  },
  {
    id: 7, category: 'Traditional', available: true,
    name: 'Spaghetti',
    desc: 'Ghanaian-style spaghetti cooked with rich tomato and pepper sauce. Served as a standalone or side.',
    price: 25, oldPrice: 30, hot: false,
    img: IMG.spaghetti
  },

  // === GARI SPECIALS ===
  {
    id: 8, category: 'Gari Specials', available: true,
    name: 'Gari & Beans with Fried Plantain & Pear',
    desc: 'Creamy gari and beans served with sweet fried plantain and ripe avocado pear. A power combo.',
    price: 40, oldPrice: 48, hot: true,
    img: IMG.gariBeans
  },
  {
    id: 9, category: 'Gari Specials', available: true,
    name: 'Gari & Beans with Fried Plantain',
    desc: 'Classic gari soakings paired with seasoned beans and golden fried plantain. Simple and satisfying.',
    price: 45, oldPrice: 48, hot: false,
    img: IMG.gariBeansPlantain
  },

  // === SNACKS ===
  {
    id: 10, category: 'Snacks', available: true,
    name: 'Spring Rolls',
    desc: 'Crispy golden spring rolls stuffed with spiced vegetables. Perfect as a starter or street-style snack.',
    price: 12, oldPrice: 15, hot: false,
    img: IMG.springRolls
  },

  // === DRINKS ===
  {
    id: 11, category: 'Drinks', available: true,
    name: 'Hibiscus Juice (Sobolo)',
    desc: 'Refreshing chilled hibiscus flower drink blended with ginger and citrus — bold, tangy, and authentic.',
    price: 7, oldPrice: 10, hot: false,
    img: IMG.hibiscus
  },
  {
    id: 12, category: 'Drinks', available: true,
    name: 'Vico Strawberry',
    desc: 'Sweet and creamy Vico strawberry flavoured drink — a beloved Ghanaian treat for all ages.',
    price: 4, oldPrice: 10, hot: false,
    img: IMG.vicoStrawberry
  },
  {
    id: 15, category: 'Drinks', available: true,
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
  const doubled = [...promoMessages, ...promoMessages];
  track.innerHTML = doubled.map(msg => `
    <div class="promo-item">
      <i class="fas fa-star"></i>${msg}
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
    <div class="deal-card" onclick="showToast('Deal added to inquiry!')">
      <div class="deal-img-wrap">
        <img src="${d.img}" alt="${d.name}" />
      </div>
      <div class="deal-info">
        <span class="deal-badge">${d.badge}</span>
        <div class="deal-name">${d.name}</div>
        <div class="deal-desc">${d.desc}</div>
        <div class="deal-price">GH₵${d.price} <span>GH₵${d.original}</span></div>
      </div>
    </div>
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
    <button class="tab-btn ${cat === currentCategory ? 'active' : ''}" onclick="filterCategory('${cat}')">
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
    const cartItem = cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;
    const isAvail = item.available !== false;
    return `
      <div class="food-card${!isAvail ? ' unavailable' : ''}" id="card-${item.id}">
        <div class="food-card-img-wrap">
          <img src="${item.img}" alt="${item.name}" style="${!isAvail ? 'filter: grayscale(0.6) brightness(0.65);' : ''}" />
          <span class="food-category-badge">${item.category}</span>
          ${item.hot ? '<span class="food-hot-badge">HOT</span>' : ''}
          ${!isAvail ? '<span class="food-unavailable-badge">Coming Soon</span>' : ''}
        </div>
        <div class="food-card-body" style="${!isAvail ? 'opacity:0.7' : ''}">
          <div class="food-name">${item.name}</div>
          <div class="food-desc">${item.desc}</div>
          <div class="food-card-footer">
            <div class="food-price">
              <span class="currency">GH₵</span>${item.price}
              ${item.oldPrice ? `<span class="old-price">GH₵${item.oldPrice}</span>` : ''}
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
    const delivery = getCartTotal() >= 100 ? 0 : 5;
    const total = getCartTotal() + delivery;
    body.innerHTML = `
      ${cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">GH₵${(item.price * item.qty).toFixed(2)}</div>
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
        <div class="cart-summary-row"><span>Subtotal</span><span>GH₵${getCartTotal().toFixed(2)}</span></div>
        <div class="cart-summary-row"><span>Delivery</span><span>${getCartTotal() >= 100 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : 'GH₵' + delivery.toFixed(2)}</span></div>
        <div class="cart-summary-row total"><span>Total</span><span>GH₵${total.toFixed(2)}</span></div>
        ${getCartTotal() < 100 ? `<p style="font-size:0.72rem;color:var(--amber);margin-top:6px;text-align:center">Add GH₵${(100-getCartTotal()).toFixed(2)} more for free delivery!</p>` : ''}
      </div>
    `;
  } else if (currentCartTab === 'checkout') {
    btn.innerHTML = '<i class="fas fa-comment-sms"></i> Send Order by SMS';
    body.innerHTML = `
      <div class="checkout-form">
        <div class="form-section-title"><i class="fas fa-user"></i>Your Information</div>
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="custName" placeholder="Kwame Mensah" value="${localStorage.getItem('custName')||''}" />
        </div>
        <div class="form-group">
          <label>Phone / WhatsApp *</label>
          <input type="tel" id="custPhone" placeholder="055 123 4567" value="${localStorage.getItem('custPhone')||''}" />
        </div>
        <div class="form-group">
          <label>Email Address (for order confirmation)</label>
          <input type="email" id="custEmail" placeholder="yourname@gmail.com" value="${localStorage.getItem('custEmail')||''}" />
        </div>
        <div class="form-section-title"><i class="fas fa-map-marker-alt"></i>Delivery Details</div>
        <div class="form-group">
          <label>Delivery Address *</label>
          <input type="text" id="custAddress" placeholder="e.g. Benya, Elmina or Pedu, Cape Coast" value="${localStorage.getItem('custAddress')||''}" />
        </div>
        <div class="form-group">
          <label>City / Area</label>
          <select id="custCity">
            <option value="Elmina" ${localStorage.getItem('custCity')==='Elmina'?'selected':''}>Elmina</option>
            <option value="Cape Coast" ${localStorage.getItem('custCity')==='Cape Coast'?'selected':''}>Cape Coast</option>
            <option value="Elmina - Benya" ${localStorage.getItem('custCity')==='Elmina - Benya'?'selected':''}>Elmina – Benya</option>
            <option value="Elmina - Bantuma" ${localStorage.getItem('custCity')==='Elmina - Bantuma'?'selected':''}>Elmina – Bantuma</option>
            <option value="Cape Coast - Pedu" ${localStorage.getItem('custCity')==='Cape Coast - Pedu'?'selected':''}>Cape Coast – Pedu</option>
            <option value="Cape Coast - Abura" ${localStorage.getItem('custCity')==='Cape Coast - Abura'?'selected':''}>Cape Coast – Abura</option>
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
          <textarea id="custNotes" placeholder="e.g. Extra pepper sauce, no onions, ring bell on arrival...">${localStorage.getItem('custNotes')||''}</textarea>
        </div>
        <button type="button" class="mobile-send-order" onclick="handleCartAction()">
          <i class="fas fa-comment-sms"></i> Send Order by SMS
        </button>
      </div>
    `;
  } else if (currentCartTab === 'confirm') {
    const name = localStorage.getItem('custName') || '';
    const phone = localStorage.getItem('custPhone') || '';
    const address = localStorage.getItem('custAddress') || '';
    const city = localStorage.getItem('custCity') || 'Elmina';
    const notes = localStorage.getItem('custNotes') || '';
    const email = localStorage.getItem('custEmail') || '';
    const delivery = getCartTotal() >= 100 ? 0 : 5;
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
              <span>${i.name} x${i.qty}</span>
              <span style="color:var(--dark);font-weight:700">GH₵${(i.price * i.qty).toFixed(2)}</span>
            </div>`).join('')}
          <div class="cart-summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:#25D366;font-weight:700">FREE</span>' : 'GH₵' + delivery.toFixed(2)}</span></div>
          <div class="cart-summary-row total"><span>TOTAL</span><span>GH₵${total.toFixed(2)}</span></div>
        </div>
        <div style="background:rgba(39,4,4,0.04);border-radius:14px;padding:1rem">
          <div style="font-weight:800;font-size:0.82rem;color:var(--dark);margin-bottom:0.7rem;text-transform:uppercase;letter-spacing:0.5px">Your Details</div>
          ${name ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-user" style="color:var(--red);margin-right:6px;width:14px"></i>${name}</div>` : ''}
          ${phone ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-phone" style="color:var(--red);margin-right:6px;width:14px"></i>${phone}</div>` : ''}
          ${email ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-envelope" style="color:var(--red);margin-right:6px;width:14px"></i>${email}</div>` : ''}
          ${address ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65);margin-bottom:4px"><i class="fas fa-map-marker-alt" style="color:var(--red);margin-right:6px;width:14px"></i>${address}, ${city}</div>` : ''}
          ${notes ? `<div style="font-size:0.82rem;color:rgba(39,4,4,0.65)"><i class="fas fa-sticky-note" style="color:var(--red);margin-right:6px;width:14px"></i>${notes}</div>` : ''}
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
// CLOUDFLARE WORKER: paste the deployed Worker URL here after deployment.
const HUBTEL_WORKER_URL = 'https://choptastethevibe.choptastethevibep3.workers.dev';

// BUSINESS NUMBERS (for confirmations)
const SHOP_NUMBER_MTN = '0554611569';   // MTN Momo
const SHOP_NUMBER_TELECEL = '0509511619'; // Telecel Cash

// ============================================================
//  ORDER SUBMISSION
// ============================================================
async function submitOrder() {
  const name = localStorage.getItem('custName') || '';
  const phone = localStorage.getItem('custPhone') || '';
  const email = localStorage.getItem('custEmail') || phone + '@chopgh.com';
  const delivery = getCartTotal() >= 100 ? 0 : 5;
  const total = getCartTotal() + delivery;
  const orderId = 'CHOP-' + Date.now().toString().slice(-6);
  const address = localStorage.getItem('custAddress') || '';
  const city = localStorage.getItem('custCity') || 'Elmina';
  const notes = localStorage.getItem('custNotes') || '';
  const itemsList = cart.map(i => `${i.name} x${i.qty} - GH₵${(i.price * i.qty).toFixed(2)}`).join('\n');
  showGlobalLoading('Sending your order...');
  try {
    sendSMSNotification(orderId, total, name, phone, email, address, city, notes, itemsList);
    localStorage.setItem('lastOrderId', orderId);
    localStorage.setItem('lastOrderTotal', total);
    hideGlobalLoading();
    showReceipt(orderId, total, name, phone, email, address, city, notes, 'To be confirmed');
  } catch (error) {
    hideGlobalLoading();
    showToast(error.message || 'Unable to send your order. Please try again.');
  }
}

function sendSMSNotification(orderId, total, name, phone, email, address, city, notes, itemsList) {
  const smsBody = `CHOP ORDER #${orderId}\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}, ${city}\nItems:\n${itemsList}\nDelivery: ${getCartTotal() >= 100 ? 'FREE' : 'GH₵5.00'}\nTotal: GH₵${total.toFixed(2)}\nNotes: ${notes || 'None'}\nPayment: To be confirmed`;
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
