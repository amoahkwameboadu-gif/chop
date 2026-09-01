const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

function basicAuth(clientId, clientSecret) {
  return `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

    const url = new URL(request.url);
    if (url.pathname === '/hubtel-callback' && request.method === 'POST') {
      const callback = await request.text();
      console.log('Hubtel callback received:', callback);
      return json({ received: true });
    }
    if (url.pathname !== '/create-payment' || request.method !== 'POST') {
      return json({ error: 'Not found' }, 404);
    }

    let order;
    try {
      order = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    const amount = Number(order.amount);
    if (!Number.isFinite(amount) || amount <= 0 || !order.name || !order.phone) {
      return json({ error: 'Amount, name, and phone are required' }, 400);
    }

    const reference = String(order.reference || `CHOP-${Date.now()}`).slice(0, 50);
    const siteUrl = env.PUBLIC_SITE_URL || new URL(request.url).origin;
    const workerUrl = new URL(request.url).origin;
    const payload = {
      totalAmount: Number(amount.toFixed(2)),
      description: `Chop order ${reference}`,
      clientReference: reference,
      callbackUrl: `${workerUrl}/hubtel-callback`,
      returnUrl: `${siteUrl}/?payment=return&ref=${encodeURIComponent(reference)}`,
      cancellationUrl: `${siteUrl}/?payment=cancelled&ref=${encodeURIComponent(reference)}`,
      merchantAccountNumber: env.HUBTEL_MERCHANT_ACCOUNT,
      customerMsisdn: String(order.phone).replace(/\s+/g, ''),
      customerEmail: order.email || `${String(order.phone).replace(/\s+/g, '')}@chopgh.com`,
      customerName: order.name
    };

    const hubtelResponse = await fetch('https://payproxyapi.hubtel.com/items/initiate', {
      method: 'POST',
      headers: {
        Authorization: basicAuth(env.HUBTEL_CLIENT_ID, env.HUBTEL_CLIENT_SECRET),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await hubtelResponse.json();
    if (!hubtelResponse.ok) {
      return json({ error: 'Hubtel payment creation failed', details: result }, 502);
    }

    const checkoutUrl = result.data?.checkoutUrl || result.checkoutUrl || result.data?.checkoutUrlString;
    if (!checkoutUrl) return json({ error: 'Hubtel did not return a checkout URL' }, 502);
    return json({ checkoutUrl, reference });
  }
};
