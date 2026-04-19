import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ShoppableSidebar } from "@/components/commerce/ShoppableSidebar";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  getProductBySlug,
  getRelatedStories,
  getStoryBySlug,
  getProductsForStory,
} from "@/lib/site-data";

type StoryPageProps = {
  params: {
    slug: string;
  };
};

export default function StoryPage({ params }: StoryPageProps) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const products = getProductsForStory(story);
  const relatedStories = getRelatedStories(story.slug);

  return (
    <PageWrapper>
      <article className="pb-24">
        <section className="border-b border-ivory/10">
          <div className="relative h-[70vh] min-h-[520px]">
            <Image
              src={story.image}
              alt={story.title}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={story.blurDataURL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          </div>
        </section>

        <section className="px-5 pt-10 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(300px,0.35fr)]">
            <div className="space-y-10">
              <div className="space-y-5">
                <div className="flex flex-wrap gap-4">
                  <span className="label-mono text-gold">{story.issue}</span>
                  <span className="label-mono">{story.category}</span>
                  <span className="label-mono">{story.readingTime}</span>
                </div>
                <h1 className="max-w-4xl font-display text-5xl leading-[0.95] text-ivory sm:text-6xl">
                  {story.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-ivory/68 sm:text-lg">
                  {story.summary}
                </p>
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

                  const product = getProductBySlug(section.embed.productSlug);

                  if (!product) {
                    return null;
                  }

                  return (
                    <div
                      key={`e-${index}`}
                      className="grid gap-5 border border-ivory/12 bg-slate p-5 md:grid-cols-[220px_1fr]"
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
                            href={`/collections/${story.slug === "neon-after-rain" ? "midnight-reflections" : "soft-carry-study"}`}
                            className="border border-ivory/16 px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:border-gold hover:text-gold"
                          >
                            Add to Lookbook
                          </Link>
                          <Link
                            href={`/product/${product.slug}`}
                            className="border border-blood px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-blood"
                          >
                            Buy Now / ${product.price}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <ShoppableSidebar products={products} />
            </div>
          </div>
        </section>

        <section className="px-5 pt-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-8">
            <p className="label-mono text-gold">You Might Also Like</p>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedStories.map((relatedStory) => (
                <ArticleCard key={relatedStory.slug} story={relatedStory} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pt-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-8">
            <p className="label-mono">Story Products</p>
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} compact />
              ))}
            </div>
          </div>
        </section>
      </article>
    </PageWrapper>
  );
}
