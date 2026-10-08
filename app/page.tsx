import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";

export const dynamic = "force-static";

const source = readFileSync(join(process.cwd(), "public", "index.html"), "utf8");
const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

export default function StorefrontPage() {
  return (
    <>
      <div id="storefront-root" dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
