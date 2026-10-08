"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth/client";

export function PendingAccess({ email }: { email: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    try {
      await authClient.signOut();
    } finally {
      router.replace("/admin/sign-in");
      router.refresh();
      setBusy(false);
    }
  }

  return (
    <main className="admin-pending-page">
      <section className="admin-pending-card" aria-labelledby="pending-title">
        <img src="/chop.png" alt="CHOP" />
        <div className="admin-eyebrow">CHOP CMS</div>
        <h1 id="pending-title">Administrator approval required</h1>
        <p>
          This account can sign in, but it has not been granted access to manage the CHOP website. Ask the site owner to approve this email address.
        </p>
        <div className="admin-pending-email">{email}</div>
        <div>
          <button className="admin-button secondary" type="button" onClick={signOut} disabled={busy}>
            <LogOut size={14} aria-hidden="true" />
            {busy ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </section>
    </main>
  );
}
