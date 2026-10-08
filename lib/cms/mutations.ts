import { del } from "@vercel/blob";
import { and, eq, like, ne, or } from "drizzle-orm";
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
import { CmsRequestError } from "@/lib/cms/auth";
import {
  announcementSchema,
  categorySchema,
  contentSchemas,
  deliveryAreaSchema,
  navigationSchema,
  productSchema,
  promotionSchema,
  slugify,
} from "@/lib/cms/validation";
import {
  seedCategories,
  seedContent,
  seedDeliveryAreas,
  seedNavigation,
  seedProducts,
  seedPromotions,
} from "@/lib/cms/seed";
import type { CmsStatus } from "@/lib/cms/types";

export type CmsAction = "draft" | "publish" | "hide";
export type CmsActor = { id: string; email: string; name?: string };

function validateAction(value: unknown): CmsAction {
  if (value === "draft" || value === "publish" || value === "hide") return value;
  throw new CmsRequestError("Choose whether to save a draft, publish, or hide this item.", 400);
}

function getStatus(action: CmsAction): CmsStatus {
  if (action === "publish") return "published";
  if (action === "hide") return "hidden";
  return "draft";
}

function validateId(value: unknown, allowLegacy = false) {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(value)) {
    throw new CmsRequestError("This item could not be found.", 404);
  }
  if (!allowLegacy && !/^[0-9a-f-]{36}$/i.test(value)) {
    throw new CmsRequestError("This item could not be found.", 404);
  }
  return value;
}

function validateParsed<T>(result: { success: boolean; data?: T; error?: { issues: Array<{ message: string }> } }): T {
  if (!result.success || result.data === undefined) {
    throw new CmsRequestError(result.error?.issues[0]?.message ?? "Please check the submitted information.", 400);
  }
  return result.data;
}

async function logChange(actor: CmsActor, action: CmsAction | string, entityType: string, entityId: string, label: string) {
  const verb = action === "publish" ? "published" : action === "hide" ? "hid" : action === "delete" ? "deleted" : "saved a draft of";
  await db.insert(cmsActivityLog).values({
    actorId: actor.id,
    actorEmail: actor.email,
    action,
    entityType,
    entityId,
    summary: `${actor.name || actor.email} ${verb} ${label}`.slice(0, 300),
    metadata: { entityType, entityId },
  });
}

async function saveProduct(actor: CmsActor, payload: Record<string, unknown>, action: CmsAction) {
  const parsed = validateParsed(productSchema.safeParse(payload.data));
  const suppliedId = payload.id;
  const id = suppliedId === undefined ? crypto.randomUUID() : validateId(suppliedId, true);
  const contentKey = `product:${id}`;
  const [existing] = await db.select().from(cmsContent).where(eq(cmsContent.contentKey, contentKey)).limit(1);
  if (suppliedId !== undefined && !existing) throw new CmsRequestError("This product no longer exists.", 404);

  const [category] = await db.select({ slug: cmsCategories.slug }).from(cmsCategories).where(eq(cmsCategories.slug, parsed.category)).limit(1);
  if (!category) throw new CmsRequestError("Choose a category that exists in the CMS.", 400);

  const status = getStatus(action);
  const publishedData = action === "publish" ? (parsed as CmsJson) : existing?.publishedData ?? null;
  const now = new Date();
  await db.insert(cmsContent).values({
    contentKey,
    draftData: parsed as CmsJson,
    publishedData,
    status,
    updatedBy: actor.id,
    updatedAt: now,
  }).onConflictDoUpdate({
    target: cmsContent.contentKey,
    set: { draftData: parsed as CmsJson, publishedData, status, updatedBy: actor.id, updatedAt: now },
  });

  await logChange(actor, action, "product", id, parsed.name);
  return { id, status, draftData: parsed, publishedData, updatedAt: now.toISOString() };
}

