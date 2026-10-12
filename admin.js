const byId = id => document.getElementById(id);
const html = value => String(value ?? "").replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));
const asset = value => {
  const url = String(value || "");
  if (/^https:\/\//i.test(url) || (url.startsWith("/") && !url.startsWith("//"))) return url;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith("//") && !url.split(/[\\/]/).includes("..")) return url;
  return "";
};

let adminEmail = "";
let adminData = null;
let currentPage = "dashboard";
let editorContext = null;
let toastTimer = null;

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const result = await fetch(path, { credentials: "same-origin", cache: "no-store", ...options, headers });
  const payload = await result.json().catch(() => ({}));
  if (!result.ok) throw new Error(payload.error || "Unable to complete the request. Please try again.");
  return payload;
}

function showToast(message, error = false) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.style.background = error ? "#8a211a" : "";
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function setMessage(element, message, success = false) {
  element.textContent = message;
  element.classList.toggle("success", success);
}

function showAuth(setupNeeded = false, message = "") {
  byId("authView").hidden = false;
  byId("appView").hidden = true;
  byId("authTitle").textContent = setupNeeded ? "Set up admin access" : "Welcome back";
  byId("authDescription").textContent = setupNeeded
    ? "Create the first administrator account. You will only do this once."
    : "Sign in to manage the Chop website.";
  byId("setupNotice").hidden = !setupNeeded;
  byId("setupTokenGroup").hidden = !setupNeeded;
  byId("setupToken").required = setupNeeded;
  byId("authPassword").autocomplete = setupNeeded ? "new-password" : "current-password";
  byId("authPassword").minLength = setupNeeded ? 12 : 1;
  byId("authSubmit").textContent = setupNeeded ? "Create administrator" : "Sign in";
  byId("authForm").dataset.setup = String(setupNeeded);
  setMessage(byId("authMessage"), message);
}

async function checkSession() {
  try {
    const session = await api("/api/admin/session");
    if (session.authenticated) {
      adminEmail = session.email;
      byId("adminEmail").textContent = adminEmail;
      byId("authView").hidden = true;
      byId("appView").hidden = false;
      await loadData();
      renderPage("dashboard");
    } else {
      showAuth(session.setupNeeded);
    }
  } catch (error) {
    showAuth(false, error.message);
  }
}

async function loadData() {
  adminData = await api("/api/admin/data");
}

function activeNav(page) {
  document.querySelectorAll("#sideNav button").forEach(button => {
    button.classList.toggle("active", button.dataset.page === page);
  });
}

function pageHeading(title, description, action = "") {
  return `<div class="page-heading"><div><h2>${html(title)}</h2><p>${html(description)}</p></div>${action}</div>`;
}

function badge(status) {
  const value = String(status || "draft");
  return `<span class="badge ${html(value)}">${html(value.replaceAll("_", " "))}</span>`;
}

function imageThumb(url, title) {
  const safe = asset(url);
  return safe
    ? `<img class="thumb" src="${html(safe)}" alt="" loading="lazy" />`
    : `<span class="thumb" aria-hidden="true"></span>`;
}

function dashboardPage() {
  const counts = adminData.counts;
  const recent = adminData.activity.slice(0, 7);
  const recentRows = recent.length ? recent.map(item => `
    <tr><td>${html(item.action)}</td><td>${html(item.content_type)}${item.details ? ` · ${html(item.details)}` : ""}</td><td>${html(item.admin_email)}</td><td>${html(new Date(item.created_at + "Z").toLocaleString())}</td></tr>
  `).join("") : `<tr><td colspan="4">No changes recorded yet.</td></tr>`;
  return `${pageHeading("Your store at a glance", "Manage products and site content without changing code.", `<a class="button secondary" href="/" target="_blank" rel="noopener">Preview website ↗</a>`)}
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Total products</div><div class="stat-value">${counts.products}</div></div>
      <div class="stat-card"><div class="stat-label">Available & published</div><div class="stat-value">${counts.available}</div></div>
      <div class="stat-card"><div class="stat-label">Featured products</div><div class="stat-value">${counts.featured}</div></div>
      <div class="stat-card"><div class="stat-label">Categories</div><div class="stat-value">${counts.categories}</div></div>
    </div>
    <section class="panel site-status-panel"><h3>Website status</h3><p><span class="status-dot"></span> Connected to the live CMS database. Public content changes are delivered without redeploying the site.</p></section>
    <div class="dashboard-grid">
      <section class="panel"><h3>Recently updated</h3><div class="table-wrap"><table><thead><tr><th>Action</th><th>Content</th><th>Admin</th><th>Date</th></tr></thead><tbody>${recentRows}</tbody></table></div></section>
      <section class="panel"><h3>Quick actions</h3><div class="quick-actions">
        <button data-go="products" data-create="product">＋ Add a product</button>
        <button data-go="categories">＋ Manage categories</button>
        <button data-go="content">✎ Edit website content</button>
        <button data-go="media">▧ Upload an image</button>
      </div></section>
    </div>`;
}

