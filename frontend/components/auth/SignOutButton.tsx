"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    window.location.assign("/sign-in");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="border border-ivory/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-blood hover:text-blood"
    >
      Sign Out
    </button>
  );
}
