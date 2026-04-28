"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Product, Story, StorySection } from "@/lib/site-data";
import { SaveStoryButton } from "@/components/magazine/SaveStoryButton";
import { useShell } from "@/components/providers/ShellProvider";
import { ShoppableSidebar } from "@/components/commerce/ShoppableSidebar";
import { useReaderStore } from "@/lib/store/reader-store";

type StoryExperienceProps = {
  story: Story;
  products: Product[];
};

type Mention = {
  id: string;
  note: string;
  product: Product;
};

function collectMentions(sections: StorySection[], products: Product[]) {
  const map = new Map(products.map((product) => [product.slug, product]));

  return sections
    .map((section, index) => {
      if (section.type !== "productEmbed") {
        return null;
      }

      const product = map.get(section.embed.productSlug);

      if (!product) {
        return null;
      }

      return {
        id: `mention-${index}-${product.slug}`,
        note: section.embed.note,
        product,
      };
    })
    .filter((mention): mention is Mention => Boolean(mention));
}

export function StoryExperience({ story, products }: StoryExperienceProps) {
  const mentions = useMemo(() => collectMentions(story.body, products), [story.body, products]);
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(mentions[0]?.product.slug ?? null);
  const { addToCart } = useShell();
  const addToLookbookDraft = useReaderStore((state) => state.addToLookbookDraft);

  useEffect(() => {
    const nodes = mentions
      .map((mention) => document.getElementById(mention.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const target = visibleEntry.target as HTMLElement;
          setActiveProductSlug(target.dataset.productSlug ?? null);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [mentions]);

  return (
    <section className="px-5 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(320px,0.35fr)]">
        <div className="space-y-10">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-4">
              <span className="label-mono text-gold">{story.issue}</span>
              <span className="label-mono">{story.category}</span>
              <span className="label-mono">{story.readingTime}</span>
            </div>
            <motion.h1
              layoutId={`story-title-${story.slug}`}
              className="max-w-4xl font-display text-5xl leading-[0.95] text-ivory sm:text-6xl"
            >
              {story.title}
            </motion.h1>
            <p className="max-w-3xl text-base leading-8 text-ivory/68 sm:text-lg">
              {story.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <SaveStoryButton storySlug={story.slug} variant="inline" />
              <Link
                href="/canvas"
                className="inline-flex items-center border border-ivory/14 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Open Lookbook
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 border-y border-ivory/10 py-5">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-ivory/12">
              <Image
                src={story.author.image}
                alt={story.author.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="font-display text-2xl text-ivory">{story.author.name}</p>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/56">
                {story.author.role} / {story.publishedAt}
              </p>
            </div>
          </div>

          <div className="drop-cap mx-auto max-w-3xl space-y-8 text-[1.06rem] leading-8 text-ivory/78">
            {story.body.map((section, index) => {
              if (section.type === "paragraph") {
                return <p key={`p-${index}`}>{section.content}</p>;
              }

              if (section.type === "pullQuote") {
                return (
                  <blockquote
                    key={`q-${index}`}
                    className="border-l border-gold pl-6 font-display text-3xl italic leading-tight text-ivory sm:text-4xl"
                  >
                    “{section.quote}”
                    <footer className="mt-4 font-mono text-[0.68rem] uppercase not-italic tracking-[0.35em] text-gold">
                      {section.attribution}
                    </footer>
                  </blockquote>
                );
              }

              if (section.type === "photoGrid") {
                return (
                  <div
                    key={`g-${index}`}
                    className={`grid gap-4 ${section.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
                  >
                    {section.photos.map((photo) => (
                      <figure key={photo.caption} className="space-y-3">
                        <div className="relative aspect-[4/5] overflow-hidden border border-ivory/10">
                          <Image
                            src={photo.image}
                            alt={photo.caption}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            placeholder="blur"
                            blurDataURL={story.blurDataURL}
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory/48">
                          {photo.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                );
              }

              const product = products.find((item) => item.slug === section.embed.productSlug);

              if (!product) {
                return null;
              }

              const mentionId = `mention-${index}-${product.slug}`;

              return (
                <div
                  key={`e-${index}`}
                  id={mentionId}
                  data-product-slug={product.slug}
                  className="grid gap-5 border border-ivory/12 bg-black/45 p-5 backdrop-blur-xl md:grid-cols-[220px_1fr]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="220px"
                      placeholder="blur"
                      blurDataURL={story.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="label-mono text-gold">Used In This Story</p>
                    <div>
                      <h2 className="font-display text-3xl text-ivory">{product.name}</h2>
                      <p className="mt-2 text-sm leading-7 text-ivory/66">{section.embed.note}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/canvas"
                        onClick={() => addToLookbookDraft(product)}
                        className="border border-ivory/16 px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
                      >
                        Add to Lookbook
                      </Link>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="border border-blood px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                      >
                        Quick Add / ${product.price}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <ShoppableSidebar
            products={products}
            activeProductSlug={activeProductSlug}
            onQuickAdd={addToCart}
          />
        </div>
      </div>
    </section>
  );
}
