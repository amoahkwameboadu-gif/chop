"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  Bell,
  Boxes,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FolderOpen,
  Gauge,
  Grid2X2,
  Image,
  Layers3,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Navigation,
  Package,
  Settings2,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth/client";

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Grid2X2 },
  { label: "Promotions", href: "/admin/promotions", icon: Bell },
  { label: "Announcements", href: "/admin/announcements", icon: MessageSquareText },
  { label: "Homepage", href: "/admin/homepage", icon: Layers3 },
  { label: "Website content", href: "/admin/content", icon: Boxes },
  { label: "About CHOP", href: "/admin/about", icon: CircleHelp },
  { label: "Delivery", href: "/admin/delivery", icon: Truck },
  { label: "Navigation", href: "/admin/navigation", icon: Navigation },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Customers", href: "/admin/customers", icon: MessageSquareText },
  { label: "Media library", href: "/admin/media", icon: Image },
  { label: "Footer", href: "/admin/footer", icon: FolderOpen },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
  { label: "Activity log", href: "/admin/activity", icon: Activity },
];

type AdminShellProps = {
  children: React.ReactNode;
  user: { name: string; email: string };
};

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await authClient.signOut();
    } finally {
      router.replace("/admin/sign-in");
      router.refresh();
      setSigningOut(false);
    }
  }

  const initials = user.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="admin-shell">
      <button
        type="button"
        className={`admin-sidebar-scrim${menuOpen ? " show" : ""}`}
        aria-label="Close navigation"
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`admin-sidebar${menuOpen ? " open" : ""}`} aria-label="CHOP admin navigation">
        <Link href="/admin" className="admin-brand" onClick={() => setMenuOpen(false)}>
          <img src="/chop.png" alt="CHOP" />
          <span className="admin-brand-copy">
            <strong>CHOP ADMIN</strong>
            <span>Store management</span>
          </span>
        </Link>
        <div className="admin-nav-label">Workspace</div>
        <nav className="admin-nav">
          {navigation.map(({ label, href, icon: Icon }) => {
            const current = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" rel="noreferrer">
            <UtensilsCrossed size={15} aria-hidden="true" />
            <span>View storefront</span>
            <ChevronRight size={13} aria-hidden="true" />
          </Link>
          <button className="admin-signout" type="button" onClick={signOut} disabled={signingOut}>
            <LogOut size={15} aria-hidden="true" />
            <span>{signingOut ? "Signing out…" : "Sign out"}</span>
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
          <span className="admin-topbar-title">CHOP / Store management</span>
          <div className="admin-topbar-user">
            <span className="admin-avatar" aria-hidden="true">{initials || "C"}</span>
            <span>{user.name}</span>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
