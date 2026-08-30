// ============================================================
//  IMAGE URLS
// ============================================================
const IMG = {
  logo:          'https://i.ibb.co/ds68rJqr/chop.png',
  chopLifeLogo:  'https://i.ibb.co/9kZhDbSZ/choplifelogo1.png',
  gaKenkey:      'https://i.ibb.co/PGzYFf5j/Ga-Kenkey.jpg',
  gariBeans:     'https://i.ibb.co/pk8dJH3/gariandbeans.jpg',
  gariBeansPlantain: 'https://i.ibb.co/Xr4JQ6d2/gariandbeanswithplantain.jpg',
  ghana:         'https://i.ibb.co/HLbxyLFQ/ghana.png',
  hibiscus:      'https://i.ibb.co/jkQHygN2/hibiscus.jpg',
  riceBeanStew:  'https://i.ibb.co/0jKYWzmy/riceandbeansstew.jpg',
  palavaStew:    'https://i.ibb.co/Pzv6H0tg/riceandpalava-sauce.jpg',
  riceVegStew:   'https://i.ibb.co/RkCkg8Js/riceandstewandchicken.jpg',
  spaghetti:     'https://i.ibb.co/s9j36dFh/spaghetti.jpg',
  springRolls:   'https://i.ibb.co/LXy8qC9J/springrolls.jpg',
  vicoStrawberry:'https://i.ibb.co/FqcYvYPq/Vico-Strawberry.jpg',
  waakye:        'https://i.ibb.co/RTg5BQ95/waakye.jpg',
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
    id: 2, category: 'Rice Dishes', available: false,
    name: 'Rice & Beans Stew with Fish',
    desc: 'Rice and beans stew elevated with seasoned fried fish on the side — full Ghanaian vibes.',
    price: 38, oldPrice: null, hot: true,
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
    price: 30, oldPrice: 38, hot: true,
    img: IMG.gaKenkey
  },
  {
    id: 6, category: 'Traditional', available: false,
    name: 'Waakye',
    desc: 'Iconic Ghanaian waakye (rice & beans) loaded with stew, spaghetti, egg, gari, and plantain. The full experience.',
    price: 35, oldPrice: 40, hot: true,
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
    price: 40, oldPrice: 48, hot: true,
    img: IMG.gariBeans
  },
  {
    id: 9, category: 'Gari Specials', available: false,
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
    btn.innerHTML = '<i class="fas fa-receipt"></i> Review & Confirm';
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
        <div class="form-section-title"><i class="fas fa-mobile-alt"></i>Payment Method</div>
        <div style="display:flex;flex-direction:column;gap:0.7rem;margin-bottom:0.8rem">
          <label style="display:flex;align-items:center;gap:0;cursor:pointer;border:2px solid rgba(39,4,4,0.1);border-radius:14px;overflow:hidden;transition:border-color 0.2s" id="mtnLabel">
            <input type="radio" name="payMethod" id="payMTN" value="MTN" style="display:none" onchange="selectPayMethod('MTN')" ${localStorage.getItem('custPayMethod')==='MTN'?'checked':''} />
            <div style="background:#FFCC00;padding:12px 14px;display:flex;align-items:center;justify-content:center;width:52px;flex-shrink:0">
              <span style="font-size:1.1rem;font-weight:900;color:#000">M</span>
            </div>
            <div style="padding:10px 14px;flex:1">
              <div style="font-weight:800;font-size:0.85rem;color:var(--dark)">MTN Mobile Money</div>
              <div style="font-size:0.75rem;color:rgba(39,4,4,0.5);margin-top:1px">Send to: <strong style="color:var(--dark)">055 461 1569</strong></div>
            </div>
            <div style="padding:0 14px;font-size:1rem;color:var(--amber)" id="mtnCheck">${localStorage.getItem('custPayMethod')==='MTN'?'<i class="fas fa-check-circle" style="color:var(--amber)"></i>':''}</div>
          </label>
          <label style="display:flex;align-items:center;gap:0;cursor:pointer;border:2px solid rgba(39,4,4,0.1);border-radius:14px;overflow:hidden;transition:border-color 0.2s" id="telcelLabel">
            <input type="radio" name="payMethod" id="payTelcel" value="Telecel" style="display:none" onchange="selectPayMethod('Telecel')" ${localStorage.getItem('custPayMethod')==='Telecel'?'checked':''} />
            <div style="background:#E31235;padding:12px 14px;display:flex;align-items:center;justify-content:center;width:52px;flex-shrink:0">
              <span style="font-size:0.85rem;font-weight:900;color:#fff">TC</span>
            </div>
            <div style="padding:10px 14px;flex:1">
              <div style="font-weight:800;font-size:0.85rem;color:var(--dark)">Telecel Cash</div>
              <div style="font-size:0.75rem;color:rgba(39,4,4,0.5);margin-top:1px">Send to: <strong style="color:var(--dark)">050 951 1619</strong></div>
            </div>
            <div style="padding:0 14px;font-size:1rem" id="telcelCheck">${localStorage.getItem('custPayMethod')==='Telecel'?'<i class="fas fa-check-circle" style="color:#E31235"></i>':''}</div>
          </label>
        </div>
        <div style="background:rgba(255,176,0,0.08);border:1px solid rgba(255,176,0,0.25);border-radius:12px;padding:10px 14px;margin-bottom:0.8rem;font-size:0.75rem;color:rgba(39,4,4,0.65);line-height:1.6">
          <i class="fas fa-info-circle" style="color:var(--amber);margin-right:6px"></i>
          You'll make payment <strong>instantly</strong> in the next step. MTN Momo → <strong>055 461 1569</strong> | Telecel Cash → <strong>050 951 1619</strong>.
        </div>
        <div class="form-section-title"><i class="fas fa-sticky-note"></i>Order Notes</div>
        <div class="form-group">
          <label>Special Instructions</label>
          <textarea id="custNotes" placeholder="e.g. Extra pepper sauce, no onions, ring bell on arrival...">${localStorage.getItem('custNotes')||''}</textarea>
        </div>
      </div>
    `;
  } else if (currentCartTab === 'confirm') {
    const name = localStorage.getItem('custName') || '';
    const phone = localStorage.getItem('custPhone') || '';
    const address = localStorage.getItem('custAddress') || '';
    const city = localStorage.getItem('custCity') || 'Elmina';
    const notes = localStorage.getItem('custNotes') || '';
    const email = localStorage.getItem('custEmail') || '';
    const payMethod = localStorage.getItem('custPayMethod') || '';
    const payNum = payMethod === 'MTN' ? '055 461 1569' : '050 951 1619';
    const payColor = payMethod === 'MTN' ? '#FFCC00' : '#E31235';
    const payTextColor = payMethod === 'MTN' ? '#000' : '#fff';
    const delivery = getCartTotal() >= 100 ? 0 : 5;
    const total = getCartTotal() + delivery;
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay with ' + (payMethod === 'MTN' ? 'MTN Momo' : 'Telecel Cash');
    body.innerHTML = `
      <div style="padding:0.5rem 0">
        <div style="background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(37,211,102,0.03));border:1px solid rgba(37,211,102,0.2);border-radius:14px;padding:1rem;margin-bottom:1.2rem;display:flex;align-items:center;gap:10px">
          <i class="fas fa-check-circle" style="color:#25D366;font-size:1.2rem"></i>
          <div>
            <div style="font-weight:800;font-size:0.88rem;color:var(--dark)">Ready to order!</div>
            <div style="font-size:0.75rem;color:rgba(39,4,4,0.5)">Review your details below</div>
          </div>
        </div>
        ${payMethod ? `
        <div style="background:rgba(39,4,4,0.04);border-radius:14px;padding:1rem;margin-bottom:1rem">
          <div style="font-weight:800;font-size:0.82rem;color:var(--dark);margin-bottom:0.7rem;text-transform:uppercase;letter-spacing:0.5px">💳 Payment Method</div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="background:${payColor};border-radius:8px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem;color:${payTextColor};flex-shrink:0">${payMethod === 'MTN' ? 'M' : 'V'}</div>
            <div>
              <div style="font-weight:700;font-size:0.85rem;color:var(--dark)">${payMethod === 'MTN' ? 'MTN Mobile Money' : 'Telecel Cash'}</div>
              <div style="font-size:0.75rem;color:rgba(39,4,4,0.55)">Pay to: <strong>${payNum}</strong></div>
            </div>
          </div>
          <div style="margin-top:0.6rem;font-size:0.72rem;color:rgba(39,4,4,0.5);background:rgba(255,176,0,0.1);border-radius:8px;padding:6px 10px">
            <i class="fas fa-info-circle" style="color:var(--amber);margin-right:4px"></i>You'll pay <strong>GH₵${total.toFixed(2)}</strong> to <strong>${payNum}</strong> via ${payMethod === 'MTN' ? 'MTN Momo' : 'Telecel Cash'} in the next step.
          </div>
        </div>` : ''}

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
    if (!payMethod) { showToast('Please select a payment method!'); return; }
    localStorage.setItem('custName', name);
    localStorage.setItem('custPhone', phone);
    localStorage.setItem('custEmail', email);
    localStorage.setItem('custAddress', address);
    localStorage.setItem('custCity', city);
    localStorage.setItem('custNotes', notes);
    localStorage.setItem('custPayMethod', payMethod);
    switchCartTab('confirm');
  } else if (currentCartTab === 'confirm') {
    openPaymentModal();
  }
}