function productsPage() {
  const categoryOptions = [`<option value="">All categories</option>`, ...adminData.categories.map(category => `<option value="${category.id}">${html(category.name)}</option>`)].join("");
  return `${pageHeading("Products", "Add menu items, update prices, and control what appears on your public menu.", `<button class="button primary" data-create="product">＋ Add product</button>`)}
    <div class="filter-row">
      <input class="search-control" id="productSearch" type="search" placeholder="Search products…" aria-label="Search products" />
      <select class="filter-control" id="productCategory">${categoryOptions}</select>
      <select class="filter-control" id="productAvailability"><option value="">Any availability</option><option value="available">Available</option><option value="out_of_stock">Out of stock</option></select>
      <select class="filter-control" id="productStatus"><option value="">Any publishing status</option><option value="published">Published</option><option value="draft">Draft</option><option value="hidden">Hidden</option></select>
      <select class="filter-control" id="productSort"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="az">Name A–Z</option><option value="za">Name Z–A</option></select>
    </div>
    <div id="productTable"></div>`;
}

function filteredProducts() {
  let records = [...adminData.products];
  const query = (byId("productSearch")?.value || "").trim().toLocaleLowerCase();
  const category = byId("productCategory")?.value || "";
  const availability = byId("productAvailability")?.value || "";
  const status = byId("productStatus")?.value || "";
  const sort = byId("productSort")?.value || "newest";
  records = records.filter(item =>
    (!query || `${item.name} ${item.description} ${item.tags}`.toLocaleLowerCase().includes(query)) &&
    (!category || String(item.categoryId) === category) &&
    (!availability || item.availability === availability) &&
    (!status || item.status === status),
  );
  records.sort((left, right) => {
    if (sort === "az") return left.name.localeCompare(right.name);
    if (sort === "za") return right.name.localeCompare(left.name);
    return sort === "oldest" ? left.id - right.id : right.id - left.id;
  });
  return records;
}

