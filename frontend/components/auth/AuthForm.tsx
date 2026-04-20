"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { appUrl, isSupabaseConfigured } from "@/lib/supabase/config";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();
  const isSignUp = mode === "sign-up";

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setError("Supabase is not configured yet. Add frontend/.env values first.");
      return;
    }

    setLoading(true);

    const response = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${appUrl}/auth/callback`,
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    if (isSignUp) {
      setMessage("Check your email to confirm your LENS & LORE account.");
      return;
    }

    window.location.assign("/profile");
  }

  async function handleMagicLink() {
    setError(null);
    setMessage(null);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setError("Supabase is not configured yet. Add frontend/.env values first.");
      return;
    }

    if (!email) {
      setError("Enter your email first so we can send a magic link.");
      return;
    }

    setLoading(true);

    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${appUrl}/auth/callback`,
      },
    });

    setLoading(false);

    if (magicLinkError) {
      setError(magicLinkError.message);
      return;
    }

    setMessage("Magic link sent. Check your inbox to continue.");
  }

  async function handleGoogle() {
    setError(null);
    setMessage(null);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setError("Supabase is not configured yet. Add frontend/.env values first.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${appUrl}/auth/callback`,
      },
    });
  }

  return (
    <div className="border border-ivory/12 bg-slate p-6">
      {!configured ? (
        <div className="mb-6 border border-gold/30 bg-gold/10 p-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-gold">
            Auth Setup Needed
          </p>
          <p className="mt-3 text-sm leading-7 text-ivory/70">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            to `frontend/.env` to enable real multi-user sign-up.
          </p>
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handlePasswordSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/58"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none transition-colors focus:border-gold"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/58"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none transition-colors focus:border-gold"
            placeholder="Minimum 8 characters"
          />
        </div>

        {error ? (
          <p className="border border-blood/50 bg-blood/10 p-3 text-sm leading-6 text-ivory">
            {error}
          </p>
        ) : null}

        {message ? (
          <p className="border border-gold/40 bg-gold/10 p-3 text-sm leading-6 text-ivory">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-between border border-blood px-5 py-4 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-blood disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Working" : isSignUp ? "Create Account" : "Sign In"}
          <span>{isSignUp ? "01" : "02"}</span>
        </button>
      </form>

      <div className="mt-4 grid gap-3">
        <button
          type="button"
          onClick={handleMagicLink}
          disabled={loading}
          className="border border-ivory/12 px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Email Magic Link
        </button>
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="border border-ivory/12 px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue With Google
        </button>
      </div>

      <p className="mt-6 text-sm leading-7 text-ivory/60">
        {isSignUp ? "Already have an account?" : "New here?"}{" "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="text-gold underline-offset-4 hover:underline"
        >
          {isSignUp ? "Sign in" : "Create your account"}
        </Link>
      </p>
    </div>
  );
}
