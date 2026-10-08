import { db } from "@/lib/db";
import { cmsMessages } from "@/lib/db/schema";
import { contactSchema } from "@/lib/cms/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return Response.json({ error: "This request is not allowed." }, { status: 403 });
    }

    const result = contactSchema.safeParse(await request.json());
    if (!result.success) {
      return Response.json({ error: result.error.issues[0]?.message ?? "Check the message details." }, { status: 400 });
    }

    await db.insert(cmsMessages).values({
      name: result.data.name,
      phone: result.data.phone,
      message: result.data.message,
    });

    return Response.json({ received: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[cms] Contact submission failed", error);
    return Response.json({ error: "Unable to send your message. Please try again." }, { status: 503 });
  }
}