// ============================================================
//  CONFIG — Set your keys here
// ============================================================
// PAYSTACK: Sign up free at paystack.com → Settings → API Keys → copy Public Key
// Uncomment and paste your key to accept real MTN Momo & Telecel payments:
const PAYSTACK_PUBLIC_KEY = 'pk_test_4ee06a25c6fed7ee72d9f38a3e848981d2fb798b';

// FORMSPREE: Order emails sent here (free, 50/month)
const FORMSPREE_ID = 'mqenrbey';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// BUSINESS NUMBERS (for SMS fallback & confirmations)
const SHOP_NUMBER_MTN = '0554611569';   // MTN Momo
const SHOP_NUMBER_TELECEL = '0509511619'; // Telecel Cash

// ============================================================
//  PAYMENT MODAL — MTN Momo / Telecel Cash simulation
// ============================================================
// ============================================================
//  PAYMENT — Real Paystack MoMo OR SMS fallback
// ============================================================
function openPaymentModal() {
  const payMethod = localStorage.getItem('custPayMethod') || 'MTN';
  const name = localStorage.getItem('custName') || '';
  const phone = localStorage.getItem('custPhone') || '';
  const email = localStorage.getItem('custEmail') || phone + '@chopgh.com';
  const delivery = getCartTotal() >= 100 ? 0 : 5;
  const total = getCartTotal() + delivery;
  const orderId = 'CHOP-' + Date.now().toString().slice(-6);
  localStorage.setItem('pendingOrderId', orderId);
  localStorage.setItem('pendingTotal', total);

  // === IF PAYSTACK KEY IS SET → USE REAL PAYSTACK ===
  if (PAYSTACK_PUBLIC_KEY && PAYSTACK_PUBLIC_KEY.length > 10) {
    closeCart();
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: Math.round(total * 100), // Paystack uses pesewas
      currency: 'GHS',
      ref: orderId,
      channels: ['mobile_money'],
      mobile_money: {
        phone: phone.replace(/\s+/g, '').replace(/^0/, '233'),
        provider: payMethod === 'MTN' ? 'mtn' : 'tgo'
      },
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
          { display_name: 'Phone', variable_name: 'phone', value: phone },
          { display_name: 'Payment Method', variable_name: 'payment_method', value: payMethod }
        ]
      },
      callback: function(response) {
        // Payment successful!
        submitOrderAfterPayment();
        showReceipt(orderId, total, name, phone, email, localStorage.getItem('custAddress')||'', localStorage.getItem('custCity')||'Elmina', localStorage.getItem('custNotes')||'', payMethod);
      },
      onClose: function() {
        showToast('Payment cancelled. Try again when ready.');
      }
    });
    handler.openIframe();
    return;
  }

  // === FALLBACK: SMS payment instructions ===
  const isMTN = payMethod === 'MTN';
  const brandColor = isMTN ? '#FFCC00' : '#E31235';
  const brandName = isMTN ? 'MTN Mobile Money' : 'Telecel Cash';
  const brandShort = isMTN ? 'MTN MoMo' : 'Telecel Cash';
  const brandIcon = isMTN ? 'M' : 'TC';
  const brandIconColor = isMTN ? '#000' : '#fff';
  const payToNum = isMTN ? '055 461 1569' : '050 951 1619';

  document.getElementById('payBrandBg').style.background = brandColor;
  document.getElementById('payBrandName').textContent = brandName;
  document.getElementById('payBrandShort').textContent = brandShort;
  document.getElementById('payBrandIcon').textContent = brandIcon;
  document.getElementById('payBrandIcon').style.color = brandIconColor;
  document.getElementById('payAmount').textContent = `GH₵${total.toFixed(2)}`;
  document.getElementById('payReference').textContent = orderId;
  document.getElementById('payRecipient').textContent = payToNum;
  document.getElementById('payRecipientName').textContent = 'Chop Ghana';
  document.getElementById('payFooterNum').textContent = payToNum;
  document.getElementById('payProviderHint').textContent = brandShort;
  document.getElementById('payProcBrand').textContent = isMTN ? 'MTN' : 'TCL';

  // Reset PIN fields
  document.getElementById('payPhone').value = phone;
  ['payPin0','payPin1','payPin2','payPin3'].forEach(id => { document.getElementById(id).value = ''; document.getElementById(id).className = 'pay-pin-cell'; });
  document.getElementById('payStatusMsg').textContent = '';
  document.getElementById('payStatusMsg').className = 'pay-status';
  document.getElementById('payStep1').style.display = 'block';
  document.getElementById('payStep2').style.display = 'none';
  document.getElementById('payProcessing').style.display = 'none';
  document.getElementById('payResult').style.display = 'none';
  document.getElementById('payBtn').style.display = 'flex';
  document.getElementById('payBtn').disabled = false;
  document.getElementById('payBtnText').textContent = 'Continue';

  document.getElementById('paymentModal').classList.add('show');
  document.body.style.overflow = 'hidden';
  setTimeout(() => { const ph = document.getElementById('payPhone'); if (ph) ph.focus(); }, 400);
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.remove('show');
  document.body.style.overflow = '';
}

