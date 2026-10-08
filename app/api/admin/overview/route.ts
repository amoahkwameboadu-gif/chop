import { cmsErrorResponse, requireCmsAdmin } from "@/lib/cms/auth";
import { getDashboardOverview } from "@/lib/cms/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireCmsAdmin();
    const overview = await getDashboardOverview();
    return Response.json(overview, {
      headers: { "Cache-Control": "private, no-store, max-age=0" },
    });
  } catch (error) {
    return cmsErrorResponse(error);
  }
}
