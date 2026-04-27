"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { useShell } from "@/components/providers/ShellProvider";
import { useToast } from "@/components/ui/Toast";
import { CATEGORIES, Category, products } from "@/lib/site-data";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low–High", value: "asc" },
  { label: "Price: High–Low", value: "desc" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);
  const { addToCart } = useShell();
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    let list =
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, sort]);

  const quickViewProduct = quickViewSlug
    ? products.find((p) => p.slug === quickViewSlug)
    : null;

  function handleAddToCart(product: (typeof products)[number]) {
    addToCart(product);
    showToast(`${product.name} added to cart.`);
  }

  const feature = filtered[0];

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          <PageIntro
            eyebrow="Shop"
            title="Editorial commerce: products introduced the way stories introduce characters."
            description="Every piece earns its place through the stories we publish — gear field-tested, not just photographed."
          />

          {/* Filters + Sort row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] transition-colors ${
                    activeCategory === cat
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-ivory/12 text-ivory/65 hover:border-ivory/30 hover:text-ivory"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-ivory/38">
                Sort
              </span>
              <div className="flex gap-1">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSort(opt.value)}
                    className={`border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] transition-colors ${
                      sort === opt.value
                        ? "border-gold text-gold"
                        : "border-ivory/10 text-ivory/45 hover:border-ivory/22 hover:text-ivory/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero feature (first filtered product) */}
          {feature && (
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <Link href={`/product/${feature.slug}`} className="group block border border-ivory/12">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <Image
                    src={feature.lifestyleImage}
                    alt={`${feature.name} in context`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    placeholder="blur"
                    blurDataURL={blurPlaceholder}
                    className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-between border border-ivory/12 bg-slate p-8">
                <div className="space-y-4">
                  <p className="label-mono text-gold">{feature.tag}</p>
                  <h2 className="font-display text-5xl text-ivory">{feature.name}</h2>
                  <p className="max-w-xl text-base leading-8 text-ivory/68">{feature.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-[0.32em] text-ivory/64">
                    {feature.brand} / ${feature.price}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/product/${feature.slug}`}
                      className="inline-flex border border-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
                    >
                      View Product
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(feature)}
                      className="inline-flex border border-blood px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-blood"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + sort}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.slice(1).map((product) => (
                <div
                  key={product.slug}
                  className="group relative border border-ivory/12 bg-slate transition-colors hover:border-ivory/22"
                >
                  {/* Image with hover lifestyle swap */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative block aspect-[4/5] overflow-hidden"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <Image
                      src={product.lifestyleImage}
                      alt={`${product.name} in context`}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={blurPlaceholder}
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    {product.comparePrice && (
                      <span className="absolute left-3 top-3 bg-blood px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-ivory">
                        Sale
                      </span>
                    )}
                  </Link>

                  {/* Quick-view overlay on hover */}
                  <div className="absolute inset-x-0 bottom-[130px] flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setQuickViewSlug(product.slug)}
                      className="border border-ivory/30 bg-black/80 px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="space-y-3 p-5">
                    <p className="label-mono">{product.tag}</p>
                    <h3 className="font-display text-2xl text-ivory">{product.name}</h3>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ivory/65">
                      <span>{product.brand}</span>
                      <span className="flex items-center gap-2">
                        {product.comparePrice && (
                          <span className="text-ivory/35 line-through">${product.comparePrice}</span>
                        )}
                        ${product.price}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="flex w-full items-center justify-between border border-blood px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                    >
                      Add to Cart
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-16 text-center font-mono text-[0.68rem] uppercase tracking-[0.4em] text-ivory/36">
              No products in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Quick-View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            key="quick-view-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setQuickViewSlug(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[90vh] w-full max-w-3xl overflow-auto border border-ivory/14 bg-black/96 backdrop-blur-xl md:grid-cols-2"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <p className="label-mono text-gold">{quickViewProduct.tag}</p>
                  <h2 className="font-display text-3xl text-ivory">{quickViewProduct.name}</h2>
                  <p className="text-sm leading-7 text-ivory/66">{quickViewProduct.description}</p>
                  <div className="space-y-2 border-t border-ivory/10 pt-4">
                    {quickViewProduct.specs.map((spec) => (
                      <div key={spec.key} className="flex justify-between">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ivory/44">
                          {spec.key}
                        </span>
                        <span className="text-sm text-ivory/70">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-sm text-ivory/70">
                    <span className="text-gold">${quickViewProduct.price}</span>
                    {quickViewProduct.comparePrice && (
                      <span className="text-ivory/35 line-through">${quickViewProduct.comparePrice}</span>
                    )}
                    <span className="text-ivory/38">· {quickViewProduct.brand}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewSlug(null);
                    }}
                    className="flex w-full items-center justify-between border border-blood px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                  >
                    Add to Cart
                    <span>→</span>
                  </button>
                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewSlug(null)}
                    className="flex items-center justify-between border border-ivory/14 px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    Full Product Page
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setQuickViewSlug(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-ivory/14 text-ivory/60 transition-colors hover:border-gold hover:text-gold"
                aria-label="Close quick view"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
