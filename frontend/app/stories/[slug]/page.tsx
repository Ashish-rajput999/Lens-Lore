import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArticleCard } from "@/components/magazine/ArticleCard";
import { MobileStoryShop } from "@/components/magazine/MobileStoryShop";
import { ReadingProgress } from "@/components/magazine/ReadingProgress";
import { StoryExperience } from "@/components/magazine/StoryExperience";
import { StoryHeroMedia } from "@/components/magazine/StoryHeroMedia";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
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
      <ReadingProgress />
      <article className="pb-24">
        <section className="border-b border-ivory/10">
          <div className="relative h-[70vh] min-h-[520px]">
            <StoryHeroMedia
              image={story.image}
              title={story.title}
              slug={story.slug}
              blurDataURL={story.blurDataURL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          </div>
        </section>

        <StoryExperience story={story} products={products} />
        <MobileStoryShop products={products} />

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
