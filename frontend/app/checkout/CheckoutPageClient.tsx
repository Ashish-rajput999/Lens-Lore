"use client";

import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { useReaderHydrated, useReaderStore } from "@/lib/store/reader-store";

export default function CheckoutPageClient() {
  const hydrated = useReaderHydrated();
  const cartItems = useReaderStore((state) => state.cartItems);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <PageIntro
            eyebrow="Checkout"
            title="A checkout surface that reflects the actual kit the reader has built up across the magazine."
            description="The payment rails can stay lightweight for now, but the review state and order summary should already feel grounded, intentional, and real."
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="border border-ivory/12 bg-slate p-6">
              <p className="label-mono">Payment Element</p>
              <div className="mt-5 min-h-[320px] border border-ivory/12 bg-black/70 p-6">
                <div className="grid gap-4">
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Email</div>
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Card details</div>
                  <div className="border border-ivory/10 px-4 py-4 text-ivory/55">Billing address</div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <p className="label-mono text-gold">Current Pull</p>
                {!hydrated ? (
                  <div className="border border-ivory/12 bg-black/45 p-4 text-sm leading-7 text-ivory/62">
                    Restoring your selected products...
                  </div>
                ) : null}

                {hydrated && cartItems.length === 0 ? (
                  <div className="border border-ivory/12 bg-black/45 p-4 text-sm leading-7 text-ivory/62">
                    No products are in the cart yet. Add items from stories or product pages first.
                  </div>
                ) : null}

                {cartItems.map((item) => (
                  <div
                    key={item.product.slug}
                    className="grid grid-cols-[76px_1fr] gap-4 border border-ivory/12 bg-black/45 p-3"
                  >
                    <div className="relative aspect-square overflow-hidden border border-ivory/10">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="76px"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-2xl text-ivory">{item.product.name}</p>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/56">
                        Qty {item.quantity} / ${item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-fit border border-ivory/12 bg-black p-6 lg:sticky lg:top-28">
              <p className="label-mono">Order Summary</p>
              <div className="mt-5 space-y-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory/62">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>Calculated later</span>
                </div>
                <div className="flex items-center justify-between border-t border-ivory/10 pt-4 text-gold">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>
              </div>
              <Link
                href="/cart"
                className="mt-5 inline-flex w-full items-center justify-between border border-ivory/12 px-4 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Edit Cart
                <span>Back</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
