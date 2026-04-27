"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useShell } from "@/components/providers/ShellProvider";
import { searchAll } from "@/lib/site-data";
import { usePathname } from "next/navigation";

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useShell();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    closeSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  const results = query.trim().length > 1 ? searchAll(query) : null;
  const hasResults =
    results &&
    (results.stories.length > 0 ||
      results.products.length > 0 ||
      results.collections.length > 0);

  const blurPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex flex-col bg-black/92 backdrop-blur-2xl"
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          {/* Search bar */}
          <div className="border-b border-ivory/10 px-5 py-6 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-3xl items-center gap-4">
              <Search className="h-5 w-5 shrink-0 text-gold" />
              <input
                ref={inputRef}
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, products, collections…"
                className="flex-1 bg-transparent font-display text-2xl text-ivory outline-none placeholder:text-ivory/28 sm:text-3xl"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-3xl">
              {!query.trim() && (
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.38em] text-ivory/36">
                  Start typing to search
                </p>
              )}

              {query.trim().length > 0 && query.trim().length <= 1 && (
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.38em] text-ivory/36">
                  Type at least 2 characters…
                </p>
              )}

              {results && !hasResults && (
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.38em] text-ivory/36">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {results && hasResults && (
                <div className="space-y-10">
                  {/* Stories */}
                  {results.stories.length > 0 && (
                    <div>
                      <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.42em] text-gold">
                        Stories
                      </p>
                      <div className="space-y-2">
                        {results.stories.slice(0, 4).map((story) => (
                          <Link
                            key={story.slug}
                            href={`/stories/${story.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-4 border border-ivory/8 bg-slate/40 p-3 transition-colors hover:border-ivory/20 hover:bg-slate/70"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                              <Image
                                src={story.image}
                                alt={story.title}
                                fill
                                sizes="56px"
                                placeholder="blur"
                                blurDataURL={blurPlaceholder}
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">
                                {story.category} · {story.readingTime}
                              </p>
                              <p className="truncate font-display text-lg text-ivory group-hover:text-gold transition-colors">
                                {story.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  {results.products.length > 0 && (
                    <div>
                      <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.42em] text-gold">
                        Products
                      </p>
                      <div className="space-y-2">
                        {results.products.slice(0, 4).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-4 border border-ivory/8 bg-slate/40 p-3 transition-colors hover:border-ivory/20 hover:bg-slate/70"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="56px"
                                placeholder="blur"
                                blurDataURL={blurPlaceholder}
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory/50">
                                {product.brand} · {product.category}
                              </p>
                              <p className="truncate font-display text-lg text-ivory group-hover:text-gold transition-colors">
                                {product.name}
                              </p>
                            </div>
                            <span className="shrink-0 font-mono text-sm text-gold">
                              ${product.price}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collections */}
                  {results.collections.length > 0 && (
                    <div>
                      <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.42em] text-gold">
                        Collections
                      </p>
                      <div className="space-y-2">
                        {results.collections.slice(0, 3).map((col) => (
                          <Link
                            key={col.id}
                            href={`/collections/${col.id}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-4 border border-ivory/8 bg-slate/40 p-3 transition-colors hover:border-ivory/20 hover:bg-slate/70"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                              <Image
                                src={col.thumbnail}
                                alt={col.title}
                                fill
                                sizes="56px"
                                placeholder="blur"
                                blurDataURL={blurPlaceholder}
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory/50">
                                {col.category} · {col.itemCount} items
                              </p>
                              <p className="truncate font-display text-lg text-ivory group-hover:text-gold transition-colors">
                                {col.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer hint */}
          <div className="border-t border-ivory/10 px-5 py-3 sm:px-8 lg:px-12">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-ivory/28">
              Press Esc to close · ⌘K to toggle
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
