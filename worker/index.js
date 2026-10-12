const SESSION_COOKIE = "chop_admin";
const SESSION_SECONDS = 12 * 60 * 60;
const PASSWORD_ITERATIONS = 100000;
const MAX_IMAGE_BYTES = 1024 * 1024;
const DUMMY_PASSWORD_HASH = "v1$100000$c2FsdA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const encoder = new TextEncoder();

const response = (body, status = 200, headers = {}) => new Response(
  typeof body === "string" ? body : JSON.stringify(body),
  {
    status,
    headers: {
      "Content-Type": typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin",
      "X-Frame-Options": "DENY",
      ...headers,
    },
  },
);

function fail(message, status = 400) {
  return response({ error: message }, status);
}

function json(request) {
  return request.json().catch(() => {
    throw new HttpError("Request body must be valid JSON.", 400);
  });
}

class HttpError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

function base64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function digest(value) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function constantTimeEqual(left, right) {
  const a = await digest(String(left));
  const b = await digest(String(right));
  let difference = 0;
  for (let index = 0; index < a.length; index++) difference |= a[index] ^ b[index];
  return difference === 0;
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PASSWORD_ITERATIONS },
    key,
    256,
  );
  return `v1$${PASSWORD_ITERATIONS}$${base64Url(salt)}$${base64Url(new Uint8Array(bits))}`;
}

async function verifyPassword(password, storedHash) {
  const [version, rawIterations, saltText, hashText] = storedHash.split("$");
  const iterations = Number(rawIterations);
  if (version !== "v1" || !Number.isInteger(iterations) || iterations < 100000 || iterations > 1000000) {
    return false;
  }
  const salt = fromBase64Url(saltText);
  const expected = fromBase64Url(hashText);
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const actual = new Uint8Array(await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    expected.length * 8,
  ));
  if (actual.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < actual.length; index++) difference |= actual[index] ^ expected[index];
  return difference === 0;
}

async function signSession(payload, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const encoded = base64Url(encoder.encode(JSON.stringify(payload)));
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(encoded)));
  return `${encoded}.${base64Url(signature)}`;
}

