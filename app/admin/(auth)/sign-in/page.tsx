import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { getCmsAdminAccess } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function AdminSignInPage() {
  const access = await getCmsAdminAccess();
  if (access.user) redirect("/admin");

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-brand">
        <div className="admin-auth-brand-head">
          <img src="/chop.png" alt="CHOP" />
          <span>CHOP GHANA</span>
        </div>
        <div className="admin-auth-brand-message">
          <span>Store management</span>
          <h1>Your storefront,<br />beautifully in sync.</h1>
          <p>Update the menu, offers, brand details and delivery information without changing the website code.</p>
        </div>
        <div className="admin-auth-brand-foot">Secure administrator access · Neon Auth</div>
      </section>
      <section className="admin-auth-panel">
        <AuthForm mode="sign-in" />
      </section>
    </main>
  );
}