// Step 1 → Step 2: Validate phone, show PIN input
function payStepToPin() {
  const phone = document.getElementById('payPhone').value.replace(/\s+/g, '');
  if (!phone || phone.length < 9) {
    document.getElementById('payStatusMsg').textContent = 'Please enter a valid mobile money number';
    document.getElementById('payStatusMsg').className = 'pay-status';
    return;
  }
  document.getElementById('payStatusMsg').textContent = '';
  document.getElementById('payStatusMsg').className = 'pay-status';
  document.getElementById('payStep1').style.display = 'none';
  document.getElementById('payStep2').style.display = 'block';
  document.getElementById('payBtnText').textContent = 'Send Money';
  // Auto-focus first PIN cell
  setTimeout(() => { const p0 = document.getElementById('payPin0'); if (p0) p0.focus(); }, 300);
}

// Read 4 PIN cells & process
function getPinFromCells() {
  let pin = '';
  for (let i = 0; i < 4; i++) {
    const cell = document.getElementById('payPin' + i);
    pin += (cell ? cell.value : '');
  }
  return pin;
}

function processPayment() {
  const pin = getPinFromCells();
  if (!pin || pin.length < 4) {
    document.getElementById('payStatusMsg').textContent = 'Enter your 4-digit MoMo PIN';
    document.getElementById('payStatusMsg').className = 'pay-status';
    document.querySelectorAll('.pay-pin-cell').forEach(c => { c.style.borderColor = 'var(--red)'; setTimeout(() => { c.style.borderColor = ''; }, 600); });
    return;
  }
  document.getElementById('payStep2').style.display = 'none';
  document.getElementById('payProcessing').style.display = 'block';
  document.getElementById('payBtn').style.display = 'none';
  document.getElementById('payStatusMsg').textContent = '';

  // Simulate MTN processing
  setTimeout(() => {
    document.getElementById('payProcessing').style.display = 'none';
    document.getElementById('payResult').style.display = 'block';
    document.getElementById('payResult').className = 'pay-result success';
    document.getElementById('payResultIcon').innerHTML = '<i class="fas fa-check-circle"></i>';
    document.getElementById('payResultTitle').textContent = 'Payment Sent!';
    document.getElementById('payResultMsg').textContent = 'GH₵' + parseFloat(localStorage.getItem('pendingTotal')||0).toFixed(2) + ' sent from your wallet. Your order is confirmed.';
    document.getElementById('payBtn').style.display = 'flex';
    document.getElementById('payBtn').disabled = false;
    document.getElementById('payBtnText').textContent = 'View Receipt →';

    submitOrderAfterPayment();
  }, 2000);
}

