"use client";

import Link from "next/link";
import Image from "next/image";
import { PageIntro } from "@/components/ui/PageIntro";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useReaderHydrated } from "@/lib/store/reader-store";
import { useShell } from "@/components/providers/ShellProvider";

export default function CartPageClient() {
  const hydrated = useReaderHydrated();
  const { cartItems, removeFromCart } = useShell();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <PageIntro
            eyebrow="Cart"
            title="A live cart that now persists between visits instead of disappearing the second the session resets."
            description="Your selected kit is stored as part of a local reader state, so the commerce layer feels continuous while we keep the payment integration intentionally lightweight for now."
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="grid gap-6">
              {!hydrated ? (
                <div className="border border-ivory/12 bg-slate p-6 text-sm leading-7 text-ivory/64">
                  Restoring your current pull...
                </div>
              ) : null}

              {hydrated && cartItems.length === 0 ? (
                <div className="border border-ivory/12 bg-slate p-6 text-sm leading-7 text-ivory/64">
                  Your cart is empty. Add products from stories, product pages, or the quick-add sidebar.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.slug}
                    className="grid gap-5 border border-ivory/12 bg-slate/70 p-5 md:grid-cols-[160px_1fr]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden border border-ivory/12">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="160px"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <p className="label-mono text-gold">{item.product.brand}</p>
                        <h2 className="font-display text-3xl text-ivory">
                          {item.product.name}
                        </h2>
                        <p className="max-w-2xl text-sm leading-7 text-ivory/64">
                          {item.product.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-4">
                        <div className="font-mono text-xs uppercase tracking-[0.3em] text-ivory/58">
                          Qty {item.quantity} / ${item.product.price}
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="border border-ivory/12 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory transition-colors hover:border-gold hover:text-gold"
                          >
                            Review Product
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.slug)}
                            className="border border-ivory/12 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/64 transition-colors hover:border-blood hover:text-blood"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="h-fit space-y-5 border border-ivory/12 bg-black/45 p-6 backdrop-blur-2xl lg:sticky lg:top-28">
              <p className="label-mono">Summary</p>
              <div className="space-y-3 border-y border-ivory/10 py-5">
                <div className="flex items-center justify-between text-sm text-ivory/68">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-ivory/68">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-between border border-blood px-4 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
              >
                Continue to Checkout
                <span>${subtotal}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
