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

export async function onRequestPost({ request, env }) {
  let order;
  try {
    order = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const amount = Number(order.amount);
  if (!Number.isFinite(amount) || amount <= 0 || !order.name || !order.email) {
    return json({ error: 'Amount, name, and email are required' }, 400);
  }

  if (!env.PAYSTACK_SECRET_KEY) {
    return json({ error: 'Payment service is not configured' }, 503);
  }

  const reference = String(order.reference || `CHOP-${Date.now()}`).slice(0, 50);
  const siteUrl = env.PUBLIC_SITE_URL || new URL(request.url).origin;
  const amountInKobo = Math.round(amount * 100);
  const payload = {
    email: order.email,
    amount: amountInKobo,
    reference,
    callback_url: `${siteUrl}/?payment=return&ref=${encodeURIComponent(reference)}`,
    metadata: {
      customer_name: order.name,
      customer_phone: order.phone || '',
      cancel_action: `${siteUrl}/?payment=cancelled&ref=${encodeURIComponent(reference)}`
    }
  };

  const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await paystackResponse.json();
  if (!paystackResponse.ok || !result.status) {
    return json({ error: 'Paystack payment creation failed', details: result }, 502);
  }

  const checkoutUrl = result.data?.authorization_url;
  if (!checkoutUrl) {
    return json({ error: 'Paystack did not return a checkout URL' }, 502);
  }

  return json({ checkoutUrl, reference });
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}
