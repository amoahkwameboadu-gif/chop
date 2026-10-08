import { db } from "@/lib/db";
import { cmsOrders } from "@/lib/db/schema";
import { getStorefrontProductData } from "@/lib/cms/repository";
import { orderSchema } from "@/lib/cms/validation";
import { CmsRequestError } from "@/lib/cms/auth";

export const runtime = "nodejs";

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return Response.json({ error: "This request is not allowed." }, { status: 403 });
    }

    const result = orderSchema.safeParse(await request.json());
    if (!result.success) {
      return Response.json({ error: result.error.issues[0]?.message ?? "Check the order details." }, { status: 400 });
    }

    const requested = new Map<string, number>();
    for (const item of result.data.items) {
      requested.set(item.id, (requested.get(item.id) ?? 0) + item.quantity);
    }
    if ([...requested.values()].some((quantity) => quantity > 25)) {
      throw new CmsRequestError("The quantity limit is 25 of each item.", 400);
    }

    const catalog = await getStorefrontProductData();
    const catalogById = new Map(catalog.products.map((product) => [String(product.id), product]));
    const items = [...requested.entries()].map(([id, quantity]) => {
      const product = catalogById.get(id);
      if (!product || product.available === false) {
        throw new CmsRequestError("One of the selected items is no longer available. Refresh the menu and try again.", 409);
      }
      const price = Number(product.price);
      const name = typeof product.name === "string" ? product.name : "Menu item";
      if (!Number.isFinite(price) || price <= 0) {
        throw new CmsRequestError("One of the selected items cannot be ordered right now.", 409);
      }
      return { id, name, quantity, price: roundMoney(price) };
    });

    const subtotal = roundMoney(items.reduce((total, item) => total + item.price * item.quantity, 0));
    const deliverySettings = catalog.deliverySettings;
    const areas = catalog.deliveryAreas;
    const city = result.data.city;
    const area = areas.find((candidate) => String(candidate.city ?? candidate.name ?? "").toLowerCase() === city.toLowerCase());

    if (catalog.initialized && deliverySettings.deliveryAvailable === false) {
      throw new CmsRequestError("Delivery is currently unavailable.", 409);
    }
    if (catalog.initialized && areas.length > 0 && !area) {
      throw new CmsRequestError("Choose a delivery area available on the current delivery list.", 400);
    }
    if (area && area.available === false) {
      throw new CmsRequestError("Delivery is temporarily unavailable in this area.", 409);
    }

    const minimumOrder = Number(area?.minimumOrder ?? deliverySettings.minimumOrder ?? 0);
    if (subtotal < minimumOrder) {
      throw new CmsRequestError(`The minimum order for this area is GH₵${minimumOrder.toFixed(2)}.`, 400);
    }

    const defaultFee = Number(deliverySettings.defaultFee ?? 5);
    const freeThreshold = Number(deliverySettings.freeDeliveryThreshold ?? 100);
    const deliveryFee = freeThreshold > 0 && subtotal >= freeThreshold
      ? 0
      : roundMoney(Number(area?.fee ?? defaultFee));
    const total = roundMoney(subtotal + deliveryFee);
    const reference = `CHOP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const [order] = await db.insert(cmsOrders).values({
      reference,
      customerName: result.data.customerName,
      phone: result.data.phone,
      email: result.data.email,
      address: result.data.address,
      city,
      notes: result.data.notes,
      items,
      subtotal,
      deliveryFee,
      total,
    }).returning({ id: cmsOrders.id, reference: cmsOrders.reference });

    return Response.json({
      id: order.id,
      reference: order.reference,
      items,
      subtotal,
      deliveryFee,
      total,
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof CmsRequestError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    console.error("[cms] Order submission failed", error);
    return Response.json({ error: "Unable to place the order. Please try again." }, { status: 503 });
  }
}