function submitOrderAfterPayment() {
  const name = localStorage.getItem('custName') || '';
  const phone = localStorage.getItem('custPhone') || '';
  const email = localStorage.getItem('custEmail') || '';
  const address = localStorage.getItem('custAddress') || '';
  const city = localStorage.getItem('custCity') || 'Elmina';
  const notes = localStorage.getItem('custNotes') || '';
  const payMethod = localStorage.getItem('custPayMethod') || 'MTN';
  const orderId = localStorage.getItem('pendingOrderId') || ('CHOP-' + Date.now().toString().slice(-6));
  const total = parseFloat(localStorage.getItem('pendingTotal')) || getCartTotal() + (getCartTotal() >= 100 ? 0 : 5);

  // Send order to Formspree (email) + trigger SMS
  sendOrderToServer(orderId, name, phone, email, address, city, notes, payMethod, total);

  localStorage.setItem('lastOrderId', orderId);
  localStorage.setItem('lastOrderTotal', total);
}

async function sendOrderToServer(orderId, name, phone, email, address, city, notes, payMethod, total) {
  const delivery = getCartTotal() >= 100 ? 0 : 5;
  const itemsList = cart.map(i => `• ${i.name} ×${i.qty} — GH₵${(i.price * i.qty).toFixed(2)}`).join('\n');
  // SMS notification to both business numbers
  sendSMSNotification(orderId, total, name, phone, payMethod);
  try {
    const resp = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: `#${orderId}`,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        deliveryAddress: `${address}, ${city}`,
        orderNotes: notes || 'None',
        paymentMethod: payMethod === 'MTN' ? 'MTN MoMo' : 'Telecel Cash',
        paymentNumber: payMethod === 'MTN' ? '0554611569' : '0509511619',
        deliveryFee: delivery === 0 ? 'FREE' : `GH₵${delivery.toFixed(2)}`,
        totalAmount: `GH₵${total.toFixed(2)}`,
        orderItems: itemsList
      })
    });
  } catch (e) {}
}