async function readSession(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  if (!match || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return null;
  const [encoded, provided] = match[1].split(".");
  if (!encoded || !provided) return null;
  try {
    const key = await crypto.subtle.importKey("raw", encoder.encode(env.SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encoded)));
    const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(provided), encoder.encode(encoded));
    return valid && Number(payload.expiresAt) > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

function cookieHeader(value, maxAge) {
  return `${SESSION_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return origin && origin === new URL(request.url).origin;
}

function text(value, name, maxLength, { required = false } = {}) {
  const result = String(value ?? "").trim();
  if (required && !result) throw new HttpError(`${name} is required.`);
  if (result.length > maxLength) throw new HttpError(`${name} must be ${maxLength} characters or fewer.`);
  return result;
}

function enumValue(value, name, options, fallback) {
  const result = value === undefined ? fallback : value;
  if (!options.includes(result)) throw new HttpError(`${name} is invalid.`);
  return result;
}

function numberValue(value, name, { optional = false, min = 0, max = 1000000 } = {}) {
  if (optional && (value === null || value === "" || value === undefined)) return null;
  if (value === null || value === "" || value === undefined || (typeof value === "string" && !value.trim())) {
    throw new HttpError(`${name} is required.`);
  }
  const result = Number(value);
  if (!Number.isFinite(result) || result < min || result > max) throw new HttpError(`${name} must be a number between ${min} and ${max}.`);
  return result;
}

function dateValue(value, name) {
  const result = text(value, name, 40);
  if (result && Number.isNaN(Date.parse(result))) throw new HttpError(`${name} must be a valid date and time.`);
  return result;
}

function booleanValue(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function safeUrl(value, name, { allowEmpty = true } = {}) {
  const result = text(value, name, 2048);
  if (!result && allowEmpty) return "";
  if (!result || /[\u0000-\u001f]/.test(result) || result.startsWith("//")) throw new HttpError(`${name} must be a valid URL.`);
  if (result.startsWith("/") || result.startsWith("#")) return result;
  let url;
  try {
    url = new URL(result);
  } catch {
    throw new HttpError(`${name} must be a valid URL.`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:" && url.protocol !== "tel:" && url.protocol !== "mailto:") {
    throw new HttpError(`${name} must use a supported URL scheme.`);
  }
  return result;
}

function imageUrl(value, name = "Image URL") {
  const result = text(value, name, 2048);
  if (!result) return "";
  if (result.startsWith("//") || /[\u0000-\u001f]/.test(result)) throw new HttpError(`${name} must be an HTTPS URL or a site-relative path.`);
  if (/^https:\/\//i.test(result) || (result.startsWith("/") && !result.startsWith("//"))) return result;
  if (/^[a-z][a-z0-9+.-]*:/i.test(result) || result.split(/[\\/]/).includes("..")) {
    throw new HttpError(`${name} must be an HTTPS URL or a site-relative path.`);
  }
  return result;
}

function statusContent(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image_url: row.image_url,
    status: row.status,
    position: row.position,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function productContent(row) {
  let additionalImages = [];
  try {
    additionalImages = JSON.parse(row.additional_images || "[]");
  } catch {
    additionalImages = [];
  }
  return {
    id: row.id,
    categoryId: row.category_id,
    category: row.category_name || "General",
    name: row.name,
    desc: row.description,
    description: row.description,
    price: row.price,
    oldPrice: row.old_price,
    img: row.image_url,
    image_url: row.image_url,
    additionalImages,
    available: row.availability === "available",
    availability: row.availability,
    status: row.status,
    featured: Boolean(row.featured),
    popular: Boolean(row.popular),
    isNew: Boolean(row.is_new),
    hot: Boolean(row.featured),
    position: row.position,
    tags: row.tags,
    ingredients: row.ingredients,
    variant: row.variant,
    preparation: row.preparation,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function products(db, { publicOnly = false } = {}) {
  const condition = publicOnly ? "WHERE p.status = 'published' AND (c.status = 'published' OR p.category_id IS NULL)" : "";
  const result = await db.prepare(
    `SELECT p.*, c.name AS category_name FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ${condition} ORDER BY p.position, p.id`,
  ).all();
  return result.results.map(productContent);
}

async function activePromotions(db, { publicOnly = false } = {}) {
  const condition = publicOnly
    ? "WHERE status = 'published' AND (starts_at IS NULL OR starts_at = '' OR datetime(starts_at) <= datetime('now')) AND (ends_at IS NULL OR ends_at = '' OR datetime(ends_at) >= datetime('now'))"
    : "";
  const result = await db.prepare(`SELECT * FROM promotions ${condition} ORDER BY position, id`).all();
  return result.results.map(row => ({
    ...statusContent(row),
    name: row.name,
    desc: row.description,
    price: row.price,
    original: row.original_price,
    originalPrice: row.original_price,
    badge: row.badge,
    img: row.image_url,
    active: row.status === "published",
    starts_at: row.starts_at,
    ends_at: row.ends_at,
  }));
}

async function publicSite(env) {
  const [menuItems, deals, contentRow, categoryRows, announcementRows, navigationRows, deliveryRows] = await Promise.all([
    products(env.DB, { publicOnly: true }),
    activePromotions(env.DB, { publicOnly: true }),
    env.DB.prepare("SELECT content_value FROM site_content WHERE content_key = 'public'").first(),
    env.DB.prepare("SELECT id, name, description, image_url, position FROM categories WHERE status = 'published' ORDER BY position, id").all(),
    env.DB.prepare(
      "SELECT id, title, message, image_url, link FROM announcements WHERE status = 'published' AND (starts_at IS NULL OR starts_at = '' OR datetime(starts_at) <= datetime('now')) AND (ends_at IS NULL OR ends_at = '' OR datetime(ends_at) >= datetime('now')) ORDER BY id DESC",
    ).all(),
    env.DB.prepare("SELECT id, label, href FROM navigation_items WHERE visible = 1 ORDER BY position, id").all(),
    env.DB.prepare("SELECT id, name, fee, enabled FROM delivery_areas WHERE enabled = 1 ORDER BY name").all(),
  ]);
  let content = {};
  try {
    content = JSON.parse(contentRow?.content_value || "{}");
  } catch (error) {
    console.error("Invalid public content JSON in D1.", error);
  }
  return {
    menuItems,
    deals,
    ...(Array.isArray(content.promoMessages) ? { promoMessages: content.promoMessages } : {}),
    businessInfo: content,
    content,
    categories: categoryRows.results,
    announcements: announcementRows.results,
    navigation: navigationRows.results,
    deliveryAreas: deliveryRows.results,
  };
}

async function logActivity(env, actor, action, type, id, details = "") {
  await env.DB.prepare(
    "INSERT INTO activity_log (admin_email, action, content_type, content_id, details) VALUES (?, ?, ?, ?, ?)",
  ).bind(actor, action, type, id == null ? null : String(id), details).run();
}

function fieldsFor(kind, body) {
  if (kind === "products") {
    const categoryId = body.categoryId === "" || body.categoryId == null ? null : numberValue(body.categoryId, "Category", { min: 1, max: 2147483647 });
    let additionalImages = body.additionalImages ?? [];
    if (typeof additionalImages === "string") {
      try {
        additionalImages = JSON.parse(additionalImages);
      } catch {
        throw new HttpError("Additional images must be valid JSON.");
      }
    }
    if (!Array.isArray(additionalImages) || additionalImages.length > 20) throw new HttpError("Add up to 20 additional images.");
    return {
      category_id: categoryId,
      name: text(body.name, "Product name", 120, { required: true }),
      description: text(body.description ?? body.desc, "Description", 2000),
      price: numberValue(body.price, "Price"),
      old_price: numberValue(body.oldPrice ?? body.old_price, "Previous price", { optional: true }),
      image_url: imageUrl(body.imageUrl ?? body.image_url ?? body.img),
      additional_images: JSON.stringify(additionalImages.map((item, index) => imageUrl(item, `Additional image ${index + 1}`,))),
      availability: enumValue(body.availability, "Availability", ["available", "out_of_stock"], body.available === false ? "out_of_stock" : "available"),
      status: enumValue(body.status, "Status", ["published", "draft", "hidden"], "published"),
      featured: Number(booleanValue(body.featured)),
      popular: Number(booleanValue(body.popular)),
      is_new: Number(booleanValue(body.isNew ?? body.is_new)),
      position: numberValue(body.position ?? 0, "Position", { min: 0, max: 100000 }),
      tags: text(body.tags, "Tags", 500),
      ingredients: text(body.ingredients, "Ingredients", 1000),
      variant: text(body.variant, "Variant", 500),
      preparation: text(body.preparation, "Preparation", 1000),
    };
  }
  if (kind === "categories") {
    return {
      name: text(body.name, "Category name", 80, { required: true }),
      description: text(body.description, "Description", 1000),
      image_url: imageUrl(body.imageUrl ?? body.image_url),
      status: enumValue(body.status, "Status", ["published", "draft", "hidden"], "published"),
      position: numberValue(body.position ?? 0, "Position", { min: 0, max: 100000 }),
    };
  }
  if (kind === "deals") {
    return {
      name: text(body.name, "Promotion name", 120, { required: true }),
      description: text(body.description ?? body.desc, "Description", 2000),
      price: numberValue(body.price, "Price"),
      original_price: numberValue(body.originalPrice ?? body.original_price ?? body.original, "Previous price", { optional: true }),
      badge: text(body.badge, "Badge", 40),
      image_url: imageUrl(body.imageUrl ?? body.image_url ?? body.img),
      status: enumValue(body.status, "Status", ["published", "draft", "hidden"], "published"),
      starts_at: dateValue(body.startsAt ?? body.starts_at, "Start date"),
      ends_at: dateValue(body.endsAt ?? body.ends_at, "End date"),
      position: numberValue(body.position ?? 0, "Position", { min: 0, max: 100000 }),
    };
  }
  if (kind === "announcements") {
    const link = safeUrl(body.link, "Link");
    if (link && !link.startsWith("/") && !link.startsWith("#") && !/^https:\/\//i.test(link)) {
      throw new HttpError("Announcement links must be a site path or HTTPS URL.");
    }
    return {
      title: text(body.title, "Announcement title", 120, { required: true }),
      message: text(body.message, "Announcement message", 2000),
      image_url: imageUrl(body.imageUrl ?? body.image_url),
      link,
      starts_at: dateValue(body.startsAt ?? body.starts_at, "Start date"),
      ends_at: dateValue(body.endsAt ?? body.ends_at, "End date"),
      status: enumValue(body.status, "Status", ["published", "draft", "hidden"], "draft"),
    };
  }
  if (kind === "delivery-areas") {
    return {
      name: text(body.name, "Delivery area", 100, { required: true }),
      fee: numberValue(body.fee, "Delivery fee"),
      enabled: Number(booleanValue(body.enabled)),
    };
  }
  if (kind === "navigation") {
    const href = safeUrl(body.href, "Destination", { allowEmpty: false });
    if (!href.startsWith("/") && !href.startsWith("#") && !/^https:\/\//i.test(href)) {
      throw new HttpError("Navigation destinations must be a site path, section link, or HTTPS URL.");
    }
    return {
      label: text(body.label, "Link label", 60, { required: true }),
      href,
      position: numberValue(body.position ?? 0, "Position", { min: 0, max: 100000 }),
      visible: Number(booleanValue(body.visible)),
    };
  }
  throw new HttpError("Unknown content type.", 404);
}

const RESOURCE_TABLES = {
  products: "products",
  categories: "categories",
  deals: "promotions",
  announcements: "announcements",
  "delivery-areas": "delivery_areas",
  navigation: "navigation_items",
};

async function createRecord(env, kind, body, actor) {
  const fields = fieldsFor(kind, body);
  const table = RESOURCE_TABLES[kind];
  const columns = Object.keys(fields);
  const statement = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;
  const result = await env.DB.prepare(statement).bind(...Object.values(fields)).run();
  const id = result.meta.last_row_id;
  await logActivity(env, actor, "created", kind, id, fields.name || fields.title || fields.label);
  return { id };
}

async function updateRecord(env, kind, id, body, actor) {
  const fields = fieldsFor(kind, body);
  const table = RESOURCE_TABLES[kind];
  const columns = Object.keys(fields);
  const result = await env.DB.prepare(
    `UPDATE ${table} SET ${columns.map(column => `${column} = ?`).join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
  ).bind(...Object.values(fields), id).run();
  if (!result.meta.changes) throw new HttpError("That item no longer exists.", 404);
  await logActivity(env, actor, "updated", kind, id, fields.name || fields.title || fields.label);
}

async function deleteRecord(env, kind, id, actor) {
  const result = await env.DB.prepare(`DELETE FROM ${RESOURCE_TABLES[kind]} WHERE id = ?`).bind(id).run();
  if (!result.meta.changes) throw new HttpError("That item no longer exists.", 404);
  await logActivity(env, actor, "deleted", kind, id);
}

async function adminData(env) {
  const [productRows, categoryRows, promotions, announcements, areas, navigation, contentRow, activityRows, mediaRows] = await Promise.all([
    products(env.DB),
    env.DB.prepare("SELECT * FROM categories ORDER BY position, id").all(),
    activePromotions(env.DB),
    env.DB.prepare("SELECT * FROM announcements ORDER BY id DESC").all(),
    env.DB.prepare("SELECT * FROM delivery_areas ORDER BY name").all(),
    env.DB.prepare("SELECT * FROM navigation_items ORDER BY position, id").all(),
    env.DB.prepare("SELECT content_value, updated_at FROM site_content WHERE content_key = 'public'").first(),
    env.DB.prepare("SELECT id, admin_email, action, content_type, content_id, details, created_at FROM activity_log ORDER BY id DESC LIMIT 50").all(),
    env.DB.prepare("SELECT id, object_key, filename, content_type, size, created_at FROM media ORDER BY created_at DESC").all(),
  ]);
  let content = {};
  try {
    content = JSON.parse(contentRow?.content_value || "{}");
  } catch (error) {
    console.error("Invalid public content JSON in D1.", error);
  }
  return {
    products: productRows,
    categories: categoryRows.results,
    deals: promotions,
    announcements: announcements.results,
    deliveryAreas: areas.results,
    navigation: navigation.results,
    content,
    activity: activityRows.results,
    media: mediaRows.results,
    counts: {
      products: productRows.length,
      available: productRows.filter(item => item.availability === "available" && item.status === "published").length,
      featured: productRows.filter(item => item.featured && item.status === "published").length,
      categories: categoryRows.results.length,
      deals: promotions.length,
      announcements: announcements.results.length,
    },
    lastUpdated: contentRow?.updated_at || null,
  };
}

async function handleLogin(request, env) {
  if (!sameOrigin(request)) return fail("Request origin is not allowed.", 403);
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return fail("Admin authentication is not configured.", 503);
  const body = await json(request);
  const email = text(body.email, "Email", 254, { required: true }).toLowerCase();
  const password = String(body.password ?? "");
  if (!password || password.length > 256) throw new HttpError("Password is required.");
  const ipHash = base64Url(await digest(`${request.headers.get("CF-Connecting-IP") || "unknown"}:${env.SESSION_SECRET || "missing-secret"}`));
  const attempt = await env.DB.prepare("SELECT failed_count, locked_until FROM login_attempts WHERE ip_hash = ?").bind(ipHash).first();
  if (attempt && Number(attempt.locked_until) > Math.floor(Date.now() / 1000)) {
    return fail("Too many attempts. Try again later.", 429);
  }
  const admin = await env.DB.prepare("SELECT id, email, password_hash FROM administrators WHERE email = ?").bind(email).first();
  const passwordValid = await verifyPassword(password, admin?.password_hash || DUMMY_PASSWORD_HASH);
  const valid = Boolean(admin) && passwordValid;
  if (!valid) {
    const failures = Number(attempt?.failed_count || 0) + 1;
    const lockedUntil = failures >= 5 ? Math.floor(Date.now() / 1000) + 900 : 0;
    await env.DB.prepare(
      "INSERT INTO login_attempts (ip_hash, failed_count, locked_until) VALUES (?, ?, ?) ON CONFLICT(ip_hash) DO UPDATE SET failed_count = excluded.failed_count, locked_until = excluded.locked_until, updated_at = unixepoch()",
    ).bind(ipHash, failures, lockedUntil).run();
    return fail("Email or password is incorrect.", 401);
  }
  await env.DB.prepare("DELETE FROM login_attempts WHERE ip_hash = ?").bind(ipHash).run();
  const session = await signSession({ id: admin.id, email: admin.email, expiresAt: Date.now() + SESSION_SECONDS * 1000 }, env.SESSION_SECRET);
  return response({ authenticated: true, email: admin.email }, 200, { "Set-Cookie": cookieHeader(session, SESSION_SECONDS) });
}

async function handleSetup(request, env) {
  if (!sameOrigin(request)) return fail("Request origin is not allowed.", 403);
  if (!env.ADMIN_SETUP_TOKEN || !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    return fail("Admin setup is not configured. Set the required Cloudflare secrets first.", 503);
  }
  const body = await json(request);
  if (!await constantTimeEqual(body.setupToken || "", env.ADMIN_SETUP_TOKEN)) return fail("Setup token is incorrect.", 403);
  const existing = await env.DB.prepare("SELECT COUNT(*) AS total FROM administrators").first();
  if (Number(existing?.total) > 0) return fail("Initial setup has already been completed.", 409);
  const email = text(body.email, "Email", 254, { required: true }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Enter a valid email address.");
  const password = String(body.password ?? "");
  if (!password || password.length > 256) throw new HttpError("Password is required.");
  if (password.length < 12) return fail("Choose a password with at least 12 characters.");
  const passwordHash = await hashPassword(password);
  const created = await env.DB.prepare("INSERT INTO administrators (email, password_hash) VALUES (?, ?)").bind(email, passwordHash).run();
  await logActivity(env, email, "created", "administrator", created.meta.last_row_id, "Initial administrator account");
  const session = await signSession({ id: created.meta.last_row_id, email, expiresAt: Date.now() + SESSION_SECONDS * 1000 }, env.SESSION_SECRET);
  return response({ authenticated: true, email }, 201, { "Set-Cookie": cookieHeader(session, SESSION_SECONDS) });
}

async function handleMedia(request, env, actor, segments) {
  if (request.method === "POST" && segments.length === 1) {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.size) return fail("Choose an image to upload.");
    if (file.size > MAX_IMAGE_BYTES) return fail("Images must be 1 MB or smaller after optimization.", 413);
    const types = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
    const extension = types[file.type];
    if (!extension) return fail("Upload a JPEG, PNG, WebP, or GIF image.");
    const id = crypto.randomUUID();
    const key = `uploads/${id}.${extension}`;
    const filename = text(file.name, "Filename", 180) || `image.${extension}`;
    const imageData = new Uint8Array(await file.arrayBuffer());
    await env.DB.prepare("INSERT INTO media (id, object_key, filename, content_type, size, data) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, key, filename, file.type, file.size, imageData).run();
    await logActivity(env, actor, "uploaded", "media", id, filename);
    return response({ id, filename, size: file.size, url: `/media/${key}` }, 201);
  }
  if (request.method === "DELETE" && segments.length === 2) {
    const id = text(segments[1], "Media ID", 64, { required: true });
    const media = await env.DB.prepare("SELECT * FROM media WHERE id = ?").bind(id).first();
    if (!media) throw new HttpError("Image not found.", 404);
    const url = `/media/${media.object_key}`;
    const references = await env.DB.prepare(
      "SELECT (SELECT COUNT(*) FROM products WHERE image_url = ? OR additional_images LIKE ?) + (SELECT COUNT(*) FROM categories WHERE image_url = ?) + (SELECT COUNT(*) FROM promotions WHERE image_url = ?) + (SELECT COUNT(*) FROM announcements WHERE image_url = ?) + (SELECT COUNT(*) FROM site_content WHERE content_value LIKE ?) AS total",
    ).bind(url, `%${url}%`, url, url, url, `%${url}%`).first();
    if (Number(references.total) > 0) throw new HttpError("This image is assigned to content. Replace it there before deleting.", 409);
    await env.DB.prepare("DELETE FROM media WHERE id = ?").bind(id).run();
    await logActivity(env, actor, "deleted", "media", id, media.filename);
    return response({ deleted: true });
  }
  throw new HttpError("Media action not found.", 404);
}

async function handleAdmin(request, env, session, url) {
  const segments = url.pathname.split("/").filter(Boolean).slice(2);
  if (segments[0] === "session" && request.method === "GET") {
    const admin = await env.DB.prepare("SELECT COUNT(*) AS total FROM administrators").first();
    return response({ authenticated: Boolean(session), email: session?.email || null, setupNeeded: Number(admin?.total) === 0 });
  }
  if (segments[0] === "login" && request.method === "POST") return handleLogin(request, env);
  if (segments[0] === "setup" && request.method === "POST") return handleSetup(request, env);
  if (segments[0] === "logout" && request.method === "POST") {
    if (!sameOrigin(request)) return fail("Request origin is not allowed.", 403);
    return response({ authenticated: false }, 200, { "Set-Cookie": cookieHeader("", 0) });
  }
  if (!session) return fail("You are not authorized to perform this action.", 401);
  if (!sameOrigin(request) && request.method !== "GET") return fail("Request origin is not allowed.", 403);

  if (segments[0] === "data" && request.method === "GET") return response(await adminData(env));
  if (segments[0] === "content") {
    if (request.method === "GET") {
      const row = await env.DB.prepare("SELECT content_value FROM site_content WHERE content_key = 'public'").first();
      return response(JSON.parse(row?.content_value || "{}"));
    }
    if (request.method === "PUT") {
      const body = await json(request);
      const allowed = [
        "businessName", "tagline", "logoImage", "footerLogo", "faviconImage", "heroBadge", "heroHeading", "heroSubheading", "heroDescription",
        "heroPrimaryButton", "heroSecondaryButton", "heroImage", "aboutImage", "aboutSecondImage", "aboutHeading", "aboutDescription",
        "aboutMission", "aboutVision", "aboutValues", "aboutFeatureOneTitle", "aboutFeatureOneBody",
        "aboutFeatureTwoTitle", "aboutFeatureTwoBody", "aboutFeatureThreeTitle", "aboutFeatureThreeBody",
        "dealsHeading", "dealsDescription", "phoneNumber", "whatsappNumber", "email", "location",
        "businessHours", "deliveryDescription", "footerDescription", "footerCopyright", "socialInstagram",
        "socialFacebook", "socialTiktok", "socialTwitter", "googleMapsUrl", "freeDeliveryMinimum",
        "defaultDeliveryFee", "minimumOrder", "deliveryEstimate", "currency", "seoTitle", "seoDescription",
        "heroVisible", "aboutVisible", "dealsVisible", "contactVisible", "footerVisible", "promoMessages",
      ];
      const content = {};
      for (const key of allowed) {
        if (body[key] === undefined) continue;
        if (["logoImage", "footerLogo", "faviconImage", "heroImage", "aboutImage", "aboutSecondImage"].includes(key)) {
          content[key] = imageUrl(body[key], key);
        } else if (["googleMapsUrl", "socialInstagram", "socialFacebook", "socialTiktok", "socialTwitter"].includes(key)) {
          content[key] = safeUrl(body[key], key);
          if (content[key] && !/^https:\/\//i.test(content[key])) throw new HttpError(`${key} must be an HTTPS URL.`);
        } else if (["freeDeliveryMinimum", "defaultDeliveryFee", "minimumOrder"].includes(key)) {
          content[key] = numberValue(body[key], key);
        } else if (["heroVisible", "aboutVisible", "dealsVisible", "contactVisible", "footerVisible"].includes(key)) {
          content[key] = booleanValue(body[key]);
        } else if (key === "promoMessages") {
          if (!Array.isArray(body[key]) || body[key].length > 30) throw new HttpError("Add up to 30 promo messages.");
          content[key] = body[key].map((value, index) => text(value, `Promo message ${index + 1}`, 200, { required: true }));
        } else {
          content[key] = text(body[key], key, 2000);
        }
      }
      const existingRow = await env.DB.prepare("SELECT content_value FROM site_content WHERE content_key = 'public'").first();
      const existing = JSON.parse(existingRow?.content_value || "{}");
      const merged = { ...existing, ...content };
      await env.DB.prepare(
        "INSERT INTO site_content (content_key, content_value, updated_at) VALUES ('public', ?, CURRENT_TIMESTAMP) ON CONFLICT(content_key) DO UPDATE SET content_value = excluded.content_value, updated_at = CURRENT_TIMESTAMP",
      ).bind(JSON.stringify(merged)).run();
      await logActivity(env, session.email, "updated", "website content", "public", "Updated website settings");
      return response(merged);
    }
  }
  if (segments[0] === "media") return handleMedia(request, env, session.email, segments);
  if (segments[0] === "delivery-areas" && request.method === "GET") {
    const result = await env.DB.prepare("SELECT * FROM delivery_areas ORDER BY name").all();
    return response(result.results);
  }
  const kind = segments[0];
  if (!RESOURCE_TABLES[kind]) throw new HttpError("Admin endpoint not found.", 404);
  const id = segments[1];
  if (!id && request.method === "POST") return response(await createRecord(env, kind, await json(request), session.email), 201);
  if (id && request.method === "PUT") {
    if (!/^\d+$/.test(id)) throw new HttpError("Invalid item ID.");
    await updateRecord(env, kind, Number(id), await json(request), session.email);
    return response({ saved: true });
  }
  if (id && request.method === "DELETE") {
    if (!/^\d+$/.test(id)) throw new HttpError("Invalid item ID.");
    await deleteRecord(env, kind, Number(id), session.email);
    return response({ deleted: true });
  }
  throw new HttpError("Admin action not found.", 404);
}

// ============================================================
//  AI CHATBOT — server-side proxy (API keys never reach the browser)
// ============================================================
const CHAT_MAX_MESSAGES = 12;
const CHAT_MAX_MESSAGE_CHARS = 1000;
const CHAT_MAX_TOTAL_CHARS = 6000;
const CHAT_RATE_WINDOW_MS = 10 * 60 * 1000;
const CHAT_RATE_MAX_REQUESTS = 20;
const chatRateBuckets = new Map();

function chatOriginAllowed(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

function chatRateLimited(request) {
  const now = Date.now();
  const key = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "anonymous";
  const bucket = (chatRateBuckets.get(key) || []).filter(time => now - time < CHAT_RATE_WINDOW_MS);
  bucket.push(now);
  chatRateBuckets.set(key, bucket);
  if (chatRateBuckets.size > 5000) {
    for (const [candidate, times] of chatRateBuckets) {
      if (times.every(time => now - time >= CHAT_RATE_WINDOW_MS)) chatRateBuckets.delete(candidate);
    }
  }
  return bucket.length > CHAT_RATE_MAX_REQUESTS;
}

function buildChatSystemPrompt(site) {
  const info = site.businessInfo || {};
  const currency = info.currency || "GH₵";
  const items = Array.isArray(site.menuItems) ? site.menuItems : [];
  const price = value => `${currency}${Number(value || 0).toFixed(2)}`;
  const menu = items
    .filter(item => item.available !== false)
    .map(item => `- ${item.name} (${item.category || "General"}): ${price(item.price)}${item.oldPrice ? `, was ${price(item.oldPrice)}` : ""}${item.desc ? ` — ${item.desc}` : ""}`)
    .join("\n") || "- The menu is being updated. Please check the Menu page.";
  const soldOut = items.filter(item => item.available === false).map(item => item.name).join(", ") || "none";
  const deals = (Array.isArray(site.deals) ? site.deals : [])
    .map(deal => `- ${deal.name}: ${price(deal.price)}${deal.original ? `, was ${price(deal.original)}` : ""}${deal.badge ? ` [${deal.badge}]` : ""}${deal.desc ? ` — ${deal.desc}` : ""}`)
    .join("\n") || "- No active deals right now. Check the Deals page for updates.";
  const areas = (Array.isArray(site.deliveryAreas) ? site.deliveryAreas : [])
    .map(area => `${area.name}${Number(area.fee) ? ` (${price(area.fee)})` : " (free)"}`)
    .join(", ") || "Elmina and Cape Coast";
  const hours = info.businessHours ? String(info.businessHours).replace(/\n/g, "; ") : "not listed";
  const contact = [info.phoneNumber ? `Phone ${info.phoneNumber}` : "", info.whatsappNumber ? `WhatsApp ${info.whatsappNumber}` : "", info.email ? `Email ${info.email}` : ""]
    .filter(Boolean).join(" | ") || "See the Contact page";
  const deliveryNotes = [
    info.deliveryDescription || "Chop delivers within Elmina and Cape Coast only.",
    Number.isFinite(Number(info.freeDeliveryMinimum)) ? `Free delivery on orders over ${price(info.freeDeliveryMinimum)}.` : "",
    Number(info.minimumOrder) > 0 ? `Minimum order ${price(info.minimumOrder)}.` : "",
    info.deliveryEstimate ? `Delivery estimate: ${info.deliveryEstimate}.` : ""
  ].filter(Boolean).join(" ");

  return [
    "You are the Chop Assistant, the friendly chatbot on the Chop website (\"Chop — Taste the Vibe\"), a Ghanaian fast-food brand based in Elmina, Ghana.",
    "",
    "RULES:",
    "- Answer helpfully and concisely, usually in 1-4 short sentences, with warm Ghanaian hospitality.",
    "- Use ONLY the official Chop information below for anything about the business: menu, prices, deals, delivery, hours, contacts, ordering, and the game. Never invent or estimate a price, product, promotion, opening hour, contact detail, or delivery promise.",
    "- If an answer is not covered below, say it needs confirmation and invite the customer to call or WhatsApp the Chop team. Do not guess.",
    "- Prices are in Ghana cedis (GH₵).",
    "- Orders are placed in the website cart and confirmed by SMS; there is no online payment on the site. The Chop team confirms payment and delivery with the customer.",
    "- You may answer general questions (food, Ghana, etc.) from reliable knowledge, but clearly present those as general information, not official Chop business information.",
    "- If a message is off-topic or abusive, stay polite and briefly steer back to how you can help with Chop.",
    "",
    "OFFICIAL CHOP INFORMATION (live from the Chop database):",
    `Business: ${info.businessName || "Chop"}${info.tagline ? ` — ${info.tagline}` : ""}`,
    `Location: ${info.location || "Elmina, Ghana"}`,
    `Opening hours: ${hours}`,
    `Contact: ${contact}`,
    `Delivery: ${deliveryNotes} Delivery areas: ${areas}.`,
    "",
    "CURRENT MENU (available):",
    menu,
    "",
    `TEMPORARILY OUT OF STOCK: ${soldOut}`,
    "",
    "CURRENT DEALS:",
    deals,
    "",
    "HOW TO ORDER: 1) Add items to the cart from the Menu page. 2) Open the cart and go to Checkout. 3) Fill in your details and delivery area. 4) Send the order by SMS — the Chop team then confirms payment and delivery.",
    "",
    "WEBSITE PAGES: Home, Deals, Menu, About, Contact. The Chop Catcher game is at /chop-catcher — score 10,000 points in one run to unlock a free-delivery reward on your next order."
  ].join("\n");
}

async function requestChatCompletion(env, messages) {
  let lastError = null;
  if (env.AI) {
    // llama-3.1-8b-instruct was deprecated on 2026-05-30; the fp8 build is the supported replacement.
    const model = env.AI_MODEL || "@cf/meta/llama-3.1-8b-instruct-fp8";
    try {
      const result = await env.AI.run(model, { messages, max_tokens: 512, temperature: 0.4 });
      const text = result?.response ?? result?.result ?? "";
      if (!text) throw new HttpError("The assistant returned an empty response. Please try again.", 502);
      return String(text);
    } catch (error) {
      lastError = error;
      console.error("CHOP Workers AI completion failed.", error);
      if (!env.CHAT_API_URL || !env.CHAT_API_KEY) {
        throw error instanceof HttpError ? error : new HttpError("The assistant could not respond right now. Please try again in a moment.", 502);
      }
    }
  }
  if (env.CHAT_API_URL && env.CHAT_API_KEY) {
    try {
      const upstream = await fetch(env.CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.CHAT_API_KEY}` },
        body: JSON.stringify({
          model: env.CHAT_MODEL || "gpt-4o-mini",
          messages,
          max_tokens: 512,
          temperature: 0.4
        })
      });
      if (!upstream.ok) throw new HttpError("The assistant is temporarily unavailable. Please try again shortly.", 502);
      const payload = await upstream.json().catch(() => null);
      const text = payload?.choices?.[0]?.message?.content;
      if (!text) throw new HttpError("The assistant returned an empty response. Please try again.", 502);
      return String(text);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError("The assistant could not respond right now. Please try again in a moment.", 502);
    }
  }
  if (lastError) throw lastError instanceof HttpError ? lastError : new HttpError("The assistant could not respond right now. Please try again in a moment.", 502);
  throw new HttpError("The Chop assistant is not connected yet. Please call or WhatsApp the Chop team using the Contact page and they will help you right away.", 503);
}

async function handleChat(request, env) {
  if (!chatOriginAllowed(request)) return fail("Request origin is not allowed.", 403);
  if (chatRateLimited(request)) return fail("Too many messages. Please wait a few minutes before trying again.", 429);
  const body = await json(request);
  const raw = Array.isArray(body?.messages) ? body.messages.slice(-CHAT_MAX_MESSAGES) : [];
  if (!raw.length) return fail("Send a message to start the chat.");
  const conversation = [];
  let totalChars = 0;
  for (const message of raw) {
    const role = message?.role === "assistant" ? "assistant" : "user";
    const content = typeof message?.content === "string" ? message.content.trim() : "";
    if (!content || content.length > CHAT_MAX_MESSAGE_CHARS) return fail("Messages must be between 1 and 1000 characters.");
    totalChars += content.length;
    if (totalChars > CHAT_MAX_TOTAL_CHARS) return fail("This conversation is too long. Please start a new chat.");
    conversation.push({ role, content });
  }
  const site = await publicSite(env);
  const messages = [{ role: "system", content: buildChatSystemPrompt(site) }, ...conversation];
  try {
    const reply = await requestChatCompletion(env, messages);
    return response({ reply });
  } catch (error) {
    if (error instanceof HttpError) return fail(error.message, error.status);
    console.error("CHOP chat completion failed.", error);
    return fail("The assistant could not respond right now. Please try again in a moment.", 502);
  }
}

async function route(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  }
  if (url.pathname === "/admin" || url.pathname === "/admin/" || url.pathname === "/admin.html") {
    const page = await env.ASSETS.fetch(new Request(new URL("/admin.html", request.url), request));
    const headers = new Headers(page.headers);
    headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https: data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "same-origin");
    headers.set("X-Content-Type-Options", "nosniff");
    return new Response(page.body, { status: page.status, headers });
  }
  if (url.pathname === "/api/site" && request.method === "GET") return response(await publicSite(env));
  if (url.pathname === "/api/chat" && request.method === "POST") return handleChat(request, env);
  if (url.pathname.startsWith("/api/admin/")) {
    const session = await readSession(request, env);
    return handleAdmin(request, env, session, url);
  }
  if (url.pathname.startsWith("/media/") && request.method === "GET") {
    const key = decodeURIComponent(url.pathname.slice("/media/".length));
    if (!/^uploads\/[0-9a-f-]{36}\.(jpg|png|webp|gif)$/i.test(key)) return fail("Image not found.", 404);
    const image = await env.DB.prepare("SELECT content_type, data FROM media WHERE object_key = ?").bind(key).first();
    if (!image?.data) return fail("Image not found.", 404);
    const headers = new Headers({
      "Content-Type": image.content_type,
      ETag: `"${key}"`,
    });
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("X-Content-Type-Options", "nosniff");
    return new Response(image.data, { headers });
  }
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (error) {
      if (error instanceof HttpError) return fail(error.message, error.status);
      if (/UNIQUE constraint failed/i.test(String(error?.message))) {
        console.warn("Duplicate content value rejected.", error);
        return fail("An item with that name already exists.", 409);
      }
      if (/CHECK constraint failed|FOREIGN KEY constraint failed/i.test(String(error?.message))) {
        console.warn("Content validation constraint rejected the request.", error);
        return fail("Some submitted values are invalid. Review the form and try again.", 400);
      }
      console.error("CHOP request failed.", error);
      return fail("Unable to complete the request. Please try again.", 500);
    }
  },
};