async function saveCategory(actor: CmsActor, payload: Record<string, unknown>, action: CmsAction) {
  const parsed = validateParsed(categorySchema.safeParse(payload.data));
  const suppliedId = payload.id;
  const id = suppliedId === undefined ? crypto.randomUUID() : validateId(suppliedId);
  const [existing] = await db.select().from(cmsCategories).where(eq(cmsCategories.id, id)).limit(1);
  if (suppliedId !== undefined && !existing) throw new CmsRequestError("This category no longer exists.", 404);

  const stableSlug = existing?.slug ?? parsed.slug ?? slugify(parsed.name);
  if (!stableSlug) throw new CmsRequestError("Enter a category name with letters or numbers.", 400);
  const data = { ...parsed, slug: stableSlug } as CmsJson;
  const status = getStatus(action);
  const sortOrder = parsed.sortOrder;
  const publishedData = action === "publish" ? data : existing?.publishedData ?? null;
  const now = new Date();
  await db.insert(cmsCategories).values({ id, slug: stableSlug, draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now }).onConflictDoUpdate({
    target: cmsCategories.id,
    set: { slug: stableSlug, draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now },
  });

  await logChange(actor, action, "category", id, parsed.name);
  return { id, slug: stableSlug, ...parsed, status, publishedData, updatedAt: now.toISOString() };
}

async function saveSlugCollection(
  actor: CmsActor,
  payload: Record<string, unknown>,
  action: CmsAction,
  resource: "promotions" | "announcements",
) {
  const parsed = resource === "promotions"
    ? validateParsed(promotionSchema.safeParse(payload.data))
    : validateParsed(announcementSchema.safeParse(payload.data));
  const suppliedId = payload.id;
  const id = suppliedId === undefined ? crypto.randomUUID() : validateId(suppliedId);
  const table = resource === "promotions" ? cmsPromotions : cmsAnnouncements;
  const [existing] = await db.select().from(table).where(eq(table.id, id)).limit(1);
  if (suppliedId !== undefined && !existing) throw new CmsRequestError("This content no longer exists.", 404);

  const name = "name" in parsed ? parsed.name : parsed.title;
  const stableSlug = existing?.slug ?? ("slug" in parsed ? parsed.slug : undefined) ?? slugify(name);
  if (!stableSlug) throw new CmsRequestError("Enter a title with letters or numbers.", 400);
  const data = { ...parsed, slug: stableSlug } as CmsJson;
  const status = getStatus(action);
  const sortOrder = parsed.sortOrder;
  const publishedData = action === "publish" ? data : existing?.publishedData ?? null;
  const now = new Date();
  await db.insert(table).values({ id, slug: stableSlug, draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now }).onConflictDoUpdate({
    target: table.id,
    set: { slug: stableSlug, draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now },
  });

  await logChange(actor, action, resource === "promotions" ? "promotion" : "announcement", id, name);
  return { id, slug: stableSlug, ...parsed, status, publishedData, updatedAt: now.toISOString() };
}

async function saveSimpleCollection(
  actor: CmsActor,
  payload: Record<string, unknown>,
  action: CmsAction,
  resource: "delivery" | "navigation",
) {
  const parsed = resource === "delivery"
    ? validateParsed(deliveryAreaSchema.safeParse(payload.data))
    : validateParsed(navigationSchema.safeParse(payload.data));
  const suppliedId = payload.id;
  const id = suppliedId === undefined ? crypto.randomUUID() : validateId(suppliedId);
  const table = resource === "delivery" ? cmsDeliveryAreas : cmsNavigationItems;
  const [existing] = await db.select().from(table).where(eq(table.id, id)).limit(1);
  if (suppliedId !== undefined && !existing) throw new CmsRequestError("This item no longer exists.", 404);

  const data = parsed as CmsJson;
  const status = getStatus(action);
  const sortOrder = parsed.sortOrder;
  const publishedData = action === "publish" ? data : existing?.publishedData ?? null;
  const now = new Date();
  await db.insert(table).values({ id, draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now }).onConflictDoUpdate({
    target: table.id,
    set: { draftData: data, publishedData, status, sortOrder, updatedBy: actor.id, updatedAt: now },
  });

  const label = "name" in parsed ? parsed.name : parsed.label;
  await logChange(actor, action, resource === "delivery" ? "delivery_area" : "navigation_item", id, label);
  return { id, ...parsed, status, publishedData, updatedAt: now.toISOString() };
}

