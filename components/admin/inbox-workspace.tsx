"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { Check, Search } from "lucide-react";

type InboxItem = Record<string, unknown> & { id: string; status: string; createdAt: string };
type InboxResponse = { items: InboxItem[]; total: number; page?: number; pageSize?: number };

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load the inbox.");
  return data as T;
}

const orderStatuses = ["new", "confirmed", "preparing", "ready", "delivering", "completed", "cancelled"];
const customerStatuses = ["new", "resolved", "archived"];

function dateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function InboxWorkspace({ resource }: { resource: "orders" | "customers" | "activity" }) {
  const title = resource === "orders" ? "Orders" : resource === "customers" ? "Customer messages" : "Activity log";
  const description = resource === "orders"
    ? "Review customer orders, confirm details, and keep fulfilment status current."
    : resource === "customers"
      ? "Read feedback and contact messages submitted from the public CHOP website."
      : "A timestamped record of CMS updates made by authorized administrators.";
  const { data, error, isLoading, mutate } = useSWR<InboxResponse>(`/api/admin/${resource}?page=1&pageSize=100`, fetcher, { refreshInterval: resource === "orders" ? 45_000 : 0 });
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState("");
  const items = useMemo(() => (data?.items ?? []).filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase())), [data?.items, search]);

  async function updateStatus(item: InboxItem, status: string) {
    setBusyId(item.id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/${resource}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to update this status.");
      setNotice("Status updated.");
      await mutate();
    } catch (cause) {
      setNotice(cause instanceof Error ? cause.message : "Unable to update this status.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <>
      <div className="admin-page-heading">
        <div><div className="admin-eyebrow">Store activity</div><h1>{title}</h1><p>{description}</p></div>
      </div>
      {notice && <div className="admin-notice" role="status">{notice}</div>}
      {error && <div className="admin-notice error" role="alert">{error.message}</div>}
      <div className="admin-toolbar">
        <label className="admin-search"><Search size={15} aria-hidden="true" /><input className="admin-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${title.toLowerCase()}…`} aria-label={`Search ${title.toLowerCase()}`} /></label>
      </div>
      <section className="admin-panel" aria-label={`${title} list`}>
        {isLoading ? <div className="admin-loader">Loading {title.toLowerCase()}…</div> : items.length === 0 ? (
          <div className="admin-empty-state"><strong>{search ? "No matching results" : `No ${resource === "orders" ? "orders" : resource === "customers" ? "messages" : "activity"} yet`}</strong>{search ? "Try another search term." : "New activity will appear here as it comes in."}</div>
        ) : resource === "orders" ? (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th><th>Status</th></tr></thead>
            <tbody>{items.map((item) => {
              const orderItems = Array.isArray(item.items) ? item.items as Array<Record<string, unknown>> : [];
              return <tr key={item.id}>
                <td><strong>{String(item.reference)}</strong><span className="admin-table-subtle">{String(item.city ?? "")}</span></td>
                <td><strong>{String(item.customerName)}</strong><span className="admin-table-subtle">{String(item.phone)}{item.email ? ` · ${String(item.email)}` : ""}</span><span className="admin-table-subtle">{String(item.address ?? "")}</span></td>
                <td>{orderItems.map((entry) => `${String(entry.name)} ×${String(entry.quantity)}`).join(", ") || "—"}</td>
                <td><strong>GH₵{Number(item.total ?? 0).toFixed(2)}</strong></td>
                <td>{dateTime(String(item.createdAt))}</td>
                <td><label className="admin-status-select"><span className="admin-sr-only">Order status for {String(item.reference)}</span><select className="admin-select" value={String(item.status)} disabled={busyId === item.id} onChange={(event) => void updateStatus(item, event.target.value)}>{orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></td>
              </tr>;
            })}</tbody>
          </table></div>
        ) : resource === "customers" ? (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Customer</th><th>Message</th><th>Received</th><th>Status</th></tr></thead>
            <tbody>{items.map((item) => <tr key={item.id}>
              <td><strong>{String(item.name)}</strong><span className="admin-table-subtle">{String(item.phone)}</span></td>
              <td className="admin-message-cell">{String(item.message)}</td>
              <td>{dateTime(String(item.createdAt))}</td>
              <td><label className="admin-status-select"><span className="admin-sr-only">Message status for {String(item.name)}</span><select className="admin-select" value={String(item.status)} disabled={busyId === item.id} onChange={(event) => void updateStatus(item, event.target.value)}>{customerStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></td>
            </tr>)}</tbody>
          </table></div>
        ) : (
          <div className="admin-table-wrap"><table className="admin-table">
            <thead><tr><th>Change</th><th>Administrator</th><th>Section</th><th>Date & time</th></tr></thead>
            <tbody>{items.map((item) => <tr key={String(item.id)}>
              <td>{String(item.summary)}</td><td>{String(item.actorEmail)}</td><td>{String(item.entityType)}</td><td>{dateTime(String(item.createdAt))}</td>
            </tr>)}</tbody>
          </table></div>
        )}
        {data && <div className="admin-pagination"><span>Showing {items.length} of {data.total} records</span>{notice === "Status updated." && <span><Check size={13} aria-hidden="true" /> Up to date</span>}</div>}
      </section>
    </>
  );
}
