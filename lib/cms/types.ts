export type CmsStatus = "draft" | "published" | "hidden";

export type CmsItem<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  id: string;
  status: CmsStatus;
  updatedAt?: string;
  publishedData?: Record<string, unknown> | null;
};

export interface ProductData extends Record<string, unknown> {
  name: string;
  desc: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  img: string;
  available: boolean;
  featured: boolean;
  popular: boolean;
  isNew: boolean;
  sortOrder: number;
  tags: string[];
  additionalImages: string[];
  ingredients: string;
  size: string;
  preparation: string;
}

export interface CmsUser {
  id: string;
  email: string;
  name: string;
}

export interface CmsAdminAccess {
  user: CmsUser | null;
  admin: { userId: string; email: string; displayName: string; active: boolean } | null;
}

export const cmsStatuses = ["draft", "published", "hidden"] as const;
