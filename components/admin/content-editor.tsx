"use client";

import { useEffect, useState } from "react";
import { Check, Eye, LoaderCircle, X } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
import { contentEditorConfigs, type EditorField } from "@/lib/cms/editor-config";
import { EditorFields } from "@/components/admin/editor-fields";

type ContentKey = keyof typeof contentEditorConfigs;
type ContentRow = Record<string, unknown> & { key: string; status: string; updatedAt?: string; publishedData?: Record<string, unknown> | null };

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load website content.");
  return data as T;
}

function initialValues(fields: readonly EditorField[], source: Record<string, unknown>) {
  const values: Record<string, unknown> = {};
  for (const field of fields) {
    const value = source[field.name];
    if (field.kind === "checkbox") values[field.name] = Boolean(value);
    else if (field.kind === "list" || field.kind === "product-picker") values[field.name] = Array.isArray(value) ? value : typeof value === "string" ? value : [];
    else values[field.name] = value ?? "";
  }
  return values;
}

function serializeValues(fields: readonly EditorField[], values: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const value = values[field.name];
    if (field.kind === "checkbox") result[field.name] = Boolean(value);
    else if (field.kind === "product-picker") result[field.name] = Array.isArray(value) ? value.map(String) : [];
    else if (field.kind === "list") result[field.name] = Array.isArray(value) ? value.map(String).map((entry) => entry.trim()).filter(Boolean) : String(value ?? "").split("\n").map((entry) => entry.trim()).filter(Boolean);
    else if (field.kind === "number") result[field.name] = Number(String(value ?? "").trim());
    else result[field.name] = String(value ?? "").trim();
  }
  return result;
}

export function ContentEditor({ contentKey }: { contentKey: ContentKey }) {
  const config = contentEditorConfigs[contentKey];
  const { data, error, isLoading, mutate } = useSWR<{ items: ContentRow[] }>("/api/admin/content", fetcher);
  const { mutate: globalMutate } = useSWRConfig();
  const [values, setValues] = useState<Record<string, unknown>>(() => initialValues(config.fields, config.defaults));
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const row = data?.items.find((item) => item.key === contentKey);

  useEffect(() => {
    if (!row || dirty) return;
    setValues(initialValues(config.fields, row));
  }, [row?.updatedAt, dirty, contentKey]);

  async function save(action: "draft" | "publish" | "hide") {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: row ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: contentKey, action, data: serializeValues(config.fields, values) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save website content.");
      setDirty(false);
      setNotice({ tone: "success", message: action === "publish" ? "Published. The live storefront will use these details on its next refresh." : action === "hide" ? "This section is hidden from the public website." : "Draft saved. The current published content stays live until you publish." });
      await mutate();
      void globalMutate((key) => typeof key === "string" && key.startsWith("/api/admin/"));
    } catch (cause) {
      setNotice({ tone: "error", message: cause instanceof Error ? cause.message : "Unable to save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const hasLiveDraft = Boolean(row?.publishedData && row.status !== "published");

  return (
    <>
      <div className="admin-page-heading">
        <div><div className="admin-eyebrow">Store content</div><h1>{config.title}</h1><p>{config.description}</p></div>
      </div>
      {notice && <div className={`admin-notice ${notice.tone}`} role="status">{notice.message}</div>}
      {error && <div className="admin-notice error" role="alert">{error.message}</div>}
      {hasLiveDraft && <div className="admin-notice">The published version remains on the website until you publish this draft.</div>}
      {isLoading ? <div className="admin-panel admin-loader">Loading website content…</div> : (
        <section className="admin-panel admin-content-section">
          <header className="admin-panel-header">
            <div><h2>Editable content</h2><p>{row ? `Last updated ${new Date(row.updatedAt ?? Date.now()).toLocaleString()}` : "Not set up yet. Import the existing storefront from Overview first."}</p></div>
            {row?.status && <span className={`admin-pill ${row.status}`}>{row.status}</span>}
          </header>
          <EditorFields fields={config.fields} values={values} onChange={(name, value) => { setDirty(true); setValues((current) => ({ ...current, [name]: value })); }} />
          <footer className="admin-editor-footer">
            <button className="admin-button secondary" type="button" onClick={() => setPreviewOpen(true)}><Eye size={14} aria-hidden="true" /> Preview draft</button>
            <div className="admin-editor-footer-group">
              {row && <button className="admin-button danger" type="button" disabled={busy} onClick={() => void save("hide")}>Hide section</button>}
              <button className="admin-button secondary" type="button" disabled={busy} onClick={() => void save("draft")}>{busy ? <LoaderCircle size={14} className="admin-spin" /> : null} Save draft</button>
              <button className="admin-button" type="button" disabled={busy} onClick={() => void save("publish")}><Check size={14} aria-hidden="true" /> Publish</button>
            </div>
          </footer>
        </section>
      )}
      {previewOpen && (
        <div className="admin-editor-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false); }}>
          <section className="admin-editor admin-preview" role="dialog" aria-modal="true" aria-labelledby="content-preview-title">
            <header className="admin-editor-header"><div><div className="admin-eyebrow">Preview only</div><h2 id="content-preview-title">{config.title}</h2></div><button className="admin-icon-button" type="button" aria-label="Close preview" onClick={() => setPreviewOpen(false)}><X size={16} /></button></header>
            <div className="admin-preview-body">
              {config.fields.filter((field) => field.kind !== "checkbox" && field.kind !== "product-picker").map((field) => {
                const value = values[field.name];
                const text = Array.isArray(value) ? value.join(", ") : String(value ?? "");
                if (!text) return null;
                return <div key={field.name} className="admin-preview-row"><strong>{field.label}</strong><p>{text}</p></div>;
              })}
            </div>
            <footer className="admin-editor-footer"><span className="admin-topbar-title">This preview is not live.</span><button className="admin-button" type="button" onClick={() => setPreviewOpen(false)}>Back to editor</button></footer>
          </section>
        </div>
      )}
    </>
  );
}
