CREATE TABLE administrators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  singleton INTEGER NOT NULL DEFAULT 1 UNIQUE CHECK (singleton = 1),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE login_attempts (
  ip_hash TEXT PRIMARY KEY,
  failed_count INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'hidden')),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price REAL NOT NULL CHECK (price >= 0),
  old_price REAL CHECK (old_price IS NULL OR old_price >= 0),
  image_url TEXT NOT NULL DEFAULT '',
  additional_images TEXT NOT NULL DEFAULT '[]',
  availability TEXT NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'out_of_stock')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'hidden')),
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  popular INTEGER NOT NULL DEFAULT 0 CHECK (popular IN (0, 1)),
  is_new INTEGER NOT NULL DEFAULT 0 CHECK (is_new IN (0, 1)),
  position INTEGER NOT NULL DEFAULT 0,
  tags TEXT NOT NULL DEFAULT '',
  ingredients TEXT NOT NULL DEFAULT '',
  variant TEXT NOT NULL DEFAULT '',
  preparation TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promotions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price REAL NOT NULL CHECK (price >= 0),
  original_price REAL CHECK (original_price IS NULL OR original_price >= 0),
  badge TEXT NOT NULL DEFAULT 'Deal',
  image_url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'hidden')),
  starts_at TEXT,
  ends_at TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  starts_at TEXT,
  ends_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'hidden')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  fee REAL NOT NULL DEFAULT 0 CHECK (fee >= 0),
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_content (
  content_key TEXT PRIMARY KEY,
  content_value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE navigation_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  visible INTEGER NOT NULL DEFAULT 1 CHECK (visible IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_id TEXT,
  details TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX products_public_order ON products(status, position, id);
CREATE INDEX promotions_public_order ON promotions(status, position, id);
CREATE INDEX announcements_public_status ON announcements(status, starts_at, ends_at);
CREATE INDEX activity_log_recent ON activity_log(id DESC);

INSERT INTO categories (id, name, position) VALUES
  (1, 'Rice Dishes', 1),
  (2, 'Traditional', 2),
  (3, 'Gari Specials', 3),
  (4, 'Akyeke', 4),
  (5, 'Snacks', 5),
  (6, 'Drinks', 6);

INSERT INTO products
  (id, category_id, name, description, price, old_price, image_url, availability, featured, popular, position)
VALUES
  (1, 1, 'Rice & Beans Stew', 'Classic Ghanaian rice and beans served with rich tomato stew. A hearty, satisfying everyday favourite.', 30, 38, 'food images/riceandbeansstew.jpeg', 'out_of_stock', 0, 0, 1),
  (2, 1, 'Rice & Beans Stew with Fish', 'Rice and beans stew elevated with seasoned fried fish on the side — full Ghanaian vibes.', 38, NULL, 'food images/riceandbeansstew.jpeg', 'out_of_stock', 0, 0, 2),
  (3, 1, 'Rice & Palava Stew with Egg', 'Steamed white rice served with rich palava (kontomire) sauce and a boiled egg — pure comfort food.', 40, 48, 'food images/riceandpalava sauce.jpeg', 'out_of_stock', 0, 0, 3),
  (4, 1, 'Rice & Vegetable Stew', 'Light, nutritious rice paired with a fresh garden vegetable stew — clean, balanced, and delicious.', 35, 38, 'food images/riceandstewandchicken.jpeg', 'out_of_stock', 0, 0, 4),
  (5, 2, 'Ga Kenkey & Fried Fish', 'Authentic Ga kenkey served with crispy seasoned fried fish and fiery pepper sauce. A true Ghanaian classic.', 30, 38, 'food images/Ga Kenkey.jpeg', 'out_of_stock', 0, 0, 5),
  (6, 2, 'Waakye', 'Iconic Ghanaian waakye (rice & beans) loaded with stew, spaghetti, egg, gari, and plantain. The full experience.', 35, 40, 'food images/waakye.jpeg', 'out_of_stock', 0, 0, 6),
  (7, 2, 'Spaghetti', 'Ghanaian-style spaghetti cooked with rich tomato and pepper sauce. Served as a standalone or side.', 25, 30, 'food images/spaghetti.jpeg', 'out_of_stock', 0, 0, 7),
  (8, 3, 'Gari & Beans with Fried Plantain & Pear', 'Creamy gari and beans served with sweet fried plantain and ripe avocado pear. A power combo.', 40, 48, 'food images/gariandbeans.jpeg', 'out_of_stock', 0, 0, 8),
  (9, 3, 'Gari & Beans with Fried Plantain', 'Classic gari soakings paired with seasoned beans and golden fried plantain. Simple and satisfying.', 45, 48, 'food images/gariandbeanswithplantain.jpeg', 'out_of_stock', 0, 0, 9),
  (13, 4, 'Akyeke (Attiéké)', 'Traditional Ivorian cassava couscous served with grilled fish, spicy pepper sauce, and fresh vegetables.', 20, 55, 'food images/akyeke.jpg', 'available', 0, 0, 10),
  (10, 5, 'Spring Rolls', 'Crispy golden spring rolls stuffed with spiced vegetables. Perfect as a starter or street-style snack.', 10, 15, 'food images/springrolls.jpeg', 'available', 0, 0, 11),
  (16, 5, 'Chips', 'Crispy golden potato chips, perfectly salted and served hot.', 5, NULL, 'food images/chips.jpg', 'available', 0, 0, 12),
  (17, 5, 'Pastries', 'Freshly baked assorted pastries — meat pie, sausage rolls, and more.', 20, NULL, 'food images/patries.jpg', 'available', 0, 0, 13),
  (18, 5, 'Plantain Chips', 'Crunchy fried plantain chips, sweet and savory — a Ghanaian favorite.', 5, NULL, 'food images/plantian chips.jpg', 'available', 0, 0, 14),
  (11, 6, 'Hibiscus Juice (Sobolo)', 'Refreshing chilled hibiscus flower drink blended with ginger and citrus — bold, tangy, and authentic.', 7, 10, 'food images/hibiscus.jpeg', 'out_of_stock', 0, 0, 15),
  (12, 6, 'Vico Strawberry', 'Sweet and creamy Vico strawberry flavoured drink — a beloved Ghanaian treat for all ages.', 4, 10, 'food images/VicoStrawberry.jpeg', 'out_of_stock', 0, 0, 16),
  (15, 6, 'Chilled Soft Drinks', 'Coke, Fanta, Sprite, or Malta — always ice-cold and served right.', 10, NULL, 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80&fit=crop', 'out_of_stock', 0, 0, 17);

INSERT INTO promotions (name, description, price, original_price, badge, image_url, position) VALUES
  ('Waakye Family Box', 'Waakye with all toppings for 4 — stew, spaghetti, egg, plantain, and drinks.', 100, 120, '17% OFF', 'food images/waakye.jpeg', 1),
  ('Kenkey Combo Deal', 'Ga Kenkey + fried fish + Sobolo drink — the ultimate classic Ghanaian meal deal.', 70, 100, '30% OFF', 'food images/Ga Kenkey.jpeg', 2),
  ('Gari Power Plate', 'Gari & beans with plantain, pear, and a chilled Vico Strawberry drink.', 50, 80, '38% OFF', 'food images/gariandbeans.jpeg', 3),
  ('Spring Rolls Party Pack', '10 crispy spring rolls with dipping sauce — perfect for sharing or snacking.', 10, 12, '17% OFF', 'food images/springrolls.jpeg', 4);

INSERT INTO delivery_areas (name, fee, enabled) VALUES
  ('Elmina', 5, 1),
  ('Cape Coast', 5, 1),
  ('Elmina - Benya', 5, 1),
  ('Elmina - Bantuma', 5, 1),
  ('Cape Coast - Pedu', 5, 1),
  ('Cape Coast - Abura', 5, 1);

INSERT INTO site_content (content_key, content_value) VALUES
  ('public', '{"businessName":"Chop","tagline":"Taste the Vibe","heroBadge":"Ghana''s Hottest Fast Food","heroHeading":"Taste the Vibe","heroSubheading":"Bold. Fresh. Unmatched.","heroDescription":"Experience Ghanaian fast food like never before — crispy, flavourful, and made to hit different every single time. From the heart of Elmina to your doorstep.","heroPrimaryButton":"Explore Menu","heroSecondaryButton":"View Deals","heroImage":"food images/akyeke.jpg","aboutHeading":"We Don''t Just Cook. We Vibe.","aboutDescription":"Born in Elmina, Chop is more than a fast food brand — it''s a movement. We blend bold West African flavours with modern fast-food energy to give you an experience that hits different. Fresh ingredients, real spice, and zero compromise.","aboutFeatureOneTitle":"Freshly Prepared Daily","aboutFeatureOneBody":"Every meal is prepped fresh — no reheated leftovers, ever. That''s the Chop promise.","aboutFeatureTwoTitle":"Local Delivery — Elmina to Cape Coast","aboutFeatureTwoBody":"We deliver across the Elmina–Cape Coast corridor. Fast, reliable, and always on time.","aboutFeatureThreeTitle":"Authentic Ghanaian Flavours","aboutFeatureThreeBody":"Our secret spice blends bring the real taste of Ghana — bold, aromatic, and unforgettable.","dealsHeading":"Today''s Special Offers","dealsDescription":"Limited time deals — grab them before they''re gone!","phoneNumber":"053 832 5214","whatsappNumber":"055 461 1569","email":"","location":"Elmina, Ghana","businessHours":"Mon–Sat: 8AM – 11PM\nSunday: 10AM – 9PM","deliveryDescription":"We deliver to customers within Elmina and Cape Coast only. Free delivery on orders over GH₵100. Standard delivery: GH₵2–GH₵5 depending on your location within the delivery zone.","footerDescription":"Ghana''s boldest fast food brand. We serve up crispy, flavourful meals with a Ghanaian soul and a modern vibe. Based in Elmina — delivering the experience to your doorstep across Elmina and Cape Coast.","footerCopyright":"© 2025 Chop Ghana. All rights reserved. Made with love in Elmina.","socialInstagram":"","socialFacebook":"","socialTiktok":"","socialTwitter":"","freeDeliveryMinimum":100,"defaultDeliveryFee":5,"minimumOrder":0,"deliveryEstimate":"30–60 minutes","currency":"GH₵","seoTitle":"Chop — Taste the Vibe","seoDescription":"Fresh Ghanaian food in Elmina and Cape Coast.","heroVisible":true,"aboutVisible":true,"dealsVisible":true,"contactVisible":true,"footerVisible":true}');

UPDATE site_content
SET content_value = json_set(content_value, '$.promoMessages', json_array(
  '🔥 Free Delivery on Orders Over GH₵100',
  '⚡ Fresh Waakye — Served Daily!',
  '🎉 Kenkey Combo Deal — GH₵40 Only!',
  '📍 Delivering in Elmina & Cape Coast',
  '🍽️ Authentic Ghanaian Meals — Made Fresh',
  '💯 Real Ghanaian Flavours, Zero Compromise',
  '🚀 Order via WhatsApp — Fast & Easy',
  '🏆 Rated 4.9★ by Our Customers'
))
WHERE content_key = 'public';

INSERT INTO navigation_items (label, href, position) VALUES
  ('Home', '#hero', 1),
  ('Deals', '#deals', 2),
  ('Menu', '#menu', 3),
  ('About', '#about', 4),
  ('Contact', '#contact', 5);
