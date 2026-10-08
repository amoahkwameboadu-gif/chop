"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Check, Eye, LoaderCircle, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { collectionConfigs, type EditorField } from "@/lib/cms/editor-config";
import { EditorFields } from "@/components/admin/editor-fields";

type Resource = keyof typeof collectionConfigs;
type WorkspaceItem = Record<string, unknown> & {
  id: string;
  status: string;
  updatedAt?: string;
  publishedData?: Record<string, unknown> | null;
};
type ResponseData = { items: WorkspaceItem[]; total: number; page?: number; pageSize?: number };
type CategoryItem = { slug: string; name: string; status: string };

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load this section.");
  return data as T;
}

function toDraftValues(fields: readonly EditorField[], source: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const value = source[field.name];
    if (field.kind === "list" || field.kind === "product-picker") {
      result[field.name] = Array.isArray(value) ? value : typeof value === "string" ? value : [];
    } else if (field.kind === "checkbox") {
      result[field.name] = Boolean(value);
    } else {
      result[field.name] = value ?? "";
    }
  }
  return result;
}

function serializeValues(fields: readonly EditorField[], values: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const value = values[field.name];
    if (field.kind === "checkbox") {
      result[field.name] = Boolean(value);
    } else if (field.kind === "list") {
      result[field.name] = Array.isArray(value)
        ? value.map(String).map((entry) => entry.trim()).filter(Boolean)
        : String(value ?? "").split("\n").map((entry) => entry.trim()).filter(Boolean);
    } else if (field.kind === "product-picker") {
      result[field.name] = Array.isArray(value) ? value.map(String) : [];
    } else if (field.kind === "number") {
      const text = String(value ?? "").trim();
      result[field.name] = field.optional && !text ? null : Number(text);
    } else {
      result[field.name] = String(value ?? "").trim();
    }
  }
  return result;
}