async function saveContent(actor: CmsActor, payload: Record<string, unknown>, action: CmsAction) {
  const key = payload.key;
  if (typeof key !== "string" || !(key in contentSchemas)) {
    throw new CmsRequestError("Choose a valid website content section.", 400);
  }
  const schema = contentSchemas[key as keyof typeof contentSchemas];
  const parsed = validateParsed(schema.safeParse(payload.data));
  const contentKey = key;
  const [existing] = await db.select().from(cmsContent).where(eq(cmsContent.contentKey, contentKey)).limit(1);
  const status = getStatus(action);
  const data = parsed as CmsJson;
  const publishedData = action === "publish" ? data : existing?.publishedData ?? null;
  const now = new Date();
  await db.insert(cmsContent).values({ contentKey, draftData: data, publishedData, status, updatedBy: actor.id, updatedAt: now }).onConflictDoUpdate({
    target: cmsContent.contentKey,
    set: { draftData: data, publishedData, status, updatedBy: actor.id, updatedAt: now },
  });
  await logChange(actor, action, "website_content", contentKey, key.replaceAll("-", " "));
  return { key: contentKey, ...parsed, status, publishedData, updatedAt: now.toISOString() };
}

export async function saveCmsResource(actor: CmsActor, resource: string, payload: Record<string, unknown>) {
  const action = validateAction(payload.action);
  if (resource === "products") return saveProduct(actor, payload, action);
  if (resource === "categories") return saveCategory(actor, payload, action);
  if (resource === "promotions" || resource === "announcements") return saveSlugCollection(actor, payload, action, resource);
  if (resource === "delivery" || resource === "navigation") return saveSimpleCollection(actor, payload, action, resource);
  if (resource === "content") return saveContent(actor, payload, action);
  throw new CmsRequestError("This CMS section does not support editing.", 400);
}

async function ensureMediaIsNotInUse(url: string) {
  const [content, categories, promotions, announcements, areas, navigation] = await Promise.all([
    db.select({ draftData: cmsContent.draftData, publishedData: cmsContent.publishedData }).from(cmsContent),
    db.select({ draftData: cmsCategories.draftData, publishedData: cmsCategories.publishedData }).from(cmsCategories),
    db.select({ draftData: cmsPromotions.draftData, publishedData: cmsPromotions.publishedData }).from(cmsPromotions),
    db.select({ draftData: cmsAnnouncements.draftData, publishedData: cmsAnnouncements.publishedData }).from(cmsAnnouncements),
    db.select({ draftData: cmsDeliveryAreas.draftData, publishedData: cmsDeliveryAreas.publishedData }).from(cmsDeliveryAreas),
    db.select({ draftData: cmsNavigationItems.draftData, publishedData: cmsNavigationItems.publishedData }).from(cmsNavigationItems),
  ]);
  const allContent = [...content, ...categories, ...promotions, ...announcements, ...areas, ...navigation];
  if (allContent.some((row) => JSON.stringify(row).includes(url))) {
    throw new CmsRequestError("This image is still used by published or draft content.", 409);
  }
}

