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

async function handlePayment(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const url = new URL(request.url);
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
  if (!Number.isFinite(amount) || amount <= 0 || !order.name || !order.email) {
    return json({ error: 'Amount, name, and email are required' }, 400);
  }

  const reference = String(order.reference || `CHOP-${Date.now()}`).slice(0, 50);
  const siteUrl = env.PUBLIC_SITE_URL || new URL(request.url).origin;
  
  // Convert amount to kobo (Paystack expects amount in kobo - multiply by 100)
  const amountInKobo = Math.round(amount * 100);
  
  const payload = {
    email: order.email,
    amount: amountInKobo,
    reference: reference,
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
  if (!checkoutUrl) return json({ error: 'Paystack did not return a checkout URL' }, 502);
  return json({ checkoutUrl, reference });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/create-payment')) {
      return handlePayment(request, env);
    }
    
    // Serve static assets for everything else
    // The assets binding will handle this automatically
    return env.ASSETS.fetch(request);
  }
};
