# Chop CMS

CHOP is a storefront served by a Cloudflare Worker. Editable products,
categories, promotions, announcements, navigation, delivery areas, website
content, and uploaded images live in D1. The administrator interface is
available at `/admin`; its API is protected by server-validated sessions.

## Cloudflare setup

Use the Cloudflare account configured in `wrangler.toml`.

1. Authenticate Wrangler from a local terminal:

   ```powershell
   npx wrangler login
   ```

2. Create the D1 database:

   ```powershell
   npx wrangler d1 create chop-db
   ```

   Copy the D1 `database_id` printed by Wrangler into `wrangler.toml`, replacing
   the all-zero placeholder UUID. Do this before applying migrations or
   deploying.

3. Apply the schema and initial CHOP menu/content data:

   ```powershell
   npx wrangler d1 migrations apply chop-db --remote
   ```

4. Set authentication secrets from the terminal prompts. Use two different,
   randomly generated values of at least 32 characters. Do not put them in
   source files or paste them into chat.

   ```powershell
   npx wrangler secret put SESSION_SECRET
   npx wrangler secret put ADMIN_SETUP_TOKEN
   ```

5. Deploy the Worker and its static assets:

   ```powershell
   npx wrangler deploy
   ```

6. Open the deployed Worker URL followed by `/admin`. On first visit, enter the
   setup token and create the administrator account with a 12-character
   minimum password. Then remove the one-time setup secret:

   ```powershell
   npx wrangler secret delete ADMIN_SETUP_TOKEN
   ```

The deployment is available at the Worker URL Wrangler prints (normally
`https://chop.<your-account-subdomain>.workers.dev`). The existing
`chop-alpha.vercel.app` address is a Vercel-owned hostname and cannot be routed
through your Cloudflare account. The CMS-backed storefront will first be
available at the Worker URL. To use a branded hostname, attach a domain you own
to this Worker in Cloudflare after deployment; the Vercel address will remain a
separate deployment.

## Security and content behavior

- Passwords are stored as PBKDF2 hashes in D1. Admin sessions are signed and
  stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
- Admin mutations require a valid session and same-origin request. The API
  validates content server-side, and login attempts are rate-limited.
- Never commit Wrangler secrets, D1 credentials, or `.env` files.
- The Worker serves only the intended static site assets; migration and Worker
  source directories are excluded by `.assetsignore`.
- Content changes are read from D1 on each public-site load and refreshed on
  open storefronts about once a minute; ordinary content updates do not require
  a redeploy.
- Images are optimized in the browser when possible and stored as D1 blobs, so
  media uploads do not require a paid R2 bucket. To keep database writes and
  storage modest on the free tier, optimized uploads are limited to 1 MB each.
- Orders remain the current storefront's SMS handoff; they are not persisted
  as a server-side order/customer database.

## Chop assistant chatbot

The storefront includes a floating AI assistant (bottom-right chat icon) that
answers questions about the menu, prices, deals, delivery coverage, hours,
ordering steps, and the Chop Catcher game. It is intentionally quiet until
opened: no banner, greeting card, or auto-open.

The assistant runs entirely server-side at `POST /api/chat` through the
Worker. On every message the Worker rebuilds a system prompt from the live D1
catalog (`products`, `promotions`, `site_content`, `delivery_areas`) via the
same data as the public site, so answers reflect current content rather than
hardcoded text. The prompt instructs the model to use only official Chop
information for business facts and to escalate unknowns instead of guessing.

Provider configuration, in priority order:

1. **Workers AI** (default): the `[ai]` binding in `wrangler.toml`, model
   `@cf/meta/llama-3.1-8b-instruct-fp8`. Set an `AI_MODEL` Worker variable to use
   a different model. If the AI call fails, the assistant falls back to the
   OpenAI-compatible API when configured, otherwise it shows a friendly error.
2. **Any OpenAI-compatible API**: set the `CHAT_API_URL` and `CHAT_API_KEY`
   secrets (optionally `CHAT_MODEL`). No frontend key is ever exposed.

If neither is configured, `/api/chat` returns HTTP 503 with a clear message
and the storefront shows a friendly fallback. Requests are validated
(length, shape, same-origin) and rate-limited per IP. Secrets stay in
Cloudflare; nothing is committed to the repository.

## Local development

After Cloudflare resources have been configured:

```powershell
npx wrangler dev
```

Use a local D1 database with the migrations applied for isolated testing.