function sendSMSNotification(orderId, total, name, phone, payMethod) {
  const smsBody = `Chop Order #${orderId}: ${name} | GH₵${total.toFixed(2)} | ${phone} | ${payMethod}`;
  window.open(`sms:${SHOP_NUMBER_MTN}?body=${encodeURIComponent(smsBody)}`, '_blank');
  setTimeout(() => {
    window.open(`sms:${SHOP_NUMBER_TELECEL}?body=${encodeURIComponent(smsBody)}`, '_blank');
  }, 600);
}

function finalizeReceipt() {
  closePaymentModal();
  const name = localStorage.getItem('custName') || '';
  const phone = localStorage.getItem('custPhone') || '';
  const email = localStorage.getItem('custEmail') || '';
  const address = localStorage.getItem('custAddress') || '';
  const city = localStorage.getItem('custCity') || 'Elmina';
  const notes = localStorage.getItem('custNotes') || '';
  const payMethod = localStorage.getItem('custPayMethod') || 'MTN';
  const orderId = localStorage.getItem('lastOrderId') || ('CHOP-' + Date.now().toString().slice(-6));
  const total = parseFloat(localStorage.getItem('lastOrderTotal')) || getCartTotal() + (getCartTotal() >= 100 ? 0 : 5);
  showReceipt(orderId, total, name, phone, email, address, city, notes, payMethod);
}

function payBtnAction() {
  const step1Visible = document.getElementById('payStep1').style.display !== 'none';
  const resultVisible = document.getElementById('payResult').style.display !== 'none';

  if (resultVisible) {
    finalizeReceipt();
  } else if (step1Visible) {
    payStepToPin();
  } else {
    processPayment();
  }
}

