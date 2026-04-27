"use client";

import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useShell } from "@/components/providers/ShellProvider";
import { products } from "@/lib/site-data";

const RECOMMENDED_SLUGS = [
  "ricoh-griiix-urban-shadow",
  "bellroy-venture-sling-6l",
  "godox-lux-junior-flash",
];

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

const recommendedProducts = RECOMMENDED_SLUGS.map(
  (slug) => products.find((p) => p.slug === slug)!,
).filter(Boolean);

export function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    clearCart,
    closeCart,
    decrementCartItem,
    incrementCartItem,
    removeFromCart,
    addToCart,
  } = useShell();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const isEmpty = cartItems.length === 0;

  return (
    <Dialog open={cartOpen} onClose={closeCart} className="relative z-[80]">
      <DialogBackdrop className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6">
        <DialogPanel className="flex w-screen max-w-md flex-col border-l border-ivory/12 bg-black/92 backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
            <div>
              <p className="label-mono text-gold">Cart</p>
              <h2 className="mt-1 font-display text-4xl text-ivory">Current Pull</h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="flex h-11 w-11 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {isEmpty ? (
              <div className="space-y-8">
                {/* Empty state */}
                <div className="flex flex-col items-center gap-4 border border-ivory/10 bg-slate/40 py-10 text-center">
                  <ShoppingBag className="h-8 w-8 text-ivory/25" />
                  <div className="space-y-1">
                    <p className="font-display text-2xl text-ivory">Your cart is empty</p>
                    <p className="text-sm leading-7 text-ivory/52">
                      Add gear from product pages, stories, or the shop.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="border border-blood px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-blood"
                  >
                    Browse Shop
                  </Link>
                </div>

                {/* Recommended products */}
                <div>
                  <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.42em] text-gold">
                    You Might Like
                  </p>
                  <div className="space-y-3">
                    {recommendedProducts.map((product) => (
                      <div
                        key={product.slug}
                        className="flex items-center gap-4 border border-ivory/10 bg-slate/50 p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            placeholder="blur"
                            blurDataURL={blurPlaceholder}
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
                            {product.brand}
                          </p>
                          <p className="truncate font-display text-base text-ivory">
                            {product.name}
                          </p>
                          <p className="font-mono text-xs text-ivory/50">${product.price}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="shrink-0 border border-blood px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-blood"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.slug}
                    className="grid grid-cols-[80px_1fr] gap-4 border border-ivory/12 bg-slate/70 p-3"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        placeholder="blur"
                        blurDataURL={blurPlaceholder}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
                          {item.product.brand}
                        </p>
                        <p className="font-display text-xl text-ivory">{item.product.name}</p>
                      </div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ivory/55">
                        ${item.product.price} each
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrementCartItem(item.product.slug)}
                          className="flex h-8 w-8 items-center justify-center border border-ivory/12 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-sm text-ivory">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementCartItem(item.product.slug)}
                          className="flex h-8 w-8 items-center justify-center border border-ivory/12 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <span className="ml-auto font-mono text-sm text-ivory">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-gold/70"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.slug)}
                          className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/40 transition-colors hover:text-blood"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isEmpty && (
            <div className="border-t border-ivory/10 px-6 py-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ivory/60">
                <span>Subtotal</span>
                <span className="text-ivory">${subtotal}</span>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="w-full border border-ivory/12 px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory/52 transition-colors hover:border-blood hover:text-blood"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-between border border-blood px-5 py-4 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-blood"
              >
                Continue to Checkout
                <span>${subtotal}</span>
              </Link>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
