"use client";

import { useRef, useState } from "react";
import useSWR from "swr";
import { Check, Copy, ImagePlus, LoaderCircle, Trash2, Upload } from "lucide-react";

type Media = { id: string; url: string; pathname: string; filename: string; altText: string; contentType: string; sizeBytes: number; createdAt: string };

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load the media library.");
  return data as T;
}

function sizeLabel(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function MediaLibrary() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading, mutate } = useSWR<{ items: Media[]; total: number }>("/api/admin/media", fetcher);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [copied, setCopied] = useState("");

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setBusy(true);
    setNotice(null);
    try {
      let uploaded = 0;
      for (const file of Array.from(fileList)) {
        const form = new FormData();
        form.set("file", file);
        form.set("altText", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
        const response = await fetch("/api/upload", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || `Unable to upload ${file.name}.`);
        uploaded += 1;
      }
      setNotice({ tone: "success", message: `${uploaded} image${uploaded === 1 ? "" : "s"} uploaded and optimized.` });
      await mutate();
    } catch (cause) {
      setNotice({ tone: "error", message: cause instanceof Error ? cause.message : "Upload failed. Please try again." });
      await mutate();
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function copyUrl(media: Media) {
    try {
      await navigator.clipboard.writeText(media.url);
      setCopied(media.id);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setNotice({ tone: "error", message: "Clipboard access is not available in this browser. Select and copy the image URL instead." });
    }
  }

  async function removeMedia(media: Media) {
    if (!window.confirm(`Delete “${media.filename}”? The image cannot be restored.`)) return;
    try {
      const response = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: media.id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete this image.");
      setNotice({ tone: "success", message: "Image deleted from the media library." });
      await mutate();
    } catch (cause) {
      setNotice({ tone: "error", message: cause instanceof Error ? cause.message : "Unable to delete this image." });
    }
  }

  return (
    <>
      <div className="admin-page-heading">
        <div><div className="admin-eyebrow">Store assets</div><h1>Media library</h1><p>Upload optimized public images and reuse them across products, categories, offers, and homepage sections.</p></div>
        <button className="admin-button" type="button" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? <LoaderCircle size={15} className="admin-spin" /> : <Upload size={15} />}
          {busy ? "Optimizing…" : "Upload images"}
        </button>
        <input ref={inputRef} className="admin-sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => void uploadFiles(event.target.files)} />
      </div>
      <div className="admin-notice"><ImagePlus size={16} aria-hidden="true" /><span>Images are optimized to WebP before they are stored. To remove an image, first update any draft or published content that uses it.</span></div>
      {notice && <div className={`admin-notice ${notice.tone}`} role="status">{notice.message}</div>}
      {error && <div className="admin-notice error" role="alert">{error.message}</div>}
      <section className="admin-panel">
        <div className="admin-panel-header"><div><h2>Uploaded images</h2><p>{data?.total ?? 0} media items</p></div></div>
        <div className="admin-panel-body">
          {isLoading ? <div className="admin-loader">Loading media…</div> : !data?.items.length ? (
            <div className="admin-empty-state"><strong>Your media library is empty</strong>Upload a JPG, PNG, WebP, or AVIF image to get started.</div>
          ) : (
            <div className="admin-media-grid">
              {data.items.map((media) => (
                <article className="admin-media-card" key={media.id}>
                  <img src={media.url} alt={media.altText || media.filename} loading="lazy" />
                  <div className="admin-media-card-body">
                    <strong title={media.filename}>{media.filename}</strong>
                    <span>{sizeLabel(media.sizeBytes)} · {media.contentType}</span>
                    <div className="admin-image-actions">
                      <button className="admin-button secondary small" type="button" onClick={() => void copyUrl(media)}>{copied === media.id ? <Check size={13} /> : <Copy size={13} />}{copied === media.id ? "Copied" : "Copy URL"}</button>
                      <button className="admin-icon-button" type="button" aria-label={`Delete ${media.filename}`} onClick={() => void removeMedia(media)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
