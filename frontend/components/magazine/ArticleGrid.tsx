import { ArticleCard } from "@/components/magazine/ArticleCard";
import { Story } from "@/lib/site-data";

type ArticleGridProps = {
  stories: [Story, Story, Story];
  archiveStories: Story[];
};

export function ArticleGrid({ stories, archiveStories }: ArticleGridProps) {
  const [featured, secondary, tertiary] = stories;

  return (
    <>
      <section className="section-frame px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[2fr_1fr]">
          <ArticleCard story={featured} featured />
          <div className="grid gap-6">
            <ArticleCard story={secondary} />
            <ArticleCard story={tertiary} />
          </div>
        </div>
      </section>

      <section className="section-frame px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="label-mono text-gold">From The Archive</p>
              <h2 className="font-display text-5xl leading-none text-ivory sm:text-6xl">
                Scenes that still echo.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm leading-7 text-ivory/58 lg:block">
              A loose index of essays, interviews, and field notes where product
              details surface like annotations in a margin.
            </p>
          </div>

          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
            {archiveStories.map((story) => (
              <div key={story.slug}>
                <ArticleCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
