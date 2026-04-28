"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/site-data";
import { useShell } from "@/components/providers/ShellProvider";
import { useReaderStore } from "@/lib/store/reader-store";

type MobileStoryShopProps = {
  products: Product[];
};

export function MobileStoryShop({ products }: MobileStoryShopProps) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useShell();
  const addToLookbookDraft = useReaderStore((state) => state.addToLookbookDraft);

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-30 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between border border-gold/60 bg-black/78 px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory backdrop-blur-2xl"
        >
          <span className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4 text-gold" />
            Shop This Story
          </span>
          <span className="text-gold">{products.length} Items</span>
        </button>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-[75] md:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="fixed inset-x-0 bottom-0">
          <DialogPanel className="max-h-[85vh] overflow-y-auto border-t border-ivory/12 bg-black/88 p-5 backdrop-blur-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="label-mono text-gold">Shop This Story</p>
                <h2 className="mt-2 font-display text-4xl text-ivory">
                  Current Pull
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-ivory/12 text-ivory"
                aria-label="Close story shop"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="grid grid-cols-[96px_1fr] gap-4 border border-ivory/12 bg-slate/50 p-3"
                >
                  <div className="relative aspect-square overflow-hidden border border-ivory/10">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="96px"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2Zy8+"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl text-ivory"
                    >
                      {product.name}
                    </Link>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.32em] text-ivory/56">
                      {product.brand} / ${product.price}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="border border-blood px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                      >
                        Quick Add
                      </button>
                      <Link
                        href="/canvas"
                        onClick={() => {
                          addToLookbookDraft(product);
                          setOpen(false);
                        }}
                        className="border border-ivory/12 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
                      >
                        Lookbook
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
