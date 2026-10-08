import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNotNull,
  like,
  ne,
  or,
  sql,
} from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  cmsActivityLog,
  cmsAnnouncements,
  cmsCategories,
  cmsContent,
  cmsDeliveryAreas,
  cmsMedia,
  cmsMessages,
  cmsNavigationItems,
  cmsOrders,
  cmsPromotions,
} from "@/lib/db/schema";
import type { CmsJson } from "@/lib/db/schema";

const objectValue = (value: unknown): CmsJson =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as CmsJson)
    : {};

const asAdminItem = (
  row: { id?: string; contentKey?: string; slug?: string; draftData: CmsJson; publishedData: CmsJson | null; status: string; updatedAt: Date; sortOrder?: number },
  prefix?: string,
) => ({
  ...(row.id ? { id: row.id } : {}),
  ...(row.contentKey ? { id: prefix ? row.contentKey.slice(prefix.length) : row.contentKey, key: row.contentKey } : {}),
  ...(row.slug ? { slug: row.slug } : {}),
  ...objectValue(row.draftData),
  status: row.status,
  publishedData: row.publishedData,
  updatedAt: row.updatedAt.toISOString(),
  ...(typeof row.sortOrder === "number" ? { sortOrder: row.sortOrder } : {}),
});

const boundedPage = (value: string | null) => Math.max(1, Number.parseInt(value ?? "1", 10) || 1);
const boundedPageSize = (value: string | null) => Math.min(100, Math.max(10, Number.parseInt(value ?? "30", 10) || 30));

export async function getCmsResource(resource: string, params: URLSearchParams) {
  if (resource === "products") {
    const page = boundedPage(params.get("page"));
    const pageSize = boundedPageSize(params.get("pageSize"));
    const filters: SQL[] = [like(cmsContent.contentKey, "product:%")];
    const search = params.get("search")?.trim();
    const category = params.get("category");
    const availability = params.get("availability");
    const status = params.get("status");

    if (search) {
      const pattern = `%${search.slice(0, 100)}%`;
      filters.push(or(
        ilike(sql<string>`${cmsContent.draftData} ->> 'name'`, pattern),
        ilike(sql<string>`${cmsContent.draftData} ->> 'desc'`, pattern),
      )!);
    }
    if (category) filters.push(eq(sql<string>`${cmsContent.draftData} ->> 'category'`, category));
    if (availability === "available") filters.push(eq(sql<string>`${cmsContent.draftData} ->> 'available'`, "true"));
    if (availability === "unavailable") filters.push(eq(sql<string>`${cmsContent.draftData} ->> 'available'`, "false"));
    if (status && ["draft", "published", "hidden"].includes(status)) {
      filters.push(eq(cmsContent.status, status));
    }

    const condition = and(...filters);
    const sort = params.get("sort");
    const order = sort === "oldest"
      ? asc(cmsContent.updatedAt)
      : sort === "alphabetical"
        ? asc(sql<string>`${cmsContent.draftData} ->> 'name'`)
        : desc(cmsContent.updatedAt);

    const [countRows, rows] = await Promise.all([
      db.select({ total: count() }).from(cmsContent).where(condition),
      db.select().from(cmsContent).where(condition).orderBy(order).limit(pageSize).offset((page - 1) * pageSize),
    ]);

    return {
      items: rows.map((row) => asAdminItem(row, "product:")),
      total: countRows[0]?.total ?? 0,
      page,
      pageSize,
    };
  }

  if (resource === "categories") {
    const rows = await db.select().from(cmsCategories).orderBy(asc(cmsCategories.sortOrder), desc(cmsCategories.updatedAt));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "promotions") {
    const rows = await db.select().from(cmsPromotions).orderBy(asc(cmsPromotions.sortOrder), desc(cmsPromotions.updatedAt));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "announcements") {
    const rows = await db.select().from(cmsAnnouncements).orderBy(asc(cmsAnnouncements.sortOrder), desc(cmsAnnouncements.updatedAt));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "delivery") {
    const rows = await db.select().from(cmsDeliveryAreas).orderBy(asc(cmsDeliveryAreas.sortOrder), desc(cmsDeliveryAreas.updatedAt));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "navigation") {
    const rows = await db.select().from(cmsNavigationItems).orderBy(asc(cmsNavigationItems.sortOrder), desc(cmsNavigationItems.updatedAt));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "content") {
    const rows = await db.select().from(cmsContent).where(ne(cmsContent.contentKey, "storefront-initialized")).orderBy(asc(cmsContent.contentKey));
    return { items: rows.map((row) => asAdminItem(row)), total: rows.length };
  }

  if (resource === "orders") {
    const page = boundedPage(params.get("page"));
    const pageSize = boundedPageSize(params.get("pageSize"));
    const status = params.get("status");
    const filters: SQL[] = [];
    if (status) filters.push(eq(cmsOrders.status, status));
    const condition = filters.length ? and(...filters) : undefined;
    const [countRows, rows] = await Promise.all([
      db.select({ total: count() }).from(cmsOrders).where(condition),
      db.select().from(cmsOrders).where(condition).orderBy(desc(cmsOrders.createdAt)).limit(pageSize).offset((page - 1) * pageSize),
    ]);
    return { items: rows, total: countRows[0]?.total ?? 0, page, pageSize };
  }

  if (resource === "customers") {
    const page = boundedPage(params.get("page"));
    const pageSize = boundedPageSize(params.get("pageSize"));
    const [countRows, rows] = await Promise.all([
      db.select({ total: count() }).from(cmsMessages),
      db.select().from(cmsMessages).orderBy(desc(cmsMessages.createdAt)).limit(pageSize).offset((page - 1) * pageSize),
    ]);
    return { items: rows, total: countRows[0]?.total ?? 0, page, pageSize };
  }

  if (resource === "media") {
    const rows = await db.select().from(cmsMedia).orderBy(desc(cmsMedia.createdAt)).limit(250);
    return { items: rows, total: rows.length };
  }

  if (resource === "activity") {
    const rows = await db.select().from(cmsActivityLog).orderBy(desc(cmsActivityLog.createdAt)).limit(100);
    return { items: rows, total: rows.length };
  }

  throw new Error("Unsupported CMS resource");
}

