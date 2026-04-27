"use client";

import { FormEvent, useState } from "react";
import { useReaderStore } from "@/lib/store/reader-store";
import { useShell } from "@/components/providers/ShellProvider";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
  onSuccess?: () => void;
};

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signUp = useReaderStore((state) => state.signUp);
  const signIn = useReaderStore((state) => state.signIn);
  const { closeAuth, setAuthMode } = useShell();
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const result = isSignUp
      ? await signUp(email, password, name || email.split("@")[0] || "Reader")
      : await signIn(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setMessage(isSignUp ? "Welcome to the Archive." : "Welcome back.");
    setTimeout(() => {
      closeAuth();
      onSuccess?.();
    }, 900);
  }

  return (
    <div className="border border-ivory/12 bg-slate p-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="space-y-2">
            <label
              htmlFor="auth-name"
              className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/58"
            >
              Name
            </label>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none transition-colors focus:border-gold"
              placeholder="Your name"
            />
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="auth-email"
            className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/58"
          >
            Email
          </label>
          <input
            id="auth-email"
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
            htmlFor="auth-password"
            className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/58"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="w-full border border-ivory/12 bg-black px-4 py-4 text-ivory outline-none transition-colors focus:border-gold"
            placeholder="Minimum 6 characters"
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
          {loading ? "Working…" : isSignUp ? "Create Account" : "Sign In"}
          <span>→</span>
        </button>
      </form>

      <p className="mt-6 text-sm leading-7 text-ivory/60">
        {isSignUp ? "Already have an account?" : "New here?"}{" "}
        <button
          type="button"
          onClick={() => setAuthMode(isSignUp ? "sign-in" : "sign-up")}
          className="text-gold underline-offset-4 hover:underline"
        >
          {isSignUp ? "Sign in" : "Create your account"}
        </button>
      </p>
    </div>
  );
}
