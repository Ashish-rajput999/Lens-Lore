"use client";

import Link from "next/link";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { stories } from "@/lib/site-data";
import { useReaderHydrated, useReaderStore } from "@/lib/store/reader-store";

export default function SavedPageClient() {
  const hydrated = useReaderHydrated();
  const savedStorySlugs = useReaderStore((state) => state.savedStorySlugs);
  const savedStories = stories.filter((story) => savedStorySlugs.includes(story.slug));

  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <PageIntro
            eyebrow="Saved"
            title="A personal reading stack that survives refreshes, late-night returns, and cross-page wandering."
            description="Stories you save now persist locally, so your editorial trail feels continuous instead of disposable."
          />

          {!hydrated ? (
            <div className="border border-ivory/12 bg-slate p-6 text-sm leading-7 text-ivory/64">
              Restoring your saved stories...
            </div>
          ) : null}

          {hydrated && savedStories.length === 0 ? (
            <div className="grid gap-6 border border-ivory/12 bg-slate p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="label-mono text-gold">No Saved Stories Yet</p>
                <h2 className="font-display text-4xl text-ivory">
                  Build a reading stack from the stories that pull you back in.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-ivory/64">
                  Use the bookmark control on story cards and article pages to keep field notes, gear essays, and interviews close at hand.
                </p>
              </div>
              <div className="flex items-end">
                <Link
                  href="/stories"
                  className="inline-flex border border-gold px-5 py-3 font-mono text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  Explore Stories
                </Link>
              </div>
            </div>
          ) : null}

          {savedStories.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savedStories.map((story) => (
                <ArticleCard key={story.slug} story={story} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </PageWrapper>
  );
}