function renderProductTable() {
  const target = byId("productTable");
  if (!target) return;
  const records = filteredProducts();
  if (!records.length) {
    target.innerHTML = `<div class="empty-card">No products match those filters.</div>`;
    return;
  }
  target.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Availability</th><th>Visibility</th><th>Flags</th><th>Actions</th></tr></thead><tbody>${records.map(item => `
    <tr>
      <td><div class="item-cell">${imageThumb(item.img, item.name)}<div><span class="item-title">${html(item.name)}</span><span class="item-subtitle">${html(item.description)}</span></div></div></td>
      <td>${html(item.category)}</td><td>GH₵${Number(item.price).toFixed(2)}</td>
      <td>${badge(item.availability)}</td><td>${badge(item.status)}</td>
      <td>${[item.featured && "Featured", item.popular && "Popular", item.isNew && "New"].filter(Boolean).map(label => `<span class="badge">${label}</span>`).join(" ") || "—"}</td>
      <td><div class="table-actions"><button class="small-button" data-edit="product" data-id="${item.id}">Edit</button><button class="small-button remove" data-delete="products" data-id="${item.id}" data-name="${html(item.name)}">Delete</button></div></td>
    </tr>`).join("")}</tbody></table></div>`;
}

function categoriesPage() {
  const records = adminData.categories;
  return `${pageHeading("Categories", "Organize the menu and choose which sections are visible.", `<button class="button primary" data-create="category">＋ Add category</button>`)}
  ${records.length ? `<div class="table-wrap"><table><thead><tr><th>Category</th><th>Description</th><th>Products</th><th>Visibility</th><th>Order</th><th>Actions</th></tr></thead><tbody>${records.map(category => {
    const count = adminData.products.filter(product => product.categoryId === category.id).length;
    return `<tr><td><div class="item-cell">${imageThumb(category.image_url, category.name)}<span class="item-title">${html(category.name)}</span></div></td><td>${html(category.description)}</td><td>${count}</td><td>${badge(category.status)}</td><td>${category.position}</td><td><div class="table-actions"><button class="small-button" data-edit="category" data-id="${category.id}">Edit</button><button class="small-button remove" data-delete="categories" data-id="${category.id}" data-name="${html(category.name)}">Delete</button></div></td></tr>`;
  }).join("")}</tbody></table></div>` : `<div class="empty-card">No categories yet. Add one to organize your menu.</div>`}`;
}

function promotionsPage() {
  return `${pageHeading("Promotions", "Manage the deals shown in the Chop specials section.", `<button class="button primary" data-create="deal">＋ Add promotion</button>`)}
  ${adminData.deals.length ? `<div class="table-wrap"><table><thead><tr><th>Promotion</th><th>Price</th><th>Previous price</th><th>Status</th><th>Actions</th></tr></thead><tbody>${adminData.deals.map(item => `<tr><td><div class="item-cell">${imageThumb(item.img, item.name)}<div><span class="item-title">${html(item.name)}</span><span class="item-subtitle">${html(item.badge)}</span></div></div></td><td>GH₵${Number(item.price).toFixed(2)}</td><td>${item.original == null ? "—" : `GH₵${Number(item.original).toFixed(2)}`}</td><td>${badge(item.status)}</td><td><div class="table-actions"><button class="small-button" data-edit="deal" data-id="${item.id}">Edit</button><button class="small-button remove" data-delete="deals" data-id="${item.id}" data-name="${html(item.name)}">Delete</button></div></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-card">No promotions yet.</div>`}`;
}

function announcementsPage() {
  return `${pageHeading("Announcements", "Publish time-limited news and messages on the public website.", `<button class="button primary" data-create="announcement">＋ Add announcement</button>`)}
  ${adminData.announcements.length ? `<div class="table-wrap"><table><thead><tr><th>Announcement</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead><tbody>${adminData.announcements.map(item => `<tr><td><span class="item-title">${html(item.title)}</span><span class="item-subtitle">${html(item.message)}</span></td><td>${html(item.starts_at || "Any time")}<br>${html(item.ends_at || "")}</td><td>${badge(item.status)}</td><td><div class="table-actions"><button class="small-button" data-edit="announcement" data-id="${item.id}">Edit</button><button class="small-button remove" data-delete="announcements" data-id="${item.id}" data-name="${html(item.title)}">Delete</button></div></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-card">No announcements yet.</div>`}`;
}

const contentGroups = [
  {
    title: "Brand & homepage hero",
    fields: [
      ["businessName", "Business name"], ["tagline", "Tagline"], ["logoImage", "Site logo URL"], ["faviconImage", "Favicon URL"], ["heroBadge", "Hero badge"],
      ["heroHeading", "Hero heading"], ["heroSubheading", "Hero subheading"],
      ["heroDescription", "Hero description", "textarea"], ["heroImage", "Hero image URL"],
      ["heroPrimaryButton", "Primary button text"], ["heroSecondaryButton", "Secondary button text"],
      ["heroVisible", "Show hero section", "checkbox"],
    ],
  },
  {
    title: "About Chop",
    fields: [
      ["aboutHeading", "About title"], ["aboutDescription", "About description", "textarea"],
      ["aboutImage", "Main About image URL"], ["aboutSecondImage", "Secondary About image URL"],
      ["aboutMission", "Mission", "textarea"], ["aboutVision", "Vision", "textarea"],
      ["aboutValues", "Values", "textarea"], ["aboutFeatureOneTitle", "Feature 1 title"], ["aboutFeatureOneBody", "Feature 1 text", "textarea"],
      ["aboutFeatureTwoTitle", "Feature 2 title"], ["aboutFeatureTwoBody", "Feature 2 text", "textarea"],
      ["aboutFeatureThreeTitle", "Feature 3 title"], ["aboutFeatureThreeBody", "Feature 3 text", "textarea"],
      ["aboutVisible", "Show About section", "checkbox"],
    ],
  },
  {
    title: "Contact & business hours",
    fields: [
      ["phoneNumber", "Phone number"], ["whatsappNumber", "WhatsApp number"],
      ["email", "Email address"], ["location", "Location"], ["googleMapsUrl", "Google Maps link"],
      ["businessHours", "Opening hours", "textarea"], ["contactVisible", "Show Contact section", "checkbox"],
    ],
  },
  {
    title: "Delivery & currency",
    fields: [
      ["deliveryDescription", "Delivery information", "textarea"], ["defaultDeliveryFee", "Default delivery fee", "number"],
      ["freeDeliveryMinimum", "Free delivery minimum", "number"], ["minimumOrder", "Minimum order", "number"],
      ["deliveryEstimate", "Estimated delivery time"], ["currency", "Currency symbol"],
    ],
  },
  {
    title: "Promotional strip",
    fields: [["promoMessages", "Promo messages (one per line)", "lines"], ["dealsVisible", "Show promotions section", "checkbox"]],
  },
  {
    title: "Footer, social & search",
    fields: [
      ["footerDescription", "Footer description", "textarea"], ["footerCopyright", "Copyright text"],
      ["footerLogo", "Footer logo URL"],
      ["socialInstagram", "Instagram URL"], ["socialFacebook", "Facebook URL"], ["socialTiktok", "TikTok URL"],
      ["socialTwitter", "X / Twitter URL"], ["seoTitle", "Search title"], ["seoDescription", "Search description", "textarea"],
      ["footerVisible", "Show footer", "checkbox"],
    ],
  },
];

function contentInput([name, label, type = "text"], content) {
  const value = content[name];
  const id = `content-${name}`;
  if (type === "checkbox") {
    return `<label class="field checkbox-field"><input id="${id}" name="${html(name)}" type="checkbox" ${value !== false ? "checked" : ""} /> ${html(label)}</label>`;
  }
  if (type === "textarea") {
    return `<label class="field wide">${html(label)}<textarea id="${id}" name="${html(name)}" rows="3">${html(value || "")}</textarea></label>`;
  }
  if (type === "lines") {
    return `<label class="field wide">${html(label)}<textarea id="${id}" name="${html(name)}" rows="5">${html(Array.isArray(value) ? value.join("\n") : "")}</textarea></label>`;
  }
  return `<label class="field">${html(label)}<input id="${id}" name="${html(name)}" type="${type}" value="${html(value ?? "")}" ${type === "number" ? 'min="0" step="0.01"' : ""} /></label>`;
}

function contentPage() {
  const groups = contentGroups.map(group => `<section class="content-group"><h3>${html(group.title)}</h3><div class="form-grid">${group.fields.map(field => contentInput(field, adminData.content)).join("")}</div></section>`).join("");
  return `${pageHeading("Website content", "These changes update the public site from the database; no site redeploy is needed.", `<div class="button-row"><button id="previewContent" class="button secondary" type="button">Preview values</button><button id="saveContent" class="button primary" type="button">Save website content</button></div>`)}
    <div id="contentPreview" class="notice" hidden></div>
    <form id="contentForm" class="content-groups">${groups}<p id="contentMessage" class="form-message" role="status"></p></form>`;
}

function deliveryPage() {
  return `${pageHeading("Delivery areas", "Set service areas and fees. Disabled areas are hidden from the checkout area selector.", `<button class="button primary" data-create="delivery-area">＋ Add area</button>`)}
  ${adminData.deliveryAreas.length ? `<div class="table-wrap"><table><thead><tr><th>Area</th><th>Fee</th><th>Status</th><th>Actions</th></tr></thead><tbody>${adminData.deliveryAreas.map(area => `<tr><td>${html(area.name)}</td><td>GH₵${Number(area.fee).toFixed(2)}</td><td>${area.enabled ? badge("available") : badge("hidden")}</td><td><div class="table-actions"><button class="small-button" data-edit="delivery-area" data-id="${area.id}">Edit</button><button class="small-button remove" data-delete="delivery-areas" data-id="${area.id}" data-name="${html(area.name)}">Delete</button></div></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-card">No delivery areas configured yet.</div>`}`;
}

function navigationPage() {
  return `${pageHeading("Navigation", "Manage the public menu links and their order. Admin access stays fixed and cannot be removed.", `<button class="button primary" data-create="navigation">＋ Add link</button>`)}
  ${adminData.navigation.length ? `<div class="table-wrap"><table><thead><tr><th>Label</th><th>Destination</th><th>Order</th><th>Visibility</th><th>Actions</th></tr></thead><tbody>${adminData.navigation.map(item => `<tr><td>${html(item.label)}</td><td>${html(item.href)}</td><td>${item.position}</td><td>${item.visible ? badge("published") : badge("hidden")}</td><td><div class="table-actions"><button class="small-button" data-edit="navigation" data-id="${item.id}">Edit</button><button class="small-button remove" data-delete="navigation" data-id="${item.id}" data-name="${html(item.label)}">Delete</button></div></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-card">No public navigation links configured.</div>`}`;
}

function mediaPage() {
  return `${pageHeading("Media library", "Images are stored in your free D1 database. Upload optimized JPEG, PNG, WebP or GIF images up to 1 MB.", "")}
    <form id="uploadForm" class="upload-box"><input id="mediaFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required /><button class="button primary" type="submit">Upload image</button><span id="uploadMessage" class="form-message"></span></form>
    ${adminData.media.length ? `<div class="media-grid">${adminData.media.map(item => `<article class="media-card"><img src="${html(`/media/${item.object_key}`)}" alt="${html(item.filename)}" loading="lazy" /><div class="media-info"><strong title="${html(item.filename)}">${html(item.filename)}</strong><small>${(item.size / 1024).toFixed(0)} KB</small><button class="button secondary" data-copy="${html(`/media/${item.object_key}`)}">Copy image URL</button><button class="button danger" data-delete-media="${html(item.id)}" data-name="${html(item.filename)}">Delete</button></div></article>`).join("")}</div>` : `<div class="empty-card">Your media library is empty. Upload an image to get started.</div>`}`;
}

function activityPage() {
  return `${pageHeading("Activity log", "A record of recent administrator changes.", "")}
  ${adminData.activity.length ? `<div class="table-wrap"><table><thead><tr><th>Action</th><th>Content</th><th>Administrator</th><th>Date & time</th></tr></thead><tbody>${adminData.activity.map(item => `<tr><td>${html(item.action)}</td><td>${html(item.content_type)}${item.details ? ` · ${html(item.details)}` : ""}</td><td>${html(item.admin_email)}</td><td>${html(new Date(item.created_at + "Z").toLocaleString())}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-card">No activity yet.</div>`}`;
}

function renderPage(page) {
  currentPage = page;
  activeNav(page);
  const titles = {
    dashboard: "Dashboard", products: "Products", categories: "Categories", deals: "Promotions",
    announcements: "Announcements", content: "Website content", delivery: "Delivery areas",
    navigation: "Navigation", media: "Media library", activity: "Activity log",
  };
  byId("pageTitle").textContent = titles[page] || "Dashboard";
  const renderers = {
    dashboard: dashboardPage, products: productsPage, categories: categoriesPage, deals: promotionsPage,
    announcements: announcementsPage, content: contentPage, delivery: deliveryPage,
    navigation: navigationPage, media: mediaPage, activity: activityPage,
  };
  byId("pageContent").innerHTML = (renderers[page] || dashboardPage)();
  byId("sidebar").classList.remove("open");
  byId("sidebarBackdrop").classList.remove("visible");
  if (page === "products") {
    ["productSearch", "productCategory", "productAvailability", "productStatus", "productSort"].forEach(id => {
      byId(id).addEventListener(id === "productSearch" ? "input" : "change", renderProductTable);
    });
    renderProductTable();
  }
  if (page === "content") attachContentEvents();
  if (page === "media") attachMediaEvents();
}

function attachContentEvents() {
  byId("saveContent").addEventListener("click", saveContent);
  byId("previewContent").addEventListener("click", () => {
    const form = byId("contentForm");
    const preview = byId("contentPreview");
    const heading = form.elements.heroHeading.value.trim();
    const subheading = form.elements.heroSubheading.value.trim();
    const description = form.elements.heroDescription.value.trim();
    preview.textContent = `${heading || "Hero heading"} — ${subheading || "Hero subheading"}: ${description || "Hero description"} (Preview only; save to publish.)`;
    preview.hidden = false;
  });
}

async function saveContent() {
  const form = byId("contentForm");
  const content = {};
  contentGroups.flatMap(group => group.fields).forEach(([name, , type]) => {
    const control = form.elements[name];
    if (type === "checkbox") content[name] = control.checked;
    else if (type === "lines") content[name] = control.value.split("\n").map(value => value.trim()).filter(Boolean);
    else if (type === "number") content[name] = Number(control.value || 0);
    else content[name] = control.value.trim();
  });
  const button = byId("saveContent");
  button.disabled = true;
  setMessage(byId("contentMessage"), "Saving…");
  try {
    await api("/api/admin/content", { method: "PUT", body: JSON.stringify(content) });
    showToast("Website content saved.");
    setMessage(byId("contentMessage"), "Website content saved. Refresh the public site to see the changes.", true);
    await loadData();
  } catch (error) {
    setMessage(byId("contentMessage"), error.message);
  } finally {
    button.disabled = false;
  }
}

function openEditor(kind, record = null) {
  const categoryOptions = adminData.categories.map(category => `<option value="${category.id}" ${record?.categoryId === category.id ? "selected" : ""}>${html(category.name)}</option>`).join("");
  const values = record || {};
  const definitions = {
    product: [
      ["name", "Product name", "text", 120, true], ["description", "Description", "textarea", 2000],
      ["categoryId", "Category", "select", 0, false, categoryOptions],
      ["price", "Price (GH₵)", "number", 0, true], ["oldPrice", "Previous price (optional)", "number"],
      ["imageUrl", "Main image URL", "text", 2048], ["additionalImages", "Additional image URLs (one per line)", "lines", 0, false],
      ["availability", "Availability", "select", 0, false, `<option value="available">Available</option><option value="out_of_stock">Out of stock</option>`],
      ["status", "Publishing status", "select", 0, false, statusOptions()],
      ["featured", "Featured product", "checkbox"], ["popular", "Popular product", "checkbox"], ["isNew", "New product", "checkbox"],
      ["position", "Display order", "number"], ["tags", "Tags", "text", 500],
      ["ingredients", "Ingredients/details", "textarea", 1000], ["variant", "Size or variant", "text", 500],
      ["preparation", "Preparation information", "textarea", 1000],
    ],
    category: [
      ["name", "Category name", "text", 80, true], ["description", "Description", "textarea", 1000],
      ["imageUrl", "Category image URL", "text", 2048], ["status", "Visibility", "select", 0, false, statusOptions()],
      ["position", "Display order", "number"],
    ],
    deal: [
      ["name", "Promotion name", "text", 120, true], ["description", "Description", "textarea", 2000],
      ["price", "Sale price (GH₵)", "number", 0, true], ["originalPrice", "Previous price", "number"],
      ["badge", "Offer badge", "text", 40], ["imageUrl", "Image URL", "text", 2048],
      ["status", "Publishing status", "select", 0, false, statusOptions()],
      ["startsAt", "Start date", "datetime-local"], ["endsAt", "End date", "datetime-local"], ["position", "Display order", "number"],
    ],
    announcement: [
      ["title", "Title", "text", 120, true], ["message", "Message", "textarea", 2000],
      ["imageUrl", "Image URL", "text", 2048], ["link", "Link URL", "text", 2048],
      ["startsAt", "Start date", "datetime-local"], ["endsAt", "End date", "datetime-local"],
      ["status", "Publishing status", "select", 0, false, statusOptions("draft")],
    ],
    "delivery-area": [
      ["name", "Area name", "text", 100, true], ["fee", "Delivery fee (GH₵)", "number", 0, true],
      ["enabled", "Available for delivery", "checkbox"],
    ],
    navigation: [
      ["label", "Link label", "text", 60, true], ["href", "Destination (#menu or https://...)", "text", 2048, true],
      ["position", "Display order", "number"], ["visible", "Show this link", "checkbox"],
    ],
  };
  const titles = { product: "Product", category: "Category", deal: "Promotion", announcement: "Announcement", "delivery-area": "Delivery area", navigation: "Navigation link" };
  const title = `${record ? "Edit" : "Add"} ${titles[kind] || "item"}`;
  byId("editorTitle").textContent = title;
  byId("editorMessage").textContent = "";
  editorContext = { kind, id: record?.id || null };
  byId("editorFields").innerHTML = (definitions[kind] || []).map(([name, label, type = "text", max, required, options]) => {
    let value = values[name];
    if (kind === "product" && name === "availability") value = values.availability || (values.available === false ? "out_of_stock" : "available");
    if (kind === "product" && name === "imageUrl") value = values.imageUrl || values.img || values.image_url;
    if (kind === "product" && name === "additionalImages") value = Array.isArray(values.additionalImages) ? values.additionalImages.join("\n") : "";
    if (kind === "deal" && name === "imageUrl") value = values.imageUrl || values.img || values.image_url;
    if (kind === "deal" && name === "originalPrice") value = values.originalPrice ?? values.original;
    if (kind === "deal" && name === "description") value = values.description || values.desc;
    if (kind === "category" && name === "imageUrl") value = values.imageUrl || values.image_url;
    if (kind === "announcement" && name === "imageUrl") value = values.imageUrl || values.image_url;
    if (kind === "announcement" && name === "startsAt") value = values.starts_at;
    if (kind === "announcement" && name === "endsAt") value = values.ends_at;
    if (kind === "deal" && name === "startsAt") value = values.starts_at;
    if (kind === "deal" && name === "endsAt") value = values.ends_at;
    if (type === "datetime-local" && value) value = String(value).replace(" ", "T").slice(0, 16);
    if (type === "checkbox") {
      const checked = value === true || value === 1 || (value === undefined && ["enabled", "visible"].includes(name));
      return `<label class="field checkbox-field"><input name="${html(name)}" type="checkbox" ${checked ? "checked" : ""} /> ${html(label)}</label>`;
    }
    const wide = type === "textarea" || type === "lines";
    const content = type === "textarea" || type === "lines"
      ? `<textarea name="${html(name)}" rows="3" ${max ? `maxlength="${max}"` : ""}>${html(Array.isArray(value) ? value.join("\n") : value || "")}</textarea>`
      : type === "select"
        ? `<select name="${html(name)}" ${required ? "required" : ""}>${options || ""}</select>`
        : `<input name="${html(name)}" type="${html(type)}" value="${html(value ?? "")}" ${max ? `maxlength="${max}"` : ""} ${required ? "required" : ""} ${type === "number" ? 'min="0" step="0.01"' : ""} />`;
    return `<label class="field ${wide ? "wide" : ""}">${html(label)}${content}</label>`;
  }).join("");
  if (kind === "product" && values.status) byId("editorFields").querySelector('[name="status"]').value = values.status;
  if (kind === "product" && values.availability) byId("editorFields").querySelector('[name="availability"]').value = values.availability;
  if (kind === "category" && values.status) byId("editorFields").querySelector('[name="status"]').value = values.status;
  if (kind === "deal" && values.status) byId("editorFields").querySelector('[name="status"]').value = values.status;
  if (kind === "announcement" && values.status) byId("editorFields").querySelector('[name="status"]').value = values.status;
  if (kind === "product" && values.categoryId != null) byId("editorFields").querySelector('[name="categoryId"]').value = values.categoryId;
  if (kind === "delivery-area") byId("editorFields").querySelector('[name="enabled"]').checked = values.enabled !== 0;
  if (kind === "navigation") byId("editorFields").querySelector('[name="visible"]').checked = values.visible !== 0;
  byId("editorDialog").showModal();
}

function statusOptions(selected = "published") {
  return ["published", "draft", "hidden"].map(value => `<option value="${value}" ${value === selected ? "selected" : ""}>${value[0].toUpperCase()}${value.slice(1)}</option>`).join("");
}

function serializeEditor() {
  const payload = {};
  byId("editorFields").querySelectorAll("[name]").forEach(control => {
    if (control.type === "checkbox") payload[control.name] = control.checked;
    else if (control.name === "additionalImages") payload[control.name] = control.value.split("\n").map(value => value.trim()).filter(Boolean);
    else if (control.type === "number") payload[control.name] = control.value === "" ? null : Number(control.value);
    else payload[control.name] = control.value.trim();
  });
  return payload;
}

const apiKinds = {
  product: "products", category: "categories", deal: "deals", announcement: "announcements",
  "delivery-area": "delivery-areas", navigation: "navigation",
};

function findRecord(kind, id) {
  const records = {
    product: adminData.products, category: adminData.categories, deal: adminData.deals,
    announcement: adminData.announcements, "delivery-area": adminData.deliveryAreas,
    navigation: adminData.navigation,
  }[kind];
  return records?.find(item => item.id === Number(id));
}

async function submitEditor(event) {
  event.preventDefault();
  if (!editorContext) return;
  const { kind, id } = editorContext;
  const payload = serializeEditor();
  if (kind === "product") {
    payload.additionalImages = payload.additionalImages;
    payload.description = payload.description || "";
  }
  const endpoint = `/api/admin/${apiKinds[kind]}${id ? `/${id}` : ""}`;
  const button = byId("saveEditor");
  button.disabled = true;
  setMessage(byId("editorMessage"), "Saving…");
  try {
    await api(endpoint, { method: id ? "PUT" : "POST", body: JSON.stringify(payload) });
    byId("editorDialog").close();
    await loadData();
    renderPage(currentPage);
    showToast(`${kind.replace("-", " ")} saved.`);
  } catch (error) {
    setMessage(byId("editorMessage"), error.message);
  } finally {
    button.disabled = false;
  }
}

async function deleteRecord(kind, id, name) {
  if (!window.confirm(`Delete “${name}”? This action cannot be undone.`)) return;
  try {
    await api(`/api/admin/${kind}/${id}`, { method: "DELETE" });
    await loadData();
    renderPage(currentPage);
    showToast("Item deleted.");
  } catch (error) {
    showToast(error.message, true);
  }
}

async function optimizeImage(file) {
  if (file.type === "image/gif" || file.size < 500 * 1024 || !("createImageBitmap" in window)) return file;
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser could not prepare the image.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", 0.82));
    if (!blob || blob.size >= file.size) return file;
    const stem = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${stem}.webp`, { type: "image/webp", lastModified: Date.now() });
  } finally {
    bitmap.close();
  }
}

async function attachMediaEvents() {
  byId("uploadForm").addEventListener("submit", async event => {
    event.preventDefault();
    const file = byId("mediaFile").files[0];
    if (!file) return;
    const button = event.currentTarget.querySelector("button");
    button.disabled = true;
    setMessage(byId("uploadMessage"), "Optimizing and uploading…");
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error("Choose an image smaller than 20 MB before optimization.");
      const form = new FormData();
      form.append("file", await optimizeImage(file));
      await api("/api/admin/media", { method: "POST", body: form });
      await loadData();
      renderPage("media");
      showToast("Image uploaded.");
    } catch (error) {
      setMessage(byId("uploadMessage"), error.message);
    } finally {
      button.disabled = false;
    }
  });
}

async function logout() {
  try {
    await api("/api/admin/logout", { method: "POST" });
    adminData = null;
    showAuth(false, "You have signed out.");
  } catch (error) {
    showToast(error.message, true);
  }
}

byId("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const setup = event.currentTarget.dataset.setup === "true";
  const button = byId("authSubmit");
  button.disabled = true;
  setMessage(byId("authMessage"), setup ? "Creating your account…" : "Signing in…");
  try {
    const body = {
      email: byId("authEmail").value.trim(),
      password: byId("authPassword").value,
    };
    if (setup) body.setupToken = byId("setupToken").value;
    await api(setup ? "/api/admin/setup" : "/api/admin/login", { method: "POST", body: JSON.stringify(body) });
    byId("authPassword").value = "";
    byId("setupToken").value = "";
    await checkSession();
  } catch (error) {
    setMessage(byId("authMessage"), error.message);
  } finally {
    button.disabled = false;
  }
});

byId("sideNav").addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (button) renderPage(button.dataset.page);
});
byId("pageContent").addEventListener("click", async event => {
  const create = event.target.closest("[data-create]");
  const go = event.target.closest("[data-go]");
  const edit = event.target.closest("[data-edit]");
  const remove = event.target.closest("[data-delete]");
  const copy = event.target.closest("[data-copy]");
  const removeMedia = event.target.closest("[data-delete-media]");
  if (go) {
    renderPage(go.dataset.go);
    if (go.dataset.create) openEditor(go.dataset.create);
  } else if (create) {
    openEditor(create.dataset.create);
  } else if (edit) {
    openEditor(edit.dataset.edit, findRecord(edit.dataset.edit, edit.dataset.id));
  } else if (remove) {
    await deleteRecord(remove.dataset.delete, remove.dataset.id, remove.dataset.name || "item");
  } else if (copy) {
    try {
      await navigator.clipboard.writeText(new URL(copy.dataset.copy, location.href).href);
      showToast("Image URL copied.");
    } catch {
      showToast("Clipboard access is unavailable in this browser.", true);
    }
  } else if (removeMedia) {
    if (!window.confirm(`Delete “${removeMedia.dataset.name}”? This action cannot be undone.`)) return;
    try {
      await api(`/api/admin/media/${removeMedia.dataset.deleteMedia}`, { method: "DELETE" });
      await loadData();
      renderPage("media");
      showToast("Image deleted.");
    } catch (error) {
      showToast(error.message, true);
    }
  }
});
byId("editorForm").addEventListener("submit", submitEditor);
byId("cancelEditor").addEventListener("click", () => byId("editorDialog").close());
byId("closeEditor").addEventListener("click", () => byId("editorDialog").close());
byId("logoutButton").addEventListener("click", logout);
byId("menuButton").addEventListener("click", () => {
  byId("sidebar").classList.add("open");
  byId("sidebarBackdrop").classList.add("visible");
});
byId("sidebarBackdrop").addEventListener("click", () => {
  byId("sidebar").classList.remove("open");
  byId("sidebarBackdrop").classList.remove("visible");
});

checkSession();
