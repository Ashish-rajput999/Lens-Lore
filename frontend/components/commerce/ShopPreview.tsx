"use client";

import Image from "next/image";
import Link from "next/link";
import { useShell } from "@/components/providers/ShellProvider";
import { products } from "@/lib/site-data";

const PREVIEW_SLUGS = [
  "ricoh-griiix-urban-shadow",
  "fujifilm-x100vi-silver",
  "bellroy-venture-sling-6l",
  "godox-lux-junior-flash",
];

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

export function ShopPreview() {
  const { addToCart } = useShell();
  const previewProducts = PREVIEW_SLUGS.map(
    (slug) => products.find((p) => p.slug === slug)!,
  ).filter(Boolean);

  return (
    <section className="border-t border-ivory/10 bg-black px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.42em] text-gold">
              From The Shop
            </p>
            <h2 className="font-display text-4xl text-ivory sm:text-5xl">
              Gear worth the investment.
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-mono text-[0.65rem] uppercase tracking-[0.35em] text-ivory/50 transition-colors hover:text-ivory sm:block"
          >
            Browse All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {previewProducts.map((product) => (
            <div
              key={product.slug}
              className="group border border-ivory/10 bg-slate/60 transition-colors hover:border-ivory/20"
            >
              {/* Image */}
              <Link
                href={`/product/${product.slug}`}
                className="relative block aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
                />
                <Image
                  src={product.lifestyleImage}
                  alt={`${product.name} lifestyle`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                {product.comparePrice && (
                  <span className="absolute left-3 top-3 bg-blood px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-ivory">
                    Sale
                  </span>
                )}
                <span className="absolute right-3 top-3 border border-ivory/20 bg-black/60 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-ivory backdrop-blur-sm">
                  {product.category}
                </span>
              </Link>

              {/* Info */}
              <div className="p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-gold/80">
                  {product.brand}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="mt-1 font-display text-xl leading-tight text-ivory transition-colors group-hover:text-gold">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-ivory/70">
                    <span>${product.price}</span>
                    {product.comparePrice && (
                      <span className="text-ivory/35 line-through">
                        ${product.comparePrice}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="border border-blood px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/shop"
            className="flex w-full items-center justify-between border border-ivory/14 px-5 py-4 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            Browse All Products
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
