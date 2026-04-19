import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { stories } from "@/lib/site-data";

export default function StoriesPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-14">
          <PageIntro
            eyebrow="Stories"
            title="Street photography stories where gear is part of the narrative, not the whole point."
            description="Every card below now resolves to a real article page, with featured products, immersive layouts, and connected product destinations."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story, index) => (
              <div key={story.slug} className={index % 4 === 0 ? "xl:translate-y-8" : ""}>
                <ArticleCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