export async function getPublishedStorefrontContent() {
  const [marker] = await db.select().from(cmsContent).where(eq(cmsContent.contentKey, "storefront-initialized")).limit(1);
  const initialized = objectValue(marker?.publishedData).initialized === true && marker?.status === "published";
  if (!initialized) return { initialized: false };

  const [contentRows, productRows, categoryRows, promotions, announcements, areas, navigation] = await Promise.all([
    db.select().from(cmsContent).where(ne(cmsContent.contentKey, "storefront-initialized")),
    db.select().from(cmsContent).where(and(like(cmsContent.contentKey, "product:%"), isNotNull(cmsContent.publishedData), ne(cmsContent.status, "hidden"))).orderBy(asc(cmsContent.updatedAt)),
    db.select().from(cmsCategories).where(and(isNotNull(cmsCategories.publishedData), ne(cmsCategories.status, "hidden"))).orderBy(asc(cmsCategories.sortOrder)),
    db.select().from(cmsPromotions).where(and(isNotNull(cmsPromotions.publishedData), ne(cmsPromotions.status, "hidden"))).orderBy(asc(cmsPromotions.sortOrder)),
    db.select().from(cmsAnnouncements).where(and(isNotNull(cmsAnnouncements.publishedData), ne(cmsAnnouncements.status, "hidden"))).orderBy(asc(cmsAnnouncements.sortOrder)),
    db.select().from(cmsDeliveryAreas).where(and(isNotNull(cmsDeliveryAreas.publishedData), ne(cmsDeliveryAreas.status, "hidden"))).orderBy(asc(cmsDeliveryAreas.sortOrder)),
    db.select().from(cmsNavigationItems).where(and(isNotNull(cmsNavigationItems.publishedData), ne(cmsNavigationItems.status, "hidden"))).orderBy(asc(cmsNavigationItems.sortOrder)),
  ]);

  const publishedContent = Object.fromEntries(
    contentRows
      .filter((row) => row.publishedData && row.status !== "hidden")
      .map((row) => [row.contentKey, objectValue(row.publishedData)]),
  );
  const categoryItems = categoryRows.map((row) => ({ id: row.id, slug: row.slug, ...objectValue(row.publishedData), sortOrder: row.sortOrder }));
  const categoryNames = new Map(categoryItems.map((item) => [item.slug, String(item.name ?? item.slug)]));
  const products = productRows.map((row) => {
    const data = objectValue(row.publishedData);
    const category = String(data.category ?? "");
    return {
      ...data,
      id: row.contentKey.slice("product:".length),
      categoryName: categoryNames.get(category) ?? category,
    };
  });
  const promotionsData = promotions
    .map((row) => ({ id: row.id, ...objectValue(row.publishedData) }))
    .filter((item) => isInsideSchedule(item.startDate, item.endDate));
  const announcementsData = announcements
    .map((row) => ({ id: row.id, ...objectValue(row.publishedData) }))
    .filter((item) => isInsideSchedule(item.startDate, item.endDate));
  const deliveryAreas = areas.map((row) => ({ id: row.id, ...objectValue(row.publishedData), sortOrder: row.sortOrder }));
  const navigationItems = navigation
    .map((row) => ({ id: row.id, ...objectValue(row.publishedData), sortOrder: row.sortOrder }))
    .filter((item) => item.visible !== false);

  return {
    initialized: true,
    products,
    categories: categoryItems,
    promotions: promotionsData,
    announcements: announcementsData,
    deliveryAreas,
    navigation: navigationItems,
    siteSettings: publishedContent["site-settings"] ?? {},
    homepage: publishedContent.homepage ?? {},
    about: publishedContent.about ?? {},
    deliverySettings: publishedContent["delivery-settings"] ?? {},
    footerSettings: publishedContent["footer-settings"] ?? {},
    promoMessages: Array.isArray(publishedContent["promo-messages"]?.messages)
      ? publishedContent["promo-messages"].messages
      : [],
  };
}

