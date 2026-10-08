import { NextRequest } from "next/server";
import { CmsRequestError, cmsErrorResponse, requireCmsAdmin, requireSameOrigin } from "@/lib/cms/auth";
import { deleteCmsResource, saveCmsResource, updateInboxStatus } from "@/lib/cms/mutations";
import { getCmsResource } from "@/lib/cms/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resources = new Set([
  "products",
  "categories",
  "promotions",
  "announcements",
  "content",
  "delivery",
  "navigation",
  "orders",
  "customers",
  "media",
  "activity",
]);

type RouteContext = { params: Promise<{ resource: string }> };
type Payload = Record<string, unknown>;

function parsePayload(value: unknown): Payload {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CmsRequestError("The request body is invalid.", 400);
  }
  return value as Payload;
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store, max-age=0" },
  });
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await requireCmsAdmin();
    const { resource } = await params;
    if (!resources.has(resource)) return json({ error: "CMS section not found." }, 404);
    const data = await getCmsResource(resource, request.nextUrl.searchParams);
    return json(data);
  } catch (error) {
    return cmsErrorResponse(error);
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { user } = await requireCmsAdmin();
    requireSameOrigin(request);
    const { resource } = await params;
    if (!resources.has(resource)) return json({ error: "CMS section not found." }, 404);
    const payload = parsePayload(await request.json());
    const item = await saveCmsResource(user, resource, payload);
    return json({ item });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { user } = await requireCmsAdmin();
    requireSameOrigin(request);
    const { resource } = await params;
    if (!resources.has(resource)) return json({ error: "CMS section not found." }, 404);
    const payload = parsePayload(await request.json());
    if (resource === "orders" || resource === "customers") {
      await updateInboxStatus(user, resource, payload.id, payload.status);
      return json({ updated: true });
    }
    const item = await saveCmsResource(user, resource, payload);
    return json({ item });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { user } = await requireCmsAdmin();
    requireSameOrigin(request);
    const { resource } = await params;
    if (!resources.has(resource)) return json({ error: "CMS section not found." }, 404);
    const payload = parsePayload(await request.json());
    const id = resource === "content" ? payload.key : payload.id;
    await deleteCmsResource(user, resource, id);
    return json({ deleted: true });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
