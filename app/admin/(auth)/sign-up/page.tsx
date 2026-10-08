import { redirect } from "next/navigation";
import { AuthForm } from "@/components/admin/auth-form";
import { getCmsAdminAccess } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function AdminSignUpPage() {
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
          <span>Secure account setup</span>
          <h1>One account.<br />One trusted team.</h1>
          <p>Creating an account does not grant CMS permissions. Access stays closed until the CHOP owner approves the account.</p>
        </div>
        <div className="admin-auth-brand-foot">Protected by Neon Managed Auth</div>
      </section>
      <section className="admin-auth-panel">
        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
