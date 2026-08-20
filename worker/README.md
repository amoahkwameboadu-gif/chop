# Chop Hubtel Worker

This Cloudflare Worker keeps Hubtel credentials off the website and creates Hubtel Checkout sessions.

## Deploy

From this directory:

```powershell
npm install -D wrangler
npx wrangler login
npx wrangler secret put HUBTEL_CLIENT_ID
npx wrangler secret put HUBTEL_CLIENT_SECRET
npx wrangler secret put HUBTEL_MERCHANT_ACCOUNT
npx wrangler deploy
```

Set `PUBLIC_SITE_URL` in `wrangler.toml` to the deployed Cloudflare Pages URL, then deploy again. Copy the Worker URL into `HUBTEL_WORKER_URL` in `Untitled-1.html`.

The Hubtel dashboard must allow the callback URL:

`https://YOUR-CLOUDFLARE-PAGES-DOMAIN/hubtel-callback`

Do not put Hubtel credentials in the HTML or commit them to source control.