function isInsideSchedule(startDate: unknown, endDate: unknown) {
  const now = new Date();
  const start = typeof startDate === "string" && startDate ? new Date(`${startDate}T00:00:00`) : null;
  const end = typeof endDate === "string" && endDate ? new Date(`${endDate}T23:59:59.999`) : null;
  if (start && !Number.isNaN(start.getTime()) && now < start) return false;
  if (end && !Number.isNaN(end.getTime()) && now > end) return false;
  return true;
}

export async function getStorefrontProductData() {
  const site = await getPublishedStorefrontContent();
  if (!site.initialized) {
    const { seedProducts } = await import("@/lib/cms/seed");
    return { initialized: false, products: seedProducts, deliverySettings: {}, deliveryAreas: [] };
  }
  return {
    initialized: true,
    products: site.products as Array<Record<string, unknown>>,
    deliverySettings: site.deliverySettings as CmsJson,
    deliveryAreas: site.deliveryAreas as Array<Record<string, unknown>>,
  };
}

export async function getDashboardOverview() {
  const [{ total: products }, { total: available }, { total: featured }, { total: categories }, { total: orders }, { total: messages }, recent, marker] = await Promise.all([
    db.select({ total: count() }).from(cmsContent).where(and(like(cmsContent.contentKey, "product:%"), ne(cmsContent.status, "hidden"))),
    db.select({ total: count() }).from(cmsContent).where(and(like(cmsContent.contentKey, "product:%"), eq(sql<string>`${cmsContent.draftData} ->> 'available'`, "true"), ne(cmsContent.status, "hidden"))),
    db.select({ total: count() }).from(cmsContent).where(and(like(cmsContent.contentKey, "product:%"), eq(sql<string>`${cmsContent.draftData} ->> 'featured'`, "true"), ne(cmsContent.status, "hidden"))),
    db.select({ total: count() }).from(cmsCategories).where(ne(cmsCategories.status, "hidden")),
    db.select({ total: count() }).from(cmsOrders),
    db.select({ total: count() }).from(cmsMessages).where(eq(cmsMessages.status, "new")),
    db.select().from(cmsActivityLog).orderBy(desc(cmsActivityLog.createdAt)).limit(8),
    db.select().from(cmsContent).where(eq(cmsContent.contentKey, "storefront-initialized")).limit(1),
  ]);
  const initialized = objectValue(marker[0]?.publishedData).initialized === true && marker[0]?.status === "published";
  return {
    counts: { products, available, featured, categories, orders, messages },
    initialized,
    recentActivity: recent,
  };
}

export async function recordActivity(
  user: { id: string; email: string },
  action: string,
  entityType: string,
  entityId: string,
  summary: string,
  metadata: CmsJson = {},
) {
  await db.insert(cmsActivityLog).values({
    actorId: user.id,
    actorEmail: user.email,
    action,
    entityType,
    entityId,
    summary: summary.slice(0, 300),
    metadata,
  });
}

export async function contentRowExists(contentKey: string) {
  const [row] = await db.select({ contentKey: cmsContent.contentKey }).from(cmsContent).where(eq(cmsContent.contentKey, contentKey)).limit(1);
  return Boolean(row);
}
