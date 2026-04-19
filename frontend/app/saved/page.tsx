import { ArticleCard } from "@/components/magazine/ArticleCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageIntro } from "@/components/ui/PageIntro";
import { stories } from "@/lib/site-data";

export default function SavedPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <PageIntro
            eyebrow="Saved"
            title="A stable reading list surface for articles worth returning to."
            description="This page is now wired so the account flow no longer dumps users into missing routes."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stories.slice(0, 3).map((story) => (
              <ArticleCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
