import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PendingAccess } from "@/components/admin/pending-access";
import { getCmsAdminAccess } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const access = await getCmsAdminAccess();
  if (!access.user) redirect("/admin/sign-in");
  if (!access.admin) return <PendingAccess email={access.user.email} />;

  return (
    <AdminShell user={{ name: access.admin.displayName || access.user.name, email: access.user.email }}>
      {children}
    </AdminShell>
  );
}
