import {
  bigint,
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type CmsJson = Record<string, unknown>;

export const cmsAdminUsers = pgTable("cms_admin_users", {
  userId: uuid("user_id").primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull().default(""),
  active: boolean("active").notNull().default(true),
  grantedAt: timestamp("granted_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const cmsActivityLog = pgTable("cms_activity_log", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  actorId: uuid("actor_id").notNull(),
  actorEmail: text("actor_email").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  summary: text("summary").notNull(),
  metadata: jsonb("metadata").$type<CmsJson>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const cmsContent = pgTable("cms_content", {
  contentKey: text("content_key").primaryKey(),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsCategories = pgTable("cms_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique("cms_categories_slug_key"),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsPromotions = pgTable("cms_promotions", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique("cms_promotions_slug_key"),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsAnnouncements = pgTable("cms_announcements", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique("cms_announcements_slug_key"),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsDeliveryAreas = pgTable("cms_delivery_areas", {
  id: uuid("id").primaryKey().defaultRandom(),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsNavigationItems = pgTable("cms_navigation_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  draftData: jsonb("draft_data").$type<CmsJson>().notNull().default({}),
  publishedData: jsonb("published_data").$type<CmsJson>(),
  status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedBy: uuid("updated_by"),
});

export const cmsMedia = pgTable("cms_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  pathname: text("pathname").notNull().unique("cms_media_pathname_key"),
  url: text("url").notNull().unique("cms_media_url_key"),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  altText: text("alt_text").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  createdBy: uuid("created_by"),
});

export const cmsOrders = pgTable("cms_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  reference: text("reference").notNull().unique("cms_orders_reference_key"),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  address: text("address").notNull().default(""),
  city: text("city").notNull().default(""),
  notes: text("notes").notNull().default(""),
  items: jsonb("items").$type<Array<{ id: string; name: string; quantity: number; price: number }>>().notNull().default([]),
  subtotal: numeric("subtotal", { mode: "number" }).notNull(),
  deliveryFee: numeric("delivery_fee", { mode: "number" }).notNull(),
  total: numeric("total", { mode: "number" }).notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
});

export const cmsMessages = pgTable("cms_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at", { withTimezone: true, mode: "date" }),
});

export const cmsTables = {
  cmsAdminUsers,
  cmsActivityLog,
  cmsContent,
  cmsCategories,
  cmsPromotions,
  cmsAnnouncements,
  cmsDeliveryAreas,
  cmsNavigationItems,
  cmsMedia,
  cmsOrders,
  cmsMessages,
};
