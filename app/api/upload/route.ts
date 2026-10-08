import { putImage } from "@vercel/blob";
import { db } from "@/lib/db";
import { cmsMedia } from "@/lib/db/schema";
import { cmsErrorResponse, CmsRequestError, requireCmsAdmin, requireSameOrigin } from "@/lib/cms/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxImageBytes = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const { user } = await requireCmsAdmin();
    requireSameOrigin(request);
    const formData = await request.formData();
    const file = formData.get("file");
    const altValue = formData.get("altText");

    if (!(file instanceof File)) throw new CmsRequestError("Choose an image to upload.", 400);
    if (!acceptedImageTypes.has(file.type)) {
      throw new CmsRequestError("Upload a JPG, PNG, WebP, or AVIF image.", 400);
    }
    if (file.size <= 0 || file.size > maxImageBytes) {
      throw new CmsRequestError("Images must be smaller than 8 MB.", 400);
    }

    const altText = typeof altValue === "string" ? altValue.trim().slice(0, 180) : "";
    const id = crypto.randomUUID();
    const blob = await putImage(`chop/${id}.webp`, file, {
      access: "public",
      optimizeImage: { width: 1600, quality: 78, format: "webp" },
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });

    const [media] = await db.insert(cmsMedia).values({
      pathname: blob.pathname,
      url: blob.url,
      filename: file.name.replace(/[\r\n\\/]/g, "-").slice(0, 200) || "image.webp",
      contentType: blob.contentType,
      sizeBytes: file.size,
      altText,
      createdBy: user.id,
    }).returning();

    return Response.json({ media }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
