# Chop

## Live site

The production site is available at [chop-eight.vercel.app](https://chop-eight.vercel.app/).

Chop is deployed as a Cloudflare Pages site. The deployable static site and
Pages Functions live in [`pages/`](./pages/).

## Deploy to Cloudflare Pages

1. Install Wrangler and authenticate:

   ```powershell
   npm install -D wrangler
   npx wrangler login
   ```

2. Create or select the Pages project named `chop`, then deploy the `pages`
   directory:

   ```powershell
   npx wrangler pages deploy pages --project-name chop
   ```

3. Add the Paystack secret to the Pages project:

   ```powershell
   npx wrangler pages secret put PAYSTACK_SECRET_KEY --project-name chop
   ```

The Pages Function at `/create-payment` reads `PAYSTACK_SECRET_KEY` at runtime;
the secret must not be added to the frontend or committed to the repository.

For a custom domain, update `PUBLIC_SITE_URL` in `wrangler.toml` to that
domain before deploying so payment return URLs use the public site address.
