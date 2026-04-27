"use client";

import { useReaderStore } from "@/lib/store/reader-store";

export function SignOutButton() {
  const signOut = useReaderStore((state) => state.signOut);

  function handleSignOut() {
    signOut();
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