export async function deleteCmsResource(actor: CmsActor, resource: string, rawId: unknown) {
  if (resource === "content") {
    if (typeof rawId !== "string" || !(rawId in contentSchemas)) throw new CmsRequestError("Choose a valid website content section.", 400);
    await db.delete(cmsContent).where(eq(cmsContent.contentKey, rawId));
    await logChange(actor, "delete", "website_content", rawId, rawId.replaceAll("-", " "));
    return;
  }

  const id = validateId(rawId, resource === "products");
  if (resource === "products") {
    const contentKey = `product:${id}`;
    const [existing] = await db.select().from(cmsContent).where(eq(cmsContent.contentKey, contentKey)).limit(1);
    if (!existing) throw new CmsRequestError("This product no longer exists.", 404);
    await db.delete(cmsContent).where(eq(cmsContent.contentKey, contentKey));

    const [home] = await db.select().from(cmsContent).where(eq(cmsContent.contentKey, "homepage")).limit(1);
    if (home) {
      const stripId = (value: unknown) => Array.isArray(value) ? value.filter((item) => item !== id) : [];
      const draftData = { ...home.draftData, featuredProductIds: stripId(home.draftData.featuredProductIds), popularProductIds: stripId(home.draftData.popularProductIds) };
      const publishedData = home.publishedData
        ? { ...home.publishedData, featuredProductIds: stripId(home.publishedData.featuredProductIds), popularProductIds: stripId(home.publishedData.popularProductIds) }
        : null;
      await db.update(cmsContent).set({ draftData, publishedData, updatedAt: new Date() }).where(eq(cmsContent.contentKey, "homepage"));
    }
    await logChange(actor, "delete", "product", id, String(existing.draftData.name ?? "product"));
    return;
  }

  if (resource === "categories") {
    const [existing] = await db.select().from(cmsCategories).where(eq(cmsCategories.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This category no longer exists.", 404);
    const productRows = await db.select({ draftData: cmsContent.draftData, publishedData: cmsContent.publishedData }).from(cmsContent).where(like(cmsContent.contentKey, "product:%"));
    const inUse = productRows.some((row) => row.draftData.category === existing.slug || row.publishedData?.category === existing.slug);
    if (inUse) throw new CmsRequestError("Move products to another category before deleting this category.", 409);
    await db.delete(cmsCategories).where(eq(cmsCategories.id, id));
    await logChange(actor, "delete", "category", id, String(existing.draftData.name ?? existing.slug));
    return;
  }

  if (resource === "promotions") {
    const [existing] = await db.select().from(cmsPromotions).where(eq(cmsPromotions.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This promotion no longer exists.", 404);
    await db.delete(cmsPromotions).where(eq(cmsPromotions.id, id));
    await logChange(actor, "delete", "promotion", id, String(existing.draftData.name ?? existing.slug));
    return;
  }

  if (resource === "announcements") {
    const [existing] = await db.select().from(cmsAnnouncements).where(eq(cmsAnnouncements.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This announcement no longer exists.", 404);
    await db.delete(cmsAnnouncements).where(eq(cmsAnnouncements.id, id));
    await logChange(actor, "delete", "announcement", id, String(existing.draftData.title ?? existing.slug));
    return;
  }

  if (resource === "delivery") {
    const [existing] = await db.select().from(cmsDeliveryAreas).where(eq(cmsDeliveryAreas.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This delivery area no longer exists.", 404);
    await db.delete(cmsDeliveryAreas).where(eq(cmsDeliveryAreas.id, id));
    await logChange(actor, "delete", "delivery_area", id, String(existing.draftData.name ?? "delivery area"));
    return;
  }

  if (resource === "navigation") {
    const [existing] = await db.select().from(cmsNavigationItems).where(eq(cmsNavigationItems.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This navigation item no longer exists.", 404);
    await db.delete(cmsNavigationItems).where(eq(cmsNavigationItems.id, id));
    await logChange(actor, "delete", "navigation_item", id, String(existing.draftData.label ?? "navigation item"));
    return;
  }

  if (resource === "media") {
    const [existing] = await db.select().from(cmsMedia).where(eq(cmsMedia.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This image no longer exists.", 404);
    await ensureMediaIsNotInUse(existing.url);
    await del(existing.url);
    await db.delete(cmsMedia).where(eq(cmsMedia.id, id));
    await logChange(actor, "delete", "media", id, existing.filename);
    return;
  }

  throw new CmsRequestError("This CMS section does not support deletion.", 400);
}

export async function updateInboxStatus(actor: CmsActor, resource: string, rawId: unknown, rawStatus: unknown) {
  const id = validateId(rawId);
  if (resource === "orders") {
    const statuses = ["new", "confirmed", "preparing", "ready", "delivering", "completed", "cancelled"];
    if (typeof rawStatus !== "string" || !statuses.includes(rawStatus)) throw new CmsRequestError("Choose a valid order status.", 400);
    const [existing] = await db.select().from(cmsOrders).where(eq(cmsOrders.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This order no longer exists.", 404);
    await db.update(cmsOrders).set({ status: rawStatus, updatedAt: new Date() }).where(eq(cmsOrders.id, id));
    await logChange(actor, "updated", "order", id, `${existing.reference} status`);
    return;
  }

  if (resource === "customers") {
    if (rawStatus !== "new" && rawStatus !== "resolved" && rawStatus !== "archived") throw new CmsRequestError("Choose a valid message status.", 400);
    const [existing] = await db.select().from(cmsMessages).where(eq(cmsMessages.id, id)).limit(1);
    if (!existing) throw new CmsRequestError("This message no longer exists.", 404);
    await db.update(cmsMessages).set({ status: rawStatus, resolvedAt: rawStatus === "new" ? null : new Date() }).where(eq(cmsMessages.id, id));
    await logChange(actor, "updated", "customer_message", id, `${existing.name} message status`);
    return;
  }

  throw new CmsRequestError("This CMS section does not support status changes.", 400);
}

export async function bootstrapStorefront(actor: CmsActor) {
  const initialized = await db.transaction(async (transaction) => {
    const [marker] = await transaction.select().from(cmsContent).where(eq(cmsContent.contentKey, "storefront-initialized")).limit(1);
    if (marker?.status === "published" && marker.publishedData?.initialized === true) return false;

    const now = new Date();
    await transaction.insert(cmsCategories).values(seedCategories.map((category, index) => ({
      slug: category.slug,
      draftData: category as unknown as CmsJson,
      publishedData: category as unknown as CmsJson,
      status: "published",
      sortOrder: (index + 1) * 10,
      updatedBy: actor.id,
      updatedAt: now,
    }))).onConflictDoNothing({ target: cmsCategories.slug });

    await transaction.insert(cmsContent).values(seedProducts.map((product) => ({
      contentKey: `product:${product.id}`,
      draftData: product as unknown as CmsJson,
      publishedData: product as unknown as CmsJson,
      status: "published",
      updatedBy: actor.id,
      updatedAt: now,
    }))).onConflictDoNothing({ target: cmsContent.contentKey });

    await transaction.insert(cmsPromotions).values(seedPromotions.map((promotion, index) => ({
      slug: promotion.slug,
      draftData: promotion as unknown as CmsJson,
      publishedData: promotion as unknown as CmsJson,
      status: "published",
      sortOrder: (index + 1) * 10,
      updatedBy: actor.id,
      updatedAt: now,
    }))).onConflictDoNothing({ target: cmsPromotions.slug });

    await transaction.insert(cmsContent).values(Object.entries(seedContent).map(([contentKey, data]) => ({
      contentKey,
      draftData: data,
      publishedData: data,
      status: "published",
      updatedBy: actor.id,
      updatedAt: now,
    }))).onConflictDoNothing({ target: cmsContent.contentKey });

    await transaction.insert(cmsDeliveryAreas).values(seedDeliveryAreas.map((area, index) => ({
      draftData: area as unknown as CmsJson,
      publishedData: area as unknown as CmsJson,
      status: "published",
      sortOrder: (index + 1) * 10,
      updatedBy: actor.id,
      updatedAt: now,
    })));

    await transaction.insert(cmsNavigationItems).values(seedNavigation.map((item, index) => ({
      draftData: { ...item, sortOrder: (index + 1) * 10 } as unknown as CmsJson,
      publishedData: { ...item, sortOrder: (index + 1) * 10 } as unknown as CmsJson,
      status: "published",
      sortOrder: (index + 1) * 10,
      updatedBy: actor.id,
      updatedAt: now,
    })));

    const markerData = { initialized: true, importedAt: now.toISOString() };
    await transaction.insert(cmsContent).values({
      contentKey: "storefront-initialized",
      draftData: markerData,
      publishedData: markerData,
      status: "published",
      updatedBy: actor.id,
      updatedAt: now,
    }).onConflictDoUpdate({
      target: cmsContent.contentKey,
      set: { draftData: markerData, publishedData: markerData, status: "published", updatedBy: actor.id, updatedAt: now },
    });

    return true;
  });

  if (!initialized) throw new CmsRequestError("The current storefront has already been imported.", 409);
  await logChange(actor, "imported", "storefront", "initial-catalog", "the current storefront into the CMS");
}
