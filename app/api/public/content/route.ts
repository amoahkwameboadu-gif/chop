import { getPublishedStorefrontContent } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const content = await getPublishedStorefrontContent();
    return Response.json(content, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[cms] Public content unavailable", error);
    return Response.json({ error: "Store content is temporarily unavailable." }, { status: 503 });
  }
}
