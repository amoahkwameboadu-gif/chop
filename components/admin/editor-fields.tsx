"use client";

import { useState } from "react";
import { ImagePlus, LoaderCircle, Upload } from "lucide-react";
import useSWR from "swr";
import type { EditorField, EditorOption } from "@/lib/cms/editor-config";

type CmsProduct = { id: string; name: string; category?: string; price?: number; img?: string; status: string };
type CmsMedia = { id: string; url: string; filename: string; altText: string; sizeBytes: number };
type ListResponse<T> = { items: T[] };

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load this content.");
  return data as T;
}

function displaySize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

type EditorFieldsProps = {
  fields: readonly EditorField[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
};

export function EditorFields({ fields, values, onChange }: EditorFieldsProps) {
  return (
    <div className="admin-editor-body">
      {fields.map((field) => (
        <FieldInput key={field.name} field={field} value={values[field.name]} onChange={onChange} />
      ))}
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: EditorField; value: unknown; onChange: EditorFieldsProps["onChange"] }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const mediaKey = field.kind === "image" ? "/api/admin/media" : null;
  const productKey = field.kind === "product-picker" ? "/api/admin/products?pageSize=100" : null;
  const { data: mediaResponse } = useSWR<ListResponse<CmsMedia>>(mediaKey, fetcher, { revalidateOnFocus: false });
  const { data: productsResponse, error: productsError } = useSWR<ListResponse<CmsProduct>>(productKey, fetcher, { revalidateOnFocus: false });
  const categoryKey = field.kind === "select" && field.options === "categories" ? "/api/admin/categories" : null;
  const { data: categoriesResponse } = useSWR<ListResponse<{ slug: string; name: string }>>(categoryKey, fetcher, { revalidateOnFocus: false });

  async function uploadFile(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("altText", String(values.name ?? values.title ?? ""));
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      onChange(field.name, (result.media as CmsMedia).url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  if (field.kind === "product-picker") {
    const selected = Array.isArray(value) ? value.map(String) : [];
    return (
      <fieldset className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <legend>{field.label}</legend>
        {field.helper && <small>{field.helper}</small>}
        {productsError && <div className="admin-notice error">Unable to load products.</div>}
        {!productsResponse?.items.length ? (
          <small>Import the current storefront and publish products to choose them here.</small>
        ) : (
          <div className="admin-product-picker">
            {productsResponse.items.map((product) => {
              const checked = selected.includes(product.id);
              return (
                <label className="admin-product-option" key={product.id}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(field.name, event.target.checked
                      ? [...selected, product.id]
                      : selected.filter((id) => id !== product.id))}
                  />
                  {product.img && <img src={product.img} alt="" />}
                  <span>{product.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>
    );
  }

  if (field.kind === "checkbox") {
    return (
      <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <span className="admin-field-label">{field.label}</span>
        <label className="admin-checkbox-field">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(field.name, event.target.checked)} />
          <span>{field.helper ?? "Enabled"}</span>
        </label>
      </div>
    );
  }

  if (field.kind === "image") {
    const imageUrl = typeof value === "string" ? value : "";
    const library = mediaResponse?.items ?? [];
    return (
      <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <label htmlFor={`field-${field.name}`}>{field.label}</label>
        <input
          className="admin-input"
          id={`field-${field.name}`}
          type="url"
          value={imageUrl}
          placeholder="https://… or /food images/photo.jpg"
          onChange={(event) => onChange(field.name, event.target.value)}
        />
        {imageUrl && <img className="admin-image-preview" src={imageUrl} alt="Image preview" />}
        {field.helper && <small>{field.helper}</small>}
        <div className="admin-image-actions">
          <label className="admin-button secondary small">
            {uploading ? <LoaderCircle size={13} className="admin-spin" /> : <Upload size={13} />}
            {uploading ? "Optimizing…" : "Upload image"}
            <input className="admin-sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploading} onChange={(event) => void uploadFile(event.target.files?.[0])} />
          </label>
          {library.length > 0 && (
            <details className="admin-media-picker">
              <summary className="admin-button ghost small"><ImagePlus size={13} /> Choose from library</summary>
              <div className="admin-media-picker-grid">
                {library.slice(0, 30).map((media) => (
                  <button key={media.id} type="button" onClick={() => onChange(field.name, media.url)} aria-label={`Use ${media.altText || media.filename}`}>
                    <img src={media.url} alt="" />
                  </button>
                ))}
              </div>
            </details>
          )}
        </div>
        {uploadError && <small role="alert" className="admin-field-error">{uploadError}</small>}
      </div>
    );
  }

  if (field.kind === "select") {
    const options: EditorOption[] = field.options === "categories"
      ? (categoriesResponse?.items ?? []).map((category) => ({ value: category.slug, label: category.name }))
      : (field.options ?? []);
    return (
      <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <label htmlFor={`field-${field.name}`}>{field.label}</label>
        <select className="admin-select" id={`field-${field.name}`} value={String(value ?? "")} onChange={(event) => onChange(field.name, event.target.value)}>
          <option value="">Choose an option</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        {field.helper && <small>{field.helper}</small>}
      </div>
    );
  }

  if (field.kind === "list") {
    const textValue = Array.isArray(value) ? value.join("\n") : typeof value === "string" ? value : "";
    return (
      <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <label htmlFor={`field-${field.name}`}>{field.label}</label>
        <textarea className="admin-textarea" id={`field-${field.name}`} rows={Math.max(4, textValue.split("\n").length)} value={textValue} placeholder={field.placeholder} onChange={(event) => onChange(field.name, event.target.value)} />
        {field.helper && <small>{field.helper}</small>}
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
        <label htmlFor={`field-${field.name}`}>{field.label}</label>
        <textarea className="admin-textarea" id={`field-${field.name}`} value={String(value ?? "")} placeholder={field.placeholder} maxLength={3000} onChange={(event) => onChange(field.name, event.target.value)} />
        {field.helper && <small>{field.helper}</small>}
      </div>
    );
  }

  return (
    <div className={`admin-field${field.fullWidth ? " full" : ""}`}>
      <label htmlFor={`field-${field.name}`}>{field.label}</label>
      <input
        className="admin-input"
        id={`field-${field.name}`}
        type={field.kind}
        min={field.kind === "number" ? field.min : undefined}
        max={field.kind === "number" ? field.max : undefined}
        step={field.kind === "number" ? field.step : undefined}
        value={value === null || value === undefined ? "" : String(value)}
        placeholder={field.placeholder}
        required={!field.optional && field.kind !== "date" && field.kind !== "url"}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
      {field.helper && <small>{field.helper}</small>}
    </div>
  );
}
