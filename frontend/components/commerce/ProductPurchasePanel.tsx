"use client";

import Link from "next/link";
import { ShoppingBag, BookOpen } from "lucide-react";
import { Product } from "@/lib/site-data";
import { useShell } from "@/components/providers/ShellProvider";
import { useReaderStore } from "@/lib/store/reader-store";
import { useToast } from "@/components/ui/Toast";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addToCart, openCart } = useShell();
  const addToLookbookDraft = useReaderStore((state) => state.addToLookbookDraft);
  const { showToast } = useToast();

  function handleAddToCart() {
    addToCart(product);
    openCart();
    showToast(`${product.name} added to cart.`);
  }

  return (
    <div className="border border-ivory/12 bg-black p-6 space-y-4">
      {/* Price summary */}
      <div className="flex items-baseline justify-between border-b border-ivory/10 pb-4">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.38em] text-ivory/50">
          Price
        </span>
        <div className="flex items-center gap-3">
          {product.comparePrice && (
            <span className="font-mono text-sm text-ivory/35 line-through">
              ${product.comparePrice}
            </span>
          )}
          <span className="font-display text-3xl text-gold">${product.price}</span>
        </div>
      </div>

      {/* Add to Cart — primary */}
      <button
        type="button"
        id={`add-to-cart-${product.slug}`}
        onClick={handleAddToCart}
        className="flex w-full items-center justify-between border border-blood px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
      >
        <span className="flex items-center gap-3">
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </span>
        <span>${product.price}</span>
      </button>

      {/* Continue to checkout shortcut */}
      <Link
        href="/checkout"
        className="flex w-full items-center justify-between border border-ivory/14 px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:border-gold hover:text-gold"
      >
        Continue to Checkout
        <span>→</span>
      </Link>

      {/* Save to Lookbook */}
      <button
        type="button"
        onClick={() => {
          addToLookbookDraft(product);
          showToast("Added to your Lookbook canvas.");
        }}
        className="flex w-full items-center gap-3 px-2 py-2 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/44 transition-colors hover:text-gold"
      >
        <BookOpen className="h-3.5 w-3.5" />
        Save to Lookbook Canvas
      </button>
    </div>
  );
}
