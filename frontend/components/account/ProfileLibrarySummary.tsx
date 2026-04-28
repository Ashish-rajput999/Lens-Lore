"use client";

import Link from "next/link";
import { useReaderStore } from "@/lib/store/reader-store";

export function ProfileLibrarySummary() {
  const savedStoryCount = useReaderStore((state) => state.savedStorySlugs.length);
  const lookbookItemCount = useReaderStore((state) => state.lookbookDraft.items.length);
  const cartCount = useReaderStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Link
        href="/saved"
        className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold"
      >
        <p className="label-mono">Saved</p>
        <p className="mt-4 font-display text-4xl text-ivory">Saved Stories</p>
        <p className="mt-3 text-sm leading-7 text-ivory/62">
          {savedStoryCount} story{savedStoryCount === 1 ? "" : "ies"} in your reading stack.
        </p>
      </Link>
      <Link
        href="/canvas"
        className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold"
      >
        <p className="label-mono">Lookbook</p>
        <p className="mt-4 font-display text-4xl text-ivory">Draft Canvas</p>
        <p className="mt-3 text-sm leading-7 text-ivory/62">
          {lookbookItemCount} item{lookbookItemCount === 1 ? "" : "s"} staged in your current arrangement.
        </p>
      </Link>
      <Link
        href="/cart"
        className="border border-ivory/12 bg-black p-6 transition-colors hover:border-gold"
      >
        <p className="label-mono">Commerce</p>
        <p className="mt-4 font-display text-4xl text-ivory">Current Pull</p>
        <p className="mt-3 text-sm leading-7 text-ivory/62">
          {cartCount} product{cartCount === 1 ? "" : "s"} waiting in the cart.
        </p>
      </Link>
    </div>
  );
}