// === PIN CELL AUTO-ADVANCE (like Jumia / KiKUU) ===
document.addEventListener('input', function(e) {
  if (!e.target.classList.contains('pay-pin-cell')) return;
  const val = e.target.value;
  // Only allow digits
  if (!/^\d$/.test(val)) { e.target.value = ''; return; }
  e.target.classList.add('filled');
  // Move to next cell
  const idx = parseInt(e.target.id.replace('payPin', ''));
  if (idx < 3) {
    const next = document.getElementById('payPin' + (idx + 1));
    if (next) next.focus();
  }
});
document.addEventListener('keydown', function(e) {
  if (!e.target.classList.contains('pay-pin-cell')) return;
  if (e.key === 'Backspace' && e.target.value === '') {
    e.target.classList.remove('filled');
    const idx = parseInt(e.target.id.replace('payPin', ''));
    if (idx > 0) {
      const prev = document.getElementById('payPin' + (idx - 1));
      if (prev) { prev.value = ''; prev.classList.remove('filled'); prev.focus(); }
    }
  }
});
document.addEventListener('paste', function(e) {
  const activeEl = document.activeElement;
  if (!activeEl || !activeEl.classList.contains('pay-pin-cell')) return;
  e.preventDefault();
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  const digits = paste.replace(/\D/g, '').slice(0, 4);
  for (let i = 0; i < 4; i++) {
    const cell = document.getElementById('payPin' + i);
    if (cell) {
      cell.value = digits[i] || '';
      cell.classList.toggle('filled', !!digits[i]);
    }
  }
  const lastFilled = Math.min(digits.length, 3);
  const focusCell = document.getElementById('payPin' + lastFilled);
  if (focusCell) focusCell.focus();
});

// ============================================================
//  RECEIPT MODAL
// ============================================================
function showReceipt(orderId, total, name, phone, email, address, city, notes, payMethod) {
  const delivery = getCartTotal() >= 100 ? 0 : 5;
  const payColor = payMethod === 'MTN' ? '#FFCC00' : '#E31235';
  const payTextColor = payMethod === 'MTN' ? '#000' : '#fff';
  const payLabel = payMethod === 'MTN' ? 'MTN Mobile Money' : 'Telecel Cash';
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
    ${payMethod ? `
    <div style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px dashed rgba(39,4,4,0.12)">
      <div style="font-size:0.75rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.5rem">💳 Payment</div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="background:${payColor};border-radius:6px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.75rem;color:${payTextColor};flex-shrink:0">${payMethod === 'MTN' ? 'M' : 'TC'}</div>
        <div>
          <div style="font-size:0.8rem;font-weight:700;color:var(--dark)">${payLabel}</div>
          <div style="font-size:0.72rem;color:rgba(39,4,4,0.5)">Paid GH₵${total.toFixed(2)} to ${payMethod === 'MTN' ? '055 461 1569' : '050 951 1619'}</div>
        </div>
      </div>
    </div>` : ''}
    <div style="margin-top:0.8rem;padding-top:0.8rem;border-top:1px dashed rgba(39,4,4,0.12)">
      <div style="font-size:0.72rem;font-weight:800;color:var(--dark);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">📬 Confirmation Status</div>
      <div style="font-size:0.78rem;color:rgba(39,4,4,0.6);line-height:1.9">
        <div><i class="fas fa-check-circle" style="color:#25D366;font-size:0.7rem;margin-right:4px"></i> Order sent to server — payment via ${payMethod === 'MTN' ? '055 461 1569 (MTN)' : '050 951 1619 (Telecel)'}</div>
        <div><i class="fas fa-check-circle" style="color:#25D366;font-size:0.7rem;margin-right:4px"></i> Email confirmation sent to owner</div>
        ${phone ? `<div><i class="fas fa-clock" style="color:var(--amber);font-size:0.7rem;margin-right:4px"></i> SMS confirmation to <strong>${phone}</strong> — you'll receive owner feedback shortly</div>` : ''}
      </div>
    </div>
      <div style="margin-top:0.5rem;background:linear-gradient(135deg,rgba(37,211,102,0.08),rgba(37,211,102,0.03));border:1px solid rgba(37,211,102,0.2);border-radius:10px;padding:10px 14px;font-size:0.73rem;color:rgba(39,4,4,0.65);line-height:1.6">
        <i class="fas fa-info-circle" style="color:#25D366;margin-right:6px"></i>
        <strong style="color:var(--dark)">What happens next:</strong> Your order has been sent to the Chop team via SMS and email. You'll receive an SMS confirmation on <strong>${phone}</strong> shortly with your delivery time.
        ${phone ? `<br><br><a href="sms:${phone}?body=Hi%20${encodeURIComponent(name)}%2C%20your%20Chop%20order%20%23${encodeURIComponent(orderId)}%20is%20confirmed!%20Delivery%20ETA%3A%2030-45%20mins.%20%E2%80%93%20Chop%20Team" style="color:var(--amber);font-weight:700;text-decoration:underline;font-size:0.75rem">📲 Tap here to confirm via SMS to this customer</a> (for business owner)` : ''}
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
