"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth/client";

type AuthFormProps = { mode: "sign-in" | "sign-up" };

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const signingUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");

    try {
      const result = signingUp
        ? await authClient.signUp.email({
            name: String(form.get("name") ?? "").trim(),
            email,
            password,
          })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(signingUp
          ? "We could not create that account. Check the details and try again."
          : "We could not sign you in. Check your details and try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError(signingUp
        ? "We could not create that account. Check the details and try again."
        : "We could not sign you in. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-auth-card" aria-labelledby="auth-title">
      <div className="admin-eyebrow">CHOP back office</div>
      <h2 id="auth-title">{signingUp ? "Create an account" : "Welcome back"}</h2>
      <p>
        {signingUp
          ? "Create your secure Neon Auth account. CMS access is granted separately by the CHOP administrator."
          : "Sign in to manage the live CHOP storefront and orders."}
      </p>
      <form className="admin-auth-form" onSubmit={handleSubmit}>
        {signingUp && (
          <div className="admin-field">
            <label htmlFor="name">Your name</label>
            <input className="admin-input" id="name" name="name" type="text" autoComplete="name" maxLength={120} required />
          </div>
        )}
        <div className="admin-field">
          <label htmlFor="email">Email address</label>
          <input className="admin-input" id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input className="admin-input" id="password" name="password" type="password" autoComplete={signingUp ? "new-password" : "current-password"} minLength={8} required />
          {signingUp && <small>Use at least 8 characters.</small>}
        </div>
        {error && <div className="admin-notice error" role="alert">{error}</div>}
        <button className="admin-button" type="submit" disabled={busy}>
          {busy ? <LoaderCircle size={15} className="admin-spin" aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
          {busy ? "Please wait…" : signingUp ? "Create account" : "Sign in securely"}
        </button>
      </form>
      <div className="admin-auth-help">
        {signingUp ? "Already have an account? " : "New to CHOP admin? "}
        <Link href={signingUp ? "/admin/sign-in" : "/admin/sign-up"}>
          {signingUp ? "Sign in" : "Create an account"}
        </Link>
      </div>
    </section>
  );
}
