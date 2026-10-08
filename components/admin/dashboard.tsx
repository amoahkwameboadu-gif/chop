"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Image,
  Package,
  Plus,
  RefreshCw,
  Settings2,
  ShoppingBag,
  Sparkles,
  Tags,
  Truck,
} from "lucide-react";

type Activity = { id: number; summary: string; actorEmail: string; createdAt: string; action: string };
type Overview = {
  counts: { products: number; available: number; featured: number; categories: number; orders: number; messages: number };
  initialized: boolean;
  recentActivity: Activity[];
};

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load the dashboard.");
  return data as T;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

const stats = [
  { key: "products", label: "Menu products", note: "Visible or in progress", icon: Package },
  { key: "available", label: "Available now", note: "Ready to order", icon: ShoppingBag },
  { key: "featured", label: "Featured", note: "Homepage selections", icon: Sparkles },
  { key: "categories", label: "Categories", note: "Menu groups", icon: Tags },
] as const;

export function Dashboard() {
  const { data, error, isLoading, mutate } = useSWR<Overview>("/api/admin/overview", fetcher, { refreshInterval: 60_000 });
  const { mutate: globalMutate } = useSWRConfig();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);

  async function importCurrentStorefront() {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/bootstrap", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to import the current storefront.");
      setNotice({ tone: "success", message: "Current menu, categories, deals, and brand content imported. You can edit drafts and publish changes whenever you are ready." });
      await mutate();
      void globalMutate((key) => typeof key === "string" && key.startsWith("/api/admin/"));
    } catch (cause) {
      setNotice({ tone: "error", message: cause instanceof Error ? cause.message : "Unable to import the current storefront." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="admin-page-heading admin-welcome">
        <div>
          <div className="admin-eyebrow">CHOP / Overview</div>
          <h1>Good to see you.</h1>
          <p>Manage the content customers see across the live CHOP storefront.</p>
        </div>
        <Link className="admin-button secondary" href="/" target="_blank" rel="noreferrer">
          Preview storefront <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {notice && <div className={`admin-notice ${notice.tone}`} role="status">{notice.message}</div>}
      {error && <div className="admin-notice error" role="alert">{error.message}</div>}
      {!isLoading && data && !data.initialized && (
        <section className="admin-notice admin-onboarding">
          <div className="admin-onboarding-icon"><RefreshCw size={17} aria-hidden="true" /></div>
          <div className="admin-onboarding-copy">
            <strong>Bring your current storefront into the CMS</strong>
            <span>This one-time import copies the existing menu, categories, offers, delivery areas, and brand details. It preserves the current public design and content.</span>
          </div>
          <button className="admin-button" type="button" onClick={importCurrentStorefront} disabled={busy}>
            {busy ? <RefreshCw size={14} className="admin-spin" /> : <CheckCircle2 size={14} />}
            {busy ? "Importing…" : "Import current storefront"}
          </button>
        </section>
      )}

      <div className="admin-stats-grid">
        {stats.map(({ key, label, note, icon: Icon }) => (
          <article className="admin-stat-card" key={key}>
            <div className="admin-stat-top"><span>{label}</span><span className="admin-stat-icon"><Icon size={16} aria-hidden="true" /></span></div>
            <strong className="admin-stat-value">{isLoading ? "—" : data?.counts[key] ?? 0}</strong>
            <div className="admin-stat-foot">{note}</div>
          </article>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div><h2>Recent activity</h2><p>Changes made by authorized administrators</p></div>
            <Link href="/admin/activity" className="admin-text-link">View log</Link>
          </div>
          <div className="admin-panel-body">
            {isLoading ? <div className="admin-loader">Loading activity…</div> : !data?.recentActivity.length ? (
              <div className="admin-empty-state"><strong>No activity recorded yet</strong>Published changes and content edits will appear here.</div>
            ) : (
              <div className="admin-activity-list">
                {data.recentActivity.map((item) => (
                  <article className="admin-activity-item" key={item.id}>
                    <span className="admin-activity-dot" aria-hidden="true" />
                    <div className="admin-activity-copy"><p>{item.summary}</p><time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time></div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header"><div><h2>Quick actions</h2><p>Common store updates</p></div><Plus size={16} color="#a22d26" aria-hidden="true" /></div>
          <div className="admin-panel-body">
            <div className="admin-quick-actions">
              <QuickAction href="/admin/products" label="Manage menu" icon={<Package size={16} />} />
              <QuickAction href="/admin/promotions" label="Update offers" icon={<Bell size={16} />} />
              <QuickAction href="/admin/orders" label={`Order inbox · ${data?.counts.orders ?? 0}`} icon={<ClipboardList size={16} />} />
              <QuickAction href="/admin/media" label="Upload media" icon={<Image size={16} />} />
              <QuickAction href="/admin/delivery" label="Delivery areas" icon={<Truck size={16} />} />
              <QuickAction href="/admin/settings" label="Business settings" icon={<Settings2 size={16} />} />
            </div>
          </div>
        </section>
      </div>

      <section className="admin-panel admin-dashboard-inbox">
        <div className="admin-panel-header"><div><h2>Store activity</h2><p>Keep a pulse on what customers are doing.</p></div></div>
        <div className="admin-inbox-links">
          <Link href="/admin/orders"><span className="admin-stat-icon"><ShoppingBag size={16} /></span><span><strong>{data?.counts.orders ?? 0} orders</strong><small>Review incoming orders</small></span><ArrowUpRight size={15} /></Link>
          <Link href="/admin/customers"><span className="admin-stat-icon"><Clock3 size={16} /></span><span><strong>{data?.counts.messages ?? 0} new messages</strong><small>Follow up with customers</small></span><ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </>
  );
}

function QuickAction({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return <Link className="admin-quick-link" href={href}><span>{icon}</span>{label}</Link>;
}