function formatDate(value: unknown) {
  if (typeof value !== "string" || !value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function CollectionWorkspace({ resource }: { resource: Resource }) {
  const config = collectionConfigs[resource];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<WorkspaceItem | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const { mutate: globalMutate } = useSWRConfig();

  const params = new URLSearchParams({ page: String(page), pageSize: "30" });
  if (resource === "products") {
    if (search.trim()) params.set("search", search.trim());
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (availabilityFilter !== "all") params.set("availability", availabilityFilter);
    params.set("sort", sort);
  }
  const endpoint = `/api/admin/${resource}?${params.toString()}`;
  const { data, error, isLoading, mutate } = useSWR<ResponseData>(endpoint, fetcher, { keepPreviousData: true });
  const { data: categories } = useSWR<{ items: CategoryItem[] }>(resource === "products" ? "/api/admin/categories" : null, fetcher);

  const visibleItems = useMemo(() => {
    const items = data?.items ?? [];
    if (resource === "products") return items;
    return items.filter((item) => {
      const matchesSearch = !search.trim() || JSON.stringify(item).toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data?.items, resource, search, statusFilter]);

  useEffect(() => {
    if (!editing) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !busy) {
        setEditing(null);
        setPreviewOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing, busy]);

  function openNew() {
    const defaults = { ...config.defaults } as Record<string, unknown>;
    if (resource === "products" && !defaults.category) defaults.category = categories?.items.find((item) => item.status !== "hidden")?.slug ?? "";
    setEditing(null);
    setDraft(toDraftValues(config.fields, defaults));
    setPreviewOpen(false);
    setNotice(null);
    document.body.style.overflow = "hidden";
    setEditing({ id: "", status: "draft" });
  }

  function openEdit(item: WorkspaceItem) {
    setEditing(item);
    setDraft(toDraftValues(config.fields, item));
    setPreviewOpen(false);
    setNotice(null);
    document.body.style.overflow = "hidden";
  }

  function closeEditor() {
    setEditing(null);
    setPreviewOpen(false);
    document.body.style.overflow = "";
  }

  async function save(action: "draft" | "publish" | "hide") {
    if (!editing) return;
    setBusy(true);
    setNotice(null);
    try {
      const payload: Record<string, unknown> = {
        action,
        data: serializeValues(config.fields, draft),
      };
      if (editing.id) payload.id = editing.id;
      const response = await fetch(`/api/admin/${resource}`, {
        method: editing.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save this item.");
      setNotice({ tone: "success", message: action === "publish" ? "Published. The live storefront will show this content on its next refresh." : action === "hide" ? "Hidden from the public storefront." : "Draft saved. It is not live until you publish it." });
      await mutate();
      void globalMutate((key) => typeof key === "string" && (key === "/api/admin/overview" || key.startsWith("/api/admin/")));
      closeEditor();
    } catch (error) {
      setNotice({ tone: "error", message: error instanceof Error ? error.message : "Unable to save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(item: WorkspaceItem) {
    const label = String(item[config.nameField] ?? config.singular);
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/admin/${resource}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete this item.");
      setNotice({ tone: "success", message: `${config.singular[0].toUpperCase()}${config.singular.slice(1)} deleted.` });
      await mutate();
      void globalMutate((key) => typeof key === "string" && (key === "/api/admin/overview" || key.startsWith("/api/admin/")));
    } catch (error) {
      setNotice({ tone: "error", message: error instanceof Error ? error.message : "Unable to delete. Please try again." });
    }
  }

  function changeFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  const total = data?.total ?? visibleItems.length;
  const pageCount = Math.max(1, Math.ceil(total / (data?.pageSize ?? 30)));
  const hasLiveDraft = Boolean(editing?.id && editing.publishedData && editing.status !== "published");

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <div className="admin-eyebrow">Content management</div>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <button className="admin-button" type="button" onClick={openNew}>
          <Plus size={15} aria-hidden="true" /> Add {config.singular}
        </button>
      </div>

      {notice && <div className={`admin-notice ${notice.tone}`} role="status">{notice.message}</div>}
      <div className="admin-toolbar" role="search">
        <label className="admin-search">
          <Search size={15} aria-hidden="true" />
          <input className="admin-input" type="search" value={search} onChange={(event) => changeFilter(setSearch, event.target.value)} placeholder={`Search ${config.title.toLowerCase()}…`} aria-label={`Search ${config.title.toLowerCase()}`} />
        </label>
        <select className="admin-select" value={statusFilter} onChange={(event) => changeFilter(setStatusFilter, event.target.value)} aria-label="Filter by publishing status">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="hidden">Hidden</option>
        </select>
        {resource === "products" && (
          <>
            <select className="admin-select" value={categoryFilter} onChange={(event) => changeFilter(setCategoryFilter, event.target.value)} aria-label="Filter by category">
              <option value="all">All categories</option>
              {(categories?.items ?? []).map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
            </select>
            <select className="admin-select" value={availabilityFilter} onChange={(event) => changeFilter(setAvailabilityFilter, event.target.value)} aria-label="Filter by availability">
              <option value="all">All availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Out of stock</option>
            </select>
            <select className="admin-select" value={sort} onChange={(event) => changeFilter(setSort, event.target.value)} aria-label="Sort products">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </>
        )}
      </div>

      <section className="admin-panel" aria-label={`${config.title} list`}>
        {isLoading ? (
          <div className="admin-loader">Loading {config.title.toLowerCase()}…</div>
        ) : error ? (
          <div className="admin-notice error" role="alert">{error.message}</div>
        ) : visibleItems.length === 0 ? (
          <div className="admin-empty-state">
            <strong>{search ? "No matching items" : `No ${config.title.toLowerCase()} yet`}</strong>
            {search ? "Try a different search or clear the filters." : "Add an item, save a draft, and publish it when it is ready for the storefront."}
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{config.singular}</th>
                  <th>Details</th>
                  {resource === "products" && <th>Availability</th>}
                  <th>Status</th>
                  <th><span className="admin-sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item) => {
                  const name = String(item[config.nameField] ?? "Untitled");
                  const image = config.imageField ? String(item[config.imageField] ?? "") : "";
                  const secondary = String(item[config.secondaryField] ?? "");
                  const categoryName = resource === "products"
                    ? categories?.items.find((category) => category.slug === secondary)?.name ?? secondary
                    : secondary;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="admin-table-primary">
                          {image && <img className="admin-table-image" src={image} alt="" />}
                          <span>
                            {name}
                            {secondary && <span className="admin-table-subtle">{categoryName}</span>}
                          </span>
                        </div>
                      </td>
                      <td>
                        {resource === "products" || resource === "promotions"
                          ? `GH₵${Number(item.price ?? 0).toFixed(2)}`
                          : String(item.description ?? item.message ?? item.url ?? item.deliveryTime ?? "—")}
                        {resource === "products" && Number(item.sortOrder) > 0 && <span className="admin-table-subtle">Position {String(item.sortOrder)}</span>}
                      </td>
                      {resource === "products" && <td><span className={`admin-pill ${item.available === false ? "unavailable" : "available"}`}>{item.available === false ? "Out of stock" : "Available"}</span></td>}
                      <td><span className={`admin-pill ${item.status}`}>{item.status}</span></td>
                      <td>
                        <div className="admin-row-actions">
                          <button className="admin-icon-button" type="button" aria-label={`Edit ${name}`} onClick={() => openEdit(item)}><Pencil size={14} /></button>
                          <button className="admin-icon-button" type="button" aria-label={`Delete ${name}`} onClick={() => void deleteItem(item)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {resource === "products" && pageCount > 1 && (
          <div className="admin-pagination">
            <span>Page {page} of {pageCount} · {total} products</span>
            <div className="admin-row-actions">
              <button className="admin-button ghost small" type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
              <button className="admin-button ghost small" type="button" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}>Next</button>
            </div>
          </div>
        )}
      </section>

      {editing && (
        <div className="admin-editor-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) closeEditor(); }}>
          <section className="admin-editor" role="dialog" aria-modal="true" aria-labelledby="editor-title">
            <header className="admin-editor-header">
              <div>
                <h2 id="editor-title">{editing.id ? `Edit ${config.singular}` : `Add ${config.singular}`}</h2>
                <p>{editing.id ? "Update the draft, preview your changes, then publish when ready." : "Save as a draft or publish this new item to the storefront."}</p>
              </div>
              <button className="admin-icon-button" type="button" aria-label="Close editor" onClick={closeEditor}><X size={16} /></button>
            </header>
            {hasLiveDraft && <div className="admin-notice">The current published version stays live until you publish this draft.</div>}
            <EditorFields fields={config.fields} values={draft} onChange={(name, value) => setDraft((current) => ({ ...current, [name]: value }))} />
            {notice && <div className={`admin-notice ${notice.tone}`} role="status">{notice.message}</div>}
            <footer className="admin-editor-footer">
              <div className="admin-editor-footer-group">
                <button className="admin-button secondary" type="button" onClick={() => setPreviewOpen(true)}>
                  <Eye size={14} aria-hidden="true" /> Preview
                </button>
                {editing.id && (
                  <button className="admin-button danger" type="button" disabled={busy} onClick={() => void save("hide")}>
                    Hide
                  </button>
                )}
              </div>
              <div className="admin-editor-footer-group">
                <button className="admin-button secondary" type="button" disabled={busy} onClick={() => void save("draft")}>
                  {busy ? <LoaderCircle size={14} className="admin-spin" /> : null} Save draft
                </button>
                <button className="admin-button" type="button" disabled={busy} onClick={() => void save("publish")}>
                  <Check size={14} aria-hidden="true" /> Publish
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}

      {previewOpen && editing && (
        <div className="admin-editor-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false); }}>
          <section className="admin-editor admin-preview" role="dialog" aria-modal="true" aria-labelledby="preview-title">
            <header className="admin-editor-header">
              <div>
                <div className="admin-eyebrow">Draft preview</div>
                <h2 id="preview-title">{String(draft[config.nameField] ?? draft.title ?? "New item")}</h2>
              </div>
              <button className="admin-icon-button" type="button" aria-label="Close preview" onClick={() => setPreviewOpen(false)}><X size={16} /></button>
            </header>
            <div className="admin-preview-body">
              {config.imageField && typeof draft[config.imageField] === "string" && draft[config.imageField] && <img src={String(draft[config.imageField])} alt="Draft preview" />}
              <span className="admin-pill draft">Preview only</span>
              {config.fields.filter((field) => field.kind !== "image" && field.kind !== "checkbox" && field.kind !== "product-picker").map((field) => {
                const value = draft[field.name];
                const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
                if (!text) return null;
                return <div key={field.name} className="admin-preview-row"><strong>{field.label}</strong><p>{text}</p></div>;
              })}
            </div>
            <footer className="admin-editor-footer">
              <span className="admin-topbar-title">This preview is not published.</span>
              <button className="admin-button" type="button" onClick={() => setPreviewOpen(false)}>Back to editor</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
