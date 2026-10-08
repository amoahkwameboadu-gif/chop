import { z } from "zod";

const isSafeImage = (value: string) => {
  if (!value) return true;
  if (value.startsWith("//") || value.includes("..")) return false;
  if (value.startsWith("/")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return !/^[a-z][a-z\d+.-]*:/i.test(value);
  }
};

const isSafeLink = (value: string) => {
  if (!value) return true;
  if (value.startsWith("//") || value.includes("\\")) return false;
  if (value.startsWith("#") || (value.startsWith("/") && !value.startsWith("//"))) return true;
  try {
    return ["https:", "mailto:", "tel:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const image = z.string().trim().max(2048).refine(isSafeImage, "Use a safe HTTPS image URL or site path.");
const link = z.string().trim().max(2048).refine(isSafeLink, "Use a safe site, HTTPS, email, or phone link.");
const text = (max = 500) => z.string().trim().max(max);
const requiredText = (max = 160) => z.string().trim().min(1).max(max);
const price = z.number().finite().min(0.01).max(100_000);
const optionalPrice = z.number().finite().min(0).max(100_000).nullable().optional();
const slug = z.string().trim().max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional();
const status = z.enum(["draft", "published", "hidden"]);

export const productSchema = z.object({
  name: requiredText(120),
  desc: text(3000),
  category: requiredText(80),
  price,
  oldPrice: optionalPrice,
  img: image,
  additionalImages: z.array(image).max(8).default([]),
  available: z.boolean(),
  featured: z.boolean(),
  popular: z.boolean(),
  isNew: z.boolean(),
  sortOrder: z.number().int().min(0).max(100_000),
  tags: z.array(requiredText(40)).max(20),
  ingredients: text(1200),
  size: text(120),
  preparation: text(500),
});

export const categorySchema = z.object({
  name: requiredText(80),
  slug,
  description: text(1200),
  image,
  icon: text(60),
  sortOrder: z.number().int().min(0).max(100_000),
});

export const promotionSchema = z.object({
  name: requiredText(120),
  slug,
  desc: text(2000),
  price,
  originalPrice: optionalPrice,
  badge: text(60),
  img: image,
  startDate: text(30),
  endDate: text(30),
  ctaText: text(80),
  ctaHref: link,
  sortOrder: z.number().int().min(0).max(100_000),
});

export const announcementSchema = z.object({
  title: requiredText(140),
  message: requiredText(2000),
  image,
  link,
  startDate: text(30),
  endDate: text(30),
  sortOrder: z.number().int().min(0).max(100_000),
});

export const deliveryAreaSchema = z.object({
  name: requiredText(100),
  city: requiredText(100),
  fee: z.number().finite().min(0).max(10_000),
  minimumOrder: z.number().finite().min(0).max(100_000),
  deliveryTime: text(100),
  instructions: text(1000),
  available: z.boolean(),
  sortOrder: z.number().int().min(0).max(100_000),
});

export const navigationSchema = z.object({
  label: requiredText(80),
  url: link,
  section: z.enum(["header", "footer"]),
  visible: z.boolean(),
  sortOrder: z.number().int().min(0).max(100_000),
});

export const contentSchemas = {
  "site-settings": z.object({
    businessName: requiredText(120),
    tagline: text(200),
    phone: text(40),
    whatsapp: text(40),
    email: z.string().trim().max(254).email().or(z.literal("")),
    address: text(250),
    locationUrl: link,
    openingHours: text(1200),
    instagram: link,
    facebook: link,
    tiktok: link,
    twitter: link,
    defaultSeoTitle: text(160),
    metaDescription: text(320),
    socialImage: image,
    currency: z.enum(["GHS", "USD", "GBP", "EUR"]),
    websiteStatus: z.enum(["open", "closed", "maintenance"]),
    footerText: text(300),
  }),
  homepage: z.object({
    heroTitle: requiredText(140),
    heroSubtitle: text(180),
    heroDescription: text(1200),
    heroImage: image,
    heroCtaText: text(80),
    heroCtaLink: link,
    promoHeading: text(160),
    promoText: text(600),
    promoImage: image,
    promoBadge: text(80),
    promoButtonText: text(80),
    promoButtonLink: link,
    promoStart: text(30),
    promoEnd: text(30),
    showHero: z.boolean(),
    showPromo: z.boolean(),
    featuredProductIds: z.array(text(80)).max(100),
    popularProductIds: z.array(text(80)).max(100),
  }),
  about: z.object({
    title: requiredText(160),
    description: text(3000),
    story: text(3000),
    mission: text(1000),
    vision: text(1000),
    values: text(1000),
    image,
    visible: z.boolean(),
  }),
  "delivery-settings": z.object({
    defaultFee: z.number().finite().min(0).max(10_000),
    freeDeliveryThreshold: z.number().finite().min(0).max(100_000),
    minimumOrder: z.number().finite().min(0).max(100_000),
    estimatedTime: text(100),
    deliveryAvailable: z.boolean(),
    instructions: text(1200),
    pickupInfo: text(800),
  }),
  "footer-settings": z.object({
    logo: image,
    businessDescription: text(1200),
    location: text(250),
    openingHours: text(1200),
    announcement: text(600),
    copyright: text(250),
    showLogo: z.boolean(),
    showContactDetails: z.boolean(),
  }),
  "promo-messages": z.object({
    messages: z.array(requiredText(180)).max(20),
  }),
} as const;

export const orderSchema = z.object({
  customerName: requiredText(120),
  phone: requiredText(32),
  email: z.string().trim().max(254).email().or(z.literal("")),
  address: requiredText(240),
  city: requiredText(100),
  notes: text(1000),
  items: z.array(z.object({ id: z.string().trim().regex(/^[a-zA-Z0-9_-]{1,80}$/), quantity: z.number().int().min(1).max(25) })).min(1).max(50),
});

export const contactSchema = z.object({
  name: requiredText(120),
  phone: requiredText(32),
  message: requiredText(2000),
});

export function parseStatus(value: unknown) {
  return status.safeParse(value);
}

export function isSafeImageUrl(value: string) {
  return isSafeImage(value);
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export type ContentKey = keyof typeof contentSchemas;
