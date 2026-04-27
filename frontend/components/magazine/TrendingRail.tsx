"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useReaderStore } from "@/lib/store/reader-store";
import { stories } from "@/lib/site-data";

export function TrendingRail() {
  const toggleSavedStory = useReaderStore((state) => state.toggleSavedStory);
  const savedSlugs = useReaderStore((state) => state.savedStorySlugs);

  const blurPlaceholder =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyMxNTE1MTUnLz48L3N2Zz4=";

  return (
    <section className="border-t border-ivory/10 bg-black px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.42em] text-gold">
            Trending This Week
          </p>
          <Link
            href="/stories"
            className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-ivory/50 transition-colors hover:text-ivory"
          >
            All Stories →
          </Link>
        </div>

        {/* Horizontal scroll rail */}
        <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {stories.map((story) => (
            <div
              key={story.slug}
              className="group flex w-[280px] shrink-0 snap-start flex-col border border-ivory/10 bg-slate/60 transition-colors hover:border-ivory/20"
            >
              {/* Thumbnail */}
              <Link href={story.href} className="relative block aspect-[16/9] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="280px"
                  placeholder="blur"
                  blurDataURL={blurPlaceholder}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 border border-ivory/20 bg-black/60 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.3em] text-ivory/80 backdrop-blur-sm">
                  {story.category}
                </span>
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <Link href={story.href}>
                  <h3 className="font-display text-lg leading-tight text-ivory transition-colors group-hover:text-gold line-clamp-2">
                    {story.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ivory/40">
                    {story.readingTime}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSavedStory(story.slug)}
                    aria-label={savedSlugs.includes(story.slug) ? "Unsave story" : "Save story"}
                    className="transition-colors"
                  >
                    <Bookmark
                      className={`h-4 w-4 transition-colors ${
                        savedSlugs.includes(story.slug)
                          ? "fill-gold text-gold"
                          : "text-ivory/30 hover:text-gold"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
