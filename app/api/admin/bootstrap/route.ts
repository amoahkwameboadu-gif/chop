import { cmsErrorResponse, requireCmsAdmin, requireSameOrigin } from "@/lib/cms/auth";
import { bootstrapStorefront } from "@/lib/cms/mutations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { user } = await requireCmsAdmin();
    requireSameOrigin(request);
    await bootstrapStorefront(user);
    return Response.json({ imported: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
